    var fullWidthSquare = 1200;
    var fullHeightSquare = 350;

    var svgSquare = d3.select("#chart2")
                      .append("svg")
                      /*.attr("width", fullWidthSquare)
                      .attr("height", fullHeightSquare)*/
                      .attr("viewBox", "0 0 " + fullWidthSquare + " " + fullHeightSquare)
                        .style("max-width", fullWidthSquare + "px")
                        .attr("preserveAspectRatio", "xMidYMid meet");
    var rw = 19,
        rh = 19;

    d3.csv("data/insurance_use.csv", function(error, data){
        if(error){
            console.log("error reading file");
        }

        //console.log(data);

        svgSquare.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("transform", function(d,i){
                    if(i<60){
                        return "translate(" +i*20+ ",0)";
                    }else if(i<121){
                        return "translate(" +(i-60)*20+ ",20)";
                    }else if(i<181){
                        return "translate(" +(i-121)*20+ ",40)";
                    }else if(i<241){
                        return "translate(" +(i-181)*20+ ",60)";
                    }else if(i<301){
                        return "translate(" +(i-241)*20+ ",80)";
                    }else if(i<361){
                        return "translate(" +(i-301)*20+ ",100)";
                    }else if(i<421){
                        return "translate(" +(i-361)*20+ ",120)";
                    }else if(i<481){
                        return "translate(" +(i-421)*20+ ",140)";
                    }else if(i<541){
                        return "translate(" +(i-481)*20+ ",160)";
                    }else if(i<601){
                        return "translate(" +(i-541)*20+ ",180)";
                    }else if(i<661){
                        return "translate(" +(i-601)*20+ ",200)";
                    }else if(i<721){
                        return "translate(" +(i-661)*20+ ",220)";
                    }else if(i<781){
                        return "translate(" +(i-721)*20+ ",240)";
                    }else if(i<841){
                        return "translate(" +(i-781)*20+ ",260)";
                    }else if(i<901){
                        return "translate(" +(i-841)*20+ ",280)";
                    }else if(i<961){
                        return "translate(" +(i-901)*20+ ",300)";
                    }else if(i<1000){
                        return "translate(" +(i-961)*20+ ",320)";
                    }

                })
                .attr("width", rw)
                .attr("height", rh)
                .attr("fill", function(d){
//console.log(d.insurance);
                    if(d.insurance == "Government medical insurance"){
                        return "#DF4949";
                    }else if(d.insurance == "Urban employee medical insurance"){
                        return "#E27A3F";
                    }else if(d.insurance == "Urban resident medical insurance"){
                        return "#EFC94C";
                    }else if(d.insurance == "New cooperative medical insurance"){
                        return "#32B294";
                    }else if(d.insurance == "Private medical insurance"){
                        return "#3498DB";
                    }else{
                        return "#5E0042";
                    }
                })
                .attr("class", "ins")
                .attr("id", function(d){
                    return d.abb ;
                });             

//click square:        
        d3.selectAll("#Government").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Government").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");
            d3.selectAll("#gov").style("background-color", "#c3e6e5");
            
        });
        d3.selectAll("#Urban_employee").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_employee").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");            
            d3.selectAll("#emp").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#Urban_resident").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_resident").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                    
            d3.selectAll("#res").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#New_cooperative").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#New_cooperative").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#cop").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#Private").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Private").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#prv").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#Other").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Other").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#oth").style("background-color", "#c3e6e5");
        });

//click table:
            d3.selectAll("#default").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 1);
        });
        d3.selectAll("#gov").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Government").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");
            d3.selectAll("#gov").style("background-color", "#c3e6e5");

        });
        d3.selectAll("#emp").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_employee").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");            
            d3.selectAll("#emp").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#res").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_resident").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                    
            d3.selectAll("#res").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#cop").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#New_cooperative").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#cop").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#prv").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Private").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#prv").style("background-color", "#c3e6e5");
        });
        d3.selectAll("#oth").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Other").style("opacity", 1);
            d3.selectAll(".table").style("background-color", "#fff");                        
            d3.selectAll("#oth").style("background-color", "#c3e6e5");
        });

    })


