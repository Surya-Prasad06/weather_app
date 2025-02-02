const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "your_api_key; // mention your API KEY
weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityinput.value.trim();
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        } catch (error) {
            console.error(error);
            displayerror("Could not fetch weather data. Please try again later.");
        }
    } else {
        displayerror("Please enter a city.");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`; // Changed to HTTPS
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayweatherinfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";
    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descriptiondisplay = document.createElement("p");
    const weatheremojidisplay = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${temp}℉ `;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descriptiondisplay.textContent = description;
    weatheremojidisplay.textContent = getweatheremoji(id);

    citydisplay.classList.add("cityDisplay");
    tempdisplay.classList.add("tempDisplay");
    humiditydisplay.classList.add("humidityDisplay");
    descriptiondisplay.classList.add("descriptionDisplay");
    weatheremojidisplay.classList.add("weatherEmoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descriptiondisplay);
    card.appendChild(weatheremojidisplay);
}

function getweatheremoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";
        case (weatherid >= 500 && weatherid < 600):
            return "⛈️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case (weatherid === 800):
            return "🌞";
        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
        default:
            return "❔";
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
