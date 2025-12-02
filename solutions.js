// solutions.js - интерактивность для страницы решений

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница решений загружается...');
    
    // Элементы страницы
    const navItems = document.querySelectorAll('.compact-nav-item');
    const scrollDot = document.querySelector('.scroll-dot');
    const sections = document.querySelectorAll('.page-section');
    const solutionCards = document.querySelectorAll('.solution-card');
    const categoryCards = document.querySelectorAll('.category-card');
    const moreButtons = document.querySelectorAll('.more-btn');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Инициализация
    initPage();
    
    function initPage() {
        console.log('Инициализация страницы решений...');
        
        // 1. Настройка навигации
        setupNavigation();
        
        // 2. Настройка индикатора прокрутки
        if (scrollDot) {
            setupScrollIndicator();
        }
        
        // 3. Отслеживание активного раздела
        setupSectionObserver();
        
        // 4. Анимация элементов при загрузке
        initAnimations();
        
        // 5. Добавляем параллакс для фона
        initParallax();
        
        // 6. Анимация прогресс-баров
        animateProgressBars();
        
        // 7. Настройка интерактивных элементов
        setupInteractiveElements();
        
        // 8. Гарантируем, что прокрутка работает
        ensureScrollWorks();
        
        console.log('Страница решений инициализирована.');
    }
    
    function setupNavigation() {
        console.log('Настройка навигации...');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    console.log('Прокрутка к секции:', targetId);
                    
                    // Плавная прокрутка к секции
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем активный пункт навигации
                    updateActiveNav(targetId);
                }
            });
        });
    }
    
    function setupScrollIndicator() {
        console.log('Настройка индикатора прокрутки...');
        
        const scrollLine = document.querySelector('.scroll-line');
        const lineHeight = scrollLine.offsetHeight;
        const dotHeight = scrollDot.offsetHeight;
        
        function updateScrollIndicator() {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (scrollHeight > 0) {
                const scrollPercentage = scrollTop / scrollHeight;
                const dotPosition = scrollPercentage * (lineHeight - dotHeight);
                scrollDot.style.top = `${dotPosition}px`;
                
                // Анимация пульсации в крайних положениях
                if (scrollPercentage < 0.1 || scrollPercentage > 0.9) {
                    scrollDot.style.animation = 'pulse 1s infinite';
                } else {
                    scrollDot.style.animation = 'none';
                }
            }
        }
        
        // Обновляем при прокрутке
        window.addEventListener('scroll', updateScrollIndicator);
        
        // Инициализируем начальное положение
        setTimeout(updateScrollIndicator, 100);
    }
    
    function setupSectionObserver() {
        console.log('Настройка отслеживания секций...');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = `#${entry.target.id}`;
                    updateActiveNav(sectionId);
                    
                    // Анимация элементов секции
                    if (!entry.target.classList.contains('animated')) {
                        animateSectionElements(entry.target);
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    function updateActiveNav(targetId) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === targetId) {
                item.classList.add('active');
            }
        });
    }
    
    function animateSectionElements(section) {
        // Анимация категорийных карточек
        const categoryCards = section.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Анимация карточек решений
        const solutionCards = section.querySelectorAll('.solution-card');
        solutionCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    function animateProgressBars() {
        // Анимация прогресс-баров при появлении в поле зрения
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width || '0%';
                    const targetWidth = parseInt(width);
                    
                    // Сбрасываем ширину для анимации
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                        progressBar.style.width = width;
                    }, 300);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    function initAnimations() {
        console.log('Инициализация анимаций...');
        
        // Анимация при загрузке первой секции
        const firstSection = document.querySelector('.page-section');
        if (firstSection) {
            animateSectionElements(firstSection);
            firstSection.classList.add('animated');
        }
        
        // Анимация иконок при наведении
        const solutionIcons = document.querySelectorAll('.solution-icon');
        solutionIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(15deg) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0) scale(1)';
            });
        });
        
        // Анимация категорийных иконок
        const categoryIcons = document.querySelectorAll('.category-icon');
        categoryIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(15deg) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0) scale(1)';
            });
        });
        
        // Анимация примеров реализации
        const exampleItems = document.querySelectorAll('.example-item');
        exampleItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.borderColor = '#4facfe';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'rgba(79, 172, 254, 0.2)';
            });
        });
    }
    
    function setupInteractiveElements() {
        console.log('Настройка интерактивных элементов...');
        
        // Обработка кликов на карточки категорий
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const sectionId = this.closest('.page-section').id;
                const targetElement = document.querySelector(`[data-category="${sectionId}"]`);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Обработка кнопок "Узнать больше"
        moreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.solution-card');
                const title = card.querySelector('h3').textContent;
                
                // В реальном приложении здесь будет переход на детальную страницу
                // Сейчас просто покажем уведомление
                showNotification(`Подробная информация о "${title}" будет доступна в ближайшее время`);
            });
        });
        
        // Анимация тегов при наведении
        const solutionTags = document.querySelectorAll('.solution-tag');
        solutionTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    function showNotification(message) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'solution-notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, rgba(16, 18, 54, 0.98), rgba(25, 28, 70, 0.98));
            color: #fff;
            padding: 20px 25px;
            border-radius: 15px;
            border: 2px solid rgba(46, 213, 115, 0.4);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 400px;
        `;
        
        // Стили для иконки
        notification.querySelector('i').style.cssText = `
            font-size: 1.5rem;
            color: #2ed573;
            flex-shrink: 0;
        `;
        
        // Стили для текста
        notification.querySelector('span').style.cssText = `
            flex: 1;
            font-size: 1rem;
            line-height: 1.4;
        `;
        
        // Стили для кнопки закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: transparent;
            border: none;
            color: #a0d2ff;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.color = '#fff';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.color = '#a0d2ff';
        });
        
        closeBtn.addEventListener('click', function() {
            hideNotification(notification);
        });
        
        // Добавляем уведомление на страницу
        document.body.appendChild(notification);
        
        // Показываем с анимацией
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }
    
    function initParallax() {
        const background = document.querySelector('.content-background');
        
        if (background) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.05;
                background.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    function ensureScrollWorks() {
        console.log('Проверка возможности прокрутки...');
        
        // Убедимся, что body и html имеют правильные стили
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';
        
        // Удаляем любые обработчики, которые могут блокировать прокрутку
        document.removeEventListener('wheel', preventDefault);
        window.removeEventListener('wheel', preventDefault);
        document.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        
        function preventDefault(e) {
            e.preventDefault();
        }
        
        // Добавляем пассивные обработчики
        document.addEventListener('wheel', () => {}, { passive: true });
        window.addEventListener('wheel', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
        window.addEventListener('touchmove', () => {}, { passive: true });
    }
    
    console.log('Скрипт solutions.js успешно загружен');
});