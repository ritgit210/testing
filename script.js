// Hero description: slow one-time typewriter reveal on load
const descEl = document.querySelector('.intro-text p');

if (descEl) {
    const fullText = descEl.textContent;
    descEl.textContent = '';

    const typedSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typewriter-cursor';
    cursorSpan.textContent = '|';

    descEl.appendChild(typedSpan);
    descEl.appendChild(cursorSpan);

    let charIndex = 0;

    function tickDescTypewriter() {
        charIndex++;
        typedSpan.textContent = fullText.slice(0, charIndex);
        if (charIndex < fullText.length) {
            setTimeout(tickDescTypewriter, 30);
        } else {
            cursorSpan.remove();
        }
    }

    setTimeout(tickDescTypewriter, 400);
}

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
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

// Experience cards: hover to expand + reveal project workflow(s)
const experienceGrid = document.querySelector('.experience-grid');
const experienceTimeline = document.querySelector('.experience-timeline');

if (experienceGrid) {
    const expCards = Array.from(experienceGrid.querySelectorAll('.card'));

    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            expCards.forEach(c => {
                c.classList.toggle('is-active', c === card);
                c.classList.toggle('is-inactive', c !== card);
            });
            // Timeline markers line up with the default equal-width cards,
            // so dim it while a card is expanded and no longer aligned.
            if (experienceTimeline) experienceTimeline.classList.add('dimmed');
        });
    });

    experienceGrid.addEventListener('mouseleave', () => {
        expCards.forEach(c => c.classList.remove('is-active', 'is-inactive'));
        if (experienceTimeline) experienceTimeline.classList.remove('dimmed');
    });
}

// Project cards: same hover-to-expand + reveal workflow behavior as Experience,
// scoped independently per grid (AI Projects, Geo Projects).
document.querySelectorAll('.projects-grid').forEach(grid => {
    const projectCards = Array.from(grid.querySelectorAll('.project-card'));

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            projectCards.forEach(c => {
                c.classList.toggle('is-active', c === card);
                c.classList.toggle('is-inactive', c !== card);
            });
        });
    });

    grid.addEventListener('mouseleave', () => {
        projectCards.forEach(c => c.classList.remove('is-active', 'is-inactive'));
    });
});