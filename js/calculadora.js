(() => {
  const DATASETS = {
    sa: { url: '/datos/datos_energia_sa.csv', label: 'Sur América' },
    global: { url: '/datos/datos_energia_global.csv', label: 'Global' }
  };

  const MIX_REFERENCIAL = {
    solar: 22,
    eolica: 18,
    hidro: 35
  };

  function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    const rows = lines.slice(1);
    const result = [];

    for (const row of rows) {
      const parts = row.split(';');
      if (parts.length < 2) continue;
      const pais = String(parts[0]).trim();
      const raw = String(parts[1]).trim();
      const energia = Number(raw.replace(',', '.'));
      if (!pais || Number.isNaN(energia)) continue;
      result.push({ pais, energia });
    }

    return result;
  }

  async function loadDataset(key) {
    const ds = DATASETS[key];
    const res = await fetch(ds.url, { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar el archivo de datos');
    const text = await res.text();
    return parseCsv(text);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculadoraForm');
    if (!form) return;

    const datasetSelect = document.getElementById('dataset');
    const paisSelect = document.getElementById('pais');
    const resultadosDiv = document.getElementById('resultados');

    const porcentajeValor = document.getElementById('porcentajeValor');
    const porcentajeCirculo = document.getElementById('porcentajeCirculo');
    const capacidadPais = document.getElementById('capacidadPais');
    const paisSeleccionado = document.getElementById('paisSeleccionado');

    const energiaSolar = document.getElementById('energiaSolar');
    const energiaEolica = document.getElementById('energiaEolica');
    const energiaHidro = document.getElementById('energiaHidro');
    const energiaNoRenovable = document.getElementById('energiaNoRenovable');
    const recomendacion = document.getElementById('recomendacion');

    let datasetCache = new Map();

    async function refreshCountries() {
      const key = datasetSelect.value;
      paisSelect.innerHTML = '';
      paisSelect.disabled = true;

      if (!key) {
        paisSelect.innerHTML = '<option value="" selected disabled>Primero selecciona un conjunto…</option>';
        return;
      }

      try {
        let rows = datasetCache.get(key);
        if (!rows) {
          rows = await loadDataset(key);
          datasetCache.set(key, rows);
        }

        const options = ['<option value="" selected disabled>Selecciona un país…</option>'];
        rows
          .slice()
          .sort((a, b) => a.pais.localeCompare(b.pais))
          .forEach(r => {
            options.push(`<option value="${encodeURIComponent(r.pais)}">${r.pais}</option>`);
          });

        paisSelect.innerHTML = options.join('');
        paisSelect.disabled = false;
      } catch (e) {
        paisSelect.innerHTML = '<option value="" selected disabled>Error cargando datos</option>';
        paisSelect.disabled = true;
      }
    }

    datasetSelect.addEventListener('change', () => {
      refreshCountries();
    });

    function setMix(percentRenovable) {
      const base = Math.max(0, Math.min(100, percentRenovable));
      const solar = MIX_REFERENCIAL.solar;
      const eolica = MIX_REFERENCIAL.eolica;
      const hidro = MIX_REFERENCIAL.hidro;
      const renovableMix = solar + eolica + hidro;

      const factor = renovableMix > 0 ? base / renovableMix : 0;

      const solarAdj = Math.round(solar * factor);
      const eolicaAdj = Math.round(eolica * factor);
      const hidroAdj = Math.round(hidro * factor);
      const totalAdj = solarAdj + eolicaAdj + hidroAdj;
      const noRen = Math.max(0, 100 - totalAdj);

      energiaSolar.textContent = solarAdj;
      energiaEolica.textContent = eolicaAdj;
      energiaHidro.textContent = hidroAdj;
      energiaNoRenovable.textContent = noRen;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const consumoTotal = Number(document.getElementById('consumoTotal').value);
      const datasetKey = datasetSelect.value;
      const paisKey = paisSelect.value;

      if (!consumoTotal || !datasetKey || !paisKey) {
        alert('Por favor completa todos los campos');
        return;
      }

      const pais = decodeURIComponent(paisKey);

      try {
        let rows = datasetCache.get(datasetKey);
        if (!rows) {
          rows = await loadDataset(datasetKey);
          datasetCache.set(datasetKey, rows);
        }

        const found = rows.find(r => r.pais.toLowerCase() === pais.toLowerCase());
        if (!found) {
          alert('No se encontró el país en el conjunto de datos');
          return;
        }

        const capacidadMw = found.energia;
        const consumoMwEquivalente = (consumoTotal / 1000) / 30;
        const participacion = capacidadMw > 0 ? (consumoMwEquivalente / capacidadMw) * 100 : 0;
        const participacionClamped = Math.max(0, Math.min(100, participacion));

        paisSeleccionado.textContent = `${pais} · ${DATASETS[datasetKey].label}`;
        capacidadPais.textContent = `${capacidadMw.toLocaleString('es-CO')} MW`;
        porcentajeValor.textContent = `${participacionClamped.toFixed(2)}%`;

        porcentajeCirculo.style.background = `conic-gradient(#00A651 ${participacionClamped}%, #ECF0F1 0%)`;

        setMix(Math.min(95, Math.max(10, Math.round(participacionClamped))));

        let reco = '';
        if (participacionClamped < 5) {
          reco = 'Tu consumo es pequeño frente a la capacidad renovable del país. Aun así puedes optimizar: iluminación LED, gestión de standby y hábitos de consumo.';
        } else if (participacionClamped < 20) {
          reco = 'Tu consumo es relevante. Considera autoconsumo (paneles solares) y programar consumos altos en horas de mayor generación renovable.';
        } else {
          reco = 'Tu consumo es alto en relación con la capacidad del país seleccionada. Prioriza eficiencia energética, auditoría de consumos y opciones de energía 100% renovable.';
        }
        recomendacion.textContent = reco;

        resultadosDiv.classList.remove('hidden');
        resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (err) {
        alert('Ocurrió un error al calcular. Revisa que el proyecto esté corriendo desde un servidor local.');
      }
    });

    refreshCountries();
  });
})();
