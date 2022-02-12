import GameDifficultyContent from '../view/game-difficulty/game-difficulty';
import GameDifficultyDescriptionContent from '../view/game-difficulty/description/description';
import GameDifficultyButtonsContent from '../view/game-difficulty/level-buttons/level-buttons';

class OpenGameDifficultyPage {
  public async render(header: string, ...text: Array<string>) {
    const pageContainer = document.querySelector('.page-container') as HTMLElement;
    const page = document.createElement('div');
    page.classList.add('game-difficulty-container');
    page.innerHTML = await GameDifficultyContent.render();
    pageContainer.append(page);

    const container = document.querySelector('.game-difficulty-container__content') as HTMLElement;
    container.insertAdjacentHTML('beforeend', await GameDifficultyDescriptionContent.render(header, ...text));    
    container.insertAdjacentHTML('beforeend', await GameDifficultyButtonsContent.render());   
  }  
}

export default OpenGameDifficultyPage;
