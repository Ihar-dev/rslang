const Main = {
  render: async () => {
  const view = `
  <div class="page-container__about-cont">RS Lang – приложение для изучения иностранных слов, включающее электронный
    учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального
    прогресса.
  </div>
  <div class="page-container__about-back-cont about-back-cont">
    <div class="about-back-cont__inner-cont">
      <div class="about-cont__cross-button"></div>
      <div class="about-cont__heading">О приложении</div>
      <div class="about-cont__page-card">
        <div class="about-cont__img-container audio-challenge-img"></div>
        <div class="about-cont__text-heading">Мини-игра "Аудиовызов"</div>
        <div class="about-cont__text-line">Увлекательная игра поможет вам улучшить восприятие речи на слух.</div>
      </div>
      <div class="about-cont__page-card">
        <div class="about-cont__img-container sprint-img"></div>
        <div class="about-cont__text-heading">Мини-игра "Спринт"</div>
        <div class="about-cont__text-line">Интересная игра развивает скоростной перевод текста.</div>
      </div>
      <div class="about-cont__page-card">
        <div class="about-cont__img-container book-img"></div>
        <div class="about-cont__text-heading">Электронный учебник</div>
        <div class="about-cont__text-line">Учебник содержит 3600 слов. Вы можете выбрать для изучения слова из шести групп сложности
        , а также создать свою собственную.</div>
      </div>
      <div class="about-cont__page-card">
        <div class="about-cont__img-container statistics-img"></div>
        <div class="about-cont__text-heading">Страница статистики</div>
        <div class="about-cont__text-line">Статистика поможет вам оценить свой собственный прогресс в изучении английского языка.</div>
      </div>
    </div>
  </div>
  `;
  return view;
  }
  };
  export default Main;