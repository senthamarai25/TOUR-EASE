// ========================================
// TourEase AI - Main JavaScript
// ========================================


// Store selected interest
let selectedInterest = "Culture";


// ========================================
// SCREEN NAVIGATION
// ========================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// INTEREST SELECTION
// ========================================

const interestButtons = document.querySelectorAll(".interest");

interestButtons.forEach(button => {

    button.addEventListener("click", function () {

        interestButtons.forEach(btn => {
            btn.classList.remove("active-interest");
        });

        this.classList.add("active-interest");

        selectedInterest = this.dataset.interest;
    });

});


// ========================================
// GENERATE AI TRIP
// ========================================

function generateTrip() {

    const destinationInput =
        document.getElementById("destination").value.trim();

    const budgetInput =
        Number(document.getElementById("budget").value);

    const daysInput =
        Number(document.getElementById("days").value);


    // Validation

    if (destinationInput === "") {
        showToast("📍 Please enter your destination");
        return;
    }

    if (!budgetInput || budgetInput <= 0) {
        showToast("💰 Please enter a valid budget");
        return;
    }


    // Update trip summary

    document.getElementById("tripDestination").textContent =
        destinationInput;

    document.getElementById("tripBudget").textContent =
        "₹" + budgetInput.toLocaleString("en-IN");

    document.getElementById("tripDays").textContent =
        daysInput + (daysInput === 1 ? " Day" : " Days");

    document.getElementById("tripInterest").textContent =
        selectedInterest;


    // Generate itinerary

    generateItinerary(
        destinationInput,
        daysInput,
        selectedInterest
    );


    // Generate estimated cost

    generateCost(
        budgetInput,
        daysInput
    );


    // Open trip screen

    showScreen("trip");

    showToast("✨ AI trip plan generated!");
}


// ========================================
// ITINERARY GENERATOR
// ========================================

function generateItinerary(destination, days, interest) {

    const itinerary =
        document.getElementById("itinerary");

    itinerary.innerHTML = "";


    const activities = {

        Culture: [
            ["🏛️", "Historical Place", "Explore the famous heritage site"],
            ["🛕", "Temple / Museum", "Discover local history and culture"],
            ["🎨", "Cultural Experience", "Experience traditional art and crafts"]
        ],

        Food: [
            ["🍛", "Local Breakfast", "Try an authentic local breakfast"],
            ["🍲", "Traditional Lunch", "Taste famous regional dishes"],
            ["🍨", "Local Food Street", "Explore popular local food spots"]
        ],

        Nature: [
            ["🌿", "Nature Spot", "Relax and enjoy the natural surroundings"],
            ["🌅", "Scenic View", "Visit a beautiful viewpoint"],
            ["🌳", "Eco Experience", "Enjoy a peaceful nature experience"]
        ],

        Adventure: [
            ["🏕️", "Adventure Activity", "Try a popular local adventure"],
            ["🚲", "Cycling / Exploration", "Explore the destination actively"],
            ["🌄", "Outdoor Experience", "Enjoy an outdoor activity"]
        ]

    };


    const selectedActivities =
        activities[interest] || activities.Culture;


    for (let day = 1; day <= days; day++) {

        const dayCard =
            document.createElement("div");

        dayCard.className = "day-card";


        let html = `
            <h3>Day ${day}</h3>
        `;


        // Morning

        html += `
            <div class="activity">
                <div class="activity-icon">🌅</div>
                <div>
                    <h4>Morning</h4>
                    <p>${selectedActivities[0][1]} – ${selectedActivities[0][2]}</p>
                </div>
            </div>
        `;


        // Afternoon

        html += `
            <div class="activity">
                <div class="activity-icon">${selectedActivities[1][0]}</div>
                <div>
                    <h4>Afternoon</h4>
                    <p>${selectedActivities[1][1]} – ${selectedActivities[1][2]}</p>
                </div>
            </div>
        `;


        // Evening

        html += `
            <div class="activity">
                <div class="activity-icon">${selectedActivities[2][0]}</div>
                <div>
                    <h4>Evening</h4>
                    <p>${selectedActivities[2][1]} – ${selectedActivities[2][2]}</p>
                </div>
            </div>
        `;


        dayCard.innerHTML = html;

        itinerary.appendChild(dayCard);
    }
}


// ========================================
// COST CALCULATOR
// ========================================

function generateCost(budget, days) {

    /*
       This is only a prototype estimation.
       Real application would use live hotel,
       transport and ticket APIs.
    */

    let hotel =
        Math.round(budget * 0.35);

    let transport =
        Math.round(budget * 0.20);

    let food =
        Math.round(budget * 0.20);

    let tickets =
        Math.round(budget * 0.10);

    let total =
        hotel + transport + food + tickets;


    document.getElementById("hotelCost").textContent =
        "₹" + hotel.toLocaleString("en-IN");

    document.getElementById("transportCost").textContent =
        "₹" + transport.toLocaleString("en-IN");

    document.getElementById("foodCost").textContent =
        "₹" + food.toLocaleString("en-IN");

    document.getElementById("ticketCost").textContent =
        "₹" + tickets.toLocaleString("en-IN");

    document.getElementById("totalCost").textContent =
        "₹" + total.toLocaleString("en-IN");
}


// ========================================
// HOTEL BOOKING
// ========================================

function bookHotel(hotelName) {

    showToast(
        "✅ " + hotelName + " selected for booking!"
    );

}


// ========================================
// PLACE DETAILS
// ========================================

function showDetails(placeName) {

    showToast(
        "📍 Exploring " + placeName
    );

}


// ========================================
// EMERGENCY SOS
// ========================================

function emergencyAlert() {

    const confirmed =
        confirm(
            "🚨 Emergency SOS\n\nDo you want to activate emergency assistance?"
        );

    if (confirmed) {

        showToast(
            "🚨 Emergency alert activated!"
        );

    }

}


// ========================================
// SHARE LOCATION
// ========================================

function shareLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Location sharing is not supported."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            const locationText =
                `My current location: ${latitude}, ${longitude}`;


            if (navigator.share) {

                navigator.share({
                    title: "TourEase AI Location",
                    text: locationText
                });

            } else {

                navigator.clipboard.writeText(
                    locationText
                );

                showToast(
                    "📍 Location copied!"
                );
            }

        },

        function () {

            showToast(
                "❌ Unable to access your location."
            );

        }

    );

}


// ========================================
// SAFETY CONTACT
// ========================================

function showContact(type) {

    if (type === "Hospital") {

        showToast(
            "🏥 Finding nearby hospitals..."
        );

    } else {

        showToast(
            "👮 Finding nearby police stations..."
        );

    }

}


// ========================================
// TOAST MESSAGE
// ========================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}