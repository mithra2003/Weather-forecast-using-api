const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '0.7s';
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '0.7s';
    }
});

//weather api 
const apiKey = "5482de56e85c99b52677976dab43f080";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404)
{
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}else{


    
    var data = await response.json();

    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
}

searchBtn.addEventListener("click", ()=>{
checkWeather(searchbox.value);
})

//voice input
const voiceInputBtn = document.getElementById("voiceInput");

// Check if SpeechRecognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1;

    voiceInputBtn.addEventListener("click", () => {
        recognition.start(); // Start voice recognition
    });

    recognition.addEventListener("result", (event) => {
        const cityName = event.results[0][0].transcript; // Get the recognized city name
        searchbox.value = cityName; // Populate the search box with the recognized city name
        checkWeather(cityName); // Fetch weather details
    });

    recognition.addEventListener("start", () => {
        console.log("Voice recognition started...");
    });

    recognition.addEventListener("end", () => {
        console.log("Voice recognition ended.");
    });

    recognition.addEventListener("error", (event) => {
        console.error("Voice recognition error: ", event.error);
        alert("Error recognizing speech. Please try again.");
    });
} else {
    alert("Speech Recognition API is not supported in your browser.");
}
