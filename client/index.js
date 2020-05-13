// event handlers
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/getPosts')
    .then(response => response.json())
    .then(data => showDataTable(data['data']));
});

document.querySelector('table tbody').addEventListener("click", function(event) {
    if(event.target.className ==="delete-button") {
        deleteRow(event.target.dataset.id)
    }
    if (event.target.className === "edit-button") {
        editRow(event.target.dataset.id)
    }
});

// delete button & reload page
function deleteRow(id) {
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

// update edit button
function editRow(id) {
const editSection = document.querySelector("#edit-row");
editSection.hidden = false;
document.querySelector("#update-input").dataset.id = id;
}

const editButton = document.querySelector("#update-button");

editButton.onclick = function() {
const updatedName = document.querySelector("#update-input");
fetch('http://localhost:3000/update', {
    method: 'PATCH',
    headers: {
        'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        id: updatedName.dataset.id,
        name: updatedName.value
    })
}).then(response => response.json())
.then(data => {
    if(data.success) {
        location.reload();
    }
});
}

// add a name
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
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHTML = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === "dateAdded") {
                data[key] = new Date(data[key].toLocaleString());
            }
            tableHTML += `<td>${data[key]}</td>`;
        }
    }

    tableHTML += `<td><button class="edit-button" data-id=${data.id}>Edit</td>`;
    tableHTML += `<td><button class="delete-button" data-id=${data.id}>Delete</td>`;

    tableHTML += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHTML;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }

}

// display info if exists
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
    tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHTML += `<td><button class="edit-button" data-id=${id}>Edit</td>`;
    tableHTML += `<td><button class="delete-button" data-id=${id}>Delete</td>`;
    tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;
}