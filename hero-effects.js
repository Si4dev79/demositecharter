// Hero Effects for Fishing Charter Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hero effects script loaded');

    // Add water texture to hero sections
    const heroSections = document.querySelectorAll('.contact-hero, .fishing-hero');

    heroSections.forEach(section => {
        // Create water texture overlay
        if (!section.querySelector('.water-texture-overlay')) {
            const waterTexture = document.createElement('div');
            waterTexture.classList.add('water-texture-overlay');
            Object.assign(waterTexture.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'url("images/water-texture.png") repeat',
                opacity: '0.1',
                zIndex: '1',
                animation: 'waterMove 10s linear infinite',
                backgroundColor: 'rgba(0, 206, 209, 0.1)' // Add turquoise tint
            });
            section.appendChild(waterTexture);
        }

        // Make sure bubbles are present
        const existingBubbles = section.querySelectorAll('.bubble');
        if (existingBubbles.length === 0) {
            // Create bubbles
            for (let i = 1; i <= 10; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble', `bubble-${i}`);
                section.appendChild(bubble);
            }
        }

        // Make sure water ripple is present
        if (!section.querySelector('.water-ripple')) {
            const waterRipple = document.createElement('div');
            waterRipple.classList.add('water-ripple');
            section.appendChild(waterRipple);
        }

        // Add floating effect to text elements
        const headings = section.querySelectorAll('h1, h2');
        headings.forEach(heading => {
            if (!heading.classList.contains('floating-text')) {
                heading.classList.add('floating-text');
            }
        });

        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            if (!paragraph.classList.contains('floating-text')) {
                paragraph.classList.add('floating-text');
            }
        });
    });

    // Add keyframe animations if they don't exist
    if (!document.getElementById('hero-effect-keyframes')) {
        const style = document.createElement('style');
        style.id = 'hero-effect-keyframes';
        style.textContent = `
            @keyframes waterMove {
                0% {
                    background-position: 0 0;
                }
                100% {
                    background-position: 100px 100px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('Hero effects initialized');
});
