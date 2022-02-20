import {
  settings,
  StartApp
} from './start';
import { StudyBook } from "./study-book";

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

type userWord = {
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
    const startApp = new StartApp;
    const user: userSettings = this.getUser() as userSettings;
    if (startApp.userSettings.userId) {
      await this.sortRoundCorrectWords(user);
      await this.sortRoundInCorrectWords(user);
    }
  }

  sortRoundCorrectWords = async (user: userSettings) => {
    this.correctAnswers.forEach(async (element) => {
      const word: userWord | null = await this.getUserWord(user, element.id) as unknown as userWord | null;
      console.log (`получил${word}`)
      if (word !== null) {
        if (word.difficulty === 'hard' && word.optional.correctAnswersCount > 4) {
          await this.changeUserWord(word, 'studied', word.optional.correctAnswersCount + 1, word.optional.correctAnswersCountForStatistics + 1, word.optional.allAnswersCount + 1);
        } else if (word.difficulty === 'hard') {
           await this.changeUserWord(word, 'hard', word.optional.correctAnswersCount + 1, word.optional.correctAnswersCountForStatistics + 1, word.optional.allAnswersCount + 1);
        } else {
          await this.changeUserWord(word, 'studied', word.optional.correctAnswersCount + 1, word.optional.correctAnswersCountForStatistics + 1, word.optional.allAnswersCount +1);
        }
      } else {
        await this.createUserWord(user, element, 1)
      }
    });
  }

  sortRoundInCorrectWords = async (user: userSettings) => {
    this.wrongAnswers.forEach(async (element) => {
      const word: userWord | null = await this.getUserWord(user, element.id) as unknown as userWord | null;
      if (word !== null) {        
          await this.changeUserWord(word, 'studied', 0, word.optional.correctAnswersCountForStatistics, word.optional.allAnswersCount + 1);        
      }
    })
  }

  getUserWord = async (user: userSettings, wordId: string): Promise < userWord | null > => {
    const startApp = new StartApp;
    let content: userWord | null = null;
    try {
      const rawResponse = await fetch(`${settings.APIUrl}${user.userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      content = rawResponse.status !== 404 ? await rawResponse.json() as userWord : null;
      console.log(content)
    } catch (error) {
      console.log('get word error')
      console.log(content);
    }
    console.log(content)
    return content;
  }

  changeUserWord = async (word: userWord, difficulty: string, correctAnswers: number, correctAnswersCountForStatistics: number, allAnswersCount: number,) => {
    const user: userSettings = this.getUser();
    try {
      const rawResponse = await fetch(`${settings.APIUrl}${word.id}/words/${word.wordId}`, {
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

  createUserWord = async (user: userSettings, word: word, correctAnswers: number) => {
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
            'correctAnswersCount': `${correctAnswers},
            'correctAnswersCountForStatistics': '1',
            'allAnswersCount': '1',`
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

  getUserStatistic = async(): Promise<userStatistic | boolean> => {
    const startApp = new StartApp;
const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/statistics`;
try {
      const req: Response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
     const data: userStatistic | boolean = req.ok ? await req.json(): false;
     return data;
  } catch {
    const data = false;
    return data;
  } 
}

setUserStatistic = async(learnedWords: number, day: Date, correctAnswers: number, allAnswers: number, longestCorrectRangeSprint: number) => {
  const startApp = new StartApp;
const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/statistics`;
      const req: Response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({          
  "learnedWords": `${learnedWords}`,
  "optional": {
    'day': `${day}`,
    'correctAnswersSprint' : `${correctAnswers}`,
    'allAnswersSprint': `${allAnswers}`,
    'longestCorrectRangeSprint': `${longestCorrectRangeSprint}`
  }          
        })
      });
     const data: userStatistic | boolean = req.ok ? await req.json(): false;
}

updateUserStatisticLearnedWords = async() => {
  const userStatistic: userStatistic| boolean = await this.getUserStatistic();
  const date = (new Date).toDateString();
  if (userStatistic)  {
        
  }
 }

}

export const sprintRoundStatistic = new SprintStatistic(0, [], [], 0, 0);