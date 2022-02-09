import { startSprint } from "../view/sprintview/sprintview";
import StartApp from './start';
import { currentVolume, ticAudio, uncorrectAudio, correctAudio } from "./audio/audio";

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
};


let answer: answer = {word: '', wordTranslate: '', answerString: ''};

//-----------------Get CHUNK OF Words for Game---------------------------
const baseUrl = 'https://rs-lang-work-team.herokuapp.com/';
let page = 0;
let group = 0;

const getWordsChunk = async (page: number, group: number): Promise<Array<word>> => {
    const response = await fetch(`${baseUrl}words?page=${page}&group=${group}`);
    const wordsChunk = response.ok? await response.json() as Array<word>: [];
    return wordsChunk;
};
//----------------starting WordSet for develop training------------------
let wordsSet: Array<word>;

//----------------GET RANDOM NUMBER FUNCTION----------------------------
const getRandomIntInclusive = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

//--------------get answer/question Object from given wordsSet--------------
//--------------remove question word from wordsSet-----------------------

const getSprintQuestion = async(): Promise<void> => {
    console.log(wordsSet)
    const wordsSetFull = await getWordsChunk(page, group) as unknown as Array<word>;
    console.log(wordsSetFull);    
    const questionWord: word = wordsSet[0];
    console.log(questionWord)
    wordsSet = wordsSet.filter(element => element !== questionWord);
    let tempWordsSet = wordsSetFull.filter(element => element !== questionWord);
    const answersSet: Array<word> = [];
    answersSet.push(questionWord);
    for (let i = 0; i<=1; i++) {
        const answerWord = getAnswerWord(tempWordsSet);
        answersSet.push(answerWord);
        tempWordsSet = tempWordsSet.filter(element => element !== answerWord);
    };
    const index: number = getRandomIntInclusive(0, 2);
    answer = {word: questionWord.word, wordTranslate: questionWord.wordTranslate, answerString: answersSet[index].wordTranslate};    
    
    console.log(answer);   
return;
};

//----------------------get random word for wrong answer---------------

const getAnswerWord = (tempWordsSet: Array<word>): word => {
    const index: number = getRandomIntInclusive(0, tempWordsSet.length - 1)
    const answerWord = tempWordsSet[index];
    return answerWord;
};

// --------------------END OF ROUND--------------------------------------

export const roundOver = (): void=> {  
    ticAudio.pause(); 
   const questionBody = document.querySelector('.sprint-game-body') as HTMLElement; 
   const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
   questionFooter.innerHTML = `
    <button class="next-round-button">NEXT ROUND?</button>
   <button class="quit-round-button">CANCEL</button>`;
   questionBody.innerHTML = `
   <p>ROUND OVER</p>`;
   const nextRoundButton = document.querySelector('.next-round-button') as HTMLElement;
   const quitRoundButton = document.querySelector('.quit-round-button') as HTMLElement;
    const roundTimerContainer = document.querySelector('.sprint-round-countdoun') as HTMLElement;
    roundTimerContainer?.remove();
   nextRoundButton.addEventListener('click', ()=>{
       page = page < 30? page++ : 0, group++;      
       startSprint();
    });   
   quitRoundButton.addEventListener('click', ()=>{
       const startApp = new StartApp();
       startApp.render();
   });
};

//-----------------------RENDER QUESTION  CONTAINER---------------------------------
const renderQuestionContainer = () => {
    const questionBody = document.querySelector('.sprint-game-body') as HTMLElement;
    const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
    questionBody.innerHTML = `
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
};

//-----------------RENDER QUESTION---------------------------------
const renderSprintQuestion = async() => {
    if (wordsSet.length == 0) {
        roundOver();
        return;
    };
    await getSprintQuestion();
    const wordContainer = document.querySelector('.sprint-question-word') as HTMLElement;
    const answerContainer = document.querySelector('.sprint-answer-word') as HTMLElement;
    wordContainer.textContent = answer.word;
    answerContainer.textContent = answer.answerString;
    getUserAnswer();
};

//--------------------------GET USER UNSWER-----------------------------
const getUserAnswer = () => {
    const writeButton = document.querySelector('.sprint-wright-button') as HTMLElement;
    const wrongButton = document.querySelector('.sprint-wrong-button') as HTMLElement;
    if (answer.answerString == answer.wordTranslate) {
    writeButton.addEventListener('click', getWriteUnswer);
    wrongButton.addEventListener('click', getWrongAnswer);
    } else {
     writeButton.addEventListener('click', getWrongAnswer);
    wrongButton.addEventListener('click', getWriteUnswer);   
    }
};

const getWriteUnswer = () => {
    const roundScoreContainer = document.querySelector('.sprint-round-score-container') as HTMLElement;
    const writeButton = document.querySelector('.sprint-wright-button') as HTMLElement;
    const wrongButton = document.querySelector('.sprint-wrong-button') as HTMLElement;
    writeButton.removeEventListener('click', getWrongAnswer);
    wrongButton.removeEventListener('click', getWriteUnswer);
    writeButton.removeEventListener('click', getWriteUnswer);
    wrongButton.removeEventListener('click', getWrongAnswer); 
    correctAudio.src = require('../../../assets/audio/correctanswer.mp3');
    //correctAudio.volume = currentVolume;
    correctAudio.play();
    roundScore += 20;
    roundScoreContainer.textContent = `${roundScore}`
   const rightAnswersCountContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
   const cupContainer = document.querySelector('.sprint-round-right-answers-cup') as HTMLElement;
    const writeAnswersCount = rightAnswersCountContainer.childNodes as NodeList;
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
renderSprintQuestion();
};

//---------------------GET WRONG ANSWER------------------------------------
const getWrongAnswer = () => {
    uncorrectAudio.src = require('../../../assets/audio/wronganswer.mp3');   
    //uncorrectAudio.volume = currentVolume;
    uncorrectAudio.play();
    const rightAnswersCountContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
    rightAnswersCountContainer.innerHTML = '';
    renderSprintQuestion();   
};

//---------------------------START SPRINT ROUND------------------------------
let roundScore: number;

export const startSprintRound = async()=> {
    roundScore = 0;
    wordsSet = await getWordsChunk(page, group) as unknown as Array<word>;
    renderQuestionContainer();
    await renderSprintQuestion();
    

};