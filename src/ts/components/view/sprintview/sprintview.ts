import './sprint.css';
import { audio, getVolumeLocalStorage, ticAudio } from "../../app/audio/audio";
import { roundOver, startSprintRound } from "../../app/sprint";
export const sprintView = () => {
    const pageContainer = document.querySelector('.page-container__start-plate') as HTMLElement;
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint-container');
    pageContainer.append(sprintContainer);
   sprintContainer.innerHTML = `
    <button class="welcome-sprint-button">  
    </button>`;
    const welcomeSprintButton = document.querySelector('.welcome-sprint-button') as HTMLElement;
    getCountdoun(5, welcomeSprintButton, 'GET READY', startSprint);
}; 



const getCountdoun = async(timer: number, container: HTMLElement, text = '', func: () => void) => {
    let sec = timer;    
    ticAudio.src = require('../../../../assets/audio/clock-ticking-2.mp3');
    ticAudio.loop = true;
   // ticAudio.volume = 1;
    ticAudio.play();
for (let i= 0; i <= timer; i++) {          
    setTimeout(() => {      
    container.innerHTML = ` 
    <svg class="countdoun-svg" viewBox="0 0 80 80">
    <circle class="circle-background" cx="40" cy="40" r="39.5" stroke-width="1px" style="stroke: rgb(128, 128, 128);"></circle>
    <circle class="circle-progress" cx="40" cy="40" r="39" stroke-width="3px" transform="rotate(-90 40 40)" style="stroke-dasharray: 248.186; stroke-dashoffset: ${248.186 - (248.186 / (timer-1)) * i}; stroke: rgb(40, 195, 138);"></circle>
    <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle" style="">${sec}</text>
    </svg>${text}`;
    if (sec == 6) {
        const countdounText = document.querySelector('.circle-text') as HTMLElement;
        countdounText.classList.add('countdoun-ended');
        audio.pause();
    ticAudio.src = require('../../../../assets/audio/clock-ticking-fast.mp3');
    ticAudio.play();
    };
    sec--;    
     if (i == timer) { 
         ticAudio.pause();   
      container.remove();  
        func();
    }
}, i * 1000);
}
};



export const startSprint = async() => {
    const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
    sprintContainer.innerHTML = `
    <div class="sprint-game-container">
        <div class="sprint-game-header">
        <div class="sprint-game-countdoun-container">
        <div class="sprint-round-countdoun"></div>
        </div>
        <div class="sprint-round-score-container">0</div>
        <div class="sprint-game-sound-container"></div>
        <div class="sprint-game-volume-container">
            <label for="volume" class="volume-label">
            <input type="range" value="0.24" min="0" max="1" step="0.01" class="progress" id="volume">
            </label>
        </div>
    </div>
    <div class="sprint-game-body">
    </div>
    <div class="sprint-game-footer">
    </div>`;
    startSprintRound();
    const roundTimerContainer = document.querySelector('.sprint-round-countdoun')as HTMLElement;
    getCountdoun(60, roundTimerContainer, '', roundOver);
    getVolumeLocalStorage();     
};

