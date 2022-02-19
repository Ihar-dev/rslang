import './statistic.css';

const AudioChallengeStatisticContent = {
  render: async (): Promise<string> => {
    const view = `
    <div class="round-statistic__results"></div>
    <div class="round-statistic__controls"></div>`;
    return view;
  },
};

export default AudioChallengeStatisticContent;
