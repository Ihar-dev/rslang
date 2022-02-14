import GameDifficultyContent from '../view/game-difficulty/game-difficulty';
import GameDifficultyDescriptionContent from '../view/game-difficulty/description/description';
import GameDifficultyButtonsContent from '../view/game-difficulty/level-buttons/level-buttons';

class OpenGameDifficultyPage {
  public async render(header: string, ...text: Array<string>) {
    const PageContainer = document.querySelector('.page-container') as HTMLElement;
    const Page = document.createElement('div');
    Page.classList.add('game-difficulty-container');
    Page.innerHTML = await GameDifficultyContent.render();
    PageContainer.append(Page);

    const Container = document.querySelector('.game-difficulty-container__content') as HTMLElement;
    Container.insertAdjacentHTML('beforeend', await GameDifficultyDescriptionContent.render(header, ...text));    
    Container.insertAdjacentHTML('beforeend', await GameDifficultyButtonsContent.render());   
  }  
}

export default OpenGameDifficultyPage;
