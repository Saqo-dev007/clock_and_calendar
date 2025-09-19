// var today = new Date();

// console.log(today);

// console.log(today.toDateString());
// console.log(today.toISOString());
// console.log(today.toUTCString());
// console.log(today.toLocaleDateString());
// console.log(today.toLocaleString());
// console.log(today.toLocaleTimeString());
// console.log(today.toString());
// console.log(today.toTimeString());

// console.log(today.getFullYear());
// console.log(today.getMonth());
// console.log(today.getDate());
// console.log(today.getDay());
// console.log(today.getTime());

// today.setFullYear(2009);
// today.setTime(1752335000000);

// console.log(today);
var clock = document.getElementById('clock');

for (let i = 1; i <= 12; i++) {
    var number = document.createElement('div');
    number.className = 'number';
    number.textContent = i;

    var angle = (i - 3) * (Math.PI * 2) / 12;
    var radius = parseInt(getComputedStyle(clock).width) / 2 - 45;
    var centerX = parseInt(getComputedStyle(clock).width) / 2;
    var centerY = parseInt(getComputedStyle(clock).height) / 2;

    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);

    number.style.left = `${x}px`;
    number.style.top = `${y}px`;

    clock.appendChild(number);
}

var hourHand = document.getElementById('hour');
var minuteHand = document.getElementById('minute');
var secondHand = document.getElementById('second');

function updateClock() {
    var now = new Date();
    var seconds = now.getSeconds();
    var minutes = now.getMinutes();
    var hours = now.getHours();

    var secondDeg = (seconds * 6) - 90;
    var minuteDeg = (minutes * 6 + seconds * (1 / 60)) - 90;
    var hourDeg = ((hours % 12) * 30 + minutes * 0.5) - 90;

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

var ampmBtn = document.querySelector(".ampm");

function updateClockd() {
    var now = new Date();

    var hour = now.getHours() + "";
    var minute = now.getMinutes() + ""
    var second = now.getSeconds() + "";
    var ampm = +hour % 12 > 0 ? "PM" : "AM";

    // if (ampmBtn.innerHTML === "PM") {
    //     hour = +hour ? +hour : 12;
    // } else if (ampmBtn.innerHTML === "AM") {

    // }

    hour = +hour % 12;
    hour = +hour ? +hour : 12;

    hour = hour + "";

    if (hour.length === 1) {
        hour = "0" + hour;
    }

    if (minute.length === 1) {
        minute = "0" + minute;
    }

    if (second.length === 1) {
        second = "0" + second;
    }

    document.getElementById('hourd').innerHTML = hour;
    document.getElementById('minuted').innerHTML = minute;
    document.getElementById('secondd').innerHTML = second;
    document.querySelector(".ampm").innerText = ampm;
}

function changeAMPM() {
    if (document.querySelector(".ampm").style.display === "none") {
        document.querySelector(".ampm").style.display = "block";
    } else {
        document.querySelector(".ampm").style.display = "none";
    }
}

setInterval(updateClockd, 1000);
updateClockd();

var calendarDays = document.getElementById("calendarDays");
var monthYear = document.getElementById("monthYear");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

var date = new Date();

function renderCalendar() {
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = new Date();

    var firstDayOfMonth = new Date(year, month, 1).getDay();
    var lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    var lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    monthYear.innerText = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarDays.innerHTML = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        var day = document.createElement("div");
        day.classList.add("prev-date");
        day.innerText = lastDateOfPrevMonth - i + 1;
        calendarDays.appendChild(day);
    }

    for (var i = 1; i <= lastDateOfMonth; i++) {
        var day = document.createElement("div");
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            day.classList.add("today");
        }
        day.innerText = i;
        calendarDays.appendChild(day);
    }

    var totalBoxes = calendarDays.children.length;
    var remaining = 42 - totalBoxes;
    for (var i = 1; i <= remaining; i++) {
        var day = document.createElement("div");
        day.classList.add("next-date");
        day.innerText = i;
        calendarDays.appendChild(day);
    }
}

function toPrevMonth() {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

function toNextMonth() {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

renderCalendar();