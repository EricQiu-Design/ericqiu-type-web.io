const cardContainer = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');
let isScattered = false;
let isInteractionDisabled = true;
let topZIndex = 1000;

cards.forEach(card => {
    card.style.pointerEvents = 'none';
});

function generateUniquePositions(count, xRange, yRange) {
    const positions = [];
    const minDistance = 150;
    while (positions.length < count) {
        const randomX = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
        const randomY = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
        const isOverlapping = positions.some(([x, y]) => Math.hypot(x - randomX, y - randomY) < minDistance);
        if (!isOverlapping) positions.push([randomX, randomY]);
    }
    return positions;
}

function scatterCards() {
    if (!isScattered) {
        isScattered = true;
        isInteractionDisabled = false;
        cards.forEach(card => {
            card.style.pointerEvents = 'auto';
        });

        const positions = generateUniquePositions(cards.length, [-400, 400], [-200, 200]);
        cards.forEach((card, index) => {
            const [x, y] = positions[index];
            const randomRotation = Math.random() * 40 - 20;
            card.style.transform = `translate(${x}px, ${y}px) rotate(${randomRotation}deg)`;
        });
    }
}

function resetCards() {
    isScattered = false;
    isInteractionDisabled = true;
    cards.forEach((card, index) => {
        card.style.transform = `translateY(calc(var(--i) * -10px)) rotateY(0deg)`;
        card.classList.remove('focused', 'flipped');
        card.style.zIndex = index + 1;
        card.style.pointerEvents = 'none';
    });
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (isInteractionDisabled || card.classList.contains('flipped')) return;

        isInteractionDisabled = true;
        cards.forEach(c => c.style.pointerEvents = 'none');

        card.style.pointerEvents = 'auto';
        card.classList.add('focused');
        card.style.zIndex = topZIndex++;
        card.style.transition = 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        card.style.transform = `translate(-50%, -50%) rotateY(180deg) scale(1.5)`;

        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000);
    });
});

function navigateToIndex() {
    window.location.href = "index.html";
}

