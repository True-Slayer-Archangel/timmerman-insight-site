function initTestimonialCarousel() {
  var viewport = document.getElementById('tst-viewport');
  var track = document.getElementById('tst-track');
  var prev = document.querySelector('.tst-prev');
  var next = document.querySelector('.tst-next');
  var counter = document.getElementById('tst-counter');
  if (!viewport || !track || !prev || !next) return;

  var cards = track.querySelectorAll('.tst');
  var index = 0;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function perView() {
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  }

  function pageCount() {
    return Math.max(1, Math.ceil(cards.length / perView()));
  }

  function update() {
    var pv = perView();
    var pages = pageCount();
    if (index >= pages) index = pages - 1;

    var gap = 18;
    var width = viewport.clientWidth;
    var cardWidth = (width - gap * (pv - 1)) / pv;

    cards.forEach(function(card) {
      card.style.flexBasis = cardWidth + 'px';
      card.style.maxWidth = cardWidth + 'px';
    });

    var offset = index * pv * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    if (counter) {
      counter.textContent = (index + 1) + ' / ' + pages;
    }
  }

  prev.addEventListener('click', function() {
    index = (index - 1 + pageCount()) % pageCount();
    update();
  });

  next.addEventListener('click', function() {
    index = (index + 1) % pageCount();
    update();
  });

  window.addEventListener('resize', update);
  if (!reduce) {
    track.style.transition = 'transform 0.45s ease';
  }

  update();
}
