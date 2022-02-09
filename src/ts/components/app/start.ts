import {
  getElementByClassName,
  getListOfElementsByClassName,
  getElementById,
  setElementActive,
  setElementInactive,
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
  }

  private async renderCoreComponents(): Promise < void > {
    const header = getElementByClassName('header-container') as HTMLElement;
    const page = getElementByClassName('page-container') as HTMLElement;
    const footer = getElementByClassName('footer-container') as HTMLElement;
    header.innerHTML = await Header.render();
    page.innerHTML = await Main.render();
    footer.innerHTML = await Footer.render();
  }

}

export default StartApp;