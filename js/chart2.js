    var fullWidthSquare = 1100;
    var fullHeightSquare = 150;

    var svgSquare = d3.select("#chart2")
                      .append("svg")
                      .attr("width", fullWidthSquare)
                      .attr("height", fullHeightSquare);
    var rw = 8,
        rh = 8;

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
                    if(i<67){
                        return "translate(" +i*10+ ",0)";
                    }else if(i<134){
                        return "translate(" +(i-67)*10+ ",10)";
                    }else if(i<201){
                        return "translate(" +(i-134)*10+ ",20)";
                    }else if(i<268){
                        return "translate(" +(i-201)*10+ ",30)";
                    }else if(i<335){
                        return "translate(" +(i-268)*10+ ",40)";
                    }else if(i<402){
                        return "translate(" +(i-335)*10+ ",50)";
                    }else if(i<469){
                        return "translate(" +(i-402)*10+ ",60)";
                    }else if(i<536){
                        return "translate(" +(i-469)*10+ ",70)";
                    }else if(i<603){
                        return "translate(" +(i-536)*10+ ",80)";
                    }else if(i<670){
                        return "translate(" +(i-603)*10+ ",90)";
                    }else if(i<737){
                        return "translate(" +(i-670)*10+ ",100)";
                    }else if(i<804){
                        return "translate(" +(i-737)*10+ ",110)";
                    }else if(i<871){
                        return "translate(" +(i-804)*10+ ",120)";
                    }else if(i<938){
                        return "translate(" +(i-871)*10+ ",130)";
                    }else if(i<1000){
                        return "translate(" +(i-938)*10+ ",140)";
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

        d3.selectAll("#default").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 1);
        });
        d3.selectAll("#gov").on("click", function(d){
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Government").style("opacity", 1);
        });
        d3.selectAll("#emp").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_employee").style("opacity", 1);
        });
        d3.selectAll("#res").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Urban_resident").style("opacity", 1);
        });
        d3.selectAll("#cop").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#New_cooperative").style("opacity", 1);
        });
        d3.selectAll("#prv").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Private").style("opacity", 1);
        });
        d3.selectAll("#oth").on("click", function(d){
            console.log("click");
            d3.selectAll(".ins").style("opacity", 0.3);
            d3.selectAll("#Other").style("opacity", 1);
        });
    })


