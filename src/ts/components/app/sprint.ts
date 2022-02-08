import { startSprint } from "../view/sprintview/sprintview";
import StartApp from './start';

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


let answer: answer;

//-----------------Get CHUNK OF Words for Game---------------------------
const baseUrl = 'https://rs-lang-work-team.herokuapp.com/';
let page = 0;
let group = 0;

const getWordsChunk = async (page: number, group: number): Promise<word[]> => {
    const response = await fetch(`${baseUrl}words?page=${page}&group=${group}`);
    const wordsChunk = response.ok? await response.json(): [];
    return wordsChunk;
};
//----------------starting WordSet for develop training------------------
let wordsSet = getWordsChunk(0, 0);

//----------------GET RANDOM NUMBER FUNCTION----------------------------
const getRandomIntInclusive = (min: number, max: number): number => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//  const wordsChunk = await getWordsChunk(0, 0);
//  console.log(wordsChunk);
const wordContainer = document.querySelector('.sprint-question-word') as HTMLElement;
const answerContainer = document.querySelector('.sprint-answer-word') as HTMLElement;
const rightAnswersContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
const cupContainer = document.querySelector('.sprint-round-right-answers-cup') as HTMLElement;
const questionBody = document.querySelector('.sprint-game-body') as HTMLElement;

 
//--------------get answer/question Object from given wordsSet--------------
//--------------remove question word from wordsSet-----------------------

const getSprintQuestion = async(wordsSet: word[]): Promise<void> => {
    const wordsSetFull = getWordsChunk(page, group) as unknown as word[];    
    const questionWord: word = wordsSet[0];
    wordsSet = wordsSet.filter(element => element !== questionWord);
    let tempWordsSet = wordsSetFull.filter(element => element !== questionWord);
    const answersSet: word[] = [];
    answersSet.push(questionWord);
    for (let i = 0; i<=1; i++) {
        const answerWord = getAnswerWord(tempWordsSet);
        answersSet.push(answerWord);
        tempWordsSet = tempWordsSet.filter(element => element !== answerWord);
    };
    const index: number = getRandomIntInclusive(0, 3);//     
    answer.word= questionWord.word;
    answer.wordTranslate = questionWord.wordTranslate;
    answer.answerString = answersSet[index].wordTranslate; 
    console.log(answer);   
return;
};

//----------------------get random word for wrong answer---------------

const getAnswerWord = (tempWordsSet: word[]): word => {
    const index: number = getRandomIntInclusive(0, tempWordsSet.length - 1)
    const answerWord = tempWordsSet[index];
    return answerWord;
};

// --------------------END OF ROUND--------------------------------------

export const roundOver = (): void=> {
   const questionBody = document.querySelector('.sprint-game-body') as HTMLElement; 
   const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
   questionFooter.innerHTML = '';
   questionBody.innerHTML = `
   <p>ROUND OVER</p>
   <button class="next-round-button">NEXT ROUND?</button>
   <button class="quit-round-button">CANCEL</button>`;
   const nextRoundButton = document.querySelector('.next-round-button') as HTMLElement;
   const quitRoundButton = document.querySelector('.quit-round-button') as HTMLElement;
   nextRoundButton.addEventListener('click', ()=>{
       page = page < 30? page++ : 0, group++;
       startSprint();
    });   
   quitRoundButton.addEventListener('click', ()=>{
       const startApp = new StartApp();
       startApp.render();
   });
};