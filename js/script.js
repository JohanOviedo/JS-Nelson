let playerScore = 0;
let machineScore = 0;
let playerWins = 0;
let currentUser = '';

// Show Register Form
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// Show Login Form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// Login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedPassword = localStorage.getItem(username);

    if (!storedPassword) {
        document.getElementById('login-error').innerText = 'Usuario no registrado.';
        return;
    }

    if (password === storedPassword) {
        currentUser = username;
        localStorage.setItem('user', username);
        document.getElementById('username-display').innerText = currentUser;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('game-screen').classList.add('active');
    } else {
        document.getElementById('login-error').innerText = 'Contraseña incorrecta.';
    }
}

// Register
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    if (password !== passwordConfirm) {
        document.getElementById('register-error').innerText = 'Las contraseñas no coinciden.';
        return;
    }

    if (localStorage.getItem(username)) {
        document.getElementById('register-error').innerText = 'Este usuario ya está registrado.';
        return;
    }

    localStorage.setItem(username, password);
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Function to play a round
function playRound(playerChoice) {
    const choices = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
    const machineChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, machineChoice);

    document.getElementById('player-img').src = `img/${playerChoice}.jpg`;
    document.getElementById('machine-img').src = `img/${machineChoice}.jpg`;

    document.getElementById('player-img').classList.add('animate');
    document.getElementById('machine-img').classList.add('animate');

    setTimeout(() => {
        document.getElementById('player-img').classList.remove('animate');
        document.getElementById('machine-img').classList.remove('animate');
    }, 500);

    updateScores(result);
    displayResult(result);

    if (playerWins >= 5) {
        setTimeout(() => {
            alert(`${currentUser} ha ganado 5 veces! El juego ha terminado.`);
            endGame();
        }, 1000);
    }
}

// Determine winner of the round
function determineWinner(playerChoice, machineChoice) {
    if (playerChoice === machineChoice) return 'empate';
    if (
        (playerChoice === 'piedra' && (machineChoice === 'tijera' || machineChoice === 'lagarto')) ||
        (playerChoice === 'papel' && (machineChoice === 'piedra' || machineChoice === 'spock')) ||
        (playerChoice === 'tijera' && (machineChoice === 'papel' || machineChoice === 'lagarto')) ||
        (playerChoice === 'lagarto' && (machineChoice === 'spock' || machineChoice === 'papel')) ||
        (playerChoice === 'spock' && (machineChoice === 'tijera' || machineChoice === 'piedra'))
    ) {
        return 'gana';
    }
    return 'pierde';
}

// Update scores
function updateScores(result) {
    if (result === 'gana') {
        playerScore++;
        playerWins++;
    } else if (result === 'pierde') {
        machineScore++;
    }
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('machine-score').innerText = machineScore;
}

// Display result of round
function displayResult(result) {
    const resultText = document.getElementById('result');
    if (result === 'empate') {
        resultText.innerHTML = '<h3>¡Empate!</h3>';
    } else if (result === 'gana') {
        resultText.innerHTML = '<h3>¡Ganaste!</h3>';
    } else {
        resultText.innerHTML = '<h3>¡Perdiste!</h3>';
    }
}

// Reset game
function resetGame() {
    playerScore = 0;
    machineScore = 0;
    playerWins = 0;
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('machine-score').innerText = machineScore;
    document.getElementById('result').innerHTML = '';
    document.getElementById('player-img').src = "";
    document.getElementById('machine-img').src = "";
}

// End game
function endGame() {
    alert("El juego ha finalizado. ¡Gracias por jugar!");
    resetGame();
}
