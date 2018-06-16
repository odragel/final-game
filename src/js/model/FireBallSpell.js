export class FireBallSpell {
    constructor(view, ctx){
        debugger;
        this.view = view;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src ="assets/images/fire-ball.png";
        this.top = 270;
        this.left = 400;

        this.endLeft = 900


        this.height = 160;
        this.width = 900;
        this.leftCoord = 0

        this.curFrame = 0;
        this.numOfFrames = 5;

        this.frameWidth = this.width / this.numOfFrames;



        this.tickCount = 0;
        this.tickFrame = 6;
        this.deltaX = 10;


    }

    draw(){
        this.ctx.drawImage(this.img, this.leftCoord + this.frameWidth * this.curFrame , 0, this.frameWidth, this.height,
            this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    clear(){
        this.ctx.clearRect(this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    update(){
        this.tickCount++;
        if(this.tickCount > this.tickFrame){
            this.tickCount = 0;
            this.left = this.left + this.deltaX;
            this.curFrame++;
            if(this.curFrame == this.numOfFrames){
                this.curFrame = 0;
            }

            if(this.left == this.endLeft){
                console.log("cancelled fireball");
                cancelAnimationFrame(this.animateRef);
            }
        }
    }

    animate(){
        console.log("animate ball");
        this.animateRef = requestAnimationFrame(this.animate.bind(this));
        this.update();
        this.clear();
        this.draw();
    }




}