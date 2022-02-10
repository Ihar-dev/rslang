import GameDifficultyContent from '../view/game-difficulty/game-difficulty';
import GameDifficultyDescriptionContent from '../view/game-difficulty/description/description';
import GameDifficultyBtuttonsContent from '../view/game-difficulty/level-buttons/level-buttons';

class OpenGameDifficultyPage {
  public async render(header: string, ...text: Array<string>) {
    const page = document.querySelector('.page-container') as HTMLElement;
    page.innerHTML = await GameDifficultyContent.render();

    const container = document.querySelector('.game-difficulty-container__content') as HTMLElement;
    container.insertAdjacentHTML('beforeend', await GameDifficultyDescriptionContent.render(header, ...text));    
    container.insertAdjacentHTML('beforeend', await GameDifficultyBtuttonsContent.render());
  }
}

export default OpenGameDifficultyPage;
