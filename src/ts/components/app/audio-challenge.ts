import AudioChallengeContent from '../view/audio-challenge/audio-challenge';
import AudioChallengeTopContent from '../view/audio-challenge/top/top';
import AudioChallengeVarianContent from '../view/audio-challenge/variant/variant';
import AudioChallengeBottomContent from '../view/audio-challenge/bottom/bottom';
import AudioChallengeStatisticContent from '../view/audio-challenge/statistic/statistic';
import AudioChallengeStatisticResultsContent from '../view/audio-challenge/statistic/results/results';
import AudioChallengeStatisticTableContent from '../view/audio-challenge/statistic/table/table';
import AudioChallengeStatisticControlsContent from '../view/audio-challenge/statistic/controls/controls';
import OpenGameDifficultyPage from './game-difficulty';
import { StartApp, settings } from './start';
import { StudyBook } from './study-book';

const correctAnswerSound = require('../../../assets/audio/correctanswer.mp3');
const wrongAnswerSound = require('../../../assets/audio/wronganswer.mp3');
const endRoundSound = require('../../../assets/audio/endround.mp3');

interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

interface RoundStatistic {
  numberOfQuestions: number;
  correctAnswers: Array<Word>;
  wrongAnswers: Array<Word>;
  correctAnswersSeries: number;
  bestCorrectAnswersSeries: number;
}

class StartAudioChallengeApp {
  private static isGameStart = false;
  private static wordGroup = 0;
  private static wordPage: number | null = null;
  private static chunkOfWords: Word[];
  private static correctAnswer: Word;
  private static answers: String[] = [];
  private static roundStatistic: RoundStatistic = {
    numberOfQuestions: 0,
    correctAnswers: [],
    wrongAnswers: [],
    correctAnswersSeries: 0,
    bestCorrectAnswersSeries: 0,
  };

  private static getRandomNumber(min: number, max: number): number {
    const randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  private async playAudio(path: string): Promise<void> {
    const audio = new Audio();
    audio.src = path;
    audio.currentTime = 0;
    audio.play();
  }

  private async resetRoundData(): Promise<void> {
    StartAudioChallengeApp.roundStatistic.numberOfQuestions = 0;
    StartAudioChallengeApp.roundStatistic.correctAnswers.length = 0;
    StartAudioChallengeApp.roundStatistic.wrongAnswers.length = 0;
    StartAudioChallengeApp.roundStatistic.correctAnswersSeries = 0;
    StartAudioChallengeApp.roundStatistic.bestCorrectAnswersSeries = 0;
  }

  private async resetAnswers(): Promise<void> {
    StartAudioChallengeApp.answers.length = 0;
  }

  private async getWordGroupAndPage(target: HTMLElement) {
    const studyBook = new StudyBook();

    if (target.closest('.round-statistic__replay')) {
      return;
    } else if (target.closest('.audio-challenge__game-difficulty')) {
      StartAudioChallengeApp.wordGroup = Number(target.innerHTML) - 1;
      StartAudioChallengeApp.wordPage = null;
    } else {
      StartAudioChallengeApp.wordGroup = studyBook.wordsSettings.group;
      StartAudioChallengeApp.wordPage = studyBook.wordsSettings.page;
    }
  }

  public async renderGameDifficultyPage(): Promise<void> {
    const openGameDifficultyPage = new OpenGameDifficultyPage();
    const header = 'Аудиовызов';
    const text1 = 'Тренировка Аудиовызов развивает словарный запас.';
    const text2 = 'Вы должны выбрать перевод услышанного слова.';
    await openGameDifficultyPage.render(header, text1, text2);

    const levelButtons = document.querySelectorAll('.level-buttons__button') as NodeListOf<HTMLElement>;
    for (let button of levelButtons) {
      button.classList.add('audio-challenge__game-difficulty');
    }
    this.addListeners();
  }

  private async renderPage(): Promise<void> {
    const answersNumber = 5;

    const page = document.querySelector('.page-container') as HTMLElement;
    page.innerHTML = await AudioChallengeContent.render();

    const top = document.querySelector('.audio-challenge-container__top') as HTMLElement;
    top.innerHTML = await AudioChallengeTopContent.render();

    const middle = document.querySelector('.audio-challenge-container__middle') as HTMLElement;
    middle.innerHTML = '';
    for (let i = 1; i <= answersNumber; i++) {
      middle.insertAdjacentHTML('beforeend', await AudioChallengeVarianContent.render());
    }

    const bottom = document.querySelector('.audio-challenge-container__bottom') as HTMLElement;
    bottom.innerHTML = await AudioChallengeBottomContent.render();
  }

  private async renderPreloaderPage(): Promise<void> {
    const preloader = document.querySelector('.audio-challenge-container__preloader') as HTMLElement;
    const progressBar = document.querySelector('.audio-challenge-container__progress-bar') as HTMLElement;
    const content = document.querySelector('.audio-challenge-container__content') as HTMLElement;

    progressBar.style.visibility = 'hidden';
    content.style.visibility = 'hidden';
    preloader.style.display = 'block';
  }

  private async setDataToPage(): Promise<void> {
    const progressBar = document.querySelector('.audio-challenge-container__progress-bar') as HTMLElement;
    const img = document.querySelector('.audio-challenge-container__word-image') as HTMLElement;
    const word = document.querySelector('.audio-challenge-container__word') as HTMLElement;
    const content = document.querySelector('.audio-challenge-container__content') as HTMLElement;
    const preloader = document.querySelector('.audio-challenge-container__preloader') as HTMLElement;
    const variantsNumber = document.querySelectorAll('.audio-challenge-container__variant-number') as NodeListOf<HTMLElement>;
    const variantsText = document.querySelectorAll('.audio-challenge-container__text') as NodeListOf<HTMLElement>;
    const numberOfQuestions = StartAudioChallengeApp.roundStatistic.numberOfQuestions;
    const progressBarWidth = ((numberOfQuestions - StartAudioChallengeApp.chunkOfWords.length) / numberOfQuestions) * 100;

    preloader.style.display = 'none';
    content.style.visibility = 'visible';
    progressBar.style.visibility = 'visible';
    progressBar.style.width = `${progressBarWidth}%`;
    img.style.backgroundImage = `url(${settings.APIUrl}${StartAudioChallengeApp.correctAnswer.image})`;
    word.innerHTML = `${StartAudioChallengeApp.correctAnswer.word}`;

    for (let i = 0; i < variantsText.length; i++) {
      variantsNumber[i].innerHTML = `${i + 1}`;
      variantsText[i].innerHTML = `${StartAudioChallengeApp.answers[i]}`;
    }
  }

  private async renderStatistic(): Promise<void> {
    const audioChallengeContent = document.querySelector('.audio-challenge-container__content') as HTMLElement;
    const correctAnswers = StartAudioChallengeApp.roundStatistic.correctAnswers.length;
    const wrongAnswers = StartAudioChallengeApp.roundStatistic.wrongAnswers.length;
    const bestAnswersSeries = StartAudioChallengeApp.roundStatistic.bestCorrectAnswersSeries;
    const accuracyPercents = Math.round((correctAnswers / StartAudioChallengeApp.roundStatistic.numberOfQuestions) * 100);

    const statisticPage = document.querySelector('.audio-challenge-container__round-statistic') as HTMLElement;
    statisticPage.innerHTML = await AudioChallengeStatisticContent.render();

    const results = document.querySelector('.round-statistic__results') as HTMLElement;
    results.innerHTML = await AudioChallengeStatisticResultsContent.render(correctAnswers, wrongAnswers, bestAnswersSeries, accuracyPercents);

    const wordsContainer = document.querySelector('.round-statistic__words') as HTMLElement;

    if (correctAnswers) {
      wordsContainer.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderCorrect());
      const correctAnswersTable = document.querySelector('.round-statistic__table_correct-answers tbody') as HTMLElement;
      for (let word of StartAudioChallengeApp.roundStatistic.correctAnswers) {
        correctAnswersTable.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderLine(word.audio, word.word, word.transcription, word.wordTranslate));
      }
    }

    if (wrongAnswers) {
      wordsContainer.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderWrong());
      const wrongAnswersTable = document.querySelector('.round-statistic__table_wrong-answers tbody') as HTMLElement;
      for (let word of StartAudioChallengeApp.roundStatistic.wrongAnswers) {
        wrongAnswersTable.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderLine(word.audio, word.word, word.transcription, word.wordTranslate));
      }
    }

    const controls = document.querySelector('.round-statistic__controls') as HTMLElement;
    controls.innerHTML = await AudioChallengeStatisticControlsContent.render();

    audioChallengeContent.style.display = 'none';
    statisticPage.style.display = 'flex';
  }

  private async updateUserWord(correctAnswer: Word, isCorrect: boolean): Promise<void> {
    const startApp = new StartApp();
    if (startApp.userSettings.userId) {
      const requestsServer = new RequestsServer();
      const correctAnswersCountForHardWords = 5;
      const userWords = await requestsServer.getAllUserWords();
      const isWordIncludes = userWords.find((value) => value.wordId === correctAnswer.id);
      let word;

      if (isWordIncludes) {
        word = await requestsServer.getUserWord(correctAnswer.id);

        if (isCorrect) {
          word.optional.correctAnswersCount++;

          if (word.difficulty === 'hard' && word.optional.correctAnswersCount >= correctAnswersCountForHardWords) {
            word.difficulty = 'studied';
          }
        } else {
          word.optional.correctAnswersCount = 0;
        }
        delete word.id;
        delete word.wordId;
        await requestsServer.createUserWord('PUT', correctAnswer.id, word);
      } else {
        word = {
          difficulty: 'studied',
          optional: {
            correctAnswersCount: isCorrect ? 1 : 0,
          },
        };
        await requestsServer.createUserWord('POST', correctAnswer.id, word);
      }
    }
  }

  private async checkAnswer(target: HTMLElement): Promise<void> {
    const playAudioButton1 = document.querySelector('.audio-challenge-container__play-audio-1') as HTMLElement;
    const wordImage = document.querySelector('.audio-challenge-container__word-image') as HTMLElement;
    const wordContainer = document.querySelector('.audio-challenge-container__word-container') as HTMLElement;
    const variantButtons = document.querySelectorAll('.audio-challenge-container__variant') as NodeListOf<HTMLElement>;
    const dontKnowButton = document.querySelector('.audio-challenge-container__dont-know') as HTMLElement;
    const nextButton = document.querySelector('.audio-challenge-container__next') as HTMLElement;

    playAudioButton1.style.display = 'none';
    wordImage.style.visibility = 'visible';
    wordContainer.style.visibility = 'visible';
    dontKnowButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
    for (const value of variantButtons) {
      value.classList.add('disabled');
    }

    if (target.closest('.audio-challenge-container__variant')) {
      const answer = target.closest('.audio-challenge-container__variant')?.lastElementChild?.innerHTML;
      const correctAnswer = StartAudioChallengeApp.correctAnswer.wordTranslate;
      const result = Boolean(answer === correctAnswer);

      if (result) {
        this.playAudio(correctAnswerSound);
        const children = target.closest('.audio-challenge-container__variant')?.children as HTMLCollectionOf<HTMLElement>;
        children[0].style.visibility = 'hidden';
        children[1].style.visibility = 'visible';
      } else {
        this.playAudio(wrongAnswerSound);
        target.closest('.audio-challenge-container__variant')?.classList.add('wrong');
      }
      await this.updateStatistic(result);
      await this.updateUserWord(StartAudioChallengeApp.correctAnswer, result);
    } else if (target.closest('.audio-challenge-container__dont-know')) {
      this.playAudio(wrongAnswerSound);
      await this.updateStatistic(false);
      await this.updateUserWord(StartAudioChallengeApp.correctAnswer, false);
    }
  }

  private async getWordsChunk(group: number, page: number): Promise<Word[]> {
    const wordChunkPageLink = `${settings.APIUrl}words?group=${group}&page=${page}`;
    return (await fetch(wordChunkPageLink)).json();
  }

  private async setWords(group: number, page: number | null): Promise<void> {
    let data: Word[] = [];
    if (page === null) {
      const minNumber = 0;
      const maxPageNumber = 29;
      const randomPageNumber = StartAudioChallengeApp.getRandomNumber(minNumber, maxPageNumber);
      data = await this.getWordsChunk(group, randomPageNumber);
    } else {
      const startApp = new StartApp();
      if (startApp.userSettings.userId) {
        let wordPage = page;
        const requestsServer = new RequestsServer();
        while (wordPage >= 0 && data.length < 20) {
          const chunkOfWords = await this.getWordsChunk(group, wordPage);
          const userWords = await requestsServer.getAllUserWords();

          for (const word of chunkOfWords) {
            const userWord = userWords.find((value) => value.wordId === word.id);

            if (data.length < 20) {
              if (!userWord) {
                data.push(word);
              } else if (userWord.difficulty === 'hard' && userWord.optional.correctAnswersCount < 5) {
                data.push(word);
              } else if (userWord.difficulty === 'studied' && userWord.optional.correctAnswersCount < 3) {
                data.push(word);
              }
            }
          }
          wordPage--;
        }
      } else {
        data = await this.getWordsChunk(group, page); 
      }
    }
    StartAudioChallengeApp.chunkOfWords = [...data];
    StartAudioChallengeApp.roundStatistic.numberOfQuestions = StartAudioChallengeApp.chunkOfWords.length;    
  }

  private async getCorrectAnswer(): Promise<void> {
    if (StartAudioChallengeApp.chunkOfWords.length) {
      const correctAnswerPosition = StartAudioChallengeApp.getRandomNumber(0, StartAudioChallengeApp.chunkOfWords.length - 1);
      StartAudioChallengeApp.correctAnswer = StartAudioChallengeApp.chunkOfWords[correctAnswerPosition];
      StartAudioChallengeApp.chunkOfWords.splice(correctAnswerPosition, 1);
    }
  }

  private async getAnswerVariants(): Promise<void> {
    const wrongAnswersNumber = 4;
    const correctAnswer = StartAudioChallengeApp.correctAnswer.wordTranslate;
    const minNumber = 0;
    const maxGroupNumber = 5;
    const maxPageNumber = 29;
    let group = StartAudioChallengeApp.getRandomNumber(minNumber, maxGroupNumber);
    while (StartAudioChallengeApp.wordGroup === group) {
      group = StartAudioChallengeApp.getRandomNumber(minNumber, maxGroupNumber);
    }
    const page = StartAudioChallengeApp.getRandomNumber(minNumber, maxPageNumber);
    const wordChunk: Array<Word> = await this.getWordsChunk(group, page);

    while (StartAudioChallengeApp.answers.length < wrongAnswersNumber) {
      const variant = wordChunk[StartAudioChallengeApp.getRandomNumber(minNumber, wordChunk.length - 1)].wordTranslate;

      if (!StartAudioChallengeApp.answers.includes(variant) && variant !== correctAnswer) {
        StartAudioChallengeApp.answers.push(variant);
      }
    }
    StartAudioChallengeApp.answers.splice(StartAudioChallengeApp.getRandomNumber(minNumber, wrongAnswersNumber), 0, correctAnswer);
  }

  private async updateStatistic(argument: boolean): Promise<void> {
    const roundStatistic = StartAudioChallengeApp.roundStatistic;

    if (argument) {
      roundStatistic.correctAnswers.push(StartAudioChallengeApp.correctAnswer);
      roundStatistic.correctAnswersSeries++;
    } else {
      roundStatistic.wrongAnswers.push(StartAudioChallengeApp.correctAnswer);
      roundStatistic.correctAnswersSeries = 0;
    }

    if (roundStatistic.correctAnswersSeries > roundStatistic.bestCorrectAnswersSeries) {
      roundStatistic.bestCorrectAnswersSeries = roundStatistic.correctAnswersSeries;
    }
  }

  public async startGame(target: HTMLElement): Promise<void> {
    const gameDifficulty = document.querySelector('.game-difficulty-container') as HTMLElement;

    if (gameDifficulty || document.body.classList.contains('book') || target.closest('.round-statistic__replay')) {
      await this.resetRoundData();
      await this.resetAnswers();
      await this.renderPage();
      await this.renderPreloaderPage();
      await this.getWordGroupAndPage(target);
      await this.setWords(StartAudioChallengeApp.wordGroup, StartAudioChallengeApp.wordPage);
      if (StartAudioChallengeApp.chunkOfWords.length) {
        await this.getCorrectAnswer();
        await this.getAnswerVariants();
        await this.setDataToPage();
        this.addListeners();

        const audioPath = `${settings.APIUrl}${StartAudioChallengeApp.correctAnswer.audio}`;
        await this.playAudio(audioPath);
      } else {
        //TODO выход в учебник
        const startApp = new StartApp();
        startApp.render(false);
      }
    } else {
      await this.renderGameDifficultyPage();
    }
  }

  private async nextWord(): Promise<void> {
    const nextButton = document.querySelector('.audio-challenge-container__next') as HTMLElement;
    nextButton.classList.add('disabled');

    if (StartAudioChallengeApp.chunkOfWords.length) {
      await this.resetAnswers();
      await this.getCorrectAnswer();
      await this.getAnswerVariants();
      await this.renderPage();
      await this.setDataToPage();

      const audioPath = `${settings.APIUrl}${StartAudioChallengeApp.correctAnswer.audio}`;
      await this.playAudio(audioPath);
      this.addListeners();
    } else {
      await this.renderStatistic();
      await this.playAudio(endRoundSound);
    }
  }

  public addListeners(): void {
    const delegationMouseEvents = (event: MouseEvent): void => {
      const audioChallengePage = document.querySelector('.audio-challenge-container__content');

      const target = event.target as HTMLElement;
      if (target.closest('.audio-challenge-container__variant') || target.closest('.audio-challenge-container__dont-know')) {
        this.checkAnswer(target);
      }

      if (target.closest('.audio-challenge-container__next')) {
        this.nextWord();
      }

      if (target.closest('.audio-challenge-container__play-audio-1') || target.closest('.audio-challenge-container__play-audio-2')) {
        const audioPath = `${settings.APIUrl}${StartAudioChallengeApp.correctAnswer.audio}`;
        this.playAudio(audioPath);
      }

      if (target.closest('.round-statistic__audio') && audioChallengePage) {
        const audioPath = `${settings.APIUrl}${target.dataset.audio}`;
        this.playAudio(audioPath);
      }

      if (target.closest('.audio-challenge__game-difficulty')) {
        this.startGame(target);
      }

      if (target.closest('.round-statistic__replay')) {
        this.startGame(target);
      }

      if (target.closest('.round-statistic__book')) {
        console.log('book');
      }

      if (target.closest('.round-statistic__back')) {
        const startApp = new StartApp();
        startApp.render(false);
      }
    };

    const delegationKeyboardEvents = (event: KeyboardEvent): void => {
      const gameDifficultyPage = document.querySelector('.audio-challenge__game-difficulty');
      const audioChallengePage = document.querySelector('.audio-challenge-container__content');
      const gameDifficultyButtons = document.querySelectorAll('.audio-challenge__game-difficulty') as NodeListOf<HTMLElement>;
      const audioChallengeAnswerButtons = document.querySelectorAll('.audio-challenge-container__variant') as NodeListOf<HTMLElement>;
      const dontKnowButton = document.querySelector('.audio-challenge-container__dont-know') as HTMLElement;
      const nextButton = document.querySelector('.audio-challenge-container__next') as HTMLElement;

      if (gameDifficultyPage) {
        switch (event.key) {
          case '1':
            this.startGame(gameDifficultyButtons[0]);
            break;
          case '2':
            this.startGame(gameDifficultyButtons[1]);
            break;
          case '3':
            this.startGame(gameDifficultyButtons[2]);
            break;
          case '4':
            this.startGame(gameDifficultyButtons[3]);
            break;
          case '5':
            this.startGame(gameDifficultyButtons[4]);
            break;
          case '6':
            this.startGame(gameDifficultyButtons[5]);
            break;
        }
      }

      if (audioChallengePage) {
        if (!audioChallengeAnswerButtons[0].classList.contains('disabled')) {
          switch (event.key) {
            case '1':
              this.checkAnswer(audioChallengeAnswerButtons[0]);
              break;
            case '2':
              this.checkAnswer(audioChallengeAnswerButtons[1]);
              break;
            case '3':
              this.checkAnswer(audioChallengeAnswerButtons[2]);
              break;
            case '4':
              this.checkAnswer(audioChallengeAnswerButtons[3]);
              break;
            case '5':
              this.checkAnswer(audioChallengeAnswerButtons[4]);
              break;
          }
        }
        switch (event.key) {
          case 'Enter':
            if (!dontKnowButton.classList.contains('hidden')) {
              this.checkAnswer(dontKnowButton);
            } else if (!nextButton.classList.contains('hidden') && !nextButton.classList.contains('disabled')) {
              this.nextWord();
            }
            break;
        }
      }
    };

    if (!StartAudioChallengeApp.isGameStart) {
      document.addEventListener('click', delegationMouseEvents);
      document.addEventListener('keyup', delegationKeyboardEvents);
      StartAudioChallengeApp.isGameStart = true;
    }
  }
}

type wordDataResponse = {
  id?: string;
  wordId?: string;
  difficulty: string;
  optional: {
    correctAnswersCount: number;
  };
};
class RequestsServer {
  public async getUserWord(wordId: string): Promise<wordDataResponse> {
    const startApp = new StartApp();
    let data;
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${startApp.userSettings.token}`,
          Accept: 'application/json',
        },
      });
      data = await res.json();
    } catch (error) {}
    return data;
  }

  public async createUserWord(method: string, wordId: string, wordData: wordDataResponse): Promise<void> {
    const startApp = new StartApp();
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`;
      await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${startApp.userSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordData),
      });
    } catch (error) {}
  }

  public async getAllUserWords(): Promise<wordDataResponse[]> {
    const startApp = new StartApp();
    let data: wordDataResponse[] = [];
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${startApp.userSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      data = await res.json();
    } catch (error) {}
    return data;
  }
}

export default StartAudioChallengeApp;
