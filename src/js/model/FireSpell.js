export class FireSpell {
    constructor(view, ctx, left, top, participant){
        debugger;
        this.view = view;
        this.ctx = ctx;
        this.top = top;
        this.left = left;
        this.participant = participant;


        this.img = new Image();
        this.img.src ="assets/images/spell-fire.png";
        this.img.onload = this.draw.bind(this);

        this.isStopped = 0;
        this.height = 185;
        this.width = 950;
        this.leftCoord = 0

        this.curFrame = 0;
        this.numOfFrames = 5;

        this.frameWidth = this.width / this.numOfFrames;



        this.tickCount = 0;
        this.tickFrame = 6;


        this.deltaX = 0;


    }

    draw(){
        this.participant.draw();
        this.ctx.drawImage(this.img, this.leftCoord + this.frameWidth * this.curFrame , 0, this.frameWidth, this.height,
            this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    clear(){
        this.participant.clear();
        this.ctx.clearRect(this.left, this.top, this.frameWidth, this.height);
    }

    update(){
        this.tickCount++;
        if(this.tickCount > this.tickFrame){
            this.tickCount = 0;
            this.left = this.left + this.deltaX;
            this.curFrame++;
            if(this.curFrame == this.numOfFrames){
                this.isStopped = 1;
                cancelAnimationFrame(this.animateRef);

            }
        }
    }

    animate(){
        this.update();
        this.clear();

        if(!this.isStopped){
            this.draw();
            this.animateRef = requestAnimationFrame(this.animate.bind(this));
        }
    }

}