// leaflet map

// popup bind for map (Country Name & Score<hr>Rank)

// fetch('http://127.0.0.1:5000/whr/year/' + year, {method:'POST'})
// .then(response => response.json())
// .then((data) => {
//     console.log(data)

// creating map object
var map = L.map("map", {
    center: [30, -25],
    zoom: 3
  })

L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
  }).addTo(map);

map.on('load', function() {
  map.addLayer(
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
)})
// L.control.layers(baseLayers, overlays).addTo(Map);

// call data from database
function buildMap(year) {
  const url = 'http://127.0.0.1:5000/map/' + year
  fetch(url, {method:'POST'})
  .then(response => response.json())  
  .then(json => {
      console.log(json);
})}

buildMap(2020);

function callGeoData(year) {
  const url = 'http://127.0.0.1:5000/map/' + year
  fetch(url, {method:'POST'})
  .then(response => response.json())  
  .then(data => {
    d3.json(data).then(function(data) {
      console.log(data);
      var geojson = L.choropleth(data, {
        valueProperty: 'score',
        scale: ['#fee8c8','#fdbb84','#e34a33'], // chroma.js scale - include as many as you like
        steps: 10, // number of breaks or steps in range
        mode: 'q', // q for quantile, e for equidistant, k for k-means
        style: {
          color: '#fff', // border color
          weight: 1,
          fillOpacity: 0.8
        },
      }).addTo(map);
    })
})}

callGeoData(2020);

// function callData() {
//   const url = 'http://127.0.0.1:5000/whr/' + year
//   fetch(url, {method:'POST'})
//   .then(response => response.json())  
//   .then(json => {
//       console.log(json);
//       document.getElementById("demo").innerHTML = JSON.stringify(json)
//   })
// }


// d3.json(callData).then(function(data) {
//   console.log(data);
//   var geojson = L.choropleth(data, {
//     valueProperty: 'score',
//     scale: ['#fee8c8','#fdbb84','#e34a33'], // chroma.js scale - include as many as you like
//     steps: 10, // number of breaks or steps in range
//     mode: 'q', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff', // border color
//       weight: 1,
//       fillOpacity: 0.8
//     },
//   }).addTo(map);
// })

  
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
