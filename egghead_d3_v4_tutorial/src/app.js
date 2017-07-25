/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 2 - Convert Input Data to Output Values with Linear Scales
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// continuous input domain and maps to continuous output domain while
// retaining proportions
var linearScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 600])
  // clamp means you can't go beyond bounds--same as p5 constrain
  .clamp(true);

// the range mapping is the same as in p5 the map function.
linearScale(0);
linearScale(100);
linearScale(50);
linearScale(105);

// basically, it figures out whatever the input would be to make the result 300
linearScale.invert(300);

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 3 - Convert Dates to Numeric Values with Time Scales
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var timeScale = d3.scaleTime()
  .domain([new Date(2017, 0, 1), new Date()])
  .range([0, 100]);

// console.log(timeScale(new Date(2017, 03, 15)));

// this will tell you the midpoint between when the origin date, and today
// console.log(timeScale.invert(50));



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 4 - Create Labels from Non-Numeric Data with Quantize Scales
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// What if we want to map our values to something more specific?

var quantizeScale = d3.scaleQuantize()
  .domain([0, 100])
  .range(["red", "white", "green", "blue"])

// scaleQuantize looks at the number of items in the output range, and then breaks  the domain, into that many uniform sized pieces.

// So if your "range" has three items, it will take the domain and break it up into three items.
0 - 25 = red
25 - 50 = white
50 - 75 = green
75 - 100 = blue

// console.log(quantizeScale(23));
// console.log(quantizeScale(99));

// instead of invert, we have a method called "invertExtent" here.
// invert is not a valid value for scaleQuantize.
// console.log(quantizeScale.invertExtent("white"))


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 6 - Load and Inspect Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// d3 has methods to allow you to load data in case you need it.
// tsv is tab-separated Values
//
// below is how you can load data via JSON.
this is fairly standardized across the three different file types
d3.json('data/data.json', function (data) {
  console.log(data);
});

// min/ max age
d3.json('data/data.json', function (data) {
  var minAge = d3.min(data, function(d) {
    return d.age;
  });
  console.log(minAge);
});

// extent gives you a vector with min and max
d3.json('data/data.json', function (data) {
  var extent = d3.extent(data, function(d) {
    return d.age;
  });
  console.log(extent);

  // using extent as the domain, we can then map this data
  // onto a linear pixel grid
  var scale = d3.scaleLinear()
    .domain(extent)
    .range([0, 600]);

  console.log(scale(37));

  // the .set() function allows you to extract all of the data for a given column name. the .values() function will cleanly extract all of this data into a 1D array
  var ages = d3.set(data, function(d) {
    return d.age;
  });
  console.log(ages.values());
});


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 7 - Select DOM Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// the .select() function selects a DOM object
var link = d3.select('div');

// but if we want to see the actual DOM elements, we can use .nodes()
console.log(link.nodes());

// if you want to select mulitple items, you need to use the selectAll method.
var all = d3.selectAll('a');

// but if you are only interested in the links inside of the div here,
var divLinks = link.selectAll('a');
console.log(divLinks.nodes());

// You can also use the CSS syntax\
console.log(d3.selectAll('div a').nodes());

// You can also use any selector string like in jQuery
var actionLink = d3.select('.action');
console.log(actionLink.nodes());

// And to specifically select an Nth child of a type of selector
var secondLink = d3.selectAll('a:nth-child(2)');
console.log(secondLink.nodes());

// another way to select all of a type of element
var allLinks = d3.selectAll(document.links);
console.log(allLinks);

// experiment with different ways of selecting
console.log(d3.select('.title').nodes());


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 8 - Modify dom Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var secondLink = d3.selectAll('a:nth-child(2)');

// this is the attribute method. Second arg is a destination
it tells us which attribute we want to access, and then give it a value

secondLink.attr('href', 'http://google.com');

// if we only give ONE item to that attribute method, then it just returns the attribute
console.log(secondLink.attr('href'));

// basically, calling with a single arg is a getter.  calling with a second arg is a setter.

But, you will usually see this getter-setter pattner in a specific pattern: first selecting an item, and then setting something:
d3.selectAll('a:nth-child(2)')
  .attr('href', 'http://google.com')
  .style('color', 'red');

// so the above is: select the 2nd a child, set the href attribute to http://google.com, and then set the color to red.

// you can also do the same thing using the "classed method", where you write the class in to your css, and then apply the class to the attribute.
d3.selectAll('a:nth-child(3)')
  .attr('href', 'http://google.com')
  .classed('red', true)
  .html('Inventory <b>SALE</b>')

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 9 - Create DOM Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Here, we are appending a button
// append changes the selection
// d3.select.title returns a selection that is this whole div inside our border
// but once we say .append, that returns a new selection
// any statements that come AFTER the .append line will affect the new selection


// convention in d3 -> anything that creates a new selection is indented two spaces
// anything that operates on an existing selection is indented 4 spaces.
// this allows us to see where we are changing the objects that are actually being operated on

d3.selectAll('.title')
  .append('button')
    .html('Inventory <b>SALE</b>')

console.log(d3.selectAll('.title').append('button').nodes())

// here we select title, append a div which returns a new selection, and then we indent what we do to the new selection
// and then to that new div, we append a button, and indent what we do that acts on that button element
// the indents here really help with parsing, so we know what functions are affecting which elements.
// this is a common d3 pattern

d3.select('.title')
  .append('div')
    .style('color', 'red')
    .html('Inventory <b>SALE</b>')
  .append('button')
    .style('display', 'block')
    .text('submit');



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 10 - Start Visualizing Data Driven Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

// the below selects the chart, and  then all divs within the chart
// .data creates a data join. It merges the data with that selection.
// the "enter" is the data without any corresponding element
// and the exit refers to the elements without corresponding data
// whereas the "update" refers to data that has a corresponding element.
// so, basically you need to select elements first, and then join those elements with some data.
var update = d3.select('.chart')
  .selectAll('div')
  // the data method offers a "key" function as a second arg.
  // we're going to use a function that accepts a parameter named "d" representing the data item.
  // and if it exists, we will return the item. If it does not exist, we can return the inner text instead.
  // basically, the update object returns the update (where the data intersects)
  .data(scores, function (d) {
    return d ? d.name : this.innerText;
  })
  .style('color', 'blue');

// the update variable returns a data join object
// you can then take that data join
// and perform operations on it
var enter = update.enter()
  .append('div')
  .text(function (d) {
    return d.name;
  })
  .style('color', 'green');

update.exit().remove();

update.merge(enter)
  .style('width', d => d.score * 2 + 'px')
  .style('height', '50px')
  .style('border', '1px solid black')
  .style('background', 'lightgreen')
  .style('text-transform', 'uppercase');

// As an aside, this is how you can draw out an array of all of the names from the update object.
console.log(update.enter().data().map(function(d) {return d.name}));

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 11 - Output SVG Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

// we want to use SVGs
var bar = d3.select('.chart')
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('rect')
  .data(scores)
  .enter()
    .append('g')
    // d represents data
    // i represents index
    .attr('y', (d, i) => i * 33);

bar.append('rect')
  .style('width', d => d.score)
  // alternatively, we can use classed("bar", true)
  // but we want to use the classed method only if we are turning something
  // on and off based on conditional logic.
  // if we simply want to apply a class to an element, you should use the attribute function
  .attr('class', 'bar');

// but if we use SVG elements, we need to use different CSS styles to style them

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 12 - SVG Graphics Containers and Text Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// how to show text?
// we need to use the "g" element which stands for graphic
// so similar to a div in regular dom elements

var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

var bars = d3.select('.chart')
  // we want to use SVGs
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('rect')
  .data(scores)
  .enter()
    .append('g')
    // d represents data
    // i represents index
    .attr('transform', (d, i) => 'translate(0, ' +  i * 33 + ')');

// right now, bar is a "G element"
// G elements is a graphics containers. They don't have regular X, Y properties like other SVG shapes do.
// You actually have to transform the element to the position you want it.

// it looks like the append function takes in an array and performs an append on whatever it takes in
console.log(bars);

bars.append('rect')
  .style('width', d => d.score)
  .attr('class', 'bar')

bars.append('text')
  .attr('y', 20)
  .text(function (d) {
    return d.name
  });


// so NOW, our SVG has a collection of child Graphics Containers
//and each one of those graphics containers contains our rect element
// but the text is still not working


// to recap:
// 1) we selected our chart target div, and then we appended and SVG which we explicitly sized to the dinensions we wanted, we then used our regular data-join methodology to create a collection of G elemenets, one for each item in our data array, and then we used transform to position G elements where we watned them
// then we used the varaible holding the selection of those conainers, and we append a rectangle and a text element to each one of them.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 13 - Basic Interactivity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

var bars = d3.select('.chart')
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('rect')
  .data(scores)
  .enter()
    .append('g')
    .attr('transform', (d, i) => 'translate(0, ' +  i * 33 + ')');

bars.append('rect')
  .style('width', d => d.score)
  .attr('class', 'bar')
  // the third arg for d, i, but there's a third that's the collection of dom elemetns in the current selection.
  .on('mouseover', function (d, i, elements) {
    d3.select(this).style('transform', 'scaleX(2)')
    d3.selectAll(elements)
      // filter accepts a string that is a query filter
      .filter(':not(:hover)')
      .style('fill-opacity', 0.5);
  })
  .on('mouseout', function (d, i, elements) {
    d3.selectAll(elements).style('transform', 'scaleX(1)')
    d3.selectAll(elements)
      .style('fill-opacity', 1);
  });

bars.append('text')
  .attr('y', 20)
  .text(function (d) {
    return d.name
  });



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Lesson 14 - Better Code Organization with selection.call()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // .call() also RETURNS the selection that it was called on
  // making chaining even easier

  var scores = [
    { name: 'Alice', score: 96 },
    { name: 'Billy', score: 83 },
    { name: 'Cindy', score: 91 },
    { name: 'David', score: 96 },
    { name: 'Emily', score: 88 }
  ];

  var bars = d3.select('.chart')
    .append('svg')
      .attr('width', 225)
      .attr('height', 300)
    .selectAll('rect')
    .data(scores)
    .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(0, ' +  i * 33 + ')');

  function scaleBar (selection, scale) {
    selection.style('transform', 'scaleX(' + scale + ')');
  }

  function changeOpacity (selection, opacity) {
    selection.style('fill-opacity', opacity);
  }

  bars.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    // the third arg for d, i, but there's a third that's the collection of dom elemetns in the current selection.
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar, 2);
      d3.selectAll(elements)
        // filter accepts a string that is a query filter
        .filter(':not(:hover)')
        .call(changeOpacity, 0.5);
    })
    .on('mouseout', function (d, i, elements) {
      d3.selectAll(elements)
        .call(scaleBar, 1)
        .call(changeOpacity, 1);
    });

  bars.append('text')
    .attr('y', 20)
    .text(function (d) {
      return d.name
    });


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 15 - Margin Convention
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// most charts use axes to provide context and data for the chart they are doing
// the margin convention, used widely in d3 community

var margin = { top: 25, right: 25, bottom: 25, left: 25};

var width = 425 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green')


  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Lesson 16 - Create Chart Axes
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // most charts use axes to provide context and data for the chart they are doing
  // the margin convention, used widely in d3 community

  var margin = { top: 25, right: 25, bottom: 25, left: 25};

  var width = 425 - margin.left - margin.right;
  var height = 625 - margin.top - margin.bottom;

  var svg = d3.select('.chart')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'lightblue')
    .style('stroke', 'green')

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// function to make an axis with automatically calculated ticks
// var yAxis = d3.axisLeft(yScale).ticks(5, '.1s');

// you can use "tickValues" to get a very specific set of ticks
var yAxis = d3.axisLeft(yScale).tickValues([8, 19, 43, 77]);
svg.call(yAxis);

var xScale = d3.scaleTime()
  .domain([new Date(2017, 6, 1), new Date(2017, 6, 2)])
  .range([0, width]);

var xAxis = d3.axisBottom(xScale)
  .ticks(d3.timeHour.every(5))
  .tickSize(5)
  .tickSizeInner(10)
  .tickSizeOuter(20)
  .tickPadding(5);

svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis);
// D3 looks at the domain and creates a reasonable number of ticks based on domain
// you can specify how you want it to behave differently




  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Lesson 17 - Make D3 V4 Charts Responsive with
              the viewBox attribute
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // we should make it responsive here.
  // this is the best and most common way of making it responsive
  // use "viewbox" to do it in an svg way
  // the viewport is the viewing area where the SVG is viewable.
  // you specify the size of the viewport using the width and height attributes on the outermost <svg> element. We do this already on lines()
  // the viewbox is the "real coordinate system" because it is the system used to draw the SVG onto the canvas.

  var margin = { top: 25, right: 25, bottom: 25, left: 25};

  // with the responsivy function, then, the only thing that's the width and height variables do, is that they maintain an aspect ratio
  var width = window.innerWidth - margin.left - margin.right;
  var height = window.innerHeight - margin.top - margin.bottom;

  var svg = d3.select('.chart')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(responsivefy)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'lightblue')
    .style('stroke', 'green')

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// function to make an axis with automatically calculated ticks
// var yAxis = d3.axisLeft(yScale).ticks(5, '.1s');

// you can use "tickValues" to get a very specific set of ticks
var yAxis = d3.axisLeft(yScale).tickValues([8, 19, 43, 77]);
svg.call(yAxis);

var xScale = d3.scaleTime()
  .domain([new Date(2017, 6, 1), new Date(2017, 6, 2)])
  .range([0, width]);

var xAxis = d3.axisBottom(xScale)
  .ticks(d3.timeHour.every(5))
  .tickSize(5)
  .tickSizeInner(10)
  .tickSizeOuter(20)
  .tickPadding(5);

svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis);


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

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 18 - Build a Column Chart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var margin = { top: 25, right: 25, bottom: 50, left: 25};

var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var data = [
      {score: 63, subject: 'Mathematics'},
      {score: 82, subject: 'Geography'},
      {score: 74, subject: 'Spelling'},
      {score: 97, subject: 'Reading'},
      {score: 52, subject: 'Science'},
      {score: 74, subject: 'Chemistry'},
      {score: 97, subject: 'Physics'},
      {score: 52, subject: 'ASL'}
    ];

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

var yAxis = d3.axisLeft(yScale).ticks(10);

svg.call(yAxis);

// special kind of scale being used.
// when you are creating bar charts or column charts, you need this!
var xScale = d3.scaleBand()
  // this "padding" thing is relevant to the band width itself
  .padding(0.2)
// domain needs to hold all values being plotted on that corresponding axis.
// in our case, we want to use our subjects
  .domain(data.map(d => d.subject))
  .range([0, width]);

var xAxis = d3.axisBottom(xScale)
  .tickSize(5)
  .tickSizeInner(10)
  .tickPadding(5);

svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-45)')


console.log(svg.selectAll('rect').data(data));

svg.selectAll('rect')
  .data(data)
  // again the "enter" selection is where we have data, but no DOM element
  .enter()
  .append('rect')
    .attr('x', d => xScale(d.subject))
    .attr('y', d => yScale(d.score))
    .attr('width', d => xScale.bandwidth())
    .attr('height', d => height - yScale(d.score))


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



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 18 - Build a Scatterplot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 20;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json('data/data.json', function (err, data) {
  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.expectancy))
    .range([height, 0])
    .nice();
  var yAxis = d3.axisLeft(yScale);
  svg.call(yAxis);

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.cost))
    .range([0, width])
    .nice();

  var xAxis = d3.axisBottom(xScale)
    .ticks(5);

  svg
    .append('g')
      .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  // we are using squareroot, because when we are using circles, we need to use
  // the Squareroot scale to
  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, 40])

// we are creating a bunch of graphics containers with a CSS class of ball
// and then assigning that selection to a variable name circles.
var circles = svg.selectAll('.ball')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'ball')
    .attr('transform', d => {
      return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`;
    });

  circles
    .append('circle')
    // drawn using the center point, and then grows out from there
    // since we set the position on the g-element itself, we can set
    // cx and cy position to 0, because each of these G containers will start already where you want.
    .attr('cx', d => 0)
    .attr('cy', d => 0)
    .attr('r', d => rScale(d.population))
    .style('fill', 'steelBlue')
    .style('opacity', 0.5);

    circles
      .append('text')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('y', 4)
});

// TODO: TRY TO ANIMATE SO THAT WHEN YOU HOVER OVER EACH CIRCLE, THE TEXT SHOWS

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

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Lesson 19 - Build a Line Chart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// see line_chart_app.js
