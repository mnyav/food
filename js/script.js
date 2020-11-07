// "use strict";

window.addEventListener("DOMContentLoaded", () => {

    let tab = document.querySelectorAll(".tabcontent");

    let tabheaderItem = document.querySelectorAll(".tabheader__item");

    let tabheaderItems = document.querySelector(".tabheader__items");





    function defoltSeting() {
        tab.forEach((item) => {
            item.style.display = "none";
        });

        tabheaderItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    //num 2

    function showTabContent(num) {
        console.log(num);
        tab[num].style.display = "block";

        tabheaderItem[num].classList.add("tabheader__item_active");
    }

    defoltSeting();
    showTabContent(0);

    tabheaderItems.addEventListener("click", (e) => {
        const target = e.target;
        if (target && !e.target.classList.contains("tabheader__item_active")) {
            tabheaderItem.forEach((item, i) => {
                if (target == item) {
                    defoltSeting();
                    showTabContent(i);
                }
            });
        }


    });



});



























// window.addEventListener("DOMContentLoaded", () => {


//     const tabs = document.querySelectorAll(".tabheader__item"), //спевдомасив

//         tabsContent = document.querySelectorAll(".tabcontent"), //спевдомасив

//         tabsParent = document.querySelector(".tabheader__items");

//     console.log(tabs);
//     console.log(tabsParent);

//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.style.display = "none";
//         });

//         tabs.forEach(item => {
//             item.classList.remove("tabheader__item_active");
//         });
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].style.display = "block";
//         tabs[i].classList.add("tabheader__item_active");

//     }

//     hideTabContent();
//     showTabContent();

//     tabsParent.addEventListener("click", (event) => {
//         const target = event.target;

//         if (target && target.classList.contains("tabheader__item")) {
//             tabs.forEach((item, i) => {
//                 if (target == item) {
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             });

//         }
//     });

// });