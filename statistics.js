// statistics.js - исправленная версия без 3D карты

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница статистики загружается...');
    
    // Элементы страницы
    const navItems = document.querySelectorAll('.compact-nav-item');
    const sections = document.querySelectorAll('.page-section');
    
    // Инициализация
    initPage();
    
    function initPage() {
        console.log('Инициализация страницы статистики...');
        
        try {
            // 1. Настройка навигации
            setupNavigation();
            
            // 2. Отслеживание активного раздела
            setupSectionObserver();
            
            // 3. Анимация элементов при загрузке
            initAnimations();
            
            // 4. Настройка интерактивных элементов
            setupInteractiveElements();
            
            console.log('Страница статистики инициализирована.');
            
        } catch (error) {
            console.error('Ошибка при инициализации страницы:', error);
        }
    }
    
    function setupNavigation() {
        console.log('Настройка навигации...');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (!targetId) return;
                
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
    
    function setupSectionObserver() {
        console.log('Настройка отслеживания секций...');
        
        if (sections.length === 0) return;
        
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
            const href = item.getAttribute('href');
            if (href === targetId) {
                item.classList.add('active');
            }
        });
    }
    
    function animateSectionElements(section) {
        // Анимация статистических панелей
        const statPanels = section.querySelectorAll('.stat-panel');
        statPanels.forEach((panel, index) => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                panel.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Анимация карточек графиков
        const chartCards = section.querySelectorAll('.chart-card');
        chartCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Анимация элементов таймлайна
        const timelineItems = section.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
        
        // Анимация строк таблицы
        const tableRows = section.querySelectorAll('.data-table tbody tr');
        tableRows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.5s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    function initAnimations() {
        console.log('Инициализация анимаций...');
        
        // Анимация при загрузке первой секции
        const firstSection = document.querySelector('.page-section');
        if (firstSection) {
            animateSectionElements(firstSection);
            firstSection.classList.add('animated');
        }
        
        // Анимация статистических значений
        animateStatValues();
        
        // Анимация графиков
        setTimeout(() => {
            animateCharts();
        }, 1000);
        
        // Анимация иконок при наведении
        const chartIcons = document.querySelectorAll('.chart-icon');
        chartIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(15deg) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0) scale(1)';
            });
        });
        
        // Анимация статистических панелей при наведении
        const statPanels = document.querySelectorAll('.stat-panel');
        statPanels.forEach(panel => {
            panel.addEventListener('mouseenter', function() {
                const value = this.querySelector('.stat-panel-value');
                if (value) value.style.transform = 'scale(1.1)';
            });
            
            panel.addEventListener('mouseleave', function() {
                const value = this.querySelector('.stat-panel-value');
                if (value) value.style.transform = 'scale(1)';
            });
        });
    }
    
    function animateStatValues() {
        // Анимация счетчиков в статистических панелях
        const statValues = document.querySelectorAll('.stat-panel-value');
        
        statValues.forEach(value => {
            if (!value) return;
            
            const originalText = value.textContent;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(value, originalText);
                        observer.unobserve(value);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(value);
        });
    }
    
    function animateCounter(element, targetValue) {
        // Для числовых значений делаем анимацию счетчика
        const isNumber = targetValue.match(/[\d.]+/);
        
        if (!isNumber) return;
        
        const targetNumber = parseFloat(isNumber[0]);
        const unit = targetValue.replace(/[\d.]+/, '').trim();
        const duration = 1500;
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
            } else if (targetNumber < 1000) {
                displayValue = Math.round(current);
            } else {
                displayValue = Math.round(current).toLocaleString();
            }
            
            element.textContent = displayValue + ' ' + unit;
        }, duration / steps);
    }
    
    function animateCharts() {
        console.log('Инициализация анимации графиков...');
        
        try {
            // Анимация столбцов графиков
            const chartContainers = document.querySelectorAll('.chart-container');
            
            if (chartContainers.length === 0) {
                console.log('Графики не найдены');
                return;
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const container = entry.target;
                        const bars = container.querySelectorAll('.horizontal-bar, .vertical-bar, .temp-bar, .forest-bar');
                        
                        bars.forEach((bar, index) => {
                            // Сохраняем оригинальные размеры
                            const originalHeight = bar.style.height || getComputedStyle(bar).height;
                            const originalWidth = bar.style.width || getComputedStyle(bar).width;
                            
                            // Сбрасываем для анимации
                            if (bar.classList.contains('temp-bar') || bar.classList.contains('vertical-bar')) {
                                bar.style.height = '0%';
                            } else if (bar.classList.contains('forest-bar') || bar.classList.contains('horizontal-bar')) {
                                bar.style.width = '0%';
                            }
                            
                            // Запускаем анимацию
                            setTimeout(() => {
                                bar.style.transition = 'all 1s ease-in-out';
                                if (bar.classList.contains('temp-bar') || bar.classList.contains('vertical-bar')) {
                                    bar.style.height = originalHeight;
                                } else if (bar.classList.contains('forest-bar') || bar.classList.contains('horizontal-bar')) {
                                    bar.style.width = originalWidth;
                                }
                            }, index * 100);
                        });
                        
                        observer.unobserve(container);
                    }
                });
            }, { threshold: 0.3 });
            
            chartContainers.forEach(container => observer.observe(container));
            
        } catch (error) {
            console.error('Ошибка при анимации графиков:', error);
        }
    }
    
    function setupInteractiveElements() {
        console.log('Настройка интерактивных элементов...');
        
        // Обработка строк таблицы
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255, 107, 107, 0.15)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.background = '';
            });
        });
    }
    
    console.log('Скрипт statistics.js успешно загружен');
});