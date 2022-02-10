import './game-difficulty.css';

const GameDifficultyContent = {
  render: async () => {
    const view = `
    <div class="game-difficulty-container">
      <div class="game-difficulty-container__content"></div>
      <button class="game-difficulty-container__close"></button>
    </div>`;
    return view;
  }
};

export default GameDifficultyContent;
