import './description.css';

const GameDifficultyDescriptionContent = {
  async render(header: string, ...text: Array<string>) {
    let description = '';
    for (let value of text){
      description += `<p class="description__text">${value}</p>`;
    }

    const view = `
    <div class="game-difficulty-container__description">
      <h3 class="description__header">${header}</h3>
      ${description}
    </div>`;

    return view;
  }
};

export default GameDifficultyDescriptionContent;