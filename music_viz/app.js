var margin = { top: 10, right: 10, bottom: 30, left: 30 };
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 20;


var audio = new Audio();
audio.src = 'http://api.soundcloud.com/tracks/28204302/stream?client_id=' + cid;
audio.controls = true;
audio.autoplay = true;
audio.crossOrigin = "anonymous";
document.body.appendChild(audio);

var context = new (window.AudioContext || window.webkitAudioContext)();

var source = context.createMediaElementSource(audio);
var analyser = context.createAnalyser();

source.connect(context.destination);
source.connect(analyser);

var data = new Uint8Array(200);

var frameCount = 0;

var svg = d3.select('.visualization')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom - margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);



function render() {


  frameCount++;
  requestAnimationFrame(render);
  if (frameCount == 30) {
    analyser.getByteFrequencyData(data);
    console.log(data);
  }


}

render();




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
