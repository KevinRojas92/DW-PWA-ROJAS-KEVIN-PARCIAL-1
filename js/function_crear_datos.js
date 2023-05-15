'use strict';

let contador = 0;

function CrearDatos() {
    contador += 1;

    let estado_actual = document.getElementById("estado_actual");
    let texto_estado_actual = document.getElementById("texto_estado_actual");

    if (contador > 1 ) {
        let resultado_estado_actual = document.getElementById("resultado_estado_actual");

        estado_actual.removeChild(resultado_estado_actual);
    }

    estado_actual.removeChild(texto_estado_actual);
    console.log(estado_actual);

    estado_actual.innerHTML += '<p id="texto_estado_actual">Estado actual - NEW</p>';

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
}