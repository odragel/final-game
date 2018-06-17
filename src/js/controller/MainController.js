import {MainView} from "../view/MainView";
import {SpellTaskController} from "./SpellTaskController.js";
import {Monster} from "../model/Monster";
import {Hero} from "../model/Hero";
import {FireBallSpell} from "../model/FireBallSpell";
import {FireSpell} from "../model/FireSpell";


import * as HINTS from "../constants/hints";
import * as SETTINGS from "../constants/settings";

import vocabluary from "../../../assets/json/vocabluary.json";
import spellFire from "../../../assets/json/spell-fire.json";
import {SPELL_FIRE} from "../constants/settings";

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
        debugger;
        this.mainView.updateMonsterHealth(this.monster.health);

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
            this.hero = new Hero(this.mainView, this.ctx, this.mainView.regNickName.value);
            this.mainView.updateHeroName(this.hero.name);
            this.mainView.updateHeroHealth(this.hero.health);
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
        let result;
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
          /*  alert("you are right");*/
            this.spell = new FireSpell(this.mainView, this.ctx, SPELL_FIRE.monster.left, SPELL_FIRE.monster.top, this.monster);
            this.spell.animate();

            this.monster.descreaseHealth();


            if(this.monster.isDead()){
                // round is over
                console.log("monster is dead");
                debugger;
/*
                cancelAnimationFrame(this.spell.animateRef);

                this.spell.clear();
                this.monster.clear();
*/



                //temp
                this.hero.animate();
                this.hero.updateScore(this.hero.health);

                this.mainView.updateHeroScore(this.hero.score);
                this.mainView.showCongratulations();

                // this.monster = new Monster(this.mainView, this.ctx);



            } else{


                this.mainView.showSpellSection();
            }



          //  this.generateSpellFire();



        } else {
            alert("correct answer was -"+ this.curAnswer);
           /* this.fireBallSpell =  new FireBallSpell(this.mainView, this.ctx);
            this.fireBallSpell.animate();
            */
           this.spell = new FireSpell(this.mainView, this.ctx, SPELL_FIRE.hero.left, SPELL_FIRE.hero.top, this.hero);
           this.spell.animate();

            this.hero.descreaseHealth();
            if(this.hero.isDead()){
                this.heroHasLost();
            } else {
                this.mainView.showSpellSection();
            }

        }

        this.hideTask();


    }

    analyzeSpelling(){

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

    newRound(){
        cancelAnimationFrame(this.hero.animateRef);
        this.mainView.clearCanvas();
        this.mainView.hideCongratulations();
        this.mainView.showMonsterName();


        this.mainView.updateCanvasBackground();
        this.monster = new Monster(this.mainView, this.ctx);
        this.hero.drawInInitialPosition();
    }

    finish(){
        cancelAnimationFrame(this.hero.animateRef);
        let results = this.analyzeResults({name: this.hero.name, score: this.hero.score});
        this.mainView.showScore(results);
    }


    heroHasLost(){

    }

    analyzeResults(curResult){
        let isInserted = 0;
        let savedResults = JSON.parse(window.localStorage.getItem('scores'));
        if(!savedResults){
            savedResults = [];
            savedResults.push(curResult);
            window.localStorage.setItem('scores', JSON.stringify(savedResults));
        }else{
            for(let i = 0; i < savedResults.length; i++){
                if(savedResults[i].score < curResult.score){
                    savedResults.splice(i, 0, curResult);
                    isInserted = 1;
                    break;
                } else if(savedResults[i].score === curResult.score){
                    savedResults.splice(i, 0, curResult);
                    isInserted = 1;
                    break;
                }
            }
            if(!isInserted){
                savedResults.push(curResult);
            }

            //we save only first 10 results
            if(savedResults.length > 10){
                savedResults = savedResults.slice(0, 10);

            }

            window.localStorage.setItem('scores', JSON.stringify(savedResults));
        }
        return savedResults;
    }



}