angular.module('d3modeling',[])
.factory('d3Graphing', function(globalData) {
  var flag = 0;
  graph = function(categoryValue) {
    var graph = d3.select('#' + categoryValue),
    width = 250,
    height = 250,
    margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };
    xScale = d3.scale.linear().range([margins.left, width - margins.right]).domain([1, 18]),
    yScale = d3.scale.linear().range([height - margins.top, margins.bottom])
      .domain([d3.min(globalData.getTarg().baseStats, function (d) { return d[categoryValue] - d[categoryValue]*.1; }), d3.max(globalData.getTarg().baseStats, function (d) { return d[categoryValue] + d[categoryValue]*.1; })]),
    xAxis = d3.svg.axis()
    .scale(xScale),
    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    graph.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height - margins.bottom) + ")")
      .call(xAxis);

    graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(yAxis);

    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.level);
        })
        .y(function(d) {
            return yScale(d[categoryValue]);
        })
        .interpolate("basis");
    graph.append('svg:path')
        .attr('d', lineGen(globalData.getTarg().baseStats))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
  
  }
  return {graph:graph};
});