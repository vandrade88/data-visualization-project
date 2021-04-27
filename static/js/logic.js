// leaflet map

// popup bind for map (Country Name & Score<hr>Rank, Population, GDP, Difference from Last Year/Next Year)

// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Load in GeoJson data
  var geoData = "static/data/Median_Household_Income_2016.geojson";
  
  // TODO:
  
  // Grab data with d3
  d3.json(geoData).then(function(data) {
    // Create a new choropleth layer
    console.log(data);
    var geojson = L.choropleth(data, {
  
      // Define what  property in the features to use
      valueProperty: 'MHI2016', // which property in the features to use to determine color intensity/pattern
  
      // Set color scale
      scale: ['#fee8c8','#fdbb84','#e34a33'], // chroma.js scale - include as many as you like
  
      // Number of breaks in step range
      steps: 10, // number of breaks or steps in range
  
      // q for quartile, e for equidistant, k for k-means
      mode: 'q', // q for quantile, e for equidistant, k for k-means
      style: {
        color: '#fff', // border color
        weight: 1,
        fillOpacity: 0.8
      },
      
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`Zip: ${feature.properties.ZIP}<hr>Median Income: ${feature.properties.MHI2016}`)
  
      }
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: 'bottomleft' })
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend')
      var limits = geojson.options.limits
      var colors = geojson.options.colors
      var labels = []
  
      // Add min & max
      div.innerHTML = '<h1>Median Income</h1>' + '<div class="labels"><div class="min">' + limits[0] + '</div> \
              <div class="max">' + limits[limits.length - 1] + '</div></div>'
  
      limits.forEach(function (limit, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
      })
  
      div.innerHTML += '<ul>' + labels.join('') + '</ul>'
      return div
    }
      // Adding legend to the map
    legend.addTo(myMap);
  })
