// Obsługa parametrów URL (np. z formularza)
const params = new URLSearchParams(window.location.search);

// Funkcja przenosząca do innej podstrony z zachowaniem parametrów
function sendTo(page) {
    location.href = `${page}.html?` + params.toString();
}

// Obsługa kliknięcia na elementy dolnego paska nawigacji
document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        const page = element.getAttribute("send");
        if (page) {
            sendTo(page);
        }
    });
});

// Ustawienie wysokości paska nawigacji na Androidzie
function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) return "Windows Phone";
    if (/android/i.test(userAgent)) return "Android";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";

    return "unknown";
}

if (getMobileOperatingSystem() === "Android") {
    const bottomBar = document.querySelector(".bottom_bar");
    if (bottomBar) {
        bottomBar.style.height = "70px";
    }
}
