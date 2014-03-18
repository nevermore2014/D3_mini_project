$(document).ready(function(){
  listDistrict = function(data){
    var bar_height = 17;
    var left_distance_1 = 400;
    var left_distance_2 = 760;
    var district_array = [];
    console.log("success");
    var nested_distr_data = d3.nest()
                        .key(function(d) { return d.district })
                        .entries(data);
    var district = d3.select("#district");

    district.append('g')
            .attr('class', 'district_rect')
            .selectAll('rect')
            .data(nested_distr_data)
            .enter()
              .append('rect')
              .attr('transform', function(d, i){
                if(i < 21){
                  return 'translate(' + left_distance_1 + ', ' + (i * (bar_height + 1) + 120) + ")"
                } else {
                  return 'translate(' + left_distance_2 +', ' + ((i - 21) * (bar_height + 1) + 120) + ")"
                }
              })
              .attr('height', bar_height)
              .attr('width', 210)
              .style('fill', 'black')
              // .on('mouseover', fade(1))
              // .on('mouseout', fade(.1))

    district.append('g')
            .attr('class', 'district_info')
            .selectAll('text')
            .data(nested_distr_data)
            .enter()
              .append('text')
              .text(function(d){
                return d.key;
              })
              .style('fill', 'white')
              .attr('transform', function(d, i){
                if(i < 21) {
                  return 'translate(' + left_distance_1 + ', 135)'
                } else {
                  return 'translate(' + left_distance_2 + ', 135)'
                };
              })
              .attr('y', function(d, i){
                if(i < 21) {
                  return i * (bar_height + 1)
                } else {
                  return (i - 21) * (bar_height + 1)
                }
              })
  };

  listCrime = function(data){
    var nested_node_data = d3.nest()
                        .key(function(d) { return d.crime_desc})
                        .entries(data);
    var district = d3.select("#district");
    var node_distance = 20;

    district.append('g')
            .attr('class', 'crime_circle')
            .selectAll('circle')
            .data(nested_node_data)
            .enter()
              .append('circle')
              .attr('transform', function(d, i) {
                if(i < 23){
                  return 'translate(120, ' + (i * node_distance + 83) + ")"
                } else {
                  if (i < 74) {
                    return 'translate(' + ((i - 23) * node_distance + 128) + ', 60)'
                  } else {
                    if (i < 97) {
                      return 'translate(1140, ' + ((i - 74) * node_distance + 83) + ')'
                    } else {
                      return 'translate(' + ((i - 97) * node_distance + 128) + ', 560)'
                    }
                  }
                }
              })
              .attr('r', 2)
              .style('fill', 'white')
              .style('stroke', 'black')

    district.append('g')
            .attr('class', 'crime_info')
            .selectAll('text')
            .data(nested_node_data)
            .enter()
              .append('text')
              .text(function(d){
                return d.key;
              })
              .style('fill', 'black')
              .style('font-size', 10)
              // .style('-webkit-transform', 'rotate(-90deg)')
              // .style('-moz-transform', 'rotate(-90deg)')
              .attr('transform', function(d, i) {
                if(i < 23){
                  return 'translate(124, ' + (i * node_distance + 86) + ")"
                } else {
                  if (i < 74) {
                    return 'translate(' + ((i - 23) * node_distance + 128) + ', 60)'
                  } else {
                    if (i < 97) {
                      return 'translate(1144, ' + ((i - 74) * node_distance + 86) + ')'
                    } else {
                      return 'translate(' + ((i - 97) * node_distance + 128) + ', 560)'
                    }
                  }
                }
              })

    };


  listPath = function(data){
    var district = d3.select('#district')
    var districtInfo = $(".district_info text");
    var crimeInfo = $(".crime_info text");
    var district_hash = {}
    var crime_hash = {}
    for(i = 0; i < districtInfo.length; i++){
      district_hash[districtInfo[i].innerHTML] = [districtInfo[i].getAttribute('transform'), districtInfo[i].getAttribute('y')];

    }
    for(j = 0; j < crimeInfo.length; j++){
      crime_hash[crimeInfo[j].innerHTML] = crimeInfo[j].getAttribute('transform');
    }
    district.append('g')
      .attr('class', 'path')
      .selectAll('line')
      .data(data)
      .enter()
        .append('line')
        .attr('x1', function(d) {
          crimeX = d.crime_type.replace('&', '&amp;')
          return crime_hash[crimeX].split('(')[1].split(', ')[0];
        })
        .attr('y1', function(d) {
          crimeY = d.crime_type.replace('&', '&amp;')
          return crime_hash[crimeY].split('(')[1].split(', ')[1].split(')')[0];
        })
        .attr('x2', function(d) {
          districtX = d.district
          return district_hash[districtX][0].split('(')[1].split(',')[0];
        })
        .attr('y2', function(d) {
          districtY = d.district
          return (parseInt(district_hash[districtY][0].split('(')[1].split(', ')[1].split(')')[0]) + parseInt(district_hash[districtY][1])) + "";
        })
        .style('stroke', 'rgb(0,0,0)')
        .style('opacity', 0.1)

  };

  // fade = function(opacity) {
  //   return function(g, i) {
  //     var district = d3.select("#district")
  //     district.selectAll('.crime_info text')
  //       .filter(function(d){
  //         d.getAttribute('')
  //         return d.s
  //       })
  //       .transition()
  //       .style("opacity", opacity)
  //   }
  // }

  $.get('/crimes/index.json')
    .success(listDistrict.bind(this))
    .success(listCrime.bind(this))

  $.get('/lines/index.json')
    .success(listPath.bind(this))

})