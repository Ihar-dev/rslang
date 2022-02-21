import {
    StartApp
} from './start';
import {
    wordAudio,
    ticAudio,
    incorrectAudio,
    correctAudio,
    endRoundAudio
} from "./audiocontrols";
import {
    timeOuts,
    newSprint
} from "../view/sprintview/sprintview";

import OpenGameDifficultyPage from "./game-difficulty";
import {
    sprintRoundStatistic, userWord
} from "./sprint-statistic";

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

type rslangWordsSettings = {
    group: string,
    page: string
}

type answer = {
    word: string,
    wordTranslate: string,
    answerString: string,
    questionWord: word,
    wordForAnswer: word,
};

let answer: answer;
let wordsSet: Array < word > = [];
let wordsSetFull: Array < word > = [];
let roundScore: number;
let savedWordsFromStudyBook: string = '';

//-----------------Get CHUNK OF Words for Game---------------------------

let page = 0;
let group = 0;

class Sprint {

    static baseUrl = 'https://rs-lang-work-team.herokuapp.com/';

    getWordsChunk = async (page: number, group: number): Promise < Array < word >> => {
        const response = await fetch(`${Sprint.baseUrl}words?page=${page}&group=${group}`);
        const wordsChunk = response.ok ? await response.json() as Array < word > : [];
        return wordsChunk;
    }

    getRandomIntInclusive = (min: number, max: number): number => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //max and min includes
    }

    getSprintQuestion = async (): Promise < void > => {
        const questionWord: word = wordsSet[0];
        wordsSet = wordsSet.filter(element => element !== questionWord);
        let tempWordsSet = wordsSetFull.filter(element => element !== questionWord);
        const answersSet: Array < word > = [];
        answersSet.push(questionWord);
        for (let i = 0; i <= 2; i++) {
            const answerWord = this.getAnswerWord(tempWordsSet);
            answersSet.push(answerWord);
            tempWordsSet = tempWordsSet.filter(element => element !== answerWord);
        };
        const index: number = this.getRandomIntInclusive(0, 2);
        answer = {
            word: questionWord.word,
            wordTranslate: questionWord.wordTranslate,
            answerString: answersSet[index].wordTranslate,
            questionWord: questionWord,
            wordForAnswer: answersSet[index],
        };
    }

    getAnswerWord = (tempWordsSet: Array < word > ): word => {
        const index: number = this.getRandomIntInclusive(0, tempWordsSet.length - 1)
        const answerWord = tempWordsSet[index];
        return answerWord;
    }

    public roundOver = (): void => {
        this.clearCountDownTimeouts();
        ticAudio.pause();
        endRoundAudio.play();
        const questionBody = document.querySelector('.sprint-game-body') as HTMLElement;
        const questionFooter = document.querySelector('.sprint-game-footer') as HTMLElement;
        questionFooter.innerHTML = `
    <button class="next-round-button">NEXT?</button>
   <button class="quit-round-button">CANCEL</button>`;
        questionBody.innerHTML = `
   <p>ROUND OVER</p>
   <p>Your Score-${roundScore} </p>
   <button class="sprint-wright-button">GET ROUND STATISTIC</button>`;
        sprintRoundStatistic.sortRoundWords();
        const writeButton = document.querySelector('.sprint-wright-button') as HTMLElement;
        writeButton.addEventListener('click', () => {
            newSprint.renderRoundStatistic();
        });
        const nextRoundButton = document.querySelector('.next-round-button') as HTMLElement;
        const quitRoundButton = document.querySelector('.quit-round-button') as HTMLElement;
        const roundTimerContainer = document.querySelector('.sprint-round-countdown') as HTMLElement;
        if (roundTimerContainer) roundTimerContainer.remove();
        nextRoundButton.addEventListener('click', () => {
            console.log(page);
            if (page < 30) {page++} else page = 0;
            console.log(page);
            newSprint.startSprint();
        });
        quitRoundButton.addEventListener('click', () => {
            window.removeEventListener('keydown', this.keyboardListen);
            const namingContainer: HTMLElement = document.querySelector('.page-container__naming') as HTMLElement;
            const homeButton: HTMLElement = document.querySelector('.menu__home-button') as HTMLElement;
            namingContainer.classList.remove('filter-gray');
            namingContainer.classList.remove('naming-sprint');
            homeButton.click();
        });
    }

    clearCountDownTimeouts = (): void => {
        timeOuts.forEach((element) => {
            clearTimeout(element);
        })
    }

    exitSprintListen = (): void => {
        const menuContainer: HTMLElement = document.querySelector('.header-container__menu') as HTMLElement;
        menuContainer.classList.remove('off');
        const menuButtons: NodeList = menuContainer.childNodes as NodeList;
        menuButtons.forEach(element => {
            const button = element as HTMLElement;
            button.outerHTML;
            if (button.className !== 'menu__toggle-button') {
                button.addEventListener('click', (): void => {
                    sprintRoundStatistic.sortRoundWords();
                    const namingContainer: HTMLElement = document.querySelector('.page-container__naming') as HTMLElement;
                    namingContainer.classList.remove('filter-gray');
                    namingContainer.classList.remove('naming-sprint');
                    this.clearCountDownTimeouts();
                    ticAudio.pause();
                })
            }
        });
    }

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
      <input type="button" value="CORRECT" name="rightbutton" class="sprint-wright-button">
      <label for="wrongbutton" class="answer-buttons-label">&#11013;</label>
      <label for="rightbutton" class="answer-buttons-label">&#10145;</label>`;
    }

    renderSprintQuestion = async () => {
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
        playWordAudioBtn.addEventListener('click', this.playWordAudio);
        sprintRoundStatistic.numberOfQuestions++;
        this.getUserAnswer();
    }

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
        window.addEventListener('keydown', this.keyboardListen);
    }

    keyboardListen = (event: KeyboardEvent): void => {
        if (event.defaultPrevented) {
            return;
        }
        const writeButton: HTMLElement = document.querySelector('.sprint-wright-button') as HTMLElement;
        const wrongButton: HTMLElement = document.querySelector('.sprint-wrong-button') as HTMLElement;
        switch (event.key) {
            case "Left":
            case "ArrowLeft":
                wrongButton.click();
                break;
            case "Right":
            case "ArrowRight":
                writeButton.click();
                break;
            case "Enter":
                writeButton.click();
                break;
            case "Esc":
            case "Escape":
                wrongButton.click();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    getWriteAnswer = () => {
        sprintRoundStatistic.correctAnswers.push(answer.questionWord);
        sprintRoundStatistic.correctAnswersSeries++;
        sprintRoundStatistic.bestCorrectAnswersSeries = sprintRoundStatistic.correctAnswersSeries > sprintRoundStatistic.bestCorrectAnswersSeries ? sprintRoundStatistic.correctAnswersSeries : sprintRoundStatistic.bestCorrectAnswersSeries;
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
                cupNode.forEach(el => {
                    const element = el as HTMLElement;
                    element.remove()
                });
            }
        }
        this.renderSprintQuestion();
    }


    getWrongAnswer = () => {
        sprintRoundStatistic.wrongAnswers.push(answer.questionWord);
        sprintRoundStatistic.correctAnswersSeries = 0;
        const writeButton: HTMLElement = document.querySelector('.sprint-wright-button') as HTMLElement;
        const wrongButton: HTMLElement = document.querySelector('.sprint-wrong-button') as HTMLElement;
        writeButton.removeEventListener('click', this.getWrongAnswer);
        wrongButton.removeEventListener('click', this.getWriteAnswer);
        writeButton.removeEventListener('click', this.getWriteAnswer);
        wrongButton.removeEventListener('click', this.getWrongAnswer);
        incorrectAudio.src = require('../../../assets/audio/wronganswer.mp3');
        incorrectAudio.play();
        const rightAnswersCountContainer = document.querySelector('.sprint-round-right-answers-count') as HTMLElement;
        rightAnswersCountContainer.innerHTML = '';
        this.renderSprintQuestion();
    }

    playWordAudio = () => {
        wordAudio.src = `${Sprint.baseUrl}${answer.questionWord?.audio}`;
        wordAudio.play();
    }

    resetRoundStatistic = (): void => {
        roundScore = 0;
        sprintRoundStatistic.numberOfQuestions = 0;
        sprintRoundStatistic.correctAnswers.length = 0;
        sprintRoundStatistic.wrongAnswers.length = 0;
        sprintRoundStatistic.correctAnswersSeries = 0;
        sprintRoundStatistic.bestCorrectAnswersSeries = 0;
    }

    public startSprintRound = async () => {
        this.resetRoundStatistic();
        if (savedWordsFromStudyBook.length > 0) {          
            savedWordsFromStudyBook = '';
        } else {
        wordsSetFull = await this.getWordsChunk(page, group) as unknown as Array < word > ;
        wordsSet = await this.getWordsChunk(page, group) as unknown as Array < word > ;
        }
        this.renderQuestionContainer();
        await this.renderSprintQuestion();
    }

    public async getGameDifficulty(): Promise < void > {
        const body: HTMLElement = document.querySelector('body') as HTMLElement;
        body.classList.remove('book');
        if (localStorage.getItem('rslang-words-data')) {
            savedWordsFromStudyBook = localStorage.getItem('rslang-words-data') as string;
            console.log(`332`);
            if (savedWordsFromStudyBook.length > 0) {
            await this.filterWordsForRound();
            } else {
              const bookButton: HTMLElement = document.querySelector('.menu__book-button')as HTMLElement;
        bookButton.click();
        console.log('find no words');  
            } 
         } else {
        const openDifficulty = new OpenGameDifficultyPage;
        await openDifficulty.render('Choose the game level');
        const difficultyButtons: NodeList = document.querySelectorAll('.level-buttons__button');
        const difficultyContainer: HTMLElement = document.querySelector('.game-difficulty-container') as HTMLElement;
        difficultyButtons.forEach((element) => {
            const button: HTMLElement = element as HTMLElement;
            button.addEventListener('click', (): void => {
                const GameDifficultyLevel: number = Number(button.textContent) - 1;
                group = GameDifficultyLevel;
                difficultyContainer.remove();
                newSprint.sprintView();
            });
        });
    }
    }

    getWordsFromStudyBook = async () => {
        if (localStorage.getItem('rslang-words-data')) {
            savedWordsFromStudyBook = localStorage.getItem('rslang-words-data') as string;            
            if (savedWordsFromStudyBook.length > 0) {                
                const rslangBookSettings: string = localStorage.getItem('rslang-words-settings') as string;
                const bookSettings: rslangWordsSettings = JSON.parse(rslangBookSettings) as rslangWordsSettings;
                page = Number(bookSettings.page);
                group = Number(bookSettings.group);
            } else return;
        } else return;
    }

    filterWordsForRound = async(): Promise<void> => {
        console.log(`365`);
        wordsSet.length =  0;
        console.log(`366`);
        wordsSetFull.length = 0;
        console.log(`368`);
        const rslangBookSettings: string = localStorage.getItem('rslang-words-settings') as string;
                const bookSettings: rslangWordsSettings = JSON.parse(rslangBookSettings) as rslangWordsSettings;
                let filteredPage = Number(bookSettings.page);
                page = filteredPage;
                let group = Number(bookSettings.group);
        let wordsFromStudyBook: word[] = await this.getWordsChunk(filteredPage, group) as word[];
        const filteredWordsForRound: word[] = [];
         while (filteredWordsForRound.length < 20 && page >= 0) {
        await wordsFromStudyBook.forEach(async (element) => {
            const wordId: string = element.id;
            const word: userWord | null = await sprintRoundStatistic.getUserWord(wordId) as unknown as userWord | null;
            if (word !== null) {
            switch (word.difficulty) {
                case 'hard':                    
                    if (Number(word.optional.correctAnswersCount) < 5) {
                       filteredWordsForRound.push(element); 
                       break;
                       } else break;
                case 'studied':
                    if (Number(word.optional.correctAnswersCount) < 3) {
                       filteredWordsForRound.push(element);
                       break;
                    } else break;          
                default:
                    break;
            }
        } else filteredWordsForRound.push(element);
        });       
            filteredPage = filteredPage-1;
            wordsFromStudyBook = await this.getWordsChunk(filteredPage, group);
        } 
        console.log(filteredWordsForRound.length);
        if (filteredWordsForRound.length > 0) {
        filteredWordsForRound.forEach(element => {
            wordsSetFull.push(element);
            wordsSet.push(element);           
        });
        localStorage.setItem('rslang-words-data', ''); 
        newSprint.sprintView();
    } else {
        const bookButton: HTMLElement = document.querySelector('.menu__book-button') as HTMLElement;
        bookButton.click();
        console.log('find no words')
    }
        
    }

}

export default Sprint;