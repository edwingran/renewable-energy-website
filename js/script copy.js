//Cargar y graficar datos desde el archivo CSV
fetch('datos_emprendimiento.csv')/*fetch() es una funcion que solicita el archivo .CSV*/
    .then(Response => Response.text())/*una vez recibido el archivo lo convierte en texto plano */
    .then(data => {/*ahora data contiene todo el contenido del .CSV como una cadena texto */
        // separar lineas del .CSV
        const filas = data.trim().split('\n').slice(1);/*trim()elimina espacios al inicio y al final de cada fila.*/
                                                        /*el split('\n') separa por saltos de linea (cada linea del csv) */
                                                        /*slice(1) elimina la primera fila (encabezado) */
                                                        /*el resultado de sto -> filas = ["2015, 120", "2016, 140"] */
        const labels = [];/*creamos un arrays vacio. años */
        const valores = [];/*cantidades */

        //LEer cada cada linea y separar año y cantidad

        filas.forEach(fila => {// este bucle recorre cada elemento del arreglo filas. en la orimera vuelta: fila = "2015,120"
            const [anio, cantidad] = fila.split(',');//divide la cadena "2015;120" en dos partes separadas por la ",":
                                                     //Equivalente: const anio = "2015"
                                                     //             const cantidad = "120"
            labels.push(anio);// agrega el anio al arreglo labels (etiquetas del eje x en la grafica): labels =["2015"]
            valores.push(Number(cantidad)); //convierte 120 a numero y lo añade añ arreglo valores

        });
        //crear el gráfico.
        const ctx = document.getElementById('graficoEmprendimiento').getContext('2d');//busca en el HTML el elemento CANVAS con el id ="graficoEmprendimiento"
                                                                                      //getContext('2d') dibujar o crear graficos en 2d
        new Chart(ctx, {//inicia a píntar con ese pincel que se llama CTX
            type: 'bar', //esto indica que queremos un grafico de barras
            data:  {
                labels: labels, // son los nombre que van en el eje x
                datasets: [{
                    label: 'Cantidad de Emprendiminetos',

                    data: valores,
                    backgroundColor:'rgba(54, 162, 235, 0.5)',
                    borderColor:'rgba(196, 235, 54)',
                    borderWidth: 1
                }]
            },
            // esto hace que se ajuste al tamaño de la pantalla automaticamente (responsivo).
            options:{
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true //INICIE DESDE CERO
                    }
                }
            }
        });
    })
    .catch(error => console.error("Error al cargar el archivo:", error));

//************************************************************************************************ */
// Cargar y graficar datos desde el archivo CSV como gráfico de torta
fetch('datos_emprendimiento.csv') // Solicita el archivo CSV
    .then(response => response.text()) // Convierte la respuesta en texto plano
    .then(data => {
        // Separar líneas del CSV
        const filas = data.trim().split('\n').slice(1); // Elimina espacios, separa por líneas y omite encabezado
        const labels = []; // Array para las etiquetas (años)
        const valores = []; // Array para los valores (cantidades)

        // Leer cada línea y separar año y cantidad
        filas.forEach(fila => {
            const [anio, cantidad] = fila.split(','); // Divide cada línea por coma
            labels.push(anio); // Agrega el año al arreglo de etiquetas
            valores.push(Number(cantidad)); // Convierte la cantidad a número y la agrega al arreglo
        });

        // Generar colores aleatorios para cada segmento de la torta
        const colores = generarColores(valores.length);

        // Crear el gráfico de torta
        const ctx = document.getElementById('graficoTorta').getContext('2d'); // Usa un nuevo ID para el canvas
        new Chart(ctx, {
            type: 'pie', // Tipo de gráfico: torta
            data: {
                labels: labels, // Etiquetas (años)
                datasets: [{
                    label: 'Cantidad de Emprendimientos',
                    data: valores, // Valores (cantidades)
                    backgroundColor: colores, // Colores para cada segmento
                    borderColor: 'white', // Color del borde
                    borderWidth: 2 // Ancho del borde
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', // Posición de la leyenda
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                // Calcular el porcentaje
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const porcentaje = Math.round((context.raw / total) * 100);
                                return `${context.label}: ${context.raw} (${porcentaje}%)`;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error("Error al cargar el archivo:", error));

// Función para generar colores aleatorios
function generarColores(cantidad) {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        // Genera colores HSL con un espaciado uniforme en el espectro de color
        const hue = (i * 360 / cantidad) % 360;
        colores.push(`hsla(${hue}, 70%, 60%, 0.8)`);
    }
    return colores;
}

//************************************************************************************/
// PARA EL FORMULARIO DE CALCULOS
document.addEventListener('DOMContentLoaded', function() {
    // Referencia al formulario
    const form = document.getElementById('calculadoraForm');
    const resultadosDiv = document.getElementById('resultados');
    
    // Datos de porcentajes de energía renovable por región
    const datosRegionales = {
        norte: {
            solar: 18,
            eolica: 19.9,
            hidro: 10
        },
        centro: {
            solar: 10,
            eolica: 5,
            hidro: 30
        },
        sur: {
            solar: 20,
            eolica: 15,
            hidro: 25
        }
    };
    
    // Escuchar el evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío normal del formulario
        
        // Obtener los valores ingresados
        const consumoTotal = parseFloat(document.getElementById('consumoTotal').value);
        const region = document.getElementById('region').value;
        
        // Validar que se hayan ingresado todos los datos
        if (!consumoTotal || !region) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Realizar cálculos
        const datos = datosRegionales[region];
        const porcentajeSolar = datos.solar;
        const porcentajeEolica = datos.eolica;
        const porcentajeHidro = datos.hidro;
        const porcentajeRenovable = porcentajeSolar + porcentajeEolica + porcentajeHidro;
        const porcentajeNoRenovable = 100 - porcentajeRenovable;
        
        // Mostrar los resultados
        document.getElementById('porcentajeValor').textContent = porcentajeRenovable + '%';
        document.getElementById('energiaSolar').textContent = porcentajeSolar;
        document.getElementById('energiaEolica').textContent = porcentajeEolica;
        document.getElementById('energiaHidro').textContent = porcentajeHidro;
        document.getElementById('energiaNoRenovable').textContent = porcentajeNoRenovable;
        
        // Actualizar el gráfico circular
        document.getElementById('porcentajeCirculo').style.background = 
            `conic-gradient(#2d8659 ${porcentajeRenovable}%, #f5f7fa 0%)`;
        
        // Generar recomendación personalizada
        let recomendacion = '';
        if (porcentajeRenovable < 30) {
            recomendacion = 'Tu consumo de energía renovable es bajo. Considera instalar paneles solares o contratar un proveedor de energía verde.';
        } else if (porcentajeRenovable < 60) {
            recomendacion = 'Tu consumo de energía renovable es moderado. Podrías mejorar optimizando el uso de energía en horas pico.';
        } else {
            recomendacion = '¡Excelente! Tu consumo de energía renovable es alto. Sigues contribuyendo positivamente al medio ambiente.';
        }
        
        document.getElementById('recomendacion').textContent = recomendacion;
        
        // Mostrar la sección de resultados
        resultadosDiv.classList.remove('hidden');
        
        // Desplazarse suavemente hasta los resultados
        resultadosDiv.scrollIntoView({ behavior: 'smooth' });
    });
});
