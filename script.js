/* ========================================
   ДЕЛЬ ТУР — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. Анимация появления элементов при скролле (Intersection Observer)
    // ========================================
    const animateElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    let animDelay = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Задержка для каскадного эффекта
                const el = entry.target;
                const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-animate'));
                const index = siblings.indexOf(el);
                const delay = index * 120; // 120ms между карточками

                setTimeout(() => {
                    el.classList.add('animate-in');
                }, delay);

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));


    // ========================================
    // 2. Маска ввода телефона
    // ========================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 0 && val[0] === '8') val = '7' + val.slice(1);
            if (val.length > 0 && val[0] !== '7') val = '7' + val;

            let formatted = '';
            if (val.length > 0) formatted += '+7';
            if (val.length > 1) formatted += ' (' + val.slice(1, 4);
            if (val.length > 4) formatted += ') ' + val.slice(4, 7);
            if (val.length > 7) formatted += '-' + val.slice(7, 9);
            if (val.length > 9) formatted += '-' + val.slice(9, 11);

            e.target.value = formatted;
        });
    }


    // ========================================
    // 3. Обработка формы (клиентская валидация + сообщение)
    // ========================================
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('#name').value.trim();
            const phone = form.querySelector('#phone').value.trim();

            if (!name || !phone) {
                shakeBtn();
                return;
            }

            // Визуальная обратная связь
            submitBtn.innerHTML = '<span class="material-icons" style="animation: spin 1s linear infinite">autorenew</span> Отправка...';
            submitBtn.disabled = true;

            // Имитация отправки (замените на реальный fetch / webhook)
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="material-icons">check_circle</span> Заявка отправлена!';
                submitBtn.style.background = '#10b981';
                submitBtn.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';

                // Сброс формы через 3 сек
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<span class="material-icons">send</span> Отправить заявку';
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    function shakeBtn() {
        submitBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => submitBtn.style.animation = '', 500);
    }


    // ========================================
    // 4. Плавный скролл для якорных ссылок
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

// CSS-анимация для кнопки: shake + spin (добавляются через JS)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);
