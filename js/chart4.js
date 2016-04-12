		// this is the size of the svgDots container -- the white part
			var fullwidth = 600,
				fullheight = 200;

			// these are the margins around the graph. Axes labels go in margins.
			var margin = {top: 20, right: 25, bottom: 20, left: 200};

			var widthDots = fullwidth - margin.left - margin.right,
    		heightDots = fullheight - margin.top - margin.bottom;

			var widthScale = d3.scale.linear()
								.range([ 0, widthDots]);

			var heightScale = d3.scale.ordinal()
								.rangeRoundBands([ margin.top, heightDots], 0.2);

			var svgDots = d3.select("#chart4")
						.append("svg")
						.attr("width", fullwidth)
						.attr("height", fullheight);

			var xAxisDots = d3.svg.axis()
							.scale(widthScale)
							.orient("bottom")
							.ticks(5);

			var yAxisDots = d3.svg.axis()
							.scale(heightScale)
							.orient("left")
							.innerTickSize([0]);




			d3.csv("data/povertyChange.csv", function(error, data) {

				if (error) {
					console.log("error reading file");
				}

/*				data.sort(function(a, b) {
					return d3.descending(+a.urban, +b.urban);
				});*/

				// in this case, i know it's out of 100 because it's percents.
				widthScale.domain([
						0,
						d3.max(data, function(d){
							return +d.rural
						})
					]);
			

				// js map: will make a new array out of all the d.change fields
				heightScale.domain(
					data.map(function(d) { return d.change; } ));


				// Make the faint lines from y labels to highest dot

				var linesGrid = svgDots.selectAll("lines.grid")
					.data(data)
					.enter()
					.append("line");

				linesGrid.attr("class", "grid")
					.attr("x1", margin.left)
					.attr("y1", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					})
					.attr("x2", function(d) {
						return margin.left + widthScale(+d.urban);

					})
					.attr("y2", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					});

				// Make the dotted lines between the dots

				var linesBetween = svgDots.selectAll("lines.between")
					.data(data)
					.enter()
					.append("line");

				linesBetween.attr("class", "between")
					.attr("x1", function(d) {
						return margin.left + widthScale(+d.rural);
					})
					.attr("y1", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					})
					.attr("x2", function(d) {
						return margin.left + widthScale(d.urban);
					})
					.attr("y2", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					})
					.attr("stroke-dasharray", "5,5")
					.attr("stroke-width", function(d, i) {
						if (i == 7) {
							return "1";
						} else {
							return "0.5";
						}
					});


				// Make the dots for rural

				var dotsrural = svgDots.selectAll("circle.rural")
						.data(data)
						.enter()
						.append("circle");

				dotsrural
					.attr("class", "rural")
					.attr("cx", function(d) {
						return margin.left + widthScale(+d.rural);
					})
					.attr("r", heightScale.rangeBand()/4)
					.attr("cy", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					})
					.append("title")
					.text(function(d) {
						return d.change + " in rural: " + d.rural + "％";
					});

				// Make the dots for urban

				var dotsurban = svgDots.selectAll("circle.urban")
						.data(data)
						.enter()
						.append("circle");

				dotsurban
					.attr("class", "urban")
					.attr("cx", function(d) {
						return margin.left + widthScale(+d.urban);
					})
					.attr("r", heightScale.rangeBand()/4)
					.attr("cy", function(d) {
						return heightScale(d.change) + heightScale.rangeBand()/2;
					})
					.style("stroke", function(d){
						if (d.change === "Add Private Transfers") {
							return "black";
						}
					})
					.style("fill", function(d){
						if (d.change === "Add Private Transfers") {
							return "#476BB2";
						}
					})
					.append("title")
					.text(function(d) {
						return d.change + " in urban: " + d.urban + "％";
					});

					// add the axes

				svgDots.append("g")
					.attr("class", "x axisDots")
					.attr("transform", "translate(" + margin.left + "," + heightDots + ")")
					.call(xAxisDots);

				svgDots.append("g")
					.attr("class", "y axisDots")
					.attr("transform", "translate(" + margin.left + ",0)")
					.call(yAxisDots);

				svgDots.append("text")
					.attr("class", "xlabel")
		        	.attr("transform", "translate(" + (margin.left + widthDots/2 ) + " ," +
		        				(heightDots + margin.bottom) + ")")
		        	.style("text-anchor", "middle")
		        	.attr("dy", "12")
		        	.text("Elderly Poverty Rate");

       	// Style one of the Y labels bold:

        // a hack that works if you can unravel the selections - to style "The World" bold in the axis label, which is the 8th element:
        var allyAxisDotsLabels = d3.selectAll("g.y.axis g.tick text")[0]; // un-nest array
        d3.select(allyAxisDotsLabels[7]).style("font-weight", "bold");
        	// You could also use tick formatting to get a % sign on each axis tick

			});