export class ModelWeather {
  constructor(contr) {
    this.controller = contr;
    this.link = 'https://api.openweathermap.org/data/2.5/weather?q=';
    this.api = 'APPID=cc6eb1dd89b9dbb84bb005d55fc16bab';
    this.weather = {};
    this.coords = {};
  }

  getWeather(city = 'Dnipro') {
    fetch(`${this.link}${city}&${this.api}&units=metric`)
      .then(response => response.json())
      .then(response => {
        this.weather.city = response.name;
        this.weather.temp = response.main.temp;
        this.weather.humidity = response.main.humidity;
        this.weather.pressure = Math.round(
          response.main.pressure * 0.00750063755419211 * 100
        );
        this.weather.visibility = response.visibility / 1000;
        this.weather.pic = response.weather[0].icon;
        this.controller.getWeather(this.weather);
      });
  }

  getCoords(city) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAYcJzlJq1kTiPSXkYssBEH3I1qGZuilR4`
    )
      .then(response => response.json())
      .then(response => {
        this.coords.lat = response.results[0].geometry.location.lat;
        this.coords.lng = response.results[0].geometry.location.lng;
        this.controller.getCoords();
      });
  }

  initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.coords.lat || 48.458119,
        lng: this.coords.lng || 35.059807
      },
      zoom: 11,
      mapTypeId: 'roadmap'
    });

    var softserv = {
      lat: this.coords.lat || 48.458119,
      lng: this.coords.lng || 35.059807
    };

    var marker = new google.maps.Marker({
      position: softserv,
      map: map
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');

    var searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}
