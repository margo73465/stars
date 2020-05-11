var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;
var moveDistance = Math.sqrt(centerX * centerX + centerY * centerY);

var draw = SVG('drawing').size(width, height);

function svgToCartesian(point) {
  y = -(point.y - centerY);
  x = point.x - centerX;
  return { x: x, y: y };
}

function cartesianToSvg(point) {
  x = point.x + centerX;
  y = -point.y + centerY;
  return { x: x, y: y };
}

function cartesianToPolar(point) {
  r = Math.sqrt(point.x * point.x + point.y * point.y);
  theta = Math.atan2(point.y, point.x);
  return { r: r, theta: theta };
}

function polarToCartesian(polarPoint) {
  x = polarPoint.r * Math.cos(polarPoint.theta);
  y = polarPoint.r * Math.sin(polarPoint.theta);
  return { x: x, y: y };
}

function getDestination(point) {
  cartesianPoint = svgToCartesian(point);
  polarPoint = cartesianToPolar(cartesianPoint);

  destinationPolar = {
    r: polarPoint.r + moveDistance,
    theta: polarPoint.theta
  };

  destinationCartesian = polarToCartesian(destinationPolar);
  destination = cartesianToSvg(destinationCartesian);
  return destination;
}

function generateRandomPoint() {
  var x = Math.random() * width;
  var y = Math.random() * height;
  return { x: x, y: y};
}

function createStar() {
  var point = generateRandomPoint();
  var destination = getDestination(point);

  var star = draw.circle(2)
    .cx(point.x)
    .cy(point.y)
    .attr({ fill: 'white' })
    .opacity(1);

  star.animate(2000, '-')
    .move(destination.x, destination.y)
    .opacity(1);
}

function startStars() {
  window.setInterval(createStar, 5);
}

function initialize() {
  startStars();
}

initialize();
