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
   ```
Paso 2.2: Estilos CSS (style.css) 💅
Crea un archivo style.css en la misma carpeta que index.html y pega los siguientes estilos:

```css
/* style.css */
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.kpi-row { 
  display: flex; 
  gap: 1rem; 
  margin-bottom: 1rem; 
  flex-wrap: wrap; 
}
.kpi-card { 
  flex: 1 1 200px; /* Permite que crezcan pero con base de 200px */
  background: white; 
  border-radius: 8px; 
  padding: 1.25rem 1rem; /* Más padding vertical */
  text-align: center; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.08); 
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.kpi-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.12);
}
.kpi-card i { 
  font-size: 2.2rem; /* Iconos un poco más grandes */
  margin-bottom: .75rem; 
}
.kpi-card .h5 {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.25rem;
}
.kpi-card .h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

/* Estilos para la sección de Filtros */
.filters-section {
  background: white;
  padding: 1.25rem; /* Más padding */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem; /* Más separación */
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Espacio entre grupos de filtros */
  align-items: flex-end; 
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem; /* Espacio entre label y select */
  min-width: 180px; 
  flex: 1 1 180px; /* Permite que los filtros se distribuyan */
}
.filter-group label {
  font-size: 0.8rem;
  font-weight: 600; /* Label más prominente */
  color: #444;
  margin-bottom: 0.1rem;
}
.filter-group select, .filter-group input {
  padding: 0.45rem 0.85rem; /* Padding más cómodo */
  font-size: 0.9rem;
  border-radius: 0.3rem;
  border: 1px solid #ced4da;
  box-sizing: border-box;
}
.filter-group select:focus, .filter-group input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
}
.filter-group button {
    padding: 0.48rem 1rem; 
    height: auto; /* Dejar que el contenido defina la altura */
    font-weight: 500;
}

.charts-grid { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem; /* Más separación entre filas de gráficos */
}
.chart-row { 
  display: flex; 
  gap: 1.5rem; /* Más separación entre gráficos en una fila */
  flex-wrap: wrap; 
}
.chart-container { 
  background: white; 
  border-radius: 8px; 
  padding: 1.25rem;
  flex: 1 1 300px; /* Permite que crezcan con base de 300px */
  box-shadow: 0 2px 4px rgba(0,0,0,0.08); 
  min-width: 320px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}
.chart-container h5 {
    margin-bottom: 1rem; /* Espacio después del título del gráfico */
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
}
.chart-container > div:first-of-type { /* El div del gráfico ApexCharts */
   min-height: 210px; 
   flex-grow: 1; 
}
.chart-summary {
  font-size: 0.85rem; /* Un poco más grande */
  color: #555;
  margin-top: 12px; 
  padding: 10px; 
  background-color: #f8f9fa; /* Color de fondo ligeramente diferente */
  border-radius: 6px; /* Bordes más redondeados */
  text-align: center;
  border: 1px solid #e9ecef; /* Borde más sutil */
  line-height: 1.6; 
  min-height: 3.8em; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-highlight-green { color: #198754; font-weight: bold; } /* Bootstrap success color */
.text-highlight-blue { color: #0d6efd; font-weight: bold; } /* Bootstrap primary color */
.text-highlight-orange { color: #fd7e14; font-weight: bold; } /* Bootstrap orange */
.text-highlight-red { color: #dc3545; font-weight: bold; } /* Bootstrap danger color */
.no-data-summary { font-style: italic; color: #6c757d; } /* Bootstrap secondary color */

footer { 
  text-align: center; 
  font-size: .9rem; 
  color: #6c757d; 
  margin-top: 2.5rem; 
  padding-bottom: 1.5rem; 
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
    font-size: 0.8rem; 
  }
   .filter-group {
        min-width: calc(50% - 0.5rem); 
    }
}
@media (max-width: 576px) {
    .dashboard-header h1 {
        font-size: 1.5rem; /* Ajustar tamaño de título principal en móviles */
    }
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

---

Paso 2.3: Lógica Principal en JavaScript (script.js) 🧠
Crea un archivo script.js en la misma carpeta. Este es el motor del dashboard. Pega el código JavaScript completo que te proporcioné en la respuesta anterior (la que comienza con document.addEventListener('DOMContentLoaded', () => { ...); es el código que ya incluye processTransactions, la lógica de filtros actualizada y updateDashboard.)
Asegúrate de copiar todo el bloque <script>...</script> de esa respuesta y ponerlo en tu archivo script.js. (Para mantener este manual conciso, no repetiré ese bloque de JavaScript aquí, pero es el de la respuesta anterior marcada como "¡Excelente!").
🚀 Parte 3: Ejecutar y Probar el Dashboard
Asegúrate de tener los 3 archivos principales en la misma carpeta:
index.html
style.css
script.js
Y, lo más importante, sales_data.json (el que copiaste desde la carpeta output después de ejecutar generador_datos.js).
Abre index.html en tu navegador web: Simplemente haz doble clic en el archivo index.html o arrástralo a una ventana de tu navegador (Chrome, Firefox, Edge, etc.).
¡Explora!
Deberías ver el dashboard cargado con los datos iniciales.
Prueba los diferentes filtros (Mes Inicio/Fin, Marca, Producto, País, Canal).
Observa cómo los KPIs, los gráficos y los resúmenes ejecutivos se actualizan dinámicamente.
Usa el botón "Limpiar Filtros" para volver al estado original.
Abre la consola de desarrollador de tu navegador (usualmente F12) para ver los mensajes de console.log si algo no funciona como esperas o si quieres ver el flujo de datos.
🔮 Próximos Pasos y Mejoras (Opcional)
¡Felicidades por llegar hasta aquí! Ahora tienes un dashboard funcional. Aquí hay algunas ideas para llevarlo al siguiente nivel:
Mejorar el Diseño: Experimenta más con CSS, usa colores de marca, diferentes fuentes, etc.
Más Tipos de Gráficos: ApexCharts ofrece muchos tipos de gráficos. Podrías añadir un gráfico de dispersión, un mapa de calor (si los datos lo permiten), etc.
Filtros Dependientes: Hacer que el filtro de "Producto" se actualice para mostrar solo productos de la "Marca" seleccionada.
Guardar Estado de Filtros: Usar localStorage para que los filtros seleccionados se recuerden si el usuario recarga la página.
Optimización: Para conjuntos de datos muy grandes, el procesamiento en el lado del cliente podría volverse lento. Para producción con grandes volúmenes, se consideraría procesar/agregar datos en un backend.
Exportar Gráficos/Datos: ApexCharts tiene opciones para exportar gráficos como imágenes. Podrías añadir botones para exportar los datos filtrados a CSV.
Desplegarlo: Sube tu proyecto a GitHub Pages, Netlify, Vercel u otro servicio de hosting estático para compartirlo.
¡Espero que este manual te sea de gran utilidad! Disfruta construyendo y personalizando tu dashboard de ventas. Si tienes alguna pregunta o te atascas, no dudes en consultar la documentación de las tecnologías utilizadas o buscar ayuda en comunidades online. ¡Feliz codificación! 👨‍💻👩‍💻

