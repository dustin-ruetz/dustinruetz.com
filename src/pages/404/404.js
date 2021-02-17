require('../../components/index.js')
require('../../components/index.scss')
require('./404.scss')

document.addEventListener('DOMContentLoaded', () => {
  const error404description = document.querySelector('.error-404__description')

  const descriptionWithRequestedPage = error404description.textContent.replace(
    '{requestedPage}',
    `<span class="error-404__requested-page">${window.location.pathname}</span>`,
  )

  error404description.innerHTML = descriptionWithRequestedPage
})
