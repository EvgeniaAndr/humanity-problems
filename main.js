// main.js - оригинальная версия для главной страницы

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация элементов
    const nextFactButton = document.getElementById('next-fact');
    const factText = document.getElementById('fact-text');
    const navButtons = document.querySelectorAll('.nav-btn');
    const spaceSound = document.getElementById('space-sound');
    const clickSound = document.getElementById('click-sound');
    
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
    
    // Текущий индекс факта
    let currentFactIndex = 0;
    
    // Воспроизведение звука клика
    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
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
    
    // Обработчики событий
    nextFactButton.addEventListener('click', function() {
        playClickSound();
        updateFact();
    });
    
    // Обработчики для навигационных кнопок
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            playClickSound();
            
            // В реальном приложении здесь будет переход на соответствующие страницы
            const buttonId = this.id;
            
            // Для кнопки "О проекте" показываем алерт
            if (buttonId === 'about-btn') {
                e.preventDefault();
                alert('Раздел "О проекте" находится в разработке.');
            }
            // Остальные кнопки ведут на соответствующие страницы через href
        });
    });
    
    // Инициализация фоновой музыки (автовоспроизведение с взаимодействием пользователя)
    document.addEventListener('click', function initAudio() {
        if (spaceSound.paused) {
            spaceSound.volume = 0.3;
            spaceSound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
        }
        document.removeEventListener('click', initAudio);
    });
    
    // Анимация появления элементов
    function initAnimations() {
        // Анимация заголовка
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const navButtons = document.querySelectorAll('.nav-btn');
        const factCard = document.querySelector('.fact-card');
        
        // Начальные стили для анимации
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
        factCard.style.opacity = '0';
        factCard.style.transform = 'translateX(100px)';
        
        // Анимация появления
        setTimeout(() => {
            title.style.transition = 'opacity 1s ease, transform 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                subtitle.style.transition = 'opacity 1s ease, transform 1s ease';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
                
                // Анимация кнопок по очереди
                navButtons.forEach((btn, index) => {
                    btn.style.opacity = '0';
                    btn.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
                
                // Анимация фактов
                setTimeout(() => {
                    factCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    factCard.style.opacity = '1';
                    factCard.style.transform = 'translateX(0)';
                }, 800);
            }, 300);
        }, 500);
    }
    
    // Инициализация при загрузке
    updateFact();
    initAnimations();
    
    // Добавление эффекта параллакса для фона
    document.addEventListener('mousemove', function(e) {
        const spaceBg = document.getElementById('space-bg');
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        spaceBg.style.backgroundPosition = `${x}% ${y}%`;
    });
    
    // Автоматическая смена фактов каждые 10 секунд
    setInterval(updateFact, 10000);
    
    console.log('Главная страница "Глобальные проблемы человечества" загружена');
});