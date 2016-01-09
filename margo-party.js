var height = window.innerHeight;
var width = window.innerWidth;
var centerX = width / 2;
var centerY = height / 2;
var numStars = 100;

var draw = SVG('drawing').size(width, height);

// var center = draw.circle(10).cx(centerX).cy(centerY).attr({ fill: 'red' });
// var yequalsx = draw.line(height, 0, 0, width).attr({ stroke: 'green', 'stroke-width': 3 });
// var xequalsy = draw.line(0, 0, height, width).attr({ stroke: 'green', 'stroke-width': 3 });

function getDestination(x, y) {
  var destinationX, destinationY;

  y = -(y - centerY);
  x = x - centerX;

  console.log('from center: (' + x + ', ' + y + ')');

  if ( y > Math.abs(x) ) { // top
    // console.log('top!');
    destinationY = centerY;
    destinationX = (x * centerY) / y;
  } else if ( -x > Math.abs(y) ) { // left
    // console.log('left!');
    destinationX = -centerX;
    destinationY = (y / x) * (-centerX);
  } else if ( -y > Math.abs(x) ) { // bottom
    // console.log('bottom!');
    destinationY = -centerY;
    destinationX = (x * (-centerY)) / y;
  } else if ( x > Math.abs(y) ) {
    // console.log('right!');
    destinationX = centerX;
    destinationY = (y / x) * centerX;
  } else {
    console.log('we gotta problem');
  }

  // console.log('destination: (' + destinationX + ', ' + destinationY + ')');

  destinationX = destinationX + centerX;
  destinationY = -destinationY + centerY;

  return [destinationX, destinationY];
}

function generateStars() {
  for ( var i = 0; i < numStars; i++ ) {
    var x = Math.random() * width;
    var y = Math.random() * height;
    // draw.rect(5, 5).cx(x).cy(y).attr({ fill: 'blue' });
    // console.log('start: (' + x + ', ' + y + ')');

    var destination = getDestination(x, y);
    // draw.rect(5, 5).cx(destination[0]).cy(destination[1]).attr({ fill: 'blue' });
    // console.log('final destination: (' + destination[0] + ', ' + destination[1] + ')');

    var star = draw.rect(5, 5).cx(x).cy(y).attr({ fill: 'white' });
    star.animate(2000, '=').move(destination[0], destination[1]);
  }
}

generateStars();
