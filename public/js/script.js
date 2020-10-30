const bg = document.querySelector('.background');
const header = document.querySelector('.page-header__top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    bg.classList.add('background--filtered');
    header.classList.add('page-header__top--scrolled');
  } else if (window.scrollY < 80) {
    bg.classList.remove('background--filtered');
    header.classList.remove('page-header__top--scrolled');
  }
});
