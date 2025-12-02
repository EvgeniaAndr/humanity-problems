// problems.js - версия с выпадающим меню фильтра

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница проблем загружается...');
    
    // Элементы страницы
    const navItems = document.querySelectorAll('.compact-nav-item');
    const scrollDot = document.querySelector('.scroll-dot');
    const sections = document.querySelectorAll('.page-section');
    const filterToggle = document.getElementById('filter-toggle');
    const filterMenu = document.getElementById('filter-menu');
    const filterOptions = document.querySelectorAll('.filter-option');
    const problemCards = document.querySelectorAll('.detailed-card');
    
    // Текущий активный фильтр
    let currentFilter = 'all';
    
    // Инициализация
    initPage();
    
    function initPage() {
        console.log('Инициализация страницы проблем...');
        
        // 1. Настройка навигации
        setupNavigation();
        
        // 2. Настройка индикатора прокрутки
        if (scrollDot) {
            setupScrollIndicator();
        }
        
        // 3. Настройка выпадающего меню фильтра
        setupFilterDropdown();
        
        // 4. Отслеживание активного раздела
        setupSectionObserver();
        
        // 5. Анимация элементов при загрузке
        initAnimations();
        
        // 6. Добавляем параллакс для фона
        initParallax();
        
        // 7. Добавляем анимацию статистических чисел
        animateStats();
        
        // 8. Гарантируем, что прокрутка работает
        ensureScrollWorks();
        
        console.log('Страница инициализирована.');
    }
    
    function setupNavigation() {
        console.log('Настройка навигации...');
        
        navItems.forEach(item => {
            if (item.id !== 'filter-toggle') {
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
                        
                        // Закрываем меню фильтра, если оно открыто
                        closeFilterMenu();
                        
                        // Обновляем активный пункт навигации
                        updateActiveNav(targetId);
                    }
                });
            }
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
    
    function setupFilterDropdown() {
        console.log('Настройка выпадающего меню фильтра...');
        
        // Открытие/закрытие меню по клику на кнопку фильтра
        if (filterToggle && filterMenu) {
            filterToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFilterMenu();
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', function(e) {
                if (!filterMenu.contains(e.target) && e.target !== filterToggle) {
                    closeFilterMenu();
                }
            });
            
            // Закрытие меню при нажатии Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeFilterMenu();
                }
            });
            
            // Обработка выбора опций фильтра
            filterOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const filterType = this.getAttribute('data-filter');
                    selectFilterOption(filterType);
                });
            });
        }
    }
    
    function toggleFilterMenu() {
        filterMenu.classList.toggle('active');
        filterToggle.classList.toggle('active');
        
        // Анимация для кнопки фильтра
        if (filterMenu.classList.contains('active')) {
            filterToggle.style.transform = 'scale(1.15)';
            filterToggle.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
            filterToggle.style.color = '#000';
        } else {
            filterToggle.style.transform = 'scale(1)';
            filterToggle.style.background = 'linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(79, 172, 254, 0.05))';
            filterToggle.style.color = '#a0d2ff';
        }
    }
    
    function closeFilterMenu() {
        filterMenu.classList.remove('active');
        filterToggle.classList.remove('active');
        filterToggle.style.transform = 'scale(1)';
        filterToggle.style.background = 'linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(79, 172, 254, 0.05))';
        filterToggle.style.color = '#a0d2ff';
    }
    
    function selectFilterOption(filterType) {
        console.log('Выбран фильтр:', filterType);
        currentFilter = filterType;
        
        // Обновляем активную опцию в меню
        filterOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-filter') === filterType) {
                option.classList.add('active');
            }
        });
        
        // Фильтруем проблемы
        filterProblems(filterType);
        
        // Закрываем меню после выбора (на мобильных)
        if (window.innerWidth <= 768) {
            closeFilterMenu();
        }
    }
    
    function filterProblems(filterType) {
        console.log('Фильтрация проблем по типу:', filterType);
        
        let visibleCount = 0;
        
        problemCards.forEach(card => {
            const severity = card.getAttribute('data-severity');
            
            // Показываем/скрываем карточки в зависимости от фильтра
            if (filterType === 'all' || filterType === severity) {
                card.style.display = 'block';
                visibleCount++;
                
                // Анимация появления
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                // Анимация исчезновения
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Показываем сообщение, если нет результатов
        setTimeout(() => showNoResultsMessage(visibleCount), 400);
    }
    
    function showNoResultsMessage(visibleCount) {
        // Удаляем старое сообщение, если есть
        const oldMessage = document.querySelector('.no-results-message');
        if (oldMessage) oldMessage.remove();
        
        if (visibleCount === 0) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>Проблемы не найдены</h3>
                <p>Попробуйте выбрать другой фильтр серьезности</p>
            `;
            
            // Вставляем сообщение после заголовка категории
            const categoryTitle = document.querySelector('.category-title');
            if (categoryTitle) {
                categoryTitle.parentNode.insertBefore(message, categoryTitle.nextSibling);
            }
        }
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
            if (item.id !== 'filter-toggle') {
                item.classList.remove('active');
                if (item.getAttribute('href') === targetId) {
                    item.classList.add('active');
                }
            }
        });
    }
    
    function animateSectionElements(section) {
        // Анимация карточек
        const cards = section.querySelectorAll('.detailed-card');
        cards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        // Анимация заголовка категории
        const categoryTitle = section.querySelector('.category-title');
        if (categoryTitle && !categoryTitle.classList.contains('animated')) {
            categoryTitle.style.opacity = '0';
            categoryTitle.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                categoryTitle.style.transition = 'all 0.5s ease';
                categoryTitle.style.opacity = '1';
                categoryTitle.style.transform = 'translateX(0)';
                categoryTitle.classList.add('animated');
            }, 300);
        }
    }
    
    function animateStats() {
        // Анимация статистических чисел
        const statValues = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValue = entry.target;
                    const originalText = statValue.textContent;
                    
                    // Для числовых значений делаем анимацию счетчика
                    if (originalText.match(/[\d.%]+/)) {
                        animateCounter(statValue, originalText);
                    }
                    
                    observer.unobserve(statValue);
                }
            });
        }, { threshold: 0.5 });
        
        statValues.forEach(value => observer.observe(value));
    }
    
    function animateCounter(element, targetValue) {
        const isPercent = targetValue.includes('%');
        const isNumber = targetValue.match(/[\d.]+/);
        
        if (!isNumber) return;
        
        const targetNumber = parseFloat(isNumber[0]);
        const duration = 1500; // 1.5 секунды
        const steps = 60;
        const stepValue = targetNumber / steps;
        let current = 0;
        let step = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            step++;
            
            if (step >= steps) {
                current = targetNumber;
                clearInterval(timer);
            }
            
            // Форматируем число
            let displayValue;
            if (targetNumber < 10) {
                displayValue = current.toFixed(1);
            } else {
                displayValue = Math.round(current);
            }
            
            if (isPercent) {
                element.textContent = `${displayValue}%`;
            } else if (targetValue.includes('млн') || targetValue.includes('млрд')) {
                element.textContent = `${displayValue} ${targetValue.replace(/[\d.]+/, '').trim()}`;
            } else {
                element.textContent = displayValue;
            }
        }, duration / steps);
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
        const problemIcons = document.querySelectorAll('.problem-icon');
        problemIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(15deg) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0) scale(1)';
            });
        });
        
        // Анимация тегов при наведении
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Анимация списка проблем
        const listItems = document.querySelectorAll('.problem-list li');
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.paddingLeft = '40px';
                this.style.paddingRight = '10px';
                this.style.marginLeft = '-10px';
                this.style.marginRight = '-10px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.paddingLeft = '35px';
                this.style.paddingRight = '0';
                this.style.marginLeft = '0';
                this.style.marginRight = '0';
            });
        });
    }
    
    function initParallax() {
        const background = document.querySelector('.content-background');
        
        if (background) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.05; // Медленный параллакс
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
    
    console.log('Скрипт problems.js успешно загружен');
});