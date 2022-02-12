import './table.css';

const AudiochallengeStatisticTableContent = {
  renderCorrect: async (): Promise<string> => {
    const view = `
    <table class="round-statistic__table round-statistic__table_correct-answers">
      <thead>
        <tr>
          <th colspan="4">Правильные ответы</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;
    return view;
  },

  renderWrong: async (): Promise<string> => {
    const view = `
    <table class="round-statistic__table round-statistic__table_wrong-answers">
    <thead>
      <tr>
        <th colspan="4">Неправильные ответы</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    return view;
  },

  renderLine: async (audio: string, word: string, transcription: string, wordTranslate: string): Promise<string> => {
    const view = `
    <tr>
      <td class="round-statistic__audio" data-audio="${audio}"></td>
      <td>${word}</td>
      <td>${transcription}</td>
      <td>${wordTranslate}</td>
  </tr>
`;
    return view;
  },
};

export default AudiochallengeStatisticTableContent;
