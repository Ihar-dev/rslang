const NavBar = {
  render: async () => {
    const view = `
    <div class="page-container__top-cont">
      <div class="page-container__naming">RS Lang</div>
      <div class="page-container__log-button" title="Вход"></div>
    </div>
    <div class="page-container__author-cont author-cont">
      <div class="author-cont__inner-cont author-cont">
        <div class="author-cont__cross-button"></div>
        <div class="author-cont__table-container">
          <div class="author-cont__naming">Вход</div>
          <div class="author-cont__small-naming">Имя пользователя (регистр.)</div>
          <input placeholder="Введите имя" type="text" minlength="2" class="inner-cont__name-input">
          <div class="author-cont__small-naming">Адрес электронной почты</div>
          <input placeholder="Введите адрес почты" type="text" minlength="5" class="inner-cont__address-input">
          <div class="author-cont__small-naming">Пароль</div>
          <input placeholder="Введите пароль" type="password" minlength="8" class="inner-cont__password-input">
          <div class="author-cont__eye-button"></div>
          <div class="author-cont__button-cont">
            <button class="author-cont__entry-button">Войти</button>
            <button class="author-cont__reg-button">Регистрация</button>
          </div>
        </div>
      </div>
    </div>
    <div class="header-container__menu menu">
      <button class="menu__toggle-button"></button>
      <div style="--i:0;" class="menu__home-button" title="Home">
        <div></div>
      </div>
      <div style="--i:1;" class="menu__audio-challenge-button" title="Audio Challenge">
        <div></div>
      </div>
      <div style="--i:2;" class="menu__sprint-button" title="Sprint">
        <div></div>
      </div>
      <div style="--i:3;" class="menu__book-button" title="Study Book">
        <div></div>
      </div>
      <div style="--i:4;" class="menu__statistics-button" title="Statistics">
        <div></div>
      </div>
      <div style="--i:5;" class="menu__team-button" title="Team">
        <div></div>
      </div>
    </div>
            `;
    return view;
  }
};
export default NavBar;