document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.main__cards-scroll-container');
  const progressBar = document.getElementById('scrollProgressBar');
  const containerHeght = document.querySelector('.main__cards').offsetHeight;
  container.style.height = `${containerHeght - window.innerHeight/2}px`;

  function updateProgressBar() {
    const containerRect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startPoint = containerRect.top - windowHeight / 2;
    const endPoint = containerRect.bottom - windowHeight / 2;

    let progress = 0;

    if (startPoint <= 0 && endPoint >= 0) {
      const scrolled = Math.abs(startPoint);
      const visibleDistance = containerRect.height;
      progress = (scrolled / visibleDistance) * 100;
      progress = Math.min(Math.max(progress, 0), 100);
    } else if (endPoint < 0) {
      progress = 100;
    } else {
      progress = 0;
    }

    progressBar.style.height = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  updateProgressBar();
});

function animateCards() {
  const cards = document.querySelectorAll('.card');
  const triggerBottom = window.innerHeight * 0.8;

  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    
    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200);
    } else {
      card.classList.remove('visible');
    }
  });
}

window.addEventListener('load', animateCards);
window.addEventListener('scroll', animateCards);