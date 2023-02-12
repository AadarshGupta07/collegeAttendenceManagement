/**
 *  Loader fade animation
 */
window.addEventListener("load", function () {
    const container = document.querySelector(".grid");
    container.classList.add("show");
});

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCmKYZFQWGlWEE7OmmePWz7Oabf0woA-Q0",
    authDomain: "attendence-aadarsh.firebaseapp.com",
    databaseURL: "https://attendence-aadarsh-default-rtdb.firebaseio.com",
    projectId: "attendence-aadarsh",
    storageBucket: "attendence-aadarsh.appspot.com",
    messagingSenderId: "392307017002",
    appId: "1:392307017002:web:8101d3b177783b71c04a53",
    measurementId: "G-FY6X7RPG5C"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get references to the form and table elements
const attendanceForm = document.querySelector("#attendance-form");
const attendanceTable = document.querySelector("#attendance-table");

// Listen for submit events on the form
attendanceForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the form
    const name = document.querySelector("#name").value;
    const roll = document.querySelector("#roll").value;
    const lecture1 = document.querySelector("#lecture1").checked;
    const lecture2 = document.querySelector("#lecture2").checked;
    const lecture3 = document.querySelector("#lecture3").checked;
    const lecture4 = document.querySelector("#lecture4").checked;
    const lecture5 = document.querySelector("#lecture5").checked;
    const lecture6 = document.querySelector("#lecture6").checked;
    const date = new Date().toLocaleString();

    // Use the set() method to store the values under a specific identifier
    firebase.database().ref('attendance/' + name).set({
        name: name,
        roll: roll,
        lecture1: lecture1,
        lecture2: lecture2,
        lecture3: lecture3,
        lecture4: lecture4,
        lecture5: lecture5,
        lecture6: lecture6,
        date: date
    }).then(() => {
        // alert("Data added successfully");
    })
        .catch((error) => {
            alert(error);
        });

    // Reset the form
    attendanceForm.reset();
});
