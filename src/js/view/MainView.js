
export class MainView{
    constructor(){
        this.init();
    }

    init(){
        this.canvas = document.getElementById("gameCanvas");
        this.canvasHeight = this.canvas.height;
        this.canvasWidth = this.canvas.width;

        console.log("canvasHeight="+this.canvasHeight);
        console.log("canvasWidth="+this.canvasWidth);

        this.ctx = this.canvas.getContext("2d");

        this.sectionGreeting = document.querySelector('.greeting');
        this.btnStart = document.querySelector('#idBtnStart');

        this.sectionRegistration = document.querySelector('.registration');
        this.registrationForm = document.querySelector('#registration-form');
        this.regNickName = document.querySelector('#nickName');
        this.btnRegisterPlayer = document.querySelector('#idBtnNewPlayer');


        this.btnStartRound = document.querySelector('#idBtnStartRound');
        this.gameContainer = document.querySelector('.game-container');
        this.gameWindow = document.querySelector('.game-window');
        this.monsterNameSection = document.querySelector('.monster-name');
        this.monsterName = document.querySelectorAll('.generated-name');
        this.roundNumber = document.querySelector('.roundNumber');

        this.monsterHealth = document.querySelector(".rectangle.monster");
        this.heroHealth = document.querySelector(".rectangle.hero");

       // console.dir(this.monsterHealth.width);


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


     /*   this.letters = document.querySelector('#letters');
        console.dir(this.letters);
*/

        this.translateTask = document.querySelector('#translateTask');
        this.translateWord = document.querySelector('#translateKey');


        this.containerForAnswer = document.querySelector('#containerForAnswer');



        this.inputAnswer = document.querySelector('#inputAnswer');
        this.btnCheckAnswer = document.querySelector('#btnCheckAnswer');
        this.taskHint = document.querySelector('.task-hint');


        this.sectionRoundEnd = document.querySelector('.round-end');
        this.heroScore = document.querySelector('.hero-score');
        this.btnNewRound = document.querySelector('#idBtnNewRound');
        this.btnFinish = document.querySelector('#idBtnFinish');
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

    showMonsterName(){
        this.monsterNameSection.classList.remove("not-displayed");
    }




    updateMonsterName(newName){
        this.monsterName.forEach(cur => cur.textContent = newName);
    }

    updateMonsterHealth(value){

    }



    hideMonsterName(){
        this.monsterNameSection.classList.add("not-displayed");
    }

    showSpellSection(){
        this.modalWindow.classList.remove("not-displayed");
        this.sectionSpells.classList.remove("not-displayed");
    }

    clearInputAnswer(){
        debugger;
        this.inputAnswer.value="";
    }


    createSpellTask(newWord) {
        let mainView = this;
        let letters = Array.from(newWord);
        console.log("letters=" + letters);

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
        debugger;
        this.taskHint.textContent = newValue;
    }

    getLetters(){
        return document.querySelectorAll('#letters .letter');
    }

    showCongratulations(){
        console.dir(this);
        this.sectionRoundEnd.classList.remove('not-displayed');
    }

    hideCongratulations(){
        console.dir(this);
        this.sectionRoundEnd.classList.add('not-displayed');
    }


    updateHeroScore(value){
        this.heroScore.textContent = value;
    }


    clearCanvas(){
        this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    }



}