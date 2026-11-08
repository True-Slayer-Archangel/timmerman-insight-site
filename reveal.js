function initReveal(root, options) {
  var opts = options || {};
  var scope = root || document;
  var reveals = scope.querySelectorAll('.reveal:not(.in)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    reveals.forEach(function(el) { el.classList.add('in'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function(el) { el.classList.add('in'); });
    return;
  }

  var threshold = opts.detail ? 0 : 0.12;
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: threshold, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function(el) { io.observe(el); });

  if (opts.detail) {
    requestAnimationFrame(function() {
      var viewH = window.innerHeight || document.documentElement.clientHeight;
      scope.querySelectorAll('.reveal:not(.in)').forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < viewH && rect.bottom > 0) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    });
  }
}

function observeReveals(root) {
  initReveal(root, { detail: false });
}
