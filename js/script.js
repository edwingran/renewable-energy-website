
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
            eolica: 13,
            hidro: 25
        },
        centro: {
            solar: 10,
            eolica: 5,
            hidro: 60
        },
        sur: {
            solar: 19,
            eolica: 9,
            hidro: 55
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
