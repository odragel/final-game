import * as SETTINGS from "../constants/settings";

export class Hero {
    constructor(view, ctx, name){
        this.health = SETTINGS.INITIAL_HEALTH;

        this.view = view;
        this.ctx = ctx;
        this.name = name;
        this.score = 0;

        this.top = SETTINGS.HERO_INITIAL_Y;
        this.left = SETTINGS.HERO_INITIAL_X;

        this.height = SETTINGS.HERO_IMG_HEIGHT;
        this.width = SETTINGS.HERO_IMG_WIDTH;
        this.leftCoord = 0

        this.curFrame = 0;
        this.numOfFrames = SETTINGS.HERO_IMG_FRAMES_AMOUNT;

        this.tickCount = 0;
        this.tickFrame = 5;
        this.deltaX = 10;

        this.init();
    }

    init(){
        this.imgHero = new Image();
        this.imgHero.src =SETTINGS.HERO_IMG
        this.imgHero.addEventListener('load',this.drawInInitialPosition.bind(this));
        this.frameWidth = this.width / this.numOfFrames;
    }

    drawInInitialPosition(){
        this.top = SETTINGS.HERO_INITIAL_Y;
        this.left = SETTINGS.HERO_INITIAL_X;

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
        this.update();
        this.clear();
        this.draw();
        this.animateRef = requestAnimationFrame(this.animate.bind(this));
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