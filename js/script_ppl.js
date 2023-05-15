'use strict';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=698602930bd82be2ecbd605539371c85

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=698602930bd82be2ecbd605539371c85

const apiKey = "698602930bd82be2ecbd605539371c85";
let buscar = document.getElementById("buscar");

buscar.addEventListener('click', buscarUbicacion => {
    buscarUbicacion.preventDefault();

    crearDatos ();

    let ubicacion = document.getElementById("buscador").value;

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
            estado_actual.innerHTML += `<p id="resultado_estado_actual"><span>${json_clima.weather[0].main}</span></p>`;
            console.log(estado_actual);

            temp_max.innerHTML += `<p><span>${json_clima.main.temp_max}</span>°C</p>`;
            temp_min.innerHTML += `<p><span>${json_clima.main.temp_min}</span>°C</p>`;
            humedad.innerHTML += `<p><span>${json_clima.main.humidity}</span>%</p>`;
            sensacion.innerHTML += `<p><span>${json_clima.main.feels_like}</span>°C</p>`;
            presion.innerHTML += `<p><span>${json_clima.main.pressure}</span>hPa</p>`;
            velocidad.innerHTML += `<p><span>${json_clima.wind.speed}</span>km/h</p>`;
        })

        console.log(contador);
    } catch (error) {
        
    }


});

