document.addEventListener('DOMContentLoaded', () => {
  const footerCopyrightYear = document.querySelector('.footer__copyright-year')
  const copyrightYear = new Date().getFullYear()

  footerCopyrightYear.textContent = ` ${copyrightYear} `
})
