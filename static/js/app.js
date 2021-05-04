// function for Quick Info (Country Name, Score, GDP, Social Support, Health life expectancy..etc

// default settings (map and bar chart for 2021)

// bubble chart or second chart for bottom half of page if time permits

// horizontal bar chart to be called by year selected in dropdown sorted by top 10
function buildBarChart(year) {
    fetch('http://127.0.0.1:5000/whr/' + 2020, {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        // console.log(data)

        var slicedData = data.slice(0,10);

        var reversedData = slicedData.reverse();

        var barTrace = {
            x: reversedData.map(item => item.score_2020),
            y: reversedData.map(item => item.country),
            type: "bar",
            text: reversedData.map(item => item.score_2020),
            orientation: "h",
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
              color: 'rgb(158,202,225)',
              opacity: 0.6,
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }}
            };

        var layout = {
        title: `${year} Top 10 World Happiness Scores`,
        barmode: 'stack'
        };

        var data = [barTrace];

        Plotly.newPlot("bar", data, layout);
    })
};

// // display individual's demographic data
// function buildMetaData(sampleNumber) {
//     d3.json("./samples.json").then((data) => {
//         var metadata = data.metadata;
//         var sampleSelected = metadata.filter(item => item.id == sampleNumber);
//         sampleSelected = sampleSelected[0]; 
//         // display key-value pairs from metadata JSON object
//         var metadata_object = d3.select("#sample-metadata");
//         metadata_object.html("");
//         Object.entries(sampleSelected).forEach(([key, value]) => {
//             metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
//         })
//     })
// };

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
// var year = 2020;

// call data from database
function buildMap(year) {
  fetch('http://127.0.0.1:5000/whr/' + year, {method:'POST'})
  .then(response => response.json())
  .then(data => {

  var country = data.map(item => item.country);
  var rank = data.map(item => item.rank_2020);
  var score = data.map(item => item.score_2020);
  var linked = data.map(item => item.linked);
  linked = linked[0];
  // country = country[0];
  // score = score[0];
  // rank = rank[0];

  console.log(data);
  console.log(linked);
  console.log(country);

  var geoDataLayer = L.geoJSON(linked, {
    // style: function (feature) {
    //   return {color: feature.properties.color};
    // },
    onEachFeature: function (feature, layer) {
      for (var v=0; v < linked.length; v++) {
        layer.bindPopup(`<h5>${country[v]}</h5><hr><strong>Score:</strong> ${score[v]}<br><strong>Rank:</strong> ${rank[v]}/${data.length}`)
      }
    }
  });
  // geoDataLayer.addData(data);

  linked.forEach(function(item){
    for (var a=0; a < linked.length; a++) {
      linked = linked[a];
      var geom = item.geometry;
      console.log(geom);
      var props = item.properties;
      console.log(props);
    }

    if (geom.type === 'MultiPolygon') {
      for (var i=0; i < geom.coordinates.length; i++){
        var countryPolygon = [];
        var polygon = {
            'type':'Polygon', 
            'coordinates': geom.coordinates[i],
            'properties': props};
        // console.log(JSON.stringify(polygon));
        countryPolygon.push(polygon.coordinates);
        // console.log(polygon.coordinates);
    }}

    // if (year === 2020) {
      // for (var x=0; x < country.length; x++){
      //   var countries = [];
      //   var ranks = [];
      //   var scores = [];
      //   var info = {
      //     'country': country.country,
      //     'rank_2020': country.rank_2020,
      //     'score_2020': country.score_2020};
      //   countries.push(info.country);
      //   ranks.push(info.rank_2020);
      //   scores.push(info.score_2020)
      //   console.log(info.country)
      //   console.log(info.rank_2020)
      //   console.log(info.score_2020)
      //   }
    // }
    
    // countryPolygon.push(
    //   L.polygon(polygon.coordinates).bindPopup(`<h5>${country[i]}</h5><hr><strong>Score:</strong> ${score[i]}<br><strong>Rank:</strong> ${rank[i]}/${data.length}`));

    // var countryLayer = L.layerGroup(countryPolygon);
    // var overlays = {
      // Markers: markerLayer,
    //   Countries: countryLayer
    // };
    // geoDataLayer.addData(countryLayer);
  
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
        layers: worldMap
        // layers: [worldMap, countryLayer]
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
  
      L.control.layers(
        // null, overlays,
        //   {collapsed: false}
          ).addTo(map);
        })
      })
};
  
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

// init function
function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    // var data = [];

    fetch('http://127.0.0.1:5000/whr/2020', {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        // console.log(data)
        buildBarChart(2020);
        buildMap(2020);
    })
};
// create event handler call optionChanged when new drop down item is selected
d3.selectAll("#selDataset").on("change", optionChanged);
// optionChanged: update all plots when dropdown option is selected
function optionChanged(year) {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildBarChart(year);
    buildMap(year);
};

init();