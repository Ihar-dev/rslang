import {
  getBody,
  getElementByClassName,
  getListOfElementsByClassName,
  getElementById,
  setElementActive,
  addClassForElement,
  setElementInactive,
  removeClassForElement,
  toggleElement,
  classListContains,
  getRandomElementForStringArray,
  setAttributeForElements,
  setAttributeForElement,
  getAttributeFromElement,
} from './helper';
import Main from '../view/study-book/main';
import '../view/study-book/study-book.css';

import {
  StartApp,
  settings,
  startAppInterface
} from './start';


type wordsResponse = {
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
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
}

type wordDataResponse = {
  id ? : string,
  wordId ? : string,
  difficulty: string,
  optional: {
    correctAnswersCount: number,
    correctAnswersCountForStatistics: number,
    allAnswersCount: number,
  },
}

class StudyBook {

  studiedWordsOnPageCount: number;
  wordsSettings: {
    group: number,
    page: number,
  };

  constructor() {
    if (localStorage.getItem('rslang-words-settings')) {
      this.wordsSettings = JSON.parse(localStorage.getItem('rslang-words-settings') || '');
    } else this.wordsSettings = {
      group: 0,
      page: 0,
    };
    this.studiedWordsOnPageCount = 0;
  }

  public async render(): Promise < void > {
    await this.renderCoreComponents();
    this.addPaginationListeners();
    this.addGroupMenuListeners();
  }

  private async renderCoreComponents(): Promise < void > {
    const page = getElementByClassName('page-container') as HTMLElement;
    page.innerHTML = await Main.render();
    this.handleGroupMenu();
    const data = await this.getWords(this.wordsSettings.group, this.wordsSettings.page);
    localStorage.setItem('rslang-words-data', JSON.stringify(data));
    if (this.wordsSettings.group === 6) this.openHardWordsPage();
    else this.renderCards(data);
  }

  public handleGroupMenu(): void {
    const startApp = new StartApp();
    const seventhButton = getElementByClassName('book-cont__seventh-button') as HTMLElement;
    if (seventhButton) {
      if (!startApp.userSettings.userId) seventhButton.style.display = 'none';
      else seventhButton.style.display = 'block';
    };
  }

  private addGroupMenuListeners(): void {
    const pageCount = getElementByClassName('book-cont__page-count') as HTMLElement;
    const paginationContainer = getElementByClassName('book-cont__pagination-container') as HTMLElement;
    const groupsButton = getElementByClassName('book-cont__groups-button') as HTMLElement;
    const groupsChangeButtons = getElementByClassName('book-cont__groups-change-buttons') as HTMLElement;

    groupsButton.addEventListener('click', () => {
      toggleElement(groupsChangeButtons);
    });


    const firstButton = getElementByClassName('book-cont__first-button') as HTMLElement;
    firstButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 0) {
        const data = await this.getWords(this.wordsSettings.group = 0, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const secondButton = getElementByClassName('book-cont__second-button') as HTMLElement;
    secondButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 1) {
        const data = await this.getWords(this.wordsSettings.group = 1, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const thirdButton = getElementByClassName('book-cont__third-button') as HTMLElement;
    thirdButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 2) {
        const data = await this.getWords(this.wordsSettings.group = 2, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const forthButton = getElementByClassName('book-cont__forth-button') as HTMLElement;
    forthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 3) {
        const data = await this.getWords(this.wordsSettings.group = 3, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const fifthButton = getElementByClassName('book-cont__fifth-button') as HTMLElement;
    fifthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 4) {
        const data = await this.getWords(this.wordsSettings.group = 4, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const sixthButton = getElementByClassName('book-cont__sixth-button') as HTMLElement;
    sixthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 5) {
        const data = await this.getWords(this.wordsSettings.group = 5, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
        toggleElement(groupsChangeButtons);
        paginationContainer.style.display = 'flex';
      }
    });

    const seventhButton = getElementByClassName('book-cont__seventh-button') as HTMLElement;
    seventhButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 6) {
        const data = await this.getWords(this.wordsSettings.group = 6, this.wordsSettings.page);
        toggleElement(groupsChangeButtons);
        this.openHardWordsPage();
        localStorage.setItem('rslang-words-settings', JSON.stringify(this.wordsSettings));
        paginationContainer.style.display = 'none';
        const studyingPlate = getElementByClassName('book-cont__studying') as HTMLElement;
        setElementInactive(studyingPlate);
      }
    });
  }

  private async openHardWordsPage(): Promise < void > {
    const paginationContainer = getElementByClassName('book-cont__pagination-container') as HTMLElement;
    paginationContainer.style.display = 'none';
    const startApp = new StartApp();
    const userWords = await this.getAllUserWords();
    const bookCont = getElementByClassName('page-container__book-cont') as HTMLElement;
    this.renderCardsHeading(bookCont, true);
    const allUserHardWords = userWords.filter(elem => elem.difficulty === 'hard');
    const allUserHardWordsImproved: wordsResponse[] = [];
    allUserHardWords.forEach(async (elem, index) => {
      if (elem.wordId) {
        const hardWordFullData = await this.getWord(elem.wordId);
        allUserHardWordsImproved.push(hardWordFullData);
        if (index === allUserHardWords.length - 1) {
          allUserHardWordsImproved.forEach(el => {
            this.renderNewCard(el, bookCont, userWords, startApp);
          });
        };
      };
    });
  }

  private async getWord(wordId: string): Promise < wordsResponse > {
    let data = [];
    let url = `${settings.APIUrl}words/${wordId}`;
    try {
      const res = await fetch(url);
      data = await res.json();
    } catch (er) {}
    return data;
  }

  private addPaginationListeners(): void {
    const pageCount = getElementByClassName('book-cont__page-count') as HTMLElement;
    pageCount.textContent = `${this.wordsSettings.page + 1}/${settings.numberOfPages}`;
    const leftButton = getElementByClassName('book-cont__left-button') as HTMLElement;
    leftButton.addEventListener('click', async () => {
      if (this.wordsSettings.page > 0) {
        const data = await this.getWords(this.wordsSettings.group, --this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });
    const rightButton = getElementByClassName('book-cont__right-button') as HTMLElement;
    rightButton.addEventListener('click', async () => {
      if (this.wordsSettings.page < settings.numberOfPages - 1) {
        const data = await this.getWords(this.wordsSettings.group, ++this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });

    const leftFastButton = getElementByClassName('book-cont__left-fast-button') as HTMLElement;
    leftFastButton.addEventListener('click', async () => {
      if (this.wordsSettings.page > 0) {
        const data = await this.getWords(this.wordsSettings.group, this.wordsSettings.page = 0);
        this.handlePagination(pageCount, data);
      }
    });

    const rightFastButton = getElementByClassName('book-cont__right-fast-button') as HTMLElement;
    rightFastButton.addEventListener('click', async () => {
      if (this.wordsSettings.page < settings.numberOfPages - 1) {
        const data = await this.getWords(this.wordsSettings.group, this.wordsSettings.page = settings.numberOfPages - 1);
        this.handlePagination(pageCount, data);
      }
    });
  }

  private async handlePagination(pageCount: HTMLElement, data: wordsResponse[]): Promise < void > {
    this.renderCards(data);
    pageCount.textContent = `${this.wordsSettings.page + 1}/${settings.numberOfPages}`;
    localStorage.setItem('rslang-words-settings', JSON.stringify(this.wordsSettings));
  }

  private renderCardsHeading(bookCont: HTMLElement, hardWordsPage: boolean): void {
    bookCont.innerHTML = '';
    const bookContHeading = getElementByClassName('book-cont__heading') as HTMLElement;
    if (hardWordsPage) bookContHeading.textContent = `Уровень сложности Сложные`;
    else bookContHeading.textContent = `Уровень сложности ${this.wordsSettings.group + 1}`;
    switch (this.wordsSettings.group) {
      case 0:
        bookContHeading.style.color = '#357C3C';
        break;
      case 1:
        bookContHeading.style.color = '#E8E8A6';
        break;
      case 2:
        bookContHeading.style.color = '#FFBC80';
        break;
      case 3:
        bookContHeading.style.color = '#F76E11';
        break;
      case 4:
        bookContHeading.style.color = '#FC4F4F';
        break;
      case 5:
        bookContHeading.style.color = '#9C0F48';
        break;
      default:
        bookContHeading.style.color = 'white';
    }
    if (hardWordsPage) bookContHeading.style.color = '#E5890A';
  }

  public async handleHardWordButton(elId: string, userWords: wordDataResponse[], startApp: startAppInterface, cardHardButton: HTMLElement, refreshStatus: boolean): Promise < void > {
    const filteredUserWords = userWords.filter(elem => elem.wordId === elId);
    if (filteredUserWords.length && filteredUserWords[0].difficulty === 'hard') {
      setAttributeForElement(cardHardButton, 'title', 'Убрать из сложных');
      setElementActive(cardHardButton);
    } else setAttributeForElement(cardHardButton, 'title', 'Добавить в сложные');
    if (refreshStatus) {
      cardHardButton.addEventListener('click', async () => {
        if (getAttributeFromElement(cardHardButton, 'title') === 'Добавить в сложные') {
          const filteredUserWords = userWords.filter(elem => elem.wordId === elId);
          if (filteredUserWords.length) this.updateUserWord(elId, 'hard', filteredUserWords[0].optional.correctAnswersCount,
            filteredUserWords[0].optional.correctAnswersCountForStatistics, filteredUserWords[0].optional.allAnswersCount);
          else this.addUserWord(elId, 'hard', 0, 0, 0);
          setAttributeForElement(cardHardButton, 'title', 'Убрать из сложных');
          setElementActive(cardHardButton);
        } else {
          const wordData = await this.getUserWord(elId);
          this.updateUserWord(elId, 'studied', wordData.optional.correctAnswersCount, wordData.optional.correctAnswersCountForStatistics, wordData.optional.allAnswersCount);
          setAttributeForElement(cardHardButton, 'title', 'Добавить в сложные');
          setElementInactive(cardHardButton);
        }

        const bookContHeading = getElementByClassName('book-cont__heading') as HTMLElement;
        if (bookContHeading.textContent === `Уровень сложности Сложные`) this.openHardWordsPage();
      });

      if (startApp.userSettings.userId) cardHardButton.style.display = 'block';
      else cardHardButton.style.display = 'none';
    };
  }

  public async handleStudiedWordOnPageCount(): Promise < void > {
    this.studiedWordsOnPageCount = 0;
    const startApp = new StartApp();
    let userWords: wordDataResponse[] = [{
      difficulty: '',
      optional: {
        correctAnswersCount: 0,
        correctAnswersCountForStatistics: 0,
        allAnswersCount: 0,
      },
    }];
    if (startApp.userSettings.userId) {
      userWords = await this.getAllUserWords();
    };
    const data = await this.getWords(this.wordsSettings.group, this.wordsSettings.page);
    data.forEach(el => {
      const filteredUserWords = userWords.filter(elem => elem.wordId === el.id);
      if (filteredUserWords.length && filteredUserWords[0].difficulty === 'studied' && filteredUserWords[0].optional.correctAnswersCount >= 3 ||
        filteredUserWords.length && filteredUserWords[0].difficulty === 'hard' && filteredUserWords[0].optional.correctAnswersCount >= 5) {
        this.studiedWordsOnPageCount++;
      }
    });

    const studyingPlate = getElementByClassName('book-cont__studying') as HTMLElement;
    const bookButton = getElementByClassName('menu__book-button') as HTMLElement;
    if (this.studiedWordsOnPageCount === settings.wordsPerPage) {
      setElementActive(studyingPlate);
      bookButton.style.backgroundColor = 'rgba(229, 137, 10, 0.8)';
    } else {
      setElementInactive(studyingPlate);
      bookButton.style.backgroundColor = 'white';
    };
  }

  public async handleStudiedWordButton(elId: string, userWords: wordDataResponse[], startApp: startAppInterface, studiedButton: HTMLElement, refreshStatus: boolean): Promise < void > {
    const filteredUserWords = userWords.filter(elem => elem.wordId === elId);
    if (filteredUserWords.length && filteredUserWords[0].difficulty === 'studied' && filteredUserWords[0].optional.correctAnswersCount >= 3 ||
      filteredUserWords.length && filteredUserWords[0].difficulty === 'hard' && filteredUserWords[0].optional.correctAnswersCount >= 5) {
      setAttributeForElement(studiedButton, 'title', 'Убрать из изученных');
      setElementActive(studiedButton);
    } else {
      setAttributeForElement(studiedButton, 'title', 'Добавить в изученные');
    };
    if (refreshStatus) {
      studiedButton.addEventListener('click', async () => {
        if (getAttributeFromElement(studiedButton, 'title') === 'Добавить в изученные') {
          const filteredUserWords = userWords.filter(elem => elem.wordId === elId);
          if (filteredUserWords.length) this.updateUserWord(elId, 'studied', 3,
            filteredUserWords[0].optional.correctAnswersCountForStatistics, filteredUserWords[0].optional.allAnswersCount);
          else this.addUserWord(elId, 'studied', 3, 0, 0);
          setAttributeForElement(studiedButton, 'title', 'Убрать из изученных');
          setElementActive(studiedButton);
        } else {
          const wordData = await this.getUserWord(elId);
          this.updateUserWord(elId, wordData.difficulty, 0, wordData.optional.correctAnswersCountForStatistics, wordData.optional.allAnswersCount);
          setAttributeForElement(studiedButton, 'title', 'Добавить в изученные');
          setElementInactive(studiedButton);
        }

        this.handleStudiedWordOnPageCount();
      });

      if (startApp.userSettings.userId) studiedButton.style.display = 'block';
      else studiedButton.style.display = 'none';
    };
  }

  public async updateUserWord(wordId: string, difficulty: string, correctAnswersCount: number, correctAnswersCountForStatistics: number, allAnswersCount: number): Promise < void > {
    const startApp = new StartApp();
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`;
      const newWord: wordDataResponse = {
        difficulty: difficulty,
        optional: {
          correctAnswersCount: correctAnswersCount,
          correctAnswersCountForStatistics: correctAnswersCountForStatistics,
          allAnswersCount: allAnswersCount,
        }
      };
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
      });
    } catch (er) {}
  }

  public async addUserWord(wordId: string, difficulty: string, correctAnswersCount: number, correctAnswersCountForStatistics: number, allAnswersCount: number): Promise < void > {
    const startApp = new StartApp();
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`;
      const newWord: wordDataResponse = {
        difficulty: difficulty,
        optional: {
          correctAnswersCount: correctAnswersCount,
          correctAnswersCountForStatistics: correctAnswersCountForStatistics,
          allAnswersCount: allAnswersCount,
        }
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
      });
    } catch (er) {}
  }

  public async getUserWord(wordId: string): Promise < wordDataResponse > {
    const startApp = new StartApp();
    let data = {
      difficulty: '',
      optional: {
        correctAnswersCount: 0,
        correctAnswersCountForStatistics: 0,
        allAnswersCount: 0,
      },
    };
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/${wordId}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      data = await res.json();
    } catch (er) {}
    return data;
  }

  public async getAllUserWords(): Promise < wordDataResponse[] > {
    const startApp = new StartApp();
    let data = [{
      difficulty: '',
      optional: {
        correctAnswersCount: 0,
        correctAnswersCountForStatistics: 0,
        allAnswersCount: 0,
      },
      wordId: '',
    }];;
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/words/`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      data = await res.json();
    } catch (er) {}
    return data;
  }

  private async renderCards(data: wordsResponse[]): Promise < void > {
    const startApp = new StartApp();
    let userWords = [{
      difficulty: '',
      optional: {
        correctAnswersCount: 0,
        correctAnswersCountForStatistics: 0,
        allAnswersCount: 0,
      },
    }];
    if (startApp.userSettings.userId) {
      userWords = await this.getAllUserWords();
    };
    const bookCont = getElementByClassName('page-container__book-cont') as HTMLElement;
    this.renderCardsHeading(bookCont, false);
    data.forEach(el => this.renderNewCard(el, bookCont, userWords, startApp));
    this.handleStudiedWordOnPageCount();
  }

  private renderNewCard(el: wordsResponse, bookCont: HTMLElement, userWords: wordDataResponse[], startApp: startAppInterface): void {
    const card = document.createElement('div');
    addClassForElement(card, 'book-cont__word-card');
    bookCont.append(card);
    const imgContainer = document.createElement('div');
    imgContainer.style.backgroundImage = `url(${settings.APIUrl}${el.image})`;
    addClassForElement(imgContainer, 'book-cont__img-container');
    card.append(imgContainer);
    const translationContainer = document.createElement('div');
    addClassForElement(translationContainer, 'book-cont__translation-cont');
    imgContainer.append(translationContainer);

    const audioMeaningButton = document.createElement('div');
    addClassForElement(audioMeaningButton, 'book-cont__audio-meaning-button');
    const audio = new Audio();
    audio.src = `${settings.APIUrl}${el.audio}`;
    const audioMeaning = new Audio();
    audioMeaning.src = `${settings.APIUrl}${el.audioMeaning}`;
    const audioExample = new Audio();
    audioExample.src = `${settings.APIUrl}${el.audioExample}`;
    translationContainer.append(audioMeaningButton);
    audioMeaningButton.addEventListener('click', () => {
      audio.play();
      setTimeout(() => {
        audioMeaning.play();
      }, audio.duration * 1000);
      setTimeout(() => {
        audioExample.play();
      }, audio.duration * 1000 + audioMeaning.duration * 1000);
    });

    const transcriptionText = document.createElement('div');
    addClassForElement(transcriptionText, 'book-cont__transcription-text');
    transcriptionText.textContent = el.transcription;
    translationContainer.append(transcriptionText);

    const translationText = document.createElement('div');
    addClassForElement(translationText, 'book-cont__translation-text');
    translationText.textContent = el.wordTranslate;
    translationContainer.append(translationText);

    const cardWord = document.createElement('div');
    addClassForElement(cardWord, 'book-cont__word');
    cardWord.textContent = el.word;
    imgContainer.append(cardWord);

    const textMeaning = document.createElement('div');
    addClassForElement(textMeaning, 'book-cont__text-meaning');
    textMeaning.innerHTML = el.textMeaning;
    card.append(textMeaning);
    const textExample = document.createElement('div');
    addClassForElement(textExample, 'book-cont__text-example');
    textExample.innerHTML = el.textExample;
    card.append(textExample);
    const hr = document.createElement('hr');
    addClassForElement(hr, 'book-cont__hr');
    card.append(hr);
    const textExampleTranslate = document.createElement('div');
    addClassForElement(textExampleTranslate, 'book-cont__text-example-translate');
    textExampleTranslate.textContent = el.textExampleTranslate;
    card.append(textExampleTranslate);
    const textMeaningTranslate = document.createElement('div');
    addClassForElement(textMeaningTranslate, 'book-cont__text-meaning-translate');
    textMeaningTranslate.textContent = el.textMeaningTranslate;
    card.append(textMeaningTranslate);

    const cardHardButton = document.createElement('div');
    addClassForElement(cardHardButton, 'book-cont__hard-button');
    setAttributeForElement(cardHardButton, 'word-id', el.id);
    imgContainer.append(cardHardButton);
    this.handleHardWordButton(el.id, userWords, startApp, cardHardButton, true);

    const studiedButton = document.createElement('div');
    addClassForElement(studiedButton, 'book-cont__studied-button');
    setAttributeForElement(studiedButton, 'word-id', el.id);
    imgContainer.append(studiedButton);
    this.handleStudiedWordButton(el.id, userWords, startApp, studiedButton, true);

    const statisticsPlate = document.createElement('div');
    addClassForElement(statisticsPlate, 'book-cont__statistics-plate');
    setAttributeForElement(statisticsPlate, 'word-id', el.id);
    imgContainer.append(statisticsPlate);
    this.handleStatisticsPlaten(el.id, userWords, startApp, statisticsPlate);
  }

  public async handleStatisticsPlaten(elId: string, userWords: wordDataResponse[], startApp: startAppInterface, statisticsPlate: HTMLElement): Promise < void > {
    const filteredUserWords = userWords.filter(elem => elem.wordId === elId);
    if (filteredUserWords.length) {
      setAttributeForElement(statisticsPlate, 'title', 'Статистика по играм');
      if (filteredUserWords[0].optional.allAnswersCount) {
        statisticsPlate.textContent = `${filteredUserWords[0].optional.correctAnswersCountForStatistics}/${filteredUserWords[0].optional.allAnswersCount}`;
      };
    };

  }

  private async getWords(group: number, page: number): Promise < wordsResponse[] > {
    let data = [];
    let url = `${settings.APIUrl}words`;
    if (this.wordsSettings.group || this.wordsSettings.page) url += `?group=${group}&page=${page}`;
    try {
      const res = await fetch(url);
      data = await res.json();
    } catch (er) {}
    return data;
  }

}

export {
  StudyBook
};