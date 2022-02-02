import Header from '../view/start/navbar'
import Main from '../view/start/main';
import Footer from '../view/start/footer';
import '../view/start/start.css';

class StartApp {

  public async render() {
    const header = document.querySelector('.header-container') as HTMLElement;
    const page = document.querySelector('.page-container') as HTMLElement;
    const footer = document.querySelector('.footer-container') as HTMLElement;
    header.innerHTML = await Header.render();
    page.innerHTML = await Main.render();
    footer.innerHTML = await Footer.render();
  }

}

export default StartApp;