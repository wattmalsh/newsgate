angular.module('newsgate.trends', [])
.controller('TrendsController', function($scope, $rootScope, Data) {
  // $scope.data = Data.process(Data.google[1],'init');
  $scope.data = Data.process(Data.google[1]);

  $rootScope.$on('updateData', () => {
    console.log('Queried Trend Term:', Data.google[1].query);
    $scope.data = Data.process(Data.google[1]);
  });
})
.directive('trendGraph', function() {
  console.log('isD3 Loaded?', d3);
  return {
    restrict: 'E',
    scope: { data: '=' },
    link: function(scope, element) {
      // Import from scope
      data = scope.data;

      // define the space that holds the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // define ranges for axis
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // create svg
      var svg = d3.select(element[0]).append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'graphSVG')
      .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

      // add line path
      svg.append("path")
        .data([data])
        .attr("class", "line");

      // draw the x Axis
      svg.append('g')
        .attr('class', 'xAxis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).ticks(d3.timeDay, 1).tickFormat(d3.timeFormat('%b %d')));

      // draw the y Axis
      svg.append('g')
        .attr('class', 'yAxis')
        .call(d3.axisLeft(y).ticks(5));

      // render data whenever it changes
      var nextOldLine, nextOldArea;
      scope.$watch('data', function(currentData, previousData) {
        console.log('data was updated!');
        data = scope.data;

        // scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        // area function
        var area = d3.area()
          .x(function(d) { return x(d.date); })
          .y0(height)
          .y1(function(d) { return y(d.value); });

        // line function
        var valueLine = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); });

        // find before and after line/area
        var oldLine = nextOldLine;
        var oldArea = nextOldArea;

        // create area path under curve
        var drawnArea = svg.append('path').datum(data)
        .attr('class', 'area')
        .attr('fill-opacity', 0)
        .attr('d', area);

        nextOldArea = drawnArea;


        var path = svg.selectAll('.line').data([data]);
        var pathLine = path.attr('d', valueLine).attr('d').slice();
        nextOldLine = svg.selectAll('.line').attr('d');

        if (oldLine === pathLine) {
          console.log('same line was rendered!');
          oldLine === null;
        }

        // On first load, create a straight line on xaxis
        if (!oldLine) {
          console.log('create init oldLine');
          var dataCopy = data.slice();
          dataCopy.forEach((point) => {
            point.value = 0;
          });

          var oldLine = svg.selectAll('.line').data([dataCopy]).attr('d', valueLine).attr("d").slice();
        }


        // remove previous area then chain animate path to new render
        if (oldArea) {
          oldArea.transition().duration(500).attr('fill-opacity', 0).remove();
        }

        path
        .transition()
          .duration(2000)
          .attrTween('d', function(d) {
            return d3.interpolatePath(oldLine, pathLine);
          })
          .on('end', function() {
            drawnArea.transition().duration(500).attr('fill-opacity', 1);
          });


        // animate xaxis change to new render
        svg.select('.xAxis').transition().duration(2000)
          .call(d3.axisBottom(x).ticks(d3.timeDay, 1).tickFormat(d3.timeFormat("%b %d")));

        // animate yaxis change to new render
        svg.select('.yAxis').transition().duration(2000)
          .call(d3.axisLeft(y).ticks(5));


      });

    }
  };
});
