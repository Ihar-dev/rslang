const StatisticRender = {
    render: async () => {
        const view = `
        <div class="statistic-container">
        <div class="full-statistic-container off">
       <div class="full-statistic-learned-words">график, отображающий количество новых слов за каждый день изучения</div>
       <div class="full-statistic-words-per-day">график, отображающий увеличение общего количества изученных слов за весь период обучения по дням</div>
       </div>
      <div class="statistic-header">
       <div class="day-statistic-button statistic-button-active">Статистика за сегодня</div>
       <div class="full-statistic-button">Полная статистика</div>
      </div>  
      <div class="sprint-statistic game-statistic">SPRINT
      <div class="statistics-table-row">
      <div class="">Количество новых слов за день</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Процент правильных ответов</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Самая длинная серия правильных ответов</div>
      <div class=""></div>
      </div>
      </div>
      <div class="audio-challenge-statistic game-statistic">AUDIO CHALLENGE
      <div class="statistics-table-row">
      <div class="">Количество новых слов за день</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Процент правильных ответов</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Самая длинная серия правильных ответов</div></div>
      <div class=""></div>
      </div>
      <div class="words-statistic game-statistic">
      <div class="statistics-table-row">
      <div class="">Количество новых слов за день</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Количество изученных слов за день</div>
      <div class=""></div>
      </div>
      <div class="statistics-table-row">
      <div class="">Процент правильных ответов за день</div>
      <div class=""></div>
      </div>
      </div>`;
        return view;
    }
}

export default StatisticRender;