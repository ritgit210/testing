
window.addEventListener('load', () => {
    cube.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    cube.classList.remove('unfolded');
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hide scroll indicator after first scroll
const scrollContainer = document.querySelector('.scroll-container');
const scrollIndicator = document.querySelector('.scroll-indicator');

scrollContainer.addEventListener('scroll', () => {
    if (scrollContainer.scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// Experience Section Cube Animation
const cube = document.getElementById('cube');
const experienceSection = document.querySelector('.experience-section');
const cubeScrollIndicator = document.getElementById('scrollIndicator');

scrollContainer.addEventListener('scroll', () => {
    const sectionTop = experienceSection.offsetTop - scrollContainer.offsetTop;
    const sectionHeight = experienceSection.offsetHeight;
    const scrollPosition = scrollContainer.scrollTop;

    // Calculate scroll progress within the experience section
    let scrollProgress = (scrollPosition - sectionTop) / (sectionHeight);
    if (scrollPosition < sectionTop) scrollProgress = 0;
    if (scrollPosition > sectionTop + sectionHeight) scrollProgress = 1;

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Phase 1: Rotate cube (0–75% of scroll)

    if (clampedProgress < 0.75) {
        const rotationProgress = clampedProgress / 0.75;

        // correct order: 1 → 2 → 3 → 4
        const rotationY = -rotationProgress * 270;

        const rotationX = Math.sin(rotationProgress * Math.PI) * 15;

        cube.classList.remove('unfolded');

        const sectionHeader = document.querySelector('.experience-section .section-header');
        if (sectionHeader) sectionHeader.classList.remove('title-up');

        cube.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(1)`;

        if (cubeScrollIndicator) cubeScrollIndicator.classList.remove('hidden');
    }

    // Phase 2: Unfold cube flat (75–100% of scroll)
    else {
        const unfoldProgress = (clampedProgress - 0.75) / 0.25;

        // Reset cube orientation and scale down
        const scaleValue = 1 - (0.5 * unfoldProgress);

        // Remove 3D rotation, keep cube flat
        cube.style.transform = `rotateY(0deg) rotateX(0deg) scale(${scaleValue})`;

        // Add unfolded class
        cube.classList.add('unfolded');

        // Move title up when unfolded
        const sectionHeader = document.querySelector('.experience-section .section-header');
        if (sectionHeader) {
            sectionHeader.classList.add('title-up');
        }

        // Hide scroll indicator when unfolded
        if (cubeScrollIndicator) {
            if (unfoldProgress > 0.2) {
                cubeScrollIndicator.classList.add('hidden');
            } else {
                cubeScrollIndicator.classList.remove('hidden');
            }
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.querySelectorAll('.card, .project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});