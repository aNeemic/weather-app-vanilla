const api = {
    key: "d107b9d144167982676789615b372369",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

//set eventListener on the searchbox for a keypress
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress' , setQuery);

//check for the enter key (keyCode == 13)
function setQuery(evt){
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
        // console.log(searchBox.value);
    }
}

//run a fetch request to the weather api, pass through the query from the search box, set the units to imperial, then set the app id to the api key
function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }) .then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_elem = document.querySelector('.current .weather');
    weather_elem.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_max)}°F / ${Math.round(weather.main.temp_min)}°F`
}

function dateBuilder (d) {
    let months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${day} ${date} ${year}` ;
}