function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // slider

    const slider = document.querySelector(container);
    const sliders = document.querySelectorAll(slide);
    const back = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;



    let iterator = 1;
    let offset = 0;


    if (sliders.length < 10) {
        total.textContent = `0${sliders.length}`;
        current.textContent = `0${iterator}`;

    } else {
        current.textContent = iterator;
        current.textContent = iterator;

    }

    slidesField.style.width = 100 * sliders.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";



    slidesWrapper.style.overflow = "hidden";

    sliders.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = "relative";
    const doc = document.createElement("ol");
    const dots = [];

    doc.classList.add("carousel-indicators");
    doc.style.cssText = `
           position: absolute;
           right: 0;
           bottom: 0;
           left: 0;
           z-index: 15;
           display: flex;
           justify-content: center;
           margin-right: 15%;
           margin-left: 15%;
           list-style: none;
   
   `;

    slider.append(doc);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.style.cssText = `
           box-sizing: content-box;
           flex: 0 1 auto;
           width: 30px;
           height: 6px;
           margin-right: 3px;
           margin-left: 3px;
           cursor: pointer;
           background-color: #fff;
           background-clip: padding-box;
           border-top: 10px solid transparent;
           border-bottom: 10px solid transparent;
           opacity: .5;
           transition: opacity .6s ease;
       
       `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        doc.append(dot);
        dots.push(dot);
    }

    function xxx() {
        if (sliders.length < 10) {
            current.textContent = `0${iterator}`;
        } else {
            current.textContent = iterator;
        }
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[iterator - 1].style.opacity = 1;
    }

    function stringConverter(noNumber) {
        let netNumber = noNumber.replace(/\D/g, "");
        return netNumber;
    }

    next.addEventListener("click", () => {

        if (offset == +stringConverter(width) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += +stringConverter(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (iterator == sliders.length) {
            iterator = 1;
        } else {
            iterator++;
        }

        xxx();

    });



    back.addEventListener("click", () => {

        if (offset == 0) {

            offset = +stringConverter(width) * (sliders.length - 1);
        } else {
            offset -= +stringConverter(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (iterator == 1) {
            iterator = sliders.length;
        } else {
            iterator--;
        }

        xxx();

    });



    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            iterator = slideTo;

            offset = +stringConverter(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            xxx();

        });
    });
}
export default slider;