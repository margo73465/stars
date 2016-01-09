var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;
var numStars = 100;

var draw = SVG('drawing').size(width, height);

function convertToPolar(x, y) {
  r = Math.sqrt(x * x + y * y);
  theta = Math.atan2(y, x);
  return [r, theta];
}

function convertToCartesian(r, theta) {
  x = r * Math.cos(theta);
  y = r * Math.sin(theta);
  return [x, y]
}

function getDestination(x, y) {
  var destinationX, destinationY;

  y = -(y - centerY);
  x = x - centerX;

  polar = convertToPolar(x, y);
  destinationPolar = [polar[0] + 600, polar[1]];
  destination = convertToCartesian(destinationPolar[0], destinationPolar[1]);

  destinationX = destination[0] + centerX;
  destinationY = -destination[1] + centerY;

  return [destinationX, destinationY];
}

function generateStars() {
  for ( var i = 0; i < numStars; i++ ) {
    var x = Math.random() * width;
    var y = Math.random() * height;

    var destination = getDestination(x, y);

    var star = draw.rect(2, 2).cx(x).cy(y).attr({ fill: 'white' });
    star.animate(2000, '-').move(destination[0], destination[1]).loop();
  }
}

generateStars();
