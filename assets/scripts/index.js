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
let positions = [0, 1, 2, 3, 11, 12, 13, 20, 21, 29, 30, 40, 41, 43, 44, 45, 46];


// Add keypress listener
document.addEventListener("keydown", main);

// Add touch listener
document.addEventListener("touchstart", main);


// Create a function to loop through digits in the time counter
function digit_loop(digit) {
    // Get Current Value
    let time = document.getElementById("time");
    let cur_time = time.textContent;

    // Itterate the digit
    cur_time = cur_time.split("");
    cur_time[digit] = (Number(cur_time[digit]) + 1) % 10;
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

    }
}