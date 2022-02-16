import './sprint.css';
import {
  getVolumeLocalStorage,
  ticAudio,
  correctAudio,
  audio,
} from "../../app/audiocontrols";
import Sprint from "../../app/sprint";
import {
  sprintRoundStatistic,
  word
} from "../../app/sprint-statistic";

export const timeOuts: Array < NodeJS.Timeout > = [];

class SprintView extends Sprint {

  public sprintView = async () => {
    const getReadyTime: number = 5; //-----time before start--------
    const pageContainer: HTMLElement = document.querySelector('.page-container') as HTMLElement;
    const namingContainer: HTMLElement = document.querySelector('.page-container__naming') as HTMLElement;
    namingContainer.classList.add('filter-gray');
    const menuContainer: HTMLElement = document.querySelector('.header-container__menu') as HTMLElement;
    menuContainer.classList.add('off');
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
    const COUNTDOUNCIRCLELENGTH = 248.186; // 2Pi*R, Px
    const startFastCountingTime = 6;
    let secondsCountdown = timer;
    ticAudio.src = require('../../../../assets/audio/clock-ticking-2.mp3');
    ticAudio.loop = true;
    ticAudio.volume = 0.5;
    ticAudio.play();
    for (let i = 0; i <= timer; i++) {
      timeOuts.push(setTimeout(() => {
        container.innerHTML = ` 
    <svg class="countdown-svg" viewBox="0 0 80 80">
    <circle class="circle-background" cx="40" cy="40" r="39.5" stroke-width="1px" style="stroke: rgb(128, 128, 128);"></circle>
    <circle class="circle-progress" cx="40" cy="40" r="39" stroke-width="3px" transform="rotate(-90 40 40)" style="stroke-dasharray: 248.186; stroke-dashoffset: ${COUNTDOUNCIRCLELENGTH - (COUNTDOUNCIRCLELENGTH / (timer-1)) * i}; stroke: rgb(40, 195, 138);"></circle>
    <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle" style="">${secondsCountdown}</text>
    </svg>${text}`;
        if (secondsCountdown == startFastCountingTime) {
          const countdownText = document.querySelector('.circle-text') as HTMLElement;
          countdownText.classList.add('countdown-ended');
          ticAudio.pause();
          ticAudio.src = require('../../../../assets/audio/clock-ticking-fast.mp3');
          ticAudio.play();
        };
        secondsCountdown--;
        if (i == timer) {
          ticAudio.pause();
          if (container) {
            container.remove();
            func();
          } else return;
        }
      }, i * 1000));
    }
  }

  public startSprint = async (): Promise < void > => {
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
    getVolumeLocalStorage();
    correctAudio.volume = 0.2;
    correctAudio.play();
    this.startSprintRound();
    const roundTimerContainer: HTMLElement = document.querySelector('.sprint-round-countdown') as HTMLElement;
    const roundTime: number = 60;
    this.getCountdown(roundTime, roundTimerContainer, '', this.roundOver);
    getVolumeLocalStorage();
  }

  public renderRoundStatistic = () => {
    const sprintGameContainerBody: HTMLElement = document.querySelector('.sprint-game-body') as HTMLElement;
    const roundStatisticContainer: HTMLElement = document.createElement('div');
    roundStatisticContainer.classList.add('round-statistic-container');
    sprintGameContainerBody.before(roundStatisticContainer);
    roundStatisticContainer.innerHTML = this.renderRoundStatisticContainer();
    const wordsTableContainer: HTMLElement = document.querySelector('.round-statistic-words') as HTMLElement;
    wordsTableContainer.innerHTML = `<table class="round-statistic-table round-statistic-table_correct-answers">
      <thead>
        <tr>
          <th colspan="4">Write answers</th>
        </tr>
      </thead>
      <tbody>${this.renderWordsTable(sprintRoundStatistic.correctAnswers)}</tbody>
    </table>       
       <table class="round-statistic-table round-statistic-table_wrong-answers">
    <thead>
      <tr>
        <th colspan="4">Wrong answers</th>
      </tr>
    </thead>
    <tbody>${this.renderWordsTable(sprintRoundStatistic.wrongAnswers)}</tbody>
  </table> 
        `;
    const wrongButton: HTMLElement = document.querySelector('.sprint-wrong-button') as HTMLElement;
    wrongButton.addEventListener('click', () => {
      roundStatisticContainer.remove();
    });

    roundStatisticContainer.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.round-statistic-audio')) {
        const audioPath = `${SprintView.baseUrl}${target.dataset.audio}`;
        audio.src = audioPath;
        audio.play();
      }
    });

  }



  static wrongAnswersTable = `
    `;

  renderLine = (questionWord: word): string => {
    const view = `
    <tr>
      <td class="round-statistic-audio" data-audio="${questionWord.audio}"></td>
      <td>${questionWord.word}</td>
      <td>${questionWord.transcription}</td>
      <td>${questionWord.wordTranslate}</td>
  </tr>
`;
    return view;
  }

  renderRoundStatisticContainer = (): string => {
    const accuracy = Math.round((sprintRoundStatistic.correctAnswers.length / sprintRoundStatistic.numberOfQuestions) * 100);
    const roundStatisticViewHTML = `
        <div class="round-statistic-results">
    <h3 class="round-statistic-header">RESULTS</h3>
    <table class="round-statistic-statistic">
      <tr>
        <th>Correct answers:</th>
        <th class="round-statistic-correct-answers">${sprintRoundStatistic.correctAnswers.length}</th>
      </tr>
      <tr>
        <th>Wrong answers:</th>
        <th class="round-statistic-wrong-answers">${sprintRoundStatistic.wrongAnswers.length}</th>
      </tr>
      <tr>
        <th>Unbreakable correct answers:</th>
        <th class="round-statistic-best-answers-series">${sprintRoundStatistic.bestCorrectAnswersSeries}</th>
      </tr>
      <tr>
        <th>Accuracy:</th>
        <th class="round-statistic-accuracy">${accuracy}%</th>
      </tr>
    </table>
    <div class="round-statistic-words"></div>
    <button class="sprint-wrong-button">CLOSE</button>
    </div>
    `;
    return roundStatisticViewHTML;
  }

  renderWordsTable = (wordSet: word[]): string => {
    let tableText: string = '';
    wordSet.forEach(element => {
      const tableString = this.renderLine(element);
      tableText += tableString;
    });
    console.log(tableText);
    return tableText;
  }

};

export const newSprint = new SprintView;

