import { startSprint } from "../view/sprintview/sprintview";

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

const getWordsChunk = async (page: number, group: number): Promise < word[] > => {
    const response = await fetch(`https://rs-lang-work-team.herokuapp.com/words?page=${page}&group=${group}`);
    const wordsChunk = await response.json();
    return wordsChunk;
};

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

// const wordsSet = await getWordsChunk(0, 0);
// const wordsSetFull = await getWordsChunk(0, 0);

// const getSprintQuestion = (wordsSet: word[]): answer => {    
//     const questionWord: word = wordsSet[0];
//     const tempWordsSet = wordsSetFull.filter(element => element !== questionWord);
//     const answersSet: word[] = [];
//     answersSet.push(questionWord);
//     for (let i = 0; i<=1; i++) {
//         const answerWord = getAnswerWord(tempWordsSet);
//         answersSet.push(answerWord);
//         tempWordsSet = tempWordsSet.filter(element => element !== answerWord);
//     };
//     const index: number = getRandomIntInclusive(0, 3);
//     const answer: answer;
//     answer.word= questionWord.word;
//     answer.wordTranslate = questionWord.wordTranslate;
//     answer.answerString = answersSet[index].wordTranslate;    
// return answer;
// };

// const getAnswerWord = (tempWordsSet: word[]): word => {
//     const index: number = getRandomIntInclusive(0, tempWordsSet.length - 1)
//     const answerWord = tempWordsSet[index];
//     return answerWord;
// } 

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
   nextRoundButton.addEventListener('click', startSprint)
};