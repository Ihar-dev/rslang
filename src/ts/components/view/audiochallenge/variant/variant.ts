import './variant.css';

const AudiochallengeVarianContent = {
  render: async () => {
    const view = `
    <div class="audiochallenge-container__variant">
      <div class="audiochallenge-container__variant-number"></div>
      <div class="audiochallenge-container__answer-indicator"></div>
      <div class="audiochallenge-container__text"></div>
    </div>`;
    return view;
  }
};

export default AudiochallengeVarianContent;
