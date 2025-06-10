document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicators = carousel.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    
    // Create indicators
    for (let i = 0; i < itemCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }
    
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        const allIndicators = indicators.querySelectorAll('.carousel-indicator');
        allIndicators.forEach((ind, i) => {
            if (i === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function goToNext() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    function goToPrev() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);
    
    // Auto slide
    let interval = setInterval(goToNext, 5000);
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(goToNext, 5000);
    });
    
    // Mobile touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            goToNext();
        } else if (touchEndX - touchStartX > 50) {
            goToPrev();
        }
    }
});