/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 25 - Animate with General Update Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var data = [
  {name: 'Alice', math: 37, science: 62,   language: 54},
  {name: 'Billy', math: 69, science: 34,   language: 85},
  {name: 'Cindy', math: 86, science: 48,   language: null},
  {name: 'David', math: 44, science: null, language: 65},
  {name: 'Emily', math: 59, science: 73,   language: 29}
];

var margin = { top: 10, right: 10, bottom: 30, left: 30 };
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 20;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

var xScale = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, width])
  .padding(0.2)

svg
  .append('g')
  .call(d3.axisBottom(xScale))
    .attr('transform', `translate(0, ${height})`)

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

svg
  .append('g')
  .call(d3.axisLeft(yScale))
//


function render(subject) {

  var trn = d3.transition()
    .duration(1000);

  var update = svg.selectAll('rect')
    // makes it so that the only data within this function call that we are considering
    // is the data for that subject
    .data(data.filter(d => d[subject]))

  // gets rid of elements that we don't need
  update.exit()
    .transition(trn)
    .attr('y', height)
    .attr('x', 0)
    .remove();

  update
    .transition(trn)
    .delay(1000)
    .attr('y', d => yScale(d[subject]))
    .attr('height', d => height - yScale(d[subject]));

  update
    .enter()
    .append('rect')
    .attr('y', height)
    .attr('x', 0)
    .attr('x', d => xScale(d.name))
    .attr('y', d => yScale(d[subject]))
    .attr('width', d => xScale.bandwidth())
    .attr('height', d => height - yScale(d[subject]))
    .transition(t)
    .delay(2000)
    .attr('y', d => yScale(d[subject]))
    .attr()

}



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
