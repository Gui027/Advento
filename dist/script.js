const checkoutLinks = document.querySelectorAll('.checkout-link');
checkoutLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Devocional Advento',
        currency: 'BRL',
        value: 29.90
      });
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const slider = document.querySelector('[data-slider]');
if (slider) {
  const track = slider.querySelector('.slider__track');
  const originals = Array.from(track.children);
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    let lastFrame = performance.now();
    let loopPoint = 0;

    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      loopPoint = originals.reduce((total, item) => total + item.getBoundingClientRect().width, 0) + (gap * originals.length);
    };

    const animate = (now) => {
      if (loopPoint > 0) {
        track.scrollLeft += (now - lastFrame) * 0.035;
        if (track.scrollLeft >= loopPoint) track.scrollLeft -= loopPoint;
      }
      lastFrame = now;
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', () => {
      lastFrame = performance.now();
    });

  measure();
  requestAnimationFrame(animate);
}

document.querySelectorAll('.accordion details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('.accordion details[open]').forEach((item) => {
      if (item !== details) item.removeAttribute('open');
    });
  });
});
