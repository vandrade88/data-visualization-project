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
    fetch('/whr/' + year, {
        method:'GET',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'body': JSON.stringify(data)
            // 'body': JSON.parse(form)
        },
    })
//   fetch('http://127.0.0.1:5000', {method:'POST'})
  .then(response => response.json())
  .then(data => {
    console.log(data)

    // var results = JSON.parse(document.getElementById("map_data").dataset.results);
    // console.log(results)

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
        console.log(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${filteredData.length}`);
        layer.bindPopup(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${(filteredData.length +1)}`);
      }
  }
    ).addTo(map);
})
};

// buildMap(2016);

function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildMap(year);
};

d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(year) {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildMap(year);
};

init();


