// function for Quick Info (Country Name, Score, GDP, Social Support, Health life expectancy..etc

// default settings (map and bar chart for 2021)

// bubble chart or second chart for bottom half of page if time permits

// horizontal bar chart to be called by year selected in dropdown sorted by top 10
function buildBarChart(year) {
    fetch('http://127.0.0.1:5000/whr/' + year, {method:'GET'})
    .then(response => response.json())
    .then((data) => {
        // console.log(data)

        var slicedData = data.slice(0,10);
        // console.log(slicedData)

        var reversedData = slicedData.reverse();
        // console.log(reversedData)

        var barTrace = {
            x: reversedData.map(item => parseFloat(item.score).toFixed(2)),
            y: reversedData.map(item => item.countryName),
            type: "bar",
            text: reversedData.map(item => parseFloat(item.score).toFixed(2)),
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

var worldMap = L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA",
{
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
});

var map = L.map("map", {
  center: [50, -25],
  zoom: 2,
  layers: worldMap
  // layers: [worldMap, countryLayer]
});

// geoDataLayer.addTo(map);
worldMap.addTo(map);

L.control.layers(
  // null, overlays,
  //   {collapsed: false}
    ).addTo(map);


// call data from database
function buildMap(year) {
  fetch('http://127.0.0.1:5000/whr/' + year, {method:'GET'})
  .then(response => response.json())
  .then(data => {
    console.log(data)

    var filteredData = data.filter(item => item.countryName != false); 
  
    console.log(filteredData)

    var country = filteredData.map(item => item.countryName);
    console.log(country)
    var rank = filteredData.map(item => item.rank);
    console.log(rank)
    var score = filteredData.map(item => item.score);
    console.log(score)

    function getColor(d) {
      return d > 10 ? '#E31A1C' :
              d > 6.4  ? '#FC4E2A' :
              d > 5  ? '#FEB24C' :
              d > 4  ? '#FED976' :
                        '#FFEDA0';
  }

    function style(feature) {
      return {
          fillColor: getColor(parseFloat(feature.score)),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }
  
  var geoDataLayer = 
  L.geoJson(filteredData, {
    style: style,
    onEachFeature: function(feature, layer) {
          layer.bindPopup(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${filteredData.length}`);
      }
  }
    ).addTo(map);

    // var myLayers = geoDataLayer.getLayers();
    
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
  })
};

// init function
function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    // var data = [];

    fetch('http://127.0.0.1:5000/whr/' + year, {method:'GET'})
    .then(response => response.json())
    .then((data) => {
        // console.log(data)
        buildBarChart(year);
        buildMap(year);
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