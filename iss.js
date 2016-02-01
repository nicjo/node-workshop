var request = require('request');
request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var issInfo = JSON.parse(body);
        console.log("the ISS position is: " + Math.round(issInfo.iss_position.latitude * 100) / 100 + " latitude and " + Math.round(issInfo.iss_position.longitude * 100) / 100 + " longitude");
  }
})

