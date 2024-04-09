//// Determine if website is on mobile or not
let mobile = navigator.userAgent.toLowerCase().includes("mobile");

//// If mobile hide desktop form else show mobile form
if (mobile) {
    document.getElementById("start-desktop").style.display = "none";
} else {
    document.getElementById("start-mobile").style.display = "none";
}
