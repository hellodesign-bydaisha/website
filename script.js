document.addEventListener('DOMContentLoaded',function(){
  // set copyright year
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

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
