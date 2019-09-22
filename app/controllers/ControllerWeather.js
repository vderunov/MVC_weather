import { ModelWeather } from '../models/ModelWeather.js';
import { ViewWeather } from '../views/ViewWeather.js';

export class ControllerWeather {
  constructor() {
    this.model = new ModelWeather(this);
    this.view = new ViewWeather(this);
    this.actionGetWeather();
  }

  getCity() {
    this.inputValue = document.querySelector('.form-control').value;
    this.model.getWeather(this.inputValue);
    this.model.getCoords(this.inputValue);
  }

  actionGetWeather() {
    this.model.getWeather();
    this.model.initAutocomplete();
  }

  getWeather(weather) {
    this.view.render(weather);
    this.model.initAutocomplete();
  }

  getCoords() {
    this.model.initAutocomplete();
  }
}
