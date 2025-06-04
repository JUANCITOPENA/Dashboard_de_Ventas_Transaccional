# 📊 Dashboard de Ventas Interactivo

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![ApexCharts](https://img.shields.io/badge/ApexCharts-008FFB?style=for-the-badge&logo=apexcharts&logoColor=white)](https://apexcharts.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 🎯 Descripción del Proyecto

**¡Bienvenido al manual completo para crear tu propio Dashboard de Ventas Interactivo!**

Este proyecto te guiará paso a paso para construir una visualización dinámica de datos de ventas de dispositivos móviles, utilizando tecnologías web modernas y datos generados aleatoriamente. Imagina que eres el analista de datos de una empresa que vende teléfonos y accesorios a través de diversos canales y en múltiples países.

### ✨ Historia del Proyecto

Tu misión es crear una herramienta visual que permita a la dirección y al equipo de ventas:
- 📈 Entender rápidamente el rendimiento de ventas
- 🔍 Identificar tendencias y patrones
- 🏆 Ver qué productos son los más vendidos
- 🌍 Analizar en qué países se vende más
- 📊 Distribuir las ventas por canal y marca
- 🔄 Filtrar datos de forma interactiva para análisis profundo

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| **HTML5** | Estructura básica de la página web | Estándar |
| **CSS3** | Estilizado y diseño responsivo | Estándar |
| **JavaScript ES6+** | Lógica del dashboard y manipulación de datos | Moderno |
| **Node.js** | Generación de datos simulados | LTS |
| **ApexCharts.js** | Gráficos interactivos y visualizaciones | Última |
| **Bootstrap 5** | Framework CSS responsivo | 5.3.2 |
| **Font Awesome** | Iconos atractivos | 6.5.1 |

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener:

- [ ] **Node.js** instalado (versión LTS recomendada)
- [ ] **npm** (se instala automáticamente con Node.js)
- [ ] Un **editor de código** (VS Code, Sublime Text, etc.)
- [ ] **Navegador web** moderno (Chrome, Firefox, Safari, Edge)
- [ ] Conocimientos básicos de HTML, CSS y JavaScript

## 🚀 Instalación y Configuración

### Paso 1: Verificar Node.js

Primero, verifica que Node.js esté instalado correctamente:

```bash
# Verificar versión de Node.js
node -v

# Verificar versión de npm
npm -v
```

Si no tienes Node.js instalado:
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión **LTS** para tu sistema operativo
3. Ejecuta el instalador siguiendo las instrucciones

### Paso 2: Crear Estructura del Proyecto

```bash
# Crear directorio del proyecto
mkdir dashboard-ventas-interactivo
cd dashboard-ventas-interactivo

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias para generación de datos
npm install seedrandom json2csv
```

### Paso 3: Crear Archivos Base

Tu estructura de proyecto debe quedar así:

```
dashboard-ventas-interactivo/
├── 📄 package.json
├── 📄 generador_datos.js
├── 📄 index.html
├── 📄 style.css
├── 📄 script.js
├── 📄 sales_data.json (se genera automáticamente)
└── 📁 node_modules/
```

## 📊 Generación de Datos

### Crear el Generador de Datos

Crea el archivo `generador_datos.js` con el siguiente contenido:

```javascript
const fs = require('fs');
const seedrandom = require('seedrandom');
const path = require('path');
const { parse } = require('json2csv');

// --- PRUEBA DE SEMILLA Y ALEATORIEDAD ---
const semillaPrueba = Date.now().toString() + Math.floor(Math.random() * 1000);
const rngTest = seedrandom(semillaPrueba); 

console.log("--- INICIO PRUEBA DE ALEATORIEDAD (se ejecuta cada vez) ---");
console.log("Semilla usada para esta prueba:", semillaPrueba);
console.log("Número de prueba 1:", rngTest());
console.log("Número de prueba 2:", rngTest());
console.log("--- FIN PRUEBA DE ALEATORIEDAD ---\n");

function generateSalesData() {
    const semillaPrincipal = Date.now().toString() + Math.floor(Math.random() * 100);
    const rng = seedrandom(semillaPrincipal); 
    console.log("Semilla usada en generateSalesData():", semillaPrincipal);

    const startDate = new Date(2024, 0, 1); // Enero 2024
    const endDate = new Date(2025, 4, 31);   // Mayo 2025
    const numTransactions = Math.floor(20000 + rng() * 10000); // 20k-30k transacciones

    const brandsData = [
        { name: "Samsung", os: "Android", products: [
            { model: "Galaxy S25 Ultra", price: 1250 }, 
            { model: "Galaxy Z Fold 7", price: 1850 },
            { model: "Galaxy A56", price: 420 }, 
            { model: "Galaxy S25", price: 900 }
        ]},
        { name: "Apple", os: "iOS", products: [
            { model: "iPhone 16 Pro", price: 1300 }, 
            { model: "iPhone 16", price: 950 },
            { model: "iPhone SE 4", price: 500 }
        ]},
        { name: "Google", os: "Android", products: [
            { model: "Pixel 10 Pro", price: 1000 }, 
            { model: "Pixel 10", price: 750 },
            { model: "Pixel 9a", price: 550 }
        ]},
        { name: "Xiaomi", os: "Android", products: [
            { model: "Xiaomi 15 Ultra", price: 1100 }, 
            { model: "Redmi Note 14 Pro", price: 350 },
            { model: "Poco F7", price: 450 }
        ]},
        { name: "OnePlus", os: "Android", products: [
            { model: "OnePlus 13", price: 800 }, 
            { model: "OnePlus Nord 5", price: 400 }
        ]},
        { name: "Oppo", os: "Android", products: [
            { model: "Oppo Find X8 Pro", price: 1050 }, 
            { model: "Oppo Reno 12", price: 500 }
        ]},
        { name: "Vivo", os: "Android", products: [
            { model: "Vivo X110 Pro", price: 1000 }, 
            { model: "Vivo V31", price: 450 }
        ]},
        { name: "Realme", os: "Android", products: [
            { model: "Realme GT 6", price: 600 }, 
            { model: "Realme 13 Pro+", price: 380 }
        ]},
        { name: "Nothing", os: "Android", products: [
            { model: "Nothing Phone (3)", price: 700 }
        ]},
        { name: "Sony", os: "Android", products: [
            { model: "Xperia 1 VII", price: 1300 }
        ]},
        { name: "Honor", os: "Android", products: [
            { model: "Honor Magic 7 Pro", price: 900 }, 
            { model: "Honor 100", price: 400 }
        ]},
        { name: "Motorola", os: "Android", products: [
            { model: "Moto Edge 60 Pro", price: 700 }, 
            { model: "Moto G Power 2025", price: 250 }
        ]}
    ];

    const channels = ["Online", "Partner", "Retail Store", "Direct Sale"];
    const countries = [
        "USA", "Canada", "India", "Turkey", "Pakistan", "UK", "Germany", 
        "Brazil", "Indonesia", "Nigeria", "Japan", "Mexico", "France", 
        "South Korea", "Australia", "Spain", "Italy"
    ];

    const getRandomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
    const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
    const getRandomDate = (start, end) => new Date(start.getTime() + rng() * (end.getTime() - start.getTime()));

    const formatMonthYear = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    const transactions = [];
    for (let i = 0; i < numTransactions; i++) {
        const brandInfo = getRandomElement(brandsData);
        const productInfo = getRandomElement(brandInfo.products);
        const date = getRandomDate(startDate, endDate);
        const units = getRandomInt(1, 3);
        const revenue = Math.round(productInfo.price * units * (0.9 + rng() * 0.2));
        
        transactions.push({
            id: `TRX-${i + 1}-${Date.now()}`,
            date: date.toISOString().split('T')[0],
            monthYear: formatMonthYear(date),
            brand: brandInfo.name,
            os: brandInfo.os,
            model: productInfo.model,
            price: productInfo.price,
            units,
            revenue,
            channel: getRandomElement(channels),
            country: getRandomElement(countries),
        });
    }

    // Crear archivo JSON
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = path.join(outputDir, 'sales_data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(transactions, null, 2), 'utf8');
    console.log(`✅ Archivo JSON (${transactions.length} transacciones) generado en: ${jsonPath}`);

    try {
        const csv = parse(transactions);
        const csvPath = path.join(outputDir, 'sales_data.csv');
        fs.writeFileSync(csvPath, csv, 'utf8');
        console.log(`✅ Archivo CSV generado en: ${csvPath}`);
    } catch (err) {
        console.error("❌ Error al generar el archivo CSV:", err);
    }
}

generateSalesData();
```

### Ejecutar el Generador

```bash
# Generar los datos de ventas
node generador_datos.js

# Copiar el archivo generado a la raíz del proyecto
cp output/sales_data.json ./sales_data.json
```

## 🎨 Estructura HTML

Crea el archivo `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>📊 Dashboard Ventas Transaccional con Filtros</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Font Awesome CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <!-- ApexCharts JS -->
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <!-- Estilos CSS Personalizados -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="dashboard-wrapper">
    <!-- Encabezado del Dashboard -->
    <div class="dashboard-header">
      <div style="display:flex; align-items:center; justify-content:center; gap:10px;">
        <h1 style="margin:0; display:flex; align-items:center; gap:0.5rem;">
          <i class="fas fa-chart-pie"></i> Dashboard de Ventas Transaccional
        </h1>
      </div>
      <p>Visualización optimizada de datos clave (desde transacciones).</p>
    </div>

    <!-- Fila de KPIs (Indicadores Clave de Rendimiento) -->
    <div class="kpi-row">
      <div class="kpi-card">
        <i class="fas fa-sack-dollar text-success"></i>
        <div class="h5">Ingresos Totales</div>
        <div class="h4" id="totalRevenue">€0</div>
      </div>
      <div class="kpi-card">
        <i class="fab fa-android text-info"></i>
        <div class="h5">Ingresos Android</div>
        <div class="h4" id="androidRevenue">€0</div>
      </div>
      <div class="kpi-card">
        <i class="fab fa-apple text-secondary"></i>
        <div class="h5">Ingresos iOS</div>
        <div class="h4" id="iosRevenue">€0</div>
      </div>
    </div>

    <!-- Sección de Filtros -->
    <div class="filters-section">
      <div class="filter-group">
        <label for="filterMonthStart">Mes Inicio:</label>
        <select id="filterMonthStart" class="form-select"></select>
      </div>
      <div class="filter-group">
        <label for="filterMonthEnd">Mes Fin:</label>
        <select id="filterMonthEnd" class="form-select"></select>
      </div>
      <div class="filter-group">
        <label for="filterBrand">Marca:</label>
        <select id="filterBrand" class="form-select">
          <option value="">Todas</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="filterProduct">Producto:</label>
        <select id="filterProduct" class="form-select">
          <option value="">Todos</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="filterCountry">País:</label>
        <select id="filterCountry" class="form-select">
          <option value="">Todos</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="filterChannel">Canal:</label>
        <select id="filterChannel" class="form-select">
          <option value="">Todos</option>
        </select>
      </div>
      <div class="filter-group">
        <button id="resetFilters" class="btn btn-secondary w-100" style="margin-top: 1.5rem;">
          <i class="fas fa-undo"></i> Limpiar
        </button>
      </div>
    </div>

    <!-- Cuadrícula de Gráficos -->
    <div class="charts-grid">
      <!-- Primera Fila de Gráficos -->
      <div class="chart-row">
        <div class="chart-container">
          <h5><i class="fas fa-chart-line"></i> Ingresos Mensuales</h5>
          <div id="monthlyRevenueChart"></div>
          <div class="chart-summary" id="monthlyRevenueSummary">Cargando...</div>
        </div>
        <div class="chart-container">
          <h5><i class="fas fa-store"></i> Ingresos por Canal</h5>
          <div id="revenueByChannelChart"></div>
          <div class="chart-summary" id="revenueByChannelSummary">Cargando...</div>
        </div>
        <div class="chart-container">
          <h5><i class="fas fa-globe-americas"></i> Ingresos por País</h5>
          <div id="revenueByCountryChart"></div>
          <div class="chart-summary" id="revenueByCountrySummary">Cargando...</div>
        </div>
      </div>
      
      <!-- Segunda Fila de Gráficos -->
      <div class="chart-row">
        <div class="chart-container">
          <h5><i class="fas fa-tag"></i> Ingresos por Marca</h5>
          <div id="salesByBrandRevenueChart"></div>
          <div class="chart-summary" id="salesByBrandRevenueSummary">Cargando...</div>
        </div>
        <div class="chart-container">
          <h5><i class="fas fa-medal"></i> Top 5 Productos</h5>
          <div id="topProductsChart"></div>
          <div class="chart-summary" id="topProductsSummary">Cargando...</div>
        </div>
        <div class="chart-container">
          <h5><i class="fas fa-boxes"></i> Unidades Mensuales</h5>
          <div id="monthlyUnitsChart"></div>
          <div class="chart-summary" id="monthlyUnitsSummary">Cargando...</div>
        </div>
      </div>
    </div>

    <!-- Pie de Página -->
    <footer>© <span id="currentYear"></span> Dashboard Compacto</footer>
  </div>

  <!-- Script principal -->
  <script src="script.js"></script>
</body>
</html>
```

## 🎨 Estilos CSS

Crea el archivo `style.css`:

```css
body { 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  background: #f0f2f5; 
  margin: 0; 
  overflow-x: hidden; 
}

.dashboard-wrapper { 
  padding: 1rem; 
  max-width: 1772px; 
  margin: auto; 
  box-sizing: border-box;
}

.dashboard-header { 
  background: linear-gradient(135deg, #5b67ca, #4a7ec1); 
  color: white; 
  padding: 1rem; 
  border-radius: 8px; 
  text-align: center; 
  margin-bottom: 1rem; 
}

.kpi-row { 
  display: flex; 
  gap: 1rem; 
  margin-bottom: 1rem; 
  flex-wrap: wrap; 
}

.kpi-card { 
  flex: 1; 
  background: white; 
  border-radius: 8px; 
  padding: 1rem; 
  text-align: center; 
  box-shadow: 0 0 8px rgba(0,0,0,0.1); 
  min-width: 200px; 
}

.kpi-card i { 
  font-size: 2rem; 
  margin-bottom: .5rem; 
}

/* Estilos para la sección de Filtros */
.filters-section {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px;
  flex-grow: 1;
}

.filter-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}

.filter-group select, .filter-group input {
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  box-sizing: border-box;
}

.filter-group button {
    padding: 0.45rem 1rem;
    height: calc(0.375rem * 2 + 0.9rem + 2px + 0.5rem);
}

.charts-grid { 
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
}

.chart-row { 
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap; 
}

.chart-container { 
  background: white; 
  border-radius: 8px; 
  padding: 1rem;
  flex: 1; 
  box-shadow: 0 0 8px rgba(0,0,0,0.1); 
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-container > div:first-of-type { 
   min-height: 210px;
   flex-grow: 1;
}

.chart-summary {
  font-size: 0.82rem; 
  color: #555;
  margin-top: 10px;
  padding: 8px; 
  background-color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #eee;
  line-height: 1.5; 
  min-height: 3.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-highlight-green { color: #28a745; font-weight: bold; }
.text-highlight-blue { color: #007bff; font-weight: bold; }
.text-highlight-orange { color: #fd7e14; font-weight: bold; }
.text-highlight-red { color: #dc3545; font-weight: bold; }
.no-data-summary { font-style: italic; color: #777; }

footer { 
  text-align: center; 
  font-size: .85rem; 
  color: #666; 
  margin-top: 2rem;
  padding-bottom: 1rem;
}

/* Media Queries para Responsividad */
@media (max-width: 1200px) { 
    .filter-group {
        min-width: calc(33.333% - 1rem);
    }
}

@media (max-width: 992px) {
  .kpi-row, .chart-row {
    flex-direction: column;
  }
  .kpi-card, .chart-container {
    min-width: 100%;
  }
  .chart-summary {
    font-size: 0.78rem; 
  }
   .filter-group {
        min-width: calc(50% - 0.5rem);
    }
}

@media (max-width: 576px) {
    .filter-group {
        min-width: 100%;
    }
    .filters-section {
        flex-direction: column;
        align-items: stretch;
    }
    .filter-group button {
        margin-top: 0.5rem;
    }
}
```

## 🧠 Lógica JavaScript

Crea el archivo `script.js`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // --- Funciones de utilidad ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    const formatCurrency = val => new Intl.NumberFormat("es-ES", { 
        style: "currency", 
        currency: "EUR", 
        maximumFractionDigits: 0 
    }).format(val);
    const formatNumber = val => new Intl.NumberFormat("es-ES", { 
        maximumFractionDigits: 0 
    }).format(val);

    let allTransactions = [];
    let charts = {};

    const commonChartOptionsBase = {
        dataLabels: { enabled: false },
        legend: { 
            position: 'bottom', 
            horizontalAlign: 'center', 
            offsetY: 5, 
            itemMargin: { horizontal: 5, vertical: 2 },
            markers: { width: 10, height: 10 }, 
            fontSize: '11px' 
        },
        chart: { 
            height: 170,
            toolbar: { 
                show: true, 
                tools: { 
                    download: true, 
                    selection: false, 
                    zoom: false, 
                    zoomin: false, 
                    zoomout: false, 
                    pan: false, 
                    reset: true 
                } 
            }
        },
        grid: { padding: { top: 5, right: 10, bottom: 0, left: 15 } },
        yaxis: { 
            labels: { 
                style: {fontSize: '10px'}, 
                formatter: (val) => { 
                    if (val === undefined || val === null) return '';
                    if (Math.abs(val) >= 1000000) return formatCurrency(val / 1000000) + 'M';
                    if (Math.abs(val) >= 1000) return formatCurrency(val / 1000) + 'K';
                    return formatCurrency(val);
                }
            }
        },
        xaxis: {
            labels: {
                style: { fontSize: '10px' },
                rotate: -45,
                trim: true,
                hideOverlappingLabels: true
            }
        },
        noData: {
            text: 'Sin datos para mostrar.',
            align: 'center', 
            verticalAlign: 'middle',
            style: { color: "#666666", fontSize: '14px' }
        }
    };

    function populateSelect(selectId, optionsArray, hasAllOption = true, valueKey = null, textKey = null) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) { 
            console.error(`Select con ID '${selectId}' no encontrado.`); 
            return; 
        }
        selectElement.innerHTML = ''; 
        if (hasAllOption) {
            const allOption = document.createElement('option');
            allOption.value = "";
            let allText = "Todos";
            if (selectId === "filterMonthStart" || selectId === "filterMonthEnd") allText = "N/A";
            else if (selectId === "filterBrand") allText = "Todas las Marcas";
            else if (selectId === "filterProduct") allText = "Todos los Productos";
            else if (selectId === "filterCountry") allText = "Todos los Países";
            else if (selectId === "filterChannel") allText = "Todos los Canales";
            allOption.textContent = allText;
            selectElement.appendChild(allOption);
        }
        optionsArray.forEach(optionData => {
            const opt = document.createElement('option');
            opt.value = valueKey ? optionData[valueKey] : (optionData.value !== undefined ? optionData.value : optionData);
            opt.textContent = textKey ? optionData[textKey] : (optionData.text !== undefined ? optionData.text : optionData);
            selectElement.appendChild(opt);
        });
    }

    function initializeFilters(transactions) {
        if (!transactions || transactions.length === 0) { 
            console.warn("initializeFilters: No hay transacciones."); 
            document.querySelectorAll('.filters-section select, .filters-section button').forEach(el => el.disabled = true);
            return; 
        }

        const uniqueMonths = [...new Set(transactions.map(t => t.monthYear))]
            .sort((a, b) => new Date(a) - new Date(b));
        populateSelect('filterMonthStart', uniqueMonths, false); 
        populateSelect('filterMonthEnd', uniqueMonths, false);
        if (uniqueMonths.length > 0) { 
            document.getElementById('filterMonthStart').value = uniqueMonths[0];
            document.getElementById('filterMonthEnd').value = uniqueMonths[uniqueMonths.length - 1]; 
        }

        const uniqueBrands = [...new Set(transactions.map(t => t.brand))].sort();
        populateSelect('filterBrand', uniqueBrands);

        const uniqueProducts = [...new Set(transactions.map(t => t.model))].sort();
        populateSelect('filterProduct', uniqueProducts); 
        
        const uniqueCountries = [...new Set(transactions.map(t => t.country))].sort();
        populateSelect('filterCountry', uniqueCountries);

        const uniqueChannels = [...new Set(transactions.map(t => t.channel))].sort();
        populateSelect('filterChannel', uniqueChannels);
    }

    function processTransactions(transactionsToProcess) {
        const processed = {
            kpis: { totalRevenue: 0, androidRevenue: 0, iosRevenue: 0 },
            monthlyDataMap: {},
            revenueByChannel: {},
            revenueByCountry: {},
            salesByBran
