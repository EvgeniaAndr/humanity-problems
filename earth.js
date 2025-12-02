// earth.js - оригинальная версия 3D Земли для главной страницы

let scene, camera, renderer, earth, controls, stars;

// Инициализация сцены
function initEarth() {
    // Создание сцены
    scene = new THREE.Scene();
    
    // Создание камеры
    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;
    
    // Создание рендерера
    const canvas = document.getElementById('earth-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Добавление орбитального управления
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    
    // Добавление освещения
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Создание звездного неба
    createStars();
    
    // Создание Земли
    createEarth();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', onWindowResize);
    
    // Запуск анимации
    animate();
}

// Создание звездного неба
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount * 3; i += 3) {
        // Позиции звезд в сферическом пространстве
        const radius = 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        
        sizes[i / 3] = Math.random() * 2;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        sizeAttenuation: true
    });
    
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Создание 3D Земли
function createEarth() {
    // Создание сферы (Земли)
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Создание материала с текстурой Земли
    const textureLoader = new THREE.TextureLoader();
    
    // Используем альтернативные текстуры, которые точно загружаются
    const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', 
        () => console.log('Текстура Земли загружена'),
        undefined,
        (err) => {
            console.error('Ошибка загрузки текстуры:', err);
            // Создаем простую текстуру в случае ошибки
            createSimpleEarth();
        }
    );
    
    const earthBump = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg',
        () => console.log('Bump карта загружена'),
        undefined,
        (err) => console.warn('Bump карта не загрузилась:', err)
    );
    
    const earthSpec = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg',
        () => console.log('Specular карта загружена'),
        undefined,
        (err) => console.warn('Specular карта не загрузилась:', err)
    );
    
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: earthBump,
        bumpScale: 0.05,
        specularMap: earthSpec,
        specular: new THREE.Color(0x333333),
        shininess: 5
    });
    
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // Добавление атмосферы
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4facfe,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Добавление облаков
    const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png',
        () => console.log('Текстура облаков загружена'),
        undefined,
        (err) => console.warn('Текстура облаков не загрузилась:', err)
    );
    
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.4
    });
    
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    
    // Анимация вращения облаков
    function animateClouds() {
        clouds.rotation.y += 0.0005;
        requestAnimationFrame(animateClouds);
    }
    animateClouds();
}

// Создание простой Земли (запасной вариант)
function createSimpleEarth() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Создаем простую текстуру
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Океаны
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0d47a1');
    gradient.addColorStop(1, '#1976d2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Континенты
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.ellipse(400, 280, 80, 120, 0, 0, Math.PI * 2); // Африка
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(600, 200, 160, 120, 0, 0, Math.PI * 2); // Евразия
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(200, 160, 100, 80, 0, 0, Math.PI * 2); // Северная Америка
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(300, 360, 60, 100, 0, 0, Math.PI * 2); // Южная Америка
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(800, 380, 60, 50, 0, 0, Math.PI * 2); // Австралия
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        specular: new THREE.Color(0x333333),
        shininess: 5
    });
    
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
}

// Обработка изменения размера окна
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Анимация
function animate() {
    requestAnimationFrame(animate);
    
    // Вращение Земли
    earth.rotation.y += 0.001;
    
    // Вращение звезд (медленное)
    stars.rotation.y += 0.0001;
    
    // Обновление элементов управления
    controls.update();
    
    // Рендеринг сцены
    renderer.render(scene, camera);
}

// Инициализация при загрузке страницы
window.addEventListener('load', initEarth);