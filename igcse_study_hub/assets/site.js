/* ── (I)GCSE STUDY HUB — SHARED PAGE ENGINE ──────────────────────
   Renders the hub (body[data-page="hub"]) and placeholder subject
   pages (body[data-subject]) from the SUBJECTS registry, and wires
   the shared chrome: settings, dark mode, font size, collapse-all,
   global search, and the subject switcher.

   Settings persist in shared keys (igcse-theme / igcse-font-size /
   igcse-vol) so they follow the user across every subject page.    */

(function () {
  'use strict';

  /* ── Shared settings storage (with one-time migration from the
        original Latin page's keys) ─────────────────────────────── */
  var store = {
    get: function (key, legacy) {
      var v = localStorage.getItem('igcse-' + key);
      if (v === null && legacy) v = localStorage.getItem(legacy);
      return v;
    },
    set: function (key, val) { localStorage.setItem('igcse-' + key, val); },
    remove: function (key) { localStorage.removeItem('igcse-' + key); }
  };

  var esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* ── Apply saved theme + font size before first paint ─────────── */
  if (store.get('theme', 'latin-theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  var savedFont = store.get('font-size', 'latin-font-size');
  if (savedFont) document.documentElement.style.fontSize = savedFont + 'px';

  var body = document.body;
  var subjectId = body.getAttribute('data-subject');
  var isHub = body.getAttribute('data-page') === 'hub';
  var subject = subjectId ? window.getSubject(subjectId) : null;

  /* Per-subject accent theming from the registry */
  if (subject) {
    document.documentElement.style.setProperty('--accent', subject.accent);
    document.documentElement.style.setProperty('--accent-dark', subject.accentDark);
    document.documentElement.style.setProperty('--accent-light', hexToRgba(subject.accent, 0.09));
  }

  function hexToRgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  /* ── Shared chrome templates ──────────────────────────────────── */
  function switcherHtml(currentId) {
    var opts = '<option value="index.html"' + (isHub ? ' selected' : '') + '>⌂ All subjects</option>';
    window.SUBJECTS.forEach(function (s) {
      opts += '<option value="' + s.file + '"' + (s.id === currentId ? ' selected' : '') + '>' +
        s.icon + ' ' + esc(s.name) + (s.status === 'complete' ? ' ✓' : '') + '</option>';
    });
    return '<select class="subject-switch" id="subject-switch" title="Switch subject">' + opts + '</select>';
  }

  function headerHtml(title, sub, currentId, opts) {
    opts = opts || {};
    return '' +
      '<div class="header-left">' +
      '  <h1>' + esc(title) + '</h1>' +
      '  <p>' + esc(sub) + '</p>' +
      '</div>' +
      '<div class="header-right">' +
      '  <div class="header-controls">' +
      switcherHtml(currentId) +
      (opts.collapseAll ? '<button class="btn-toggle" id="collapseAllBtn" title="Collapse all sections">↕ Collapse All</button>' : '') +
      '    <div style="position:relative">' +
      '      <button class="btn-toggle" id="settingsBtn" title="Settings">⚙ Settings</button>' +
      '      <div id="settings-panel" class="settings-panel" hidden>' +
      '        <div class="settings-item"><span>Dark mode</span><button class="btn-toggle" id="darkModeBtn">☾ Dark</button></div>' +
      '        <div class="settings-separator"></div>' +
      '        <div class="settings-item settings-item--col">' +
      '          <div class="settings-row-label"><span id="vol-icon">🔉 Volume</span><span id="vol-val" class="settings-val">50%</span></div>' +
      '          <input type="range" id="vol-slider" min="0" max="100" step="5" value="50" class="settings-slider">' +
      '        </div>' +
      '        <div class="settings-separator"></div>' +
      '        <div class="settings-item settings-item--col">' +
      '          <div class="settings-row-label"><span>Font size</span><span id="font-size-val" class="settings-val">15px</span></div>' +
      '          <div style="display:flex;gap:0.5rem;align-items:center">' +
      '            <input type="range" id="font-size-slider" min="12" max="20" step="1" value="15" class="settings-slider">' +
      '            <button class="btn-toggle" id="font-size-reset" title="Reset to default" style="padding:0.2rem 0.5rem;font-size:0.72rem;flex-shrink:0">↺</button>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="global-search-row">' +
      '    <input type="search" id="global-search" placeholder="' + esc(opts.searchPlaceholder || 'Search this page…') + '" autocomplete="off" spellcheck="false">' +
      '    <span id="global-search-count"></span>' +
      '    <button id="global-search-clear" style="display:none" title="Clear search">✕</button>' +
      '  </div>' +
      '</div>';
  }

  /* ── SUBJECT PAGE RENDER ──────────────────────────────────────── */
  function renderSubjectPage(s) {
    document.title = s.code + ' — Knowledge Bank';

    var header = document.createElement('header');
    header.innerHTML = headerHtml(s.code + ' — Knowledge Bank', s.tagline, s.id, {
      collapseAll: true,
      searchPlaceholder: 'Search topics on this page…'
    });

    /* Sidebar */
    var sidebarLinks = '<a href="#home" style="font-weight:600;color:var(--accent)">Home</a>' +
      '<span class="sidebar-title">Topics</span>';
    s.topics.forEach(function (t) {
      sidebarLinks += '<a href="#' + t.id + '">' + esc(t.title) + '</a>';
    });
    sidebarLinks += '<span class="sidebar-title">Hub</span><a href="index.html">⌂ All subjects</a>';

    var subtopicCount = s.topics.reduce(function (n, t) { return n + (t.subtopics ? t.subtopics.length : 0); }, 0);

    /* Home section */
    var quickLinks = s.topics.slice(0, 5).map(function (t) {
      return '<a href="#' + t.id + '">' + esc(t.title) + '</a>';
    }).join('');

    var home = '' +
      '<section id="home">' +
      '  <div class="home-hero">' +
      '    <h2>' + s.icon + ' ' + esc(s.code) + ' <span class="status-badge planned">🚧 Content coming soon</span></h2>' +
      '    <p class="home-tagline">' + esc(s.tagline) + '</p>' +
      '    <p>This knowledge bank will follow the same format as the completed Latin reference: full topic coverage, searchable summaries, colour-coded tables, and a key-terms glossary. The structure below is in place — the content is being written.</p>' +
      '    <div class="home-stats">' +
      '      <div class="home-stat"><span class="num">' + s.topics.length + '</span><span class="lbl">topics planned</span></div>' +
      '      <div class="home-stat"><span class="num">' + subtopicCount + '</span><span class="lbl">subtopics mapped</span></div>' +
      '      <div class="home-stat"><span class="num">0%</span><span class="lbl">content written</span></div>' +
      '    </div>' +
      '    <div class="home-quick-links">' + quickLinks + '</div>' +
      '  </div>' +
      '  <div class="home-about">' +
      '    <h3>About this knowledge bank</h3>' +
      '    <p>Each topic section below shows what it will cover. When the content lands, every section gets the full treatment from the Latin reference:</p>' +
      '    <ul>' +
      '      <li><strong>Reference tables</strong> — colour-coded summaries you can scan at speed</li>' +
      '      <li><strong>Site-wide search</strong> — the header search bar highlights matches across the whole page</li>' +
      '      <li><strong>Key-terms glossary</strong> — clickable entries with full detail, starrable for a personal revision list</li>' +
      '      <li><strong>Exam focus</strong> — command words, mark-scheme language, and common pitfalls per topic</li>' +
      '    </ul>' +
      '  </div>' +
      '</section>';

    /* Mobile jump bar */
    var jumps = '<nav class="mobile-jumps" aria-label="Jump to section"><a href="#home">Home</a>' +
      s.topics.map(function (t) { return '<a href="#' + t.id + '">' + esc(t.title) + '</a>'; }).join('') +
      '</nav>';

    /* Topic sections */
    var sections = s.topics.map(function (t) {
      var chips = (t.subtopics || []).map(function (st) {
        return '<span class="topic-chip">' + esc(st) + '</span>';
      }).join('');
      return '' +
        '<section id="' + t.id + '">' +
        '  <div class="section-header"><h2>' + esc(t.title) + '</h2><button class="collapse-btn">▲</button></div>' +
        '  <div class="section-body">' +
        '    <h3>Planned coverage</h3>' +
        '    <div class="topic-chips">' + chips + '</div>' +
        '    <div class="placeholder-panel"><strong>Content coming soon.</strong> This section will get full reference material — explanations, tables, examples, and exam-style pointers — in the same style as the Latin knowledge bank.</div>' +
        '  </div>' +
        '</section>';
    }).join('');

    var layout = document.createElement('div');
    layout.className = 'layout';
    layout.innerHTML = '<aside class="sidebar">' + sidebarLinks + '</aside><main>' + home + jumps + sections + '</main>';

    var footer = document.createElement('footer');
    footer.setAttribute('style', 'background:var(--accent-dark); color:rgba(255,255,255,0.55); text-align:center; padding:1rem; font-size:0.78rem; font-family:sans-serif;');
    footer.textContent = s.code + ' — Knowledge Bank · (I)GCSE Study Hub';

    body.appendChild(header);
    body.appendChild(layout);
    body.appendChild(footer);
  }

  /* ── HUB PAGE RENDER ──────────────────────────────────────────── */
  function renderHubPage() {
    var header = document.createElement('header');
    header.innerHTML = headerHtml('(I)GCSE Study Hub', 'Knowledge banks for every subject — one place, one format', null, {
      searchPlaceholder: 'Filter subjects…'
    });

    var completeCount = window.SUBJECTS.filter(function (s) { return s.status === 'complete'; }).length;

    var cards = window.SUBJECTS.map(function (s) {
      var badge = s.status === 'complete'
        ? '<span class="status-badge complete">✓ Complete</span>'
        : '<span class="status-badge planned">Coming soon</span>';
      return '' +
        '<a class="subject-card" href="' + s.file + '" style="--card-accent:' + s.accent + '" data-name="' + esc((s.name + ' ' + s.code).toLowerCase()) + '">' +
        '  <div class="sc-top"><span class="sc-icon">' + s.icon + '</span><span class="sc-name">' + esc(s.name) + '</span>' + badge + '</div>' +
        '  <div class="sc-code">' + esc(s.code) + '</div>' +
        '  <div class="sc-tagline">' + esc(s.tagline) + '</div>' +
        '  <div class="sc-meta"><span>' + s.topics.length + ' topics</span><span>Open →</span></div>' +
        '</a>';
    }).join('');

    var main = '' +
      '<main>' +
      '  <div class="home-hero">' +
      '    <h2>(I)GCSE Study Hub</h2>' +
      '    <p class="home-tagline">Complete revision references, one subject at a time</p>' +
      '    <p>A growing set of knowledge banks for (I)GCSE subjects, all sharing the same format: searchable reference material, colour-coded tables, glossaries, and exam-focused summaries. Latin is complete; the rest have their structure in place and content on the way.</p>' +
      '    <div class="home-stats">' +
      '      <div class="home-stat"><span class="num">' + window.SUBJECTS.length + '</span><span class="lbl">subjects</span></div>' +
      '      <div class="home-stat"><span class="num">' + completeCount + '</span><span class="lbl">complete</span></div>' +
      '      <div class="home-stat"><span class="num">' + (window.SUBJECTS.length - completeCount) + '</span><span class="lbl">in progress</span></div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="subject-grid" id="subject-grid">' + cards + '</div>' +
      '  <p id="no-subject-match" style="display:none;color:var(--muted);font-style:italic;margin-top:1rem">No subjects match.</p>' +
      '</main>';

    var layout = document.createElement('div');
    layout.className = 'layout';
    layout.innerHTML = main;

    var footer = document.createElement('footer');
    footer.setAttribute('style', 'background:var(--accent-dark); color:rgba(255,255,255,0.55); text-align:center; padding:1rem; font-size:0.78rem; font-family:sans-serif;');
    footer.textContent = '(I)GCSE Study Hub';

    body.appendChild(header);
    body.appendChild(layout);
    body.appendChild(footer);
  }

  if (subject) renderSubjectPage(subject);
  else if (isHub) renderHubPage();

  /* ── SHARED CHROME BEHAVIOUR ──────────────────────────────────── */

  /* Subject switcher */
  var switcher = document.getElementById('subject-switch');
  if (switcher) {
    switcher.addEventListener('change', function () {
      if (this.value) window.location.href = this.value;
    });
  }

  /* Header height sync (sticky sidebar offset) */
  function syncHeaderHeight() {
    var h = document.querySelector('header');
    if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);

  /* Settings panel open/close */
  var settingsBtn = document.getElementById('settingsBtn');
  var settingsPanel = document.getElementById('settings-panel');
  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      settingsPanel.hidden = !settingsPanel.hidden;
      settingsBtn.classList.toggle('active', !settingsPanel.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!settingsPanel.hidden && !settingsPanel.contains(e.target) && e.target !== settingsBtn) {
        settingsPanel.hidden = true;
        settingsBtn.classList.remove('active');
      }
    });
  }

  /* Dark mode */
  var darkBtn = document.getElementById('darkModeBtn');
  function syncDarkLabel() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (darkBtn) darkBtn.textContent = isDark ? '☀ Light' : '☾ Dark';
  }
  syncDarkLabel();
  if (darkBtn) {
    darkBtn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'dark');
      store.set('theme', isDark ? 'light' : 'dark');
      syncDarkLabel();
    });
  }

  /* Font size */
  var fontSlider = document.getElementById('font-size-slider');
  var fontVal = document.getElementById('font-size-val');
  var fontReset = document.getElementById('font-size-reset');
  function applyFont(px, save) {
    document.documentElement.style.fontSize = px + 'px';
    if (fontSlider) fontSlider.value = px;
    if (fontVal) fontVal.textContent = px + 'px';
    if (save) store.set('font-size', px);
  }
  if (savedFont) applyFont(savedFont, false);
  if (fontSlider) fontSlider.addEventListener('input', function () { applyFont(this.value, true); });
  if (fontReset) {
    fontReset.addEventListener('click', function () {
      document.documentElement.style.fontSize = '';
      if (fontSlider) fontSlider.value = 15;
      if (fontVal) fontVal.textContent = '15px';
      store.remove('font-size');
    });
  }

  /* Volume (UI click sounds) */
  var volSlider = document.getElementById('vol-slider');
  var volVal = document.getElementById('vol-val');
  var volIcon = document.getElementById('vol-icon');
  var volume = parseInt(store.get('vol', 'latin-vol') || '50', 10);
  function syncVolUi() {
    if (volSlider) volSlider.value = volume;
    if (volVal) volVal.textContent = volume + '%';
    if (volIcon) volIcon.textContent = (volume === 0 ? '🔇' : volume < 50 ? '🔈' : '🔉') + ' Volume';
  }
  syncVolUi();
  if (volSlider) {
    volSlider.addEventListener('input', function () {
      volume = parseInt(this.value, 10);
      store.set('vol', volume);
      syncVolUi();
    });
  }
  var audioCtx = null;
  function clickSound() {
    if (volume === 0) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = 620;
      g.gain.setValueAtTime(0.08 * volume / 100, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + 0.1);
    } catch (e) { /* audio unavailable */ }
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-toggle, .collapse-btn, .subject-card, .home-quick-links a, aside.sidebar a')) clickSound();
  });

  /* Collapsible sections */
  document.querySelectorAll('.collapse-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var bodyEl = btn.closest('section').querySelector('.section-body');
      if (!bodyEl) return;
      var collapsed = bodyEl.classList.toggle('collapsed');
      btn.textContent = collapsed ? '▼' : '▲';
    });
  });
  var collapseAllBtn = document.getElementById('collapseAllBtn');
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', function () {
      var bodies = document.querySelectorAll('.section-body');
      var anyOpen = Array.prototype.some.call(bodies, function (b) { return !b.classList.contains('collapsed'); });
      bodies.forEach(function (b) {
        b.classList.toggle('collapsed', anyOpen);
        var btn = b.closest('section').querySelector('.collapse-btn');
        if (btn) btn.textContent = anyOpen ? '▼' : '▲';
      });
      collapseAllBtn.textContent = anyOpen ? '↕ Expand All' : '↕ Collapse All';
    });
  }

  /* Sidebar / quick-link section ping */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        target.classList.remove('section-ping');
        void target.offsetWidth;
        target.classList.add('section-ping');
      }
    });
  });

  /* ── Global search: hub filters cards; subject pages highlight ── */
  var gs = document.getElementById('global-search');
  var gsCount = document.getElementById('global-search-count');
  var gsClear = document.getElementById('global-search-clear');

  function clearHighlights() {
    document.querySelectorAll('mark.global-hl').forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function highlightIn(root, query) {
    var count = 0;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentNode;
        if (p.closest('script, style, mark')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.toLowerCase().indexOf(query) !== -1
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var text = node.nodeValue, lower = text.toLowerCase();
      var frag = document.createDocumentFragment(), last = 0, idx;
      while ((idx = lower.indexOf(query, last)) !== -1) {
        frag.appendChild(document.createTextNode(text.slice(last, idx)));
        var mark = document.createElement('mark');
        mark.className = 'global-hl';
        mark.textContent = text.slice(idx, idx + query.length);
        frag.appendChild(mark);
        last = idx + query.length;
        count++;
      }
      frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
    return count;
  }

  function runSearch() {
    var q = gs.value.trim().toLowerCase();
    if (gsClear) gsClear.style.display = q ? '' : 'none';

    if (isHub) {
      var cards = document.querySelectorAll('.subject-card');
      var visible = 0;
      cards.forEach(function (c) {
        var match = !q || c.getAttribute('data-name').indexOf(q) !== -1;
        c.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      var noMatch = document.getElementById('no-subject-match');
      if (noMatch) noMatch.style.display = visible ? 'none' : '';
      if (gsCount) gsCount.textContent = q ? visible + ' subject' + (visible === 1 ? '' : 's') : '';
      return;
    }

    clearHighlights();
    if (!q || q.length < 2) { if (gsCount) gsCount.textContent = ''; return; }
    var main = document.querySelector('main');
    var count = main ? highlightIn(main, q) : 0;
    if (gsCount) gsCount.textContent = count ? count + ' match' + (count === 1 ? '' : 'es') : 'no matches';
    if (count) {
      gs.classList.remove('search-ping'); void gs.offsetWidth; gs.classList.add('search-ping');
      var first = document.querySelector('mark.global-hl');
      if (first) {
        var section = first.closest('section');
        if (section) {
          var bodyEl = section.querySelector('.section-body');
          if (bodyEl) {
            bodyEl.classList.remove('collapsed');
            var btn = section.querySelector('.collapse-btn');
            if (btn) btn.textContent = '▲';
          }
        }
        first.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }

  if (gs) {
    var debounce;
    gs.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(runSearch, 160);
    });
    if (gsClear) {
      gsClear.addEventListener('click', function () {
        gs.value = '';
        runSearch();
        gs.focus();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault();
        gs.focus();
      }
      if (e.key === 'Escape' && document.activeElement === gs) {
        gs.value = '';
        runSearch();
        gs.blur();
      }
    });
  }
})();
