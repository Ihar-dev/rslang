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
  getRandomHEXColor,
  setAttributeForElements,
} from './helper';
import Header from '../view/start/navbar'
import Main from '../view/start/main';
import Footer from '../view/start/footer';
import '../view/start/start.css';
import SprintView from '../view/sprintview/sprintview';
export const newSprint = new SprintView;

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

    })
    
    const logButton = getElementByClassName('page-container__log-button') as HTMLElement;
    const authorCont = getElementByClassName('page-container__author-cont') as HTMLElement;
    const innerCont = getElementByClassName('author-cont__inner-cont') as HTMLElement;
    logButton.addEventListener('click', () => {
      setElementActive(authorCont);
      setElementActive(innerCont);
    });
    authorCont.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        setElementInactive(innerCont);
        setTimeout(() => {
          setElementInactive(authorCont);
        }, 300);
      };
    });

    const menuSprintButton = getElementByClassName('menu__sprint-button') as HTMLElement;
    menuSprintButton.addEventListener('click', async() => {
      this.resetStartForGames(menuContainer, footer, page);
      await newSprint.getGameDifficulty();
    }) 
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