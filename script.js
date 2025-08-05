document.addEventListener('DOMContentLoaded', () => {
    // Configuration - Set to true to show "Our Future Memories" section, false to hide it
    const SHOW_FUTURE_MEMORIES = false;

    // Set the date you started dating: Month is 0-indexed (0=Jan, 7=Aug)
    // Using 3rd August 2025.
    const startDate = new Date(2025, 7, 3, 0, 0, 0); // Month is 7 for August

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const quoteEl = document.getElementById('daily-quote');
    const anniversaryPopup = document.getElementById('anniversary-popup');
    const closeBtn = document.querySelector('.close-btn');
    const firstVisitPopup = document.getElementById('first-visit-popup');
    const enterBtn = document.getElementById('enter-btn');

    const loveQuotes = [
        "For my Amber: Every second with you is a second I cherish. I can't wait for all the seconds to come. 🌹",
        "From the moment our story began, I knew my life had found its missing piece. That piece is you, Amber. Like roses in bloom, our love grows more beautiful each day. 🌹",
        "They say the best things in life are worth waiting for. Our love story is my proof, as beautiful as a garden of roses.",
        "With you, every day feels like a love song, and my heart can't stop singing your name. You're my rose among thorns. 🌹",
        "I didn't believe in soulmates until I met you, Amber. Now, I only believe in us. You're as precious as a perfect rose.",
        "Our journey is just beginning, but my love for you already feels timeless and infinite. Like roses that bloom forever in my heart. 🌹",
        "Counting the days with you is my new favorite hobby. Here's to a lifetime of counting, my love, in a garden of roses.",
        "You are the 'once in a lifetime' I thought only existed in dreams. My beautiful rose. 🌹",
        "My love for you grows stronger with every passing second, minute, and hour. It's my favorite kind of math, blooming like roses in spring.",
        "To my dearest Amber, you are more than my love; you are my home, my future, my everything. My eternal rose. 🌹"
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
            h2Element.innerText = "Our journey begins in:";
        } else {
            h2Element.innerText = "Our journey has spanned:";
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
        const dayOfWeek = today.getDay(); // Sunday = 0
        const year = today.getFullYear();
        const weekNumber = Math.ceil((((today - new Date(year, 0, 1)) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
        const popupKey = `anniversaryPopup_${year}_${weekNumber}`;

        // Show on Sunday (day 0) and only if not already shown this week
        if (dayOfWeek === 0 && !localStorage.getItem(popupKey)) {
            anniversaryPopup.classList.add('show');
            localStorage.setItem(popupKey, 'true');
        }
    }

    function hideAnniversaryPopup() {
        anniversaryPopup.classList.remove('show');
    }

    function showFirstVisitPopup() {
        // Check if this is the first visit
        if (!localStorage.getItem('hasVisited')) {
            firstVisitPopup.classList.add('show');
            // Prevent scrolling when popup is open
            document.body.style.overflow = 'hidden';
        }
    }

    function hideFirstVisitPopup() {
        firstVisitPopup.classList.remove('show');
        localStorage.setItem('hasVisited', 'true');
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
        
        // Start the main animations after popup closes
        setTimeout(() => {
            setupScrollAnimations();
            createFloatingRoses();
        }, 500);
    }

    function toggleFutureMemories() {
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            if (SHOW_FUTURE_MEMORIES) {
                gallerySection.style.display = 'block';
            } else {
                gallerySection.style.display = 'none';
            }
        }
    }

    // --- Scroll Animation Logic ---
    function setupScrollAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the item is visible
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    function createFloatingRoses() {
        const rosesContainer = document.createElement('div');
        rosesContainer.className = 'floating-roses';
        
        for (let i = 0; i < 10; i++) {
            const petal = document.createElement('div');
            petal.className = 'rose-petal';
            rosesContainer.appendChild(petal);
        }
        
        document.getElementById('star-background').appendChild(rosesContainer);
    }

    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💕';
            heartsContainer.appendChild(heart);
        }
        
        document.querySelector('.first-visit-content').appendChild(heartsContainer);
    }

    // Enhanced mobile touch interactions
    function setupMobileInteractions() {
        // Add touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll('.gallery-item, .time-box, .enter-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });

        // Prevent zoom on double tap for iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Event Listeners
    closeBtn.addEventListener('click', hideAnniversaryPopup);
    anniversaryPopup.addEventListener('click', (e) => {
        if (e.target === anniversaryPopup) {
            hideAnniversaryPopup();
        }
    });

    enterBtn.addEventListener('click', hideFirstVisitPopup);
    firstVisitPopup.addEventListener('click', (e) => {
        if (e.target === firstVisitPopup) {
            hideFirstVisitPopup();
        }
    });

    // Initial calls
    updateTimer();
    displayDailyQuote();
    showAnniversaryPopup();
    showFirstVisitPopup();
    createFloatingHearts();
    setupMobileInteractions();
    toggleFutureMemories(); // Apply the future memories visibility setting
    
    // Only setup animations if not first visit
    if (localStorage.getItem('hasVisited')) {
        setupScrollAnimations();
        createFloatingRoses();
    }

    // Update every second
    setInterval(updateTimer, 1000);
});