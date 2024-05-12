var db = []

readContato(data => {
    db = data;
    listContacts();
});

function listContacts() {
    let cityFilter = document.getElementById('city-filter').value;
    let categoryFilter = document.getElementById('category-filter').value;
    let contactTable = document.getElementById('contact-table');

    contactTable.innerHTML = '';

    for (let i = 0; i < db.length; i++) {
        const contact = db[i];

        if (((contact.city == cityFilter) || (cityFilter == '')) && ((contact.category == categoryFilter) || (categoryFilter == ''))) {
            
            contactTable.innerHTML += `<tr><td scope="row">${contact.id}</td>
                                            <td>${contact.name}</td>
                                            <td>${contact.phone}</td>
                                            <td>${contact.email}</td>
                                            <td>${contact.city}</td>
                                            <td>${contact.category}</td>
                                            <td>${contact.website}</td>
                                        </tr>`;
        }
    }
}