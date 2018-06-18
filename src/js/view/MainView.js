import * as SETTINGS from "../constants/settings";

export class MainView{
    constructor(){
        this.init();
    }

    init(){
        this.roundFinishEvent = document.createEvent('Event');
        this.roundFinishEvent.initEvent("roundFinish", false, false);


        this.canvas = document.getElementById("gameCanvas");
        this.canvasHeight = this.canvas.height;
        this.canvasWidth = this.canvas.width;
        this.ctx = this.canvas.getContext("2d");

        this.updateCanvasBackground();

        this.fireAudio = document.getElementById("fireAudio");

        this.sectionGreeting = document.querySelector('.greeting');
        this.btnStart = document.querySelector('#idBtnStart');

        this.btnCloseImage = document.querySelector('#idCloseImg');
        this.btnPrevImage = document.querySelector('#idPrevImg');
        this.btnNextImage = document.querySelector('#idNextImg');
        this.allGamePlayImg = Array.from(document.querySelectorAll('.game-play-img'));
        this.sectionNotifWindow = document.querySelector('.notification-window');
        this.openedImage = document.querySelector('.opened-image');

        this.sectionRegistration = document.querySelector('.registration');
        this.registrationForm = document.querySelector('#registration-form');
        this.regNickName = document.querySelector('#nickName');
        this.btnRegisterPlayer = document.querySelector('#idBtnNewPlayer');


        this.btnStartRound = document.querySelector('#idBtnStartRound');
        this.gameContainer = document.querySelector('.game-container');
        this.gameWindow = document.querySelector('.game-window');
        this.monsterNameSection = document.querySelector('.monster-name');

        this.monsterName = document.querySelectorAll('.generated-name');
        this.heroName = document.querySelector('.hero-name');

        this.roundNumber = document.querySelector('.roundNumber');

        this.monsterHealth = document.querySelector(".health-score.monster");
        this.heroHealth = document.querySelector(".health-score.hero");


        this.modalWindow = document.querySelector('.modal-window');
        this.sectionSpells = document.querySelector('#spell-window');
        this.spells = document.querySelector('.spells');


        this.taskWindow = document.querySelector('.task-window');
        this.allTasks = document.querySelectorAll('.task-window article');



        this.mathTask = document.querySelector('#mathTask');
        this.firstMath = document.querySelector('#firstMath');
        this.symbolMath = document.querySelector('#symbolMath');
        this.secondMath = document.querySelector('#secondMath');



        this.audioTask = document.querySelector('#audioTask');
        this.btnPlayAudio = document.querySelector('.btnPlayAudio');



        this.spellTask = document.querySelector('#spellTask');
        this.spellTaskContainer = document.querySelector('spell-task-container');
        this.letters = document.querySelectorAll('#letters .letter');
        this.lettersContainer = document.querySelector('#letters');

        this.translateTask = document.querySelector('#translateTask');
        this.translateWord = document.querySelector('#translateKey');


        this.containerForAnswer = document.querySelector('#containerForAnswer');

        this.inputAnswer = document.querySelector('#inputAnswer');
        this.btnCheckAnswer = document.querySelector('#btnCheckAnswer');
        this.taskHint = document.querySelector('.task-hint');

        this.containerAnswerResult = document.querySelector('.container-answer-result');
        this.textAnswerResult = document.querySelector('.answer-result');

        this.sectionRoundEnd = document.querySelector('.round-end');
        this.heroScore = document.querySelector('.hero-score');
        this.btnNewRound = document.querySelector('#idBtnNewRound');
        this.btnFinish = document.querySelector('#idBtnFinish');


        this.gameFinish = document.querySelector('.game-finish');

        this.score = document.querySelector('#score-content');
        this.score.innerHTML='';
        this.btnPlayNewGame = document.querySelector("#idBtnNewGame");
        this.btnPlayWithNewNickname = document.querySelector("#idBtnStartWithName");

        this.gameLost = document.querySelector('.game-over');

        this.sectionGamePlay = document.querySelector(".game-play");
    }

    openImage(elem){
        this.curImageIndex = elem.getAttribute("data-nr");
        this.openedImage.setAttribute("src", elem.getAttribute("src"));
        this.sectionNotifWindow.classList.remove("not-displayed");
    }

    closeNotifWindow(){
        this.sectionNotifWindow.classList.add("not-displayed");
    }

    nextImage(){
       this.curImageIndex++;
       if(this.curImageIndex == this.allGamePlayImg.length){
           this.curImageIndex = 0;
       }
       this.openedImage.setAttribute("src", (this.allGamePlayImg[this.curImageIndex]).getAttribute("src"));
    }

    prevImage(){
        this.curImageIndex--;
        if(this.curImageIndex < 0){
            this.curImageIndex = this.allGamePlayImg.length-1;
        }
        this.openedImage.setAttribute("src", (this.allGamePlayImg[this.curImageIndex]).getAttribute("src"));
    }



    emptyNickField(){
        this.regNickName.value="";
    }

    showRegistration(){
        this.sectionGreeting.classList.add('not-displayed');
        this.sectionRegistration.classList.remove('not-displayed');
    }


    showGameScreen(){
        this.sectionRegistration.classList.add('not-displayed');
        this.modalWindow.classList.remove("not-displayed");
        this.monsterNameSection.classList.remove("not-displayed");

        this.gameContainer.classList.remove("not-displayed");
        this.gameWindow.classList.remove("not-displayed");
    }

    hideGameScreen(){
        this.modalWindow.classList.add("not-displayed");
        this.gameContainer.classList.add("not-displayed");
    }



    showGameLostSection(){
        this.gameContainer.classList.add("not-displayed");
        this.gameLost.classList.remove('not-displayed');
    }

    showMonsterName(){
        this.monsterNameSection.classList.remove("not-displayed");
    }

    updateMonsterName(newName){
        this.monsterName.forEach(cur => cur.textContent = newName);
    }

    updateHeroName(newName){
        this.heroName.textContent = newName;
    }

    updateMonsterHealth(value){
        this.monsterHealth.textContent = value;
    }

    updateHeroHealth(value){
        this.heroHealth.textContent = value;
    }

    hideMonsterName(){
        this.monsterNameSection.classList.add("not-displayed");
    }

    showSpellSection(){
        this.modalWindow.classList.remove("not-displayed");
        this.sectionSpells.classList.remove("not-displayed");
    }

    clearInputAnswer(){
        this.inputAnswer.value="";
    }


    createSpellTask(newWord) {
        let mainView = this;
        let letters = Array.from(newWord);

        letters.forEach((cur, index) => {
            let newIndex = Math.floor(Math.random() * Math.floor(letters.length - 1));
        [letters[index], letters[newIndex]] =[letters[newIndex], letters[index]] ;
    });

        mainView.lettersContainer.innerHTML="";


        letters.forEach(
            function (cur) {
                let curLi = document.createElement('li');
                curLi.classList.add('letter');
                curLi.draggable = "true";

                let header = document.createElement('header');
                header.textContent = cur;

                curLi.appendChild(header);
                mainView.lettersContainer.appendChild(curLi);
            }
        );

    }

    updateTaskHint(newValue){
        this.taskHint.textContent = newValue;
    }

    getLetters(){
        return document.querySelectorAll('#letters .letter');
    }

    showAnswerResult(isCorrect){
        if(isCorrect){
            this.textAnswerResult.textContent = SETTINGS.CORRECT_ANSWER;
        } else {
            this.textAnswerResult.textContent = SETTINGS.INCORRECT_ANSWER;
        }

        this.containerAnswerResult.classList.remove('not-displayed');
    }

    hideAnswerResult(){
        this.containerAnswerResult.classList.add('not-displayed');
    }


    showCongratulations(){
        this.sectionRoundEnd.classList.remove('not-displayed');
    }

    hideCongratulations(){
        this.sectionRoundEnd.classList.add('not-displayed');
    }


    updateHeroScore(value){
        this.heroScore.textContent = value;
    }

    clearCanvas(){
        this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    }

    updateCanvasBackground(){
        let randomIndex = Math.floor(Math.random()*(SETTINGS.PATTERN.length-1));
        let newBackground = SETTINGS.PATTERN[randomIndex];
        this.canvas.style.background = "url("+newBackground+")";
    }

    showScore(scores){
            this.gameContainer.classList.add('not-displayed');
            this.gameFinish.classList.remove('not-displayed');


            if(!this.gameLost.classList.contains('not-displayed')){
                this.gameLost.classList.add('not-displayed');
            }

            this.score.innerHTML="";

            scores.forEach((cur) => {
                let span1 = document.createElement('span');
                span1.textContent = cur.name;

                let span2 = document.createElement('span');
                span2.textContent = cur.score;

                this.score.appendChild(span1);
                this.score.appendChild(span2);
            });

        }

     hideScore(){
         this.gameFinish.classList.add('not-displayed');
         this.gameContainer.classList.remove('not-displayed');
     }


}