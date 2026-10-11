// The menu is transparent over the hero and turns solid once the page scrolls.
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    siteHeader.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

// Notes index: the notes desk keeps notes/posts.json up to date.
const notesList = document.querySelector('[data-notes]');

if (notesList) {
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const message = (text) => notesList.replaceChildren(el('p', 'empty', text));

  fetch('notes/posts.json', { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then(({ posts }) => {
      if (!posts.length) {
        message('Nothing published yet. The first posts are being written.');
        return;
      }
      const items = posts.map((post) => {
        const item = el('a', 'card note-item');
        item.href = `notes/${post.slug}.html`;
        const date = new Date(`${post.date}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        const meta = el('div', 'meta');
        meta.append(
          el('span', 'tag', post.category),
          el('span', post.access === 'paid' ? 'tag amber' : 'tag plain', post.access === 'paid' ? 'Free preview' : 'Free'),
          el('span', '', date)
        );
        const body = el('div');
        body.append(el('h3', '', post.title), el('p', '', post.summary));
        item.append(meta, body, el('span', 'more', 'Read'));
        return item;
      });
      notesList.replaceChildren(...items);
    })
    .catch(() => message('The posts could not be loaded. Please try again in a moment.'));
}

// Reveal sections as they scroll into view
const revealTargets = document.querySelectorAll(
  '.section-head, .card, .skill-list > div, .case, .service, .facts, .steps, .split > div > p, .split > div > .checks, .faq details, .cta-band'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  revealTargets.forEach((target) => {
    // Items that sit side by side come in one after another.
    const siblings = [...target.parentElement.children].filter((el) => el.matches('.card, .faq details, .skill-list > div'));
    const index = siblings.indexOf(target);
    if (index > 0) target.style.setProperty('--delay', `${Math.min(index, 5) * 0.07}s`);
    target.classList.add('reveal');
    observer.observe(target);
  });
}

// Portrait: until assets/saurav.jpg exists, show the initials instead of a broken image.
const portrait = document.querySelector('[data-portrait]');

if (portrait) {
  const drop = () => portrait.remove();
  if (portrait.complete && portrait.naturalWidth === 0) drop();
  else portrait.addEventListener('error', drop);
}

// Projects and common questions: only one stays open at a time in each list.
['details.case', '.faq details'].forEach((selector) => {
  const items = document.querySelectorAll(selector);

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
});

// Footer year: always the current year, so it never needs editing.
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Theme switch: light or dark, remembered on this device.
const themeToggle = document.querySelector('[data-theme-toggle]');

if (themeToggle) {
  const root = document.documentElement;
  const label = () =>
    themeToggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    try {
      localStorage.setItem('theme', next);
    } catch (error) {
      // The choice still applies to this page; it just is not remembered.
    }
    label();
  });
  label();
}
