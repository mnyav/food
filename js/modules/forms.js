import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {

    // forms
    const message = {
        louding: "img/modal/spinner.svg",
        success: "success!!!",
        failer: "error"
    };



    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostData(item);
    });



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
        openModal(".modal", modalTimerId);


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
            closeModal(".modal");
        }, 4000);

    }


    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res));



}
export default forms;