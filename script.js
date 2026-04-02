// Trip data
const trips = [
    { name: "Ella Day Tour", price: "Rs. 50,000" },
    { name: "Kandy Cultural Tour", price: "Rs. 45,500" },
    { name: "Sigiriya & Dambulla", price: "Rs. 60,000" },
    { name: "Galle Beach Trip", price: "Rs. 25,000" }
];

// Load trips
const tripList = document.getElementById("tripList");
const tripSelect = document.getElementById("trip");

trips.forEach((trip) => {
    // show trips
    tripList.innerHTML += `
        <div class="trip-card">
            <h3>${trip.name}</h3>
            <p>Price: ${trip.price}</p>
        </div>
    `;

    // booking dropdown
    tripSelect.innerHTML += `<option>${trip.name}</option>`;
});

// Booking form
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let trip = document.getElementById("trip").value;
    let date = document.getElementById("date").value;

    if (name === "" || phone === "" || trip === "" || date === "") {
        alert("Please fill all fields");
    } else {
        document.getElementById("message").innerHTML =
            "✅ Booking successful! We will contact you soon.";
        this.reset();
    }
});
// Load trips
fetch("backend/getTrips.php")
.then(res => res.json())
.then(data => {
    let list = document.getElementById("tripList");
    let select = document.getElementById("trip");

    data.forEach(trip => {
        list.innerHTML += `
            <div class="trip-card">
                <h3>${trip.name}</h3>
                <p>${trip.description}</p>
                <strong>${trip.price}</strong>
            </div>
        `;
        select.innerHTML += `<option>${trip.name}</option>`;
    });
});

// Booking
document.getElementById("bookingForm").addEventListener("submit", e => {
    e.preventDefault();

    let formData = new FormData(e.target);

    fetch("backend/bookTrip.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(msg => {
        if (msg === "success") {
            alert("Booking successful!");
            e.target.reset();
        } else {
            alert("Booking failed!");
        }
    });
});
