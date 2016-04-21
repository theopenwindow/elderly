		// this is the size of the svgDots container -- the white part
			var fullwidth = 600,
				fullheight = 200;

			// these are the margins around the graph. Axes labels go in margins.
			var margin = {top: 0, right: 25, bottom: 50, left: 200};

			var widthDots = fullwidth - margin.left - margin.right,
    		heightDots = fullheight - margin.top - margin.bottom;

			var widthScale = d3.scale.linear()
								.range([ 0, widthDots]);

			var heightScale = d3.scale.ordinal()
								.rangeRoundBands([ margin.top, heightDots], 0.2);

			var svgDots = d3.select("#chart4")
						.append("svg")
						/*.attr("width", fullwidth)
						.attr("height", fullheight)*/
						.attr("viewBox", "0 0 " + fullwidth + " " + fullheight)
          				.style("max-width", fullwidth + "px")
          				.attr("preserveAspectRatio", "xMidYMid meet");

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
					})/*
					.append("title")
					.text(function(d) {
						return d.change + " in rural: " + d.rural + "%";
					})*/;

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
					.style("r", function(d){
						if (d.change === "Add Private Transfers") {
							return heightScale.rangeBand()/3;
						}
					})/*
					.append("title")
					.text(function(d) {
						return d.change + " in urban: " + d.urban + "%";
					})*/;

				//make the tooltip
		        var tooltipDots = d3.select("#chart4")
					.append("div")
                	.attr("class", "tooltip");


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
		        				(heightDots + margin.bottom/2) + ")")
		        	.style("text-anchor", "middle")
		        	.attr("dy", "12")
		        	.text("Elderly Poverty Rate (%)");

	

        		dotsurban
					.on("mouseover", mouseoverUrbanFunc)
					.on("mousemove", mousemoveFunc)
					.on("mouseout",	mouseoutFunc);

				dotsrural
					.on("mouseover", mouseoverRuralFunc)
					.on("mousemove", mousemoveFunc)
					.on("mouseout",	mouseoutFunc);	

				function mouseoverUrbanFunc(d) {
					d3.select(this)
						.transition()
						.attr("r", heightScale.rangeBand()/3);
					tooltipDots
						.style("display", null) 
						.html("<p>Elderly Poverty Rate: "+d.urban+"%</p>");
					};


				function mouseoverRuralFunc(d) {
					d3.select(this)
						.transition()
						.attr("r", heightScale.rangeBand()/3);
					tooltipDots
						.style("display", null) 
						.html("<p>Elderly Poverty Rate: "+d.rural+"%</p>");
					};

				function mousemoveFunc(d) {
					tooltipDots
						.style("top", (d3.event.pageY - 10) + "px" )
						.style("left", (d3.event.pageX + 10) + "px");
					};


			    function mouseoutFunc() {

			    	d3.select(this)
						.transition()
						.duration(50)
						.attr("r", heightScale.rangeBand()/4);
			    	tooltipDots.style("display", "none");  
	          		};




			});

