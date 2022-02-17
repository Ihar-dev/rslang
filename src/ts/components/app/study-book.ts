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
  settings
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

class StudyBook {

  wordsSettings: {
    group: number,
    page: number,
  }

  constructor() {
    if (localStorage.getItem('rslang-words-settings')) {
      this.wordsSettings = JSON.parse(localStorage.getItem('rslang-words-settings') || '');
    } else this.wordsSettings = {
      group: 0,
      page: 0,
    };
  }

  public async render(): Promise < void > {
    await this.renderCoreComponents();
    this.addPaginationListeners();
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
      }
    });

    const secondButton = getElementByClassName('book-cont__second-button') as HTMLElement;
    secondButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 1) {
        const data = await this.getWords(this.wordsSettings.group = 1, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });

    const thirdButton = getElementByClassName('book-cont__third-button') as HTMLElement;
    thirdButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 2) {
        const data = await this.getWords(this.wordsSettings.group = 2, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });

    const forthButton = getElementByClassName('book-cont__forth-button') as HTMLElement;
    forthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 3) {
        const data = await this.getWords(this.wordsSettings.group = 3, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });

    const fifthButton = getElementByClassName('book-cont__fifth-button') as HTMLElement;
    fifthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 4) {
        const data = await this.getWords(this.wordsSettings.group = 4, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });

    const sixthButton = getElementByClassName('book-cont__sixth-button') as HTMLElement;
    sixthButton.addEventListener('click', async () => {
      if (this.wordsSettings.group !== 5) {
        const data = await this.getWords(this.wordsSettings.group = 5, this.wordsSettings.page);
        this.handlePagination(pageCount, data);
      }
    });
  }

  private async handlePagination(pageCount: HTMLElement, data: wordsResponse[]): Promise < void > {
    this.renderCards(data);
    pageCount.textContent = `${this.wordsSettings.page + 1}/${settings.numberOfPages}`;
    localStorage.setItem('rslang-words-settings', JSON.stringify(this.wordsSettings));
  }

  private async renderCoreComponents(): Promise < void > {
    const startApp = new StartApp();
    const page = getElementByClassName('page-container') as HTMLElement;
    page.innerHTML = await Main.render();
    const data = await this.getWords(this.wordsSettings.group, this.wordsSettings.page);
    await this.renderCards(data);
  }

  private async renderCards(data: wordsResponse[]): Promise < void > {
    const bookCont = getElementByClassName('page-container__book-cont') as HTMLElement;
    bookCont.innerHTML = '';
    const bookContHeading = getElementByClassName('book-cont__heading') as HTMLElement;
    bookContHeading.textContent = `Уровень сложности ${this.wordsSettings.group + 1}`;
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
    data.forEach(el => {
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
    });
  }

  private async getWords(group: number, page: number): Promise < wordsResponse[] > {
    let data = [];
    let url = `${settings.APIUrl}words`;
    if (this.wordsSettings.group || this.wordsSettings.page) url += `?group=${group}&page=${page}`;
    try {
      const res = await fetch(url);
      data = await res.json();
      /*       if (res.status === 200) {
              console.log(data);
            }; */
    } catch (er) {

    }
    return data;
  }

}

export {
  StudyBook
};