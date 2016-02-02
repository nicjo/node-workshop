Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}
var request = require('request');

var prompt = require('prompt');

prompt.start();

prompt.get(['location'], function(err, result) {
  var userLocation = result


  request('https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation.location, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var userPosition = JSON.parse(body);
      var lat1 = userPosition.results[0].geometry.location.lat;
      var lon1 = userPosition.results[0].geometry.location.lng;


      request('http://api.open-notify.org/iss-now.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var issInfo = JSON.parse(body);
          var lat2 = issInfo.iss_position.latitude;
          var lon2 = issInfo.iss_position.longitude
          
          
         function LatLon(lat, lon) {
            // allow instantiation without 'new'
            if (!(this instanceof LatLon)) return new LatLon(lat, lon);

            this.lat = Number(lat);
            this.lon = Number(lon);
          }

          /**
           * Returns the distance from 'this' point to destination point (using haversine formula).
           *
           * @param   {LatLon} point - Latitude/longitude of destination point.
           * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
           * @returns {number} Distance between this point and destination point, in same units as radius.
           *
           * @example
           *     var p1 = new LatLon(52.205, 0.119), p2 = new LatLon(48.857, 2.351);
           *     var d = p1.distanceTo(p2); // Number(d.toPrecision(4)): 404300
           */
          LatLon.prototype.distanceTo = function(point, radius) {
            if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
            radius = (radius === undefined) ? 6371e3 : Number(radius);

            var R = radius;
            var φ1 = this.lat.toRadians(),
              λ1 = this.lon.toRadians();
            var φ2 = point.lat.toRadians(),
              λ2 = point.lon.toRadians();
            var Δφ = φ2 - φ1;
            var Δλ = λ2 - λ1;

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            return d;
          };


          var p1 = new LatLon(lat1, lon1), p2 = new LatLon(lat2, lon2);
          
          var d = p1.distanceTo(p2);
          
           console.log("you are " + d / 1000 + "km" + " away from the ISS")
        }
      });

    }
  });

});

console.log('Codrin is the best')

console.log('JavaScript never waits!')