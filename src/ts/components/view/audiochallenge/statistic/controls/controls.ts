import './controls.css';

const AudiochallengeStatisticControlsContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="round-statistic__button round-statistic__replay"><div></div></div>
    <div class="round-statistic__button round-statistic__book"><div></div></div>
    <div class="round-statistic__button round-statistic__back"><div></div></div>`;
    return view;
  }
};

export default AudiochallengeStatisticControlsContent;
