const apiKey = "cc83025ab0384f62d5c7ec896a58efd7"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const convertBtn = document.querySelector(".convertButton")
const tempElement = document.querySelector(".temp")
let isCelsius = true;
var currentTemp = "null";

// var temp_cel = "null";
// const temp_Fah = (Number(temp_cel) * 9/5) + 32;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        const data = await response.json();
        currentTemp = data.main.temp;
    
        document.querySelector(".temp").innerHTML = data.main.temp.toFixed(2) + "°c"
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr"
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "./images/clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "./images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "./images/rain.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "./images/mist.png"
        }
        else if(data.weather[0].main == "Humidity"){
            weatherIcon.src = "./images/humidity.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "./images/drizzle.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "./images/snow.png"
        }
    
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    convertBtn.textContent = "Convert to °F"
})

searchBox.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
        convertBtn.textContent = "Convert to °F";
    }
})

convertBtn.addEventListener("click", ()=>{
    // const currentTemp = parseFloat(tempElement.textContent)
    if(isCelsius){
        // convert Celsius to Fahrenheit
        const convertedTemp = (currentTemp * 9/5) + 32;
        tempElement.textContent = convertedTemp.toFixed(2) + "°F";
        convertBtn.textContent = "Convert to °C";
    }else{
        // convert Fahrenheit to celsius
        const convertedTemp = Number(currentTemp);
        tempElement.textContent = convertedTemp.toFixed(2) + "°C";
        convertBtn.textContent = "Convert to °F";
    }

    isCelsius = !isCelsius;
})