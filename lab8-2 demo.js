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
                .range(["#f7fbff", "#c6dbef", "#6baed6", "#2171b5", "#08306b"]);

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
            for (var i = 0; i < data.length; i++) {
                var dataLGA = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name;

                    if (dataLGA == jsonLGA) {
                        json.features[j].properties.value = dataValue;
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
                    var value = d.properties.value;
                    return value ? color(value) : "#ccc";
                });

            // Load in cities data
            d3.csv("VIC_city.csv").then(function(data) {

                // Tooltip div (hidden initially)
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background-color", "white")
                    .style("border", "solid 1px black")
                    .style("padding", "5px")
                    .style("display", "none");

                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d) {
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 5)
                    .style("stroke", "#000")
                    .style("stroke-width", 0.5)
                    .style("fill", "red")
                    // Mouse event listeners
                    .on("mouseover", function(event, d) {
                        tooltip.style("display", "block")
                            .text(d.city);
                    })
                    .on("mousemove", function(event) {
                        tooltip.style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 10) + "px");
                    })
                    .on("mouseout", function() {
                        tooltip.style("display", "none");
                    });
            });
        });
    });
}

window.onload = init;
