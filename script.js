document.addEventListener('DOMContentLoaded', () => {
    // Set the date you started dating: Month is 0-indexed (0=Jan, 1=Feb, etc.)
    // Using 02/07/2025 (DD/MM/YYYY) which is July 2nd, 2025.
    const startDate = new Date(2025, 6, 2, 0, 0, 0); // Month is 6 for July

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const quoteEl = document.getElementById('daily-quote');
    const anniversaryPopup = document.getElementById('anniversary-popup');
    const closeBtn = document.querySelector('.close-btn');

    const loveQuotes = [
        "For my Emma: Every second with you is a second I cherish. I can't wait for all the seconds to come.",
        "From the moment our story began, I knew my life had found its missing piece. That piece is you, Emma.",
        "They say the best things in life are worth waiting for. Our love story is my proof.",
        "With you, every day feels like a love song, and my heart can't stop singing your name.",
        "I didn't believe in soulmates until I met you, Emma. Now, I only believe in us.",
        "Our journey is just beginning, but my love for you already feels timeless and infinite.",
        "Counting the days with you is my new favorite hobby. Here's to a lifetime of counting, my love.",
        "You are the 'once in a lifetime' I thought only existed in dreams.",
        "My love for you grows stronger with every passing second, minute, and hour. It's my favorite kind of math.",
        "To my dearest Emma, you are more than my love; you are my home, my future, my everything."
    ];

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        // If diff is negative, the date is in the future. We can show a countdown.
        // If diff is positive, the date is in the past. We show time elapsed.
        const isFuture = diff < 0;
        const targetDiff = Math.abs(diff);

        const h2Element = document.querySelector('.timer-section h2');
        if (isFuture) {
            h2Element.innerText = "Our love story begins in:";
        } else {
            h2Element.innerText = "Our love story has been going for:";
        }

        const days = Math.floor(targetDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((targetDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((targetDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((targetDiff % (1000 * 60)) / 1000);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;
    }

    function displayDailyQuote() {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const quoteIndex = dayOfYear % loveQuotes.length;
        quoteEl.innerText = `"${loveQuotes[quoteIndex]}"`;
    }

    function showAnniversaryPopup() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday = 0, Wednesday = 3
        const year = today.getFullYear();
        const weekNumber = Math.ceil((((today - new Date(year, 0, 1)) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
        const popupKey = `anniversaryPopup_${year}_${weekNumber}`;

        // Show on Wednesday (day 3) and only if not already shown this week
        if (dayOfWeek === 3 && !localStorage.getItem(popupKey)) {
            anniversaryPopup.classList.add('show');
            localStorage.setItem(popupKey, 'true');
        }
    }

    function hideAnniversaryPopup() {
        anniversaryPopup.classList.remove('show');
    }

    function createHeart() {
        const heartsContainer = document.getElementById('hearts-container');
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '♥';

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // Between 4s and 7s
        heart.style.fontSize = Math.random() * 16 + 12 + 'px'; // Random size between 12px and 28px

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000); // Remove heart after animation
    }

    // Event Listeners
    closeBtn.addEventListener('click', hideAnniversaryPopup);
    anniversaryPopup.addEventListener('click', (e) => {
        if (e.target === anniversaryPopup) {
            hideAnniversaryPopup();
        }
    });

    // Initial calls
    updateTimer();
    displayDailyQuote();
    showAnniversaryPopup();

    // Update every second
    setInterval(updateTimer, 1000);
    setInterval(createHeart, 500); // Create a new heart every 500ms
});