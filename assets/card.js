document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    // Ustawianie danych do elementów HTML
    const setData = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = value || '';
    };

    // Zdjęcie
    const image = urlParams.get("image");
    if (image && document.querySelector(".id_own_image")) {
        document.querySelector(".id_own_image").style.backgroundImage = `url(${image})`;
    }

    // Data urodzenia
    const birthdayRaw = urlParams.get("birthday");
    if (birthdayRaw) {
        const parts = birthdayRaw.split(".");
        if (parts.length === 3) {
            const birthdayDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            const birthday = birthdayDate.toLocaleDateString("pl-PL", options);
            setData("birthday", birthday);
        }
    }

    // Płeć
    let sex = urlParams.get("sex");
    sex = sex === "k" ? "Kobieta" : sex === "m" ? "Mężczyzna" : "";
    setData("sex", sex);

    // Pozostałe dane
    setData("name", (urlParams.get("name") || "").toUpperCase());
    setData("surname", (urlParams.get("surname") || "").toUpperCase());
    setData("nationality", (urlParams.get("nationality") || "").toUpperCase());
    setData("familyName", urlParams.get("familyName"));
    setData("fathersFamilyName", urlParams.get("fathersFamilyName"));
    setData("mothersFamilyName", urlParams.get("mothersFamilyName"));
    setData("birthPlace", urlParams.get("birthPlace"));
    setData("countryOfBirth", urlParams.get("countryOfBirth"));

    // Adres
    const adres = `ul. ${urlParams.get("adress1") || ""}<br>${urlParams.get("adress2") || ""} ${urlParams.get("city") || ""}`;
    setData("adress", adres);

    // PESEL (losowy lub wyliczony)
    const birthday = urlParams.get("birthday")?.split(".");
    if (birthday && birthday.length === 3) {
        let [d, m, y] = birthday;
        d = d.padStart(2, "0");
        m = m.padStart(2, "0");
        y = y.slice(-2);

        const genderCode = sex === "Kobieta" ? "0382" : "0295";
        const pesel = `${y}${m}${d}${genderCode}7`;
        setData("pesel", pesel);
    }

    // Data aktualizacji
    const updateElement = document.querySelector(".bottom_update_value");
    const updateButton = document.querySelector(".update");
    const updateDate = localStorage.getItem("update") || new Date().toLocaleDateString("pl-PL", options);
    if (updateElement) updateElement.innerHTML = updateDate;

    if (updateButton) {
        updateButton.addEventListener("click", () => {
            const now = new Date().toLocaleDateString("pl-PL", options);
            localStorage.setItem("update", now);
            updateElement.innerHTML = now;
        });
    }

    // Czas na żywo
    const time = document.getElementById("time");
    if (time) {
        setInterval(() => {
            const now = new Date();
            time.innerHTML = "Czas: " + now.toLocaleTimeString() + " " + now.toLocaleDateString("pl-PL", options);
        }, 1000);
    }

    // Rozwijana sekcja dodatkowych danych
    const infoHolder = document.querySelector(".info_holder");
    if (infoHolder) {
        infoHolder.addEventListener("click", () => {
            infoHolder.classList.toggle("unfolded");
        });
    }

    // Okna potwierdzenia
    const confirmElement = document.querySelector(".confirm");
    window.openPage = (page) => {
        if (confirmElement) {
            confirmElement.classList.remove("page_1_open", "page_2_open", "page_3_open");
            confirmElement.classList.add("page_open", `page_${page}_open`);
        }
    };
    window.closePage = () => {
        if (confirmElement) {
            confirmElement.classList.remove("page_open", "page_1_open", "page_2_open", "page_3_open");
        }
    };

    // Funkcja sendTo dla bottom_bar
    window.sendTo = (target) => {
        const currentParams = new URLSearchParams(window.location.search);
        window.location.href = `${target}.html?${currentParams}`;
    };
});
