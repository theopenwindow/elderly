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
                    if(i<80){
                        return "translate(" +i*10+ ",0)";
                    }else if(i<160){
                        return "translate(" +(i-80)*10+ ",10)";
                    }else if(i<240){
                        return "translate(" +(i-160)*10+ ",20)";
                    }else if(i<320){
                        return "translate(" +(i-240)*10+ ",30)";
                    }else if(i<400){
                        return "translate(" +(i-320)*10+ ",40)";
                    }else if(i<480){
                        return "translate(" +(i-400)*10+ ",50)";
                    }else if(i<560){
                        return "translate(" +(i-480)*10+ ",60)";
                    }else if(i<640){
                        return "translate(" +(i-560)*10+ ",70)";
                    }else if(i<720){
                        return "translate(" +(i-640)*10+ ",80)";
                    }else if(i<800){
                        return "translate(" +(i-720)*10+ ",90)";
                    }else if(i<880){
                        return "translate(" +(i-800)*10+ ",100)";
                    }else if(i<949){
                        return "translate(" +(i-880)*10+ ",110)";
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
                        return "#02435C";
                    }else{
                        return "#5E0042";
                    }
                })
                .attr("class", "ins")
                .attr("id", function(d){
                    return d.abb ;
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


