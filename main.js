// Handle light/dark mode toggle
document.querySelector('.light-toggle').addEventListener('click', function() {
    // Toggle classes
    document.querySelector('.hero').classList.toggle('lights-off');
    document.body.classList.toggle('lights-off');
    this.classList.toggle('active');
    
    const isLightMode = document.body.classList.contains('lights-off');
    
    // Update particles
    document.querySelectorAll('.particles-section, #particles-js').forEach(section => {
        const pJSInstance = pJSMask[section.id];
        if (pJSInstance) {
            // Update particle colors based on mode
            pJSInstance.particles.color.value = isLightMode ? "#2a2a8c" : "#64ffda";
            pJSInstance.particles.line_linked.color = isLightMode ? "#2a2a8c" : "#64ffda";
            pJSInstance.particles.opacity.value = isLightMode ? 0.05 : 0.1;
            pJSInstance.fn.particlesRefresh();
        }
    });

    // Update CSS variables
    document.documentElement.style.setProperty(
        '--text-color',
        isLightMode ? 'var(--text-light)' : 'var(--text-dark)'
    );
    
    document.documentElement.style.setProperty(
        '--glow-color',
        isLightMode ? 'rgba(42, 42, 140, 0.2)' : 'rgba(100, 255, 218, 0.2)'
    );
});

// Handle horizontal scroll with mouse wheel
document.querySelectorAll('.overflow-x-auto').forEach(container => {
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    });
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add touch scroll for mobile
let touchStart = null;
let touchEnd = null;

document.querySelectorAll('.overflow-x-auto').forEach(container => {
    container.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', (e) => {
        if (!touchStart) return;
        
        touchEnd = e.touches[0].clientX;
        const diff = touchStart - touchEnd;
        container.scrollLeft += diff;
        touchStart = touchEnd;
    });

    container.addEventListener('touchend', () => {
        touchStart = null;
        touchEnd = null;
    });
});

// Add smooth scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glow-effect').forEach(el => {
    el.classList.add('opacity-0', 'transform', 'translate-y-10', 'transition-all', 'duration-700');
    observer.observe(el);
});

// Enhanced horizontal scroll functionality
document.querySelectorAll('.scroll-container').forEach(container => {
    const cardContainer = container.querySelector('.card-container');
    const scrollLeftBtn = container.parentElement.querySelector('.scroll-left');
    const scrollRightBtn = container.parentElement.querySelector('.scroll-right');
    
    // Scroll amount for each click
    const scrollAmount = 300;

    // Scroll buttons
    scrollLeftBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Touch scroll
    let touchStart = null;
    let touchX = null;

    container.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
        touchX = touchStart;
    });

    container.addEventListener('touchmove', (e) => {
        if (!touchStart) return;

        e.preventDefault();
        touchX = e.touches[0].clientX;
        const diff = touchStart - touchX;
        container.scrollLeft += diff;
        touchStart = touchX;
    });

    container.addEventListener('touchend', () => {
        touchStart = null;
        touchX = null;
    });

    // Mouse wheel horizontal scroll
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    });

    // Show/hide scroll buttons based on scroll position
    const updateScrollButtons = () => {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        scrollLeftBtn.style.opacity = scrollLeft > 0 ? '1' : '0';
        scrollRightBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0';
    };

    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // Initial check
}); 