"use strict";

window.addEventListener('DOMContentLoaded', function() {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2021-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    const getResource = async(url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fethc ${url}, status ${result.status}`);
        }

        return await result.json();
    };


    // getResource("http://localhost:3000/menu")

    // .then(data => {
    //     data.forEach(({ img, altamg, title, descr, price }) => {
    //         new MenuCard(img, altamg, title, descr, price, ".menu .container").render();
    //     });
    // });


    axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({ img, altamg, title, descr, price }) => {
                new MenuCard(img, altamg, title, descr, price, ".menu .container").render();

            });
        });



    // forms


    const message = {
        louding: "img/modal/spinner.svg",
        success: "success!!!",
        failer: "error"
    };



    const forms = document.querySelectorAll("form");

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async(url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.louding;
            // showContent(message.louding);
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);



            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);

                    showContent(message.success);
                    statusMessage.remove();

                }).catch(() => {
                    showContent(message.failer);

                }).finally(() => {
                    form.reset();

                });

        });
    }

    function showContent(message) {
        const modal = document.querySelector(".modal__dialog");
        modal.classList.add("hide");
        openModal();


        const newModal = document.createElement("div");
        newModal.classList.add("modal__dialog");
        newModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>    
        </div>
        
        `;

        document.querySelector(".modal").append(newModal);

        setTimeout(() => {
            modal.remove();
            modal.classList.add("show");
            modal.classList.remove("hide");
            closeModal();
        }, 4000);

    }


    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res));



    // slider

    const sliders = document.querySelectorAll(".offer__slide");
    const back = document.querySelector(".offer__slider-prev");
    const next = document.querySelector(".offer__slider-next");
    const current = document.querySelector("#current");
    const total = document.querySelector("#total");
    const slidesWrapper = document.querySelector(".offer__slider-wrapper");
    const slidesField = document.querySelector(".offer_slider-inner");
    const width = window.getComputedStyle(slidesWrapper).width;

    console.log(slidesField);

    let iterator = 1;
    let offset = 0;

    if (sliders.length < 10) {
        total.textContent = `0${sliders.length}`;
        current.textContent = `0${iterator}`;
    } else {
        total.textContent = sliders.length;
        current.textContent = iterator;
    }


    slidesField.style.width = 100 * sliders.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.9s all";

    slidesWrapper.style.overflow = "hidden";

    sliders.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (iterator == sliders.length) {
            iterator = 1;

        } else {
            iterator++;
        }

        if (sliders.length < 10) {
            current.textContent = `0${iterator}`;
        } else {
            current.textContent = iterator;
        }
    });

    back.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (sliders.length - 1);

        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (iterator == 1) {
            iterator = sliders.length;

        } else {
            iterator--;
        }


        if (sliders.length < 10) {
            current.textContent = `0${iterator}`;
        } else {
            current.textContent = iterator;
        }
    });


    // if (sliders.length < 10) {
    //     total.textContent = `0${sliders.length}`;
    // } else {
    //     total.textContent = sliders.length;
    // }

    // showSliders(iterator);

    // function showSliders(n) {
    //     if (n > sliders.length) {
    //         iterator = 1;
    //     }
    //     if (n < 1) {
    //         iterator = sliders.length;
    //     }

    //     sliders.forEach(item => item.style.display = "none");
    //     sliders[iterator - 1].style.display = "block";

    //     if (sliders.length < 10) {
    //         current.textContent = `${iterator}`;
    //     } else {
    //         current.textContent = iterator;
    //     }
    // }

    // function plusSlider(pages) {
    //     showSliders(iterator += pages);
    // }
    // next.addEventListener("click", () => {
    //     plusSlider(1);
    // });
    // back.addEventListener("click", () => {
    //     plusSlider(-1);
    // });




});