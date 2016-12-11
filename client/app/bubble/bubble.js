angular.module('newsgate.bubble', [])
.controller('BubbleController', function($scope, $rootScope, Data, Response) {
  $rootScope.$on('updateData', () => {
    $scope.data = Data.keywords.keywords;
    console.log('CLIENT: updated keywords ->', $scope.data);
  });

})
.directive('bubbleChart', function() {
  return {
    restrict: 'E',
    scope: { data: '='},
    link: function(scope, element) {
      data = scope.data;

      // define the space that holds the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // define scale
      // var scale = d3.scaleSqrt()

      // create svg
      var svg = d3.select(element[0]).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      // render data whenever it changes
      scope.$watch('data', function(currentData, previousData) {
        data = scope.data;
        if (!data) data = [];

        var bubbles = svg.selectAll(".keyword").data(data);

        bubbles.enter().append("circle")
          .attr("class", ".keyword")
          .attr("r", 10)
          .attr("fill", "lightblue")
          .attr("cx", 100)
          .attr("cy", 300);

      });

    }
  };
});
