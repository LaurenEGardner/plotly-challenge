//read in the json data
d3.json("./samples.json").then(function(bellyData) {
  console.log(bellyData);
}, function(err) {
  console.log(err);
});

console.log(bellyData.samples[0].otu_ids)


// function unpack(rows, index) {
//     return rows.map(function(row){
//         return row[index];
//     });
// }


// function init() {
//     d3.json("./samples.json").then(function(bellyData) {
//         console.log(bellyData);
      
//     var data = [{
//         type: 'bar',
//         x:[],
//         y: bellyData.otu_ids,
//         orientation: 'h'
//         }];
//     Plotly.newPlot("bar", data)
// }, function(err) {
//     console.log(err);
//   });
// }

// function updatePlot() {
//     d3.json("./samples.json").then(function(data) {
//         var name = data
//     });
// }

// init();