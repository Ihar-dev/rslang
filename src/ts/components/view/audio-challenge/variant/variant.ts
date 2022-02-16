import './variant.css';

const AudioChallengeVarianContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="audio-challenge-container__variant">
      <div class="audio-challenge-container__variant-number"></div>
      <div class="audio-challenge-container__answer-indicator"></div>
      <div class="audio-challenge-container__text"></div>
    </div>`;
    return view;
  }
};

export default AudioChallengeVarianContent;
