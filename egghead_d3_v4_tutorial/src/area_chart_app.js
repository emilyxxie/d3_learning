/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 21 - Build an area chart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  // within the svg area, let there be a graphics container containing everything.
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('data/stock_data.json', function(err, data) {
  var parseTime = d3.timeParse('%Y/%m/%d');
  data.forEach(function (data) {
    data.values.forEach(function (data) {
      data.date = parseTime(data.date);
      // make sure close is a number
      data.close = +data.close
    });
  });

  var xScale = d3.scaleTime()
    .domain([
      // first we are getting the min values for either company (the .min on the most left)
      // and then we are comparing the min values of those two and taking the smallest of them
      d3.min(data, co => d3.min(co.values, d => d.date)),
      // and then do the same for max
      d3.max(data, co => d3.max(co.values, d => d.date))
    ])
    .range([0, width])


  var yScale = d3.scaleLinear()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.close)),
      d3.max(data, co => d3.max(co.values, d => d.close))
    ])
    .range([height, 0])

    var area = d3.area()
      .x(d => xScale(d.date))
      // when you are creating areas, yo uare telling it where to put bottom and top of shape
      // y0 tells you where the bottom is
      // what this does is it looks at yScale.domin(), and grabs the first value, which is the min
      // Why do we repeat yScale twice? First, we are pulling the min value, and then mapping that item to the proper range using the yScale function again.
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.close))
      .curve(d3.curveCatmullRom.alpha(0.5))

  svg.selectAll('.area')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('d', d => area(d.values))
    .style('stroke', (d, i) => ['white', '#3369E8'][i])
    .style('fill', (d, i) => ['white', '#3369E8'][i])
    .style('stroke-width', 2)
    .style('fill-opacity', 0.2)


      svg.append('g')
        .call(d3.axisLeft(yScale))

        svg
          .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(20))

});


function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
