function validate(name, price, storage, category) {
    const regEX2 = /^[a-zA-Z0-9 - ]{3,}$/;

    if (!regEX2.test(name.value)) {
        alert("Belgilar soni 3 tadan ko'p bo'lishi kerak");
        name.setAttribute('class', "form-control border-danger border-5");
        name.focus();
        return false;
    }

    if (!Number(price.value)) {
        alert("Narxiga raqam yozilshi kerak");
        price.setAttribute('class', "form-control border-danger border-5");
        price.focus();
        return false;
    }

    if (!Number(storage.value)) {
        alert("Xotirasiga raqam yozilshi kerak");
        storage.setAttribute('class', "form-control border-danger border-5");
        storage.focus();
        return false;
    }

    if (category.value === "") {
        alert("Select phone category");
        category.setAttribute('class', "form-control border-danger border-5");
        category.focus();
        return false;
    }
    

    return true;
}

function createNewRow(phone, index) {
    return `
    <tr>
    <td class="text-center">${index}</td>
    <td class="text-center">${phone.name}</td>
    <td class="text-center">${phone.price}$</td>
    <td class="text-center">${phone.storage}GB</td>
    <td class="text-center">${phone.category}</td>
    <td value="data_${phone.id}" class="text-center">
        <i id="edit"  style="cursor:pointer" class="fa-solid fa-pen-to-square"></i>
        <i id="delete" style="cursor:pointer" class="fa-solid fa-trash mx-3"></i>
    </td>
</tr>
    `;
}

const recursive = function(arg){
    if (arg.length === 0) {
        return false;
    };

    let deleteButtons = document.querySelectorAll("#delete");

    deleteButtons && deleteButtons.forEach(trash => {
        trash && trash.addEventListener("click", function() {
            let isDelete = confirm("Rostdan ham o'chirilsinmi?");
            
            if (isDelete) {
                
                // delete from LocalStorage 
                let id = trash.parentNode.getAttribute("value").substring(5);
                arg = arg.filter(item => {
                    return id != item.id;
                });
                localStorage.setItem("phones", JSON.stringify(arg))


                // delete from UI
                tbody.innerHTML = "";
                    arg.length && arg.forEach((item, index) => {
                        let tr = createNewRow(item, index+1);
                        tbody.innerHTML += tr;
                    });
                
                    recursive(arg);
                

            } 
        });
    });

    
   };


export {validate, createNewRow, recursive}