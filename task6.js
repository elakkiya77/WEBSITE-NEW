
let birthdays = [];

let today = new Date();

document.getElementById("today").textContent =
    "Today: " + today.toLocaleDateString();

// Add birthday
function addBirthday() {
    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;

    if (name === "" || date === "") {
        alert("Enter name and birthday!");
        return;
    }

    // includes() concept: check names already added
    let names = birthdays.map(function(person) {
        return person.name.toLowerCase();
    });

    if (names.includes(name.toLowerCase())) {
        alert("This name is already added!");
        return;
    }

    // push()
    birthdays.push({
        name: name,
        date: date
    });

    document.getElementById("name").value = "";
    document.getElementById("date").value = "";

    displayBirthdays();
}

// Display birthdays
function displayBirthdays() {
    let search = document.getElementById("search").value.toLowerCase();

    // filter()
    let result = birthdays.filter(function(person) {
        return person.name.toLowerCase().includes(search);
    });

    // sort()
    result.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });

    // map()
    document.getElementById("list").innerHTML =
        result.map(function(person) {
            return `
                <li>
                    ${person.name} - ${person.date}
                    <button onclick="deleteBirthday('${person.name}')">
                        Delete
                    </button>
                </li>
            `;
        }).join("");
}

// Show all birthdays
function showAll() {
    document.getElementById("search").value = "";
    displayBirthdays();
}

// Show birthdays from today onwards
function showUpcoming() {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // filter()
    let upcoming = birthdays.filter(function(person) {
        let birthday = new Date(person.date + "T00:00:00");
        return birthday >= todayDate;
    });

    // map()
    document.getElementById("list").innerHTML =
        upcoming.map(function(person) {
            return `<li>${person.name} - ${person.date}</li>`;
        }).join("");
}

// Find and delete birthday
function deleteBirthday(name) {
    // find()
    let person = birthdays.find(function(item) {
        return item.name === name;
    });

    if (person) {
        // findIndex()
        let index = birthdays.findIndex(function(item) {
            return item.name === name;
        });

        // splice()
        birthdays.splice(index, 1);
    }

    displayBirthdays();
}

displayBirthdays();
