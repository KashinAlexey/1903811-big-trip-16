import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { calculateDateDiff } from '../utils/common.js';
import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import { remove } from '../utils/render.js';
import { sortNumber } from '../utils/common.js';
import StatsView from '../views/stats-view.js';
import { TRIP_TYPES } from '../constants.js';

const getCosts = (trips) => {
  const data = {
    labels: [],
    values: [],
  };

  let arr = new Map();

  trips.forEach((trip) => {
    const {type, basePrice} = trip;
    if (arr.has(type)) {
      arr.set(type, arr.get(type) + basePrice);
    } else {
      arr.set(type, basePrice);
    }
  });

  arr = [...arr].sort((typeA, typeB) => sortNumber(typeA[1], typeB[1], 'Up'));

  arr.forEach((item) => {
    data.labels.push(item[0]);
    data.values.push(item[1]);
  });

  TRIP_TYPES.forEach((type) => {
    if (!data.labels.includes(type)) {
      data.labels = [...data.labels, type];
      data.values = [...data.values, 0];
    }
  });

  return data;
};

const getCounts = (trips) => {
  const data = {
    labels: [],
    values: [],
  };

  let arr = new Map();

  trips.forEach((trip) => {
    const {type} = trip;
    if (arr.has(type)) {
      arr.set(type, arr.get(type) + 1);
    } else {
      arr.set(type, 1);
    }
  });

  arr = [...arr].sort((typeA, typeB) => sortNumber(typeA[1], typeB[1], 'Up'));

  arr.forEach((item) => {
    data.labels.push(item[0]);
    data.values.push(item[1]);
  });

  TRIP_TYPES.forEach((type) => {
    if (!data.labels.includes(type)) {
      data.labels = [...data.labels, type];
      data.values = [...data.values, 0];
    }
  });

  return data;
};

const getTimes = (trips) => {
  const data = {
    labels: [],
    values: [],
  };

  let arr = new Map();

  trips.forEach((trip) => {
    const {type, dateFrom, dateTo} = trip;
    if (arr.has(type)) {
      arr.set(type, arr.get(type) + (dateTo - dateFrom));
    } else {
      arr.set(type, (dateTo - dateFrom));
    }
  });

  arr = [...arr].sort((typeA, typeB) => sortNumber(typeA[1], typeB[1], 'Up'));

  arr.forEach((item) => {
    data.labels.push(item[0]);
    data.values.push(item[1]);
  });

  TRIP_TYPES.forEach((type) => {
    if (!data.labels.includes(type)) {
      data.labels = [...data.labels, type];
      data.values = [...data.values, 0];
    }
  });

  return data;
};
export default class StatisticPresenter {
  #tripEventsElement = null;
  #tripsModel = null;
  #statsComponent = null;

  constructor (tripsModel, tripEventsElement) {
    this.#tripsModel = tripsModel;
    this.#tripEventsElement = tripEventsElement;

    this.#statsComponent = new StatsView();
  }

  get trips() {
    return this.#tripsModel.data;
  }

  init = () => {
    render(this.#tripEventsElement, this.#statsComponent, RenderPosition.BEFOREEND);

    const moneyCtx = this.#statsComponent.element.querySelector('#money');
    const typeCtx = this.#statsComponent.element.querySelector('#type');
    const timeCtx = this.#statsComponent.element.querySelector('#time');

    const BAR_HEIGHT = 100;
    moneyCtx.height = BAR_HEIGHT * 5;
    moneyCtx.style = 'padding-left: 450px';
    typeCtx.height = BAR_HEIGHT * 5;
    typeCtx.style = 'padding-left: 450px';
    timeCtx.height = BAR_HEIGHT * 5;
    timeCtx.style = 'padding-left: 450px';

    const ChartTypes = {
      MONEY: [moneyCtx, getCosts, (data) => `€ ${data}`],
      TYPE: [typeCtx, getCounts, (data) => `${data}x`],
      TIME: [timeCtx, getTimes, (data) => `${calculateDateDiff(0, data)}`],
    };

    this.#renderCharts(ChartTypes);
  }

  destroy = () => {
    remove(this.#statsComponent);
  }

  #renderCharts = (ChartTypes) => {
    for (const key in ChartTypes) {
      const [Ctx, callBack, format] = ChartTypes[key];
      this.#renderChart(Ctx, callBack, format, key);
    }
  }

  #renderChart = (Ctx, callBack, format, name) => {
    const {labels, values} = callBack(this.trips);

    return new Chart(Ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 40,
          minBarLength: 50,
        }],
      },
      options: {
        responsive: false,
        plugins: {
          datalabels: {
            font: {
              size: 11,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: format,
          },
        },
        title: {
          display: true,
          text: name,
          fontColor: '#000000',
          fontSize: 15,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 11,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },}
    );
  }
}
