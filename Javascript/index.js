import { validate, createNewRow, recursive } from "./functions.js";

const button = document.getElementById("button");
const phoneName = document.getElementById("phoneName");
const phonePrice = document.getElementById("phonePrice");
const phoneStorage = document.getElementById("phoneStorage");
const phoneYonkus = document.getElementById("phoneYonkus");
const phoneCategory = document.getElementById("phoneCategory");
const form = document.getElementById("form");
const tbody = document.getElementById("tbody");

// data get to LocalStorage
function getArray() {
    let data = localStorage.getItem('phones')?JSON.parse(localStorage.getItem('phones')):[];
    return data;
}

button && button.addEventListener('click', function(event) {
    event.preventDefault();

    if (validate(phoneName, phonePrice, phoneStorage, phoneCategory, phoneYonkus)) {

        phoneName.setAttribute('class', "form-control");
        phonePrice.setAttribute('class', "form-control");
        phoneStorage.setAttribute('class', "form-control");
        phoneYonkus.setAttribute('class', "form-control");
        phoneCategory.setAttribute('class', "form-control");
        
        let phone = {
            id: Date.now(),
            name:phoneName.value,
            price:phonePrice.value,
            storage:phoneStorage.value,
            yonkus:phoneYonkus.value,
            category:phoneCategory.value
        };

         // data save to LocalStorage
         let data = getArray();
         data.push(phone);
         localStorage.setItem("phones", JSON.stringify(data));

        // data save to UI
        let tr = createNewRow(phone, data.length);
        tbody.innerHTML += tr;
        form.reset();

        recursive(data);

    };
});

document.addEventListener("DOMContentLoaded", function() {
    let data = getArray();

    data.length && data.forEach((phone, index) => {
        let tr = createNewRow(phone, index+1);
        tbody.innerHTML += tr;
    });

   recursive(data);
});