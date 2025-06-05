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
const settings_fullscreen_btn = document.querySelector('input[name="fullscreen"]');
const settings_delay_btn = document.querySelector('input[name="delay"]');
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
const customize_back_colors = document.querySelectorAll('input[name="back-color"]');
const customize_bubbles_colors = document.querySelectorAll('input[name="bubble-color"]');
const customize_analog_colors = document.querySelectorAll('input[name="analog-color"]');
const customize_digital_font = document.querySelector('select[name="digital-font"]');
const customize_analog_font = document.querySelector('select[name="analog-font"]');
const customize_font_color = document.querySelector('input[name="font-color"]');
const customize_pointers = document.querySelector('input[name="pointers"]');
const customize_app_back = document.querySelector('input[name="app-background"]');
const customize_background_btn = document.querySelector("button.custom-background-btn");
const customize_background_handler = document.querySelector('input[name="custom-background"]');
const text_parent = document.querySelector("p.info em");
const body = document.querySelector("body");
const bubbles = document.querySelectorAll("div.big-bubble");
const section = document.querySelector("section");
const app_panel = document.querySelector("div.application");
const app_background = document.querySelectorAll("div.back-border");
const bubbles_background = document.querySelectorAll("div.bubble");
const root = document.querySelector(':root');
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
let fullscreen_counter = null;
let fullscreen_delay = 5000;
let fullscreen_state = "deactivated";
let text = 'Copyright 2025 © Piotr Cieśla';
let text_index = 0;
let text_visible = false;
let file_handler = null;
let beep = new Audio('media/beeping.mp3');
let ambient = new Audio('media/ambient.mp3');

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
                clearInterval(timer_counter);
                setTimeout(() => {
                    if (settings_sound_range.value > 0) {
                        beep.volume = settings_sound_range.value / 100;
                        beep.play();
                    }
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
        if (settings_sound_range.value > 0) {
            beep.pause();
        }
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
    text_visible = true;
    text_visible == true ? text_writing() : text_visible = true;
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
    if (settings_panel.classList.contains("settings-invisible") == false) {
        if (text_index < text.length) {
            let option = document.createElement("span");
            option.classList.add("written");
            option.innerText += text.charAt(text_index);
            text_parent.appendChild(option);
            text_index++;
            setTimeout(text_writing, 30);
        }
    }
    if (settings_panel.classList.contains("settings-invisible") ||
        customize_panel.classList.contains("customize-invisible") == false) {
        text_parent.innerHTML = "";
        text_index = 0;
        return;
    }
}

settings_fullscreen_btn.addEventListener("click", open_fullscreen);
function open_fullscreen() {
    if (settings_fullscreen_btn.checked == true) {
        if (body.requestFullscreen) {
            body.requestFullscreen();
        } else if (body.webkitRequestFullscreen) { /* Safari */
            body.webkitRequestFullscreen();
        }
    } else if (settings_fullscreen_btn.checked == false) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        }
    }
}

settings_delay_btn.addEventListener("input", () => {
    fullscreen_delay = settings_delay_btn.value * 1000;
    if (settings_delay_btn.value == "0" || settings_delay_btn.value == "") {
        clearInterval(fullscreen_counter);
        text_parent.innerHTML = "Fullscreen mode disabled";
        text_parent.classList.add("change-info");
        setTimeout(() => {
            text_parent.classList.remove("change-info");
        }, 1000);
        body.removeEventListener("click", remove_fullscreen);
    } else {
        text_parent.innerHTML = "Fullscreen mode enabled";
        text_parent.classList.remove("change-info");
        body.removeEventListener("click", remove_fullscreen);
        body.addEventListener("click", remove_fullscreen);
    }
});

settings_sound_range.addEventListener("input", () => {
    settings_sound_label.innerText = settings_sound_range.value;
});

settings_music_range.addEventListener("input", () => {
    settings_music_label.innerText = settings_music_range.value;
});

settings_sound_btn.addEventListener("click", () => {
    if (settings_sound_btn.innerText == "Remove") {
        settings_sound_btn.innerText = "Add";
        beep.src = 'media/beeping.mp3';
        return;
    }
    if (settings_sound_handler) {
        settings_sound_handler.click();
    }
});

settings_sound_handler.addEventListener("change", handle_sound);
function handle_sound() {
    settings_sound_btn.innerText = "Remove";
    let fileList = this.files;
    for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].type.includes("audio")) {
            text_parent.style.visibility = "visible";
            text_parent.innerText = "Wrong file format!";
            text_parent.classList.add("change-info");
            setTimeout(() => {
                text_parent.classList.remove("change-info");
            }, 1200);
            return;
        }
    }
    file_handler = URL.createObjectURL(fileList[0]);
    for (let i = 0; i < fileList.length; i++) {
        file_handler = URL.createObjectURL(fileList[i]);
        beep.src = file_handler;
    }
}

settings_music_range.addEventListener("input", () => {
    if (settings_music_range.value > 0) {
        ambient.volume = settings_music_range.value / 100;
        ambient.play();
        ambient.loop = true;
    }
    if (settings_music_range.value == 0) {
        ambient.pause();
    }
});

settings_music_btn.addEventListener("click", () => {
    if (settings_music_btn.innerText == "Remove") {
        settings_music_btn.innerText = "Add";
        ambient.src = 'media/ambient.mp3';
        return;
    }
    if (settings_music_handler) {
        settings_music_handler.click();
    }
});

settings_music_handler.addEventListener("change", handle_music);
function handle_music() {
    settings_music_btn.innerText = "Remove";
    let fileList = this.files;
    for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].type.includes("audio")) {
            text_parent.style.visibility = "visible";
            text_parent.innerText = "Wrong file format!";
            text_parent.classList.add("change-info");
            setTimeout(() => {
                text_parent.classList.remove("change-info");
            }, 1200);
            return;
        }
    }
    file_handler = URL.createObjectURL(fileList[0]);
    for (let i = 0; i < fileList.length; i++) {
        file_handler = URL.createObjectURL(fileList[i]);
        ambient.src = file_handler;
        ambient.volume = settings_music_range.value / 100;
        ambient.play();
    }
}

//panel edycji
customize_btn.addEventListener("click", () => {
    customize_panel.classList.toggle("customize-invisible");
    settings_panel.classList.add("settings-invisible");
    text_index == text.length ? text_index = 0 : text_index;
    text_visible == true ? text_writing() : text_visible = true;
});

customize_cross.addEventListener("click", () => {
    customize_panel.classList.add("customize-invisible");
    text_index = 0;
    text_parent.style.visibility = "hidden";
    text_visible = false;
});

customize_scale_range.addEventListener("input", () => {
    customize_scale_label.innerText = customize_scale_range.value / 100;
    app_panel.style.scale = customize_scale_range.value / 100;
});

for (let i = 0; i < customize_back_colors.length; i++) {
    customize_back_colors[i].addEventListener("input", () => {
        section.style.setProperty("--backColor" + (i + 1), customize_back_colors[i].value);
        root.style.setProperty('--backColor1', customize_back_colors[0].value);
    });
}

for (let i = 0; i < customize_bubbles_colors.length; i++) {
    customize_bubbles_colors[i].addEventListener("input", () => {
        root.style.setProperty('--settingsBack1', customize_bubbles_colors[0].value);
        root.style.setProperty('--settingsBack2', customize_bubbles_colors[1].value);
        root.style.setProperty('--bubbleShadow', customize_bubbles_colors[2].value);
        root.style.setProperty('--bubbleBorder', customize_bubbles_colors[3].value);
    });
}

for (let i = 0; i < customize_analog_colors.length; i++) {
    customize_analog_colors[i].addEventListener("input", () => {
        for (let x = 0; x < clock_analog_hands.length; x++) {
            clock_analog_hands[x].style.setProperty("--clockHand" + (i + 1), customize_analog_colors[i].value);
        }
    });
}

customize_pointers.addEventListener("click", () => {
    if (customize_pointers.checked == true) {
        for (let i = 0; i < clock_analog_hands.length; i++) {
            clock_analog_hands[i].style.setProperty('--pointerHide', 'visible');
        }
    } else {
        for (let i = 0; i < clock_analog_hands.length; i++) {
            clock_analog_hands[i].style.setProperty('--pointerHide', 'hidden');
        }
    }
});

customize_app_back.addEventListener("click", () => {
    if (customize_app_back.checked == false) {
        for (let i = 0; i < app_background.length; i++) {
            app_background[i].style.setProperty('--appBorder', '0px solid black');
            app_background[i].style.setProperty('--appBackground', 'rgba(0, 0, 0, 0.0');
        }
    } else {
        for (let i = 0; i < app_background.length; i++) {
            app_background[i].style.setProperty('--appBorder', '3px solid black');
            app_background[i].style.setProperty('--appBackground', 'rgba(0, 0, 0, 0.3');
        }
    }
});

customize_digital_font.addEventListener("input", () => {
    root.style.setProperty('--digitalFont', customize_digital_font.value);
});

customize_analog_font.addEventListener("input", () => {
    root.style.setProperty('--analogFont', customize_analog_font.value);
});

customize_font_color.addEventListener("input", () => {
    root.style.setProperty('--fontColor', customize_font_color.value);
});

customize_background_btn.addEventListener("click", () => {
    if (customize_background_btn.innerText == "Remove") {
        customize_background_btn.innerText = "Add";
        section.style.backgroundImage = "";
        return;
    }
    if (customize_background_handler) {
        customize_background_handler.click();
    }
});

customize_background_handler.addEventListener("change", handle_background);
function handle_background() {
    customize_background_btn.innerText = "Remove";
    let fileList = this.files;
    for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].type.includes("image")) {
            text_parent.style.visibility = "visible";
            text_parent.innerText = "Wrong file format!";
            text_parent.classList.add("change-info");
            section.style.backgroundImage = "";
            setTimeout(() => {
                text_parent.classList.remove("change-info");
            }, 1200);
            return;
        }
    }
    file_handler = URL.createObjectURL(fileList[0]);
    for (let i = 0; i < fileList.length; i++) {
        file_handler = URL.createObjectURL(fileList[i]);
        section.style.backgroundImage = "url(" + file_handler + ")";
        section.style.backgroundRepeat = "no-repeat";
        // section.style.backgroundSize = "contain";
        section.style.backgroundSize = "cover";
        section.style.backgroundPosition = "center";
    }
}

//tryb pełnoekranowy
fullscreen_counter = setInterval(fullscreen_activator, fullscreen_delay);
body.addEventListener("click", remove_fullscreen);

function fullscreen_activator() {
    if (settings_panel.classList.contains("settings-invisible") == true &&
        customize_panel.classList.contains("customize-invisible") == true &&
        fullscreen_delay != 0) {
        clearInterval(fullscreen_counter);
        fullscreen_mode();
    } else {
        clearInterval(fullscreen_counter);
        fullscreen_counter = setInterval(fullscreen_activator, 1000);
    }
}

function fullscreen_mode() {
    for (let i = 0; i < app_modes_btn.length; i++) {
        app_modes_btn[i].style.setProperty('--smallShift', '50px');
        app_modes_btn[i].style.opacity = "0";
        app_modes_btn[i].style.visibility = "hidden";
        app_modes_btn[i].style.transitionDelay = "0s";
    }
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].style.setProperty('--bigShift', '-300px');
        bubbles[i].style.setProperty('--bigShift2', '-300px');
        bubbles[i].style.transitionDelay = "1s";
    }
    fullscreen_state = "active";
}

function remove_fullscreen() {
    if (fullscreen_state == "deactivated") {
        clearInterval(fullscreen_counter);
        fullscreen_counter = setInterval(fullscreen_activator, fullscreen_delay);
    } else if (fullscreen_state != "pending") {
        fullscreen_state = "pending";
        body.removeEventListener("click", remove_fullscreen);
        for (let i = 0; i < app_modes_btn.length; i++) {
            if (window.innerWidth > 1000) {
                app_modes_btn[i].style.setProperty('--smallShift', '250px');
            } else {
                app_modes_btn[i].style.setProperty('--smallShift', '175px');
            }
            app_modes_btn[i].style.opacity = "1";
            app_modes_btn[i].style.visibility = "visible";
            app_modes_btn[i].style.transitionDelay = "1.5s";
        }
        for (let i = 0; i < bubbles.length; i++) {
            if (window.innerWidth > 1000) {
                bubbles[i].style.setProperty('--bigShift', '-110px');
            } else {
                bubbles[i].style.setProperty('--bigShift', '-90px');
                bubbles[i].style.setProperty('--bigShift2', '-75px');
            }
            bubbles[i].style.transitionDelay = "0s";
        }
        setTimeout(() => {
            fullscreen_state = "deactivated";
            fullscreen_counter = setInterval(fullscreen_activator, fullscreen_delay);
            body.addEventListener("click", remove_fullscreen);
        }, 2000);
    }
}