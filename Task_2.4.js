function init(){
    //reading the data from csv file
    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings);
    })
    
    var w = 500;
    var h = 150;
    var barPadding = 3;

    //D3 block
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width",w)
                .attr("height",h);

    function barChart(wombatSightings)
    {
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        //x coordinate and y coordinate
        .attr("x",function(d,i){
            return i * (w/wombatSightings.length);
        })
        .attr("y",function(d){
            return h - (d.wombats*4) -20;
        })
        //width and height of the bar chart
        .attr("width",function(d){
            return (w/wombatSightings.length-barPadding);
        })
        .attr("height",function(d){
            return d.wombats*4;
        })
        // Apply shades of light green based on the value of wombats
        .attr("fill", function(d) {
            return "rgb(144, 238, " + (d.wombats * 5 + 15 ) + ")";
        });

        svg.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .text(function(d) {
            return d.wombats;
        })
        .attr("fill", "black")
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length) + 10.5;
        })
        // Adjusted y position to place text slightly below the top of the bars
        .attr("y", function(d) {
            return h - (d.wombats * 4) - 5;  // Adjust the offset for positioning text below the top
        });
    }
}
window.onload = init;
