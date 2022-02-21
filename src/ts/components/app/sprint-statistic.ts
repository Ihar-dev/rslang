import {
  settings,
  StartApp
} from './start';
import { StudyBook } from "./study-book";
import {Statistics} from './statistics';

const studyBook = new StudyBook;

interface RoundStatistic {
  numberOfQuestions: number,
    correctAnswers: Array < word > ,
    wrongAnswers: Array < word > ,
    correctAnswersSeries: number,
    bestCorrectAnswersSeries: number,
};

export type word = {
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

export type userWord = {
  id: string,
  difficulty: string,
  optional: {
    correctAnswersCount: number,
    correctAnswersCountForStatistics: number,
    allAnswersCount: number,
  },
  wordId: string
};

type userSettings = {
  name: string,
  refreshToken : string,
  token : string,
  userId : string,
  email : string,
  password : string,
  expiredTime : number,
};

type userStatistic = {  
  learnedWords: number,
  optional: {
    correctAnswersSprint: number,
    allAnswersSprint: number,
    longestCorrectRangeSprint: number
  }
}

let learnedWords: number = 0;


class SprintStatistic implements RoundStatistic {

  numberOfQuestions: number;
  correctAnswers: Array < word > ;
  wrongAnswers: Array < word > ;
  correctAnswersSeries: number;
  bestCorrectAnswersSeries: number;

  constructor(numberOfQuestions: number,
    correctAnswers: Array < word > ,
    wrongAnswers: Array < word > ,
    correctAnswersSeries: number,
    bestCorrectAnswersSeries: number, ) {
    this.numberOfQuestions = 0;
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.correctAnswersSeries = 0;
    this.bestCorrectAnswersSeries = 0;
  }


  getUser = (): userSettings => {
    const startApp = new StartApp;
    const userSettings: userSettings = startApp.userSettings
    return userSettings;
  }

  public sortRoundWords = async () => {
    learnedWords = 0;
    const statistics = new Statistics();
    const startApp = new StartApp;
    const user: userSettings = this.getUser() as userSettings;
    if (startApp.userSettings.userId) {
      await this.sortRoundCorrectWords(user);
      await this.sortRoundInCorrectWords(user);      
    console.log(`words sorted`)
    const longestCorrectRange: number = this.correctAnswersSeries;
    const allWordsRoundCount: number = this.numberOfQuestions;
    const correctAnswersRoundCount: number = this.correctAnswers.length;
    statistics.updateStatistics(learnedWords, longestCorrectRange, 'sprint', allWordsRoundCount, correctAnswersRoundCount);
    }
  }

  sortRoundCorrectWords = async (user: userSettings):Promise<void> => {
    this.correctAnswers.forEach(async (element) => {
      const word: userWord | null = await this.getUserWord(element.id) as unknown as userWord | null;
        if (word !== null) {
         if (word.difficulty === 'hard') {
           await this.changeUserWord(word, 'hard', Number(word.optional.correctAnswersCount) + 1, Number(word.optional.correctAnswersCountForStatistics) + 1, Number(word.optional.allAnswersCount) + 1);
           learnedWords = Number(word.optional.correctAnswersCount) == 4 ? learnedWords + 1: learnedWords;
        } else {
          await this.changeUserWord(word, 'studied', Number(word.optional.correctAnswersCount) + 1, Number(word.optional.correctAnswersCountForStatistics) + 1, Number(word.optional.allAnswersCount) +1);
          learnedWords = Number(word.optional.correctAnswersCount) == 2 ? learnedWords + 1: learnedWords;
        }
      } else {
        await this.createUserWord(user, element, 1, 1, 1)
      }
    });
  }

  sortRoundInCorrectWords = async (user: userSettings):Promise<void> => {
    this.wrongAnswers.forEach(async (element) => {
      const word: userWord | null = await this.getUserWord(element.id) as unknown as userWord | null;
      if (word !== null) { 
        if (word.difficulty === 'hard') {
          await this.changeUserWord(word, 'hard', 0, Number(word.optional.correctAnswersCountForStatistics), Number(word.optional.allAnswersCount) + 1);
        }else if (word.difficulty === 'studied') {
          await this.changeUserWord(word, 'studied', 0, Number(word.optional.correctAnswersCountForStatistics), Number(word.optional.allAnswersCount) + 1); }       
      } else await this.createUserWord(user, element, 0, 0, 0)
    })
  }

  public getUserWord = async ( wordId: string): Promise < userWord | null > => {
    const startApp = new StartApp;
    let content: userWord | null = null;
    try {
      const rawResponse = await fetch(`${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      content = rawResponse.status !== 404 ? await rawResponse.json() as userWord : null;      
    } catch (error) {
      console.log('get word error')     
    }   
    return content;
  }

  getAllUserWords = async() => {
    const startApp = new StartApp;
const rawResponse = await fetch(`${settings.APIUrl}users/${startApp.userSettings.userId}/words/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json() as userWord[];     
      return content;
  }

  changeUserWord = async (word: userWord, difficulty: string, correctAnswers: number, correctAnswersCountForStatistics: number, allAnswersCount: number) => {
    const user: userSettings = this.getUser();
    try {
      const rawResponse = await fetch(`${settings.APIUrl}users/${user.userId}/words/${word.wordId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "difficulty": `${difficulty}`,
          "optional": {
            'correctAnswersCount': `${correctAnswers}`,
            'correctAnswersCountForStatistics': `${correctAnswersCountForStatistics}`,
            'allAnswersCount': `${allAnswersCount}`
          }
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  createUserWord = async (user: userSettings, word: word, correctAnswers: number, correctAnswersCountForStatistics: number, allAnswersCount: number) => {
    const url = `${settings.APIUrl}users/${user.userId}/words/${word.id}`;
    try {
      const req = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "difficulty": "studying",
          "optional": {
            'correctAnswersCount': `${correctAnswers}`,
            'correctAnswersCountForStatistics': `${correctAnswersCountForStatistics}`,
            'allAnswersCount': `${allAnswersCount}`,
          }
        })
      });
      const data = await req.json();
      console.log(' user word created')
    } catch (error) {
      console.log(' user word create error')
      console.log(error);
    }
  }

}

export const sprintRoundStatistic = new SprintStatistic(0, [], [], 0, 0);