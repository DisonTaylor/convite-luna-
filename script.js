const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');
const volume = document.getElementById('volume');
const video = document.getElementById('specialVideo');

music.volume = Number(volume.value);
volume.addEventListener('input', () => { music.volume = Number(volume.value); });

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = 'Ⅱ';
      musicToggle.setAttribute('aria-label', 'Pausar música');
      musicStatus.textContent = 'Música tocando… ✨';
    } catch {
      musicStatus.textContent = 'Não foi possível iniciar a música neste navegador.';
    }
  } else {
    music.pause();
    musicToggle.textContent = '▶';
    musicToggle.setAttribute('aria-label', 'Tocar música');
    musicStatus.textContent = 'Música pausada';
  }
});

document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.modal).showModal();
  });
});

document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});

document.querySelectorAll('dialog.modal').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (dialog.id === 'videoModal') {
      video.pause();
      video.currentTime = 0;
    }
  });
});


// Borboletas animadas em uma camada independente, atrás dos elementos clicáveis.
const butterflyLayer = document.querySelector('.butterfly-layer');
if (butterflyLayer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const flights = [
    {top:'12%', size:'25px', duration:'22s', delay:'-3s'},
    {top:'29%', size:'20px', duration:'26s', delay:'-15s'},
    {top:'48%', size:'27px', duration:'24s', delay:'-8s'},
    {top:'68%', size:'19px', duration:'28s', delay:'-20s'},
    {top:'83%', size:'23px', duration:'25s', delay:'-11s'}
  ];
  flights.forEach((flight, index) => {
    const butterfly = document.createElement('span');
    butterfly.className = 'butterfly';
    butterfly.textContent = '🦋';
    butterfly.style.setProperty('--top', flight.top);
    butterfly.style.setProperty('--size', flight.size);
    butterfly.style.setProperty('--duration', flight.duration);
    butterfly.style.setProperty('--delay', flight.delay);
    butterflyLayer.appendChild(butterfly);
  });
}
