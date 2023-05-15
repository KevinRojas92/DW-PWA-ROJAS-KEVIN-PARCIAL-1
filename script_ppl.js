'use strict';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=698602930bd82be2ecbd605539371c85

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=698602930bd82be2ecbd605539371c85

const apiKey = "698602930bd82be2ecbd605539371c85";
let buscar = document.getElementById("buscar");
let contador = 0;

function CrearBase () {
    let estado_actual = document.getElementById("estado_actual");
    let texto_estado_actual = document.getElementById("texto_estado_actual");

    let resLocal_estado_actual = document.getElementById("resultado_estado_actual");

    if (resLocal_estado_actual) {
        estado_actual.removeChild(resLocal_estado_actual);
    }

    estado_actual.removeChild(texto_estado_actual);

    estado_actual.innerHTML += '<p id="texto_estado_actual">Estado actual</p>';

    let datos = document.getElementById("datos");

    let temp_max = document.getElementById("temp_max");
    let temp_min = document.getElementById("temp_min");
    let humedad = document.getElementById("humedad");
    let sensacion = document.getElementById("sensacion");
    let presion = document.getElementById("presion");
    let velocidad = document.getElementById("velocidad");

    datos.removeChild(temp_max);
    datos.removeChild(temp_min);
    datos.removeChild(humedad);
    datos.removeChild(sensacion);
    datos.removeChild(presion);
    datos.removeChild(velocidad);

    let div_temp_max = document.createElement('div');
    div_temp_max.setAttribute("id", "temp_max");
    div_temp_max.innerHTML += "<p>Temperatura máxima</p>";

    datos.appendChild(div_temp_max);

    let div_temp_min = document.createElement('div');
    div_temp_min.setAttribute("id", "temp_min");
    div_temp_min.innerHTML += "<p>Temperatura mínima</p>";

    datos.appendChild(div_temp_min);

    let div_humedad = document.createElement('div');
    div_humedad.setAttribute("id", "humedad");
    div_humedad.innerHTML += "<p>Humedad</p>";

    datos.appendChild(div_humedad);

    let div_sensacion = document.createElement('div');
    div_sensacion.setAttribute("id", "sensacion");
    div_sensacion.innerHTML += "<p>Sensación térmica</p>";

    datos.appendChild(div_sensacion);

    let div_presion = document.createElement('div');
    div_presion.setAttribute("id", "presion");
    div_presion.innerHTML += "<p>Presíon atmosférica</p>";

    datos.appendChild(div_presion);

    let div_velocidad = document.createElement('div');
    div_velocidad.setAttribute("id", "velocidad");
    div_velocidad.innerHTML += "<p>Velocidad del viento</p>";

    datos.appendChild(div_velocidad);
};

function CrearDatos (json_clima) {
    let dato_estado_actual = json_clima.weather[0].main;
    estado_actual.innerHTML += `<p id="resultado_estado_actual"><span>${dato_estado_actual}</span></p>`;

    let dato_temp_max = json_clima.main.temp_max;
    temp_max.innerHTML += `<p><span>${dato_temp_max}</span>°C</p>`;

    let dato_temp_min = json_clima.main.temp_min;
    temp_min.innerHTML += `<p><span>${dato_temp_min}</span>°C</p>`;

    let dato_humedad = json_clima.main.humidity;
    humedad.innerHTML += `<p><span>${dato_humedad}</span>%</p>`;

    let dato_sensacion = json_clima.main.feels_like;
    sensacion.innerHTML += `<p><span>${dato_sensacion}</span>°C</p>`;

    let dato_presion = json_clima.main.pressure;
    presion.innerHTML += `<p><span>${dato_presion}</span>hPa</p>`;

    let dato_velocidad = json_clima.wind.speed;
    velocidad.innerHTML += `<p><span>${dato_velocidad}</span>km/h</p>`;

    let array_datos = [
        dato_estado_actual,
        dato_temp_max,
        dato_temp_min,
        dato_humedad,
        dato_sensacion,
        dato_presion,
        dato_velocidad
    ];

    return array_datos;
};

buscar.addEventListener('click', buscarUbicacion => {
    buscarUbicacion.preventDefault();

    contador += 1;
    CrearBase ();

    let ubicacion = document.getElementById("buscador").value;

    try {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}&limit=1&appid=${apiKey}`)
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
            let array_datos = CrearDatos (json_clima);

            return array_datos;

        }).then (local => {
            localStorage.setItem("ubicacion", JSON.stringify(local));

        })
    } catch (error) {
        alert("Ha ocurrido un error");        
    }
});

if (localStorage.length > 0) {
    let datos_guardados = JSON.parse(localStorage.getItem("ubicacion"));

    estado_actual.innerHTML += `<p id="resultado_estado_actual"><span>${datos_guardados[0]}</span></p>`;

    temp_max.innerHTML += `<p><span>${datos_guardados[1]}</span>°C</p>`;

    temp_min.innerHTML += `<p><span>${datos_guardados[2]}</span>°C</p>`;

    humedad.innerHTML += `<p><span>${datos_guardados[3]}</span>%</p>`;

    sensacion.innerHTML += `<p><span>${datos_guardados[4]}</span>°C</p>`;

    presion.innerHTML += `<p><span>${datos_guardados[5]}</span>hPa</p>`;

    velocidad.innerHTML += `<p><span>${datos_guardados[6]}</span>km/h</p>`;
} else {
    console.log("No hay datos");
}

