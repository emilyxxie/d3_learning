/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 24 - Re-use Transitions in d3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// save your transition as a function in order to reuse it constantly
// wrapping this inside a function will not respect the delays
// when you call d3.transition, it's creating it and starting it.


// and once this transition ends (2 seconds after the page loads), that transition is destroyed, and it no longer exists
// so if we want to use this approach, we need to use it as soon as it's created. So stick it in the function.
function go () {
  var t = d3.transition()
    .delay(1000)
    .duration(1000)

  d3.selectAll('.block')
    .transition(t)
    .style('width', '400px')

  d3.select('.a')
    .transition(t)
    .style('background-color', 'orange')

  d3.select('.b')
    .transition(t)
    .style('background-color', 'blue')
}

// another approach to do the exact same thing as above is to use the "transition.call() method"
// transition.call passes the transition as the first argument
// in the body of the function, we'll simply take the transition instance that's passed in
// and call the delay and duration method
function configure (t, delay, duration) {
  return t.delay(delay).duration(duration);
}

function goNow() {
  d3.selectAll('.block')
    .transition()
    .call(configure, 1000, 1000)
    .style('height', '300px')
}
