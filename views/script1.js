// const contact=document.getElementById("help");
document.addEventListener('DOMContentLoaded', function() {
    const flightButton = document.querySelector('.flight-button');
    const trainButton = document.querySelector('.train-button');

    // Function to simulate fetching data for flights
    function fetchDataForFlights() {
        // Simulate API call or data fetching logic here
        const data = [
            { departureFrom: 'New York', arrivalTo: 'Los Angeles', dateOfTravel: '2024-06-01', status: 'Available' },
            // Add more flight options
        ];
        displayData(data);
    }

    // Function to simulate fetching data for trains
    function fetchDataForTrains() {
        // Simulate API call or data fetching logic here
        const data = [
            { departureFrom: 'Chicago', arrivalTo: 'San Francisco', dateOfTravel: '2024-06-02', status: 'Available' },
            // Add more train options
        ];
        displayData(data);
    }

    // Function to display data
    function displayData(data) {
        const contentContainer = document.getElementById('dynamicContent');
        let html = '<table>';
        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.departureFrom}</td>
                    // <td>${item.arrivalTo}</td>
                    // <td>${item.dateOfTravel}</td>
                    // <td>${item.status}</td>
                </tr>
            `;
        });
        html += '</table>';
        contentContainer.innerHTML = html;
    }

    // Event listeners for buttons
    flightButton.addEventListener('click', fetchDataForFlights);
    trainButton.addEventListener('click', fetchDataForTrains);
});