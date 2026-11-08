function populateSampleNav(selects, builds, currentPage) {
  selects.forEach(function(select) {
    builds.forEach(function(build) {
      var option = document.createElement('option');
      option.value = build.href;
      option.textContent = build.title;
      if (build.href === currentPage) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', function() {
      var target = select.value;
      if (target && target !== currentPage) {
        window.location.href = target;
      }
    });
  });
}

function initBuildNav(currentPage) {
  var builds = typeof getBuildNavItems === 'function' ? getBuildNavItems() : [];
  populateSampleNav(document.querySelectorAll('[data-build-select]'), builds, currentPage);
  initWorkBackLinks();
}

function initDeckNav(currentPage) {
  var decks = typeof getDeckNavItems === 'function' ? getDeckNavItems() : [];
  populateSampleNav(document.querySelectorAll('[data-deck-select]'), decks, currentPage);
  initWorkBackLinks();
}

function initWorkBackLinks(categoryOverride) {
  var work = typeof getWorkForCurrentPage === 'function' ? getWorkForCurrentPage() : null;
  var category = categoryOverride || (work && work.category);
  if (!isWorkGalleryCategory(category)) return;

  var href = typeof getWorkGalleryHref === 'function' ? getWorkGalleryHref(category) : 'work.html';
  var label = typeof getWorkBackLabel === 'function' ? getWorkBackLabel(category) : 'Back to selected work';

  document.querySelectorAll('.nav-back, .build-back').forEach(function(link) {
    var target = link.getAttribute('href') || '';
    if (target === 'work.html' || target.indexOf('work.html?') === 0 || target === 'index.html#work') {
      link.href = href;
      link.setAttribute('aria-label', label);
      link.innerHTML = '&larr; ' + label;
    }
  });
}

function initDetailNavScroll() {
  var nav = document.getElementById('nav');
  if (!nav || !document.body.classList.contains('detail-page')) return;

  function syncNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }

  syncNavScroll();
  window.addEventListener('scroll', syncNavScroll, { passive: true });
}
