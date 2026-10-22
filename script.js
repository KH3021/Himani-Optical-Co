// ================= MENUBAR TOGGLE (TABLET & MOBILE) =================
const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('.navbar ul');

if (menuToggle && navList) {
    const toggleMenu = () => {
        const isOpen = navList.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    const closeMenu = () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', e => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking any nav link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', e => {
        if (!e.target.closest('.navbar')) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on resize if screen becomes desktop width (> 1024px)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navList.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ================= 3D CARD TILT (DESKTOP / POINTER ONLY) =================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * 12;
            const rotateY = ((x / rect.width) - 0.5) * -12;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform =
                'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}