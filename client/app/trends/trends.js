angular.module('newsgate.trends', [])
.controller('TrendsController', function($scope, Data, $interval) {
  console.log('yoyo before', Data);
  $scope.data = Data.process(Data.test1);
  console.log('yoyo after', Data);

  // test
  $interval(() => {
    $scope.data = Data.process(Data.test2);
    console.log('updated data!');
  }, 6000, 1);
})
.directive('trendGraph', function() {
  console.log('isD3 Loaded?', d3);
  return {
    restrict: 'E',
    scope: { data: '=' },
    link: function(scope, element) {
      // HardCoded data input
      // Import from scope
      data = scope.data;
      console.log(data);


      // define the space that holds the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // define ranges for axis
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define area under the line that was drawn


      // define the line


      // find the custom tag and append svg and attributes




      scope.$watch('data', function(newData, currentData) {
        console.log('data was updated!');
        data = scope.data;
        var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });
        var area = d3.area()
          .x(function(d) { return x(d.date); })
          .y0(height)
          .y1(function(d) { return y(d.value); });
        // scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
        d3.select("svg").remove();
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
        // draw area under curve
        svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

        // draw the valueline path
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // draw the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(d3.timeDay, 1).tickFormat(d3.timeFormat("%b %d")));

        // draw the y Axis
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));
      });

    }
  };
});
