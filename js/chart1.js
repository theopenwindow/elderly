
	

	var marginLine = {top:0, bottom:50, left:20, right:0};

	var widthLine = parseInt(d3.select("#chart1").style("width")) - marginLine.left - marginLine.right;
	var heightLine = parseInt(d3.select("#chart1").style("height")) - marginLine.top - marginLine.bottom;

	var xScaleLine = d3.scale.ordinal().rangeRoundBands([0, widthLine],1),
		yScaleLine = d3.scale.linear().range([0, heightLine*2]);

	var svgLine = d3.select("#chart1")
	    .append("svg")
	    .attr("class","lineChart")
	    .attr("width",widthLine + margin.left + margin.right)
	    .attr("height",heightLine + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform","translate(" + marginLine.left + "," + marginLine.top + ")");

	var xAxisLine = d3.svg.axis()
                        .scale(xScaleLine)
                        .orient("bottom")
                        .ticks(5)
                        .tickPadding([8])
                        .tickSize([5]);

    var yAxisLine = d3.svg.axis()
                        .scale(yScaleLine)
                        .orient("right")
                        .ticks(4)
                        .tickFormat(function(d) { return d*100 +"%"; })
                        .tickPadding([-widthLine-7])
                        .tickSize([widthLine]);

  
	var line = d3.svg.line()
	    .x(function(d){
	        return xScaleLine(d.age);
	    })
	    .y(function(d){
	        return yScaleLine(d.amount);
	    });



	d3.csv("data/employmentRate.csv", function(error, data) {
	    if (error) {
	        console.log("Had an error loading file.");
	    }
	    var ages = d3.keys(data[0]).slice(0,8);
	    var schemes = d3.keys()
	    
	    var dataset = [];
	    
	    data.forEach(function(d,i){
	        var employmentRates = [];
	        ages.forEach(function(y){
	            if(d[y]){
	                employmentRates.push({
	                    scheme: d.scheme,
	                    age: y,
	                    amount: d[y]
	                });
	            }
	        });

	        dataset.push({
	            scheme: d.scheme,
	            rates: employmentRates
	        });
	    });

	    xScaleLine.domain(ages.map(function(d) { 
	                return d; 
	            }));


	    function getVal(myScheme){
	        return dataset.filter(function(d){
	            return d.scheme == myScheme;
	        });
	    };

	    var curData = d3.merge([getVal("Total"), getVal("Total"), getVal("Total"), getVal("Total")]); 
	   
	    yScaleLine.domain([d3.max(curData, function(d){
	        return d3.max(d.rates, function(d){
	            return +d.amount;
	        });
	    })*1.2, 0]);

	    
	    var groups = svgLine.selectAll("g.line")
	        .data(curData)
	        .enter()
	        .append("g")
	        .attr("class", "line")
	        .attr("stroke", "black");
	     
	    
        var gxAxis = svgLine.append("g")
                        .attr("class","x axis lineChart");
                    
        var gyAxis = svgLine.append("g")
                        .attr("class","y axis lineChart")
                        .selectAll("text")
                        .style("text-anchor","end");

   		var pathLine = groups.selectAll("path")
                    .data(function(d){return [d.rates];})
                    .enter()
                    .append("path")
                    .attr("class","line");

	   

		var circleLine = groups.selectAll("circle")
	        .data(function(d){return d.rates;})
	        .enter()
	        .append("circle")
	        .attr("r",1.5);
	    
		var textLine =	groups.selectAll("text.dotVal")
	        .data(function(d){return d.rates;})
	        .enter()
	        .append("text")
	        .attr("class","dotVal notDisp")
	        .attr("dy", -10)
	        .style("text-anchor", "middle")
	        .text(function(d){
	            return d.amount;
	        });

		var labelLine =	groups.append("text")
                        .datum(function(d){
                            return {
                                scheme: d.scheme, 
                                lastRates: d.rates[d.rates.length - 1].amount
                            };
                        })
                        .text(function(d){
                                return d.scheme;
                        })
                        .attr("y", function(d){
                            return yScaleLine(+d.lastRates);
                        })
                        .attr("class", "label")
                        .style("text-anchor","start")
                        .attr("dx",8)
                        .attr("dy",4);	        
	    
	    groups
	        .on("mouseover",mouseOverFunc)
	        .on("mouseout",mouseOutFunc);
	    
//default:
		d3.select("#group1").classed("selected", true);
		d3.select("#p1").style("display", "block");
	 	d3.select("#p2").style("display", "none");
	 	d3.select("#p3").style("display", "none");
	 	d3.select("#p4").style("display", "none");	

//buttons:
	    d3.selectAll("button").on("click",function(d){
	        if(d3.select(this).attr("id") == "group1"){
	        	d3.select("#p1").style("display", "block");
	 		 	d3.select("#p2").style("display", "none");
	 		 	d3.select("#p3").style("display", "none");
	 		 	d3.select("#p4").style("display", "none");		        	
	            var newData = d3.merge([getVal("Total"), getVal("Total"),getVal("Total"),getVal("Total")]);
	        }
				

	        else if(d3.select(this).attr("id") == "group2"){
	        	d3.select("#p1").style("display", "none");
	 		 	d3.select("#p2").style("display", "block");
	 		 	d3.select("#p3").style("display", "block");
	 		 	d3.select("#p4").style("display", "none");
	            var newData = d3.merge([getVal("Rural"),getVal("Rural"),getVal("Urban"),getVal("Urban")]);
	        }
	        else if(d3.select(this).attr("id") == "group3"){
	        	d3.select("#p1").style("display", "none");
	 		 	d3.select("#p2").style("display", "none");
	 		 	d3.select("#p3").style("display", "none");
	 		 	d3.select("#p4").style("display", "block");
	            var newData = d3.merge([getVal("Rural_Male"),getVal("Rural_Female"),getVal("Urban_Male"),getVal("Urban_Female")]);
	        }

	        
	        d3.selectAll("button").classed("selected", false);
	        d3.select(this).classed("selected", true);
	        
	        /*d3.selectAll("g.line")
	            .select("path")*/
	        groups
	            .select("path")
	            .transition()
	            .duration(1500)
	            .attr("d",function(d,i){
	                return line(newData[i].rates);
	            })
	            .attr("stroke", function(d,i,j){
	                if(newData[i].rates[j].scheme.startsWith("R")){
	                    return "#ea6948";
	                }
	                else if(newData[i].rates[j].scheme.startsWith("U")){
	                    return "#005f91";
	                }
	            });

	        d3.selectAll("g.line")
	            .select("text.label")
	            .transition()
	            .duration(1500)
	            .attr("x", function(d,i){
	            	var lastAge = newData[i].rates[newData[i].rates.length - 1].age;
					return xScaleLine(+lastAge);
	            })
	            .attr("y",function(d,i){
	                var lastRates = newData[i].rates[newData[i].rates.length - 1].amount;
	                return yScaleLine(+lastRates);
	            })
	            .text(function(d,i){
	                    return newData[i].scheme;
	            })
	            .attr("stroke", function(d,i,j){
	                if(newData[i].rates[j].scheme.startsWith("R")){
	                    return "#ea6948";
	                }
	                else if(newData[i].rates[j].scheme.startsWith("U")){
	                    return "#005f91";
	                }
	            });
	        
 			groups.selectAll("circle")
	            .data(function(d,i){
	                return newData[i].rates;
	            })
	            .transition()
	            .duration(1500)
	            .attr("cy",function(d){return yScaleLine(+d.amount);})
	            .attr("r",1.5)
	            .attr("fill", function(d){
	                if(d.scheme.startsWith("R")){
	                    return "#ea6948";
	                }
	                else if(d.scheme.startsWith("U")){
	                    return "#005f91";
	                }})
	            .attr("stroke", "none");

   			groups.selectAll("text.dotVal")
	            .data(function(d,i){
	                return newData[i].rates;})
	            .transition()
	            .duration(1500)
	            .attr("y",function(d){return yScaleLine(+d.amount);})
	            .attr("dy", -15)
	            .attr("stroke", function(d){
	                if(d.scheme.startsWith("R")){
	                    return "#ea6948";
	                }
	                else if(d.scheme.startsWith("U")){
	                    return "#005f91";
	                }})
	            .text(function(d){
	                return d.amount;
	            });
				


	    	});//end for button

            function resize(){

                     var widthLine = parseInt(d3.select("#chart1").style("width")) - marginLine.left - marginLine.right;
                     var heightLine = parseInt(d3.select("#chart1").style("width")) - marginLine.top - marginLine.bottom;

                      xScaleLine.rangeRoundBands([0, widthLine],1);
                      yScaleLine.range([0, heightLine]);

                     svgLine
                        .attr("width",widthLine + marginLine.left + marginLine.right)
                        .attr("height",heightLine + marginLine.top + marginLine.bottom)
                        .attr("transform","translate(" + marginLine.left + "," + marginLine.top + ")");


                   	line
					    .x(function(d){
					        return xScaleLine(d.age);
					    })
					    .y(function(d){
					        return yScaleLine(d.amount);
					    });
            
                    gxAxis
                        .call(xAxisLine)
                        .attr("transform","translate(0," + heightLine + ")");

                    gyAxis.call(yAxisLine);
                    
               
                   pathLine
                    		.attr("d",line);

                     circleLine
                        .attr("cx",function(d){return xScaleLine(+d.age);})
                        .attr("cy",function(d){return yScaleLine(+d.amount);});

                     textLine
                        .attr("x",function(d){return xScaleLine(+d.age);})
                        .attr("y",function(d){return yScaleLine(+d.amount);});

                     labelLine

                        .attr("x", widthLine)
                        /*.attr("y", function(d){
                            return yScaleLine(+d.lastRates);
                        })*/;

            }; //end for resize
            
            d3.select(window).on("resize", resize);
            resize();
	});

	function mouseOverFunc(d){
	    d3.selectAll("g.line")
	        .classed("unfocused", true)
	        .selectAll("circle").attr("r",1);
	    d3.select(this)
	        .classed("focused", true)
	        .classed("unfocused", false)
	        .selectAll("circle").attr("r",3);
	    d3.select(this).selectAll("text").style("display", "block");
	}

	function mouseOutFunc(d){
	    d3.selectAll("g.line")
	        .classed("unfocused",false)
	        .classed("focused",false)
	        .selectAll("circle").attr("r",1.5);
	    d3.selectAll("g.line").selectAll("text").style("display", null);
	}

