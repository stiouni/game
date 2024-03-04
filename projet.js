document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    //  variables
    let playerX = 50;
    let playerY = canvas.height / 2;
    let playerWidth = 50;
    let playerHeight = 50;
    let playerSpeed = 5;

    let objectX = canvas.width - 100;
    let objectY = canvas.height / 2;
    let objectWidth = 30;
    let objectHeight = 30;
    let objectSpeed = 2;

    let obstacleX = canvas.width - 200;
    let obstacleY = canvas.height / 2;
    let obstacleWidth = 20;
    let obstacleHeight = 40;
    let obstacleSpeed = 3;

    let score = 0;

    // dessin de jouer
    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }

    // Fonction de dessin de l'objet à collecter
    function drawObject() {
        ctx.fillStyle = 'green';
        ctx.fillRect(objectX, objectY, objectWidth, objectHeight);
    }

    // Fonction de dessin de l'obstacle
    function drawObstacle() {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    }

    // Fonction de collision entre le joueur et l'objet
    function checkCollision() {
        if (playerX < objectX + objectWidth && playerX + playerWidth > objectX &&
            playerY < objectY + objectHeight && playerY + playerHeight > objectY) {
            score++;
            resetObject();
        }
    }

    // Fonction de collision entre le joueur et l'obstacle
    function checkObstacleCollision() {
        if (playerX < obstacleX + obstacleWidth && playerX + playerWidth > obstacleX &&
            playerY < obstacleY + obstacleHeight && playerY + playerHeight > obstacleY) {
            alert('Game Over! Score: ' + score);
            resetGame();
        }
    }

    // Fonction de mise à jour du jeu
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawObject();
        drawObstacle();
        playerMovement();
        moveObject();
        moveObstacle();
        checkCollision();
        checkObstacleCollision();
        requestAnimationFrame(update);
    }

    // Fonction de mouvement du joueur
    function playerMovement() {
        if (playerX >= 0 && playerX <= canvas.width - playerWidth) {
            if (keys['ArrowRight']) {
                playerX += playerSpeed;
            }
            if (keys['ArrowLeft']) {
                playerX -= playerSpeed;
            }
            if (keys['ArrowDown']) {
                playerY += playerSpeed;
            }
            if (keys['ArrowUp']) {
                playerY -= playerSpeed;
            }
        }
    }

    // Fonction de mouvement de l'objet à collecter
    function moveObject() {
        objectX -= objectSpeed;
        if (objectX + objectWidth < 0) {
            resetObject();
        }
    }

    // Fonction de mouvement de l'obstacle
    function moveObstacle() {
        obstacleX -= obstacleSpeed;
        if (obstacleX + obstacleWidth < 0) {
            resetObstacle();
        }
    }

    // Fonction de réinitialisation de l'objet à collecter
    function resetObject() {
        objectX = canvas.width - 100;
        objectY = Math.floor(Math.random() * (canvas.height - objectHeight));
    }

    // Fonction de réinitialisation de l'obstacle
    function resetObstacle() {
        obstacleX = canvas.width - 200;
        obstacleY = Math.floor(Math.random() * (canvas.height - obstacleHeight));
    }

    // Fonction de réinitialisation du jeu
    function resetGame() {
        playerX = 50;
        playerY = canvas.height / 2;
        score = 0;
        resetObject();
        resetObstacle();
    }

    // Gestion des touches du clavier
    const keys = {};
    document.addEventListener('keydown', function(event) {
        keys[event.key] = true;
    });
    document.addEventListener('keyup', function(event) {
        keys[event.key] = false;
    });

    // Lancement du jeu
    update();
});