function init() {

    var w = 800;
    var h = 350;
    var maxValue = 30;

    var dataset = [24,10,29,19,8,15,25,12,9,6,21,28];
   
    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .rangeRound([0, w])
                   .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset)])
                   .range([0, h]);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("background-color", "powderblue");

    //Add
    d3.select("#add")
    .on("click", function() {        
    
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber); 
        
        var bars = svg.selectAll("rect").data(dataset);
        var labels = svg.selectAll("text").data(dataset);
        xScale.domain(d3.range(dataset.length));

        bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d, i) {  
                return xScale(i);
            })
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) {
                return "rgb(0, 0, " + (d * 10) + ")";
            });
        
        labels.enter()
              .append("text")
              .merge(labels)
              .transition()
              .duration(500)
              .text(function(d) {
                  return d;
              })
              .attr("x", function(d, i) {
                  return xScale(i) + xScale.bandwidth()/2;
              })
              .attr("y", function(d) {
                  return h - yScale(d) + 14;
              })
              .attr("fill", "white")
              .attr("text-anchor", "middle");
              
    });

    //Remove
    d3.select("#remove")
    .on("click", function() {
        dataset.shift(); //removes first element (left)
        // dataset.pop(); //removes last element (right)

        var bars = svg.selectAll("rect").data(dataset);
        var labels = svg.selectAll("text").data(dataset);
        xScale.domain(d3.range(dataset.length));

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove("x", w)

        bars.transition()
            .delay(500)
            .attr("x", function(d, i) {
            return xScale(i);
            }) 
            .attr("y", function(d) {
            return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) {
                return "rgb(0, 0, " + (d * 10) + ")";
            });      

        labels.exit()
              .transition()
              .duration(500)
              .attr("x", w)
              .remove()

        labels.transition()
              .delay(500)
              .text(function(d) {
                  return d;
              })
              .attr("x", function(d, i) {
                  return xScale(i) + xScale.bandwidth()/2;
              })
              .attr("y", function(d) {
                  return h - yScale(d) + 14;
              })
              .attr("text-anchor", "middle")
              .attr("fill", "white");
        
    });

    svg.selectAll("rect")
        .data(dataset)
        .enter()            
        .append("rect")
        .attr("x", function(d, i) {                
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        })
        .attr("fill", "white")
        .attr("text-anchor", "middle");
}

window.onload = init;