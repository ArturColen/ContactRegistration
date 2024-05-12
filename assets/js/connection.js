const apiUrl = 'https://c91f50e2-b655-4f03-891e-bf24db51af7b-00-159fy8gpq18cc.picard.replit.dev/contatos';

function displayMessage(message, alertType) {
    let messageElement = document.getElementById('message');
    messageElement.innerHTML = `<div class="alert alert-${alertType}">${message}</div>`;
}

function createContato(contact, updateFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Contato inserido com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao inserir contato via JSON Server:', error);
            displayMessage('Erro ao inserir contato', 'danger');
        });
}

function readContato(processData) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processData(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via JSON Server:', error);
            displayMessage('Erro ao ler contatos', 'danger');
        });
}

function updateContato(id, contact, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Contato alterado com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar contato via JSON Server:', error);
            displayMessage('Erro ao atualizar contato', 'danger');
        });
}

function deleteContato(id, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Contato removido com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao remover contato via JSON Server:', error);
            displayMessage('Erro ao remover contato', 'danger');
        });
}