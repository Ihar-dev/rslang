import './results.css';

const AudiochallengeStatisticResultsContent = {
  render: async (correctAnswers: number, wrongAnswers: number, bestAnswersSeries: number, accuracy: number): Promise<string> => {
    const view = `
    <h3 class="round-statistic__header">Результаты</h3>
    <table class="round-statistic__statistic">
      <tr>
        <th>Правильных ответов:</th>
        <th class="round-statistic__correct-answers">${correctAnswers}</th>
      </tr>
      <tr>
        <th>Неправильных ответов:</th>
        <th class="round-statistic__wrong-answers">${wrongAnswers}</th>
      </tr>
      <tr>
        <th>Лучшая серия ответов:</th>
        <th class="round-statistic__best-answers-series">${bestAnswersSeries}</th>
      </tr>
      <tr>
        <th>Точность:</th>
        <th class="round-statistic__accuracy">${accuracy}%</th>
      </tr>
    </table>
    <div class="round-statistic__words"></div>`;
    return view;
  }
};

export default AudiochallengeStatisticResultsContent;
