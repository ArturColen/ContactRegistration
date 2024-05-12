function displayContacts() {
    let contactTable = document.getElementById('contact-table');

    contactTable.innerHTML = '';

    readContacts(data => {
        for (i = 0; i < data.length; i++) {
            let contact = data[i];

            contactTable.innerHTML += `<tr><td scope="row">${contact.id}</td>
                                            <td>${contact.name}</td>
                                            <td>${contact.phone}</td>
                                            <td>${contact.email}</td>
                                            <td>${contact.city}</td>
                                            <td>${contact.category}</td>
                                            <td>${contact.website}</td>
                                        </tr>`;
        }
    });
}

function init() {
    let contactForm = document.getElementById('contact-form');
    let contactGrid = document.getElementById('contact-grid');
    let btnInsert = document.getElementById('btnInsert');
    let btnUpdate = document.getElementById('btnUpdate');
    let btnDelete = document.getElementById('btnDelete');
    let btnClear = document.getElementById('btnClear');
    let message = document.getElementById('message');

    btnInsert.addEventListener('click', () => {
        let nameField = document.getElementById ('inputName').value;
        let phoneField = document.getElementById ('inputPhone').value;
        let emailField = document.getElementById ('inputEmail').value;
        let cityField = document.getElementById ('inputCity').value;
        let categoryField = document.getElementById ('inputCategory').value;
        let websiteField = document.getElementById ('inputWebsite').value;

        if (!contactForm.checkValidity()) {
            displayMessage('Preencha o formulário corretamente.', 'warning');
            return;
        }

        let contact = {
            name: nameField, 
            phone: phoneField, 
            email: emailField, 
            city: cityField, 
            category: categoryField,
            website: websiteField
        };

        createContact(contact, displayContacts);

        contactForm.reset();
    });

    btnUpdate.addEventListener('click', () => {
        let idField = document.getElementById('inputId').value;
        let nameField = document.getElementById ('inputName').value;
        let phoneField = document.getElementById ('inputPhone').value;
        let emailField = document.getElementById ('inputEmail').value;
        let cityField = document.getElementById ('inputCity').value;
        let categoryField = document.getElementById ('inputCategory').value;
        let websiteField = document.getElementById ('inputWebsite').value;

        if (idField == '') {
            displayMessage('Selecione um contato para ser alterado.', 'warning');
            return;
        }
        
        let contact = {
            name: nameField, 
            phone: phoneField, 
            email: emailField, 
            city: cityField, 
            category: categoryField,
            website: websiteField
        };

        updateContacts(parseInt(idField), contact, displayContacts);

        contactForm.reset();
    });

    btnDelete.addEventListener('click', () => {
        let idField = document.getElementById('inputId').value;
        
        if (idField == '') {
            displayMessage('Selecione um contato a ser excluído.', 'warning');
            return;
        }

        deleteContact(parseInt(idField), displayContacts);

        contactForm.reset();
    });

    btnClear.addEventListener('click', () => {             
        contactForm.reset();
    });

    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target === message && mutation.type === 'childList' && message.innerHTML !== '') {
                setTimeout(() => {
                    let alert = message.getElementsByClassName('alert');

                    if (alert.length > 0) {
                        alert[0].remove();
                    }
                }, 5000);
            }
        });
    });

    contactGrid.addEventListener('click', (e) => {
        if (e.target.tagName == 'TD') { 
            let contactRow = e.target.parentNode;
            let columns = contactRow.querySelectorAll('td');
    
            idField = columns[0].innerText;
            document.getElementById('inputId').value = idField;
            document.getElementById('inputName').value = columns[1].innerText;
            document.getElementById('inputPhone').value = columns[2].innerText;
            document.getElementById('inputEmail').value = columns[3].innerText;
            document.getElementById('inputCity').value = columns[4].innerText;
            document.getElementById('inputCategory').value = columns[5].innerText;
            document.getElementById('inputWebsite').value = columns[6].innerText;
        }
    });

    displayContacts();
}