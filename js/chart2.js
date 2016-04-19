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
                    }else if(i<120){
                        return "translate(" +(i-60)*20+ ",20)";
                    }else if(i<180){
                        return "translate(" +(i-120)*20+ ",40)";
                    }else if(i<240){
                        return "translate(" +(i-180)*20+ ",60)";
                    }else if(i<300){
                        return "translate(" +(i-240)*20+ ",80)";
                    }else if(i<360){
                        return "translate(" +(i-300)*20+ ",100)";
                    }else if(i<420){
                        return "translate(" +(i-360)*20+ ",120)";
                    }else if(i<480){
                        return "translate(" +(i-420)*20+ ",140)";
                    }else if(i<540){
                        return "translate(" +(i-480)*20+ ",160)";
                    }else if(i<600){
                        return "translate(" +(i-540)*20+ ",180)";
                    }else if(i<660){
                        return "translate(" +(i-600)*20+ ",200)";
                    }else if(i<720){
                        return "translate(" +(i-660)*20+ ",220)";
                    }else if(i<780){
                        return "translate(" +(i-720)*20+ ",240)";
                    }else if(i<840){
                        return "translate(" +(i-780)*20+ ",260)";
                    }else if(i<900){
                        return "translate(" +(i-840)*20+ ",280)";
                    }else if(i<960){
                        return "translate(" +(i-900)*20+ ",300)";
                    }else if(i<1000){
                        return "translate(" +(i-960)*20+ ",320)";
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


