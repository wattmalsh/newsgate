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
          height = 640 - margin.top - margin.bottom;

      // define scale
      var scale = d3.scaleLog() // automatically converts to log scale
        .domain([0.6, 1]) // range of input data
        .range([16, 80]); // range of output data

      // create svg
      var svg = d3.select(element[0]).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      // render data whenever it changes
      var simulation;
      scope.$watch('data', function(currentData, previousData) {
        if (simulation) {
          console.log('stopped simulation', simulation);
          simulation.stop();
        }

        data = scope.data;
        if (!data) data = [];

        var bubbles = svg.selectAll('circle');

        bubbles.transition().duration(800)
          .attr('fill', 'rgba(0,0,0,0)')
          .remove();

        var allBubbles = svg.selectAll('circles').data(data)
        .enter().append("circle")
          .attr("class", ".keyword")
          .attr("r", function(d) {
            let relevance = +d.relevance;
            if (relevance < 0.6) {
              relevance = 0.6;
            }
            return scale(relevance);
          })
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 5)
          .attr('fill', 'steelblue')
          .attr('fill-opacity', 1)
          .on('mouseover', function(d) {
            d3.select(this).transition().duration(200).attr('fill-opacity', 0.6);
          })
          .on('mouseout', function(d) {
            d3.select(this).transition().duration(200).attr('fill-opacity', 1);
          });

        // not working
        var textBoxes = allBubbles.append('text')
          .attr('dx', function(d) { return -20;})
          .attr('class', 'bubbleText')
          .text(function(d) { return d.text});

        // define simulation
        simulation = d3.forceSimulation()
         .force('x', d3.forceX(width / 2).strength(0.05))
         .force('y', d3.forceY(height / 2).strength(0.05))
         .force('collide', d3.forceCollide(function(d) {
           let relevance = +d.relevance;
           if (relevance < 0.6) {
             relevance = 0.6;
           }
           return scale(relevance) + 4;
         }));

        // reset position every interval during simulation
        var ticked = function() {
          allBubbles
          .attr("cx", function(d) { return d.x;} )
          .attr("cy", function(d) { return d.y;} );

          textBoxes
          .attr("cx", function(d) { return d.x;} )
          .attr("cy", function(d) { return d.y;} );
        };

        // apply simulation
        simulation.nodes(data)
          .on('tick', ticked);

      });

    }
  };
});
