
// --- Funciones de utilidad ---
document.getElementById('currentYear').textContent = new Date().getFullYear();
const formatCurrency = val => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
const formatNumber = val => new Intl.NumberFormat("es-US", { maximumFractionDigits: 0 }).format(val);

let allTransactions = []; // Almacenará todas las transacciones originales
let charts = {}; 

const commonChartOptionsBase = {
    dataLabels: { enabled: false },
    legend: { 
        position: 'bottom', horizontalAlign: 'center', offsetY: 5, 
        itemMargin: { horizontal: 5, vertical: 2 },
        markers: { width: 10, height: 20 }, fontSize: '11px' 
    },
    chart: { 
        height: 200, 
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
            rotate: -5,
            trim: true,
            hideOverlappingLabels: true
        }
    },
    noData: { // Mensaje para cuando no hay datos en un gráfico
        text: 'Sin datos para mostrar con los filtros actuales.',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#666666",
          fontSize: '14px',
          fontFamily: undefined
        }
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
        if (selectId === "filterMonthStart" || selectId === "filterMonthEnd") allText = "N/A"; // No tiene sentido "Todos" para rango
        else if (selectId === "filterBrand") allText = "Todas las Marcas";
        else if (selectId === "filterProduct") allText = "Todos los Productos";
        else if (selectId === "filterCountry") allText = "Todos los Países";
        else if (selectId === "filterChannel") allText = "Todos los Canales";
        allOption.textContent = allText;
        selectElement.appendChild(allOption);
    }
    optionsArray.forEach(optionData => {
        const opt = document.createElement('option');
        opt.value = valueKey ? optionData[valueKey] : optionData;
        opt.textContent = textKey ? optionData[textKey] : optionData;
        selectElement.appendChild(opt);
    });
}

function initializeFilters(transactions) {
    if (!transactions || transactions.length === 0) { 
        console.warn("initializeFilters: No hay transacciones para inicializar filtros."); 
        // Deshabilitar filtros si no hay datos
        document.querySelectorAll('.filters-section select, .filters-section button').forEach(el => el.disabled = true);
        return; 
    }

    const uniqueMonths = [...new Set(transactions.map(t => t.monthYear))].sort((a, b) => new Date(a) - new Date(b));
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
        monthlyData: {}, // { 'Jan 2024': { month: 'Jan 2024', androidUnits: 0, ... }}
        revenueByChannel: {},
        revenueByCountry: {},
        salesByBrand: {}, // { 'Samsung': { units: 0, revenue: 0 }}
        productPerformance: {} // { 'Galaxy S25': { revenue: 0, units: 0 }}
    };

    transactionsToProcess.forEach(t => {
        // KPIs
        processed.kpis.totalRevenue += t.revenue;
        if (t.os === 'Android') processed.kpis.androidRevenue += t.revenue;
        if (t.os === 'iOS') processed.kpis.iosRevenue += t.revenue;

        // Monthly Data
        if (!processed.monthlyData[t.monthYear]) {
            processed.monthlyData[t.monthYear] = { month: t.monthYear, androidUnits: 0, iosUnits: 0, androidRevenue: 0, iosRevenue: 0 };
        }
        if (t.os === 'Android') {
            processed.monthlyData[t.monthYear].androidUnits += t.units;
            processed.monthlyData[t.monthYear].androidRevenue += t.revenue;
        } else if (t.os === 'iOS') {
            processed.monthlyData[t.monthYear].iosUnits += t.units;
            processed.monthlyData[t.monthYear].iosRevenue += t.revenue;
        }

        // Revenue by Channel
        processed.revenueByChannel[t.channel] = (processed.revenueByChannel[t.channel] || 0) + t.revenue;
        // Revenue by Country
        processed.revenueByCountry[t.country] = (processed.revenueByCountry[t.country] || 0) + t.revenue;
        
        // Sales by Brand
        if (!processed.salesByBrand[t.brand]) processed.salesByBrand[t.brand] = { units: 0, revenue: 0 };
        processed.salesByBrand[t.brand].units += t.units;
        processed.salesByBrand[t.brand].revenue += t.revenue;

        // Product Performance
        if (!processed.productPerformance[t.model]) processed.productPerformance[t.model] = { revenue: 0, units: 0, brand: t.brand };
        processed.productPerformance[t.model].revenue += t.revenue;
        processed.productPerformance[t.model].units += t.units;
    });

    // Convertir monthlyData de objeto a array ordenado
    processed.monthlyData = Object.values(processed.monthlyData).sort((a,b) => new Date(a.month) - new Date(b.month));
    
    // Obtener top 10 productos
    processed.top10Products = Object.entries(processed.productPerformance)
        .map(([model, data]) => ({ model, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

    return processed;
}


function applyFilters() {
    if (!allTransactions || allTransactions.length === 0) {
        console.warn("applyFilters llamado sin transacciones base.");
        // Podríamos mostrar un dashboard completamente vacío
        updateDashboard(processTransactions([])); // Llama con array vacío para limpiar
        return;
    }
    console.log("Aplicando filtros...");

    const selectedMonthStart = document.getElementById('filterMonthStart').value;
    const selectedMonthEnd = document.getElementById('filterMonthEnd').value;
    const selectedBrand = document.getElementById('filterBrand').value;
    const selectedProductModel = document.getElementById('filterProduct').value;
    const selectedCountry = document.getElementById('filterCountry').value;
    const selectedChannel = document.getElementById('filterChannel').value;

    const dateMonthStart = selectedMonthStart ? new Date(selectedMonthStart) : null;
    const dateMonthEnd = selectedMonthEnd ? new Date(selectedMonthEnd) : null;
    if(dateMonthEnd) dateMonthEnd.setMonth(dateMonthEnd.getMonth() + 1, 0); // Ir al último día de ese mes

    let filteredTransactions = allTransactions.filter(t => {
        const transactionDate = new Date(t.date); // Asumiendo que t.date es 'YYYY-MM-DD'
        
        if (dateMonthStart && transactionDate < dateMonthStart) return false;
        if (dateMonthEnd && transactionDate > dateMonthEnd) return false;
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
    console.log("Actualizando dashboard con:", data);
    if (!data || !data.kpis) {
        console.error("UpdateDashboard: Faltan datos o data.kpis.");
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
    const topProductsData = data.top10Products || []; // Ya está procesado y ordenado
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
    console.log("Fetch - Respuesta del servidor:", res.status, res.statusText);
    if (!res.ok) {
      throw new Error(`Error al cargar sales_data.json: ${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then(transactions => { // Ahora 'data' es el array de transacciones
    console.log("Fetch - Transacciones cargadas:", transactions.length);
    if (!Array.isArray(transactions)) {
        throw new Error("El archivo JSON no contiene un array de transacciones.");
    }
    allTransactions = transactions; // Guardar todas las transacciones originales
    
    initializeFilters(allTransactions); // Inicializar filtros con todas las opciones posibles
    console.log("Filtros inicializados.");
    
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

    // Procesar los datos iniciales y actualizar el dashboard
    const initialAggregatedData = processTransactions(allTransactions);
    updateDashboard(initialAggregatedData); 
    console.log("Dashboard actualizado con datos originales agregados.");
    
    // Event Listeners
    document.getElementById('filterMonthStart').addEventListener('change', applyFilters);
    document.getElementById('filterMonthEnd').addEventListener('change', applyFilters);
    document.getElementById('filterBrand').addEventListener('change', applyFilters);
    document.getElementById('filterProduct').addEventListener('change', applyFilters);
    document.getElementById('filterCountry').addEventListener('change', applyFilters);
    document.getElementById('filterChannel').addEventListener('change', applyFilters);
    
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
        applyFilters(); // Esto recalculará y actualizará con todos los datos originales
    });

  })
  .catch(err => {
    console.error("Error fatal en el proceso de carga:", err);
    document.querySelectorAll('.chart-summary').forEach(div => div.innerHTML = `<span class="no-data-summary">⚠️ Error: ${err.message}</span>`);
    document.querySelectorAll('.kpi-card .h4').forEach(el => el.textContent = 'Error');
    document.querySelectorAll('.filters-section select, .filters-section button').forEach(el => el.disabled = true);
  });