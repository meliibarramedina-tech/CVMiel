document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.expandable-card');

  cards.forEach((card) => {
    const toggle = card.querySelector('.card-toggle');
    const body = card.querySelector('.card-body');

    if (!toggle || !body) return;

    toggle.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
    });

    if (card.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      toggle.setAttribute('aria-expanded', 'false');
      body.style.maxHeight = '0px';
    }
  });
});
