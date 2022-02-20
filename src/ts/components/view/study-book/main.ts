const Main = {
  render: async () => {
  const view = `
  <div class="book-cont__heading"></div>
  <button class="book-cont__groups-button">Изменить</button>
  <div class="book-cont__groups-change-buttons">
    <button class="book-cont__first-button">1</button>
    <button class="book-cont__second-button">2</button>
    <button class="book-cont__third-button">3</button>
    <button class="book-cont__forth-button">4</button>
    <button class="book-cont__fifth-button">5</button>
    <button class="book-cont__sixth-button">6</button>
    <button class="book-cont__seventh-button">Сложные</button>
  </div>
  <div class="page-container__book-cont book-cont"></div>
  <div class="book-cont__pagination-container">
    <div class="book-cont__left-fast-button"></div>
    <div class="book-cont__left-button"></div>
    <div class="book-cont__page-count"></div>
    <div class="book-cont__right-button"></div>
    <div class="book-cont__right-fast-button"></div>
  </div>
  `;
  return view;
  }
  };
  export default Main;