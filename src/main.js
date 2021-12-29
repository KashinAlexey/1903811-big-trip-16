import MainPresenter from './presenter/main-presenter.js';
import { generateTrip } from '../src/mock/trip.js';
import { TRIP_COUNT } from './constants.js';
import DataModel from './model/data-model.js';
import FilterModel from './model/filter-model.js';

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const dataModel = new DataModel();
dataModel.data = trips;

const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(dataModel, filterModel);
mainPresenter.init();
