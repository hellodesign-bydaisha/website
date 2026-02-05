document.addEventListener('DOMContentLoaded',function(){
  // set copyright year
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // mobile nav toggle - improved for responsive design
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      nav.classList.toggle('mobile-open');
      btn.textContent = nav.classList.contains('mobile-open') ? '✕' : '☰';
      btn.setAttribute('aria-expanded', nav.classList.contains('mobile-open'));
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if(nav.classList.contains('mobile-open') && !nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('mobile-open');
        btn.textContent = '☰';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close mobile nav when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if(nav.classList.contains('mobile-open')) {
          nav.classList.remove('mobile-open');
          btn.textContent = '☰';
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target = a.getAttribute('href');
      if(target==='#' || target===null) return;
      const el = document.querySelector(target);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })
});
