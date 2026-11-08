(function initTheme() {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function getTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    updateToggle(theme);
  }

  function updateToggle(theme) {
    if (!toggle) return;
    var isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (toggle) {
    updateToggle(getTheme());
    toggle.addEventListener('click', function() {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }
})();

(function initMobileNav() {
  var header = document.querySelector('header.nav');
  if (!header) return;

  var navInner = header.querySelector('.nav-inner');
  var navLinks = header.querySelector('.nav-links');
  var navCta = header.querySelector('.nav-cta');
  if (!navInner || !navLinks) return;

  var menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Open menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'mobile-nav-drawer');
  menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  var drawer = document.createElement('div');
  drawer.className = 'mobile-nav-drawer';
  drawer.id = 'mobile-nav-drawer';
  drawer.hidden = true;

  var drawerPanel = document.createElement('div');
  drawerPanel.className = 'mobile-nav-drawer__panel';

  var drawerLinks = document.createElement('nav');
  drawerLinks.className = 'mobile-nav-links';
  drawerLinks.setAttribute('aria-label', 'Mobile navigation');

  navLinks.querySelectorAll('a').forEach(function(link) {
    var clone = link.cloneNode(true);
    clone.addEventListener('click', closeDrawer);
    drawerLinks.appendChild(clone);
  });

  var drawerCta = document.createElement('div');
  drawerCta.className = 'mobile-nav-cta';

  var upworkBtn = navCta && navCta.querySelector('.btn-primary');
  if (upworkBtn) {
    var upworkClone = upworkBtn.cloneNode(true);
    upworkClone.addEventListener('click', closeDrawer);
    drawerCta.appendChild(upworkClone);
  }

  drawerPanel.appendChild(drawerLinks);
  drawerPanel.appendChild(drawerCta);
  drawer.appendChild(drawerPanel);

  var scrim = document.createElement('button');
  scrim.type = 'button';
  scrim.className = 'mobile-nav-scrim';
  scrim.setAttribute('aria-label', 'Close menu');
  scrim.addEventListener('click', closeDrawer);
  drawer.insertBefore(scrim, drawerPanel);

  document.body.appendChild(drawer);

  if (navCta) {
    navCta.appendChild(menuToggle);
  } else {
    navInner.appendChild(menuToggle);
  }

  menuToggle.addEventListener('click', function() {
    if (drawer.hidden) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !drawer.hidden) {
      closeDrawer();
      menuToggle.focus();
    }
  });

  function openDrawer() {
    drawer.hidden = false;
    document.body.classList.add('mobile-nav-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    drawerLinks.querySelector('a').focus();
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.body.classList.remove('mobile-nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  }
})();
