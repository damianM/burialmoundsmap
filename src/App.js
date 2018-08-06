import React, { Component } from 'react';
import AllLocations from './AllLocations';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'alllocations': [
        {
          'name': "Kopiec Kościuszki",
          'type': "Monument",
          'latitude': 50.054456,
          'longitude': 19.894597
        },
        {
          'name': "Zamek Krolewski na Wawelu",
          'type': "Castle",
          'latitude': 50.054242,
          'longitude': 19.935042
        },
        {
          'name': "Kopiec Kraka",
          'type': "Monument",
          'latitude': 50.038739,
          'longitude': 19.958508
        },
        {
          'name': "Kopiec Józefa Piłsudskiego",
          'type': "Monument",
          'latitude': 50.062029,
          'longitude': 19.8452263
        },
        {
          'name': "Kopiec Wandy",
          'type': "Monument",
          'latitude': 50.070231,
          'longitude': 20.0659003
        }
      ],
      'map': '',
      'infoWindow': '',
      'markerX': ''
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHg-9aLCKW1W_xTBi0W1Y3t-D6vVT2Kjc&callback=initMap')
    // Global function for Google map error handling
    window.gm_authFailure = this.gm_authFailure;
  }

  // Global function for Google map error handling
  gm_authFailure() {
  window.alert("Google Maps failed to Load"); 
  }

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      'markerX': marker
    });
    this.state.infowindow.setContent('Loading...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
  }

  getMarkerInfo(marker) {
    var self = this;
    var clientId = "OHNKTJQFJQ2GEYEKI1KLZUE3F3MVQCRUCP11BMB4WSABJEW0";
    var clientSecret = "RZRDJKXKYBKIQJBH1OGDAKCXMOE1FVUGW2A4ZX52ICV44JWZ";
    var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180323&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    fetch(url)
      .then(
        function (response) {
          if (response.status !== 200) {
            self.state.infowindow.setContent("No data");
            return;
          }
          response.json().then(function (data) {
            var locData = data.response.venues[0];
            var textDATA = '<b>DATA FROM FOURSQUARE</b><br>';
            var locName = '<b>Name: </b>' + locData.name + '<br>';
            var locAddress = '<b>Address: </b>' + locData.location.formattedAddress + '<br>';
            var locVerified = '<b>Is verified: </b>' + locData.verified + '<br>';
            var findMore = '<a href="https://foursquare.com/v/' + locData.id + '" target="_blank">Find more on Foursquare</a>'
            self.state.infowindow.setContent(textDATA + locName + locAddress + locVerified + findMore);
          });
        }
      )
      .catch(function (err) {
        self.state.infowindow.setContent("No data");
      });
  }

  closeInfoWindow() {
    if (this.state.markerX) {
      this.state.markerX.setAnimation(null);
    }
    this.setState({
      'markerX': ''
    });
    this.state.infowindow.close();
  }

  initMap() {
    var self = this;
    var mapview = document.getElementById('map');
    mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: {
        lat: 50.049683, lng: 19.944544
      },
      zoom: 12,
      mapTypeId: 'hybrid',
      mapTypeControl: false
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
      self.closeInfoWindow();
    });

    this.setState({
      'map': map,
      'infowindow': InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function () {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, 'click', function () {
      self.closeInfoWindow();
    });

    var alllocations = [];
    this.state.alllocations.forEach(function (location) {
      var longname = location.name + ' - ' + location.type;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.latitude, location.longitude),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener('click', function () {
        self.openInfoWindow(marker);
      });

      location.longname = longname;
      location.marker = marker;
      location.display = true;
      alllocations.push(location);
    });
    this.setState({
      'alllocations': alllocations
    });
  } 

  render() {
      return (
        <div>
          <AllLocations key="100" alllocations={this.state.alllocations} openInfoWindow={this.openInfoWindow}
            closeInfoWindow={this.closeInfoWindow} />
          <div id="map"></div>
        </div>
      );
    }
  }

export default App;

function loadMapJS(src) {
 var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function () {
    document.write("There was an error while loading the Google Maps scripts. Please try again later");
  };
  ref.parentNode.insertBefore(script, ref);
}