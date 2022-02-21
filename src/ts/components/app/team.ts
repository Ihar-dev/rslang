import {
  StartApp,
  settings,
} from './start';

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

import Main from '../view/team/main';
import '../view/team/team.css';

class Team {
  public async render(): Promise < void > {
    this.renderCoreComponents();
  }

  private async renderCoreComponents(): Promise < void > {
    const page = getElementByClassName('page-container') as HTMLElement;
    page.innerHTML = await Main.render();
  }
}

export {
  Team,
};