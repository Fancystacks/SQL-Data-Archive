document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/getPosts')
    .then(response => response.json())
    .then(data => console.log(data));
    showDataTable([]);
});

function showDataTable(data) {
    const table = document.querySelector('table tbody');

if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data</td></tr>";
    }
}