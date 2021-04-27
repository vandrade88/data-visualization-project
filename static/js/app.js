// dropdown function for year

// function for bar chart to be called for each year

// function for Quick Info (Country Name, Score, GDP, Social Support, Health life expectancy..etc

// default settings (map and bar chart for 2021)

// bubble chart or second chart for bottom half of page if time permits


// create horizontal bar chart with dropdown menu
function buildBarChart(year) {
    fetch('http://127.0.0.1:5000/whr/year/' + year, {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        // var results = response.data;
        // var dataSelected = results.filter(item => item.id == year);
        dataSelected = dataSelected[0];
        var country = dataSelected.country;
        var score = dataSelected.score;
        var overall_rank = dataSelected.overall_rank;

        var barTrace = {
            x: score.slice(0,10).reverse(),
            y: country.slice(0,10).map(country => `${overall_rank} ${country}`).reverse(),
            type: "bar",
            text: country.slice(0,10).reverse(),
            orientation: "h"
        };

        var data = [barTrace];

        Plotly.newPlot("bar", data);
    })
};

// display individual's demographic data
function buildMetaData(sampleNumber) {
    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;
        var sampleSelected = metadata.filter(item => item.id == sampleNumber);
        sampleSelected = sampleSelected[0]; 
        // display key-value pairs from metadata JSON object
        var metadata_object = d3.select("#sample-metadata");
        metadata_object.html("");
        Object.entries(sampleSelected).forEach(([key, value]) => {
            metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
};

// init function
function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    // var data = [];

    fetch('http://127.0.0.1:5000/whr/year/' + year, {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        console.log(data)
    })
}
        // updatePlotly(data);

    // document.getElementById("#selDataset").addEventListener("click", function(e) {

                // if (year == 2020) {
                //     return response.json();
                // }
              
                // else if (year == 2019) {
                //     data = fetch('http://127.0.0.1/whr/year/' + year)
                //             .then((response) => {
                //                 return response.json();
                // })}
            
                // else if (year == 2018) {
                //     data = fetch('http://127.0.0.1/whr/year/' + year)
                //             .then((response) => {
                //                 return response.json();
                // })}

                // else if (year == 2017) {
                //     data = fetch('http://127.0.0.1/whr/year/' + year)
                //             .then((response) => {
                //                 return response.json();
                // })}

                // else {
                //     data = fetch('http://127.0.0.1/whr/year/' + year)
                //             .then((response) => {
                //                 return response.json();
                // })}

        // call bar chart, bubble chart and meta data on the first value in samples.json
        // buildBarChart(year);
        // buildBubbleChart(year);
        // buildMetaData(year);
        // buildGaugeChart(year);
    // })
            // })};

// create event handler call optionChanged when new drop down item is selected
d3.selectAll("#selDataset").on("change", optionChanged);
// optionChanged: update all plots when dropdown option is selected
function optionChanged(year) {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildBarChart(year);
    // buildBubbleChart(year);
    // buildMetaData(year);
    // buildGaugeChart(year);
}; 

// init();