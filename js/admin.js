/**
 *  Loader fade animation
 */
window.addEventListener("load", function () {
    const container = document.querySelector(".container");
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
    });

    // Reset the form
    attendanceForm.reset();
});

// Listen for value events on the Firebase database reference
const attendanceRef = database.ref("attendance");
attendanceRef.on("value", function (snapshot) {
    // Clear the table
    while (attendanceTable.rows.length > 1) {
        attendanceTable.deleteRow(1);
    }

    // Populate the table with the data from the snapshot
    snapshot.forEach(function (childSnapshot) {
        const row = attendanceTable.insertRow();
        const cellName = row.insertCell();
        const cellRoll = row.insertCell();
        const cellLecture1 = row.insertCell();
        const cellLecture2 = row.insertCell();
        const cellLecture3 = row.insertCell();
        const cellLecture4 = row.insertCell();
        const cellLecture5 = row.insertCell();
        const cellLecture6 = row.insertCell();
        const cellDate = row.insertCell();

        cellName.textContent = childSnapshot.val().name;
        cellRoll.textContent = childSnapshot.val().roll;
        cellLecture1.textContent = childSnapshot.val().lecture1 ? "Present" : "Absent";
        cellLecture2.textContent = childSnapshot.val().lecture2 ? "Present" : "Absent";
        cellLecture3.textContent = childSnapshot.val().lecture3 ? "Present" : "Absent";
        cellLecture4.textContent = childSnapshot.val().lecture4 ? "Present" : "Absent";
        cellLecture5.textContent = childSnapshot.val().lecture5 ? "Present" : "Absent";
        cellLecture6.textContent = childSnapshot.val().lecture6 ? "Present" : "Absent";
        cellDate.textContent = childSnapshot.val().date;
    });
});