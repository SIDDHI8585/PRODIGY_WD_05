const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

// Function to fetch weather by location
function getWeather() {
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found');
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch weather data');
    });
}

// Function to fetch weather based on the user's current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Failed to fetch weather data');
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to display weather data on the page
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  document.getElementById('city-name').innerText = name;
  document.getElementById('temperature').innerText = `Temperature: ${main.temp}°C`;
  document.getElementById('description').innerText = `Weather: ${weather[0].description}`;
  document.getElementById('humidity').innerText = `Humidity: ${main.humidity}%`;
  document.getElementById('wind').innerText = `Wind Speed: ${wind.speed} m/s`;
}
