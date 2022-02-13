import './statistic.css';

const AudiochallengeStatisticContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="round-statistic__results"></div>
    <div class="round-statistic__controls"></div>`;
    return view;
  }
};

export default AudiochallengeStatisticContent;
