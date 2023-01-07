document.addEventListener("DOMContentLoaded", function () {

    const email_input = document.querySelector("#email") as HTMLInputElement;
    const subject_input = document.querySelector("#asunto") as HTMLInputElement;
    const message_txtarea = document.querySelector("#mensaje") as HTMLTextAreaElement;
    const send_btn = document.querySelector("#send-button") as HTMLButtonElement;
    const reset_btn = document.querySelector("#reset-button") as HTMLButtonElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const spinner = document.querySelector("#spinner") as HTMLDivElement;


    email_input.addEventListener("input", refreshError);
    subject_input.addEventListener("input", refreshError);
    message_txtarea.addEventListener("input", refreshError);
    send_btn.addEventListener("click", sendForm);
    reset_btn.addEventListener("click", resetForm);



    function sendForm(e: Event): void {
        e.preventDefault();
        let areTheInputsValid = true;
        if (!emailValidation(email_input.value.trim().toLowerCase())) {
            areTheInputsValid = false;
            showError("Entre un email válido", email_input);
        }
        if (!textValidation(subject_input.value.trim())) {
            areTheInputsValid = false;
            showError("El asunto no puede estar vacío", subject_input);
        }
        if (!textValidation(message_txtarea.value.trim())) {
            areTheInputsValid = false;
            showError("El mensaje no puede estar vacío", message_txtarea);
        }

        if (areTheInputsValid) {
            console.log("enviando formulario");


            spinner.classList.add("flex");
            spinner.classList.remove("hidden");

            setTimeout(() => {
                spinner.classList.remove("flex");
                spinner.classList.add("hidden");
                showSuccess();
            }, 3000);





        }
    }

    function emailValidation(email: string): boolean {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function textValidation(text: string): boolean {
        return text != "" ? true : false;
    }

    function showError(text: string, referenceElement: HTMLElement): void {
        if (referenceElement.parentElement?.querySelector(".my-alert")) {
            return;
        }
        const error = document.createElement("P");
        error.textContent = text;
        error.classList.add("bg-red-600", "text-white", "P-2", "text-center", "my-alert");
        referenceElement.parentElement?.append(error);
    }

    function refreshError(e: Event): void {
        const element = e.target as HTMLInputElement;
        const error = element.parentElement?.querySelector(".my-alert") as HTMLParagraphElement;

        if (textValidation(element.value.trim())) {
            error?.remove();
            return;
        }

        showError(`El ${element.id} no puede estar vacio`, element);
    }

    function showSuccess(): void {
        const success = document.createElement("P");
        success.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
        success.textContent = "Email enviado con exito!";
        form.append(success);
        setTimeout(() => {
            success.remove();
            form.reset();
        }, 3000);

    }

    function resetForm(e: Event): void {
        e.preventDefault();
        const alerts = document.querySelectorAll(".my-alert");
        alerts.forEach((alert) => alert.remove());
        form.reset();
    }

});


// --- TODO agregar CC que sea opcional
