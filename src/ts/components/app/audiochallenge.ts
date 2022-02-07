//* Логика работы

//* 0. Сброс счётчиков правельных и неправильных ответов, сброс счетчика серии правельных ответов - ОК!

//* 1. Отбираются слова для игры (для теста выбираем страницу и уровень заранее) - делается 1 раз после старта игры. Массив объектов (как с сервера). - getChunkOfWords() ОК!

//* 2. Рандомно выбирается слово для игры из отобранных слов (пункт 1). Сохраняем его позицию в массиве слов (20 слов). - ОК!
//* 3. Рандомно выбираются 4 ложных ответа. Ответы не должны повторятся между собой и правельным. Сохраняются в массив. - ОК!
//* 4. Рандомно добавляем правельный ответ (слово) в массив с 4 ложными ответами => массив с 5 ответами; - ОК!

//* 5. Рендеринг страницы (шаблона); - ОК!

//* 6. Изменение страницы на основе выбранного слова: - ОК!
//* - Вставка картинки, звука, слова на английсом в теги;
//* - Вставка вариантов ответа в кнопки (ставка переводов);

//* 7. При клике проверяем перевод слова на правельность (правельный ответ сохранён, выбранный ответ берём из клика по кнопке - событие). - ОК!

//* 8. Изменение данных о слове: правильно / не правильно и т.п.

//* 9. Отрисовка страницы с ответом (появление слова, индикаторы у кнопок и т.п.).

//* 10. Удаление слова по позиции (которая была заранее сохранена) из массива слов для игры (пункт 1). - ОК!

//* 11. Проверка массива слов для игры, если он пуст, то игра окончена, если нет - следующий раунд (повторяем действия начиная с пункта 2)

//* 12. Если раунд окончен, вывод статистики

//* 13. Сохранение прогресса по изучению слов в localStorage
//* { "id слова" : { status: "learned" , correctAnswers: 3 } }

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

class StartAudiochallengeApp {
  private static basePageLink = 'https://react-rslang-hauzinski.herokuapp.com';

  private static wordGroup = '0';
  private static wordPage = '0';

  private static chunkOfWords: Array<Word>;
  private static correctAnswer: Word;
  private static answers: Array<string>;

  private static roundStatistic = {
    numberOfQuestions: 0,
    correctAnswers: 0,
    correctAnswersSeries: 0,
    maxCorrectAnswersSeries: 0,
  }

  //* Функция получения пандомного числа в заданном диапазоне
  public static getRandomNumber(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  //* Функция рендеринга шаблона страницы с игрой (раунд)
  public async render() {
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
    //TODO Добавить контент в блок со статистикой
    // const statistic = document.querySelector('.audiochallenge-container__round-statistic') as HTMLElement;
  }

  //* Функция для произношения слова
  public async sayWord() {
    const audio = new Audio();
    audio.src = `${StartAudiochallengeApp.basePageLink}/${StartAudiochallengeApp.correctAnswer.audio}`;
    audio.currentTime = 0;
    audio.play();
  }

  //* Функция сравнения ответа
  public async checkAnswer(event: Event){
    const target = event.target as HTMLElement;
    const answer = target.closest('.audiochallenge-container__variant')?.lastElementChild?.innerHTML;
    const correctAnswer = StartAudiochallengeApp.correctAnswer.wordTranslate;
    
    if (answer === correctAnswer) {
      //TODO Действия после корректного ответа
      console.log('OK!');
    } else {
      //TODO Действия после неправильного ответа
      console.log('WRONG!');
    }
  }

  //TODO Функция получения данных о текщей страницы (группа и страница) запуска игры
  public async getWordGroupAndPage() {
    StartAudiochallengeApp.wordGroup = '0';  
    StartAudiochallengeApp.wordPage = '0';  
  }

  //* Функция сброса статистики (перед началом раунда)
  private async resetRoundStatistic() { 
    StartAudiochallengeApp.roundStatistic.numberOfQuestions = 0;
    StartAudiochallengeApp.roundStatistic.correctAnswers = 0;
    StartAudiochallengeApp.roundStatistic.correctAnswersSeries = 0;
    StartAudiochallengeApp.roundStatistic.maxCorrectAnswersSeries = 0;
  }

  //* Функция сброса вариантов ответа (перед началом раунда)
  private async resetAnswers() {
    StartAudiochallengeApp.answers = [];
  }

  //* Функция получения массива слов в зависимости от заданных параметров (группа и страница)
  private async getChunkOfWords(group: string, page: string) {    
    const wordСhunkPageLink = `${StartAudiochallengeApp.basePageLink}/words?group=${group}&page=${page}`;
    return (await fetch(wordСhunkPageLink)).json();
  }

  //* Функция сохранения полученного массива слов для раунда
  private async setWords(group: string, page: string) {
    const data = await this.getChunkOfWords(group, page);
    StartAudiochallengeApp.chunkOfWords = [...data];
    StartAudiochallengeApp.roundStatistic.numberOfQuestions = StartAudiochallengeApp.chunkOfWords.length;
  } 
  
  //* Функция получения рандомного слова для раунда
  private async getCorrectAnswer() {
    if (StartAudiochallengeApp.chunkOfWords.length) {
      const CorrectAnswerPosition =  StartAudiochallengeApp.getRandomNumber(0, StartAudiochallengeApp.chunkOfWords.length);
      StartAudiochallengeApp.correctAnswer = StartAudiochallengeApp.chunkOfWords[CorrectAnswerPosition];
      StartAudiochallengeApp.chunkOfWords.splice(CorrectAnswerPosition, 1);
    }
  }

  //* Функция получения вариантов ответа (массив из правильного и 4 неправильных ответов)
  private async getAnswers() {
    const wrongAnswersNumber = 4;
    const correctAnswer = StartAudiochallengeApp.correctAnswer.wordTranslate;

    if (StartAudiochallengeApp.answers.length < wrongAnswersNumber) {
      const maxGroupNumber = 5;
      const maxPageNumber = 29;
      const group = String(StartAudiochallengeApp.getRandomNumber(0, maxGroupNumber));
      const page = String(StartAudiochallengeApp.getRandomNumber(0, maxPageNumber));
      const wordСhunk: Array<Word> = await this.getChunkOfWords(group, page);
      const variant = wordСhunk[StartAudiochallengeApp.getRandomNumber(0, wordСhunk.length - 1)].wordTranslate;

      if (!StartAudiochallengeApp.answers.includes(variant) && variant !== correctAnswer){
        StartAudiochallengeApp.answers.push(variant);
      }

      await this.getAnswers();
    } else {
      StartAudiochallengeApp.answers.splice(StartAudiochallengeApp.getRandomNumber(0, wrongAnswersNumber), 0, correctAnswer);
    }
  }

  //* Функция изменения данных отрендеренной страницы на основе данных для раунда
  private async setDataToPage(){
    const img = document.querySelector('.audiochallenge-container__word-image') as HTMLTemplateElement;
    const word = document.querySelector('.audiochallenge-container__word') as HTMLTemplateElement;
    const variantsNumber = document.querySelectorAll('.audiochallenge-container__variant-number');
    const variantsText = document.querySelectorAll('.audiochallenge-container__text');

    if (img) {
      img.style.backgroundImage = `url(${StartAudiochallengeApp.basePageLink}/${StartAudiochallengeApp.correctAnswer.image})`;
    }
    if (word) {
      word.innerHTML = `${StartAudiochallengeApp.correctAnswer.word}`;
    }

    for (let i = 0; i < variantsText.length; i++) {
      variantsNumber[i].innerHTML = `${i+1}`;
      variantsText[i].innerHTML = `${StartAudiochallengeApp.answers[i]}`;
    }
  }

  //* Функция старта игры
  public async startGame() {
    await this.resetRoundStatistic();
    await this.resetAnswers();
    await this.setWords(StartAudiochallengeApp.wordGroup, StartAudiochallengeApp.wordPage);
    await this.getCorrectAnswer();
    await this.getAnswers();
    await this.render();
    await this.setDataToPage();
    await this.sayWord();
  }
}

export default StartAudiochallengeApp;
