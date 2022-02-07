import '../styles/main.css';
import StartApp from './components/app/start';
import StartAudiochallengeApp from './components/app/audiochallenge';

// const startApp = new StartApp();
// startApp.render();

const startApp = new StartApp();
const startAudiochallengeApp = new StartAudiochallengeApp();

async function test() {
  await startApp.render();
  await startAudiochallengeApp.startGame();
}

test();

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.closest('.audiochallenge-container__variant')) {
    console.log("OK!");
  }

  if (target.classList.contains('audiochallenge-container__play-audio-1') || target.classList.contains('audiochallenge-container__play-audio-2')) {
    startAudiochallengeApp.playAudio();
  }
  });
>>>>>>> 729c695 (feat: add function to play a sound of word)
