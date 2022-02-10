import '../styles/main.css';
import StartApp from './components/app/start';

const startApp = new StartApp();
startApp.render();

//* TEST Open Game Difficulty Page
// import OpenGameDifficultyPage from './components/app/game-difficulty';
// const startApp = new StartApp();
// const openGameDifficultyPage = new OpenGameDifficultyPage();

// async function test() {
//   const header = "Заголовок для описания";
//   const text1 = "Описание всякого";
//   const text2 = "Описание всякого";
//   await startApp.render();
//   await openGameDifficultyPage.render(header, text1, text2);
// }

// test();
