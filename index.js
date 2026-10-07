/* Preset Uplifting / Loving Messages */
const messages = [
    "You bring color, warmth, and magic into every single day. Never forget how genuinely wonderful you are.",
    "In a world where you can be anything, thank you for being such a bright, beautiful soul.",
    "May your day be filled with sweet coffee, cozy moments, and endless reason to smile. ✨",
    "You are stronger than you realize, prettier than you think, and loved more than you know.",
    "Keep blooming at your own rhythm. The world is so much prettier with you in it. 🌸",
    "Sending you a giant hug wrapped in sunshine, pink petals, and good vibes!",
    "Your kindness is your superpower. Never let anyone dim your sparkle. 💖",
    "Just a gentle reminder: You are doing amazing, and you deserve all the happiness in the world."
];

let currentMsgIndex = 0;

/* DOM Elements */
const messageText = document.getElementById('messageText');
const customModal = document.getElementById('customModal');
const modalBox = document.getElementById('modalBox');
const customInput = document.getElementById('customInput');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

/* Switch Message with Fade Animation */
function nextMessage() {
    messageText.classList.add('opacity-0');
    setTimeout(() => {
        currentMsgIndex = (currentMsgIndex + 1) % messages.length;
        messageText.textContent = `"${messages[currentMsgIndex]}"`;
        messageText.classList.remove('opacity-0');
    }, 300);
}

/* Copy Current Message to Clipboard */
function copyMessage() {
    const textToCopy = messageText.textContent.replace(/^"|"$/g, '');
    
    // Clipboard fallback strategy for browser security contexts
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast("Note copied to clipboard! 💕");
    } catch (err) {
        showToast("Failed to copy note.");
    }
    document.body.removeChild(textarea);
}

/* Show Floating Toast Notification */
function showToast(text) {
    toastMsg.textContent = text;
    toast.classList.remove('opacity-0');
    setTimeout(() => {
        toast.classList.add('opacity-0');
    }, 2500);
}

/* Custom Message Modal Handler */
function toggleCustomModal() {
    const isHidden = customModal.classList.contains('opacity-0');
    if (isHidden) {
        customModal.classList.remove('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-95');
        modalBox.classList.add('scale-100');
        customInput.value = messageText.textContent.replace(/^"|"$/g, '');
        customInput.focus();
    } else {
        customModal.classList.add('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-100');
        modalBox.classList.add('scale-95');
    }
}

/* Save Custom Note */
function saveCustomMessage() {
    const val = customInput.value.trim();
    if (val) {
        messageText.classList.add('opacity-0');
        setTimeout(() => {
            messageText.textContent = `"${val}"`;
            messageText.classList.remove('opacity-0');
        }, 300);
        toggleCustomModal();
        showToast("Custom note applied! ✨");
    }
}

/* Web Audio API Sound Ambience / Effects */
let audioCtx = null;
let isSoundOn = false;
let chimeInterval = null;

function toggleAmbience() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    isSoundOn = !isSoundOn;
    const icon = document.getElementById('soundIcon');
    const label = document.getElementById('soundText');

    if (isSoundOn) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        icon.className = "fa-solid fa-volume-high";
        label.textContent = "Sound On";
        startAmbientChimes();
        playChimeNote(523.25); // C5 accent
        showToast("Soft chime ambience enabled ✨");
    } else {
        icon.className = "fa-solid fa-volume-xmark";
        label.textContent = "Sound Off";
        stopAmbientChimes();
    }
}

function playChimeNote(freq) {
    if (!audioCtx || !isSoundOn) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 2.6);
}

function startAmbientChimes() {
    const pentatonicScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    chimeInterval = setInterval(() => {
        if (Math.random() > 0.3) {
            const randomNote = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
            playChimeNote(randomNote);
        }
    }, 1800);
}

function stopAmbientChimes() {
    if (chimeInterval) clearInterval(chimeInterval);
}

/* Heart Burst Physics Effect on Click */
function burstHearts(e) {
    playChimeNote(880); // High chime on click
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ['💖', '💕', '🌸', '✨', '🌺', '💌'];

    for (let i = 0; i < 14; i++) {
        const p = document.createElement('div');
        p.className = 'heart-particle select-none';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.fontSize = `${Math.random() * 16 + 18}px`;
        p.style.left = `${centerX}px`;
        p.style.top = `${centerY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 90 + 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.transform = `translate(0, 0)`;

        document.body.appendChild(p);

        p.animate([
            { transform: 'translate(0,0) scale(0.5)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1.3)`, opacity: 0 }
        ], {
            duration: 1200 + Math.random() * 400,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            fill: 'forwards'
        });

        setTimeout(() => p.remove(), 1600);
    }
}

function spawnFlowerBurst(e) {
    burstHearts(e);
}

const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class Petal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.color = Math.random() > 0.4 ? '#ffb6c1' : (Math.random() > 0.5 ? '#ffc0cb' : '#ffe4e1');
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 20) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        // Draw delicate petal shape using bezier curves
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size, this.size, 0, this.size * 1.5);
        ctx.bezierCurveTo(this.size, this.size, this.size, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

const petals = Array.from({ length: 45 }, () => new Petal());

const sCanvas = document.getElementById('sparkleCanvas');
const sCtx = sCanvas.getContext('2d');
sCanvas.width = window.innerWidth;
sCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    sCanvas.width = window.innerWidth;
    sCanvas.height = window.innerHeight;
});

const sparkles = [];

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.015;
        this.color = Math.random() > 0.3 ? '#fff' : '#f7d070';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }

    draw() {
        sCtx.save();
        sCtx.globalAlpha = Math.max(0, this.life);
        sCtx.fillStyle = this.color;
        sCtx.beginPath();
        sCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.restore();
    }
}

window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) {
        sparkles.push(new Sparkle(e.clientX, e.clientY));
    }
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0 && Math.random() > 0.3) {
        sparkles.push(new Sparkle(e.touches[0].clientX, e.touches[0].clientY));
    }
});

function animate() {
    // Clear petals canvas
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
        p.update();
        p.draw();
    });

    // Clear sparkles canvas
    sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
    for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw();
        if (sparkles[i].life <= 0) {
            sparkles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

window.onload = () => {
    animate();
};