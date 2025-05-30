const app_clock_digital = document.querySelector("div.app-clock-digital");
const app_clock_analog = document.querySelector("div.app-clock-analog");
const app_stopwatch = document.querySelector("div.app-stopwatch");
const app_timer = document.querySelector("div.app-timer");
const clock_digital_display = document.querySelector("span.digital-display");
const clock_analog_hands = document.querySelectorAll("div.analog-hand");
const stopwatch_display = document.querySelector("span.stopwatch-display");
const stopwatch_start_btn = document.querySelector("div.stopwatch-buttons button.start");
const stopwatch_reset_btn = document.querySelector("div.stopwatch-buttons button.reset");
const timer_inputs = document.querySelectorAll("div.timer-container input");
const timer_container = document.querySelector("div.timer-container");
const timer_display = document.querySelector("span.timer-counter");
const timer_start_btn = document.querySelector("div.timer-buttons button.start");
const timer_reset_btn = document.querySelector("div.timer-buttons button.reset");
const app_modes_btn = document.querySelectorAll("div.app-mode");
const clock_modes_btn = document.querySelectorAll("div.clock-mode");
const settings_btn = document.querySelector("div#settings-btn");
const settings_panel = document.querySelector("div.settings");
const settings_cross = document.querySelector("svg#cross");
const settings_sound_range = document.querySelector('input[name="sound"]');
const settings_sound_label = document.querySelector("span.sound-value");
const settings_sound_btn = document.querySelector("button.custom-sound-btn");
const settings_sound_handler = document.querySelector('input[name="custom-sound"]');
const settings_music_range = document.querySelector('input[name="music"]');
const settings_music_label = document.querySelector("span.music-value");
const settings_music_btn = document.querySelector("button.custom-music-btn");
const settings_music_handler = document.querySelector('input[name="custom-music"]');
const customize_btn = document.querySelector("div#customize-btn");
const customize_panel = document.querySelector("div.customize");
const customize_cross = document.querySelector("svg#cross2");
const customize_scale_range = document.querySelector('input[name="scale"]');
const customize_scale_label = document.querySelector("span.scale-value");
const text_parent = document.querySelector("p.info em");
let date = new Date();
let time = date.toLocaleTimeString();
let analog_seconds = 0;
let analog_minutes = 0;
let analog_hours = 0;
let analog_hours_shift = 0;
let stopwatch_start = 0;
let stopwatch_delay = 0;
let stopwatch_paused = 0;
let stopwatch_counter = null;
let stopwatch_elapsed = 0;
let timer_start = 0;
let timer_time = 0;
let timer_hours = 0;
let timer_minutes = 0;
let timer_counter = null;
let timer_duration = 0;
let app_mode_value = "clock";
let clock_mode_value = "digital";
let clock_swap = true;
let text = 'Copyright 2025 © Piotr Cieśla';
let text_index = 0;
let text_visible = false;

//zegar cyfrowy
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

//działanie stopera
stopwatch_start_btn.addEventListener("click", () => {
    if (stopwatch_start_btn.innerText == "Start") {
        stopwatch_start_btn.innerText = "Stop";
        if (stopwatch_start == 0) {
            stopwatch_start = new Date();
        }
        if (stopwatch_delay != 0) {
            stopwatch_paused += (new Date() - stopwatch_delay);
        }
        stopwatch_counter = setInterval(stopwatch_running, 12);	
        stopwatch_reset_btn.classList.add("disabled");
        stopwatch_reset_btn.disabled = true;
    } else {
        stopwatch_start_btn.innerText = "Start";
        stopwatch_delay = new Date();
        clearInterval(stopwatch_counter);
        stopwatch_reset_btn.classList.remove("disabled");
        stopwatch_reset_btn.disabled = false;
    }
})

stopwatch_reset_btn.addEventListener("click", () => {
    clearInterval(stopwatch_counter);
    stopwatch_start = 0;
    stopwatch_delay = 0;
    stopwatch_paused = 0;
    stopwatch_display.innerText = "00:00:00.000";
    stopwatch_reset_btn.classList.add("disabled");
    stopwatch_reset_btn.disabled = true;
});

function stopwatch_running() {
    let stopwatch_time = new Date(),
    stopwatch_elapsed = new Date(stopwatch_time - stopwatch_start - stopwatch_paused),
    sw_hour = stopwatch_elapsed.getUTCHours(),
    sw_min = stopwatch_elapsed.getUTCMinutes(),
    sw_sec = stopwatch_elapsed.getUTCSeconds(),
    sw_ms = stopwatch_elapsed.getUTCMilliseconds();

    stopwatch_display.innerText = 
    (sw_hour > 9 ? sw_hour : "0" + sw_hour) + ":" + 
    (sw_min > 9 ? sw_min : "0" + sw_min) + ":" + 
    (sw_sec > 9 ? sw_sec : "0" + sw_sec) + "." + 
    (sw_ms > 99 ? sw_ms : sw_ms > 9 ? "0" + sw_ms : "00" + sw_ms);
};

//działanie minutnika
timer_start_btn.addEventListener("click", () => {
    if (timer_start_btn.innerText == "Start") {
        timer_start_btn.innerText = "Stop";
        timer_duration = (timer_inputs[0].value * 3600)
        + (timer_inputs[1].value * 60) + timer_inputs[2].value * 1;
        timer_start = Date.now();
        function timer() {
            timer_time = Math.ceil(timer_duration - (((Date.now() - timer_start) / 1000)));
    
            timer_hours = Math.floor(timer_time / 3600);
            timer_minutes = Math.floor(timer_time / 60) - (timer_hours * 60);
            timer_seconds = (timer_time % 60);
    
            timer_hours = timer_hours < 10 ? "0" + timer_hours : timer_hours;
            timer_minutes = timer_minutes < 10 ? "0" + timer_minutes : timer_minutes;
            timer_seconds = timer_seconds < 10 ? "0" + timer_seconds : timer_seconds;
            timer_display.innerText = timer_hours + ":" + timer_minutes + ":"
            + timer_seconds; 
    
            if (timer_time == 0) {
                // console.log("END");
                clearInterval(timer_counter);
                setTimeout(() => {
                    timer_start_btn.innerText = "Start";
                    timer_container.style.display = "flex";
                    timer_display.style.display = "none";
                }, 1500);
                return;
            }
        };
        timer_counter = setInterval(timer, 1000);
        timer_container.style.display = "none";
        timer_display.style.display = "block";
        timer();
        timer_reset_btn.classList.add("disabled");
        timer_reset_btn.disabled = true;
    } else {
        timer_start_btn.innerText = "Start";
        clearInterval(timer_counter);
        timer_reset_btn.classList.remove("disabled");
        timer_reset_btn.disabled = false;
        timer_container.style.display = "flex";
        timer_display.style.display = "none";
        timer_inputs[0].value = timer_hours;
        timer_inputs[1].value = timer_minutes;
        timer_inputs[2].value = timer_seconds;
    }
});

timer_reset_btn.addEventListener("click", () => {
    timer_inputs[0].value = null;
    timer_inputs[1].value = null;
    timer_inputs[2].value = null;
    timer_reset_btn.classList.add("disabled");
    timer_reset_btn.disabled = true;
});

//zmiana trybu aplikacji
app_modes_btn.forEach(function(changer) {
    changer.addEventListener("click", app_change_mode);
    function app_change_mode() {
        app_mode_value = changer.getAttribute("value");
        switch (app_mode_value) {
            case "stopwatch":
                if (clock_mode_value == "analog") {
                    clock_modes_btn[0].style.display = "none";
                    clock_modes_btn[1].style.display = "flex";
                    clock_modes_btn[2].style.display = "none";
                } else if (clock_mode_value == "digital") {
                    clock_modes_btn[0].style.display = "none";
                    clock_modes_btn[1].style.display = "none";
                    clock_modes_btn[2].style.display = "flex";
                }
                app_clock_digital.style.display = "none";
                app_clock_analog.style.display = "none";
                app_stopwatch.style.display = "flex";
                app_timer.style.display = "none";
                clock_swap = false;
                break;
            case "timer":
                if (clock_mode_value == "analog") {
                    clock_modes_btn[0].style.display = "none";
                    clock_modes_btn[1].style.display = "flex";
                    clock_modes_btn[2].style.display = "none";
                } else if (clock_mode_value == "digital") {
                    clock_modes_btn[0].style.display = "none";
                    clock_modes_btn[1].style.display = "none";
                    clock_modes_btn[2].style.display = "flex";
                }
                app_clock_digital.style.display = "none";
                app_clock_analog.style.display = "none";
                app_stopwatch.style.display = "none";
                app_timer.style.display = "flex";
                clock_swap = false;
                break;
            case "clock":
                app_stopwatch.style.display = "none";
                app_timer.style.display = "none";
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
        clock_modes_btn[0].style.display = "flex";
        clock_modes_btn[1].style.display = "none";
        clock_modes_btn[2].style.display = "none";
    }
});

//ustawienia
settings_btn.addEventListener("click", () => {
    settings_panel.classList.toggle("settings-invisible");
    customize_panel.classList.add("customize-invisible");
    text_parent.innerHTML = "";
    text_index == text.length ? text_index = 0 : text_index;
    text_visible == true ? text_visible = false : text_writing();
});

settings_cross.addEventListener("click", () => {
    settings_panel.classList.add("settings-invisible");
    text_index = 0;
    text_parent.style.visibility = "hidden";
    text_visible = false;
})

function text_writing() {
    text_parent.style.visibility = "visible";
    text_visible = true;
    if (text_index < text.length) {
        let option = document.createElement("span");
        option.classList.add("written");
        option.innerText += text.charAt(text_index);
        text_parent.appendChild(option);
        text_index++;
        setTimeout(text_writing, 30);
    }
    if (settings_panel.classList.contains("settings-invisible") ||
        customize_panel.classList.contains("customize-invisible") == false) {
        text_parent.innerHTML = "";
        text_index = 0;
        return;
    }
}

settings_sound_range.addEventListener("input", () => {
    settings_sound_label.innerText = settings_sound_range.value;
});

settings_music_range.addEventListener("input", () => {
    settings_music_label.innerText = settings_music_range.value;
});

settings_sound_btn.addEventListener("click", () => {
    if (settings_sound_handler) {
        settings_sound_handler.click();
    }
});

settings_sound_handler.addEventListener("change", handle_sound);
function handle_sound() {};

settings_music_btn.addEventListener("click", () => {
    if (settings_music_handler) {
        settings_music_handler.click();
    }
});

settings_music_handler.addEventListener("change", handle_music);
function handle_music() {};

//panel edycji
customize_btn.addEventListener("click", () => {
    customize_panel.classList.toggle("customize-invisible");
    settings_panel.classList.add("settings-invisible");
    text_index == text.length ? text_index = 0 : text_index;
    text_visible == true ? text_visible = false : text_writing();
});

customize_cross.addEventListener("click", () => {
    customize_panel.classList.add("customize-invisible");
    text_index = 0;
    text_parent.style.visibility = "hidden";
    text_visible = false;
});

customize_scale_range.addEventListener("input", () => {
    customize_scale_label.innerText = customize_scale_range.value / 100;
});