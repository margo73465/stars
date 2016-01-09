var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;

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
    r: polarPoint.r + 600,
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
  var star = generateRandomPoint();
  var destination = getDestination(star);

  var star = draw.rect(2, 2).cx(star.x).cy(star.y).attr({ fill: 'white' });
  star.animate(2000, '-').move(destination.x, destination.y);
}

function initialize() {
  window.setInterval(createStar, 10);
}

initialize();
