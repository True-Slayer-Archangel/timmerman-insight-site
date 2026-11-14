function initBuildDetail(config) {
  if (!config) return;

  initWorkHeader();

  var appLabel = document.getElementById('app-frame-label');
  if (appLabel && config.appLabel) {
    appLabel.textContent = config.appLabel;
  }

  initPreviewZoom();
  initViewTabs(config.views || []);
  renderPlatformLinks(config.platforms || []);
  renderWhatsInside(config.whatsInside || []);
  initInteractiveCta();
  initReveal(document, { detail: true });
}

function initWorkHeader(workOverride) {
  var work = workOverride
    || (typeof getWorkForCurrentPage === 'function' ? getWorkForCurrentPage() : null);
  if (!work) return;

  var header = document.querySelector('.build-header');
  if (!header) return;

  var h1 = header.querySelector('h1');
  if (h1 && work.title) {
    h1.textContent = work.title;
  }

  var summary = header.querySelector('.summary:not([data-static])');
  if (summary && work.blurb) {
    summary.textContent = work.blurb;
  }

  var chipsEl = header.querySelector('.chips');
  if (chipsEl && work.tags && work.tags.length) {
    chipsEl.innerHTML = '';
    work.tags.forEach(function(tag) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = tag;
      chipsEl.appendChild(chip);
    });
  }
}

function renderDeckGallery(slides) {
  if (!slides || !slides.length) return;

  var jumpNav = document.getElementById('deck-jump');
  var gallery = document.getElementById('deck-slides');
  if (!jumpNav || !gallery) return;

  jumpNav.innerHTML = '';
  gallery.innerHTML = '';

  slides.forEach(function(slide, i) {
    var slideId = 'deck-slide-' + slide.id;

    var jump = document.createElement('a');
    jump.className = 'view-tab view-tab--num';
    jump.href = '#' + slideId;
    jump.textContent = slide.id;
    jumpNav.appendChild(jump);

    var figure = document.createElement('figure');
    figure.className = 'deck-slide';
    figure.id = slideId;

    var img = document.createElement('img');
    img.src = slide.img;
    img.alt = slide.alt || ('Slide ' + slide.id);
    img.width = 1280;
    img.height = 720;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';

    figure.appendChild(img);
    gallery.appendChild(figure);
  });
}

function resolveDeckWork(pageOverride) {
  if (pageOverride && typeof getWorkByPage === 'function') {
    var byPage = getWorkByPage(pageOverride);
    if (byPage) return byPage;
  }

  if (pageOverride && typeof works !== 'undefined' && works.length) {
    var key = String(pageOverride).split('?')[0].split('#')[0].replace(/^.*\//, '');
    var stem = key.replace(/\.html$/i, '');
    var byMeta = works.find(function(w) {
      return w.id === stem || w.id === key || w.href === key || w.href === stem + '.html';
    });
    if (byMeta) return byMeta;
  }

  if (typeof getWorkForCurrentPage === 'function') {
    return getWorkForCurrentPage();
  }

  return null;
}

function initDeckDetail(pageOverride) {
  var work = null;
  if (pageOverride && typeof pageOverride === 'object' && pageOverride.slides) {
    work = pageOverride;
  }
  if (!work || !work.slides) return;

  initWorkHeader(work);
  renderDeckGallery(work.slides);
  initReveal(document, { detail: true });
}

function renderInteractiveCta(work) {
  if (typeof hasInteractive !== 'function' || !hasInteractive(work)) return;

  var rail = document.querySelector('.build-rail');
  if (!rail) return;

  var cta = rail.querySelector('.rail-cta');
  if (!cta) {
    cta = document.createElement('div');
    cta.className = 'rail-cta';
    rail.appendChild(cta);
  }

  var existing = cta.querySelector('[data-interactive-cta]');
  if (existing) existing.remove();

  var link = document.createElement('a');
  link.className = 'btn btn-ghost';
  link.href = work.interactiveUrl.trim();
  link.setAttribute('data-interactive-cta', '');
  link.innerHTML = (work.interactiveText || getInteractiveButtonText(work)) + ' <span class="btn-arrow">&rarr;</span>';
  cta.insertBefore(link, cta.firstChild);
}

function initInteractiveCta() {
  if (typeof getWorkForCurrentPage !== 'function') return;
  renderInteractiveCta(getWorkForCurrentPage());
}

function formatCaption(text) {
  if (!text) return '';
  return String(text).replace(/\s*\/\/\s*/g, ' · ').replace(/\s+/g, ' ').trim();
}

function initViewTabs(views) {
  var tabsEl = document.getElementById('view-tabs');
  var img = document.getElementById('preview-img');
  var caption = document.getElementById('preview-caption');
  if (!tabsEl || !img || !views.length) return;

  var mediaBox = img.parentNode;
  var video = null;

  // A view with `video` plays a demo clip in the same frame; everything else is a screenshot.
  function showVideo(view) {
    if (!video) {
      video = document.createElement('video');
      video.id = 'preview-video';
      video.className = 'preview-video';
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.preload = 'metadata';
      mediaBox.appendChild(video);
    }
    if (video.getAttribute('src') !== view.video) video.setAttribute('src', view.video);
    if (view.poster) video.setAttribute('poster', view.poster);
    else video.removeAttribute('poster');
    video.setAttribute('aria-label', view.alt || (view.name + ' video'));
    video.hidden = false;
    img.hidden = true;
  }

  function showImage(view) {
    if (video) {
      video.pause();
      video.hidden = true;
    }
    img.hidden = false;
    img.src = view.img;
    img.alt = view.alt || (view.name + ' view');
    img.removeAttribute('width');
    img.removeAttribute('height');
  }

  function applyView(view) {
    if (view.video) showVideo(view);
    else showImage(view);
    syncPreviewZoom(!view.video);
    if (caption) caption.textContent = formatCaption(view.caption || '');
  }

  applyView(views[0]);

  if (views.length <= 1) {
    tabsEl.hidden = true;
    return;
  }

  tabsEl.hidden = false;
  tabsEl.innerHTML = '';

  function selectView(index) {
    var tabs = tabsEl.querySelectorAll('.view-tab');
    tabs.forEach(function(tab, j) {
      var active = j === index;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
    applyView(views[index]);
  }

  views.forEach(function(view, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'view-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', 'preview-img');
    btn.textContent = view.name;
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.setAttribute('aria-current', 'true');

    btn.addEventListener('click', function() {
      selectView(i);
    });

    btn.addEventListener('keydown', function(e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var next = e.key === 'ArrowRight'
        ? (i + 1) % views.length
        : (i - 1 + views.length) % views.length;
      tabsEl.querySelectorAll('.view-tab')[next].focus();
      selectView(next);
    });

    tabsEl.appendChild(btn);
  });
}

function syncPreviewZoom(enabled) {
  var btn = document.getElementById('preview-zoom');
  if (btn) btn.hidden = !enabled;
}

// Screenshots sit in a 16:9 frame, so tall dashboards are cropped there.
// "Full size" (or a click on the screenshot) shows the whole image.
function initPreviewZoom() {
  var img = document.getElementById('preview-img');
  var frame = img ? img.closest('.app-frame') : null;
  var bar = frame ? frame.querySelector('.app-frame__bar') : null;
  if (!img || !bar || document.getElementById('preview-zoom')) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'app-frame__zoom';
  btn.id = 'preview-zoom';
  btn.setAttribute('aria-label', 'View this screenshot at full size');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><span>Full size</span>';
  bar.appendChild(btn);

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Full size screenshot');
  box.innerHTML = '<button type="button" class="lightbox__close" aria-label="Close full size view"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img class="lightbox__img" alt="">';
  document.body.appendChild(box);

  var big = box.querySelector('.lightbox__img');
  var closeBtn = box.querySelector('.lightbox__close');
  var lastFocus = null;

  function open() {
    if (img.hidden) return;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    box.hidden = false;
    box.scrollTop = 0;
    document.body.classList.add('lightbox-open');
    lastFocus = document.activeElement;
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  btn.addEventListener('click', open);
  img.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', function(e) {
    if (e.target === box || e.target === big) close();
  });
  document.addEventListener('keydown', function(e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  });
}

function initDetailReveal() {
  initReveal(document, { detail: true });
}
