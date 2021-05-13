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

        function firstBar(bar) {
            var slicedData = data.slice(0,10);
            // console.log(slicedData)
    
            // var reversedData = slicedData.reverse();
            // console.log(reversedData)
    
            var barTrace = {
                y: slicedData.map(item => parseFloat(item.score).toFixed(2)),
                x: slicedData.map(item => item.countryName),
                type: "bar",
                text: slicedData.map(item => parseFloat(item.score).toFixed(2)),
                // orientation: "h",
                textposition: 'inside',
                hoverinfo: 'none',
                marker: {
                  color: 'rgb(158,202,225)',
                  opacity: 0.6,
                  line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                  }}
                };
    
            var highestString = "Highest";
            var highestBold = highestString.bold();

            var layout = {
            title: `${year} ${highestBold} Scoring Countries`,
            barmode: 'stack',
            xaxis: {
                tickangle: -45
              },
            bargap: 0.5
            };
    
            var data1 = [barTrace];
    
            Plotly.newPlot("#bar1", data1, layout);
        };

        function secondBar(bar) {
            var newFilteredData = data.filter(item => item.rank > 0);
            // console.log(newFilteredData)

            var newSlicedData = newFilteredData.slice(Math.max(newFilteredData.length -10, 0));
            // console.log(newSlicedData)

            var newReversedData = newSlicedData.reverse();

            var barTrace2 = {
                y: newReversedData.map(item => parseFloat(item.score).toFixed(2)),
                x: newReversedData.map(item => item.countryName),
                type: "bar",
                text: newReversedData.map(item => parseFloat(item.score).toFixed(2)),
                // orientation: "h",
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

            var lowestString = "Lowest";
            var lowestBold = lowestString.bold();

            var layout2 = {
                title: `${year} ${lowestBold} Scoring Countries`,
                barmode: 'stack',
                xaxis: {
                    tickangle: -45
                  },
                bargap: 0.5
                };

            var data2 = [barTrace2];

            Plotly.newPlot("#bar2", data2, layout2);
        }

        firstBar(data);
        secondBar(data);

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
    fetchData(year);
    }

init();