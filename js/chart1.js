//draw Line Chart:
			// var width = 600;
			// var height = 450;
			// var margin = {top: 40, right: 70, bottom: 30, left:60};
			// var width = 80%,
			//  height = 80%;
			// var margin = {top:10%, right:10%, bottom: 10%, left:10%};

var margin = 60,
    width = parseInt(d3.select("#chart1").style("width")) - margin*2,
    height = parseInt(d3.select("#chart1").style("height")) - margin*2;

			// var myWidth = width - margin.right - margin.left;
			// var myHeight = height - margin.top - margin.bottom;





			//Create the empty SVG image
			var svgLine = d3.select("#chart1")
						.append("svg")
						.attr("width", width + margin*2)
						.attr("height", height + margin*2);

