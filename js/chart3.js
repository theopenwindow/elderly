		var poverty = [
 		 			{scheme: "Not Poor", percent: 93},
 		 			{scheme: "Poor", percent: 87}
 		 		];

 		var poverty_urban = [
 		 			{scheme: "Not Poor", percent: 94.7},
 		 			{scheme: "Poor", percent: 92.1}
 		 		];

 		 var living = [
 		 			{scheme: "Not Living Alone", percent: 92.9},
 		 			{scheme: "Living Alone", percent: 87.6}
 		 		];

 		 var living_urban = [
 		 			{scheme: "Not Living Alone", percent: 94.5},
 		 			{scheme: "Living Alone", percent: 88.4}
 		 		];

 		var fullwidth_bar = 700,
 			fullheight_bar = 100,
 			margin_bar=50;

 		 var width = 600;
 		 var height = 70;

    	var svg = d3.select("#chart3")
      				.append("svg")
 		 			.attr("viewBox", "0 0 " + fullwidth_bar + " " + fullheight_bar)
          			.style("max-width", fullwidth_bar + "px")
          			.attr("preserveAspectRatio", "xMidYMid meet");


//Common Scheme Label:

		var scheme = svg.append("g");

//Chart1:

        var bar_Chart1 = svg.append("g").attr("class", "bar1");
 		 
 		 bar_Chart1.append("rect")
            	  .attr("width", "100%")
            	  .attr("height", "100%")
 		 		  .attr("fill", "none");

 		 var xScale_left = d3.scale.linear()
 		 					 .domain([0,100])
 		 					 .range([(width/2-50), 0]);

 		 var yScale_left = d3.scale.ordinal()
 		 					 .rangeBands([0, height], .1);

 		 var xAxis_left = d3.svg.axis()
 		 					 	.scale(xScale_left)
 		 					 	.orient("top")
 		 					 	.tickFormat(d3.format(".2s"))
 		 					  	.outerTickSize([0])
 		 					  	.ticks(4);

 		 svg.append("g")
 		 	   .attr("class", "axisbar_left")
 		 	   .attr("transform", "translate("+margin_bar+" ,20)")
 		 	   .call(xAxis_left);

//Chart2:    

        var bar_Chart2 = svg.append("g").attr("class", "bar2");
 		 
 		 bar_Chart2.append("rect")
            	  .attr("width", "100%")
            	  .attr("height", "100%")
 		 		  .attr("fill", "none");

 		 var xScale = d3.scale.linear()
 		 				.domain([0,100])
		 				.range([0, 250]);

 		 var yScale = d3.scale.ordinal()
 		 				.rangeBands([0, height], .5);

 		 var xAxis = d3.svg.axis()
 		 					  .scale(xScale)
 		 					  .orient("top")
 		 					  .tickFormat(d3.format(".2s"))
 		 					  .outerTickSize([0])
 		 					  .ticks(4);

 		svg.append("g")
 		 	   .attr("class", "axisbar")
 		 	   .attr("transform", "translate(" + (width/2+100) + ",20)")
 		 	   .call(xAxis);

//default:

 		d3.select("#poverty").classed("selected", true);
		redraw(poverty);
	 	redraw_left(poverty_urban);

//set buttons:
 		 d3.select(".btn#poverty")
 		 	.on("click", function(d,i){	
	 		 	redraw(poverty);
	 		 	redraw_left(poverty_urban);
	 		 	d3.selectAll(".btn").classed("selected", false);
	 		 	d3.select(".btn#poverty").classed("selected", true);
	 		 	d3.select("div#chart3").style("display", "block");
 		 	});

 		 d3.select(".btn#living")
 		 	.on("click", function(d,i){	 	
	 		 	redraw(living);
	 		 	redraw_left(living_urban);
	 		 	d3.selectAll(".btn").classed("selected", false);
	 		 	d3.select(".btn#living").classed("selected", true);
	 		 	d3.select("div#chart3").style("display", "block");
 		 	});


	 

//set functions:

		function redraw_left(data){


 		 	yScale.domain(d3.range(data.length));

 		 	var bars = bar_Chart1.selectAll("rect.bar")
 		 						.data(data);

 		 	bars.enter()
 		 		.append("rect")
 		 		.attr("class", "bar")
 		 		.attr("fill", "#ea6948");

 		 	bars.exit()
 		 		.transition()
 		 		.duration(300)
 		 		.ease("exp")
 		 		.attr("width", 0)
 		 		.remove();

 		 	bars.transition()
 		 		.duration(300)
 		 		.ease("quad")
 		 		.attr("width", function(d) {
 		 			return xScale(+d.percent);
 		 		})
 		 		.attr("height", yScale.rangeBand())
 		 		.attr("transform", function(d,i){
 		 			return "translate("+[(xScale_left(d.percent) + margin_bar), (yScale(i)+10)] +")"
 		 		});

 		 	svg.select(".axis_left").transition().duration(1000).call(xAxis_left);


//set labels for left chart: 		 	
 		 	var labels = bar_Chart1.selectAll("text")
								  .data(data);

			labels.enter()
				  .append("text");

			labels.exit()
				.transition()
				.duration(300)
				.attr("opacity", 0)
 		 		.remove();

 		 	labels.transition()
 		 		  .duration(300)
 		 		  .attr("transform", function(d,i){
					  	return "translate(30," + (yScale(i)+20) +")";
					  })
				  .text(function(d){
					  	return d.percent;
					  })
				  .attr("font-family", "Abel")
				  .attr("font-weight", "bold")
				  .attr("font-size", "14px")
				  .attr("fill", "black");

//set common scheme label:
 		 	var labels_common = scheme.selectAll("text")
								  .data(data);

			labels_common.enter()
				  .append("text");

			labels_common.exit()
				.transition()
				.duration(300)
				.attr("opacity", 0)
 		 		.remove();

 		 	labels_common.transition()
 		 		  .duration(300)
 		 		  .attr("transform", function(d,i){
					  	return "translate("+(width/2+15)+ "," + (yScale(i)+20) +")";
					  })
				  .text(function(d){
					  	return d.scheme;
					  })
				  .attr("font-family", "Abel")
				  .attr("font-weight", "bold")
				  .attr("font-size", "14px")
				  .attr("fill", "black");	

//set rural label:
 		 	var labels_rural = svg.append("g").selectAll("text").data(data);

 		 	labels_rural.enter()
 		 				.append("text")
 		 				.text("Rural Hukou")
				  	 	.attr("transform", "translate("+[(width/4), (height * 1.2)] +")")
				  	 	.attr("font-family", "Abel")
				  		.attr("font-weight", "bold")
				  		.attr("font-size", "14px")
				  		.attr("fill", "#ea6948");	 			  

 		 };

 		 function redraw(data){
 

 		 	yScale.domain(d3.range(data.length));


 		 	var bars = bar_Chart2.selectAll("rect.bar")
 		 						.data(data);

 		 	bars.enter()
 		 		.append("rect")
 		 		.attr("class", "bar")
 		 		.attr("fill", "#005f91");

 		 	bars.exit()
 		 		.transition()
 		 		.duration(300)
 		 		.ease("exp")
 		 		.attr("width", 0)
 		 		.remove();

 		 	bars.transition()
 		 		.duration(300)
 		 		.ease("quad")
 		 		.attr("width", function(d) {
 		 			return xScale(+d.percent);
 		 		})
 		 		.attr("height", yScale.rangeBand())
 		 		.attr("transform", function(d,i){
 		 			return "translate("+[(width/2+100), (yScale(i)+10)] +")"
 		 		});

 		 	 svg.select(".axis").transition().duration(1000).call(xAxis);


//set the labels:
 		 	var labels = bar_Chart2.selectAll("text")
								  .data(data);

			labels.enter()
				  .append("text");

			labels.exit()
				.transition()
				.duration(300)
				.attr("opacity", 0)
 		 		.remove();

 		 	labels.transition()
 		 		  .duration(300)
 		 		  .attr("transform", function(d,i){
					  	return "translate("+(xScale(+d.percent)+(width/2 + 110))+ "," + (yScale(i)+20) +")";
					  })
				  .text(function(d){
					  	return d.percent;
					  })
				  .attr("font-family", "Abel")
				  .attr("font-weight", "bold")
				  .attr("font-size", "14px")
				  .attr("fill", "black");

//set urban label:
 		 	var labels_rural = svg.append("g").selectAll("text").data(data);

 		 	labels_rural.enter()
 		 				.append("text")
 		 				.text("Urban Hukou")
				  	 	.attr("transform", "translate("+[(width*3/4), (height * 1.2)] +")")
				  	 	.attr("font-family", "Abel")
				  		.attr("font-weight", "bold")
				  		.attr("font-size", "14px")
				  		.attr("fill", "#005f91");	
 		 };























