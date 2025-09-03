const div = document.getElementById("messagespace");

//FETCH JSON DATA //
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        //process and display json here
        for (const key in data) {
            const element = document.createElement('p');
            element.innerHTML = `<strong>${key}:</strong>${data[key]}`;
            div.appendChild(element);
        }
    })
    .catch(error => console.error('error fetching JSON:', error))
