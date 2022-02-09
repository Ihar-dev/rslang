const NavBar = {
  render: async () => {
    const view = `
    <div class="header-container__menu menu">
      <div class="menu__toggle-button">MENU</div>
      <div style="--i:0;" class="menu__book-button" title="Study Book">
        <div></div>
      </div>
      <div style="--i:1;" class="menu__audio-challenge-button" title="Audio Challenge">
        <div></div>
      </div>
      <div style="--i:2;" class="menu__sprint-button" title="Sprint">
        <div></div>
      </div>
      <div style="--i:3;" class="menu__statistics-button" title="Statistics">
        <div></div>
      </div>
      <div style="--i:4;" class="menu__team-button" title="Team">
        <div></div>
      </div>
      <div style="--i:5;" class="menu__app-button" title="About App">
        <div></div>
      </div>
    </div>
            `;
    return view;
  }
};
export default NavBar;