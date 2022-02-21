import './bottom.css';

const AudioChallengeBottomContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="audio-challenge-container__dont-know">
      <span>I don't know</span>
    </div>
    <div class="audio-challenge-container__next hidden"></div>`;
    return view;
  },
};

export default AudioChallengeBottomContent;
