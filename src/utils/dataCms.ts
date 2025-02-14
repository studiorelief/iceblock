async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.values;
}

async function calculateAverage(data, period, portfolio) {
  data.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

  // Filtrer les données pour le portfolio spécifié
  data = data.filter((row) => row[1] === portfolio);

  // Filtrer les données pour la période spécifiée (1 mois, 3 mois, 12 mois)
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - period);
  data = data.filter((row) => new Date(row[0]) >= cutoffDate);

  // Calculer la valeur moyenne
  const sum = data.reduce((total, row) => total + parseFloat(row[2]), 0);
  const average = sum / data.length;

  // Calculer la valeur moyenne en pourcentage avec 2 chiffres après la virgule
  const averagePercentage = (average * 100).toFixed(2);

  return `${averagePercentage}%`; // Ajouter le symbole de pourcentage
}

async function getDataForPortfolios() {
  const url =
    'https://sheets.googleapis.com/v4/spreadsheets/1VEie24sYE2Mzs7TUHrHZ8QMSSieJQ1-N1nGkML0Ulzs/values/pnl_website_data!A1:C5000?key=AIzaSyDfx3berSA6lDP_UOQjarrvVO-sWr08Jhw';
  const data = await fetchData(url);

  const portfolios = ['🧊 Innovation', '🧊 Vision', '🧊 Dynamic', '🧊 Fundamental (simulated)'];
  const periods = [1, 3, 12];
  const averages = {};

  for (const portfolio of portfolios) {
    for (const period of periods) {
      const key = `${period}-${portfolio}`;
      averages[key] = await calculateAverage(data, period, portfolio);
    }
  }

  return averages;
}

async function updateAverages() {
  const averages = await getDataForPortfolios();
  const divs = document.querySelectorAll('.portfolios_data[data-period][data-portfolio]');

  divs.forEach((div) => {
    const period = div.getAttribute('data-period');
    const portfolio = div.getAttribute('data-portfolio');
    const key = `${period}-${portfolio}`;
    if (averages[key]) {
      div.textContent = averages[key];
    }
  });
}

export { updateAverages };
