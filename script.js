document.addEventListener('DOMContentLoaded',function(){
  // set copyright year
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click',()=>{
      const shown = nav.style.display === 'flex';
      nav.style.display = shown ? 'none' : 'flex';
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

  /* Carousel behavior */
  const track = document.querySelector('.carousel__track');
  if(track){
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--next');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nav = document.querySelector('.carousel__nav');
    const indicators = nav ? Array.from(nav.children) : [];

    const trackContainer = document.querySelector('.carousel__track-container');

    const getSlideGap = () => parseFloat(getComputedStyle(track).gap || 0);

    const moveToSlide = (current, target) => {
      // center the target slide in the track container
      const containerWidth = trackContainer.getBoundingClientRect().width;
      const targetRect = target.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      // distance from track left to target left
      const targetOffsetLeft = target.offsetLeft;
      const offset = targetOffsetLeft - (containerWidth - targetRect.width) / 2;
      track.style.transform = 'translateX(-' + offset + 'px)';
      current.classList.remove('current-slide');
      target.classList.add('current-slide');
    }

    const updateIndicators = (currentIndex) => {
      indicators.forEach((btn,i)=>{
        btn.classList.toggle('active', i===currentIndex);
      })
    }

    // init: mark first slide current and center it
    slides[0].classList.add('current-slide');
    // ensure track starts centered on first slide
    (function centerInit(){
      const containerWidth = trackContainer.getBoundingClientRect().width;
      const firstRect = slides[0].getBoundingClientRect();
      const offset = slides[0].offsetLeft - (containerWidth - firstRect.width) / 2;
      track.style.transform = 'translateX(-' + offset + 'px)';
    })();
    if(indicators[0]) indicators[0].classList.add('active');

    let currentIndex = 0;

    nextButton && nextButton.addEventListener('click', ()=>{
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling || slides[0];
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(currentSlide, nextSlide);
      updateIndicators(currentIndex);
    });

    prevButton && prevButton.addEventListener('click', ()=>{
      const currentSlide = track.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling || slides[slides.length-1];
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveToSlide(currentSlide, prevSlide);
      updateIndicators(currentIndex);
    });

    // indicators
    indicators.forEach((button, index) => {
      button.addEventListener('click', ()=>{
        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[index];
        currentIndex = index;
        moveToSlide(currentSlide, targetSlide);
        updateIndicators(currentIndex);
      })
    });

    // keyboard controls
    document.addEventListener('keydown',(e)=>{
      if(e.key === 'ArrowRight') nextButton && nextButton.click();
      if(e.key === 'ArrowLeft') prevButton && prevButton.click();
    });
  }

  
});
