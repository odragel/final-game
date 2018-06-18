export class AudioEffect {
    constructor(sound){
        this.sound = sound;
    }

    play(){
        this.sound.play();
    }

    stop(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }

}