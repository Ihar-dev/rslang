interface RoundStatistic {
  numberOfQuestions: number,
  correctAnswers: Array<word>,
  wrongAnswers: Array<word>,
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

class SprintStatistic implements RoundStatistic {
    numberOfQuestions: number;
  correctAnswers: Array<word>;
  wrongAnswers: Array<word>;
  correctAnswersSeries: number;
  bestCorrectAnswersSeries: number;
    constructor (numberOfQuestions: number,
  correctAnswers: Array<word>,
  wrongAnswers: Array<word>,
  correctAnswersSeries: number,
  bestCorrectAnswersSeries: number,) {
      this.numberOfQuestions = 0;
      this.correctAnswers = [];
      this.wrongAnswers = [];
      this.correctAnswersSeries = 0;
      this.bestCorrectAnswersSeries = 0;
  }

}

export const sprintRoundStatistic = new SprintStatistic(0,[],[],0,0);