import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Chart JS example

  // Chart 1
  const ctx1 = document.querySelector<HTMLCanvasElement>('[data-element=chart-1]');
  if (!ctx1) return;
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Chart 2
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element=chart-2]');
  if (!ctx2) return;

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map((row) => row.count),
        },
      ],
    },
  });

  // Chart 3
  const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element=chart-3]');
  if (!ctx3) return;
  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
