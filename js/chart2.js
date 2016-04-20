    var fullWidthSquare = 1240;
    var fullHeightSquare = 200;

    var svgSquare = d3.select("#chart2")
                      .append("svg")
                      /*.attr("width", fullWidthSquare)
                      .attr("height", fullHeightSquare)*/
                      .attr("viewBox", "0 0 " + fullWidthSquare + " " + fullHeightSquare)
                        .style("max-width", fullWidthSquare + "px")
                        .attr("preserveAspectRatio", "xMidYMid meet");
    var rw = 19,
        rh = 19;

    d3.csv("data/pension.csv", function(error, data){
        if(error){
            console.log("error reading file");
        }

        //console.log(data);

        svgSquare.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("transform", function(d,i){
                    if(i<62){
                        return "translate(" +i*20+ ",0)";
                    }else if(i<124){
                        return "translate(" +(i-62)*20+ ",20)";
                    }else if(i<186){
                        return "translate(" +(i-124)*20+ ",40)";
                    }else if(i<248){
                        return "translate(" +(i-186)*20+ ",60)";
                    }else if(i<310){
                        return "translate(" +(i-248)*20+ ",80)";
                    }else if(i<372){
                        return "translate(" +(i-310)*20+ ",100)";
                    }else if(i<434){
                        return "translate(" +(i-372)*20+ ",120)";
                    }else if(i<496){
                        return "translate(" +(i-434)*20+ ",140)";
                    }else if(i<558){
                        return "translate(" +(i-496)*20+ ",160)";
                    }else if(i<621){
                        return "translate(" +(i-558)*20+ ",180)";
                    }

                })
                .attr("width", rw)
                .attr("height", rh)
                .attr("fill", function(d){
//console.log(d.pension);
                    if(d.pension == "Pension Subsidy to the Oldest Old"){
                        return "#DF4949";
                    }else if(d.pension == "New Rural Social Pension Insurance"){
                        return "#E27A3F";
                    }else if(d.pension == "Urban and Other Residents' Pension"){
                        return "#EFC94C";
                    }else if(d.pension == "Firm Basic Pension"){
                        return "#3498DB";
                    }else if(d.pension == "Firm Supplemental Pension"){
                        return "#7FBA86";
                    }else if(d.pension == "Government or Institutions' Pension"){
                        return "#1277B2";
                    }else if(d.pension == "Commercial Pension"){
                        return "#96E8B3";
                    }else{
                        return "#32B294";
                    }
                })
                .attr("class", "ins")
                .attr("id", function(d){
                    return d.abb ;
                });             

//click square:        
        d3.selectAll("#oldest").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#oldest").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");
            d3.selectAll("#the_oldest").style("background-color", "#c3e6e5");
            
        });
        d3.selectAll("#rural").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#rural").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");            
            d3.selectAll("#new_rural").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#urban").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#urban").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                    
            d3.selectAll("#urban_other").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#firm").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#firm").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_basic").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#sup").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#sup").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_sup").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#gov").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#gov").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#government").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#com").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#com").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#com_pen").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#other").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#other").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#oth_pen").style("background-color", "#c3e6e5");
        });

//click table:
            d3.selectAll("#default").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");
        });
        d3.selectAll("#the_oldest").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#oldest").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");
            d3.selectAll("#the_oldest").style("background-color", "#c3e6e5");

        });
        d3.selectAll("#new_rural").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#rural").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");            
            d3.selectAll("#new_rural").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#urban_other").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#urban").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                    
            d3.selectAll("#urban_other").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#firm_basic").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#firm").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_basic").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#firm_sup").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#sup").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_sup").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#government").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#gov").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#government").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#com_pen").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#com").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#com_pen").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#oth_pen").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#other").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#oth_pen").style("background-color", "#c3e6e5");
        });

//click paragraph:
        d3.selectAll("#call_new").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#rural").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");            
            d3.selectAll("#new_rural").style("background-color", "#c3e6e5");
        });

        d3.selectAll("#call_gov").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#firm").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_basic").style("background-color", "#c3e6e5");
            d3.selectAll("#gov").style("opacity", 1);
            d3.selectAll("#government").style("background-color", "#c3e6e5");
        }); 

        d3.selectAll("#call_exp").on("click", function(d){
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll(".exp").style("background-color", "#c3e6e5");
            
        }); 

        d3.selectAll("#call_main").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#firm").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#firm_basic").style("background-color", "#c3e6e5");
            d3.selectAll("#gov").style("opacity", 1);
            d3.selectAll("#government").style("background-color", "#c3e6e5");
        });     


    })


