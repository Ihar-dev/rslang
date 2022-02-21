import './audio-challenge.css';

const AudioChallengeContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="audio-challenge-container">
      <div class="audio-challenge-container__close"></div>
      <div class="audio-challenge-container__preloader">
        <div class="audio-challenge-container__loader"></div>
      </div>
      <div class="audio-challenge-container__progress-bar"></div>
      <div class="audio-challenge-container__content">
        <div class="audio-challenge-container__top"></div>
        <div class="audio-challenge-container__middle"></div>
        <div class="audio-challenge-container__bottom"></div>
      </div>
      <div class="audio-challenge-container__round-statistic"></div>
    </div>`;
    return view;
  },
};

export default AudioChallengeContent;
