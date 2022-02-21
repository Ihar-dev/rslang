const Footer = {
  render: async () => {
    const view = `
    <div class="footer-container__footer-add">
      <p class="footer-container__year">© 2022</p>
      <a class="footer-container__img-github-Ihar" href="https://github.com/Ihar-dev" target="_blank">Ihar</a>
      <a class="footer-container__img-github-Vitali" href="https://github.com/Hauzinski" target="_blank">Vitali</a>
      <a class="footer-container__img-github-Alexandr" href="https://github.com/koraleaxandr" target="_blank">Alexandr</a>
      <a class="footer-container__img-rs_school" href="https://rs.school/js/" target="_blank"></a>
    </div>
            `;
    return view;
  }
};
export default Footer;