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

import {StartApp} from './start';


class StudyBook {

  constructor() {
  }

  public async render(): Promise < void > {
    const page = getElementByClassName('page-container') as HTMLElement;
    page.innerHTML = await Main.render();
    const startApp = new StartApp();
    const bookCont = getElementByClassName('page-container__book-cont') as HTMLElement;
    bookCont.addEventListener('click', () => {
      startApp.render(false);
    });
  }

}

export {
  StudyBook
};