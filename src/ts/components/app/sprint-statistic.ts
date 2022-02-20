import {
  settings
} from './start';
import StartApp from "./start";
const startApp = new StartApp;

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
    correctAnswersCount: string,
  },
  wordId: string
}

type userSettings = {
  name: string,
  refreshToken : string,
  token : string,
  userId : string,
  email : string,
  password : string,
  expiredTime : number,
};



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
    const userSettings: userSettings = startApp.userSettings
    return userSettings;
  }

  public sortRoundWords = async () => {
    const user: userSettings = this.getUser() as userSettings;
    if (startApp.userSettings.userId) {
      await this.sortRoundCorrectWords(user);
      await this.sortRoundInCorrectWords(user);
    }
  }

  sortRoundCorrectWords = async (user: userSettings) => {
    this.correctAnswers.forEach(async (element) => {
      const word: userWord | null = this.getUserWord(user, element.id) as unknown as userWord | null;
      console.log (`получил${word}`)
      if (word !== null) {
        if (word.difficulty === 'hard' && Number(word.optional.correctAnswersCount) > 4) {
          await this.changeUserWord(word, 'studied', 0);
        } else {
          await this.changeUserWord(word, 'studied', Number(word.optional.correctAnswersCount) + 1);
        }
      } else {
        await this.createUserWord(user, element, 1)
      }
    });
  }

  sortRoundInCorrectWords = async (user: userSettings) => {
    this.wrongAnswers.forEach(async (element) => {
      const word: userWord | null = this.getUserWord(user, element.id) as unknown as userWord | null;
      if (word !== null) {
        if (word.difficulty === 'studied' && Number(word.optional.correctAnswersCount) > 3) {
          await this.changeUserWord(word, 'studied', 0);
        }
      }
    })
  }

  getUserWord = async (user: userSettings, wordId: string): Promise < userWord | null > => {
    let content: userWord | null = null;
    try {
      const rawResponse = await fetch(`${settings.APIUrl}${user.userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      content = rawResponse.ok ? await rawResponse.json() as userWord : null;
      console.log(rawResponse.statusText)
    } catch (error) {
      console.log('get word error')
      console.log(content);
    }
    return content;
  }

  changeUserWord = async (word: userWord, difficulty: string, correctAnswers: number) => {
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
            'correctAnswersCount': `${correctAnswers}`
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
            'correctAnswersCount': `${correctAnswers}`
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