const pi = Math.PI;
new p5();
var p;
const size = 1000;
class Rocket{
	constructor(id){
		this.id = id;
		this.pos1 = createVector(random(size), random(size));
		this.vel = p5.Vector.random2D();
		this.vel.x = 0;
		this.vel.y = 0;
		this.temp = createVector(0,0);
	}
	update(loc, force){
		//let acc = createVector(0, 0);
		this.temp = loc.copy();
		this.temp.sub(this.pos1);
		this.temp.setMag(force);
		this.vel.add(this.temp);
		this.vel.limit(7);
		this.pos1.add(this.vel);

	}

	show(r, g, b){
		fill(r, g, b);
		ellipse(this.pos1.x, this.pos1.y, 30, 30);
	}
}

function fade(){
	background(51, 50);
}


function colourTransition(x, rgb){
	let N = x/500;
	if (rgb==="r") x = 255*abs(Math.sin(N*pi));
	else if (rgb==="g") x = 255*abs(Math.sin(N*pi + pi/3));
	else x = 255*abs(Math.sin(N*pi + 2*pi/3));
	return x;
}



let N = 50;
let rockets = [];

for(let i=0; i<N; i++)rockets.push(new Rocket(i))

var c1 = random(50,255);
var c2 = random(50,255);
var c3 = random(50,255);
var X = 0;
var Y = 0;
var Z = 0;
let count = 0;
var FORCE = 0.01;


function changeForce(){
	if (mouseButton === LEFT) {
      FORCE+=0.01;
    }
    if (mouseButton === RIGHT) {
      FORCE-=0.01;
    }
    if (mouseButton === CENTER) {
      FORCE=0.01;
    }
    console.log(FORCE);
}


function setup() {
  createCanvas(size,size);
  background(51);
  noStroke();
  p = createVector(mouseX, mouseY);
}

function draw() {


	if (mouseIsPressed){
		changeForce();
	}

	frameRate(60);
	p.x = mouseX;
	p.y = mouseY;
	fade();

	c1 = colourTransition(X, 'r');
	c2 = colourTransition(Y, 'g');
	c3 = colourTransition(Z, 'b');	

	for(let i=0; i<N; i++){
		rockets[i].update(p, FORCE);
		rockets[i].show(c1, c2, c3);
	}

	X += 0.5;
	Y += 1;
	Z += 1.5
	X %= 500;
	Y %= 500;
	Z %= 500;
}