import './sprint.css';
import { updateVolume, toggleMute, getVolumeLocalStorage } from "../../app/audio/audio";

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
for (let i= 0; i <= timer; i++) {          
    setTimeout(() => {      
    container.innerHTML = ` 
    <svg class="countdoun-svg" viewBox="0 0 80 80">
    <circle class="circle-background" cx="40" cy="40" r="39.5" stroke-width="1px" style="stroke: rgb(255, 255, 255);"></circle>
    <circle class="circle-progress" cx="40" cy="40" r="39.5" stroke-width="2px" transform="rotate(-90 40 40)" style="stroke-dasharray: 248.186; stroke-dashoffset: ${248.186 - (248.186 / (timer-1)) * i}; stroke: rgb(40, 195, 138);"></circle>
    <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle" style="fill: rgb(255, 255, 255);">${sec}</text>
    </svg>${text}`;
    sec--;    
     if (i == timer) {    
      container.remove();  
        func();
    }
}, i * 1000);
}
};

type word = {
    id: string,
    group: string,
    page: string,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string
};

const getWordsChunk = async(page: number, group: number): Promise<word[]> => {
    const response = await fetch (`https://rs-lang-work-team.herokuapp.com/words?page=${page}&group=${group}`);
    const wordsChunk = await response.json();
    return wordsChunk;
};

const startSprint = async() => {
   // alert('START!');
    const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
    sprintContainer.innerHTML = `
    <div class="sprint-game-container">
        <div class="sprint-game-header">
        <div class="sprint-game-countdoun-container"></div>
        <div class="sprint-round-score-container">0</div>
        <div class="sprint-game-sound-container"></div>
        <div class="sprint-game-volume-container">
        <button type="button" class="mute-label">
            </button>
            <label for="volume" class="volume-label">
                <h2>Громкость</h2>

                <input type="range" value="0.24" min="0" max="1" step="0.01" class="progress" id="volume">
            </label></div>
    </div>
    <div class="sprint-game-body">
    </div>
    <div class="sprint-game-footer">
    </div>`;
    const roundTimerContainer = document.querySelector('.sprint-game-countdoun-container')as HTMLElement;
    getCountdoun(60, roundTimerContainer, '', ()=>{console.log('game over!')});
    //getVolumeLocalStorage();
    toggleMute();
    const volume = document.getElementById('volume') as HTMLInputElement;
    volume.addEventListener('input', updateVolume);
  //  const wordsChunk = await getWordsChunk(0, 0);
  //  console.log(wordsChunk);
};