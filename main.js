// main.js - оптимизированная версия для главной страницы

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, мобильное ли устройство
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Инициализация элементов
    const nextFactButton = document.getElementById('next-fact');
    const factText = document.getElementById('fact-text');
    const navButtons = document.querySelectorAll('.nav-btn');
    const spaceSound = document.getElementById('space-sound');
    const clickSound = document.getElementById('click-sound');
    const mobileNavToggle = document.createElement('button');
    
    // Создаем кнопку мобильного меню, если нужно
    if (isMobile && window.innerWidth <= 480) {
        createMobileMenuToggle(mobileNavToggle);
    }
    
    // Факты о Земле и глобальных проблемах
    const earthFacts = [
        "Каждую минуту исчезает 20 гектаров леса",
        "Ежегодно в океан попадает 8 миллионов тонн пластика",
        "К 2050 году более 200 миллионов человек могут стать климатическими беженцами",
        "Более 1 миллиарда людей не имеют доступа к чистой питьевой воде",
        "Потеря биоразнообразия угрожает стабильности экосистем",
        "Глобальная температура повысилась на 1.1°C с доиндустриальной эпохи",
        "Около 9 миллионов человек ежегодно умирают из-за загрязнения окружающей среды",
        "К 2030 году дефицит воды может затронуть 40% населения мира"
    ];
    
    let currentFactIndex = 0;
    
    // Воспроизведение звука клика с проверкой поддержки
    function playClickSound() {
        if (clickSound && typeof clickSound.play === 'function') {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => {
                // Игнорируем ошибки автовоспроизведения
            });
        }
    }
    
    // Обновление факта
    function updateFact() {
        factText.textContent = earthFacts[currentFactIndex];
        currentFactIndex = (currentFactIndex + 1) % earthFacts.length;
        
        // Анимация обновления факта
        const factCard = document.querySelector('.fact-card');
        factCard.style.animation = 'none';
        setTimeout(() => {
            factCard.style.animation = 'slideIn 0.5s ease-out';
        }, 10);
    }
    
    // Обработчики событий для навигационных кнопок
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            playClickSound();
            
            // Для кнопки "О проекте" показываем модальное окно
            if (this.id === 'about-btn') {
                e.preventDefault();
                showAboutModal();
            }
        });
        
        // Добавляем обработчик touch для мобильных
        button.addEventListener('touchstart', function() {
            this.classList.add('active');
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('active');
        }, { passive: true });
    });
    
    // Кнопка следующего факта
    if (nextFactButton) {
        nextFactButton.addEventListener('click', function() {
            playClickSound();
            updateFact();
        });
        
        // Touch поддержка для кнопки факта
        nextFactButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            playClickSound();
            updateFact();
        }, { passive: false });
    }
    
    // Функция для создания мобильного меню
    function createMobileMenuToggle(toggleButton) {
        toggleButton.className = 'mobile-nav-toggle';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        toggleButton.setAttribute('aria-label', 'Открыть меню');
        
        const navButtonsContainer = document.querySelector('.nav-buttons');
        if (navButtonsContainer) {
            document.body.appendChild(toggleButton);
            
            toggleButton.addEventListener('click', function() {
                navButtonsContainer.classList.toggle('active');
                const isOpen = navButtonsContainer.classList.contains('active');
                this.innerHTML = isOpen ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
                this.setAttribute('aria-label', 
                    isOpen ? 'Закрыть меню' : 'Открыть меню');
                playClickSound();
            });
            
            // Закрываем меню при клике вне его
            document.addEventListener('click', function(e) {
                if (!navButtonsContainer.contains(e.target) && 
                    e.target !== toggleButton &&
                    navButtonsContainer.classList.contains('active')) {
                    navButtonsContainer.classList.remove('active');
                    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    toggleButton.setAttribute('aria-label', 'Открыть меню');
                }
            });
        }
    }
    
    // Модальное окно "О проекте"
    function showAboutModal() {
        // Создаем стили для модального окна
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    backdrop-filter: blur(10px);
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                    padding: 20px;
                }
                
                .modal-container {
                    background: linear-gradient(135deg, rgba(16, 18, 54, 0.95), rgba(8, 10, 36, 0.98));
                    border-radius: 25px;
                    padding: 40px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    border: 2px solid rgba(79, 172, 254, 0.4);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                                0 0 0 1px rgba(79, 172, 254, 0.1) inset;
                    position: relative;
                    transform: translateY(30px);
                    animation: slideUp 0.4s ease forwards 0.1s;
                    scrollbar-width: thin;
                    scrollbar-color: #4facfe rgba(16, 18, 54, 0.5);
                }
                
                .modal-container::-webkit-scrollbar {
                    width: 8px;
                }
                
                .modal-container::-webkit-scrollbar-track {
                    background: rgba(16, 18, 54, 0.5);
                    border-radius: 4px;
                }
                
                .modal-container::-webkit-scrollbar-thumb {
                    background: #4facfe;
                    border-radius: 4px;
                }
                
                .close-modal {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(79, 172, 254, 0.1);
                    border: 1px solid rgba(79, 172, 254, 0.3);
                    color: #4facfe;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 20px;
                    transition: all 0.3s ease;
                    z-index: 10001;
                }
                
                .close-modal:hover {
                    background: rgba(79, 172, 254, 0.3);
                    transform: rotate(90deg);
                }
                
                .modal-header {
                    text-align: center;
                    margin-bottom: 30px;
                    position: relative;
                    padding-bottom: 20px;
                }
                
                .modal-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #4facfe, transparent);
                }
                
                .modal-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 2.2rem;
                    background: linear-gradient(90deg, #4facfe, #00f2fe);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                .modal-subtitle {
                    color: #a0d2ff;
                    font-size: 1.2rem;
                    opacity: 0.9;
                    text-align: center;
                }
                
                .modal-content {
                    color: #b0d5ff;
                    line-height: 1.7;
                    font-size: 1.1rem;
                }
                
                .modal-section {
                    margin-bottom: 25px;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 20px;
                    border-radius: 15px;
                    border-left: 4px solid #4facfe;
                }
                
                .modal-section h3 {
                    color: #4facfe;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.3rem;
                }
                
                .modal-section h3 i {
                    font-size: 1.2rem;
                }
                
                .modal-section p {
                    margin-bottom: 10px;
                }
                
                .modal-section ul {
                    padding-left: 20px;
                    margin: 10px 0;
                }
                
                .modal-section li {
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 10px;
                }
                
                .modal-section li::before {
                    content: '•';
                    color: #4facfe;
                    position: absolute;
                    left: 0;
                }
                
                .modal-footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(79, 172, 254, 0.2);
                    color: #a0d2ff;
                    font-size: 0.9rem;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .modal-container {
                        padding: 30px 25px;
                        max-height: 85vh;
                    }
                    
                    .modal-title {
                        font-size: 1.8rem;
                    }
                    
                    .modal-subtitle {
                        font-size: 1rem;
                    }
                    
                    .modal-content {
                        font-size: 1rem;
                    }
                    
                    .modal-section {
                        padding: 15px;
                    }
                    
                    .close-modal {
                        top: 15px;
                        right: 15px;
                        width: 35px;
                        height: 35px;
                        font-size: 18px;
                    }
                }
                
                @media (max-width: 480px) {
                    .modal-overlay {
                        padding: 15px;
                    }
                    
                    .modal-container {
                        padding: 25px 20px;
                        max-height: 90vh;
                    }
                    
                    .modal-title {
                        font-size: 1.6rem;
                    }
                    
                    .modal-subtitle {
                        font-size: 0.9rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Создаем модальное окно
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        // ВСТАВЬТЕ ВАШ ТЕКСТ ЗДЕСЬ ▼
        modalOverlay.innerHTML = `
            <div class="modal-container">
                <span class="close-modal">&times;</span>
                
                <div class="modal-header">
                    <h2 class="modal-title">О ПРОЕКТЕ</h2>
                    <p class="modal-subtitle">Глобальные проблемы человечества</p>
                </div>
                
                <div class="modal-content">
                    <div class="modal-section">
                        <h3><i class="fas fa-globe-americas"></i> Цель проекта</h3>
                        <p>Этот интерактивный веб-проект создан для наглядной демонстрации и изучения наиболее актуальных глобальных проблем, стоящих перед человечеством в XXI веке.</p>
                    </div>                    
                    <div class="modal-section">
                        <h3><i class="fas fa-code"></i> Технологии</h3>
                        <p>Проект реализован с использованием современных веб-технологий:</p>
                        <ul>
                            <li>Three.js для 3D-визуализации Земли</li>
                            <li>Адаптивный HTML5/CSS3 дизайн</li>
                            <li>Интерактивные элементы на JavaScript</li>
                            <li>Анимации и эффекты параллакса</li>
                        </ul>
                    </div>
                    
                   <div class="modal-section">
    <h3><i class="fas fa-users"></i> Команда разработчиков</h3>
    <p>Проект разработан командой разработчиков в рамках учебного проекта:</p>
    
    <div class="team-members">
        <div class="team-member">
            <div class="member-icon">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="member-info">
                <h4>Андреева Евгения</h4>
                <p class="member-role">Project Developer</p>
            </div>
        </div>
        
        <div class="team-member">
            <div class="member-icon">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="member-info">
                <h4>Воробьева Камилла</h4>
                <p class="member-role">Project Developer</p>
            </div>
        </div>
    </div>
    
    <div class="team-note">
        <p><i class="fas fa-handshake"></i> Проект реализован для учебного заведения Средняя школа №8</p>
    </div>
</div>
                    
                    <div class="modal-footer">
                        <p>Проект создан для образовательных целей | Все данные актуальны на 2024 год</p>
                        <p><i class="fas fa-sync-alt"></i> Материалы регулярно обновляются</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        // Блокируем прокрутку фона
        document.body.style.overflow = 'hidden';
        
        // Закрытие модального окна
        function closeModal() {
            modalOverlay.style.animation = 'fadeIn 0.3s ease reverse forwards';
            modalOverlay.querySelector('.modal-container').style.animation = 'slideUp 0.4s ease reverse forwards';
            
            setTimeout(() => {
                if (modalOverlay.parentNode) {
                    document.body.removeChild(modalOverlay);
                }
                document.body.style.overflow = '';
                playClickSound();
            }, 300);
        }
        
        // Обработчики закрытия
        modalOverlay.querySelector('.close-modal').addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Закрытие по клавише Esc
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        // Автофокус на кнопке закрытия для доступности
        setTimeout(() => {
            modalOverlay.querySelector('.close-modal').focus();
        }, 100);
    }
    
    // Инициализация фоновой музыки
    function initAudio() {
        if (spaceSound && typeof spaceSound.play === 'function') {
            // На мобильных уменьшаем громкость
            spaceSound.volume = isMobile ? 0.2 : 0.3;
            
            // Пытаемся запустить музыку при первом взаимодействии
            const playAudio = () => {
                spaceSound.play().catch(e => {
                    console.log("Автовоспроизведение звука заблокировано");
                });
                document.removeEventListener('click', playAudio);
                document.removeEventListener('touchstart', playAudio);
            };
            
            document.addEventListener('click', playAudio);
            document.addEventListener('touchstart', playAudio, { passive: true });
        }
    }
    
    // Анимация появления элементов
    function initAnimations() {
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const factCard = document.querySelector('.fact-card');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(20px)';
        }
        
        if (factCard) {
            factCard.style.opacity = '0';
            factCard.style.transform = 'translateY(20px)';
        }
        
        // Анимация появления
        setTimeout(() => {
            if (title) {
                title.style.transition = 'opacity 1s ease, transform 1s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
            
            setTimeout(() => {
                if (subtitle) {
                    subtitle.style.transition = 'opacity 1s ease, transform 1s ease';
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }
                
                setTimeout(() => {
                    if (factCard) {
                        factCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        factCard.style.opacity = '1';
                        factCard.style.transform = 'translateY(0)';
                    }
                }, 500);
            }, 300);
        }, 300);
    }
    
    // Улучшенный параллакс эффект
    function initParallax() {
        if (!isMobile) { // Только на десктопе
            document.addEventListener('mousemove', function(e) {
                const spaceBg = document.getElementById('space-bg');
                if (spaceBg) {
                    const x = (e.clientX / window.innerWidth) * 20;
                    const y = (e.clientY / window.innerHeight) * 20;
                    
                    spaceBg.style.backgroundPosition = `${x}% ${y}%`;
                }
            });
        }
    }
    
    // Инициализация при загрузке
    updateFact();
    initAnimations();
    initParallax();
    initAudio();
    
    // Автоматическая смена фактов
    setInterval(updateFact, 15000);
    
    // Обработчик изменения ориентации экрана
    window.addEventListener('orientationchange', function() {
        setTimeout(updateFact, 300);
    });
    
    console.log('Главная страница "Глобальные проблемы человечества" загружена');
    console.log('Мобильное устройство:', isMobile);
});
