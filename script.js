document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sideDrawer = document.getElementById('sideDrawer');
const menuBackdrop = document.getElementById('menuBackdrop');
const menuButtons = Array.from(document.querySelectorAll('.drawer-btn[data-view-target]'));
const views = Array.from(document.querySelectorAll('.view'));

function openMenu(){
  sideDrawer.classList.add('open');
  menuBackdrop.classList.add('show');
  menuToggle.setAttribute('aria-expanded', 'true');
  sideDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  sideDrawer.classList.remove('open');
  menuBackdrop.classList.remove('show');
  menuToggle.setAttribute('aria-expanded', 'false');
  sideDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setActiveView(viewName, updateHash = true){
  views.forEach(v => {
    const active = v.dataset.view === viewName;
    v.classList.toggle('is-active', active);
    v.setAttribute('aria-hidden', active ? 'false' : 'true');
  });

  menuButtons.forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.viewTarget === viewName);
  });

  if(updateHash){
    history.replaceState(null, '', `#${viewName}`);
  }
}

function initFromHash(){
  const hash = window.location.hash.replace('#', '').trim();
  const valid = ['home', 'news', 'extra'];
  const target = valid.includes(hash) ? hash : 'home';
  setActiveView(target, false);
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuBackdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.viewTarget;
    setActiveView(target, true);
    closeMenu();
  });
});

window.addEventListener('hashchange', initFromHash);
initFromHash();
