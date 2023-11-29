document.addEventListener('DOMContentLoaded', function () {
  const newProjectForm = document.getElementById('newProjectForm');
  const queryResultContainer = document.getElementById('queryResultContainer');

  // Event listener for running a query
  document.getElementById('runQueryButton').addEventListener('click', async function () {
    const query = document.getElementById('query').value;

    if (query.trim() === '') {
      alert('Please enter a valid SQL query.');
      return;
    }

    try {
      const response = await fetch('/run-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const result = await response.json();
        displayQueryResult(result);
      } else {
        alert('Error running the query. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  });

  function displayQueryResult(result) {
    queryResultContainer.innerHTML = '';

    if (result && result.length > 0) {
      const table = document.createElement('table');
      table.className = 'table table-bordered';

      const headerRow = table.createTHead().insertRow(0);
      Object.keys(result[0]).forEach((key) => {
        const th = document.createElement('th');
        th.innerText = key;
        headerRow.appendChild(th);
      });

      result.forEach((row) => {
        const tr = table.insertRow();
        Object.values(row).forEach((value) => {
          const td = tr.insertCell();
          td.innerText = value;
        });
      });

      queryResultContainer.appendChild(table);
    } else {
      queryResultContainer.innerText = 'No results to display.';
    }
  }
});
