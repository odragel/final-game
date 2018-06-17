export class Hero {
    constructor(view, ctx, name){
        this.view = view;
        this.ctx = ctx;
        this.name = name;
        this.health = 100;
        this.score = 0;
        this.imgHero = new Image();
        this.imgHero.src ="assets/images/boy.png";
        this.imgHero.onload = this.draw.bind(this);
        this.top = 270;
        this.left = 900;


        this.height = 157;
        this.width = 680;
        this.leftCoord = 0

        this.curFrame = 0;
        this.numOfFrames = 5;

        this.frameWidth = this.width / this.numOfFrames;



        this.tickCount = 0;
        this.tickFrame = 5;
        this.deltaX = 10;
    }

    drawInInitialPosition(){
        this.top = 270;
        this.left = 900;
        this.curFrame = 0;
        debugger;
        this.ctx.drawImage(this.imgHero, this.leftCoord + this.frameWidth * this.curFrame , 0, this.frameWidth, this.height,
            this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    draw(){
     //   debugger;
        this.ctx.drawImage(this.imgHero, this.leftCoord + this.frameWidth * this.curFrame , 0, this.frameWidth, this.height,
            this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    clear(){
        this.ctx.clearRect(this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    update(){
        this.tickCount++;
        if(this.tickCount > this.tickFrame){
            this.tickCount = 0;
            this.left = this.left - this.deltaX;
            this.curFrame++;
            if(this.curFrame == this.numOfFrames){
                this.curFrame = 0;
            }

            if(this.left == - this.frameWidth){
                console.log("cancelled");
                cancelAnimationFrame(this.animateRef);

            }
        }
    }

    animate(){
      //  console.log("animate hero");
        this.animateRef = requestAnimationFrame(this.animate.bind(this));

        this.update();
        this.clear();
        this.draw();



    }

    updateScore(value){
        this.score = this.score + value;
    }




}