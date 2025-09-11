document.getElementById('submit').addEventListener('click', fetchData);

async function fetchData() {
  const searchTerm = document.getElementById('textbar').value.toLowerCase();
  const resultsDiv = document.getElementById('messagespace');

  // Clear previous results
  resultsDiv.innerHTML = '';

  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filter the data based on user input
    const filteredData = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.age.toString().includes(searchTerm)
    );
    
    // Display results or a "no results" message
    if (filteredData.length > 0) {
      filteredData.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>Author:</strong> ${item.name}</p>
          <p><strong>Year:</strong> ${item.age}</p>
        `;
        resultsDiv.appendChild(cardDiv);
      });
    } else {
      resultsDiv.innerHTML = '<p>No results found.</p>';
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
  }
}