function init(){
    // Data for the pie chart
const data = [10, 40, 20, 50, 30,60];

// Set dimensions for the SVG canvas
const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

// Create an SVG canvas
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Set up the pie and arc generators
const pie = d3.pie();
const arc = d3.arc()
    .innerRadius(50) // Change this value for a donut chart
    .outerRadius(radius);

// Define the color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Bind data and create pie chart segments
const arcs = svg.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.index));

// Add labels
arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data);

}window.onload = init;