import AudioChallengeContent from '../view/audio-challenge/audio-challenge';
import AudioChallengeTopContent from '../view/audio-challenge/top/top';
import AudioChallengeVarianContent from '../view/audio-challenge/variant/variant';
import AudioChallengeBottomContent from '../view/audio-challenge/bottom/bottom';

import AudioChallengeStatisticContent from '../view/audio-challenge/statistic/statistic';
import AudioChallengeStatisticResultsContent from '../view/audio-challenge/statistic/results/results';
import AudioChallengeStatisticTableContent from '../view/audio-challenge/statistic/table/table';
import AudioChallengeStatisticControlsContent from '../view/audio-challenge/statistic/controls/controls';

import OpenGameDifficultyPage from './game-difficulty';
// import startApp from '../../index';

const correctAnswerSound = require('../../../assets/audio/correctanswer.mp3');
const wrongAnswerSound = require('../../../assets/audio/wronganswer.mp3');
const endRoundSound = require('../../../assets/audio/endround.mp3');

interface Word {
  id: string,
  group: number,
  page: number,
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
}

interface RoundStatistic {
  numberOfQuestions: number,
  correctAnswers: Array<Word>,
  wrongAnswers: Array<Word>,
  correctAnswersSeries: number,
  bestCorrectAnswersSeries: number,
}

class StartAudioChallengeApp {
  private static isGameStart = false;
  private static basePageLink = 'https://react-rslang-hauzinski.herokuapp.com';
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
  }

  // Функция для получения случайного числа в заданном диапазоне
  private static getRandomNumber(min: number, max: number): number {
    const randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  //Функция для проигрывания аудио
  private async playAudio(path: string): Promise<void> {
    const audio = new Audio();
    audio.src = path;
    audio.currentTime = 0;
    audio.play();
  }

  //Функция сброса статистики раунда перед его началом
  private async resetRoundData(): Promise<void> { 
    StartAudioChallengeApp.roundStatistic.numberOfQuestions = 0;
    StartAudioChallengeApp.roundStatistic.correctAnswers.length = 0;
    StartAudioChallengeApp.roundStatistic.wrongAnswers.length = 0;
    StartAudioChallengeApp.roundStatistic.correctAnswersSeries = 0;
    StartAudioChallengeApp.roundStatistic.bestCorrectAnswersSeries = 0;
  }
  
  //Функция сброса вариантов ответа раунда перед его началом
  private async resetAnswers(): Promise<void> {
    StartAudioChallengeApp.answers.length = 0;    
  }

  //Функция получения номеров страниц и группы слов для игры
  private async getWordGroupAndPage(target: HTMLElement) {
    if (target.closest('.audio-challenge__game-difficulty')) {
      StartAudioChallengeApp.wordGroup = Number(target.innerHTML) - 1;
      StartAudioChallengeApp.wordPage = null;
    }
    //TODO Добавить условие на запуск приложения из учебника
  }

  //Функция для отрисовки страницы выбора сложности  игры
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
  
  //Функция для отрисовки шаблона страницы игры
  private async renderPage(): Promise<void> {
    const answersNumber = 5;

    const page = document.querySelector('.page-container') as HTMLElement;
    page.innerHTML = await AudioChallengeContent.render();

    const top = document.querySelector('.audio-challenge-container__top') as HTMLElement;
    top.innerHTML = await AudioChallengeTopContent.render();

    const middle = document.querySelector('.audio-challenge-container__middle') as HTMLElement;
    middle.innerHTML = "";
    for (let i = 1; i <= answersNumber; i++) {
      middle.insertAdjacentHTML('beforeend', await AudioChallengeVarianContent.render());
    }

    const bottom = document.querySelector('.audio-challenge-container__bottom') as HTMLElement;
    bottom.innerHTML = await AudioChallengeBottomContent.render();
  }

  //Функция изменения отрисованного шаблона страницы игры на основе полученных данных
  private async setDataToPage(): Promise<void> {
    const img = document.querySelector('.audio-challenge-container__word-image') as HTMLTemplateElement;
    const word = document.querySelector('.audio-challenge-container__word') as HTMLTemplateElement;
    const variantsNumber = document.querySelectorAll('.audio-challenge-container__variant-number');
    const variantsText = document.querySelectorAll('.audio-challenge-container__text');
  
    img.style.backgroundImage = `url(${StartAudioChallengeApp.basePageLink}/${StartAudioChallengeApp.correctAnswer.image})`;
    word.innerHTML = `${StartAudioChallengeApp.correctAnswer.word}`;

    for (let i = 0; i < variantsText.length; i++) {
      variantsNumber[i].innerHTML = `${i+1}`;
      variantsText[i].innerHTML = `${StartAudioChallengeApp.answers[i]}`;
    }
  }

  //Функция для отрисовки шаблона страницы статистики
  private async renderStatistic(): Promise<void> {
    const audioChallengeContent = document.querySelector('.audio-challenge-container__content') as HTMLElement;
    const correctAnswers = StartAudioChallengeApp.roundStatistic.correctAnswers.length;
    const wrongAnswers = StartAudioChallengeApp.roundStatistic.wrongAnswers.length;
    const bestAnswersSeries = StartAudioChallengeApp.roundStatistic.bestCorrectAnswersSeries;
    const accuracyPercents = Math.round(correctAnswers / StartAudioChallengeApp.roundStatistic.numberOfQuestions * 100);

    const statisticPage = document.querySelector('.audio-challenge-container__round-statistic') as HTMLElement;
    statisticPage.innerHTML = await AudioChallengeStatisticContent.render();
    
    const results = document.querySelector('.round-statistic__results') as HTMLElement;
    results.innerHTML = await AudioChallengeStatisticResultsContent.render(correctAnswers, wrongAnswers, bestAnswersSeries, accuracyPercents);

    const wordsContainer = document.querySelector('.round-statistic__words') as HTMLElement;

    if (correctAnswers) {
      wordsContainer.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderCorrect());
      const correctAnswersTable = document.querySelector('.round-statistic__table_correct-answers tbody') as HTMLElement;
      for (let word of StartAudioChallengeApp.roundStatistic.correctAnswers) {
        correctAnswersTable.insertAdjacentHTML('beforeend', await AudioChallengeStatisticTableContent.renderLine(word.audio ,word.word, word.transcription, word.wordTranslate));
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

  //Функция проверки выбранного ответа на вопрос раунда игры
  private async checkAnswer(target: HTMLElement): Promise<void> {
    if (target.closest('.audio-challenge-container__variant')) {
      const answer = target.closest('.audio-challenge-container__variant')?.lastElementChild?.innerHTML;
      const correctAnswer = StartAudioChallengeApp.correctAnswer.wordTranslate;
      const result = Boolean(answer === correctAnswer);

      if (result) {
        //TODO Изменение данных о выбранном слове (количество правильных ответов, статус слова)
        this.playAudio(correctAnswerSound);
        const children = target.closest('.audio-challenge-container__variant')?.children as HTMLCollectionOf<HTMLElement>;
        children[0].style.visibility = 'hidden';
        children[1].style.visibility = 'visible';
      } else {
        //TODO Изменение данных о выбранном слове (количество правильных ответов, статус слова)
        this.playAudio(wrongAnswerSound);
        target.closest('.audio-challenge-container__variant')?.classList.add('wrong');
      }

      await this.updateStatistic(result);
    } else if (target.closest('.audio-challenge-container__dont-know')) {
      this.playAudio(wrongAnswerSound);
      await this.updateStatistic(false);
    }

    const playAudioBtn1 = document.querySelector('.audio-challenge-container__play-audio-1') as HTMLElement;
    const wordImage = document.querySelector('.audio-challenge-container__word-image') as HTMLElement;
    const wordContainer = document.querySelector('.audio-challenge-container__word-container') as HTMLElement;
    const variantButtons = document.querySelectorAll('.audio-challenge-container__variant') as NodeListOf<HTMLElement>;
    const dontKnowBtn = document.querySelector('.audio-challenge-container__dont-know') as HTMLElement;
    const nextBtn = document.querySelector('.audio-challenge-container__next') as HTMLElement;

    playAudioBtn1.style.display = 'none';
    wordImage.style.visibility = 'visible';
    wordContainer.style.visibility = 'visible';
    dontKnowBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
    for(const value of variantButtons) {
      value.classList.add('disabled');
    }
  }

  //Функция получения массива слов (20 слов) с сервера
  private async getWordsChunk(group: number, page: number): Promise<Word[]> {    
    const wordChunkPageLink = `${StartAudioChallengeApp.basePageLink}/words?group=${group}&page=${page}`;
    return (await fetch(wordChunkPageLink)).json();
  }

  //Функция сохранения массива слов (20 слов) в приложении
  private async setWords(group: number, page: number | null): Promise<void> {
    let data: Word[];
    if (page === null) {
      const minNumber = 0;
      const maxPageNumber = 29;
      const randomPageNumber = StartAudioChallengeApp.getRandomNumber(minNumber, maxPageNumber);
      data = await this.getWordsChunk(group, randomPageNumber);
    } else {
      data = await this.getWordsChunk(group, page);
    }

    StartAudioChallengeApp.chunkOfWords = [...data];
    StartAudioChallengeApp.roundStatistic.numberOfQuestions = StartAudioChallengeApp.chunkOfWords.length;
  } 

  //Функция получения произвольного слова из массива слов для игры
  private async getCorrectAnswer(): Promise<void> {
    if (StartAudioChallengeApp.chunkOfWords.length) {
      const сorrectAnswerPosition =  StartAudioChallengeApp.getRandomNumber(0, StartAudioChallengeApp.chunkOfWords.length - 1);
      StartAudioChallengeApp.correctAnswer = StartAudioChallengeApp.chunkOfWords[сorrectAnswerPosition];
      StartAudioChallengeApp.chunkOfWords.splice(сorrectAnswerPosition, 1);
    }
  }

  //Функция создания 5 вариантов ответов (верный ответ и 4 неправильных ответа) в произвольном порядке
  private async getAnswerVariants(): Promise<void> {
    const wrongAnswersNumber = 4;
    const correctAnswer = StartAudioChallengeApp.correctAnswer.wordTranslate;
    const minNumber = 0;
    const maxPageNumber = 29;

    while (StartAudioChallengeApp.answers.length < wrongAnswersNumber) {  
      const page = StartAudioChallengeApp.getRandomNumber(minNumber, maxPageNumber);
      const wordСhunk: Array<Word> = await this.getWordsChunk(StartAudioChallengeApp.wordGroup, page);

      const getVariant = (): string => {
        return wordСhunk[StartAudioChallengeApp.getRandomNumber(minNumber, wordСhunk.length - 1)].wordTranslate;
      }
      const setVariant = (variant: string): void => {
        if (!StartAudioChallengeApp.answers.includes(variant) && variant !== correctAnswer){
          StartAudioChallengeApp.answers.push(variant);
        }
      }

      const variant1 =  getVariant();
      const variant2 =  getVariant();
      setVariant(variant1);
      setVariant(variant2);
    }
    StartAudioChallengeApp.answers.splice(StartAudioChallengeApp.getRandomNumber(minNumber, wrongAnswersNumber), 0, correctAnswer);
  }

  //Функция обновления статистики раунда
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

  //Функция для старта игры
  public async startGame(target: HTMLElement): Promise<void> {
    await this.resetRoundData();
    await this.resetAnswers();
    await this.getWordGroupAndPage(target);
    await this.setWords(StartAudioChallengeApp.wordGroup, StartAudioChallengeApp.wordPage);
    await this.getCorrectAnswer();
    await this.getAnswerVariants();
    await this.renderPage();
    await this.setDataToPage();
    this.addListeners();

    const audioPath = `${StartAudioChallengeApp.basePageLink}/${StartAudioChallengeApp.correctAnswer.audio}`;
    await this.playAudio(audioPath);
  }

  //Функция для следующего слова
  private async nextWord(): Promise<void> {
    const nextBtn = document.querySelector('.audio-challenge-container__next') as HTMLElement;
    nextBtn.classList.add('disabled');

    if (StartAudioChallengeApp.chunkOfWords.length) {
      await this.resetAnswers();
      await this.getCorrectAnswer();
      await this.getAnswerVariants();
      await this.renderPage();
      await this.setDataToPage();

      const audioPath = `${StartAudioChallengeApp.basePageLink}/${StartAudioChallengeApp.correctAnswer.audio}`;
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
        const audioPath = `${StartAudioChallengeApp.basePageLink}/${StartAudioChallengeApp.correctAnswer.audio}`;
        this.playAudio(audioPath);
      }

      if(target.closest('.round-statistic__audio') && audioChallengePage) {
        const audioPath = `${StartAudioChallengeApp.basePageLink}/${target.dataset.audio}`;
        this.playAudio(audioPath);
      }

      if(target.closest('.audio-challenge__game-difficulty')) {
        this.startGame(target);
      }

      if(target.closest('.round-statistic__replay')) {
        this.startGame(target);
      }

      if(target.closest('.round-statistic__book')) {
        console.log('book');
      }

      if(target.closest('.round-statistic__back')) {
        // startApp.render();
      }

      // if(target.classList.contains('audio-challenge-container__close')) {
      //   console.log('close');
      // }
    }

    const delegationKeyboardEvents = (event: KeyboardEvent): void => {
      const gameDifficultyPage = document.querySelector('.audio-challenge__game-difficulty');
      const audioChallengePage = document.querySelector('.audio-challenge-container__content');
      const gameDifficultyButtons = document.querySelectorAll('.audio-challenge__game-difficulty') as NodeListOf<HTMLElement>;
      const audioChallengeAnswerButtons = document.querySelectorAll('.audio-challenge-container__variant') as NodeListOf<HTMLElement>;
      const dontKnowBtn = document.querySelector('.audio-challenge-container__dont-know') as HTMLElement;
      const nextBtn = document.querySelector('.audio-challenge-container__next') as HTMLElement;

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
            if (!dontKnowBtn.classList.contains('hidden')) {
              this.checkAnswer(dontKnowBtn);
            } else if (!nextBtn.classList.contains('hidden') && !nextBtn.classList.contains('disabled')) {
              this.nextWord();
            }
            break;
        }
      }
    }

    if (!StartAudioChallengeApp.isGameStart) {
      document.addEventListener('click', delegationMouseEvents);
      document.addEventListener('keyup', delegationKeyboardEvents);
      StartAudioChallengeApp.isGameStart = true; 
    }
  }
}

export default StartAudioChallengeApp;
