import {
  getBody,
  getElementByClassName,
  getListOfElementsByClassName,
  getElementById,
  setElementActive,
  setElementInactive,
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


class StartApp {

  public async render(): Promise < void > {
    await this.renderCoreComponents();
    this.addListeners();
  }

  private async renderCoreComponents(): Promise < void > {
    const body = getBody() as HTMLElement;
    setElementActive(body);
    const header = getElementByClassName('header-container') as HTMLElement;
    const page = getElementByClassName('page-container') as HTMLElement;
    const footer = getElementByClassName('footer-container') as HTMLElement;
    header.innerHTML = await Header.render();
    page.innerHTML = await Main.render();
    footer.innerHTML = await Footer.render();
  }

  private addListeners(): void {
    const menuToggleButton = getElementByClassName('menu__toggle-button') as HTMLElement;
    const menuContainer = getElementByClassName('header-container__menu') as HTMLElement;
    menuToggleButton.addEventListener('click', () => {
      toggleElement(menuContainer);
    });
  }

}

export default StartApp;