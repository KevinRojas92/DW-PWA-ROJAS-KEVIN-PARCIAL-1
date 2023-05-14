'use strict';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=698602930bd82be2ecbd605539371c85

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=698602930bd82be2ecbd605539371c85

const apiKey = "698602930bd82be2ecbd605539371c85";
let buscar = document.getElementById("buscar");

let estado_actual = document.getElementById("estado_actual");

let temp_max = document.getElementById("temp_max");
let temp_min = document.getElementById("temp_min");
let humedad = document.getElementById("humedad");
let sensacion = document.getElementById("sensacion");
let presion = document.getElementById("presion");
let velocidad = document.getElementById("velocidad");

buscar.addEventListener('click', buscarUbicacion => {
    buscarUbicacion.preventDefault();

    let ubicacion = document.getElementById("buscador").value;

    console.log(ubicacion);

    try {
        let apiUbicacion = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}&limit=1&appid=${apiKey}`)
        .then (datos => {
            return datos.json();
        }).then (json => {
            let latitud = json[0].lat;
            let longitud = json[0].lon;

            let apiClima = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`);

            return apiClima;
        }).then (datos_clima => {
            return datos_clima.json();
        }).then (json_clima => {
            estado_actual.innerHTML = `<p>Estado actual <span>${json_clima.weather[0].description}</span></p>`;

            temp_max.innerHTML = `<p>Temperatura Máxima <span>${json_clima.main.temp_max}</span>°C</p>`;
            temp_min.innerHTML = `<p>Temperatura Mínima <span>${json_clima.main.temp_min}</span>°C</p>`;
            humedad.innerHTML = `<p>Humedad <span>${json_clima.main.humidity}</span>%</p>`;
            sensacion.innerHTML = `<p>Sensación Térmica <span>${json_clima.main.feels_like}</span>°C</p>`;
            presion.innerHTML = `<p>Presión Atmosférica <span>${json_clima.main.pressure}</span>hPa</p>`;
            velocidad.innerHTML = `<p>Velocidad del viento <span>${json_clima.wind.speed}</span>km</p>`;
        })
    } catch (error) {
        
    }


});

