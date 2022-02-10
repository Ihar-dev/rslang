//* Логика работы
// 1.	Сброс статистики раунда перед началом игры - [DONE]
// 2.	Сброс вариантов ответов перед началом игры и перед следующим вопросом - [DONE]
// 3.	Получение данных о странице запуска приложения
// 4.	Получение массива слова (20 шт.) с сервера для составления вопросов к игре - [DONE]
// 5.	Составление массива слова (до 20 шт.) для вопросов к игре - [DOING]
// 6.	Сохранение массива из пункта 4 в константу в приложении (можно объединить с пунктом 4) - [DONE]
// 7.	Получение произвольного слова из готового массива слов для вопроса - [DONE]
// 8.	Получение 5 вариантов ответов в произвольном порядке (1 верный и 4 неверных) - [DONE]
// 9.	Отрисовка шаблона страницы игры - [DONE]
// 10.	Изменение отрисованного шаблона страницы игры на основе полученных данных - [DONE]
// 11.	Произношение слова в начале вопроса (1 раз) - [DONE]
// 12.	Проверка выбранного варианта ответа, изменение стилей страницы - [DONE]
// 13.	Изменение статистики раунда игры - [DONE]
// 14.	Изменение данных о слове ({ "id слова" : { status: "learned" , correctAnswers: 3 } })
// 15.	Проверка оставшихся слов для продолжения игры (если слова есть, то игра продолжается; если нет – то выводится статистика раунда игры, данные о словах сохраняются) - [DONE]
// 16.	Следующий вопрос (повторить пункты 7 – 15) - [DONE]
// 17.	Конец раунда(игры) - вывод статистики раунда и сохранение данных о словах в вопросах

import AudiochallengeContent from '../view/audiochallenge/audiochallenge';
import AudiochallengeTopContent from '../view/audiochallenge/top/top';
import AudiochallengeVarianContent from '../view/audiochallenge/variant/variant';
import AudiochallengeBottomContent from '../view/audiochallenge/bottom/bottom';

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

interface WordData {
  word: string,
  wordTranslate: string,
  audio: string,
}

interface RoundStatistic {
  numberOfQuestions: number,
  correctAnswers: Array<WordData>,
  wrongAnswers: Array<WordData>,
  correctAnswersSeries: number,
  bestCorrectAnswersSeries: number,
}

class StartAudiochallengeApp {
  private static basePageLink = 'https://react-rslang-hauzinski.herokuapp.com';

  private static wordGroup = 0;
  private static wordPage = 0;

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
  public static getRandomNumber(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  //Функция для отрисовки шаблона страницы
  public async renderPage(): Promise<void> {
    const answersNumber = 5;

    const page = document.querySelector('.page-container') as HTMLElement;
    page.innerHTML = await AudiochallengeContent.render();

    const top = document.querySelector('.audiochallenge-container__top') as HTMLElement;
    top.innerHTML = await AudiochallengeTopContent.render();

    const middle = document.querySelector('.audiochallenge-container__middle') as HTMLElement;
    middle.innerHTML = "";
    for (let i = 1; i <= answersNumber; i++) {
      middle.insertAdjacentHTML('beforeend', await AudiochallengeVarianContent.render());
    }

    const bottom = document.querySelector('.audiochallenge-container__bottom') as HTMLElement;
    bottom.innerHTML = await AudiochallengeBottomContent.render();
    //TODO Добавить блок со статистикой раунда в конце игры
    // const statistic = document.querySelector('.audiochallenge-container__round-statistic') as HTMLElement;
  }

  //Функция для произношения предложенного слова
  public async sayWord(): Promise<void> {
    const audio = new Audio();
    audio.src = `${StartAudiochallengeApp.basePageLink}/${StartAudiochallengeApp.correctAnswer.audio}`;
    audio.currentTime = 0;
    audio.play();
  }

  //Функция проверки выбранного ответа на вопрос раунда игры
  public async checkAnswer(event: Event): Promise<void> {
    const target = event.target as HTMLElement;

    if (target.closest('.audiochallenge-container__variant')) {
      const answer = target.closest('.audiochallenge-container__variant')?.lastElementChild?.innerHTML;
      const correctAnswer = StartAudiochallengeApp.correctAnswer.wordTranslate;
      const result = Boolean(answer === correctAnswer);

      if (result) {
        //TODO Изменение данных о выбранном слове (количество правильных ответов, статус слова)
        //TODO Звук  ответа
        const children = target.closest('.audiochallenge-container__variant')?.children as HTMLCollectionOf<HTMLElement>;
        children[0].style.visibility = 'hidden';
        children[1].style.visibility = 'visible';
      } else {
        //TODO Изменение данных о выбранном слове (количество правильных ответов, статус слова)
        //TODO Звук  ответа
        target.closest('.audiochallenge-container__variant')?.classList.add('wrong');
      }
  
      await this.updateStatistic(result);
    } else if (target.closest('.audiochallenge-container__dont-know')) {
      await this.updateStatistic(false);
    }

    const playAudioBtn1 = document.querySelector('.audiochallenge-container__play-audio-1') as HTMLElement;
    const wordImage = document.querySelector('.audiochallenge-container__word-image') as HTMLElement;
    const wordContainer = document.querySelector('.audiochallenge-container__word-container') as HTMLElement;
    const variantBtns = document.querySelectorAll('.audiochallenge-container__variant') as NodeListOf<HTMLElement>;
    const dontKnowBtn = document.querySelector('.audiochallenge-container__dont-know') as HTMLElement;
    const nextBtn = document.querySelector('.audiochallenge-container__next') as HTMLElement;

    playAudioBtn1.style.display = 'none';
    wordImage.style.visibility = 'visible';
    wordContainer.style.visibility = 'visible';
    dontKnowBtn.style.display = 'none';
    nextBtn.style.display = 'flex';
    for(const value of variantBtns) {
      value.classList.add('disabled');
    }
  }

  //TODO Функция получения данных о странице запуска приложения
  // public async getWordGroupAndPage() {
  //   StartAudiochallengeApp.wordGroup = '0';
  //   StartAudiochallengeApp.wordPage = '0';
  // }

  //Функция обновления статистики раунда
  private async updateStatistic(argument: boolean): Promise<void> {
    const wordData = {
      word: StartAudiochallengeApp.correctAnswer.word,
      wordTranslate: StartAudiochallengeApp.correctAnswer.wordTranslate,
      audio: StartAudiochallengeApp.correctAnswer.audio,
    }
    const roundStatistic = StartAudiochallengeApp.roundStatistic;

    if (argument) {
      roundStatistic.correctAnswers.push(wordData);
      roundStatistic.correctAnswersSeries++;
    } else {
      roundStatistic.wrongAnswers.push(wordData);
      roundStatistic.correctAnswersSeries = 0;
    }

    if (roundStatistic.correctAnswersSeries > roundStatistic.bestCorrectAnswersSeries) {
      roundStatistic.bestCorrectAnswersSeries = roundStatistic.correctAnswersSeries;
    }
  }

  //Функция сброса статистики раунда перед его началом
  private async resetRoundStatistic(): Promise<void> { 
    StartAudiochallengeApp.roundStatistic.numberOfQuestions = 0;
    StartAudiochallengeApp.roundStatistic.correctAnswers.length = 0;
    StartAudiochallengeApp.roundStatistic.wrongAnswers.length = 0;
    StartAudiochallengeApp.roundStatistic.correctAnswersSeries = 0;
    StartAudiochallengeApp.roundStatistic.bestCorrectAnswersSeries = 0;
  }

  //Функция сброса вариантов ответа раунда перед его началом
  private async resetAnswers(): Promise<void> {
    StartAudiochallengeApp.answers.length = 0;
  }

  //Функция получения массива слов (20 слов) с сервера
  private async getWordsChunk(group: number, page: number): Promise<Word[]> {    
    const wordСhunkPageLink = `${StartAudiochallengeApp.basePageLink}/words?group=${group}&page=${page}`;
    return (await fetch(wordСhunkPageLink)).json();
  }

  //Функция сохранения массива слов (20 слов) в приложении
  private async setWords(group: number, page: number): Promise<void> {
    const data = await this.getWordsChunk(group, page);
    StartAudiochallengeApp.chunkOfWords = [...data];
    StartAudiochallengeApp.roundStatistic.numberOfQuestions = StartAudiochallengeApp.chunkOfWords.length;
  } 
  
  //Функция получения произвольного слова из массива слов для игры
  private async getCorrectAnswer(): Promise<void> {
    if (StartAudiochallengeApp.chunkOfWords.length) {
      const сorrectAnswerPosition =  StartAudiochallengeApp.getRandomNumber(0, StartAudiochallengeApp.chunkOfWords.length - 1);
      StartAudiochallengeApp.correctAnswer = StartAudiochallengeApp.chunkOfWords[сorrectAnswerPosition];
      StartAudiochallengeApp.chunkOfWords.splice(сorrectAnswerPosition, 1);
    }
  }

  //Функция создания 5 вариантов ответов (верный ответ и 4 неправильных ответа) в произвольном порядке
  private async getAnswerVariants(): Promise<void> {
    const wrongAnswersNumber = 4;
    const correctAnswer = StartAudiochallengeApp.correctAnswer.wordTranslate;

    if (StartAudiochallengeApp.answers.length < wrongAnswersNumber) {
      const maxGroupNumber = 5;
      const maxPageNumber = 29;
      const group = StartAudiochallengeApp.getRandomNumber(0, maxGroupNumber);
      const page = StartAudiochallengeApp.getRandomNumber(0, maxPageNumber);
      const wordСhunk: Array<Word> = await this.getWordsChunk(group, page);
      const variant = wordСhunk[StartAudiochallengeApp.getRandomNumber(0, wordСhunk.length - 1)].wordTranslate;

      if (!StartAudiochallengeApp.answers.includes(variant) && variant !== correctAnswer){
        StartAudiochallengeApp.answers.push(variant);
      }

      await this.getAnswerVariants();
    } else {
      StartAudiochallengeApp.answers.splice(StartAudiochallengeApp.getRandomNumber(0, wrongAnswersNumber), 0, correctAnswer);
    }
  }

  //Функция изменения отрисованного шаблона страницы игры на основе полученных данных
  private async setDataToPage(): Promise<void> {
    const img = document.querySelector('.audiochallenge-container__word-image') as HTMLTemplateElement;
    const word = document.querySelector('.audiochallenge-container__word') as HTMLTemplateElement;
    const variantsNumber = document.querySelectorAll('.audiochallenge-container__variant-number');
    const variantsText = document.querySelectorAll('.audiochallenge-container__text');
  
    img.style.backgroundImage = `url(${StartAudiochallengeApp.basePageLink}/${StartAudiochallengeApp.correctAnswer.image})`;
    word.innerHTML = `${StartAudiochallengeApp.correctAnswer.word}`;

    for (let i = 0; i < variantsText.length; i++) {
      variantsNumber[i].innerHTML = `${i+1}`;
      variantsText[i].innerHTML = `${StartAudiochallengeApp.answers[i]}`;
    }
  }

  //Функция для старта игры
  public async startGame(): Promise<void> {
    await this.resetRoundStatistic();
    await this.resetAnswers();
    await this.setWords(StartAudiochallengeApp.wordGroup, StartAudiochallengeApp.wordPage);
    await this.getCorrectAnswer();
    await this.getAnswerVariants();
    await this.renderPage();
    await this.setDataToPage();
    await this.sayWord();
  }

  //Функция для следующего слова
  public async nextWord(): Promise<void> {    
    if (StartAudiochallengeApp.chunkOfWords.length) {
      await this.resetAnswers();
      await this.getCorrectAnswer();
      await this.getAnswerVariants();
      await this.renderPage();
      await this.setDataToPage();
      await this.sayWord();
    } else {
      //TODO Страница статистики
      console.log("Game over");
      console.log("Правильно ответил:", StartAudiochallengeApp.roundStatistic.correctAnswers);
      console.log("Ошибся:", StartAudiochallengeApp.roundStatistic.wrongAnswers);
      console.log("Лучшая серия:", StartAudiochallengeApp.roundStatistic.bestCorrectAnswersSeries);
      console.log("Точность:", StartAudiochallengeApp.roundStatistic.correctAnswers.length / StartAudiochallengeApp.roundStatistic.numberOfQuestions);
    }
  }
}

export default StartAudiochallengeApp;
