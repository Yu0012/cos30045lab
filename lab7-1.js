function init(){
    var w = 600;
    var h = 300;
    var xpadding = 60;
    var ypadding = 20;
    var dataset,xScale,yScale,line; 
    var xAxis,yAxis;

    d3.csv("Unemployment_78-95.csv", function(d){
        return{
            date: new Date(+d.year, (+d.month-1)),
            number: +d.number
        };  
    }).then(function(data){
        dataset = data;
        

    console.table(dataset,["date","number"]);

    xScale = d3.scaleTime()
                .domain([
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                ])
                .range([xpadding, w]);

    yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d.number; })])
                .range([h-ypadding, 0]);

    line = d3.line()
                //.x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

    //Create SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
                
    //Create line
    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .style("stroke", "grey") // Set line color to grey
        .attr("d", line);
    
    xAxis = d3.axisBottom()
        .ticks(10)
        .scale(xScale);
    yAxis = d3.axisLeft()
        .scale(yScale);

    
    
    line = d3.area()
             .x(function (d) { return xScale(d.date); })
             .y1(function (d) { return yScale(d.number); })
             .y0(function (d) {return yScale(0); });
    
    //creating area
    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .style("fill", "grey") // Set area color to grey
        .attr("d", line);

    xAxis = d3.axisBottom()
        .ticks(10)
        .scale(xScale);
    yAxis = d3.axisLeft()
        .scale(yScale);

        //creating axes
        svg.append("g")
            .attr("transform", "translate (0, " + (h - ypadding) + ")")
            .attr("class", "axis")
            .call(xAxis);
            
        svg.append("g")
            .attr("transform", "translate (" + xpadding + ", 0)")
            .attr("class", "axis")
            .call(yAxis);
    
    svg.append("line")
        .attr("class", "halfMillion")
        .attr("x1", xpadding)
        .attr("y1", yScale(500000))
        .attr("x2", w)
        .attr("y2", yScale(500000))
        .attr("stroke-dasharray", "5, 5")
        .style("stroke", "red"); 
  
    svg.append("text")
        .attr("class", "halfMillionLabel")
        .attr("x", xpadding + 10)
        .attr("y", yScale(500000) + 20)
        .style("fill", "red") // Set label text color 
        .text("Half a million unemployed")
    });
}
window.onload = init;