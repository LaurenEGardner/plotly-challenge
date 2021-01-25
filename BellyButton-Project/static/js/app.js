function plotData(id) {

    //read in the json file
    d3.json('./samples.json').then(data =>{
        console.log(data)

        //filter samples by ID
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        //get top 10 samples
        var top10_samples = samples.sample_values.slice(0, 10).reverse();

        //get only top 10 otuids
        var top_OTUs = (samples.otu_ids.slice(0, 10)).reverse();

        //add OTU onto the ids for the labels
        var finalOTU_id = top_OTUs.map(d => "OTU " + d)

        //get labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        var trace1 = {
            x: top10_samples,
            y: finalOTU_id,
            text: labels,
            marker: {
                color: '#4682B4'
            },
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var bar_layout = {
            title: "Top 10 Samples",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };

        //plot the bar chart
        Plotly.newPlot("bar", data1, bar_layout);

        //working on bubble chart
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: "YlGnBu"
            },
            text: samples.otu_labels
        };

        var bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        //plot the bubbles
        var data2 = [trace2];
    Plotly.newPlot('bubble', data2, bubbleLayout);
        
    });
}

//pulling demographic data
function pullDemo(id) {
    d3.json('./samples.json').then((data) => {

        //getting demographic data
        var demodata = data.metadata;

        console.log(demodata)

        //filter by id
        var result = demodata.filter(demo=>demo.id.toString()===id)[0];

        //select the demographic panel
        var demoPanel = d3.select('#sample-metadata');

        //clear the demo panel each time before getting a new id
        demoPanel.html("");

        //append the demo data to panel
        Object.entries(result).forEach((key)=> {
            demoPanel.append("h5").text(key[0].toUpperCase()+ ": "+ key[1] + "\n");
        });

    });
}

//create function for the gauge chart(
function drawGauge(id) {
    // d3.json('./samples.json').then((data) => {

        
        var trace1 = {
            domain: { x: [0, 1], y: [0, 1] },
		    value: 270,
		    title: { text: "Belly Button Washing Frequency" },
		    type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 9]},
                steps: [
                    {range: [0-1]},
                    {range: [1-2]},
                    {range: [2-3]},
                    {range: [2-4]},
                    {range: [4-5]},
                    {range: [5-6]},
                    {range: [6-7]},
                    {range: [7-8]},
                    {range: [8-9]},
                ]
            }
        };

        var data1 = [trace1];

        var layout = { width:600, height: 500, marging: { t: 0, b: 0 }};

        Plotly.newPlot('gauge', data1, layout);
    
    // });
}


//create function for change events
function optionChanged(id) {
    plotData(id);
    pullDemo(id);
    drawGauge(id);
}

//initialize the dropdown
function init() {
    var dropDown = d3.select("#selDataset");

    //pull json data
    d3.json("./samples.json").then((data) => {
        console.log(data)

        //put the ids into the dropdown
        data.names.forEach(function(name){
            dropDown.append("option").text(name).property("value");
        });

        //call functions for initial displays
        plotData(data.names[0]);
        pullDemo(data.names[0]);
        drawGauge(data.names[0]);
    });
}

init();