function init() {
    
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w / 3, h / 2])
                        .scale(2450);

    // Set up the path
    var path = d3.geoPath()
                .projection(projection);

    var color = d3.scaleQuantize()
                .range(["#f7fbff", "#c6dbef", "#6baed6", "#2171b5", "#08306b"])

    var svg = d3.select("#MapOnPage")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Reading the data from CSV file
    d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
        color.domain([
            d3.min(data, function(d) { return +d.unemployed; }),
            d3.max(data, function(d) { return +d.unemployed; })
        ]);
    
    d3.json("https://raw.githubusercontent.com/Yu0012/cos30045lab/refs/heads/main/LGA_VIC.json").then(function(json) {

        // Merge the ag. data and GeoJSON
        // Loop through once for each ag. data value
        for (var i = 0; i <data.length; i++) {
            
            // Grab state name
            var dataLGA = data[i].LGA;

            // Grab data value, and convert from staeting to float
            var dataValue = parseFloat(data[i].unemployed);

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonLGA = json.features[j].properties.LGA_name;

                if (dataLGA == jsonLGA) {

                    //Copy the data value ito the JSON
                    json.features[j].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;
                }
            }
        }
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
            // Get data value
            var value = d.properties.value;

                if (value) {
                    // If value exiest
                    return color(value);
                } else {
                    // If value is undefined
                    return "#ccc";
                }
            });

        //Load in cities data
        d3.csv("VIC_city.csv").then(function(data) {
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat]) [0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat]) [1];
                })
                .attr("r", 5)
                .style("stroke", "#000")
                .style("stroke-width", 0.5);

            });
        });
    });

}

window.onload = init;
