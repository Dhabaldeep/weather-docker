const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part img"),
  arrowBack = wrapper.querySelector("header i");
let api;

const toggleTheme = document.getElementById("toggle-theme");
const body = document.body;

toggleTheme.addEventListener("change", () => {
  if (toggleTheme.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
});
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3bc6fe9dda74d9e0fdad9c4fa7c4f4f4`;
  fetchData();
}
function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3bc6fe9dda74d9e0fdad9c4fa7c4f4f4`;
  fetchData();
}
function fetchData() {
  infoTxt.innerText = "Getting weather details.....";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}
function updateTitle(value) {
  var titleValue = value;
  document.title = "Weather App | " + titleValue;
}

function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    updateTitle(info.name);
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;
    const { speed } = info.wind;

    const favicon = document.getElementById("favicon");

    if (id == 800) {
      const newFaviconUrl = "./icons/sun.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;

    } else if (id >= 200 && id <= 232) {
      const newFaviconUrl = "./icons/thunderstorm.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;

    } else if (id >= 600 && id <= 622) {
      const newFaviconUrl = "./icons/snowing.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;

    } else if (id >= 701 && id <= 781) {
      const newFaviconUrl = "./icons/fog.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;

    } else if (id >= 801 && id <= 804) {
      const newFaviconUrl = "./icons/cloud.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;

    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      const newFaviconUrl = "./icons/rain.png";
      wIcon.src = newFaviconUrl;
      favicon.href = newFaviconUrl;
    }
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    wrapper.querySelector('.wind span').innerText = `${speed}km/h`;
    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
  }
  console.log(info);
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
