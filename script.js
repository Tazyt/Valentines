document.addEventListener('DOMContentLoaded', () => {
    // Configuration - Set to true to show "Our Future Memories" section, false to hide it
    const SHOW_FUTURE_MEMORIES = false;
    
    // Testing configuration - Set to true to test the weekly anniversary popup
    const TEST_WEEKLY_ANNIVERSARY = false;

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
    const roseGardenEl = document.getElementById('rose-garden');
    const roseGardenTextEl = document.getElementById('rose-garden-text');
    const roseLayer = document.getElementById('rose-layer');
    let lastRoseCount = -1;
    let lastIsFuture = null;

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

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;

        updateRoseGarden(days, isFuture);
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

        // Calculate days since start date
        const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const isFirstWeek = daysSinceStart >= 6 && daysSinceStart <= 8; // Allow some flexibility for timing
        
        // Show popup conditions:
        // 1. Testing mode is on, OR
        // 2. It's Sunday AND we haven't shown this week's popup AND it's been at least a week
        const shouldShow = TEST_WEEKLY_ANNIVERSARY || 
                          (dayOfWeek === 0 && !localStorage.getItem(popupKey) && daysSinceStart >= 6);

        if (shouldShow) {
            // Update popup content based on whether it's the first week
            updateAnniversaryPopupContent(isFirstWeek || TEST_WEEKLY_ANNIVERSARY);
            anniversaryPopup.classList.add('show');
            
            // Only set the localStorage flag if not in testing mode
            if (!TEST_WEEKLY_ANNIVERSARY) {
                localStorage.setItem(popupKey, 'true');
            }
        }
    }

    function updateAnniversaryPopupContent(isFirstWeek) {
        const popupTitle = anniversaryPopup.querySelector('h2');
        const popupLetter = anniversaryPopup.querySelector('.popup-letter');
        
        if (isFirstWeek) {
            popupTitle.innerHTML = 'Our First Week Together! 💕🌹';
            popupLetter.innerHTML = `
                <p>My Dearest Amber,</p>
                <p>Can you believe it? Our very first week together! Seven magical days that have changed my entire world. Every single day with you has been like unwrapping the most precious gift - each moment more beautiful than the last.</p>
                <p>This past week, you've shown me what true happiness feels like. Your smile lights up my days, your laugh is my favorite melody, and your love has become the most important thing in my life. You're like the most perfect rose that has bloomed in my heart's garden.</p>
                <p>I know we're just at the beginning of our story, but I already can't imagine my life without you in it. You've brought so much joy, love, and meaning to every moment. Thank you for choosing to start this beautiful journey with me.</p>
                <p>Here's to our first week - and to all the weeks, months, and years to come. I love you more than all the roses in the world, my darling. 🌹✨</p>
                <p>Forever and always yours,</p>
                <p>Dayshan ❤️💫</p>
            `;
        } else {
            popupTitle.innerHTML = 'Happy Weekly Anniversary, My Love! 💕';
            popupLetter.innerHTML = `
                <p>My Dearest Amber,</p>
                <p>Can you believe it's already been another week? Every Sunday feels like a special milestone with you, a reminder of the beautiful journey we've started. Each day, I find myself falling for you more and more, like discovering a new rose in full bloom.</p>
                <p>This past week has been filled with moments I'll cherish forever, all because you were in them. You bring so much light and happiness into my life, and I can't imagine a single day without you. You're my rose, my everything.</p>
                <p>Here's to another week of love, laughter, and us. I love you more than words can say. 🌹</p>
                <p>Forever yours,</p>
                <p>Dayshan ❤️</p>
            `;
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
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            setupScrollAnimations();
            createFloatingRoses();
            generateAmbientRoses();
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

    function updateRoseGarden(daysElapsed, isFuture) {
        if (!roseGardenEl) return;
        // Limit count for performance
        const desiredCount = Math.min(daysElapsed + (isFuture ? 0 : 1), 60);
        if (desiredCount === lastRoseCount && lastIsFuture === isFuture) return;

        roseGardenEl.innerHTML = '';
        if (isFuture) {
            roseGardenTextEl.textContent = 'Planting seeds while we wait for Day 1...';
        } else {
            roseGardenTextEl.textContent = `A rose for each day we've had this precious love (${daysElapsed + 1} day${daysElapsed !== 0 ? 's' : ''}).`;
        }

        for (let i = 0; i < desiredCount; i++) {
            createRoseElement(isFuture);
        }
        lastRoseCount = desiredCount;
        lastIsFuture = isFuture;
    }

    function createRoseElement(isFuture) {
        const div = document.createElement('button');
        div.type = 'button';
        div.className = 'rose' + (isFuture ? ' seed' : '');
        div.setAttribute('aria-label', isFuture ? 'Seed' : 'Rose');
        div.textContent = isFuture ? '🌱' : '🌹';
        div.addEventListener('click', () => {
            // Manual add (bonus rose)
            const extra = document.createElement('span');
            div.classList.add('added');
            setTimeout(() => div.classList.remove('added'), 900);
            const bonus = document.createElement('div');
            bonus.className = 'rose';
            bonus.textContent = isFuture ? '🌱' : '🌹';
            bonus.classList.add('added');
            roseGardenEl.appendChild(bonus);
            setTimeout(() => bonus.classList.remove('added'), 900);
        });
        roseGardenEl.appendChild(div);
    }

    // Ambient decorative floating roses in background
    function generateAmbientRoses(count = 18) {
        if (!roseLayer) return;
        for (let i = 0; i < count; i++) {
            const r = document.createElement('div');
            r.className = 'ambient-rose';
            r.textContent = Math.random() > 0.2 ? '🌹' : '💗';
            const duration = 24 + Math.random() * 26;
            const delay = Math.random() * 25;
            const left = Math.random() * 100;
            const scale = 0.7 + Math.random() * 0.9;
            r.style.left = left + '%';
            r.style.bottom = (-10 - Math.random() * 20) + 'vh';
            r.style.animationDuration = duration + 's';
            r.style.animationDelay = delay + 's';
            r.style.transform = `translateY(0) scale(${scale})`;
            roseLayer.appendChild(r);
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
    generateAmbientRoses(10); // Light initial set
    
    // Only setup animations if not first visit
    if (localStorage.getItem('hasVisited')) {
        setupScrollAnimations();
        createFloatingRoses();
        generateAmbientRoses();
    }

    // Update every second
    setInterval(updateTimer, 1000);
});