import {
  settings
} from './start';
import StartApp from "./start";

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
  id:string,
  difficulty:string,
  optional:{
    correctAnswersCount: string,    
  },
  wordId: string
}

type userSettings = {
  name ? : string,
  refreshToken ? : string,
  token ? : string,
  userId ? : string,
  email ? : string,
  password ? : string,
  expiredTime ? : number,
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
    let userSettings = {
      name: '',
      refreshToken: '',
      token: '',
      userId: '',
      email: '',
      password: '',
      expiredTime: 0,
    };
    if (localStorage.getItem('rslang-user-settings')) {
      userSettings: userSettings = JSON.parse(localStorage.getItem('rslang-user-settings') || '');
    }
    return userSettings;
  }

  removeFromKnownWords = async () => {
    const user: userSettings = this.getUser();
    if (user.userId) {
      this.wrongAnswers.forEach(async (element) => {
        const wordId: string = element.id;
        const request = await fetch
        const url = `${settings.APIUrl}users/${user.userId}/words/${wordId}`;
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
              "optional": {}
            })
          });
          console.log(req);
          const data = await req.json();
          console.log(data);
        } catch (error) {
          console.log(error)
        }
      });
    }

    removeFromHardWords = async () => {
      const user: userSettings = this.getUser();
      if (user.userId) {
        this.correctAnswers.forEach((element) => {
          const word = this.getUserWord(element.id)
        });
      }
    }
  }

  getUserWord = async (wordId: string): userWord | null => {
  const rawResponse = await fetch(`https://<your-app-name>.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  });
  const content: userWord = await rawResponse.json();

  return content;
};

}

export const sprintRoundStatistic = new SprintStatistic(0, [], [], 0, 0);