var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;
var moveDistance = Math.sqrt(centerX * centerX + centerY * centerY);

var star_maker;
var svg = document.getElementById('svg');
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("onclick", "clearInterval(star_maker)");

star_maker = setInterval(createStar, 20);

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
  return { x: x, y: y };
}

function createStar() {
  var point = generateRandomPoint();

  var star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  star.setAttribute("r", 2);
  star.setAttribute("cx", point.x);
  star.setAttribute("cy", point.y);
  star.style.transition = "transform 2s";
  star.style.fill = "white";
  star.setAttribute("class", "star");

  svg.appendChild(star);

  window.setTimeout(() => animateStar(star, point), 10);
}

function animateStar(star, point) {
  var destination = getDestination(point);
  star.style.transform = 
    "translate(" + destination.x + "px, " + destination.y + "px)";
}
