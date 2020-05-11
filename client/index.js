document.addEventListener('DOMContentLoaded', () => {
    showDataTable([]);
});

function showDataTable(data) {
    const table = document.querySelector('table tbody');

if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data</td></tr>";
    }
}