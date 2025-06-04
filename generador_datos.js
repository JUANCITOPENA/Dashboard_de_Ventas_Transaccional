
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

    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2025, 4, 31);
    const numTransactions = Math.floor(50000 + rng() * 50000);

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
        const units = getRandomInt(1, 5);
        const revenue = Math.round(productInfo.price * units * (0.95 + rng() * 0.1)); 
        
        transactions.push({
            date: date.toISOString().split('T')[0],
            monthYear: formatMonthYear(date),
            brand: brandInfo.name,
            os: brandInfo.os,
            model: productInfo.model,
            units,
            revenue,
            channel: getRandomElement(channels),
            country: getRandomElement(countries),
        });
    }

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const jsonPath = path.join(outputDir, 'sales_data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(transactions, null, 2), 'utf8');
    console.log("Archivo JSON generado:", jsonPath);

    const csv = parse(transactions);
    const csvPath = path.join(outputDir, 'sales_data.csv');
    fs.writeFileSync(csvPath, csv, 'utf8');
    console.log("Archivo CSV generado:", csvPath);
}

generateSalesData();
