var font;
var xSize = 1200;
var ySize = 300;
var massetetthet = 1;
var sirkler = [];
var r = 0;
var g = 0;
var b = 0;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup(){
    createCanvas(xSize,ySize);
    textFont(font);
    textSize(192);
    text('IT 2', 10, 200);

    var points = font.textToPoints('Informasjonsteknologi', 10, 200, 100, {
        sampleFactor: 0.15
    });
    
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var sirkel = new Sirkel(pt.x, pt.y, randomGaussian(7,3));
        sirkler.push(sirkel);
      }
}

function draw() {
    background(255);
    fill(r);
    noStroke();
    text('IT 2', 10, 200);
    r = 0;
    g = 0;
    b = 0;

    for(i = 0; i < sirkler.length; i++){
        sirkler[i].tegn();
        sirkler[i].dytt();
        sirkler[i].flytt();
        
        r += 255*(1/sirkler.length);
        g += 255*(1/sirkler.length);
        b += 255*(1/sirkler.length);

    }  

}

class Sirkel {
    constructor(refx, refy, r){
        this.refx = constrain(refx, 0, xSize-r);
        this.refy = constrain(refy, 0, ySize-r);
        this.x = random(0,xSize-r);
        this.y = random(0,ySize-r);
        this.radius = r;
        this.k_i = 5;
        this.k_d = 30;
        this.ax = 0;;
        this.ay = 0;
        this.vx = 0;
        this.vy = 0;
        this.masse = massetetthet*r*r*PI;
        this.kraftx = 0;
        this.krafty = 0;
    }
    tegn() {
        fill(r,255-g,128-b  );
        ellipse(this.x, this.y, this.radius);
    }
    flytt() {
        this.pdController();
        this.ax = (1/this.masse)*this.kraftx;
        this.ay = (1/this.masse)*this.krafty;
        this.vy += this.ay;
        this.vx += this.ax;
        this.x += this.vx;
        this.y += this.vy;
    }
    pdController() {
        let diffx = this.refx - this.x;
        let diffy = this.refy - this.y;
        let diffvx = 0 - this.vx;
        let diffvy = 0 - this.vy;
        this.kraftx += this.k_d*diffvx + this.k_i*diffx;
        this.krafty += this.k_d*diffvy +this.k_i*diffy;
    }

    dytt() {
        if(this.avstand([this.x, this.y],[mouseX, mouseY]) < 25){
            this.kraftx = random() < 0.5 ? -1500:1500;
            this.krafty = random() < 0.5 ? -1500:1500;
        }
        else{
            this.kraftx = 0;
            this.krafty = 0;
        }
    }

    avstand(x,y){
        return sqrt(sq(x[0]-y[0])+sq(x[1]-y[1]));
    }
}
