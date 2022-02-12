import './sprint.css';
import { getVolumeLocalStorage, ticAudio } from "../../app/audiocontrols";
import  Sprint  from "../../app/sprint";


class SprintView extends Sprint {


public sprintView = () => {
    //-----time before start--------
    const getReadyTime: number = 5;
    const pageContainer: HTMLElement = document.querySelector('.page-container__start-plate') as HTMLElement;
    const sprintContainer: HTMLElement = document.createElement('div');
    sprintContainer.classList.add('sprint-container');
    pageContainer.append(sprintContainer);
    sprintContainer.innerHTML = (`
    <button class="welcome-sprint-button">  
    </button>`);
    const welcomeSprintButton = document.querySelector('.welcome-sprint-button') as HTMLElement;
    this.getCountdown(getReadyTime, welcomeSprintButton, 'GET READY', this.startSprint);
}

private getCountdown = async (timer: number, container: HTMLElement, text = '', func: () => void) => {
    const startFastCountingTime = 6;
    let sec = timer;
    ticAudio.src = require('../../../../assets/audio/clock-ticking-2.mp3');
    ticAudio.loop = true;
    ticAudio.play();
    for (let i = 0; i <= timer; i++) {
        setTimeout(() => {
            container.innerHTML = ` 
    <svg class="countdown-svg" viewBox="0 0 80 80">
    <circle class="circle-background" cx="40" cy="40" r="39.5" stroke-width="1px" style="stroke: rgb(128, 128, 128);"></circle>
    <circle class="circle-progress" cx="40" cy="40" r="39" stroke-width="3px" transform="rotate(-90 40 40)" style="stroke-dasharray: 248.186; stroke-dashoffset: ${248.186 - (248.186 / (timer-1)) * i}; stroke: rgb(40, 195, 138);"></circle>
    <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle" style="">${sec}</text>
    </svg>${text}`;
            if (sec == startFastCountingTime) {
                const countdownText = document.querySelector('.circle-text') as HTMLElement;
                countdownText.classList.add('countdown-ended');
                ticAudio.pause();
                ticAudio.src = require('../../../../assets/audio/clock-ticking-fast.mp3');
                ticAudio.play();
            };
            sec--;
            if (i == timer) {
                ticAudio.pause();
                if (container){
                container.remove();
                func();
                } else return;
            }
        }, i * 1000);
    }
}

public startSprint = async (): Promise<void> => {
    const sprintContainer: HTMLElement = document.querySelector('.sprint-container') as HTMLElement;
    sprintContainer.innerHTML = `
    <div class="sprint-game-container">
        <div class="sprint-game-header">
        <div class="sprint-game-countdown-container">
        <div class="sprint-round-countdown"></div>
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
    this.startSprintRound();
    const roundTimerContainer: HTMLElement = document.querySelector('.sprint-round-countdown') as HTMLElement;
    const roundTime: number = 60;
    this.getCountdown(roundTime, roundTimerContainer, '', this.roundOver);
    getVolumeLocalStorage();
}

};

export default SprintView;