const StatisticRender = {
render: async () => {
const view = `
<div class="statistic-container">
    <div class="full-statistic-container off">
        <div class="full-statistic-name">
          <div>Статистика за всё время</div>
          <p>Sprint</p>
          <p>Audio Challenge</p>
          <p>Итого</p>
        </div>
        <div class="full-statistic-row">
          <div class=" all-statistic naming">
              <p class="">Новых слов</p>
              <p class="">Изучено слов</p>
              <p class="">Правильных ответов, %</p>
          </div>
          <div class="all-statistic-sprint table-row"></div>
          <div class="all-statistic-challenge table-row"></div>
          <div class="all-statistic-sum table-row"></div>
        </div>
        <div>Статистика за текущий год</div>
        <div class="full-statistic-row">
            <div class="year-statistic naming">
            <p class="">Новых слов</p>
              <p class="">Изучено слов</p>
              <p class="">Правильных ответов, %</p>
            </div>
            <div class="year-statistic-sprint table-row"></div>
            <div class="year-statistic-challenge table-row"></div>
            <div class="year-statistic-sum table-row"></div>
        </div>
        <div>Статистика за текущий месяц</div>
        <div class="full-statistic-row">
              <div class=" month-statistic naming">
                  <p class="">Новых слов</p>
              <p class="">Изучено слов</p>
              <p class="">Правильных ответов, %</p>
              </div>
              <div class="month-statistic-sprint table-row"></div>
              <div class="month-statistic-challenge table-row"></div>
              <div class="month-statistic-sum table-row"></div>
        </div>
        <div class="today-statistic-container">Статистика за сегодня</div>
        <div class="full-statistic-row">
           <div class=" day-statistic naming">
             <p class="">Новых слов</p>
              <p class="">Изучено слов</p>
              <p class="">Правильных ответов, %</p>
           </div>
           <div class="day-statistic-sprint table-row"></div>
           <div class="day-statistic-challenge table-row"></div>
           <div class="day-statistic-sum table-row"></div>
        </div>
    </div>
<div class="statistic-header">
    <div class="day-statistic-button statistic-button-active">Статистика за сегодня</div>
    <div class="full-statistic-button">Полная статистика</div>
</div>
<div class="sprint-statistic game-statistic">SPRINT
    <div class="statistics-table-row">
        <div class="">Количество новых слов за день</div>
        <div class="sprintDayCreatedUserWordsCount"></div>
    </div>
    <div class="statistics-table-row">
        <div class="">Процент правильных ответов</div>
        <div class="sprintDayAccuracy"></div>
    </div>
    <div class="statistics-table-row">
        <div class="">Самая длинная серия правильных ответов</div>
        <div class="sprintDayLongestCorrectRange"></div>
    </div>
</div>
<div class="audio-challenge-statistic game-statistic">AUDIO CHALLENGE
    <div class="statistics-table-row">
        <div class="">Количество новых слов за день</div>
        <div class="audioChallengeDayCreatedUserWordsCount"></div>
    </div>
    <div class="statistics-table-row">
        <div class="">Процент правильных ответов</div>
        <div class="audioChallengeDayAccuracy"></div>
    </div>
    <div class="statistics-table-row">
        <div class="">Самая длинная серия правильных ответов</div>
        <div class="audioChallengeDayLongestCorrectRange"></div>
    </div>
</div>
<div class="words-statistic game-statistic">ОБЩАЯ СТАТИСТИКА
    <div class="statistics-table-row">
        <div class="">Количество новых слов за день</div>
        <div class="dayCreatedUserWordsContainer">0</div>
    </div>
    <div class="statistics-table-row">
        <div class="">Количество изученных слов за день</div>
        <div class="dayLearnedWords"></div>
    </div>
    <div class="statistics-table-row">
        <div class="">Процент правильных ответов за день</div>
        <div class="dayAccuracy"></div>
    </div>

</div>`;
return view;
}
}

export default StatisticRender;