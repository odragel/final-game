import monsters from "../../../assets/json/monsters.json";
import * as SETTINGS from "../constants/settings";

export class Monster {
    constructor(view, ctx) {
        this.health = 100;
        this.view = view;
        this.ctx = ctx;
        this.imgMonster = new Image();
        this.imgMonster.src ="assets/images/monsters-parts.png";
        this.canvasHeight = 600;
        this.leftBody = 100;
        this.health = 100;
        this.isSpellTime = 0;
        this.dead = 0;

        this.tickCount = 0;
        this.tickFrame = 10;
        this.delta = 5;

        this.init();
    }
    init(){
        this.determinePartsOfBody();
        this.imgMonster.onload = this.draw.bind(this);
    }

    determinePartsOfBody(){
        let bodyIndex=Math.floor(Math.random()* monsters.body.length),
        headIndex = Math.floor(Math.random()* monsters.head.length),
        legsIndex = Math.floor(Math.random()* monsters.legs.length),
        weaponIndex = Math.floor(Math.random()* monsters.weapon.length);


        this.newName = monsters.weapon[weaponIndex].name+" "+monsters.body[bodyIndex].name +" "+ monsters.head[headIndex].name;
        this.view.updateMonsterName(this.newName);


        this.bodyWidth = +monsters.body[bodyIndex].width, this.bodyHeight= +monsters.body[bodyIndex].height,
            this.bodyXCoord = +monsters.body[bodyIndex].xCoord, this.bodyYCoord = +monsters.body[bodyIndex].yCoord;
        this.forHead = +monsters.body[bodyIndex].forHeadX;
        this.forLegsTop = +monsters.body[bodyIndex].forLegsY, this.forLegsLeft = +monsters.body[bodyIndex].forLegsX;
        this.forWeaponTop = +monsters.body[bodyIndex].forWeaponY, this.forWeaponLeft = +monsters.body[bodyIndex].forWeaponX;



        this.headWidth= +monsters.head[headIndex].width, this.headHeight= +monsters.head[headIndex].height,
            this.headXCoord= +monsters.head[headIndex].xCoord, this.headYCoord= +monsters.head[headIndex].yCoord,
            this.headHeightDelta = +monsters.head[headIndex].deltaY[bodyIndex];



        this.legsWidth= +monsters.legs[legsIndex].width, this.legsHeight= +monsters.legs[legsIndex].height,
            this.legsXCoord= +monsters.legs[legsIndex].xCoord, this.legsYCoord= +monsters.legs[legsIndex].yCoord,
            this.legsHeightDeltaY = +monsters.legs[legsIndex].deltaY[bodyIndex], this.legsWidthDeltaX = +monsters.legs[legsIndex].deltaX[bodyIndex];



        this.weaponWidth= +monsters.weapon[weaponIndex].width, this.weaponHeight= +monsters.weapon[weaponIndex].height,
            this.weaponXCoord= +monsters.weapon[weaponIndex].xCoord, this.weaponYCoord= +monsters.weapon[weaponIndex].yCoord,
            this.weaponDeltaY = +monsters.weapon[weaponIndex].deltaY[bodyIndex];




        this.totalHeight = this.forLegsTop+this.legsHeight - this.legsHeightDeltaY;
        this.totalWidth = this.bodyWidth + this.weaponWidth;

        this.topBody =  this.canvasHeight - ( 10 + this.totalHeight);



    }

    update(){
        this.tickCount++;
        if(this.tickCount > this.tickFrame){
            this.tickCount = 0;
            this.headYCoord = this.headYCoord - this.delta;
            this.delta = this.delta * (-1);
        }


    }

    clear(){
        console.log("clear monster");
      //  this.ctx.clearRect(this.leftBody, this.topBody -this.headHeight, this.totalWidth, this.totalHeight);
        this.ctx.clearRect(this.leftBody-20, this.topBody-this.headHeight, this.totalWidth+20, this.totalHeight+this.headHeight);

    }

    draw(){
        this.ctx.drawImage(this.imgMonster, this.legsXCoord, this.legsYCoord, this.legsWidth, this.legsHeight,
            this.leftBody+this.forLegsLeft - this.legsWidthDeltaX, this.topBody+this.forLegsTop-this.legsHeightDeltaY, this.headWidth, this.headHeight);    //drawlegs

        this.ctx.drawImage(this.imgMonster, this.weaponXCoord, this.weaponYCoord, this.weaponWidth, this.weaponHeight,
            this.leftBody+this.forWeaponLeft, this.topBody+this.forWeaponTop - this.weaponDeltaY, this.weaponWidth, this.weaponHeight);    //draw weapon


        this.ctx.drawImage(this.imgMonster, this.bodyXCoord, this.bodyYCoord, this.bodyWidth, this.bodyHeight,
            this.leftBody, this.topBody, this.bodyWidth, this.bodyHeight);    //sx, sy, width, height    drawBody

        this.ctx.drawImage(this.imgMonster, this.headXCoord, this.headYCoord, this.headWidth, this.headHeight,
            this.leftBody+this.forHead -this.headWidth/2, this.topBody-this.headHeight+this.headHeightDelta, this.headWidth, this.headHeight);    //drawHead



    }

    animate(){
      if(!this.isSpellTime && !this.dead){
          this.update();
          this.clear();
          this.draw();
          this.animateRef = requestAnimationFrame(this.animate.bind(this));
      }

    }

    descreaseHealth(){
        this.health = this.health - SETTINGS.SPELL_VALUE;
        this.view.updateMonsterHealth(this.health);
    }

    isDead(){
        if(this.health <= 0){
            this.clear();
            this.dead = 1
            cancelAnimationFrame(this.animateRef);
            return true;
        }

        return false;
    }

}