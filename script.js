document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll reveal animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
    
    // Stagger delay for grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${(index % 3) * 0.15}s`;
    });

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Trigger animations for elements already in view on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 2. Lightbox Pop-up Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    // Open lightbox when clicking on a grid item
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgElement = item.querySelector('img');
            if (imgElement) {
                lightboxImg.src = imgElement.src;
                lightbox.classList.add('show');
                document.body.classList.add('lightbox-open'); // Prevent background scrolling
            }
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => {
            lightboxImg.src = ''; // Clear source after animation
        }, 300);
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
});
