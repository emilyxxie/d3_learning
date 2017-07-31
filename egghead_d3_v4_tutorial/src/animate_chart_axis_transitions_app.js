/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 26 - Animate Chart Axis Transitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var data = [
  {name: 'Alice', math: 37, science: 62,   language: 54},
  {name: 'Billy', math: 69, science: 34,   language: 85},
  {name: 'Cindy', math: 86, science: 48,   language: null},
  {name: 'David', math: 144, science: null, language: 65},
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

var yAxis = svg
  .append('g')
  .call(d3.axisLeft(yScale));


function render(subject) {

  var trn = d3.transition()
    .duration(1000);

  var update = svg.selectAll('rect')
    .data(data.filter(d => d[subject]), d => d.name);


  update.exit()
    .transition(trn)
    .attr('y', height)
    .attr('height', 0)
    .remove();

  yScale.domain([0,d3.max(data, d => d[subject])]);

  yAxis
    .transition(trn)
    .call(d3.axisLeft(yScale));

  // and THEN, we want to update any remaining items on the chart.
  update
    .transition(trn)
    .attr('y', d => yScale(d[subject]))
    .attr('height', d => height - yScale(d[subject]));

  update
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.name))
    .attr('y', height)
    .attr('width', d => xScale.bandwidth())
    .transition(trn)
    .attr('y', d => yScale(d[subject]))
    .attr('height', d => height - yScale(d[subject]));

}



function responsivefy(svg) {
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  d3.select(window).on("resize." + container.attr("id"), resize);

  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
