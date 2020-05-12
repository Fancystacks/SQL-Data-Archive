// event handlers
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/getPosts')
    .then(response => response.json())
    .then(data => showDataTable(data['data']));
});

const addButton = document.querySelector("#add-button");

addButton.onclick = function() {
    const inputName = document.querySelector('#input-name');
    const name = inputName.value;
    inputName.value = '';
    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRow(data['data']));
}

function insertRow(data) {

}

function showDataTable(data) {
    const table = document.querySelector('table tbody');
    console.log(data);
    
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data</td></tr>";
        return;
    }
    let tableHTML = "";
    data.forEach(function ({id, name, date_added}) {
    tableHTML += "<tr>";
    tableHTML += `<td>${id}</td>`;
    tableHTML += `<td>${name}</td>`;
    tableHTML += `<td>${date_added}</td>`;
    tableHTML += `<td><button class="edit-button" data-id=${id}>Edit</td>`;
    tableHTML += `<td><button class="delete-button" data-id=${id}>Delete</td>`;
    tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;
}

// helpers