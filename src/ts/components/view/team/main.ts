const Main = {
  render: async () => {
  const view = `
  <div class="team-cont__heading">О команде</div>
  <div class="page-container__team-cont team-cont">
    <div class="team-cont__team-card">
      <div class="team-cont__img-container ihar-photo"></div>
      <div class="team-cont__text-heading">Игорь</div>
      <div class="team-cont__text-small-heading-long">Team leader, Frontend developer</div>
      <div class="team-cont__text-line">Главная страница приложения</div>
      <div class="team-cont__text-line">Меню</div>
      <div class="team-cont__text-line">Авторизация</div>
      <div class="team-cont__text-line">Электронный учебник</div>
      <div class="team-cont__text-line">Методы по работе со статистикой</div>
    </div>
    <div class="team-cont__team-card">
      <div class="team-cont__img-container vitali-photo"></div>
      <div class="team-cont__text-heading">Виталий</div>
      <div class="team-cont__text-small-heading">Frontend developer</div>
      <div class="team-cont__text-line">Мини-игра "Аудиовызов"</div>
      <div class="team-cont__text-line">Прогресс изучения</div>
      <div class="team-cont__text-line">Страница выбора сложности игр</div>
    </div>
    <div class="team-cont__team-card">
    <div class="team-cont__img-container alexandr-photo"></div>
      <div class="team-cont__text-heading">Александр</div>
      <div class="team-cont__text-small-heading">Frontend developer</div>
      <div class="team-cont__text-line">Мини-игра "Спринт"</div>
      <div class="team-cont__text-line">Прогресс изучения</div>
      <div class="team-cont__text-line">Страница статистики</div>
    </div>
  </div>
  `;
  return view;
  }
  };
  export default Main;