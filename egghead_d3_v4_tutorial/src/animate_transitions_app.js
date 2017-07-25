/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 23 - Animate Transitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

d3.select('#block')
  // adding this will transition how long to go from one to another state
  .transition()
    .duration(500)
    // will delay so that it takes a bit longer to change things
    .delay(750)
    // bounces against bounds
    .ease(d3.easeBounceOut)
    .style('width', '400px')
  .transition()
    .duration(500)
    .delay(1)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
  .transition()
    // anything transition property not specifically set from the preivous transition gets inherited by the next transition
    // so you need to reset the ease here if you don't
    // want the background transition to bounce out
    // also, 'background' vs 'background-color': d3 detects which element is the most
    .ease(d3.easeQuadOut)
    .style('background-color', 'red')

// if you want two things to happen at the same time

// the "transition" function returns us
// something that we can transition again
// returns to us a transition
// below returns a gn object.
// console.log(d3.select('#block').transition().duration(50).delay(750).style('width', '400px'));
