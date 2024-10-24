function init(){
    // Data for the stacked bar chart
const dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Set dimensions and margins for the SVG canvas
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

// Create SVG canvas
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up the stack generator
const keys = ["apples", "oranges", "grapes"];
const stack = d3.stack().keys(keys);
const series = stack(dataset);

// Set up scales
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])
    .nice()
    .range([height, 0]);

const color = d3.scaleOrdinal(d3.schemeCategory10);

// Draw the stacked bars
svg.selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .attr("fill", (d, i) => color(i))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());

}window.onload = init;