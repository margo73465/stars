var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;
var numStars = 500;

var draw = SVG('drawing').size(width, height);

function getDestination(x, y) {
  var destinationX, destinationY;

  y = -(y - centerY);
  x = x - centerX;

  if ( y > Math.abs(x) ) { // top
    destinationY = centerY;
    destinationX = (x * centerY) / y;
  } else if ( -x > Math.abs(y) ) { // left
    destinationX = -centerX;
    destinationY = (y / x) * (-centerX);
  } else if ( -y > Math.abs(x) ) { // bottom
    destinationY = -centerY;
    destinationX = (x * (-centerY)) / y;
  } else if ( x > Math.abs(y) ) {
    destinationX = centerX;
    destinationY = (y / x) * centerX;
  } else {
    console.log('we gotta problem');
  }

  destinationX = destinationX + centerX;
  destinationY = -destinationY + centerY;

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
