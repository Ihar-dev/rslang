import './top.css';

const AudioChallengeTopContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="audio-challenge-container__play-audio-1"><div></div></div>
    <div class="audio-challenge-container__word-image"></div>
    <div class="audio-challenge-container__word-container">
      <div class="audio-challenge-container__play-audio-2"></div>
      <div class="audio-challenge-container__word"></div>
    </div>`;
    return view;
  }
};

export default AudioChallengeTopContent;
