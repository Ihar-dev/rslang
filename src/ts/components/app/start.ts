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
import Header from '../view/start/navbar'
import Main from '../view/start/main';
import Footer from '../view/start/footer';
import '../view/start/start.css';

import {newSprint} from '../view/sprintview/sprintview';
import StartAudiochallengeApp from './audiochallenge';
const startAudiochallengeApp = new StartAudiochallengeApp();

class StartApp {

  started: boolean;

  constructor() {
    this.started = false;
  }

  public async render(): Promise < void > {
    await this.renderCoreComponents();
  }

  private async renderCoreComponents(): Promise < void > {
    const body = getBody() as HTMLElement;
    addClassForElement(body, 'start');
    const page = getElementByClassName('page-container') as HTMLElement;
    const footer = getElementByClassName('footer-container') as HTMLElement;
    page.innerHTML = await Main.render();
    footer.innerHTML = await Footer.render();
    if (!this.started) {
      const header = getElementByClassName('header-container') as HTMLElement;
      header.innerHTML = await Header.render();
      this.addListeners(footer, page);
    };
    this.started = true;
    const menuContainer = getElementByClassName('header-container__menu') as HTMLElement;
    addClassForElement(menuContainer, 'start');
    removeClassForElement(menuContainer, 'game');
    removeClassForElement(menuContainer, 'active');
  }

  private addListeners(footer: HTMLElement, page: HTMLElement): void {
    this.addMenuListeners (footer, page);
    this.addRegistrationListeners();
  }

  private addMenuListeners (footer: HTMLElement, page: HTMLElement): void {
    const menuToggleButton = getElementByClassName('menu__toggle-button') as HTMLElement;
    const menuContainer = getElementByClassName('header-container__menu') as HTMLElement;

    menuToggleButton.addEventListener('click', () => {
      toggleElement(menuContainer);
    });

    const homeButton = getElementByClassName('menu__home-button') as HTMLElement;
    homeButton.addEventListener('click', () => {
      this.render();
    });

    const audioChallengeButton = getElementByClassName('menu__audio-challenge-button') as HTMLElement;
    audioChallengeButton.addEventListener('click', () => {
      this.resetStartForGames(menuContainer, footer, page);
      startAudiochallengeApp.renderGameDifficultyPage();
    });
    const menuSprintButton = getElementByClassName('menu__sprint-button') as HTMLElement;
    menuSprintButton.addEventListener('click', async() => {
      this.resetStartForGames(menuContainer, footer, page);
      newSprint.getGameDifficulty();
    });
  }

  private addRegistrationListeners(): void {
    const logButton = getElementByClassName('page-container__log-button') as HTMLElement;
    const authorCont = getElementByClassName('page-container__author-cont') as HTMLElement;
    const innerCont = getElementByClassName('author-cont__inner-cont') as HTMLElement;
    logButton.addEventListener('click', () => {
      setElementActive(authorCont);
      setElementActive(innerCont);
    });
    const eyeButton = getElementByClassName('author-cont__eye-button') as HTMLElement;
    const passwordInput = getElementByClassName('inner-cont__password-input') as HTMLInputElement;
    authorCont.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) this.closeRegistration(passwordInput, eyeButton, innerCont, authorCont);
    });

    eyeButton.addEventListener('click', () => {
      if (getAttributeFromElement(passwordInput, 'type') === 'password') {
        setAttributeForElement(passwordInput, 'type', 'text');
        setElementActive(eyeButton);
      } else {
        setAttributeForElement(passwordInput, 'type', 'password');
        setElementInactive(eyeButton);
      }
    });

    const crossButton = getElementByClassName('author-cont__cross-button') as HTMLElement;
    crossButton.addEventListener('click', () => {
      this.closeRegistration(passwordInput, eyeButton, innerCont, authorCont);
    });

    const regButton = getElementByClassName('author-cont__reg-button') as HTMLElement;
    regButton.addEventListener('click', () => {
      this.handleRegistration();
    });
  }

  private handleRegistration(): void {
    
  }

  private closeRegistration (passwordInput: HTMLInputElement, eyeButton: HTMLElement, innerCont: HTMLElement, authorCont: HTMLElement): void {
    setAttributeForElement(passwordInput, 'type', 'password');
    setElementInactive(eyeButton);
    setElementInactive(innerCont);
    setTimeout(() => {
      setElementInactive(authorCont);
    }, 300);
  }

  private resetStartForGames(menuContainer: HTMLElement, footer: HTMLElement, page: HTMLElement): void {
    const body = getBody() as HTMLElement;
    removeClassForElement(body, 'start');
    removeClassForElement(menuContainer, 'start');
    addClassForElement(menuContainer, 'game');
    removeClassForElement(menuContainer, 'active');
    footer.innerHTML = '';
    page.innerHTML = '';
  }

}

export default StartApp;