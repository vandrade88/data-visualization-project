// leaflet map

// popup bind for map (Country Name & Score<hr>Rank)

// fetch('http://127.0.0.1:5000/whr/year/' + year, {method:'POST'})
// .then(response => response.json())
// .then((data) => {
//     console.log(data)

// map.on('load', function() {
//   map.addLayer(
//     {
//       id: 'country-boundaries',
//       source: {
//         type: 'vector',
//         url: 'mapbox://mapbox.country-boundaries-v1',
//       },
//       'source-layer': 'country_boundaries',
//       type: 'fill',
//       paint: {
//         'fill-color': '#d2361e',
//         'fill-opacity': 0.4,
//       },
//     },
//     'country-label'
// )})

// call data from database
function buildMap(year) {
  fetch('http://127.0.0.1:5000/whr/' + year, {method:'POST'})
  .then(response => response.json())
  .then(data => {

    var countryMarkers = [];
    var countryPolygon = [];

    var linked = data.map(item => item.linked);
    var rank = data.map(item => item.rank_2020);
    var score = data.map(item => item.score_2020);
    linked = linked[0];
    rank = rank[0];
    score = score[0];
    var coords = linked.map(item => item.geometry.coordinates)
    var country = linked.map(item => item.properties.ADMIN)
    country = country[0]
    console.log(country)
    console.log(coords)

    // for (var i = 0; i <= coords.length; i++) {
    //   coords.push(parseFloat(coords[1], parseFloat(coords[1])
    // }

    if (linked) {
      countryMarkers.push(
        L.marker([parseFloat(coords[0][1]), parseFloat(coords[0][0])]).bindPopup(`<h5>${country}</h5><hr><strong>Score:</strong> ${score}<br><strong>Rank:</strong> ${rank}/${data.length}`));
      // countryPolygon.push(
      //   L.marker([parseFloat(coords[0][1]), parseFloat(coords[0][0])]));
      }
      // countryMarkers.push(
      //   L.marker(linked[0].geometry.coordinates).bindPopup("<h1>" + linked[0].properties.ADMIN + "</h1>")
      // );
// })
  // loop through all the elements in the cities array
    for (var i = 0; i <= countryMarkers.length; i++) {
      var coords = coords[i];}

    var markerLayer = L.layerGroup(countryMarkers);
    var countryLayer = L.layerGroup(countryPolygon);

    var overlays = {
      Markers: markerLayer,
      Countries: countryLayer
    };

    var worldMap = L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA",
    {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
    });

    var map = L.map("map", {
      center: [30, -25],
      zoom: 3,
      layers: [worldMap, markerLayer, countryLayer]
    });

    worldMap.addTo(map);

    L.control.layers(null, overlays, {
      collapsed: false
    }).addTo(map);

    console.log(countryMarkers)
    console.log(countryPolygon)

    // var countryPolygon = [];

    // for (var i = 0; i < data.length; i++) {
    //   // loop through the cities array, create a new marker, push it to the cityMarkers array
    //   countryPolygon.push(
    //     L.marker(linked[0].geometry.coordinates)
    //   );
    // }

})}

  //   var map_name_whr = [];
  //   var country_whr = data.map(item => item.country);
  //   map_name_whr.push("Finland");
  //   console.log(map_name_whr);

  //   var linked = data.map(item => item.linked);
  //   linked = linked[0];
  //   // console.log(linked);

  //   var map_name_geo = [];
  //   map_name_whr.forEach((item) => {
  //     var chosen = data.filter(item => item.country_geo == "Finland")
  //     var coords = 
  //     map_name_geo.push(chosen);


  
  //   for (var i = 0; i < linked.length; i++) {
  //     var map_coords = [];

  //     coords = linked[0].geometry.coordinates;
  //     map_coords.push(coords);

  //     country_geo = linked[0].properties.ADMIN;
  //     console.log(map_name_geo);
  //     console.log(map_coords)
  //   }
  // })
buildMap(2020);

// function callGeoData(year) {
//   fetch('http://127.0.0.1:5000/whr/' + 2020, {method:'POST'})
//   .then(response => response.json())
//   .then(json => {
//     d3.json(json).then(function(data) {
//       var geojson = L.choropleth(data, {
//         valueProperty: 'score_2020',
//         scale: ['#fee8c8','#fdbb84','#e34a33'], // chroma.js scale - include as many as you like
//         steps: 10, // number of breaks or steps in range
//         mode: 'q', // q for quantile, e for equidistant, k for k-means
//         style: {
//           color: '#fff', // border color
//           weight: 1,
//           fillOpacity: 0.8
//         },
//       }).addTo(map);
//     })
// })}

// callGeoData(2020);

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
