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
    [21, 10, 2, 5], // Hours - Ones
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
            console.log('Hello', digit, positions.length)
            clearInterval(interval);
            digit += 1;
            interval = setInterval(digit_loop, 100, positions[digit]);
            console.log('Bye', digit, positions.length)
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