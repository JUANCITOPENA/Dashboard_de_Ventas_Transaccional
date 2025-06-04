# 📊 Manual del Proyecto: Dashboard de Ventas Interactivo

¡Bienvenido al manual para crear tu propio Dashboard de Ventas Interactivo! Este proyecto te guiará paso a paso para construir una visualización dinámica de datos de ventas, utilizando tecnologías web modernas y datos generados aleatoriamente.

**Inspiración y Narrativa del Proyecto ✨**

Imagina que eres el analista de datos de una empresa que vende dispositivos móviles (teléfonos y accesorios) a través de diversos canales y en múltiples países. Tu misión es crear una herramienta visual que permita a la dirección y al equipo de ventas entender rápidamente el rendimiento, identificar tendencias, ver qué productos son los más vendidos, en qué países se vende más, y cómo se distribuyen las ventas por canal y marca. Este dashboard no solo mostrará los datos, sino que también permitirá filtrarlos de forma interactiva para un análisis más profundo.

**Fuente de Datos 📄➡️💾**

Para este proyecto, no utilizaremos una base de datos real compleja. En su lugar, generaremos un conjunto de datos de transacciones de ventas simuladas utilizando un script de Node.js. Este script creará un archivo `sales_data.json` con miles de registros de ventas individuales, cada uno con detalles como:

*   Fecha de la transacción
*   Mes y Año (formateado)
*   Marca del producto (Samsung, Apple, Xiaomi, etc.)
*   Sistema Operativo (Android, iOS)
*   Modelo del producto
*   Unidades vendidas
*   Ingresos generados
*   Canal de venta (Online, Partner, Tienda Física, Venta Directa)
*   País de la venta

Este enfoque nos da flexibilidad para tener datos detallados y practicar el procesamiento y agregación de datos en el lado del cliente (navegador).

**Tecnologías Utilizadas 💻🔧**

*   ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **HTML5:** Para la estructura básica de nuestra página web.
*   ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS3:** Para dar estilo y hacer que nuestro dashboard se vea atractivo.
*   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript (ES6+):** El cerebro de nuestro dashboard. Se encargará de:
    *   Cargar los datos del archivo JSON.
    *   Procesar y agregar los datos.
    *   Manejar la lógica de los filtros.
    *   Actualizar dinámicamente los gráficos y KPIs.
*   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js:** (Opcional, solo para generar los datos). Utilizaremos un script simple de Node.js para crear nuestro archivo `sales_data.json` simulado.
*   ![ApexCharts](https://img.shields.io/badge/ApexCharts-008FFB?style=for-the-badge&logo=apexcharts&logoColor=white) **ApexCharts.js:** Una librería de JavaScript moderna y de código abierto para crear gráficos interactivos y visualizaciones de datos.
*   ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) **Bootstrap 5:** Un framework de CSS popular para ayudarnos con el diseño responsivo y algunos componentes predefinidos.
*   ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white) **Font Awesome:** Para incluir iconos atractivos en nuestro dashboard.

---

## 🛠️ Parte 1: Preparación del Entorno y Generación de Datos

Antes de empezar a codificar nuestro dashboard, necesitamos generar los datos de ventas simulados.

### Paso 1.1: Configurar Node.js (Si aún no lo tienes)

Node.js es un entorno de ejecución para JavaScript fuera del navegador. Lo usaremos para ejecutar el script que genera los datos.

1.  **Descarga Node.js:** Ve a [nodejs.org](https://nodejs.org/) y descarga la versión LTS (Long Term Support) recomendada para tu sistema operativo (Windows, macOS, Linux).
2.  **Instala Node.js:** Ejecuta el instalador y sigue las instrucciones. Esto también instalará npm (Node Package Manager), que usaremos para instalar librerías.
3.  **Verifica la instalación:** Abre una terminal o línea de comandos y escribe:
    ```bash
    node -v
    npm -v
    ```
    Deberías ver las versiones de Node.js y npm instaladas.

### Paso 1.2: Crear la Carpeta del Proyecto y el Script Generador

1.  **Crea una carpeta para tu proyecto:** Por ejemplo, llámala `dashboard-ventas-interactivo`.
2.  **Navega a la carpeta en la terminal:**
    ```bash
    cd ruta/a/tu/dashboard-ventas-interactivo
    ```
3.  **Inicializa un proyecto de Node.js (opcional pero recomendado):**
    ```bash
    npm init -y
    ```
    Esto creará un archivo `package.json`.
4.  **Instala las librerías necesarias para el script generador:**
    ```bash
    npm install seedrandom json2csv
    ```
    *   `seedrandom`: Para generar números aleatorios de forma reproducible si usamos una semilla.
    *   `json2csv`: Para convertir los datos JSON a formato CSV (opcional, pero el script lo incluye).
5.  **Crea un archivo para el script generador:** Dentro de la carpeta de tu proyecto, crea un archivo llamado `generador_datos.js`.
6.  **Pega el siguiente código en `generador_datos.js`:**

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
    // --- FIN DE PRUEBA ---

    function generateSalesData() {
        const semillaPrincipal = Date.now().toString() + Math.floor(Math.random() * 100);
        const rng = seedrandom(semillaPrincipal); 
        console.log("Semilla usada en generateSalesData():", semillaPrincipal);

        const startDate = new Date(2024, 0, 1); // Enero 2024
        const endDate = new Date(2025, 4, 31);   // Mayo 2025 (los meses son 0-indexados)
        const numTransactions = Math.floor(20000 + rng() * 10000); // Menos transacciones para un archivo más manejable (20k-30k)

        const brandsData = [
            { name: "Samsung", os: "Android", products: [
                { model: "Galaxy S25 Ultra", price: 1250 }, { model: "Galaxy Z Fold 7", price: 1850 },
                { model: "Galaxy A56", price: 420 }, { model: "Galaxy S25", price: 900 }
            ]},
            { name: "Apple", os: "iOS", products: [
                { model: "iPhone 16 Pro", price: 1300 }, { model: "iPhone 16", price: 950 },
                { model: "iPhone SE 4", price: 500 }
            ]},
            { name: "Google", os: "Android", products: [
                { model: "Pixel 10 Pro", price: 1000 }, { model: "Pixel 10", price: 750 },
                { model: "Pixel 9a", price: 550 }
            ]},
            { name: "Xiaomi", os: "Android", products: [
                { model: "Xiaomi 15 Ultra", price: 1100 }, { model: "Redmi Note 14 Pro", price: 350 },
                { model: "Poco F7", price: 450 }
            ]},
            { name: "OnePlus", os: "Android", products: [
                { model: "OnePlus 13", price: 800 }, { model: "OnePlus Nord 5", price: 400 }
            ]},
            { name: "Oppo", os: "Android", products: [
                { model: "Oppo Find X8 Pro", price: 1050 }, { model: "Oppo Reno 12", price: 500 }
            ]},
            { name: "Vivo", os: "Android", products: [
                { model: "Vivo X110 Pro", price: 1000 }, { model: "Vivo V31", price: 450 }
            ]},
            { name: "Realme", os: "Android", products: [
                { model: "Realme GT 6", price: 600 }, { model: "Realme 13 Pro+", price: 380 }
            ]},
            { name: "Nothing", os: "Android", products: [
                { model: "Nothing Phone (3)", price: 700 }
            ]},
            { name: "Sony", os: "Android", products: [
                { model: "Xperia 1 VII", price: 1300 }
            ]},
            { name: "Honor", os: "Android", products: [
                { model: "Honor Magic 7 Pro", price: 900 }, { model: "Honor 100", price: 400 }
            ]},
            { name: "Motorola", os: "Android", products: [
                { model: "Moto Edge 60 Pro", price: 700 }, { model: "Moto G Power 2025", price: 250 }
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
            const units = getRandomInt(1, 3); // Reducido para un comportamiento más realista de unidades por transacción
            const revenue = Math.round(productInfo.price * units * (0.9 + rng() * 0.2)); // Variación de precio/descuento
            
            transactions.push({
                id: `TRX-${i + 1}-${Date.now()}`, // ID de transacción único
                date: date.toISOString().split('T')[0], // Formato YYYY-MM-DD
                monthYear: formatMonthYear(date), // Formato "Jan 2024"
                brand: brandInfo.name,
                os: brandInfo.os,
                model: productInfo.model,
                price: productInfo.price, // Precio unitario del producto
                units,
                revenue,
                channel: getRandomElement(channels),
                country: getRandomElement(countries),
            });
        }

        // Crear la carpeta 'output' si no existe, en la misma carpeta que el script
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

### Paso 1.3: Generar el Archivo `sales_data.json` データを生成する

1.  **Ejecuta el script:** En tu terminal, dentro de la carpeta del proyecto, ejecuta:
    ```bash
    node generador_datos.js
    ```
2.  **Verifica la salida:** Deberías ver mensajes en la consola indicando la semilla usada y que los archivos `sales_data.json` y `sales_data.csv` han sido generados. Estos archivos se crearán en una nueva carpeta llamada `output` dentro de la carpeta de tu proyecto.
3.  **Prepara el archivo para el dashboard:** **Copia** el archivo `output/sales_data.json` y **pégalo directamente en la raíz de la carpeta de tu proyecto** (la misma carpeta donde crearás `index.html`). El dashboard buscará `sales_data.json` en la misma ubicación que el archivo HTML.

    Estructura de carpetas esperada después de este paso:
    ```
    dashboard-ventas-interactivo/
    ├── generador_datos.js
    ├── node_modules/
    ├── output/
    │   ├── sales_data.csv
    │   └── sales_data.json  (Este es el generado, no lo uses directamente para el dashboard)
    ├── package.json
    ├── package-lock.json
    └── sales_data.json      <-- ¡COPIA AQUÍ el archivo de la carpeta output!
    ```

¡Perfecto! Ahora tenemos nuestros datos. Es hora de construir el dashboard.

---

## 🎨 Parte 2: Creación del Dashboard (HTML, CSS y JavaScript)

### Paso 2.1: Estructura HTML Base (`index.html`)

Crea un archivo llamado `index.html` en la raíz de la carpeta de tu proyecto. Pega el siguiente código HTML. Esta será la estructura de nuestro dashboard.

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
  <!-- ApexCharts JS (va aquí para que esté disponible antes de nuestro script) -->
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <!-- Estilos CSS Personalizados (los definiremos después) -->
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
        <!-- Puedes poner un avatar o logo si quieres -->
        <!-- <img src="url_tu_avatar.png" alt="Avatar" width="50" height="50" style="border-radius:50%; object-fit:cover;" /> -->
      </div>
      <p>Visualización optimizada de datos clave (desde transacciones).</p>
    </div>

    <!-- Fila de KPIs (Indicadores Clave de Rendimiento) -->
    <div class="kpi-row">
      <div class="kpi-card">
        <i class="fas fa-sack-dollar text-success"></i><div class="h5">Ingresos Totales</div><div class="h4" id="totalRevenue">€0</div>
      </div>
      <div class="kpi-card">
        <i class="fab fa-android text-info"></i><div class="h5">Ingresos Android</div><div class="h4" id="androidRevenue">€0</div>
      </div>
      <div class="kpi-card">
        <i class="fab fa-apple text-secondary"></i><div class="h5">Ingresos iOS</div><div class="h4" id="iosRevenue">€0</div>
      </div>
    </div>

    <!-- Sección de Filtros -->
    <div class="filters-section">
      <div class="filter-group"><label for="filterMonthStart">Mes Inicio:</label><select id="filterMonthStart" class="form-select"></select></div>
      <div class="filter-group"><label for="filterMonthEnd">Mes Fin:</label><select id="filterMonthEnd" class="form-select"></select></div>
      <div class="filter-group"><label for="filterBrand">Marca:</label><select id="filterBrand" class="form-select"><option value="">Todas</option></select></div>
      <div class="filter-group"><label for="filterProduct">Producto:</label><select id="filterProduct" class="form-select"><option value="">Todos</option></select></div>
      <div class="filter-group"><label for="filterCountry">País:</label><select id="filterCountry" class="form-select"><option value="">Todos</option></select></div>
      <div class="filter-group"><label for="filterChannel">Canal:</label><select id="filterChannel" class="form-select"><option value="">Todos</option></select></div>
      <div class="filter-group"><button id="resetFilters" class="btn btn-secondary w-100" style="margin-top: 1.5rem;"><i class="fas fa-undo"></i> Limpiar</button></div>
    </div>

    <!-- Cuadrícula de Gráficos -->
    <div class="charts-grid">
      <!-- Primera Fila de Gráficos -->
      <div class="chart-row">
        <div class="chart-container"><h5><i class="fas fa-chart-line"></i> Ingresos Mensuales</h5><div id="monthlyRevenueChart"></div><div class="chart-summary" id="monthlyRevenueSummary">Cargando...</div></div>
        <div class="chart-container"><h5><i class="fas fa-store"></i> Ingresos por Canal</h5><div id="revenueByChannelChart"></div><div class="chart-summary" id="revenueByChannelSummary">Cargando...</div></div>
        <div class="chart-container"><h5><i class="fas fa-globe-americas"></i> Ingresos por País</h5><div id="revenueByCountryChart"></div><div class="chart-summary" id="revenueByCountrySummary">Cargando...</div></div>
      </div>
      <!-- Segunda Fila de Gráficos -->
      <div class="chart-row">
        <div class="chart-container"><h5><i class="fas fa-tag"></i> Ingresos por Marca</h5><div id="salesByBrandRevenueChart"></div><div class="chart-summary" id="salesByBrandRevenueSummary">Cargando...</div></div>
        <div class="chart-container"><h5><i class="fas fa-medal"></i> Top 5 Productos</h5><div id="topProductsChart"></div><div class="chart-summary" id="topProductsSummary">Cargando...</div></div>
        <div class="chart-container"><h5><i class="fas fa-boxes"></i> Unidades Mensuales</h5><div id="monthlyUnitsChart"></div><div class="chart-summary" id="monthlyUnitsSummary">Cargando...</div></div>
      </div>
    </div>

    <!-- Pie de Página -->
    <footer>© <span id="currentYear"></span> Dashboard Compacto</footer>
  </div>

  <!-- Nuestro script principal (lo crearemos después) -->
  <script src="script.js"></script>
</body>
</html>


Paso 2.2: Estilos CSS (style.css)
Crea un archivo llamado style.css en la raíz de la carpeta de tu proyecto (junto a index.html). Pega los siguientes estilos CSS:


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
  align-items: flex-end; /* Alinea el botón con los selects */
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px; /* Ancho mínimo para cada grupo de filtro */
  flex-grow: 1;
}
.filter-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}
.filter-group select, .filter-group input { /* También para futuros inputs */
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  box-sizing: border-box; /* Importante para que el padding no aumente el ancho */
}
.filter-group button {
    padding: 0.45rem 1rem; /* Ajuste para que sea similar en altura a los selects */
    height: calc(0.375rem * 2 + 0.9rem + 2px + 0.5rem); /* Para igualar altura de selects con padding y border */
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
  min-width: 300px; /* Asegura que los gráficos no se compriman demasiado */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribuye el espacio entre título, gráfico y resumen */
}
/* El div donde ApexCharts renderiza el gráfico */
.chart-container > div:first-of-type { 
   min-height: 210px; /* Espacio para un gráfico de 170px de Apex + leyenda */
   flex-grow: 1; /* Permite que el gráfico crezca si hay espacio */
}
.chart-summary {
  font-size: 0.82rem; 
  color: #555;
  margin-top: 10px; /* Espacio entre gráfico/leyenda y resumen */
  padding: 8px; 
  background-color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #eee;
  line-height: 1.5; 
  min-height: 3.5em; /* Para evitar saltos de altura si el texto es corto */
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
  margin-top: 2rem; /* Más espacio antes del footer */
  padding-bottom: 1rem; /* Espacio después del footer */
}

/* Media Queries para Responsividad */
@media (max-width: 1200px) { 
    .filter-group {
        min-width: calc(33.333% - 1rem); /* Tres filtros por fila */
    }
}
@media (max-width: 992px) {
  .kpi-row, .chart-row {
    flex-direction: column;
  }
  .kpi-card, .chart-container {
    min-width: 100%; /* Ocupan todo el ancho en pantallas pequeñas */
  }
  .chart-summary {
    font-size: 0.78rem; 
  }
   .filter-group {
        min-width: calc(50% - 0.5rem); /* Dos filtros por fila */
    }
}
@media (max-width: 576px) {
    .filter-group {
        min-width: 100%; /* Un filtro por fila */
    }
    .filters-section {
        flex-direction: column;
        align-items: stretch; /* Para que el botón ocupe todo el ancho */
    }
    .filter-group button {
        margin-top: 0.5rem; /* Ajuste de margen para el botón en móvil */
    }
}
Paso 2.3: Lógica Principal en JavaScript (script.js) 🧠
Este es el corazón del dashboard. Crea un archivo llamado script.js en la raíz de la carpeta de tu proyecto. Pega el siguiente código JavaScript. Este código está diseñado para trabajar con el sales_data.json transaccional que generaste.

document.addEventListener('DOMContentLoaded', () => {
    // --- Funciones de utilidad ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    const formatCurrency = val => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
    const formatNumber = val => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(val);

    let allTransactions = []; // Almacenará todas las transacciones originales
    let charts = {}; // Para almacenar instancias de gráficos y actualizarlos

    const commonChartOptionsBase = {
        dataLabels: { enabled: false },
        legend: { 
            position: 'bottom', horizontalAlign: 'center', offsetY: 5, 
            itemMargin: { horizontal: 5, vertical: 2 },
            markers: { width: 10, height: 10 }, fontSize: '11px' 
        },
        chart: { 
            height: 170, // Altura del GRÁFICO ApexCharts
            toolbar: { show: true, tools: { download: true, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: true } }
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
            align: 'center', verticalAlign: 'middle',
            style: { color: "#666666", fontSize: '14px' }
        }
    };

    function populateSelect(selectId, optionsArray, hasAllOption = true, valueKey = null, textKey = null) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) { console.error(`Select con ID '${selectId}' no encontrado.`); return; }
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
            .sort((a, b) => new Date(a) - new Date(b)); // Ordenar meses cronológicamente
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
            monthlyDataMap: {}, // Usar Map para mantener orden de inserción
            revenueByChannel: {},
            revenueByCountry: {},
            salesByBrand: {},
            productPerformance: {}
        };

        transactionsToProcess.forEach(t => {
            // KPIs
            processed.kpis.totalRevenue += t.revenue;
            if (t.os === 'Android') processed.kpis.androidRevenue += t.revenue;
            if (t.os === 'iOS') processed.kpis.iosRevenue += t.revenue;

            // Monthly Data
            if (!processed.monthlyDataMap[t.monthYear]) {
                processed.monthlyDataMap[t.monthYear] = { month: t.monthYear, androidUnits: 0, iosUnits: 0, androidRevenue: 0, iosRevenue: 0 };
            }
            if (t.os === 'Android') {
                processed.monthlyDataMap[t.monthYear].androidUnits += t.units;
                processed.monthlyDataMap[t.monthYear].androidRevenue += t.revenue;
            } else if (t.os === 'iOS') {
                processed.monthlyDataMap[t.monthYear].iosUnits += t.units;
                processed.monthlyDataMap[t.monthYear].iosRevenue += t.revenue;
            }

            processed.revenueByChannel[t.channel] = (processed.revenueByChannel[t.channel] || 0) + t.revenue;
            processed.revenueByCountry[t.country] = (processed.revenueByCountry[t.country] || 0) + t.revenue;
            
            if (!processed.salesByBrand[t.brand]) processed.salesByBrand[t.brand] = { units: 0, revenue: 0 };
            processed.salesByBrand[t.brand].units += t.units;
            processed.salesByBrand[t.brand].revenue += t.revenue;

            if (!processed.productPerformance[t.model]) processed.productPerformance[t.model] = { revenue: 0, units: 0, brand: t.brand };
            processed.productPerformance[t.model].revenue += t.revenue;
            processed.productPerformance[t.model].units += t.units;
        });

        processed.monthlyData = Object.values(processed.monthlyDataMap).sort((a,b) => new Date(a.month) - new Date(b.month));
        
        processed.top10Products = Object.entries(processed.productPerformance)
            .map(([model, data]) => ({ model, ...data }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        return processed;
    }

    function applyFilters() {
        if (!allTransactions || allTransactions.length === 0) {
            updateDashboard(processTransactions([])); 
            return;
        }
        console.log("Aplicando filtros...");

        const selectedMonthStartStr = document.getElementById('filterMonthStart').value;
        const selectedMonthEndStr = document.getElementById('filterMonthEnd').value;
        const selectedBrand = document.getElementById('filterBrand').value;
        const selectedProductModel = document.getElementById('filterProduct').value;
        const selectedCountry = document.getElementById('filterCountry').value;
        const selectedChannel = document.getElementById('filterChannel').value;

        const dateMonthStart = selectedMonthStartStr ? new Date(selectedMonthStartStr) : null;
        // Para el mes final, queremos incluir todo el mes, así que vamos al inicio del siguiente mes
        let dateMonthEndLimit = null;
        if (selectedMonthEndStr) {
            const tempEndDate = new Date(selectedMonthEndStr);
            dateMonthEndLimit = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth() + 1, 1); 
        }


        let filteredTransactions = allTransactions.filter(t => {
            const transactionDate = new Date(t.date); 
            
            if (dateMonthStart && transactionDate < dateMonthStart) return false;
            if (dateMonthEndLimit && transactionDate >= dateMonthEndLimit) return false; // Usar >= con el inicio del *siguiente* mes
            if (selectedBrand && t.brand !== selectedBrand) return false;
            if (selectedProductModel && t.model !== selectedProductModel) return false;
            if (selectedCountry && t.country !== selectedCountry) return false;
            if (selectedChannel && t.channel !== selectedChannel) return false;
            return true;
        });
        
        const aggregatedData = processTransactions(filteredTransactions);
        console.log("Datos agregados después de filtros:", aggregatedData);
        updateDashboard(aggregatedData);
    }

    function updateDashboard(data) {
        console.log("Actualizando dashboard con:", data.kpis.totalRevenue);
        if (!data || !data.kpis) {
            document.querySelectorAll('.chart-summary').forEach(div => div.innerHTML = `<span class="no-data-summary">Error interno.</span>`);
            return;
        }

        document.getElementById("totalRevenue").textContent = formatCurrency(data.kpis.totalRevenue || 0);
        document.getElementById("androidRevenue").textContent = formatCurrency(data.kpis.androidRevenue || 0);
        document.getElementById("iosRevenue").textContent = formatCurrency(data.kpis.iosRevenue || 0);
        
        const monthlyChartData = data.monthlyData || [];
        const monthlyCategories = monthlyChartData.map(m => m.month);

        // --- Ingresos Mensuales ---
        if (charts.monthlyRevenueChart) {
            charts.monthlyRevenueChart.updateOptions({
                series: [
                    { name: "Android", data: monthlyChartData.map(m => m.androidRevenue || 0) },
                    { name: "iOS", data: monthlyChartData.map(m => m.iosRevenue || 0) }
                ],
                xaxis: { categories: monthlyCategories.length ? monthlyCategories : [''] }
            });
        }
        const totalPeriodRevenue = monthlyChartData.reduce((sum, m) => sum + (m.androidRevenue || 0) + (m.iosRevenue || 0), 0);
        const androidTotalRevenue = monthlyChartData.reduce((sum, m) => sum + (m.androidRevenue || 0), 0);
        const iosTotalRevenue = monthlyChartData.reduce((sum, m) => sum + (m.iosRevenue || 0), 0);
        const dominantPlatformRevenue = androidTotalRevenue > iosTotalRevenue ? 'Android' : (iosTotalRevenue > 0 ? 'iOS' : 'N/A');
        let peakMonthRevenueData = {month: 'N/A', androidRevenue:0, iosRevenue:0};
        if (monthlyChartData.length) {
            peakMonthRevenueData = monthlyChartData.reduce((peak, current) => (((current.androidRevenue||0) + (current.iosRevenue||0)) > ((peak.androidRevenue||0) + (peak.iosRevenue||0))) ? current : peak, monthlyChartData[0]);
        }
        document.getElementById('monthlyRevenueSummary').innerHTML = monthlyChartData.length ?
            `💰 Total: ${formatCurrency(totalPeriodRevenue)}. <span class="text-highlight-green">Pico ${peakMonthRevenueData.month}: ${formatCurrency((peakMonthRevenueData.androidRevenue||0) + (peakMonthRevenueData.iosRevenue||0))}</span>. ${dominantPlatformRevenue === 'Android' ? '🤖' : (dominantPlatformRevenue === 'iOS' ? '🍏' : '')} <span class="text-highlight-blue">${dominantPlatformRevenue}</span> lidera.` :
            `<span class="no-data-summary">Sin datos mensuales.</span>`;

        // --- Ingresos por Canal ---
        if (charts.revenueByChannelChart) { charts.revenueByChannelChart.destroy(); charts.revenueByChannelChart = null;}
        const revenueByChannelData = data.revenueByChannel || {};
        const channelLabels = Object.keys(revenueByChannelData);
        const channelSeries = Object.values(revenueByChannelData);
        charts.revenueByChannelChart = new ApexCharts(document.querySelector("#revenueByChannelChart"), {
          ...commonChartOptionsBase, 
          chart: { ...commonChartOptionsBase.chart, type: 'donut'}, 
          plotOptions: { pie: { donut: { size: '60%' } } },
          labels: channelLabels.length ? channelLabels : ['Sin Datos'], 
          series: channelSeries.length ? channelSeries : [0], 
          colors: ["#1abc9c", "#3498db", "#9b59b6", "#f39c12"], 
          tooltip: { y: { formatter: val => formatCurrency(val) } },
          yaxis: {} 
        });
        charts.revenueByChannelChart.render();
        const channelsArray = Object.entries(revenueByChannelData);
        let topChannel = ["N/A", 0];
        if (channelsArray.length) topChannel = channelsArray.reduce((prev, current) => (current[1] > prev[1] ? current : prev));
        document.getElementById('revenueByChannelSummary').innerHTML = channelsArray.length ?
            `🛍️ ${channelsArray.length > 1 ? `${channelsArray.length} canales` : "Un canal"}. <span class="text-highlight-green">${topChannel[0]}</span> destaca (${formatCurrency(topChannel[1])}).` :
            `<span class="no-data-summary">Sin datos de canal.</span>`;

        // --- Ingresos por País ---
        const revenueByCountryData = data.revenueByCountry || {};
        const countryCategories = Object.keys(revenueByCountryData);
        if (charts.revenueByCountryChart) {
            charts.revenueByCountryChart.updateOptions({
                series: [{ name: "Ingresos", data: Object.values(revenueByCountryData) }],
                xaxis: { categories: countryCategories.length ? countryCategories : [''] }
            });
        }
        const countriesArray = Object.entries(revenueByCountryData);
        let topCountry = ["N/A", 0]; let avgCountryRevenue = 0;
        if (countriesArray.length) {
            topCountry = countriesArray.reduce((prev, current) => (current[1] > prev[1] ? current : prev));
            avgCountryRevenue = countriesArray.reduce((sum, item) => sum + item[1], 0) / countriesArray.length;
        }
        document.getElementById('revenueByCountrySummary').innerHTML = countriesArray.length ?
            `🌍 <span class="text-highlight-green">${topCountry[0]}</span> lidera (${formatCurrency(topCountry[1])}). ${countriesArray.length} países, promedio: ${formatCurrency(avgCountryRevenue)}.`:
            `<span class="no-data-summary">Sin datos de país.</span>`;
        
        // --- Ingresos por Marca ---
        const salesByBrandData = data.salesByBrand || {};
        const salesByBrandProcessed = Object.entries(salesByBrandData).map(([brand, val]) => ({ name: brand, revenue: val.revenue || 0 }));
        const brandCategories = salesByBrandProcessed.map(item => item.name);
        if (charts.salesByBrandRevenueChart) {
            charts.salesByBrandRevenueChart.updateOptions({
                series: [{ name: "Ingresos", data: salesByBrandProcessed.map(item => item.revenue) }],
                xaxis: { categories: brandCategories.length ? brandCategories : [''] }
            });
        }
        let topBrand = {name: "N/A", revenue:0}; let avgBrandRevenue = 0;
        if(salesByBrandProcessed.length){
            topBrand = salesByBrandProcessed.reduce((prev, current) => (current.revenue > prev.revenue ? current : prev));
            avgBrandRevenue = salesByBrandProcessed.reduce((sum, item) => sum + item.revenue, 0) / salesByBrandProcessed.length;
        }
        document.getElementById('salesByBrandRevenueSummary').innerHTML = salesByBrandProcessed.length ?
            `🏷️ <span class="text-highlight-green">${topBrand.name}</span> top (${formatCurrency(topBrand.revenue)}). ${salesByBrandProcessed.length} marcas, promedio: ${formatCurrency(avgBrandRevenue)}.`:
            `<span class="no-data-summary">Sin datos de marca.</span>`;

        // --- Top 5 Productos ---
        const topProductsData = data.top10Products || [];
        const top5DisplayProducts = topProductsData.slice(0,5);
        const productCategories = top5DisplayProducts.map(p => p.model);
        if (charts.topProductsChart) {
            charts.topProductsChart.updateOptions({
                series: [{ name: "Ingresos", data: top5DisplayProducts.map(p => p.revenue || 0) }],
                xaxis: { categories: productCategories.length ? productCategories : [''] }
            });
        }
        const mainProduct = top5DisplayProducts.length ? top5DisplayProducts[0] : {model: "N/A", revenue:0};
        const sumTop5Revenue = top5DisplayProducts.reduce((sum, p) => sum + (p.revenue || 0), 0);
        document.getElementById('topProductsSummary').innerHTML = top5DisplayProducts.length ?
             `🏆 Estrella: <span class="text-highlight-red">${mainProduct.model}</span> (${formatCurrency(mainProduct.revenue || 0)}). Top 5: ${formatCurrency(sumTop5Revenue)}.` :
             `<span class="no-data-summary">Sin productos.</span>`;

        // --- Unidades Mensuales ---
        if (charts.monthlyUnitsChart) {
             charts.monthlyUnitsChart.updateOptions({
                series: [
                    { name: "Android", data: monthlyChartData.map(m => m.androidUnits || 0) },
                    { name: "iOS", data: monthlyChartData.map(m => m.iosUnits || 0) }
                ],
                xaxis: { categories: monthlyCategories.length ? monthlyCategories : [''] },
                yaxis: { labels: { style: {fontSize: '10px'}, formatter: (val) => { return val >= 1000 ? formatNumber(val/1000)+'K' : formatNumber(val); }}}
            });
        }
        const totalPeriodUnits = monthlyChartData.reduce((sum, m) => sum + (m.androidUnits || 0) + (m.iosUnits || 0), 0);
        const androidTotalUnits = monthlyChartData.reduce((sum, m) => sum + (m.androidUnits || 0), 0);
        const iosTotalUnits = monthlyChartData.reduce((sum, m) => sum + (m.iosUnits || 0), 0);
        const dominantPlatformUnits = androidTotalUnits > iosTotalUnits ? 'Android' : (iosTotalUnits > 0 ? 'iOS' : 'N/A');
        let peakMonthUnitsData = {month:'N/A', androidUnits:0, iosUnits:0};
        if(monthlyChartData.length){
            peakMonthUnitsData = monthlyChartData.reduce((peak, current) => {
                const currentTotal = (current.androidUnits||0) + (current.iosUnits||0);
                const peakTotal = (peak.androidUnits||0) + (peak.iosUnits||0);
                return currentTotal > peakTotal ? current : peak;
            }, monthlyChartData[0]);
        }
        document.getElementById('monthlyUnitsSummary').innerHTML = monthlyChartData.length ?
            `📦 Total uds: ${formatNumber(totalPeriodUnits)}. <span class="text-highlight-orange">Pico ${peakMonthUnitsData.month}: ${formatNumber((peakMonthUnitsData.androidUnits||0) + (peakMonthUnitsData.iosUnits||0))} uds</span>. ${dominantPlatformUnits === 'Android' ? '🤖' : (dominantPlatformUnits === 'iOS' ? '🍏' : '')} <span class="text-highlight-blue">${dominantPlatformUnits}</span> lidera.` :
            `<span class="no-data-summary">Sin datos mensuales.</span>`;
    }

    fetch('sales_data.json')
      .then(res => {
        console.log("Fetch - Respuesta:", res.status, res.statusText);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        return res.json();
      })
      .then(transactions => {
        console.log("Fetch - Transacciones cargadas:", transactions.length);
        if (!Array.isArray(transactions)) throw new Error("JSON no es un array.");
        
        allTransactions = transactions; 
        
        initializeFilters(allTransactions);
        
        const chartInitConfigs = [
            {id: 'monthlyRevenueChart', type: 'area', options: {colors: ["#00bcd4", "#666"], tooltip: { y: { formatter: val => formatCurrency(val) } }}},
            {id: 'revenueByCountryChart', type: 'bar', options: {colors: ["#34495e"], tooltip: { y: { formatter: val => formatCurrency(val) } }}},
            {id: 'salesByBrandRevenueChart', type: 'bar', options: {colors: ["#2ecc71"], tooltip: { y: { formatter: val => formatCurrency(val) } }}},
            {id: 'topProductsChart', type: 'bar', options: {colors: ["#e74c3c"], tooltip: { y: { formatter: val => formatCurrency(val) } }}},
            {id: 'monthlyUnitsChart', type: 'line', options: {yaxis: {labels: {style:{fontSize:'10px'},formatter:(val)=>{return val >= 1000 ? formatNumber(val/1000)+'K' : formatNumber(val);}}},colors:["#2980b9","#7f8c8d"],stroke:{width:3},tooltip:{y:{formatter:val=>formatNumber(val)+' uds.'}}}}
        ];

        chartInitConfigs.forEach(c => {
            const chartElement = document.querySelector(`#${c.id}`);
            if (chartElement) {
                charts[c.id] = new ApexCharts(chartElement, {
                    ...commonChartOptionsBase,
                    chart: {...commonChartOptionsBase.chart, type: c.type},
                    series: [], xaxis: {categories: []}, ...c.options
                });
                charts[c.id].render();
            } else { console.error(`Elemento para gráfico ${c.id} no encontrado.`); }
        });
        charts.revenueByChannelChart = null; 

        const initialAggregatedData = processTransactions(allTransactions);
        updateDashboard(initialAggregatedData); 
        
        document.querySelectorAll('.filters-section select').forEach(sel => sel.addEventListener('change', applyFilters));
        document.getElementById('resetFilters').addEventListener('click', () => {
            if (!allTransactions || allTransactions.length === 0) return;
            const uniqueMonths = [...new Set(allTransactions.map(t => t.monthYear))].sort((a, b) => new Date(a) - new Date(b));
            if (uniqueMonths.length > 0) {
                document.getElementById('filterMonthStart').value = uniqueMonths[0];
                document.getElementById('filterMonthEnd').value = uniqueMonths[uniqueMonths.length - 1];
            }
            document.getElementById('filterBrand').value = "";
            document.getElementById('filterProduct').value = "";
            document.getElementById('filterCountry').value = "";
            document.getElementById('filterChannel').value = "";
            applyFilters(); 
        });
      })
      .catch(err => {
        console.error("Error fatal en carga o procesamiento:", err);
        document.querySelectorAll('.chart-summary').forEach(div => div.innerHTML = `<span class="no-data-summary">⚠️ Error: ${err.message}</span>`);
        document.querySelectorAll('.kpi-card .h4').forEach(el => el.textContent = 'Error');
        document.querySelectorAll('.filters-section select, .filters-section button').forEach(el => el.disabled = true);
      });
}); // Fin DOMContentLoaded
</script>
</body>
</html>




