/*
  HOW TO ADD A PIECE OF WORK
  1. Add an object to `works` below. A card only shows once it has an `image`
     (or `livePreview: true` with an `href`). Order inside a category = order here.
  2. Detail pages copy an existing one (e.g. operational-finance-control.html).
     The page title, summary and chips come from this file, matched by `href`.
  3. Add the page to sitemap.xml.

  EXCEL APPS (category: 'apps')
  The "Excel Apps" filter stays hidden until the first app here has an image.
  Apps are best shown moving, so a detail page view can be a video:
    views: [
      { name: 'Demo', video: 'assets/apps/my-app-demo.mp4', poster: 'assets/apps/my-app-cover.webp', caption: 'Menu · invoice · send reminder' },
      { name: 'Invoice', img: 'assets/apps/my-app-invoice.webp', caption: 'Invoice form' }
    ]
  Keep demo videos short (30 to 90 seconds), muted, MP4 (H.264), under ~8 MB.
  Add `video: 'assets/apps/my-app-demo.mp4'` to the work entry here as well,
  so its gallery card gets a "Video demo" badge.
*/
var WORK_CAPS = { apps: 6, dashboard: 10, ppt: 4, html: 2, automation: 4 };

var WORK_CATEGORIES = ['apps', 'dashboard', 'ppt', 'html', 'automation'];

var WORK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'apps', label: 'Excel Apps' },
  { id: 'dashboard', label: 'Dashboards and Models' },
  { id: 'ppt', label: 'Presentations' },
  { id: 'html', label: 'Web and Interactive' },
  { id: 'automation', label: 'Automation and AI' }
];

var works = [
  {
    id: 'operational-finance-control',
    title: 'Operational Finance Control Tower',
    category: 'dashboard',
    image: 'assets/operational-finance-control/cover.webp',
    href: 'operational-finance-control.html',
    blurb: 'A fourteen tab Excel workbook, with a Google Sheets version, for a business whose clients prepay and whose vendors bill later. It works out how much of the bank balance is really free to use at any month end, after client money held, vendor invoices, spend not yet invoiced, and the card balance. Eight controls, a three month forecast, and 24 built in checks sit on top.',
    tags: ['Excel', 'Google Sheets', 'Working capital', 'Cash forecast'],
    featured: true
  },
  {
    id: 'job-costing',
    title: 'Job Costing and Profitability Tracker',
    category: 'dashboard',
    image: 'assets/job-costing/cover.webp',
    href: 'job-costing.html',
    blurb: 'A fifteen tab Excel workbook, with a Google Sheets version, that turns job, invoice, and cost exports into a WIP schedule: percent complete, earned revenue, over and under billing, receivables, and projected margin for every job. A filtered dashboard, a job drill down, and 30 built in checks sit on top.',
    tags: ['Excel', 'Google Sheets', 'WIP schedule', 'Job costing'],
    featured: true
  },
  {
    id: 'pharmacray',
    title: 'PharmaCray Retail Pharmacy Analytics',
    category: 'dashboard',
    image: 'assets/pharmacray/cover.webp',
    href: 'pharmacray.html',
    blurb: 'A fourteen tab Excel workbook, with a Google Sheets version, for an independent retail pharmacy. It scores twenty measures against their targets for any month, from net margin after DIR to star adherence, and shows what each PBM really pays, when the counter is busy, what to reorder, and which patients to call. 25 built in checks sit underneath.',
    tags: ['Excel', 'Google Sheets', 'Pharmacy KPIs', 'DIR and reimbursement'],
    featured: false
  },
  {
    id: 'multifamily-value-add',
    title: 'Multifamily Value Add Acquisition Model',
    category: 'dashboard',
    image: 'assets/multifamily-value-add/cover.webp',
    href: 'multifamily-value-add.html',
    blurb: 'A thirteen tab Excel workbook, with a Google Sheets version, that underwrites a value add apartment acquisition one unit at a time. Each unit is renovated when its lease ends, as fast as the crew allows, and the model follows it month by month through downtime and lease up to the renovated rent, then sizes the loan, prices the exit, and splits the returns between investors and sponsor. 19 built in checks sit underneath.',
    tags: ['Excel', 'Google Sheets', 'Real estate underwriting', 'LP and GP waterfall'],
    featured: true,
    interactiveUrl: 'builds/multifamily-memorandum/',
    interactiveLabel: 'memorandum'
  },
  {
    id: 'saas-model',
    title: '3 Statement SaaS Financial Model',
    category: 'dashboard',
    image: 'assets/saas-model/cover.webp',
    href: 'saas-model.html',
    blurb: 'A fifteen tab Excel workbook, with a Google Sheets version, that plans a SaaS company month by month from its own books to December 2029. Self serve and sales led ARR come from their drivers, the income statement, balance sheet, and cash flow are linked and balance every month, and Base, Downside, and Upside run side by side. A driver tree shows where each year\'s ARR comes from, and 21 built in checks sit underneath.',
    tags: ['Excel', 'Google Sheets', 'SaaS metrics', 'Scenarios'],
    featured: true
  },
  {
    id: 'budget-vs-actuals',
    title: 'Budget vs Actuals Tracker',
    category: 'dashboard',
    image: 'assets/budget-vs-actuals/cover.webp',
    href: 'budget-vs-actuals.html',
    blurb: 'An eleven tab Excel workbook, with a Google Sheets version, that turns a budget export and a raw GL export into spend against plan for every department and category: budget to date, actual spend, the gap in dollars and percent, a full year outlook, and the budget left to spend. A filtered dashboard, a department drill down, and 26 built in checks sit on top.',
    tags: ['Excel', 'Google Sheets', 'Budget vs actuals', 'Full year outlook'],
    featured: true
  },
  {
    id: 'multifamily-memorandum',
    title: 'Multifamily Value Add Investment Memorandum',
    category: 'html',
    image: '',
    livePreview: true,
    href: 'builds/multifamily-memorandum/',
    previewImage: 'assets/logos/web-deck.svg',
    blurb: 'Single page interactive investment memorandum for a value add multifamily acquisition.',
    tags: ['Real estate', 'Investment memo', 'Interactive'],
    linkLabel: 'Open live page',
    openInNewTab: true,
    featured: false
  },
  {
    id: 'automated-report-system',
    title: 'Automated Monthly Report System',
    category: 'automation',
    image: 'assets/automated-report-dashboard.webp',
    href: 'automated-report-system.html',
    blurb: 'A Google Sheets revenue report that updates itself, with an Excel version of the same report. One Config tab sets the company, title, target, and recipient list. The dashboard rebuilds from raw transactions and a scheduled Apps Script emails the finished report each month.',
    tags: ['Google Sheets', 'Google Apps Script', 'Scheduled email', 'Excel', 'SUMIFS'],
    featured: true
  },
  {
    id: 'rolling-forecast',
    title: 'Rolling Forecast Workbook',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Excel', 'Forecasting', 'FP&A'],
    featured: false
  },
  {
    id: 'dept-allocation',
    title: 'Department Cost Allocation Model',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Excel', 'Allocation', 'Modeling'],
    featured: false
  },
  {
    id: 'cash-flow-projection',
    title: 'Cash Flow Projection Tool',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Excel', 'Cash flow', 'Scenarios'],
    featured: false
  },
  {
    id: 'revenue-recognition',
    title: 'Revenue Recognition Tracker',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Excel', 'Revenue', 'Compliance'],
    featured: false
  },
  {
    id: 'capex-planning',
    title: 'CapEx Planning Dashboard',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Excel', 'CapEx', 'Dashboard'],
    featured: false
  },
  {
    id: 'monthly-close-checklist',
    title: 'Monthly Close Checklist System',
    category: 'dashboard',
    image: '',
    href: '',
    blurb: '',
    tags: ['Sheets', 'Close process', 'Workflow'],
    featured: false
  },
  {
    id: 'capabilities-deck',
    title: 'Capabilities and portfolio deck',
    category: 'ppt',
    image: 'assets/timmerman-capabilities-cover.webp',
    href: 'capabilities-deck.html',
    blurb: 'A seventeen slide deck on dashboards, models, automation, and how I work with finance teams.',
    tags: ['PowerPoint', 'Charts', 'Case studies'],
    linkLabel: 'View presentation',
    featured: false,
    interactiveUrl: 'capabilities.html',
    interactiveLabel: 'deck',
    slides: [
      { id: '01', img: 'assets/decks/capabilities/slide-01.webp', alt: 'Capabilities deck slide 1' },
      { id: '02', img: 'assets/decks/capabilities/slide-02.webp', alt: 'Capabilities deck slide 2' },
      { id: '03', img: 'assets/decks/capabilities/slide-03.webp', alt: 'Capabilities deck slide 3' },
      { id: '04', img: 'assets/decks/capabilities/slide-04.webp', alt: 'Capabilities deck slide 4' },
      { id: '05', img: 'assets/decks/capabilities/slide-05.webp', alt: 'Capabilities deck slide 5' },
      { id: '06', img: 'assets/decks/capabilities/slide-06.webp', alt: 'Capabilities deck slide 6' },
      { id: '07', img: 'assets/decks/capabilities/slide-07.webp', alt: 'Capabilities deck slide 7' },
      { id: '08', img: 'assets/decks/capabilities/slide-08.webp', alt: 'Capabilities deck slide 8' },
      { id: '09', img: 'assets/decks/capabilities/slide-09.webp', alt: 'Capabilities deck slide 9' },
      { id: '10', img: 'assets/decks/capabilities/slide-10.webp', alt: 'Capabilities deck slide 10' },
      { id: '11', img: 'assets/decks/capabilities/slide-11.webp', alt: 'Capabilities deck slide 11' },
      { id: '12', img: 'assets/decks/capabilities/slide-12.webp', alt: 'Capabilities deck slide 12' },
      { id: '13', img: 'assets/decks/capabilities/slide-13.webp', alt: 'Capabilities deck slide 13' },
      { id: '14', img: 'assets/decks/capabilities/slide-14.webp', alt: 'Capabilities deck slide 14' },
      { id: '15', img: 'assets/decks/capabilities/slide-15.webp', alt: 'Capabilities deck slide 15' },
      { id: '16', img: 'assets/decks/capabilities/slide-16.webp', alt: 'Capabilities deck slide 16' },
      { id: '17', img: 'assets/decks/capabilities/slide-17.webp', alt: 'Capabilities deck slide 17' }
    ]
  },
  {
    id: 'job-costing-deck',
    title: 'Job Costing case study',
    category: 'ppt',
    image: 'assets/jobcosting-deck-cover.webp',
    href: 'job-costing-deck.html',
    blurb: 'A fourteen slide walkthrough of how scattered accounting data became job level profit, with all names removed.',
    tags: ['PowerPoint', 'Charts', 'Case study'],
    linkLabel: 'View presentation',
    featured: false,
    slides: [
      { id: '01', img: 'assets/decks/job-costing/slide-01.webp', alt: 'Job Costing deck slide 1' },
      { id: '02', img: 'assets/decks/job-costing/slide-02.webp', alt: 'Job Costing deck slide 2' },
      { id: '03', img: 'assets/decks/job-costing/slide-03.webp', alt: 'Job Costing deck slide 3' },
      { id: '04', img: 'assets/decks/job-costing/slide-04.webp', alt: 'Job Costing deck slide 4' },
      { id: '05', img: 'assets/decks/job-costing/slide-05.webp', alt: 'Job Costing deck slide 5' },
      { id: '06', img: 'assets/decks/job-costing/slide-06.webp', alt: 'Job Costing deck slide 6' },
      { id: '07', img: 'assets/decks/job-costing/slide-07.webp', alt: 'Job Costing deck slide 7' },
      { id: '08', img: 'assets/decks/job-costing/slide-08.webp', alt: 'Job Costing deck slide 8' },
      { id: '09', img: 'assets/decks/job-costing/slide-09.webp', alt: 'Job Costing deck slide 9' },
      { id: '10', img: 'assets/decks/job-costing/slide-10.webp', alt: 'Job Costing deck slide 10' },
      { id: '11', img: 'assets/decks/job-costing/slide-11.webp', alt: 'Job Costing deck slide 11' },
      { id: '12', img: 'assets/decks/job-costing/slide-12.webp', alt: 'Job Costing deck slide 12' },
      { id: '13', img: 'assets/decks/job-costing/slide-13.webp', alt: 'Job Costing deck slide 13' },
      { id: '14', img: 'assets/decks/job-costing/slide-14.webp', alt: 'Job Costing deck slide 14' }
    ]
  },
  {
    id: 'board-update-deck',
    title: 'Board Update Deck Template',
    category: 'ppt',
    image: '',
    href: '',
    blurb: '',
    tags: ['PowerPoint', 'Board reporting', 'KPIs'],
    featured: false
  },
  {
    id: 'investor-reporting-pack',
    title: 'Investor Reporting Pack',
    category: 'ppt',
    image: '',
    href: '',
    blurb: '',
    tags: ['Slides', 'Investor update', 'Metrics'],
    featured: false
  },
  {
    id: 'quarterly-business-review',
    title: 'Quarterly Business Review Slides',
    category: 'ppt',
    image: '',
    href: '',
    blurb: '',
    tags: ['PowerPoint', 'QBR', 'Variance'],
    featured: false
  },
  {
    id: 'kpi-summary-deck',
    title: 'KPI Summary Presentation',
    category: 'ppt',
    image: '',
    href: '',
    blurb: '',
    tags: ['Slides', 'KPIs', 'Executive'],
    featured: false
  },
  {
    id: 'interactive-calculator',
    title: 'Interactive Financial Calculator',
    category: 'html',
    image: '',
    href: '',
    blurb: '',
    tags: ['Web', 'Calculator', 'Scenarios'],
    featured: false
  },
  {
    id: 'metrics-explorer',
    title: 'Metrics Explorer Web App',
    category: 'html',
    image: '',
    href: '',
    blurb: '',
    tags: ['Web', 'Charts', 'Filters'],
    featured: false
  },
  {
    id: 'gl-export-pipeline',
    title: 'GL Export Pipeline',
    category: 'automation',
    image: '',
    href: '',
    blurb: '',
    tags: ['Power Query', 'ETL', 'Excel'],
    featured: false
  },
  {
    id: 'invoice-processing',
    title: 'Invoice Processing Workflow',
    category: 'automation',
    image: '',
    href: '',
    blurb: '',
    tags: ['Apps Script', 'Invoicing', 'Workflow'],
    featured: false
  },
  {
    id: 'expense-categorization',
    title: 'Expense Categorization Tool',
    category: 'automation',
    image: '',
    href: '',
    blurb: '',
    tags: ['Sheets', 'AI assisted', 'Categorization'],
    featured: false
  },
  {
    id: 'report-distribution',
    title: 'Report Distribution Automation',
    category: 'automation',
    image: '',
    href: '',
    blurb: '',
    tags: ['VBA', 'Email', 'Scheduling'],
    featured: false
  }
];

function isReady(w) {
  if (w && w.livePreview && typeof w.href === 'string' && w.href.trim()) return true;
  return typeof w.image === 'string' && w.image.trim() !== '';
}

function hasInteractive(w) {
  return !!(w && typeof w.interactiveUrl === 'string' && w.interactiveUrl.trim());
}

function getInteractiveButtonLabel(w) {
  if (w && typeof w.interactiveLabel === 'string' && w.interactiveLabel.trim()) {
    return w.interactiveLabel.trim();
  }
  return 'demo';
}

function getInteractiveButtonText(w) {
  return 'View interactive ' + getInteractiveButtonLabel(w);
}

function getWorkByHref(href) {
  if (!href) return null;
  return works.find(function(w) { return w.href === href; }) || null;
}

function getWorkByPage(page) {
  if (!page) return null;
  var normalized = String(page).split('?')[0].split('#')[0];
  if (!normalized) return null;

  var work = getWorkByHref(normalized);
  if (work) return work;

  if (normalized.indexOf('.') === -1) {
    work = getWorkByHref(normalized + '.html');
    if (work) return work;
  }

  var stem = normalized.replace(/\.html$/i, '');
  return works.find(function(w) { return w.id === stem; }) || null;
}

function isWorkGalleryCategory(category) {
  return WORK_FILTERS.some(function(f) { return f.id === category && f.id !== 'all'; });
}

function getWorkGalleryHref(category) {
  if (!isWorkGalleryCategory(category)) return 'work.html';
  return 'work.html?category=' + encodeURIComponent(category);
}

function hasVideo(w) {
  return !!(w && typeof w.video === 'string' && w.video.trim());
}

function getWorkBackLabel(category) {
  if (category === 'apps' || category === 'ppt' || category === 'dashboard' || category === 'automation' || category === 'html') {
    return 'Back to selected work';
  }
  return 'Back to portfolio';
}

function readWorkGalleryFilter() {
  var params = new URLSearchParams(window.location.search);
  var category = params.get('category');
  if (!category && window.location.hash) {
    category = window.location.hash.replace(/^#/, '');
  }
  if (!isWorkGalleryCategory(category)) return 'all';
  return getGalleryWorks(category).length ? category : 'all';
}

function getWorkForCurrentPage() {
  var path = window.location.pathname || '';
  var parts = path.split('/').filter(function(part) { return part; });
  var page = parts.length ? parts[parts.length - 1] : 'index.html';
  return getWorkByPage(page);
}

function getBuildNavItems() {
  return works.filter(function(w) {
    return (w.category === 'apps' || w.category === 'dashboard' || w.category === 'automation')
      && typeof w.href === 'string'
      && /\.html$/i.test(w.href)
      && isReady(w);
  }).map(function(w) {
    return { href: w.href, title: w.title };
  });
}

function getDeckNavItems() {
  return works.filter(function(w) {
    return w.category === 'ppt'
      && typeof w.href === 'string'
      && /\.html$/i.test(w.href)
      && isReady(w);
  }).map(function(w) {
    return { href: w.href, title: w.title };
  });
}

function getCappedGalleryWorks() {
  var result = [];
  WORK_CATEGORIES.forEach(function(cat) {
    var items = works.filter(function(w) {
      return w.category === cat && isReady(w);
    }).slice(0, WORK_CAPS[cat]);
    result = result.concat(items);
  });
  return result;
}

function getGalleryWorks(filterId) {
  var capped = getCappedGalleryWorks();
  if (filterId === 'all') return capped;
  return capped.filter(function(w) { return w.category === filterId; });
}

var FEATURED_ORDER = [
  'operational-finance-control',
  'job-costing',
  'multifamily-value-add',
  'saas-model',
  'budget-vs-actuals',
  'automated-report-system'
];

function getFeaturedWorks() {
  var featured = works.filter(function(w) {
    return w.featured && isReady(w);
  });
  return FEATURED_ORDER.map(function(id) {
    return featured.find(function(w) { return w.id === id; });
  }).filter(Boolean).concat(
    featured.filter(function(w) { return FEATURED_ORDER.indexOf(w.id) === -1; })
  );
}
