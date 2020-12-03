// Import node-notifier package

const notifier = require("node-notifier");

// V4 function will generate random ID

const { v4 } = require("uuid");

// create global array to store all  alarms
let alarms = [];

// change time every one second

setInterval(() => {
    const currentTime = document.getElementById("currentTime");
    let time = new Date();
    // show the current local time
    currentTime.innerHTML = time.toLocaleTimeString();
    alarms.forEach((alarm) => {
        if (alarm.hour == time.getHours() && alarm.min == time.getMinutes()) {
            // show notificatio
            notifier.notify(alarm.message);
            // remove the alarm notify
            alarms = alarms.filter((a) => alarm.id !== a.id);
            // call showAlarms()
            showAlarms();
        }
    });
}, 1000);

// function to add alarms

const showAlarms = () => {
    var alarmContainer = document.getElementById("alarmContainer");
    alarmContainer.innerHTML = "";
    alarms.forEach((alarm) => {
        // append eacch alarm to  the alarmContainer
        alarmContainer.innerHTML += `<div class="alarm">${alarm.message} - ${alarm.hour}:${alarm.min} <button class="deleteBtn" onclick="alarms = alarms.filter((a) => a.id !== '${alarm.id}'); showAlarms();">X</button></div>`;
    });
};

// handle alarm button
const addAlarm = document.getElementById("addAlarm");
// on click call the flowing function
addAlarm.addEventListener("click", () => {
    const timeBox = document.getElementById("time");
    const messageBox = document.getElementById("message");
    // handle error when user enter nothing
    if (timeBox.value == "" || messageBox.value == "") {
        return alert("You must fill time and message");
    }
    const timeSplit = timeBox.value.split(":");
    // add alarm to the array
    alarms.push({
        id: v4(),
        hour: timeSplit[0],
        min: timeSplit[1],
        message: messageBox.value
    });
    // call showAlarms()
    showAlarms();
});
