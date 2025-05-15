const app_clock_digital = document.querySelector("div.app-clock-digital");
const app_clock_analog = document.querySelector("div.app-clock-analog");
const clock_digital_display = document.querySelector("span.time");
const clock_analog_hands = document.querySelectorAll("div.analog-hand");
const app_modes = document.querySelectorAll("div.app-mode");
const clock_modes = document.querySelectorAll("div.clock-mode");
let date = new Date();
let time = date.toLocaleTimeString();
let analog_seconds = 0;
let analog_minutes = 0;
let analog_hours = 0;
let analog_hours_shift = 0;
let app_mode_value = "clock";
let clock_mode_value = "digital";
let clock_swap = true;

//pobieranie czasu
setInterval(() => {
    date = new Date();
    time = date.toLocaleTimeString();
    clock_digital_display.innerText = time;
}, 500);

//obrót zegara analogowego
setInterval(() => {
    date = new Date();
    analog_seconds = date.getSeconds();
    analog_minutes = date.getMinutes();
    analog_hours = date.getHours();
    clock_analog_hands[0].style.rotate = (analog_seconds * 6) + "deg";
    clock_analog_hands[1].style.rotate = (analog_minutes * 6) + "deg";
    clock_analog_hands[2].style.rotate = ((analog_hours * 30) +
    (analog_minutes / 2)) + "deg";
    if (analog_seconds == 360) analog_seconds = 0;
    if (analog_minutes == 360) analog_seconds = 0;
    if (analog_hours == 360) analog_hours = 0;
}, 500);

//zmiana trybu aplikacji
app_modes.forEach(function(changer) {
    changer.addEventListener("click", app_change_mode);
    function app_change_mode() {
        app_mode_value = changer.getAttribute("value");
        switch (app_mode_value) {
            case "stopwatch":
                if (clock_mode_value == "analog") {
                    clock_modes[0].style.display = "none";
                    clock_modes[1].style.display = "flex";
                    clock_modes[2].style.display = "none";
                } else if (clock_mode_value == "digital") {
                    clock_modes[0].style.display = "none";
                    clock_modes[1].style.display = "none";
                    clock_modes[2].style.display = "flex";
                }
                clock_swap = false;
                break;
            case "timer":
                if (clock_mode_value == "analog") {
                    clock_modes[0].style.display = "none";
                    clock_modes[1].style.display = "flex";
                    clock_modes[2].style.display = "none";
                } else if (clock_mode_value == "digital") {
                    clock_modes[0].style.display = "none";
                    clock_modes[1].style.display = "none";
                    clock_modes[2].style.display = "flex";
                }
                clock_swap = false;
                break;
            case "clock":
                clock_change_mode();
                break;
            default:
                break;
        }
    }
    function clock_change_mode() {
        switch (clock_mode_value) {
            case "analog":
                if (clock_mode_value == "analog" && clock_swap == true) {
                    app_clock_digital.style.display = "flex";
                    app_clock_analog.style.display = "none";
                    clock_mode_value = "digital";
                    clock_swap = true;
                } else {
                    app_clock_digital.style.display = "none";
                    app_clock_analog.style.display = "block";
                    clock_mode_value = "analog";
                    clock_swap = true;
                }
                break;
            case "digital":
                if (clock_mode_value == "digital" && clock_swap == true) {
                    app_clock_digital.style.display = "none";
                    app_clock_analog.style.display = "block";
                    clock_mode_value = "analog";
                    clock_swap = true;
                } else {
                    app_clock_digital.style.display = "flex";
                    app_clock_analog.style.display = "none";
                    clock_mode_value = "digital";
                    clock_swap = true;
                }
                break;
            default:
                break;
        }
        clock_modes[0].style.display = "flex";
        clock_modes[1].style.display = "none";
        clock_modes[2].style.display = "none";
    }
});

app_clock_digital
app_clock_analog