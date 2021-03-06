function createMap(countryData) {

  // define layers
  var monomap = L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA",
  {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
  });

  var worldmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    // id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Monochromatic Map": monomap,
    "World Map": worldmap
  };

  var overlayMaps = {
    "World Happiness Score - Data": countryData
  };

    var myMap = L.map("#map", {
    center: [25, -10],
    zoom: 2,
    layers: [monomap, countryData]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var labels = [
        "0-3",
        "3-4",
        "4-5",
        "5-6",
        "6-7",
        "7+"
    ];
    var colors = [
      '#fef0d9','#fdd49e','#fdbb84','#fc8d59','#e34a33','#b30000'
    ];
    var limits = [0,1,2,3,4,5];
    var legendInfo = "<h5>Score Range</h5>"
    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      div.innerHTML += "<li style=\"background-color: " + colors[index] + "\">"+labels[index]+"</li>"
    });
    return div;
  };
legend.addTo(myMap);
};


function fetchData(year) {
  fetch('/whr/' + year, {
      method:'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
  })
//   fetch('http://127.0.0.1:5000', {method:'POST'})
.then(response => response.json())
.then(data => {
  // console.log(data);
  newLayer(data);

function newLayer(data) {
  // console.log(data)

  var filteredData = data.filter(item => item.countryName != false); 
  // console.log(filteredData)

  function getColor(d) {
    return d > 7.001 ? '#b30000' :
            d > 6.000 && d < 7  ? '#e34a33' :
            d > 5.000 && d <= 6  ? '#fc8d59' :
            d > 4.000 && d < 5  ? '#fdbb84' :
            d > 3.000 && d < 4  ? '#fdd49e' :
                      '#fef0d9';
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

  var countryData = new L.geoJson(filteredData, {
    style: style,
    onEachFeature: function(feature, layer) {
      // console.log(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${filteredData.length}`);
      layer.bindPopup(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${(filteredData.length +1)}`);
    }
  });
  refreshLayer(countryData);
}
});
}


function refreshLayer(countryData) {

  var container = L.DomUtil.get('#map');
    if(container != null){
      container._leaflet_id = null;
  }

  var monomap = L.tileLayer("https://api.mapbox.com/styles/v1/vandrade88/cko1ergg90u6317nbouu9cv8e/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFuZHJhZGU4OCIsImEiOiJja25ic3h5cWowcG1hMnBsbHg1aTUwend6In0.JyURQn6pP7A1BUZFYCNgfA",
  {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
  });

  var worldmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    // id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Monochromatic Map": monomap,
    "World Map": worldmap
  };

  var overlayMaps = {
    "World Happiness Score - Data": countryData
  };

  var myMap = L.map("#map", {
    center: [25, -10],
    zoom: 2,
    layers: [monomap, countryData]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

};


function init(year) {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    fetch('/whr/' + year, {
        method:'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    newLayer(data);
  
  function newLayer(data) {
    // console.log(data)

    var filteredData = data.filter(item => item.countryName != false); 
    // console.log(filteredData)

    function getColor(d) {
      return d > 7.001 ? '#b30000' :
        d > 6.000 && d < 7  ? '#e34a33' :
        d > 5.000 && d <= 6  ? '#fc8d59' :
        d > 4.000 && d < 5  ? '#fdbb84' :
        d > 3.000 && d < 4  ? '#fdd49e' :
                        '#fef0d9';
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

    var countryData = new L.geoJson(filteredData, {
      style: style,
      onEachFeature: function(feature, layer) {
        // console.log(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${filteredData.length}`);
        layer.bindPopup(`<h5>${feature.countryName}</h5><hr><strong>Score: </strong>${(parseFloat(feature.score).toFixed(2))}<br><strong>Rank: </strong>${feature.rank} out of ${(filteredData.length +1)}`);
      }
    });
    createMap(countryData);
  }
});
}

init();


