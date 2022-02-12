import  {newSprint}  from './start';
import StartApp from './start';
import { wordAudio, ticAudio, incorrectAudio, correctAudio, endRoundAudio } from "./audiocontrols";
import {timeOuts} from "../view/sprintview/sprintview";
import OpenGameDifficultyPage from "./game-difficulty";

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

type answer = {
    word: string,
    wordTranslate: string,
    answerString: string,
    questionWord?: word,
    wordForAnswer?: word,
};


let answer: answer = {word: '', wordTranslate: '', answerString: ''};
let wordsSet: Array<word>;
let roundScore: number;

//-----------------Get CHUNK OF Words for Game---------------------------
const baseUrl = 'https://rs-lang-work-team.herokuapp.com/';
let page = 0;
let group = 0;

class Sprint {

 getWordsChunk = async (page: number, group: number): Promise<Array<word>> => {
    const response = await fetch(`${baseUrl}words?page=${page}&group=${group}`);
    const wordsChunk = response.ok? await response.json() as Array<word>: [];
    return wordsChunk;
}
//----------------starting WordSet for develop training------------------


//----------------GET RANDOM NUMBER FUNCTION----------------------------
getRandomIntInclusive = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//--------------get answer/question Object from given wordsSet--------------
//--------------remove question word from wordsSet-----------------------

getSprintQuestion = async(): Promise<void> => {
    console.log(wordsSet)
    const wordsSetFull = await this.getWordsChunk(page, group) as unknown as Array<word>;
    console.log(wordsSetFull);    
    const questionWord: word = wordsSet[0];
    console.log(questionWord)
    wordsSet = wordsSet.filter(element => element !== questionWord);
    let tempWordsSet = wordsSetFull.filter(element => element !== questionWord);
    const answersSet: Array<word> = [];
    answersSet.push(questionWord);
    for (let i = 0; i <= 2; i++) {
        const answerWord = this.getAnswerWord(tempWordsSet);
        answersSet.push(answerWord);
        tempWordsSet = tempWordsSet.filter(element => element !== answerWord);
    };
    const index: number = this.getRandomIntInclusive(0, 2);
    answer = {word: questionWord.word, wordTranslate: questionWord.wordTranslate, answerString: answersSet[index].wordTranslate,
    questionWord: questionWord, wordForAnswer: answersSet[index],
    }; 
    //console.log(answer);   
return;
}

//----------------------get random word for wrong answer---------------

getAnswerWord = (tempWordsSet: Array<word>): word => {
    const index: number = this.getRandomIntInclusive(0, tempWordsSet.length - 1)
    const answerWord = tempWordsSet[index];
    return answerWord;
}

// --------------------END OF ROUND--------------------------------------

public roundOver = (): void=> {
   this.clearCountDownTimeouts();  
    ticAudio.pause();
    endRoundAudio.play(); 
   const questionBody = document.querySelector('.sprint-game-body') as HTMLElement; 
   const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
   questionFooter.innerHTML = `
    <button class="next-round-button">NEXT ROUND?</button>
   <button class="quit-round-button">CANCEL</button>`;
   questionBody.innerHTML = `
   <p>ROUND OVER</p>
   <p>Your Score-${roundScore} </p>`;
   const nextRoundButton = document.querySelector('.next-round-button') as HTMLElement;
   const quitRoundButton = document.querySelector('.quit-round-button') as HTMLElement;
    const roundTimerContainer = document.querySelector('.sprint-round-countdown') as HTMLElement;
    roundTimerContainer?.remove();
   nextRoundButton.addEventListener('click', ()=>{
       page = page < 60? page++ : 0;           
       newSprint.startSprint();
    });   
   quitRoundButton.addEventListener('click', ()=>{
       const startApp = new StartApp();
       startApp.render();
   });
}

//--------------------------CLEAR TIMEOUTS------------------------------
clearCountDownTimeouts = (): void => {
    timeOuts.forEach((element)=>{
        clearTimeout(element);
    })
}

//--------------------------EXIT SPRINT LISTEN--------------------------
exitSprintListen = (): void => {
      const menuContainer: HTMLElement = document.querySelector('.header-container__menu') as HTMLElement;
      menuContainer.classList.remove('off');
      const menuButtons: NodeList = menuContainer.childNodes as NodeList;
      menuButtons.forEach(element => {
          const button = element as HTMLElement;
          button.outerHTML;
          if (button.className !== 'menu__toggle-button') {
          button.addEventListener('click', (): void => {
              this.roundOver();
              const quitRoundButton = document.querySelector('.quit-round-button') as HTMLElement;
              quitRoundButton.click();
          })
        }
      });
  }

//-----------------------RENDER QUESTION  CONTAINER---------------------------------
renderQuestionContainer = () => {
    const questionBody = document.querySelector('.sprint-game-body') as HTMLElement;
    const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
    questionBody.innerHTML = `
    <div class="word-audio"></div>
   <div class="sprint-round-right-answers-count">
   </div>
    <div class="sprint-round-right-answers-cup">
    <div class="kettle"></div>
    </div>
    <div class="sprint-question-word"></div>
    <div class="sprint-answer-word"></div> `;
    questionFooter.innerHTML = `
     <input type="button" value="WRONG" name="wrongbutton" class="sprint-wrong-button">
      <input type="button" value="RIGHT" name="rightbutton" class="sprint-wright-button">
      <label for="wrongbutton"></label>
      <label for="rightbutton"></label>`;    
}

//-----------------RENDER QUESTION---------------------------------
renderSprintQuestion = async() => {
    if (wordsSet.length == 0) {
        this.roundOver();
        return;
    };
    await this.getSprintQuestion();
    const wordContainer = document.querySelector('.sprint-question-word') as HTMLElement;
    const answerContainer = document.querySelector('.sprint-answer-word') as HTMLElement;
    wordContainer.textContent = answer.word;
    answerContainer.textContent = answer.answerString;
    const playWordAudioBtn = document.querySelector('.word-audio') as HTMLElement;
    playWordAudioBtn.addEventListener('click', this.playWordAudio)
    this.getUserAnswer();
}

//--------------------------GET USER ANSWER-----------------------------
getUserAnswer = () => {
    const writeButton = document.querySelector('.sprint-wright-button') as HTMLElement;
    const wrongButton = document.querySelector('.sprint-wrong-button') as HTMLElement;
    if (answer.answerString == answer.wordTranslate) {
    writeButton.addEventListener('click', this.getWriteAnswer);
    wrongButton.addEventListener('click', this.getWrongAnswer);
    } else {
     writeButton.addEventListener('click', this.getWrongAnswer);
    wrongButton.addEventListener('click', this.getWriteAnswer);   
    }
}
 //--------------------------GET WRITE ANSWER---------------------------------------
getWriteAnswer = () => {
    const roundScoreContainer: HTMLElement = document.querySelector('.sprint-round-score-container') as HTMLElement;
    const writeButton: HTMLElement = document.querySelector('.sprint-wright-button') as HTMLElement;
    const wrongButton: HTMLElement = document.querySelector('.sprint-wrong-button') as HTMLElement;
    writeButton.removeEventListener('click', this.getWrongAnswer);
    wrongButton.removeEventListener('click', this.getWriteAnswer);
    writeButton.removeEventListener('click', this.getWriteAnswer);
    wrongButton.removeEventListener('click', this.getWrongAnswer); 
    correctAudio.src = require('../../../assets/audio/correctanswer.mp3');
    correctAudio.play();
    roundScore += 20;
    roundScoreContainer.textContent = `${roundScore}`;
   const rightAnswersCountContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
   const cupContainer = document.querySelector('.sprint-round-right-answers-cup') as HTMLElement;
    const writeAnswersCount: NodeList = rightAnswersCountContainer.childNodes as NodeList;
   const cupNode = document.querySelectorAll('.cup') as NodeList;
   if (writeAnswersCount.length < 3) {
       const sugar = document.createElement('div');
       sugar.classList.add('sugar');
       rightAnswersCountContainer.append(sugar);
   } else {   
       roundScore += 100;
       roundScoreContainer.textContent = `${roundScore}`;   
      rightAnswersCountContainer.innerHTML = '';
      if (cupNode.length < 4) {          
          const cup = document.createElement('div');
          cup.classList.add('cup');
          cupContainer.append(cup);
      } else {        
        cupNode.forEach(el =>{
            const element = el as HTMLElement;
            element.remove()});
      }
   }
    this.renderSprintQuestion();
}

//---------------------GET WRONG ANSWER------------------------------------
getWrongAnswer = () => {
    incorrectAudio.src = require('../../../assets/audio/wronganswer.mp3');   
    incorrectAudio.play();
    const rightAnswersCountContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
    rightAnswersCountContainer.innerHTML = '';
    this.renderSprintQuestion();   
}

//--------------------------GET WORD SOUND--------------------------------
playWordAudio = () => {
  wordAudio.src = `${baseUrl}${answer.questionWord?.audio}`;
  wordAudio.play();  
}
//---------------------------START SPRINT ROUND------------------------------


public startSprintRound = async()=> {
    
    roundScore = 0;
    wordsSet = await this.getWordsChunk(page, group) as unknown as Array<word>;
    this.renderQuestionContainer();
    await this.renderSprintQuestion();
}

public async getGameDifficulty (): Promise<void> {
    const openDifficulty = new OpenGameDifficultyPage;
        await openDifficulty.render('Choose the game level');
    const difficultyButtons: NodeList = document.querySelectorAll('.level-buttons__button');
    const difficultyContainer: HTMLElement = document.querySelector('.game-difficulty-container') as HTMLElement;
    difficultyButtons.forEach((element) => {
      const button: HTMLElement = element as HTMLElement;
      button.addEventListener('click', (): void=>{
        const GameDifficultyLevel: number = Number(button.textContent);
        group = GameDifficultyLevel;
        difficultyContainer.remove();
        newSprint.sprintView();
      });
    });
  } 

}

export default Sprint;