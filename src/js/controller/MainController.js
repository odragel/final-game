import {MainView} from "../view/MainView";
import {SpellTaskController} from "./SpellTaskController.js";
import {Monster} from "../model/Monster";
import {Hero} from "../model/Hero";
import {FireBallSpell} from "../model/FireBallSpell";

import * as HINTS from "../constants/hints";


import vocabluary from "../../../assets/json/vocabluary.json";
import spellFire from "../../../assets/json/spell-fire.json";

export class MainController{

    constructor(){
        this.mainView = new MainView();
        this.spellTaskController = new SpellTaskController(this.mainView);
        this.task ="";
        this.curAnswer="";
        this.taskHint = ""
        this.synth = window.speechSynthesis;
        this.canvas = this.mainView.canvas;
        this.ctx = this.mainView.ctx;

        this.scoreForRound = 100;

      //  debugger;
     //   this.audioFire = new Audio("../../../assets/sounds/fire.mp3");
     //   this.audioFire.play();





        this.init();

        this.monster = new Monster(this.mainView, this.ctx);

     //   this.generateMonster();

    }

    init(){
        this.addListeners();

    }

    addListeners(){
        this.mainView.btnStart.addEventListener('click', this.showRegistration.bind(this));

        this.mainView.btnRegisterPlayer.addEventListener('click', this.registerUser.bind(this));

        this.mainView.btnStartRound.addEventListener('click', this.startRound.bind(this));

        this.mainView.spells.addEventListener('click', this.showTask.bind(this));

        this.mainView.btnPlayAudio.addEventListener('click', this.playAudio.bind(this));

        this.mainView.btnCheckAnswer.addEventListener('click', this.checkAnswer.bind(this));

        this.mainView.btnNewRound.addEventListener('click', this.newRound.bind(this));

        this.mainView.btnFinish.addEventListener('click', this.finish.bind(this));

    }


    registerUser(e){
        if(this.mainView.registrationForm.checkValidity()){
            e.preventDefault();
        //   this.mainView.updateGameScreenHeader(this.curUser)
            this.hero = new Hero(this.mainView, this.ctx, this.mainView.regNickName);
            this.mainView.showGameScreen();
        }
    }

    showRegistration(){
        this.mainView.showRegistration();
    }

    startRound(){
        this.mainView.hideMonsterName();
        this.mainView.showSpellSection();
        this.monster.animate();
    }


    showTask(e){
        this.mainView.sectionSpells.classList.add('not-displayed');
        this.mainView.clearInputAnswer();


         switch(e.target.id){
             case "spellFire" : {
                 this.generateMathTask();

                 this.mainView.updateTaskHint(HINTS.MATH_HINT);
                 this.mainView.containerForAnswer.classList.remove('not-displayed');
                 this.mainView.mathTask.classList.remove('not-displayed');
                 break;
             }
             case "spellLight" : {
                 this.generateAudioTask();
                 this.mainView.updateTaskHint(HINTS.AUDIO_HINT);
                 this.mainView.containerForAnswer.classList.remove('not-displayed');
                 this.mainView.audioTask.classList.remove('not-displayed');
                 break;
             }
             case "spellWind" : {
                 this.generateSpellTask();
                 this.mainView.updateTaskHint(HINTS.SPELLING_HINT);
                 this.mainView.spellTask.classList.remove('not-displayed');
                 break;
             }
             case "spellWater" : {
                 this.generateTranslateTask();
                 this.mainView.updateTaskHint(HINTS.TRANSLATE_HINT);
                 this.mainView.containerForAnswer.classList.remove('not-displayed');
                 this.mainView.translateTask.classList.remove('not-displayed');
                 break;
             }
         }
         this.mainView.taskWindow.classList.remove('not-displayed');
    }


    hideTask(){
        this.mainView.taskWindow.classList.add('not-displayed');

        if(!this.mainView.containerForAnswer.classList.contains('not-dispalyed')){
            this.mainView.containerForAnswer.classList.add('not-displayed');
        }

        this.mainView.allTasks.forEach(
            function(cur){
                if(!cur.classList.contains('not-displayed')){
                    cur.classList.add('not-displayed');
                }
            }
        );

    }

    generateMathTask(){
        const symbols = ['+', '-', '*','/'];
        let curSymbol = symbols[Math.floor(Math.random() * (symbols.length))];
        let curFirst = Math.ceil(Math.random() * (10));
        let curSecond = Math.ceil(Math.random() * (10));

        this.mainView.firstMath.value = curFirst;
        this.mainView.symbolMath.value = curSymbol;
        this.mainView.secondMath.value = curSecond;


        let curFinalResult;
        switch(curSymbol){
            case '+': {
                curFinalResult = curFirst + curSecond;
                break;
            }
            case '-': {
                curFinalResult = curFirst - curSecond;
                break;
            }
            case '*': {
                curFinalResult = curFirst * curSecond;
                break;
            }
            case '/': {
                curFinalResult = (Math.round(curFirst / curSecond * 100)/100).toFixed(2);
            }
        }

        this.curAnswer = curFinalResult;
    }

    generateAudioTask(){
        this.task = vocabluary.words[Math.floor(Math.random() * (vocabluary.words.length))].key;
        this.curAnswer = this.task;

    }

    playAudio(){
        if (this.synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }

        let utterThis = new SpeechSynthesisUtterance(this.curAnswer);

        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }

        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        this.synth.speak(utterThis);
    }

    generateSpellTask(){


        this.task = vocabluary.words[Math.floor(Math.random() * (vocabluary.words.length))].key;
        this.curAnswer = this.task;

        this.mainView.createSpellTask.call(this.mainView, this.task);
        this.spellTaskController.addListeners();
    }



    generateTranslateTask(){
       let taskWord = vocabluary.words[Math.floor(Math.random() * (vocabluary.words.length))];
       this.task = taskWord.key;
       this.curAnswer = taskWord.value;

       this.mainView.translateWord.value = this.task;
    }

    checkAnswer(){
      //  debugger;


        let result;


    //    this.hideTask();

        if(!this.mainView.containerForAnswer.classList.contains('not-displayed')){
            if(Array.isArray(this.curAnswer)){
                result= this.curAnswer.includes(this.mainView.inputAnswer.value);

            } else
                result= this.curAnswer == this.mainView.inputAnswer.value;
        } else{
            //analyze spelling
            result = this.curAnswer == this.analyzeSpelling();


        }

        if(result){
            alert("you are right");
            this.generateSpellFire();


        } else {
            alert("correct answer was -"+ this.curAnswer);
            this.fireBallSpell =  new FireBallSpell(this.mainView, this.ctx);
            this.fireBallSpell.animate();

        }

        this.hideTask();


    }

    analyzeSpelling(){
     //   debugger;
        let result = "";
        this.mainView.getLetters().forEach(
          function(cur){
              result = result.concat(cur.firstChild.textContent);
          }
        );
        return result;
    }


    hideSpellsSelection(){

    }

    generateSpellFire(){
        let imgSpellFire = new Image();
        imgSpellFire.src ="assets/images/spell-fire.png";
        let topCoord = 400, leftCoord = 500;

        let frameIndex = 0;
    //    debugger;
        let ctx = this.ctx;

        this.fire = this.sprite({
            context: ctx,
            width: 950,
            height: 185,
            top: topCoord,
            left: this.monster.bodyWidth+this.monster.leftBody,
            image: imgSpellFire,
            numberOfFrames: 5,
            ticksPerFrame: 8
        });

        imgSpellFire.onload = this.fireLoop.bind(this);
  }

    sprite(options) {

            var that = {},
                frameIndex = 0,
                tickCount = 0,
                ticksPerFrame = options.ticksPerFrame || 0,
                numberOfFrames = options.numberOfFrames || 1;


            that.context = options.context;
            that.width = options.width;
            that.height = options.height;
            that.image = options.image;
            that.top = options.top;
            that.left = options.left;
            that.shouldBeStopped = 0;



            that.update = function () {
                tickCount += 1;

                if (tickCount > ticksPerFrame) {

                    tickCount = 0;

                    // If the current frame index is in range
                    if (frameIndex < numberOfFrames - 1) {
                        // Go to the next frame
                        frameIndex += 1;

                    } else {
                        frameIndex = 0;
                        this.shouldBeStopped = 1;
                    }
                }
            };

            that.draw = function () {

                // Clear the canvas
               // that.context.clearRect(that.left, that.top, that.width, that.height);


                // Draw the animation
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,
                    0,
                    that.width / numberOfFrames,
                    that.height,
                    that.left,
                    that.top,
                    that.width / numberOfFrames,
                    that.height);
            };

            that.clear = function(){
                that.context.clearRect(that.left, that.top, that.width/numberOfFrames, that.height);
            }

            return that;
        }

    fireLoop(){

       // debugger;
        this.fire.update();

        if(!this.fire.shouldBeStopped){
            this.monster.isSpellTime = 1;
         //   debugger;
            this.fire.clear();
            this.monster.clear();

         //   debugger;
            this.monster.draw();
            this.fire.draw();

            //  we could
            // this.generateMonster();


            window.requestAnimationFrame(this.fireLoop.bind(this));
        } else{

            this.fire.clear();
            this.monster.draw();
            this.monster.isSpellTime = 0;
            this.monster.animate();

            this.monster.descreaseHealth();
            if(this.monster.isDead()){
                // round is over
                console.log("monster is dead");
                this.monster.clear();

              //  debugger;

              //temp
                this.hero.animate();

                this.hero.updateScore(this.scoreForRound);
                this.mainView.updateHeroScore(this.hero.score);
                this.mainView.showCongratulations();

               // this.monster = new Monster(this.mainView, this.ctx);



            } else{
                console.log("monsterHealth="+this.monster.health);
                this.mainView.showSpellSection();
            }

        }



    }


    newRound(){
        debugger;
        cancelAnimationFrame(this.hero.animateRef);
        this.mainView.clearCanvas();
        this.mainView.hideCongratulations();
        this.scoreForRound = 100;
        this.mainView.showMonsterName();



        this.monster = new Monster(this.mainView, this.ctx);
        this.hero.drawInInitialPosition();
    }

    finish(){
        

    }



}