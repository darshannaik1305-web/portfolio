// Utilities
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function saveLS(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
function readLS(key, fallback=null){ try{ const v = localStorage.getItem(key); return v? JSON.parse(v): fallback; }catch(e){ return fallback; } }

// Theme toggle
(function themeInit(){
  const saved = readLS('theme', 'light');
  document.documentElement.setAttribute('data-theme', saved);
  const btn = qs('#themeToggle');
  if(btn){
    btn.setAttribute('aria-pressed', saved === 'dark');
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      btn.setAttribute('aria-pressed', next === 'dark');
      saveLS('theme', next);
    });
  }
})();

// Enable submit only when valid
function updateSubmitState(form){
  const submit = qs('button[type="submit"]', form);
  if(!submit) return;
  submit.disabled = !form.checkValidity();
}

function attachValidation(form){
  if(!form) return;
  form.addEventListener('input', (e)=> updateSubmitState(form));
  form.addEventListener('change', ()=> updateSubmitState(form));
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      // show built-in validation UI
      qsa('input,select,textarea', form).forEach(el=> el.reportValidity());
      return;
    }
    const success = qs('.form-success', form);
    if(success){ success.textContent = 'Submitted successfully!'; }
    // Simulate async
    setTimeout(()=>{ success && (success.textContent = ''); form.reset(); updateSubmitState(form); }, 1500);
  });
  // inline error text
  qsa('input,select,textarea', form).forEach(el => {
    el.addEventListener('invalid', ()=>{
      const wrap = el.closest('.field') || el.parentElement;
      const err = wrap && qs('.error', wrap);
      if(err){ err.textContent = el.validationMessage; }
    });
    el.addEventListener('input', ()=>{
      const wrap = el.closest('.field') || el.parentElement;
      const err = wrap && qs('.error', wrap);
      if(err){ err.textContent = ''; }
    });
  });
  updateSubmitState(form);
}

// Password toggles (delegated)
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.toggle-password');
  if(!btn) return;
  const field = btn.parentElement.querySelector('input');
  if(!field) return;
  const isPw = field.type === 'password';
  field.type = isPw ? 'text' : 'password';
  btn.textContent = isPw ? 'Hide' : 'Show';
  btn.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
});

// Password strength
(function registrationStrength(){
  const pw = qs('#regPassword');
  const barWrap = pw && pw.closest('.password-field');
  const meter = barWrap && qs('.strength', barWrap);
  const text = barWrap && qs('.strength-text', barWrap);

  function evaluate(p){
    let level = 0;
    if(!p) return 0;
    if(p.length >= 8) level++;
    if(/[a-z]/.test(p) && /[A-Z]/.test(p)) level++;
    if(/\d/.test(p)) level++;
    if(/[^\w\s]/.test(p)) level++;
    return Math.min(level,4);
  }

  if(pw && meter){
    pw.addEventListener('input', ()=>{
      const lvl = evaluate(pw.value);
      meter.dataset.level = String(lvl);
      meter.setAttribute('data-level', String(lvl));
      const labels = ['NA','Weak','Fair','Good','Strong'];
      if(text){ text.textContent = `Strength: ${labels[lvl]}`; }
      // custom validity for minimum policy
      if(lvl < 2){ pw.setCustomValidity('Use at least 8 chars with mixed case and a number.'); }
      else { pw.setCustomValidity(''); }
      updateConfirmMatch();
      updateSubmitState(qs('#registrationForm'));
    });
  }

  const confirm = qs('#regConfirm');
  function updateConfirmMatch(){
    if(!pw || !confirm) return;
    if(confirm.value && confirm.value !== pw.value){
      confirm.setCustomValidity('Passwords do not match.');
    } else {
      confirm.setCustomValidity('');
    }
  }
  if(confirm){
    confirm.addEventListener('input', ()=>{ updateConfirmMatch(); updateSubmitState(qs('#registrationForm')); });
  }
})();

// Registration phone pattern inline hint
document.addEventListener('input', (e)=>{
  const el = e.target;
  if(!(el instanceof HTMLInputElement)) return;
  if(el.id === 'regPhone'){
    const v = el.value.replace(/[^0-9]/g,'');
    if(v !== el.value){ el.value = v; }
  }
});

// Login remember me
(function loginInit(){
  const form = qs('#loginForm');
  const email = qs('#loginEmail');
  const remember = qs('#rememberMe');
  const saved = readLS('remember_login', null);
  if(saved && email && remember){
    email.value = saved.email || '';
    remember.checked = true;
  }
  if(form){
    attachValidation(form);
    form.addEventListener('submit', ()=>{
      if(remember && remember.checked && email){
        saveLS('remember_login', { email: email.value });
      } else {
        saveLS('remember_login', null);
      }
    });
  }
})();

// Contact form counter
(function contactInit(){
  const form = qs('#contactForm');
  const ta = qs('#contactMessage');
  const counter = qs('#msgCount');
  if(ta && counter){
    const update = ()=>{ counter.textContent = `${ta.value.length}/300`; };
    ta.addEventListener('input', update);
    update();
  }
  attachValidation(form);
})();

// Survey rating
(function surveyInit(){
  const form = qs('#surveyForm');
  if(!form) return;
  const stars = qsa('.star', form);
  const hidden = qs('#surveyRating', form);
  function setRating(n){
    stars.forEach((s,i)=>{
      const active = i < n;
      s.classList.toggle('active', active);
      s.setAttribute('aria-pressed', String(active));
    });
    hidden.value = n || '';
    updateSubmitState(form);
  }
  stars.forEach((btn, i)=>{
    btn.addEventListener('click', ()=> setRating(i+1));
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setRating(i+1); }
    });
  });
  attachValidation(form);
})();

// Newsletter
(function newsInit(){
  const form = qs('#newsForm');
  attachValidation(form);
})();

// Booking + preview modal
(function bookingInit(){
  const form = qs('#bookingForm');
  attachValidation(form);

  const previewBtn = qs('#previewBooking');
  const modal = qs('#modal');
  const closeBtn = qs('#modalClose');
  const cancelBtn = qs('#modalCancel');
  const confirmBtn = qs('#modalConfirm');
  const body = qs('#modalBody');

  function openModal(){ modal.hidden = false; }
  function closeModal(){ modal.hidden = true; }

  function buildPreview(){
    const data = new FormData(form);
    const rows = [];
    for(const [k,v] of data.entries()){
      rows.push(`<div><strong>${k}:</strong> ${String(v)}</div>`);
    }
    return rows.join('');
  }

  if(previewBtn){
    previewBtn.addEventListener('click', ()=>{
      if(!form.checkValidity()){
        qsa('input,select,textarea', form).forEach(el=> el.reportValidity());
        return;
      }
      body.innerHTML = buildPreview();
      openModal();
    });
  }
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  if(confirmBtn){
    confirmBtn.addEventListener('click', ()=>{
      closeModal();
      const success = qs('.form-success', form);
      if(success){ success.textContent = 'Appointment booked!'; }
      setTimeout(()=>{ success && (success.textContent=''); form.reset(); updateSubmitState(form); }, 1500);
    });
  }
})();

// Attach validation to remaining forms
attachValidation(qs('#registrationForm'));
attachValidation(qs('#surveyForm'));
attachValidation(qs('#newsForm'));
attachValidation(qs('#bookingForm'));
attachValidation(qs('#loginForm'));

// Initial submit state sync on DOM ready
window.addEventListener('DOMContentLoaded', ()=>{
  qsa('form').forEach(updateSubmitState);
});

// Overlay menu (index page)
(function menuOverlayInit(){
  const openBtn = qs('#menuBtn');
  const overlay = qs('#menuOverlay');
  const closeBtn = qs('#menuClose');
  if(!overlay || !openBtn) return;
  const body = document.body;
  const header = qs('.site-header');
  function open(){
    overlay.hidden = false;
    body.classList.add('no-scroll');
    document.documentElement.classList.add('page-blur');
    // focus the first link for a11y
    const first = qs('.menu-link', overlay);
    first && first.focus();
  }
  function close(){
    overlay.hidden = true;
    body.classList.remove('no-scroll');
    document.documentElement.classList.remove('page-blur');
    openBtn.focus();
  }
  openBtn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e)=>{ if(!overlay.hidden && e.key === 'Escape') close(); });

  // Scroll to card when clicking menu link
  overlay.addEventListener('click', (e)=>{
    const link = e.target.closest('.menu-link[data-scroll]');
    if(!link) return;
    const id = link.getAttribute('data-scroll');
    const target = id && document.getElementById(id);
    if(!target) return;
    e.preventDefault();
    // Close overlay first
    close();
    // Compute offset for sticky header
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 12);
    window.scrollTo({ top: y, behavior: 'smooth' });
    // After scroll, move focus for a11y
    setTimeout(()=>{ target.focus({ preventScroll: true }); }, 400);
  });
})();
