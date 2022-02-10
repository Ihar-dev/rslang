import './top.css';

const AudiochallengeTopContent = {
  render: async () => {
    const view = `
    <div class="audiochallenge-container__play-audio-1"><div></div></div>
    <div class="audiochallenge-container__word-image"></div>
    <div class="audiochallenge-container__word-container">
      <div class="audiochallenge-container__play-audio-2"></div>
      <div class="audiochallenge-container__word"></div>
    </div>`;
    return view;
  }
};

export default AudiochallengeTopContent;
