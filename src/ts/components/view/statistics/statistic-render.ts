const StatisticRender = {
    render: async () => {
        const view = `
        <div class="statistic-container">
      <div class="sprint-statistic game-statistic"></div>
      <div class="audio-challenge-statistic game-statistic"></div>
      <div class="words-statistic"></div>`;
        return view;
    }
}

export default StatisticRender;