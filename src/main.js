import MainPresenter from './presenter/main-presenter.js';
import { generateTrip } from '../src/mock/trip.js';
import { TRIP_COUNT } from './constants.js';
import DataModel from './model/data-model.js';

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const dataModel = new DataModel();
dataModel.data = trips;

const mainPresenter = new MainPresenter(dataModel);
mainPresenter.init();
