document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.main__cards-scroll-container');
  const progressBar = document.getElementById('scrollProgressBar');

  function updateProgressBar() {
    const containerHeght = document.querySelector('.main__cards-items').offsetHeight;
    const cards = document.querySelectorAll('.main__cards-item');
    const firstCard = cards[0];
    const computedStyles = window.getComputedStyle(firstCard).marginBottom;
    const numericValue = parseInt(computedStyles, 10);
    container.style.height = `${containerHeght - cards[cards.length - 1].offsetHeight/2 - cards[0].offsetHeight/2 - numericValue*((cards.length - 1)/2)}px`;
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

  function animateCards() {
    const cards = document.querySelectorAll('.card');
    const triggerCard = window.innerHeight * 0.8;
    const labels = document.querySelectorAll('.label');
    const triggerLabel = window.innerHeight / 2;
  
    if(labels.length > 0) {
      labels.forEach(label => {
        const labelTop = label.getBoundingClientRect().top;
  
        if (labelTop < triggerLabel) {
          label.classList.add('filled');
        } else {
          label.classList.remove('filled');
        }
      });
    }
  
    if(cards.length > 0) {
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerCard) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      });
    }
  }
  
  window.addEventListener('load', animateCards);
  window.addEventListener('scroll', animateCards);

  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  updateProgressBar();
});
