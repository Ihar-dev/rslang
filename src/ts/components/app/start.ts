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
import StartAudioChallengeApp from './audio-challenge';
const startAudioChallengeApp = new StartAudioChallengeApp();
type user = {
  name ? : string,
  email: string,
  password: string,
};

enum settings {
  tokenDuration = 14400000,
  APIUrl = 'https://rs-lang-work-team.herokuapp.com/',
};

class StartApp {

  started: boolean;
  userSettings: {
    name: string,
    refreshToken: string,
    token: string,
    userId: string,
    email: string,
    password: string,
    expiredTime: number,
  };

  constructor() {
    this.started = false;
    if (localStorage.getItem('rslang-user-settings')) {
      this.userSettings = JSON.parse(localStorage.getItem('rslang-user-settings') || '');
    } else this.userSettings = {
      name: '',
      refreshToken: '',
      token: '',
      userId: '',
      email: '',
      password: '',
      expiredTime: 0,
    };
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
      const entryButton = getElementByClassName('author-cont__entry-button') as HTMLElement;
      if (localStorage.getItem('rslang-user-settings')) {
        const userName = getElementByClassName('page-container__user-name') as HTMLElement;
        userName.textContent = this.userSettings.name;
        entryButton.textContent = 'Выйти';
      } else {
        entryButton.textContent = 'Войти';
      }
      if (this.userSettings.expiredTime - Date.now() < 0 && this.userSettings.expiredTime) this.updateEntrance(entryButton);
      this.addListeners(footer, page);
    };
    this.started = true;
    const menuContainer = getElementByClassName('header-container__menu') as HTMLElement;
    addClassForElement(menuContainer, 'start');
    removeClassForElement(menuContainer, 'game');
    removeClassForElement(menuContainer, 'active');
  }

  private addListeners(footer: HTMLElement, page: HTMLElement): void {
    this.addMenuListeners(footer, page);
    this.addRegistrationListeners();
  }

  private addMenuListeners(footer: HTMLElement, page: HTMLElement): void {
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
      startAudioChallengeApp.renderGameDifficultyPage();
    });
    const menuSprintButton = getElementByClassName('menu__sprint-button') as HTMLElement;
    menuSprintButton.addEventListener('click', async () => {
      this.resetStartForGames(menuContainer, footer, page);
      newSprint.getGameDifficulty();
    });
  }

  private addRegistrationListeners(): void {
    const logButton = getElementByClassName('page-container__log-button') as HTMLElement;
    const authorCont = getElementByClassName('page-container__author-cont') as HTMLElement;
    const innerCont = getElementByClassName('author-cont__inner-cont') as HTMLElement;
    const entryButton = getElementByClassName('author-cont__entry-button') as HTMLElement;

    logButton.addEventListener('click', () => {
      setElementActive(authorCont);
      setElementActive(innerCont);
    });
    const eyeButton = getElementByClassName('author-cont__eye-button') as HTMLElement;
    const nameInput = getElementByClassName('inner-cont__name-input') as HTMLInputElement;
    const addressInput = getElementByClassName('inner-cont__address-input') as HTMLInputElement;
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
      this.handleRegistration(nameInput, addressInput, passwordInput, entryButton);
    });

    entryButton.addEventListener('click', () => {
      if (entryButton.textContent === 'Войти') this.handleEntrance(addressInput, passwordInput, entryButton);
      else this.handleExit(entryButton);
    });
  }

  private handleExit(entryButton: HTMLElement): void {
    this.handleMessage(`Bye bye, ${this.userSettings.name}!`, 'green-text');
    const userName = getElementByClassName('page-container__user-name') as HTMLElement;
    this.userSettings = {
      name: '',
      refreshToken: '',
      token: '',
      userId: '',
      email: '',
      password: '',
      expiredTime: 0,
    };
    userName.textContent = '';
    localStorage.setItem('rslang-user-settings', '');
    entryButton.textContent = 'Войти';
  }

  private async updateEntrance(entryButton: HTMLElement): Promise < void > {
    const userName = getElementByClassName('page-container__user-name') as HTMLElement;
    try {
      const url = `${settings.APIUrl}signin`;
      const signInData: user = {
        email: this.userSettings.email,
        password: this.userSettings.password,
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
      });
      const data = await res.json();
      if (res.status === 200) {
        this.handleMessage(`Hello, ${data.name}!`, 'green-text');
        this.userSettings = {
          name: data.name,
          refreshToken: data.refreshToken,
          token: data.token,
          userId: data.userId,
          email: this.userSettings.email,
          password: this.userSettings.password,
          expiredTime: Date.now() + settings.tokenDuration,
        };
        localStorage.setItem('rslang-user-settings', JSON.stringify(this.userSettings));
        userName.textContent = this.userSettings.name;
        entryButton.textContent = 'Выйти';
      };
    } catch (er) {
      this.handleMessage('Incorrect e-mail or password!', 'red-text');
      userName.textContent = '';
      entryButton.textContent = 'Войти';
    }
  }

  private async handleEntrance(addressInput: HTMLInputElement, passwordInput: HTMLInputElement, entryButton: HTMLElement): Promise < void > {
    const userName = getElementByClassName('page-container__user-name') as HTMLElement;
    try {
      const url = `${settings.APIUrl}signin`;
      const signInData: user = {
        email: addressInput.value,
        password: passwordInput.value,
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
      });
      const data = await res.json();
      if (res.status === 200) {
        this.handleMessage(`Hello, ${data.name}!`, 'green-text');
        this.userSettings = {
          name: data.name,
          refreshToken: data.refreshToken,
          token: data.token,
          userId: data.userId,
          email: addressInput.value,
          password: passwordInput.value,
          expiredTime: Date.now() + settings.tokenDuration,
        };
        localStorage.setItem('rslang-user-settings', JSON.stringify(this.userSettings));
        userName.textContent = this.userSettings.name;
        entryButton.textContent = 'Выйти';
      };
    } catch (er) {
      this.handleMessage('Incorrect e-mail or password!', 'red-text');
      userName.textContent = '';
      entryButton.textContent = 'Войти';
    }
  }

  private async handleRegistration(nameInput: HTMLInputElement, addressInput: HTMLInputElement, passwordInput: HTMLInputElement, entryButton: HTMLElement): Promise < void > {
    try {
      const url = `${settings.APIUrl}users`;
      const newUser: user = {
        name: nameInput.value,
        email: addressInput.value,
        password: passwordInput.value,
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.status === 422) {
        this.handleMessage('Incorrect name, e-mail or password!', 'red-text');
      };
      if (res.status === 200) {
        this.handleMessage('User created!', 'green-text');
        this.handleEntrance(addressInput, passwordInput, entryButton);
      };
    } catch (er) {
      this.handleMessage('User with this e-mail exists!', 'red-text');
    }
  }

  private handleMessage(text: string, classForHandling: string): void {
    const messageText = getElementByClassName('author-cont__message-text') as HTMLInputElement;
    messageText.textContent = text;
    setElementActive(messageText);
    addClassForElement(messageText, classForHandling);
    setTimeout(() => {
      setElementInactive(messageText);
      removeClassForElement(messageText, classForHandling);
    }, 5000);
  }

  private closeRegistration(passwordInput: HTMLInputElement, eyeButton: HTMLElement, innerCont: HTMLElement, authorCont: HTMLElement): void {
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