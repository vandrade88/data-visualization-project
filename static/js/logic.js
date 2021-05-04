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

    var linked = data.map(item => item.linked);
    linked = linked[0];
    console.log(linked);

    linked.forEach(function(item){
      var geom = item.geometry;
      console.log(geom);
      var props = item.properties;
      console.log(props);

      if (geom.type === 'MultiPolygon') {
          for (var i=0; i < geom.coordinates.length; i++){
              var polygon = {
                  'type':'Polygon', 
                  'coordinates':geom.coordinates[i],
                  'properties': props};
              console.log(JSON.stringify(polygon));

              var countryPolygon = [];
              countryPolygon.push(
                L.polygon(polygon.coordinates));
          }
        }
    });

    // var linked = data.map(item => item.linked);
    var geoDataLayer = L.geoJSON(linked)

    var countryMarkers = [];
    var countryPolygon = [];

    // var linked = data.map(item => item.linked);
    var rank = data.map(item => item.rank_2020);
    var score = data.map(item => item.score_2020);
    // linked = linked[0];
    // linked_new = JSON.stringify(linked)
    // console.log(linked)
    // console.log(JSON.stringify(linked));
    rank = rank[0];
    score = score[0];
    // var locations = linked.map(item => item.geometry.coordinates)
    // var locationsNested = locations[i];
    var country = linked.map(item => item.properties.ADMIN)
    // country = country[0]
    // console.log(country)
    // coords = coords[0]
    // console.log(location)

      // for (var i = 0; i < feats.length; i++) {
        // var coordsNew = [];
        // var feat = feats[i];
        // console.log(feat);
        // coordsNew.push([feat['coordinates'][1], feat['coordinates'][0]]);
        // countryPolygon.push(
        //   L.polygon([coordsNew]));
      // }
  //   }
  //  );
  // });

  // for (var i = location.length - 1; i >= 0; i--) {
  //   console.log([location[0], location[1]].reverse())
  // }

        // linked.forEach(function(item) {
        // if (coord) {
        //   countryPolygon.push(
        //     L.polygon([coords, coords]));
        // }
      // }
        // )};

      // locations = [];
      // locations.push(locations);
      // console.log(JSON.stringify(locations));

      // coords = JSON.parse(coords)
      // console.log(coords)

      // var latlng = L.latLng([coords[1], coords[0]]);
      // console.log(latlng)

      countryMarkers.push(
        L.marker([61.9241, 25.7482]).bindPopup(`<h5>${country}</h5><hr><strong>Score:</strong> ${score}<br><strong>Rank:</strong> ${rank}/${data.length}`));
      // countryPolygon.push(
      //   L.polygon([coords, coords]));
    // };

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

    geoDataLayer.addTo(map);
    worldMap.addTo(map);

    // d3.json(linked).then(function(data) {
    //   var chroro = L.choropleth(data, {
    //     valueProperty: 'score_2020',
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

    L.control.layers(null, overlays, {
      collapsed: false
    }).addTo(map);
  })
}


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
