import './level-buttons.css';

const GameDifficultyButtonsContent = {
  render: async () => {
    const buttonsNumber = 6;
    let buttons = '';

    for (let i = 1; i <= buttonsNumber; i++) {
      buttons += `<button class="level-buttons__button level-buttons__level${i}">${i}</button>`;
    }

    const view = `
    <div class="game-difficulty-container__level-buttons">
      ${buttons}
    </div>`;
    
    return view;
  }
};

export default GameDifficultyButtonsContent;