const NavBar = {
  render: async () => {
    const view = `
    <div class="header-container__menu menu">
      <div class="menu__toggle-button"></div>
      <div class="menu__book-button" title="Book"></div>
      <div class="menu__audio-challenge-button title="Audio Challenge""></div>
      <div class="menu__sprint-button"></div>
      <div class="menu__statistics-button"></div>
      <div class="menu__team-button"></div>
      <div class="menu__app-button"></div>
    </div>
            `;
    return view;
  }
};
export default NavBar;