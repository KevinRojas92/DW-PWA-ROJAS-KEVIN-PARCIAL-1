'use strict';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=698602930bd82be2ecbd605539371c85

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=698602930bd82be2ecbd605539371c85

const apiKey = "698602930bd82be2ecbd605539371c85";
let buscar = document.getElementById("buscar");
let estado_actual = document.getElementsByClassName("estado_actual");

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

            let apiClima = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}`);

            return apiClima;
        }).then (datos_clima => {

            return datos_clima.json();
        }).then (json_clima => {
            console.log(json_clima.weather);
        })
    } catch (error) {
        
    }


});

