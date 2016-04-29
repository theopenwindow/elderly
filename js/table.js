      var chartWidth = "70px";

      var data = [
        ["Pension Subsidy to the Oldest Old", 3.6, 111, 19.1, "the_oldest"],
        ["New Rural Social Pension Insurance", 18.2, 111, 21, "new_rural"],
        ["Urban and Other Residents' Pension", 14.4, 186, 38.7, "urban_other"],
        ["Other Pension", 2.7, 1485, 150.7, "oth_pen"],
        ["Firm Supplemental Pension", 1.2, 2042, 169.7, "firm_sup"],
        ["Commercial Pension", 0.3, 2228, 106.1, "com_pen"],
        ["Firm Basic Pension", 10.7, 2785, 192.9, "firm_basic"],
        ["Government or Institutions' Pension", 10.9, 3713, 242.2, "government"]
      ];

  
      
      // Sort the data in descending order
      d3.select("th.pop").on("click", function(){
              tr.sort(function(a, b) {return d3.descending(a[1], b[1])});
      });

      d3.select("th.ann").on("click", function(){
              tr.sort(function(a, b) {return d3.descending(a[2], b[2])});
      });

      d3.select("th.sha").on("click", function(){
              tr.sort(function(a, b) {return d3.descending(a[3], b[3])});
      });

     /* data.sort(function(a, b) {return d3.descending(a[2], b[2])});
      data.sort(function(a, b) {return d3.descending(a[3], b[3])});*/

      
      // Setup the scale for the values for display, use abs max as max value
      var x = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return Math.abs(d[1]); })])
          .range(["0%", "100%"]);

      var x2 = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return Math.abs(d[2]); })])
          .range(["0%", "100%"]);      

      var x3 = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return Math.abs(d[3]); })])
          .range(["0%", "100%"]);

      
      var table = d3.select("tbody");
      
      // Create a table with rows and bind a data row to each table row
      var tr = table.selectAll("tr.data")
          .data(data)
          .enter()
          .append("tr")
          .attr("class", "datarow")
          .attr("id", function(d){
            return d[4];

          });
      
/*      // Set the even columns
      d3.selectAll(".datarow").filter(":nth-child(even)").attr("class", "datarow even")*/
      
      // Create the name column
      tr.append("td").attr("class", "data name")
          .text(function(d) { return d[0] });
          
      // Create the percent value column
      tr.append("td").attr("class", "data value")
          .text(function(d) { return d[1];});

    

      // Create a column at the beginning of the table for the chart
      var chart = tr.append("td").attr("class", "chart").attr("width", chartWidth);
      
      // Create the div structure of the chart
      chart.append("div").attr("class", "tb_container").append("div").attr("class", "bar");

      // Create bar
      tr.select("div.bar")
        .style("width", "0%")
        .transition()
        .duration(500)
        .style("width", function(d) { return d[1] > 0 ? x(d[1]) : "0%"; });

//create bar2      
      tr.append("td").attr("class", "data value")
          .text(function(d) { return d[2];}); 

      var chart2 = tr.append("td").attr("class", "chart").attr("width", chartWidth);
           chart2.append("div").attr("class", "tb_container").append("div").attr("class", "bar2");
     
      tr.select("div.bar2")
        .style("width", "0%")
        .transition()
        .duration(500)
        .style("width", function(d) { return d[2] > 0 ? x2(d[2]) : "0%"; });

//create bar3
      tr.append("td").attr("class", "data value")
          .text(function(d) { return d[3];}); 

      var chart3 = tr.append("td").attr("class", "chart").attr("width", chartWidth);
           chart3.append("div").attr("class", "tb_container").append("div").attr("class", "bar3");
     
      tr.select("div.bar3")
        .style("width", "0%")
        .transition()
        .duration(500)
        .style("width", function(d) { return d[3] > 0 ? x3(d[3]) : "0%"; });