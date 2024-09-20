// Set the dimensions and padding for the SVG
var w = 500;
var h = 300;
var padding = 40; // Padding to avoid cutoff

// Sample dataset: [x, y] pairs
var dataset = [
    [5, 20], [500, 90], [250, 50], [100, 33],
    [330, 95], [410, 12], [475, 44], [25, 67],
    [85, 21], [220, 88]
];

// Define xScale to scale x-values
var xScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d) { return d[0]; }) - 10,
                         d3.max(dataset, function(d) { return d[0]; }) + 10])
                .range([padding, w - padding]);

// Define yScale to scale y-values (reversed)
var yScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d) { return d[1]; }) - 10,
                         d3.max(dataset, function(d) { return d[1]; }) + 10])
                .range([h - padding, padding]);

// Create SVG container
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Define x-axis using axisBottom and xScale
var xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5); // Optional: Adjust the number of ticks

// Append the x-axis to the SVG and position it at the bottom
svg.append("g")
   .attr("class", "axis") // Optional: Add a class for styling
   .attr("transform", "translate(0, " + (h - padding) + ")")
   .call(xAxis);

// Optional: Define y-axis for better visualization
var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5); // Optional: Adjust the number of ticks

// Append the y-axis to the SVG and position it on the left
svg.append("g")
   .attr("class", "axis") // Optional: Add a class for styling
   .attr("transform", "translate(" + padding + ", 0)")
   .call(yAxis);

// Create circles for the scatter plot with conditional fill color
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) { return xScale(d[0]); })
   .attr("cy", function(d) { return yScale(d[1]); })
   .attr("r", 5)
   .attr("fill", function(d) {
       // Make the circle red only if it matches [500, 90]
       return (d[0] === 500 && d[1] === 90) ? "red" : "blue";
   });

// Create labels for each data point
svg.selectAll(".label")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) { return d[0] + "," + d[1]; })
   .attr("x", function(d) { return xScale(d[0]) + 10; })
   .attr("y", function(d) { return yScale(d[1]) - 5; })
   .attr("font-size", "12px")
   .attr("fill", "black");
