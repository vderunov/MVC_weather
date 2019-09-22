export class ViewWeather {
  constructor(contr) {
    this.controller = contr;
    this.root = document.querySelector('.root');
    this.btn = document
      .querySelector('.btn')
      .addEventListener('click', this.controller.getCity.bind(this.controller));
  }

  render(weather) {
    this.root.innerHTML = ` <ul class="card" style="width: 18rem;">
    <img src="https://picsum.photos/200" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">City:<b>&nbsp${weather.city} 
      <img src="https://openweathermap.org/img/w/${weather.pic}.png"
      </h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Humidity:<b>&nbsp${weather.humidity}%</li>
      <li class="list-group-item">Pressure:<b>&nbsp${weather.pressure}</li>
      <li class="list-group-item">Temp:<b>&nbsp${weather.temp}&#176C</li>
      <li class="list-group-item">Visibility:<b>&nbsp${weather.visibility}km</li>
    </ul>
  </ul>`;
  }
}
