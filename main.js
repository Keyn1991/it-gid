document.addEventListener("DOMContentLoaded", function() {

    const selectCity = document.createElement('select');
    selectCity.id = 'cities';
    document.querySelector('.container').appendChild(selectCity);

    const cities = ['Київ', 'Лондон', 'Нью-Йорк', 'Париж', 'Варшава'];

    cities.forEach(function(city) {
        const option = document.createElement('option');
        option.value = city;
        option.text = city;
        selectCity.appendChild(option);
    });

    const outputDiv = document.createElement('div');
    outputDiv.classList.add('out');
    document.querySelector('.container').appendChild(outputDiv);

    selectCity.addEventListener('change', function() {
        const selectedCity = this.value;
        getWeather(selectedCity);
    });
    function getWeather(city) {
        const apiKey = 'd1e6e055eac0e5ed7a1bb5e735e34b5c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => showWeather(data))
            .catch(error => console.error('Помилка:', error));
    }
    function showWeather(data) {
        const outputDiv = document.querySelector('.out');

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const windDirection = data.wind.deg;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;

        const weatherInfo = `
            <h2>${selectCity.value}</h2>
            <p>Температура: ${temperature}°C</p>
            <p>Опис: ${description}</p>
            <p>Тиск: ${pressure} мм рт. ст.</p>
            <p>Напрямок вітру онлайн: ${getWindDirection(windDirection)}</p>
            <p>Скорість вітру: ${windSpeed} м/с</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Погода">
        `;

        outputDiv.innerHTML = weatherInfo;
    }
    function getWindDirection(degree) {
        const directions = ['Північ', 'Північний-Схід', 'Схід', 'Південний-Схід', 'Південь', 'Південний-Захід', 'Захід', 'Північний-Захід'];
        const index = Math.round(degree / 45) % 8;
        return directions[index];
    }
});
