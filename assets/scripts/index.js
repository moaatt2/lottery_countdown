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


// Add keypress listener
document.addEventListener("keydown", main);

// Add touch listener
document.addEventListener("touchstart", main);

function digit_loop() {
    let time = document.getElementById("time");
    let cur_time = time.textContent;
    let n = (Number(cur_time[0]) + 1) % 10;
    time.textContent = n + cur_time.slice(1);
}

// Define logic loop
function main(event) {
    // Determine if event is valid keypress/touch
    let valid_touch = mobile && event.type === "touchstart"
    let valid_key = !mobile && (event.key === " " || event.key === "Spacebar")
    if (valid_touch || valid_key) {
        
        // If it has yet to start show the empty timer
        if (!started) {
            document.getElementById("start-mobile").style.display = "none";
            document.getElementById("start-desktop").style.display = "none";
            document.getElementById("time").style.display = "block";
            setInterval(digit_loop, 100);
            started = true;
        }

    }
}