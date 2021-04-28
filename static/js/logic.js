var API_KEY = "pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA";

// leaflet map

// popup bind for map (Country Name & Score<hr>Rank)

// fetch('http://127.0.0.1:5000/whr/year/' + year, {method:'POST'})
// .then(response => response.json())
// .then((data) => {
//     console.log(data)

// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 1
  });

  // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// }).addTo(myMap);

L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Load in GeoJson data
var geoData = "/../data/countries_geo.json";

myMap.on('load', function() {
  myMap.addLayer(
    {
      id: 'country-boundaries',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      },
      'source-layer': 'country_boundaries',
      type: 'fill',
      paint: {
        'fill-color': '#d2361e',
        'fill-opacity': 0.4,
      },
    },
    'country-label'
  );
});

// L.control.layers(baseLayers, overlays).addTo(myMap);


// L.control.scale({
//   maxWidth: 50}
//   ).addTo(myMap);

//   map.on('load', function () {
//     myMap.resize();
// });
  
  // TODO:
  
  // // Grab data with d3
  // d3.json(geoData).then(function(data) {
  //   // Create a new choropleth layer
  //   console.log(data);
  //   var geojson = L.choropleth(data, {
  
  //     // Define what  property in the features to use
  //     valueProperty: 'MHI2016', // which property in the features to use to determine color intensity/pattern
  
  //     // Set color scale
  //     scale: ['#fee8c8','#fdbb84','#e34a33'], // chroma.js scale - include as many as you like
  
  //     // Number of breaks in step range
  //     steps: 10, // number of breaks or steps in range
  
  //     // q for quartile, e for equidistant, k for k-means
  //     mode: 'q', // q for quantile, e for equidistant, k for k-means
  //     style: {
  //       color: '#fff', // border color
  //       weight: 1,
  //       fillOpacity: 0.8
  //     },
      
  //     // Binding a pop-up to each layer
  //     onEachFeature: function(feature, layer) {
  //       layer.bindPopup(`${feature.properties.ADMIN}<hr>Happiness Score:${feature.properties.ADMIN}`)
  
  //     }
  //   }).addTo(myMap);
  
  //   // Set up the legend
  //   var legend = L.control({ position: 'bottomleft' })
  //   legend.onAdd = function (map) {
  //     var div = L.DomUtil.create('div', 'info legend')
  //     var limits = geojson.options.limits
  //     var colors = geojson.options.colors
  //     var labels = []
  
  //     // Add min & max
  //     div.innerHTML = '<h1>Median Income</h1>' + '<div class="labels"><div class="min">' + limits[0] + '</div> \
  //             <div class="max">' + limits[limits.length - 1] + '</div></div>'
  
  //     limits.forEach(function (limit, index) {
  //       labels.push('<li style="background-color: ' + colors[index] + '"></li>')
  //     })
  
  //     div.innerHTML += '<ul>' + labels.join('') + '</ul>'
  //     return div
  //   }
  //     // Adding legend to the map
  //   legend.addTo(myMap);
  // })
