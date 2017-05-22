'use strict';

var weatherDiv = $('#weather');
var cityButtons = $('li');

function createApi() {
	var api = 'https://api.wunderground.com/api/';
	var apiKey = 'ebeab7a3a8578f14';

	api += apiKey;
	api += '/conditions/q/'

	if($('.selected').text() == 'San Francisco') {
		api += 'CA/San_Francisco.json';
	}
	else if ($('.selected').text() == 'Chicago') {
		api += 'IL/Chicago.json';
	}
	else if ($('.selected').text() == 'Atlanta') {
		api += 'GA/Atlanta.json';
	}
	else if ($('.selected').text() == 'Minneapolis') {
		api += 'MN/Minneapolis.json';
	}
	else {
		api += 'NY/New_York.json';
	}

	return api
}

for(var i = 0; i < cityButtons.length; i++) {
	cityButtons[i].addEventListener('click', function(e) {
		var button = e.target;

		$(weatherDiv).text('');

		if(!$(button).hasClass('selected')) {
			$(cityButtons).removeClass('selected');
			$(button).addClass('selected');
		}
		else {
			$(button).addClass('selected');
		}

		if ($(button).text() == 'San Francisco') {
			$('#mapChicago').css({"visibility": "hidden", "height": "0"});
			$('#mapAtlanta').css({"visibility": "hidden", "height": "0"});
			$('#mapMinneapolis').css({"visibility": "hidden", "height": "0"});
			$('#mapNYC').css({"visibility": "hidden", "height": "0"});
			$('#mapSanFrancisco').css({'visibility': 'visible', "height": "250px"});
		}
		else if ($(button).text() == 'Chicago') {
			$('#mapSanFrancisco').css({"visibility": "hidden", "height": "0", "margin": "0", "padding": "0"});
			$('#mapAtlanta').css({"visibility": "hidden", "height": "0"});
			$('#mapMinneapolis').css({"visibility": "hidden", "height": "0"});
			$('#mapNYC').css({"visibility": "hidden", "height": "0"});
			$('#mapChicago').css({'visibility': 'visible', "height": "250px"});
		}
		else if ($(button).text() == 'Atlanta') {
			$('#mapSanFrancisco').css({"visibility": "hidden", "height": "0", "margin": "0", "padding": "0"});
			$('#mapChicago').css({"visibility": "hidden", "height": "0"});
			$('#mapMinneapolis').css({"visibility": "hidden", "height": "0"});
			$('#mapNYC').css({"visibility": "hidden", "height": "0"});
			$('#mapAtlanta').css({'visibility': 'visible', "height": "250px"});
		}
		else if ($(button).text() == 'Minneapolis') {
			$('#mapSanFrancisco').css({"visibility": "hidden", "height": "0"});
			$('#mapChicago').css({"visibility": "hidden", "height": "0"});
			$('#mapAtlanta').css({"visibility": "hidden", "height": "0"});
			$('#mapNYC').css({"visibility": "hidden", "height": "0"});
			$('#mapMinneapolis').css({'visibility': 'visible', "height": "250px"});
		}
		else {
			$('#mapSanFrancisco').css({"visibility": "hidden", "height": "0"});
			$('#mapChicago').css({"visibility": "hidden", "height": "0"});
			$('#mapAtlanta').css({"visibility": "hidden", "height": "0"});
			$('#mapMinneapolis').css({"visibility": "hidden", "height": "0"});
			$('#mapNYC').css({'visibility': 'visible', "height": "250px"});
		}
		

		$.getJSON(createApi(), function(data) {
			var weatherInfo = data;
			var currentObservations = weatherInfo.current_observation;
			var weatherHtml = '<ul>';

			weatherHtml += '<li>';
			weatherHtml += 'Conditions: ' + currentObservations.weather;
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += 'Current Temp: ' + currentObservations.temp_f + 'F';
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += 'Humidity: ' + currentObservations.relative_humidity;
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += '<a href="';
			weatherHtml += currentObservations.forecast_url + '">';
			weatherHtml += 'Click For More</a>';
			weatherHtml += '</li>';
			weatherHtml += '</ul>';
			weatherHtml += '<img src="';
			weatherHtml += currentObservations.image.url + '">';

			weatherDiv.append(weatherHtml);
		});
	});
}


//Default JSON Call for Weather Observations


$.getJSON(createApi(), function(data) {
			var weatherInfo = data;
			var currentObservations = weatherInfo.current_observation;
			var weatherHtml = '<ul>';

			weatherHtml += '<li>';
			weatherHtml += 'Conditions: ' + currentObservations.weather;
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += 'Current Temp: ' + currentObservations.temp_f + 'F';
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += 'Humidity: ' + currentObservations.relative_humidity;
			weatherHtml += '</li>';
			weatherHtml += '<li>';
			weatherHtml += '<a href="';
			weatherHtml += currentObservations.forecast_url + '">';
			weatherHtml += 'Click For More</a>';
			weatherHtml += '</li>';
			weatherHtml += '</ul>';
			weatherHtml += '<img src="';
			weatherHtml += currentObservations.image.url + '">';

			weatherDiv.append(weatherHtml);
});

/***
MAPS
***/

//San Francisco Map

var mymap = L.map('mapSanFrancisco', {
	minZoom: 11
}).setView([37.787587, -122.406878], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoianZyLXdlYmRldiIsImEiOiJjajFqcm5nNHUwMTU5MzNwYjZhaXpobHN5In0.nuZVUgD4ALg3a54-upP7lg'
 	}).addTo(mymap);

//Chicago Map

var mymap2 = L.map('mapChicago', {
	minZoom: 10
}).setView([41.8581,-87.6298], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoianZyLXdlYmRldiIsImEiOiJjajFqcm5nNHUwMTU5MzNwYjZhaXpobHN5In0.nuZVUgD4ALg3a54-upP7lg'
 	}).addTo(mymap2);

//Atlanta Map

var mymap3 = L.map('mapAtlanta', {
	minZoom: 11
}).setView([33.7490,-84.3880], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoianZyLXdlYmRldiIsImEiOiJjajFqcm5nNHUwMTU5MzNwYjZhaXpobHN5In0.nuZVUgD4ALg3a54-upP7lg'
 	}).addTo(mymap3);

//Minneapolis Map

var mymap4 = L.map('mapMinneapolis', {
	minZoom: 10
}).setView([44.9778,-93.2650], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoianZyLXdlYmRldiIsImEiOiJjajFqcm5nNHUwMTU5MzNwYjZhaXpobHN5In0.nuZVUgD4ALg3a54-upP7lg'
 	}).addTo(mymap4);

//New York City Map

var mymap5 = L.map('mapNYC', {
	minZoom: 9.5
}).setView([40.7128,-74.0059], 9.5);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoianZyLXdlYmRldiIsImEiOiJjajFqcm5nNHUwMTU5MzNwYjZhaXpobHN5In0.nuZVUgD4ALg3a54-upP7lg'
 	}).addTo(mymap5);


var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
var flickrOptions = {
      tags: 'San_Francisco_Skyline',
      format: 'json'
    };
var displayPhotos = function(data) {
      var photohtml = '<ul>';
      $.each(data.items, function(i, photo) {
        console.log(data);
        photohtml += '<li>';
        photohtml += '<a href="' + photo.link + '">';
        photohtml += '<img src="' + photo.media.m + '"></a></li>';
      });
      photohtml += '</ul>';
      $('#photos').html(photohtml);
      
    }// ends callback to display buttons
$.getJSON(flickerAPI, flickrOptions, displayPhotos);



$('li').click(function() {
    $('button').removeClass('selected');
    $(this).addClass('selected');
    var flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
    var city = $(this).text();
    city += '-skyline';
    var flickrOptions = {
      tags: city,
      format: 'json'
    };
    
    var displayPhotos = function(data) {
      var photohtml = '<ul>';
      $.each(data.items, function(i, photo) {
        console.log(data);
        photohtml += '<li>';
        photohtml += '<a href="' + photo.link + '">';
        photohtml += '<img src="' + photo.media.m + '"></a></li>';
      });
      photohtml += '</ul>';
      $('#photos').html(photohtml);
      
    }// ends callback to display buttons
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    
  }); //end button click event
  



















