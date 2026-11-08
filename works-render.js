function renderWorkCard(item, options) {
  var opts = options || {};
  var article = document.createElement('article');
  article.className = 'work reveal' + (opts.gallery ? ' work-gallery-card' : '');
  if (opts.gallery && item.livePreview) {
    article.classList.add('work-gallery-card--live');
  } else if (opts.gallery && typeof hasInteractive === 'function' && hasInteractive(item)) {
    article.classList.add('work-gallery-card--interactive');
  }
  article.setAttribute('data-id', item.id);
  article.setAttribute('data-category', item.category);
  if (typeof hasInteractive === 'function' && hasInteractive(item)) {
    article.setAttribute('data-interactive', 'true');
  }

  var vis = document.createElement('div');
  vis.className = 'work-vis work-vis--thumb' + (opts.gallery ? ' work-thumb' : '');

  var frame = document.createElement('div');
  if (opts.gallery) frame.className = 'work-thumb__frame';

  var img = null;
  if (!opts.gallery || !item.livePreview || !item.href) {
    img = document.createElement('img');
    img.className = opts.gallery ? 'work-thumb__img' : '';
    img.src = item.image || '';
    img.alt = item.title + ' preview';
    img.width = 1024;
    img.height = 724;
    img.loading = 'lazy';
    img.decoding = 'async';
  }

  if (opts.gallery) {
    if (item.livePreview && item.href) {
      frame.classList.add('work-thumb__frame--live');
      var scaler = document.createElement('div');
      scaler.className = 'work-thumb__live-scaler';
      if (item.previewImage) {
        var poster = document.createElement('img');
        poster.className = 'work-thumb__poster';
        poster.src = item.previewImage;
        poster.alt = '';
        poster.setAttribute('aria-hidden', 'true');
        scaler.appendChild(poster);
      }
      var iframe = document.createElement('iframe');
      iframe.className = 'work-thumb__iframe';
      iframe.src = item.href;
      iframe.title = item.title + ' live preview';
      iframe.setAttribute('tabindex', '-1');
      iframe.setAttribute('aria-hidden', 'true');
      scaler.appendChild(iframe);
      frame.appendChild(scaler);
      syncLivePreviewScale(frame);
    } else if (img) {
      frame.appendChild(img);
    }
    vis.appendChild(frame);
    if (!item.livePreview && typeof hasVideo === 'function' && hasVideo(item)) {
      var videoBadge = document.createElement('span');
      videoBadge.className = 'work-thumb__badge work-thumb__badge--video';
      videoBadge.textContent = 'Video demo';
      vis.appendChild(videoBadge);
    } else if (!item.livePreview && typeof hasInteractive === 'function' && hasInteractive(item)) {
      var badge = document.createElement('span');
      badge.className = 'work-thumb__badge work-thumb__badge--interactive';
      badge.textContent = 'Interactive';
      vis.appendChild(badge);
    }
  } else if (img) {
    vis.appendChild(img);
  }

  var body = document.createElement('div');
  body.className = 'work-body';

  var title = document.createElement('h3');
  title.textContent = item.title;

  var blurb = document.createElement('p');
  blurb.textContent = item.blurb;

  var chips = document.createElement('div');
  chips.className = 'chips';
  item.tags.forEach(function(tag) {
    var chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = tag;
    chips.appendChild(chip);
  });

  var cue = document.createElement('span');
  cue.className = 'view-link';
  var linkText = item.linkLabel || (item.category === 'ppt' ? 'View presentation' : 'View dashboard');
  cue.innerHTML = linkText + ' &rarr;';

  body.appendChild(title);
  body.appendChild(blurb);
  body.appendChild(chips);
  body.appendChild(cue);

  var link = document.createElement('a');
  link.className = 'card-link';
  link.href = item.href;
  link.setAttribute('aria-label', 'Open ' + item.title);
  if (item.openInNewTab) {
    link.target = '_blank';
    link.rel = 'noopener';
  }

  article.appendChild(vis);
  article.appendChild(body);
  article.appendChild(link);

  return article;
}

function syncLivePreviewScale(frame) {
  var scaler = frame.querySelector('.work-thumb__live-scaler');
  var iframe = frame.querySelector('.work-thumb__iframe');
  if (!scaler || !iframe) return;
  var width = scaler.clientWidth;
  if (!width) return;
  var scale = width / 1280;
  iframe.style.transform = 'scale(' + scale + ')';
  scaler.style.height = Math.round(720 * scale) + 'px';
}

function syncAllLivePreviewScales(root) {
  var scope = root || document;
  scope.querySelectorAll('.work-thumb__frame--live').forEach(syncLivePreviewScale);
}

function renderFeaturedWorks(container) {
  if (!container) return;
  container.innerHTML = '';
  getFeaturedWorks().forEach(function(item) {
    container.appendChild(renderWorkCard(item));
  });
  if (typeof initReveal === 'function') {
    initReveal(container);
  }
}

function observeReveals(root) {
  if (typeof initReveal === 'function') {
    initReveal(root, { detail: false });
  }
}
