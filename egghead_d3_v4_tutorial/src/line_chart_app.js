/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 19 - Build a Line Chart
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
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('data/stock_data.json', function(err, data) {

    var parseTime = d3.timeParse('%Y/%m/%d');

    // alter data so that it's workable.
    // basically, change time strings to time objects
    // and ensure that the closes are numeric
    data.forEach(company => {
      company.values.forEach(d => {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });
    });

    var xScale = d3.scaleTime()
      .domain([
        d3.min(data, co => d3.min(co.values, d => d.date)),
        d3.max(data, co => d3.max(co.values, d => d.date))
      ])
      .range([0, width])

    svg
      // you always want to have a fresh graphics container for your axes
      .append('g')
        .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(20));

    // the data variable here actually takes the data. the second item is a callback
    var yScale = d3.scaleLinear()
      .domain([
        d3.min(data, co => d3.min(co.values, d => d.close)),
        d3.max(data, co => d3.max(co.values, d => d.close))
      ])
      .range([height, 0])

    svg
      .append('g')
        // No need to translate the yaxis since it will start at the top-left.
        // .attr('transform', `translate(0, ${height})`)
        .call(d3.axisLeft(yScale).ticks(20))

    // the d3.line function needs to be told it's X and Y properties
    // we declare a function here that tells it how to do it.
    // when data gets passed in here,
    // we use the xScale function (defined above) to map the data to the proper
    // xLocation on the xScale, as well as for the y data.
    // and then a curve gets applied to it all.
    var line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))
      .curve(d3.curveCatmullRom.alpha(0.0001));

    // after the ".attr('d', d => line(d.values))" function, what you get as a result is an
    // svg D attribute, which is just a series of points, which show up on your browser
    // and then you style these points.
    // it looks something like this:
    // <path class="line" d="M1230,0C1230,0,1220.9891213055512,14.438913497976023,1216.4835164835165,17.466181207113834C1211.9781322837591,20.493300682502106,1207.472348970336,13.604127216444752,1202.967032967033,18.16398263548507C1198.4613599310546,22.72419940928417,1193.955988108164,34.41094051912021,1189.4505494505495,44.82845539840349C1184.944999094406,55.24622854800699,1184.9449533554605,77.01887864530286,1175.934065934066,80.67007421929702C1166.9230769227906,84.32131095733045,1144.3956044249403,68.68742959406195,1135.3846153846155,66.73519114969884C1126.3746545417516,64.78317546519064,1126.373418949803,........"></path>
    // console.log(svg.selectAll('.line').data(data).enter().append('path').attr('class', 'line').attr('d', d => line(d.values)));

    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      // the d-attribute is a string containing a series of path descriptions for SVG.
      // the "d" arttribute tells how to draw the line,
      // the callback function passes in the values
      .attr('d', d => line(d.values))
      // when you plot the first set, use the first color, the second set uses the second color
      .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
      .style('stroke-width', 2)
      .style('fill', 'none');

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
