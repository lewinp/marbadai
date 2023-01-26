const ground = document.querySelectorAll('.ground');
const miku = document.querySelectorAll('.miku');
const play = document.querySelector('.play');
const myScore = document.querySelector('.myScore');
const timeofgame = document.querySelector('.gametime');
const finalScore = document.querySelector('.final-score');
const notifOver = document.querySelector('.notif-over');
const closeNotif = document.querySelector('.close');

let lastGround;
let gameover;
let skor;


// atur waktu game nya disini 20000 = 20 detik
const playingtime = 20000;

closeNotif.addEventListener('click', function() {
    notifOver.style.display = 'none';
    myScore.textContent = 0;
    timeofgame.textContent = playingtime / 1000;
});

let gametime = playingtime;

timeofgame.textContent = gametime / 1000;

// mengatur Waktu game akan berlangsung
function setGameTIme(gametime) {
    timeofgame.textContent = gametime / 1000;
    const timergame = setInterval(() => {
        if (gametime > 0) {
            gametime -= 1000;
            timeofgame.textContent = gametime / 1000;
        } else {
            clearInterval(timergame);
        }
    }, 1000);
}

// meRandom miku akan muncul
function randomGround(ground) {
    const index = Math.floor(Math.random() * ground.length);
    const random = ground[index];
    if (random == lastGround) {
        randomGround(ground);
    }
    lastGround = random;
    return random;
}

// Mengatur Deficulty Game
function setTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Miku mulai ngeselin
function playMiku(ground) {
    const random = randomGround(ground);

    // atur Deficulty nya disini
    const timeset = setTime(400, 800);

    random.classList.add('up');
    setTimeout(function() {
        random.classList.remove('up')
        if (!gameover) {
            playMiku(ground)
        }
    }, timeset)
}


// Ketika tombol Play Game di tekan
function playGame(ground) {
    play.style.display = 'none';
    notifOver.style.display = 'none';
    skor = 0;
    gameover = false;
    myScore.textContent = 0;
    timeofgame.textContent = playingtime;
    setGameTIme(gametime);
    playMiku(ground);
    const timer = setInterval(() => {
        play.style.display = 'block';
        gameover = true;
        finalScore.textContent = skor;
        notifOver.style.display = 'flex';
        console.log('selesai')
        clearInterval(timer);
    }, playingtime);
}

// Ketika Miku di Hit aa
miku.forEach(m => {
    m.addEventListener('click', function hitMiku() {
        skor++;
        myScore.textContent = skor;

        this.style.transform = 'scale(0.85)';
        this.style.backgroundImage = 'url(img/miku_hit.png)';
        this.parentNode.classList.add('down');
        setTimeout(() => {
            this.style.filter = 'hue-rotate(0deg)';
            this.style.transform = 'scale(1)';
            this.style.backgroundImage = 'url(img/miku_up.png)';
            setTimeout(() => {
                this.parentNode.classList.remove('down');
            }, 500);

        }, 500);
    });
});