const StatisticRender = {
render: async () => {
const view = `
<div class="statistic-container">
    <div class="full-statistic-container off">
        <div class="full-statistic-naming">Статистика за всё время</div>               
          <div class="full-statistic-row">
          <div class=" all-statistic naming">
              <p class="full-statistic-name"></p>
              <p class="">Новых слов</p>
              <p class="">Изучено слов</p>
              <p class="">Правильных ответов, %</p>
          </div>
          <div class="all-statistic-sprint table-row"></div>
          <div class="all-statistic-challenge table-row"></div>
          <div class="all-statistic-sum table-row"></div>
        </div>
        <div class= "full-statistic-naming">Статистика за текущий год</div>
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
        <div class= "full-statistic-naming">Статистика за текущий месяц</div>
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
        <div class="full-statistic-naming">Статистика за сегодня</div>
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
    <div class="day-statistic-button statistic-button-active"title="Day Statistics">Статистика за сегодня</div>
    <div class="full-statistic-button" title="Full Statistics">&nbsp;&nbsp;Полная статистика&nbsp;&nbsp;</div>
    <button class="close-statistics-button" title="Close"></button>
</div>
<div class="sprint-statistic game-statistic">SPRINT
    <div class="statistics-table-row">
        <div class="table-text-left">Количество новых слов за день</div>
        <div class="sprintDayCreatedUserWordsCount table-text-left"></div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Процент правильных ответов</div>
        <div class="sprintDayAccuracy table-text-left"></div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Самая длинная серия правильных ответов</div>
        <div class="sprintDayLongestCorrectRange table-text-left"></div>
    </div>
</div>
<div class="audio-challenge-statistic game-statistic">AUDIO CHALLENGE
    <div class="statistics-table-row">
        <div class="table-text-left">Количество новых слов за день</div>
        <div class="audioChallengeDayCreatedUserWordsCount table-text-left"></div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Процент правильных ответов</div>
        <div class="audioChallengeDayAccuracy table-text-left"></div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Самая длинная серия правильных ответов</div>
        <div class="audioChallengeDayLongestCorrectRange table-text-left"></div>
    </div>
</div>
<div class="words-statistic game-statistic">ОБЩАЯ СТАТИСТИКА
    <div class="statistics-table-row">
        <div class="table-text-left">Количество новых слов за день</div>
        <div class="dayCreatedUserWordsContainer table-text-left">0</div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Количество изученных слов за день</div>
        <div class="dayLearnedWords table-text-left"></div>
    </div>
    <div class="statistics-table-row">
        <div class="table-text-left">Процент правильных ответов за день</div>
        <div class="dayAccuracy table-text-left"></div>
    </div>

</div>`;
return view;
}
}

export default StatisticRender;