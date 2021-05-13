function buildBarChart(year) {
    // fetch('/whr/' + year, {method:'GET'})
    // var form = new document.getElementById("bar_data").dataset.results;
    
    fetch('/whr/' + year, {
        method:'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'body': JSON.stringify(data)
            // 'body': JSON.parse(form)
        },
    })
    // fetch('http://127.0.0.1:5000')
    // fetch('http://127.0.0.1:5000/', {method:'POST'})
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error("HTTP error " + response.status);
    //     }
    //     return response;
    // })
    .then(response => response.json())
    //     // response.json())
    // // .then(response => JSON.stringify(response))
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

        Plotly.newPlot("#bar", data, layout);
    })
    };


// buildBarChart(2020);

// init function
function init() {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildBarChart(year);
};

// create event handler call optionChanged when new drop down item is selected
d3.selectAll("#selDataset").on("change", optionChanged);
// optionChanged: update all plots when dropdown option is selected
function optionChanged(year) {
    var dropdownMenu = d3.select("#selDataset");
    var year = dropdownMenu.property("value");
    buildBarChart(year);
};

init();



// init function
// function init() {
//     var dropdownMenu = d3.select("#selDataset");
//     var year = dropdownMenu.property("value");

//     fetch('http://127.0.0.1:5000/' + 'whr/' + year, {method:'POST'})
//     .then(response => response.json())
//     .then((data) => {
//         // console.log(data)
//         buildBarChart(year);
//     })
// };
// // create event handler call optionChanged when new drop down item is selected
// d3.selectAll("#selDataset").on("change", optionChanged);
// // optionChanged: update all plots when dropdown option is selected
// function optionChanged(year) {
//     var dropdownMenu = d3.select("#selDataset");
//     var year = dropdownMenu.property("value");
//     buildBarChart(year);
// };

// init();