function init() {

    var w = 500;
    var h = 250;

    var dataset = [24,10,29,19,8,15,25,12,9,6,21,28];

    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .rangeRound([0, w])
                   .paddingInner(0.05);
 
    var yScale = d3.scaleLinear()  // ordinal scale method
                   .domain([0, d3.max(dataset)]) //cal range of domain
                   .range([0, h]); // size of range need to be mapped

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)   //total length
                .attr("height", h) //total height
                .style("background-color", "powderblue");

    d3.select("#update")
    .on("click", function() {
        //alert("Hey, the button works!")
        var numValues = dataset.length;
        var maxValue = 30;

        // Clear the dataset and populate it with new random values
        dataset = [];
        
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue); // Generate random number
            dataset.push(newNumber);         // Add the number to the dataset
        }
        // Select all existing rectangles and bind the updated dataset to them
        svg.selectAll("rect")
           .data(dataset)
           .attr("x", function(d, i) {                
               return xScale(i);
           })
           .attr("y", function(d) { // Set the y position grow from the bottom
               return h - yScale(d);
           })
           .attr("width", xScale.bandwidth())   // Set width of each bar
           .attr("height", function(d) {
               return yScale(d);            // Set height based on data value
           })
           .attr("fill", function(d) {      // Color the bars based on data value
               return "rgb(0, 0, " + (d * 10) + ")";  // Create a color gradient based on the data value
           }); 
        
        // Select all existing text elements and update them with new values
        svg.selectAll("text")
           .data(dataset)
           .text(function(d) {
               return d;                              // Set the text to current data value
           })
           .attr("x", function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2; // Position the text in center of each bar
           })
           .attr("y", function(d) {
               return h - yScale(d) + 14;             // Position the text slightly above the top of each bar
           })
           .attr("fill", "white")                     // Text color
           .attr("text-anchor", "middle");            // Align the text to the center of the bar
    });
    // Create and append rectangles (bars) for the initial dataset
    svg.selectAll("rect")
        .data(dataset)
        .enter()            
        .append("rect")
        .attr("x", function(d, i) {       // x position of bar           
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);                     // Set the y position so the bars grow from the bottom
        })
        .attr("width", xScale.bandwidth())            // Set width of each bar
        .attr("height", function(d) {
            return yScale(d);                         // Set height based on the data value
        })
        .attr("fill", function(d) {                   // Fill color of each bar
            return "rgb(0, 0, " + (d * 10) + ")";     // Use a blue color gradient based on the data value
        });
    // Create and append text labels for the initial dataset
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;                                 // Set the text to the data value
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Position the text in the center of the bar
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;                // Position the text slightly above the top of each bar
        })
        .attr("fill", "white")                        // Set the text color
        .attr("text-anchor", "middle");               // Align the text to the center of the bar
}
// Initialize the chart when the window loads
window.onload = init;