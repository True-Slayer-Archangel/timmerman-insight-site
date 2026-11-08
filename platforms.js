var PLATFORM_LOGOS = {
  'Excel': 'assets/logos/excel.svg',
  'Google Sheets': 'assets/logos/google-sheets.svg',
  'Google Slides': 'assets/logos/google-slides.svg',
  'PowerPoint': 'assets/logos/powerpoint.svg',
  'Interactive version': 'assets/logos/web-deck.svg',
  'Power BI': 'assets/logos/powerbi.svg',
  'Looker': 'assets/logos/looker.svg'
};

function renderPlatformLinks(platforms) {
  var container = document.getElementById('platform-links');
  var section = document.getElementById('rail-platforms');
  if (!container) return;

  var linked = (platforms || []).filter(function(p) {
    return p.url && p.url.trim();
  });

  if (!linked.length) {
    if (section) section.hidden = true;
    container.innerHTML = '';
    return;
  }

  if (section) section.hidden = false;
  container.innerHTML = '';

  linked.forEach(function(p) {
    var logo = p.logo || PLATFORM_LOGOS[p.name] || '';
    var link = document.createElement('a');
    link.className = 'platform-link btn btn-ghost';
    link.href = p.url.trim();
    if (/^https?:\/\//i.test(p.url.trim())) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    link.setAttribute('aria-label', 'Open in ' + p.name);
    link.innerHTML =
      (logo
        ? '<span class="platform-link__icon"><img src="' + logo + '" alt=""></span>'
        : '<span class="platform-link__swatch" aria-hidden="true"></span>') +
      '<span class="platform-link__name">' + p.name + '</span>' +
      '<span class="platform-link__arrow" aria-hidden="true">&rarr;</span>';
    container.appendChild(link);
  });
}

function renderWhatsInside(items) {
  var card = document.getElementById('spec-card');
  if (!card || !items) return;

  card.innerHTML = '';
  items.forEach(function(row) {
    var dt = document.createElement('dt');
    dt.className = 'spec-label';
    dt.textContent = row.label;
    var dd = document.createElement('dd');
    dd.className = 'spec-value';
    dd.textContent = row.value;
    card.appendChild(dt);
    card.appendChild(dd);
  });
}
