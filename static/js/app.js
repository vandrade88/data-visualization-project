// function for Quick Info (Country Name, Score, GDP, Social Support, Health life expectancy..etc

// default settings (map and bar chart for 2021)

// bubble chart or second chart for bottom half of page if time permits

// horizontal bar chart to be called by year selected in dropdown sorted by top 10
function buildBarChart(year) {
    fetch('http://127.0.0.1:5000/whr/' + year, {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        // console.log(data)
        var id = data.filter(item => item.id == id);
        id = id[0];

        var sortResults = data.sort((a, b) =>
        b.score - a.score);

        var slicedData = sortResults.slice(0,10);
        console.log(`First 10: ${slicedData}`);

        var reversedData = slicedData.reverse();

        var barTrace = {
            x: reversedData.map(item => item.score),
            y: reversedData.map(item => item.country),
            type: "bar",
            text: reversedData.map(item => item.score),
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

// init function
function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    // var data = [];

    fetch('http://127.0.0.1:5000/whr/2020', {method:'POST'})
    .then(response => response.json())
    .then((data) => {
        console.log(data)

        buildBarChart(2020);
        // buildBubbleChart(2020);
        // buildMetaData(2020);
        // buildGaugeChart(2020);
    })
};
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

init();