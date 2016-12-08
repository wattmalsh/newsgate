angular.module('newsgate.testEmerson', [])
.directive('donutChart', function() {
  console.log('isD3 Loaded?', d3);
  return {
    restrict: 'E',
    link: function(scope, element) {
      var width = 500, height = 500;
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      var pie = d3.pie().sort(null);
      var arc = d3.arc()
        .outerRadius(width / 2 * 0.9)
        .innerRadius(width / 2 * 0.5);
      // var svg = d3.select(element[0]).append('svg')
      //   .attrs({width: width, height: height})
      //   .append('g')
      //   .attrs('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      console.log('element ZERO:', element[0]);
      var svg = d3.select(element[0]).append('svg');
      console.log('svg:', svg);


      // add the <path>s for each arc slice
      svg.selectAll('path').data(pie([82, 62, 10, 32]))
        .enter().append('path')
        .style('stroke', 'white')
        .attrs('d', arc)
        .attrs('fill', function(d, i){ return color(i) });
    }
  };
});
