import './audiochallenge.css';

const AudiochallengeContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="audiochallenge-container">
      <div class="audiochallenge-container__close"></div>
      <div class="audiochallenge-container__content">
        <div class="audiochallenge-container__top"></div>
        <div class="audiochallenge-container__middle"></div>
        <div class="audiochallenge-container__bottom"></div>
      </div>
      <div class="audiochallenge-container__round-statistic"></div>
    </div>`;
    return view;
  }
};

export default AudiochallengeContent;
