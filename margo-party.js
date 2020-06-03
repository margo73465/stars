// Constants
const height = window.innerHeight;
const width = window.innerWidth;

// Settings
const interval = 20;
const innerRadius = 200;

// Derived values
const centerX = width / 2;
const centerY = height / 2;
const moveDistance = Math.sqrt(centerX * centerX + centerY * centerY);

let starMaker;
const svg = document.getElementById('svg');
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("onclick", "clearInterval(starMaker)");

starMaker = setInterval(createStar, interval);

function createStar() {
  const point = generateRandomPolarPoint();
  const star = drawStar(polarToSvg(point));
  window.setTimeout(() => animateStar(star, point), 10);
}

function generateRandomPolarPoint() {
  const r = Math.random() * innerRadius;
  const theta = Math.random() * 2 * Math.PI;
  return { r, theta };
}

function drawStar(point) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  star.setAttribute("r", 2);
  star.setAttribute("cx", point.x);
  star.setAttribute("cy", point.y);
  star.style.fill = "white";
  star.setAttribute("class", "star");
  svg.appendChild(star);
  return star;
}

function getTransform(polarPoint) {
  destinationPolar = {
    r: polarPoint.r + moveDistance,
    theta: polarPoint.theta
  };

  const point = polarToSvg(polarPoint);
  const destination = polarToSvg(destinationPolar);

  const transform = {
    x: destination.x - point.x,
    y: destination.y - point.y
  }

  return transform;
}

function animateStar(star, point) {
  const transform = getTransform(point);
  star.style.transform = "translate(" + transform.x + "px, " + transform.y + "px)";
}

/////////////////////////////////////////////
// Utility coordinate conversion functions //
/////////////////////////////////////////////

function svgToPolar(point) {
  return cartesianToPolar(svgToCartesian(point));
}

function polarToSvg(point) {
  return cartesianToSvg(polarToCartesian(point));
}

function svgToCartesian(point) {
  const x = point.x - centerX;
  const y = point.y > centerY ?
    -(point.y - centerY) : 
    centerY - point.y;
  return { x: x, y: y };
}

function cartesianToSvg(point) {
  const x = centerX + point.x;
  const y = point.y < 0 ?
    -point.y + centerY :
    centerY - point.y;
  return { x: x, y: y };
}

function cartesianToPolar(point) {
  const r = Math.sqrt(point.x * point.x + point.y * point.y);
  const theta = Math.atan2(point.y, point.x);
  return { r: r, theta: theta };
}

function polarToCartesian(polarPoint) {
  const x = polarPoint.r * Math.cos(polarPoint.theta);
  const y = polarPoint.r * Math.sin(polarPoint.theta);
  return { x: x, y: y };
}
