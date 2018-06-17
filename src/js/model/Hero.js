import * as SETTINGS from "../constants/settings";

export class Hero {
    constructor(view, ctx, name){
        this.health = 100;

        this.view = view;
        this.ctx = ctx;
        this.name = name;
        this.health = 100;
        this.score = 0;

        this.top = 270;
        this.left = 900;

        this.height = 157;
        this.width = 680;
        this.leftCoord = 0

        this.curFrame = 0;
        this.numOfFrames = 5;



        this.tickCount = 0;
        this.tickFrame = 5;
        this.deltaX = 10;

        this.init();
    }

    init(){
        this.imgHero = new Image();
        this.imgHero.src ="assets/images/boy.png";
        this.imgHero.onload = this.drawInInitialPosition.bind(this);
        this.frameWidth = this.width / this.numOfFrames;
    }

    drawInInitialPosition(){
        this.top = 270;
        this.left = 900;
        this.curFrame = 0;
        this.ctx.drawImage(this.imgHero, this.leftCoord + this.frameWidth * this.curFrame , 0, this.frameWidth, this.height,
            this.left, this.top, this.width/this.numOfFrames, this.height);
    }

    draw(){
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
        }
    }

    animate(){
        this.animateRef = requestAnimationFrame(this.animate.bind(this));

        this.update();
        this.clear();
        this.draw();

    }

    updateScore(value){
        this.score = this.score + value;
    }

    decreaseHealth(){
        this.health = this.health - SETTINGS.SPELL_VALUE;
        this.view.updateHeroHealth(this.health);
    }

    isDead(){
        if (this.health <=0){
            this.clear();
            return true;
        } else {
            return false;
        }
    }


}