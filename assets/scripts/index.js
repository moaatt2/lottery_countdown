//// Determine if website is on mobile or not
let mobile = navigator.userAgent.toLowerCase().includes("mobile");

//// If mobile hide desktop form else show mobile form
if (mobile) {
    document.getElementById("start-desktop").style.display = "none";
} else {
    document.getElementById("start-mobile").style.display = "none";
}


// Initialize State Variables
let started = false;
let countdown_last_ended;
let interval;
let digit = -1;
let positions = [
    [0, 10],  // Millenia
    [1, 10],  // Centuries
    [2, 10],  // Decades
    [3, 10],  // Years
    [11, 4],  // Days - Hundreds
    [12, 10, 3, 7], // Days - Tens
    [13, 10, 6, 6, 3, 10], // Days - Ones
    [20, 3],  // Hours - Tens
    [21, 10, 2, 4], // Hours - Ones
    [29, 7],  // Minutes - Tens
    [30, 10, 6, 1], // Minutes - Ones
    [40, 7],  // Seconds - Tens
    [41, 10, 6, 1], // Seconds - Ones
    [43, 10], // Miliseconds - Thousands
    [44, 10], // Miliseconds - Hundreds
    [45, 10], // Miliseconds - Tens
    [46, 10], // Miliseconds - Ones
];


// Add keypress listener
document.addEventListener("keydown", main);

// Add touch listener
document.addEventListener("touchstart", main);


// Create a function to loop through digits in the time counter
function digit_loop(settings) {
    // Get Current Value
    let time = document.getElementById("time");
    let cur_time = time.textContent;

    // parse value settings from a list
    let digit = settings[0];
    let mod = settings[1];

    // Handle modulo overide if previous digit meets specific value
    if (settings.length > 2) {
        if (Number(cur_time[digit - 1] == settings[2])) {
            mod = settings[3]
        }
    }
    
    // Secondary Overide if digit before previous is less than specific value
    //   Implemented for Ones of Days
    if (settings.length > 4) {
        if (Number(cur_time[digit - 2] < settings[4])) {
            mod = settings[5]
        }
    }

    // Itterate the digit
    cur_time = cur_time.split("");
    cur_time[digit] = (Number(cur_time[digit]) + 1) % mod;
    cur_time = cur_time.join("");

    // Update document
    time.textContent = cur_time;
}


// Define a function to convert the on screen time display into milliseconds
function text_to_milliseconds() {

    // Get current time text
    let time = document.getElementById("time").textContent;

    // Get time components
    let years        = Number(time.slice(0,4));
    let days         = Number(time.slice(11,14));
    let hours        = Number(time.slice(20,22));
    let minutes      = Number(time.slice(29,31));
    let seconds      = Number(time.slice(40,42));
    let milliseconds = Number(time.slice(43,47));

    // Calculate the total number of millisconds
    let out = milliseconds
        + seconds * 1000
        + minutes * 1000 * 60
        + hours   * 1000 * 60 * 60
        + days    * 1000 * 60 * 60 * 24
        + years   * 1000 * 60 * 60 * 24 * 365;
    
    return out;
}


// Define a function to take a millisecond value and return a string in the format of the screen display
function milliseconds_to_text(milliseconds) {

    // Calculate number of milliseconds per other parts of the time
    let second_factor = 1000;
    let minute_factor = 1000 * 60;
    let hour_factor   = 1000 * 60 * 60;
    let day_factor    = 1000 * 60 * 60 * 24;
    let year_factor   = 1000 * 60 * 60 * 24 * 365;

    // Determine the number of years and remove those from the duration
    let years = String(Math.floor(milliseconds/year_factor)).padStart(4, "0");
    milliseconds = milliseconds - (years*year_factor);

    // Determine the number of days and remove those from the duration
    let days = String(Math.floor(milliseconds/day_factor)).padStart(3, "0");
    milliseconds = milliseconds - (days*day_factor);

    // Determine the number of hours and remove those from the duration
    let hours = String(Math.floor(milliseconds/hour_factor)).padStart(2, "0");
    milliseconds = milliseconds - (hours*hour_factor);

    // Determine the number of minutes and remove those from the duration
    let minutes = String(Math.floor(milliseconds/minute_factor)).padStart(2, "0");
    milliseconds = milliseconds - (minutes*minute_factor);

    // Determine the number of seconds and remove those from the duration
    let seconds = String(Math.floor(milliseconds/second_factor)).padStart(2, "0");
    milliseconds = milliseconds - (seconds*second_factor);

    // Ensure that the milliseconds are zero padded
    milliseconds = String(milliseconds).padStart(4, "0");

    // Create and return a timestring based on the digits
    return `${years} Years ${days} Days ${hours} Hours ${minutes} Minutes ${seconds}.${milliseconds} Seconds`;
}


// Define a function to decrement the time text on the page.
function countdown() {
    // Get how much time remains on the countdown
    let cur_time = text_to_milliseconds();

    // Get current time and determine how much time elapsed since the last run
    let start = Date.now();
    let elapsed = start - countdown_last_ended;

    // Adjust the text based on the elapsed time since last run and update the page
    document.getElementById("time").textContent = milliseconds_to_text(cur_time - elapsed);

    // Record the time of last run
    countdown_last_ended = start;
}


// Define logic loop
function main(event) {
    // Determine if event is valid keypress/touch
    let valid_touch = mobile && event.type === "touchstart"
    let valid_key = !mobile && (event.key === " " || event.key === "Spacebar")
    if (valid_touch || valid_key) {
        
        // If it has yet to start show the empty timer
        if (!started) {
            // Hide starting instructions
            document.getElementById("start-mobile").style.display = "none";
            document.getElementById("start-desktop").style.display = "none";

            // Show timer and time setiting instructions
            document.getElementById("time").style.display = "block";
            if (mobile) {
                document.getElementById("set-mobile").style.display = "block";
            } else {
                document.getElementById("set-desktop").style.display = "block";
            }

            // Mark that timer has started
            started = true;
        }

        // Number lock in logic
        if (started && (digit < positions.length)) {
            clearInterval(interval);
            digit += 1;
            if (digit < positions.length) {
                interval = setInterval(digit_loop, 100, positions[digit]);
            }
        }

        // Show Countdown Start Instructions after last digit locked in
        if (started && (digit == positions.length)) {

            // Hide Timer Setting Instructions
            document.getElementById("set-mobile").style.display = "none";
            document.getElementById("set-desktop").style.display = "none";

            // Show Relevant Countdown Start Instructions
            if (mobile) {
                document.getElementById("start-countdown-mobile").style.display = "block";
            } else {
                document.getElementById("start-countdown-desktop").style.display = "block";
            }
        }

    }
}