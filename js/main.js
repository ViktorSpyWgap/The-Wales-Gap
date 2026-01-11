// The Wales Gap - Main JavaScript

(function() {
  'use strict';

  const htmlElement = document.documentElement;

  // ============================================
  // Theme Toggle (Dark/Light Mode)
  // ============================================
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('walesgap-theme', theme);

    // Update aria-label for accessibility
    if (themeToggle) {
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  // Initialize theme from storage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem('walesgap-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('walesgap-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ============================================
  // Language Toggle
  // ============================================
  const langToggleBtns = document.querySelectorAll('.lang-toggle__btn');

  function setLanguage(lang) {
    htmlElement.setAttribute('data-lang', lang);
    htmlElement.setAttribute('lang', lang);

    // Update active button
    langToggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem('walesgap-lang', lang);
  }

  // Initialize language from storage or default
  const savedLang = localStorage.getItem('walesgap-lang') || 'en';
  setLanguage(savedLang);

  // Language toggle click handlers
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // ============================================
  // Mobile Navigation
  // ============================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  // ============================================
  // Quiz Functionality
  // ============================================
  const quizContainer = document.getElementById('quiz-container');

  if (quizContainer) {
    const questions = [
      {
        question: {
          en: "True or False: Most children living in poverty in Wales have parents who don't work.",
          cy: "Gwir neu Gau: Mae gan y rhan fwyaf o blant sy'n byw mewn tlodi yng Nghymru rieni nad ydynt yn gweithio."
        },
        options: [
          { en: "True", cy: "Gwir" },
          { en: "False", cy: "Gau" }
        ],
        correct: 1,
        explanation: {
          en: "Research from the Joseph Rowntree Foundation shows that 72% of children in poverty in the UK live in households where at least one adult works. This shows that having a job doesn't always mean you can escape poverty.",
          cy: "Mae ymchwil gan y Joseph Rowntree Foundation yn dangos bod 72% o blant mewn tlodi yn y DU yn byw mewn cartrefi lle mae o leiaf un oedolyn yn gweithio."
        }
      },
      {
        question: {
          en: "Which of these is NOT a type of inequality that affects people in Wales?",
          cy: "Pa un o'r rhain NAD YW'n fath o anghydraddoldeb sy'n effeithio ar bobl yng Nghymru?"
        },
        options: [
          { en: "Income inequality", cy: "Anghydraddoldeb incwm" },
          { en: "Educational inequality", cy: "Anghydraddoldeb addysgol" },
          { en: "Weather inequality", cy: "Anghydraddoldeb tywydd" },
          { en: "Digital inequality", cy: "Anghydraddoldeb digidol" }
        ],
        correct: 2,
        explanation: {
          en: "While Wales does have different weather patterns, this isn't considered a form of social or economic inequality. Income, education, and digital access are all real forms of inequality that affect people's lives.",
          cy: "Er bod gan Gymru batrymau tywydd gwahanol, nid yw hyn yn cael ei ystyried yn fath o anghydraddoldeb cymdeithasol neu economaidd."
        }
      },
      {
        question: {
          en: "What percentage of people in Wales live in poverty?",
          cy: "Pa ganran o bobl yng Nghymru sy'n byw mewn tlodi?"
        },
        options: [
          { en: "10%", cy: "10%" },
          { en: "24%", cy: "24%" },
          { en: "50%", cy: "50%" },
          { en: "75%", cy: "75%" }
        ],
        correct: 1,
        explanation: {
          en: "According to the Welsh Government, about 1 in 4 people (24%) in Wales live in relative income poverty. That's approximately 720,000 people.",
          cy: "Yn ol Llywodraeth Cymru, mae tua 1 o bob 4 person (24%) yng Nghymru yn byw mewn tlodi incwm cymharol. Mae hynny tua 720,000 o bobl."
        }
      },
      {
        question: {
          en: "True or False: The five richest men in the world doubled their money during the COVID-19 pandemic.",
          cy: "Gwir neu Gau: Dyblodd y pum dyn cyfoethocaf yn y byd eu harian yn ystod pandemig COVID-19."
        },
        options: [
          { en: "True", cy: "Gwir" },
          { en: "False", cy: "Gau" }
        ],
        correct: 0,
        explanation: {
          en: "Oxfam research shows that the world's five richest men more than doubled their fortunes from $405 billion to $869 billion between 2020 and 2024, while almost 5 billion people globally became poorer.",
          cy: "Mae ymchwil Oxfam yn dangos bod y pum dyn cyfoethocaf yn y byd wedi mwy na dyblu eu ffortiwn o $405 biliwn i $869 biliwn rhwng 2020 a 2024."
        }
      },
      {
        question: {
          en: "What does SRCDC (South Riverside Community Development Centre) do to fight digital inequality?",
          cy: "Beth mae SRCDC (Canolfan Datblygu Cymunedol De Riverside) yn ei wneud i frwydro yn erbyn anghydraddoldeb digidol?"
        },
        options: [
          { en: "Gives free laptops to families who need them", cy: "Rhoi gliniaduron am ddim i deuluoedd sydd eu hangen" },
          { en: "Runs digital skills workshops", cy: "Cynnal gweithdai sgiliau digidol" },
          { en: "Helps people access online services", cy: "Helpu pobl i gael mynediad at wasanaethau ar-lein" },
          { en: "All of the above", cy: "Pob un o'r uchod" }
        ],
        correct: 3,
        explanation: {
          en: "SRCDC tackles digital inequality in several ways. They provide free refurbished devices, teach digital skills, and help people navigate important online services like NHS appointments and benefit applications.",
          cy: "Mae SRCDC yn mynd i'r afael ag anghydraddoldeb digidol mewn sawl ffordd. Maent yn darparu dyfeisiau wedi'u hadnewyddu am ddim, yn dysgu sgiliau digidol, ac yn helpu pobl i lywio gwasanaethau ar-lein pwysig."
        }
      },
      {
        question: {
          en: "Which group is most affected by the disability employment gap in Wales?",
          cy: "Pa grwp sy'n cael ei effeithio fwyaf gan y bwlch cyflogaeth anabledd yng Nghymru?"
        },
        options: [
          { en: "Older workers", cy: "Gweithwyr hyn" },
          { en: "Young people with disabilities", cy: "Pobl ifanc ag anableddau" },
          { en: "Women with disabilities", cy: "Menywod ag anableddau" },
          { en: "All disabled people face this gap", cy: "Mae pob person anabl yn wynebu'r bwlch hwn" }
        ],
        correct: 3,
        explanation: {
          en: "The Equality and Human Rights Commission reports that there's a 30 percentage point gap between employment rates for disabled and non-disabled people in the UK. This affects disabled people of all ages and backgrounds.",
          cy: "Mae'r Comisiwn Cydraddoldeb a Hawliau Dynol yn adrodd bod bwlch o 30 pwynt canran rhwng cyfraddau cyflogaeth pobl anabl a phobl nad ydynt yn anabl yn y DU."
        }
      },
      {
        question: {
          en: "If you want to make a difference about inequality in your community, which of these is NOT a good first step?",
          cy: "Os ydych chi am wneud gwahaniaeth ynghylch anghydraddoldeb yn eich cymuned, pa un o'r rhain NAD YW'n gam cyntaf da?"
        },
        options: [
          { en: "Volunteering at a local community centre", cy: "Gwirfoddoli mewn canolfan gymunedol leol" },
          { en: "Learning more about the issues", cy: "Dysgu mwy am y materion" },
          { en: "Ignoring the problem because it's too big", cy: "Anwybyddu'r broblem am ei bod yn rhy fawr" },
          { en: "Talking to others about what you've learned", cy: "Siarad ag eraill am yr hyn rydych wedi'i ddysgu" }
        ],
        correct: 2,
        explanation: {
          en: "While inequality can seem like a huge problem, everyone can make a difference. Starting small by learning, talking, and volunteering are all effective ways to begin creating change.",
          cy: "Er y gall anghydraddoldeb ymddangos fel problem enfawr, gall pawb wneud gwahaniaeth. Mae dechrau'n fach trwy ddysgu, siarad, a gwirfoddoli yn ffyrdd effeithiol o ddechrau creu newid."
        }
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function getCurrentLang() {
      return document.documentElement.getAttribute('data-lang') || 'en';
    }

    function renderQuestion() {
      const lang = getCurrentLang();
      const q = questions[currentQuestion];
      const progress = ((currentQuestion) / questions.length) * 100;

      quizContainer.innerHTML = `
        <div class="quiz__progress">
          <div class="quiz__progress-bar">
            <div class="quiz__progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="quiz__progress-text">
            <span>${lang === 'en' ? 'Question' : 'Cwestiwn'} ${currentQuestion + 1} ${lang === 'en' ? 'of' : 'o'} ${questions.length}</span>
            <span>${lang === 'en' ? 'Score' : 'Sgôr'}: ${score}/${questions.length}</span>
          </div>
        </div>
        <div class="quiz__question-card">
          <div class="quiz__question-number">${lang === 'en' ? 'Question' : 'Cwestiwn'} ${currentQuestion + 1}</div>
          <h2 class="quiz__question-text">${q.question[lang]}</h2>
          <div class="quiz__options">
            ${q.options.map((opt, i) => `
              <button class="quiz__option" data-index="${i}">
                <span class="quiz__option-marker"></span>
                <span>${opt[lang]}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz__feedback" id="quiz-feedback"></div>
          <div class="quiz__actions">
            <button class="btn btn--primary hidden" id="next-btn">
              ${currentQuestion < questions.length - 1
                ? (lang === 'en' ? 'Next Question' : 'Cwestiwn Nesaf')
                : (lang === 'en' ? 'See Results' : 'Gweld Canlyniadau')}
            </button>
          </div>
        </div>
      `;

      answered = false;

      // Add click handlers to options
      quizContainer.querySelectorAll('.quiz__option').forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
      });

      // Add next button handler
      document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          renderQuestion();
        } else {
          renderResults();
        }
      });
    }

    function handleAnswer(selectedIndex) {
      if (answered) return;
      answered = true;

      const lang = getCurrentLang();
      const q = questions[currentQuestion];
      const isCorrect = selectedIndex === q.correct;

      if (isCorrect) score++;

      // Update option styles
      quizContainer.querySelectorAll('.quiz__option').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
          btn.classList.add('correct');
        } else if (i === selectedIndex && !isCorrect) {
          btn.classList.add('incorrect');
        }
        if (i === selectedIndex) {
          btn.classList.add('selected');
        }
      });

      // Show feedback
      const feedback = document.getElementById('quiz-feedback');
      feedback.className = `quiz__feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = `
        <div class="quiz__feedback-title">${isCorrect
          ? (lang === 'en' ? 'Correct!' : 'Cywir!')
          : (lang === 'en' ? 'Not quite right' : 'Ddim yn hollol gywir')}</div>
        <p>${q.explanation[lang]}</p>
      `;

      // Show next button
      document.getElementById('next-btn').classList.remove('hidden');
    }

    function renderResults() {
      const lang = getCurrentLang();
      const percentage = Math.round((score / questions.length) * 100);
      const circumference = 2 * Math.PI * 60;
      const offset = circumference - (percentage / 100) * circumference;

      let message, ctaLink, ctaText;
      if (score <= 2) {
        message = lang === 'en'
          ? "Getting started! Check out our Research Page to learn more."
          : "Dechrau arni! Edrychwch ar ein Tudalen Ymchwil i ddysgu mwy.";
        ctaLink = "research.html";
        ctaText = lang === 'en' ? "Visit Research Page" : "Ymweld a'r Dudalen Ymchwil";
      } else if (score <= 5) {
        message = lang === 'en'
          ? "Good knowledge! Visit our Local Impact Page to see what's happening in Cardiff."
          : "Gwybodaeth dda! Ymwelwch a'n Tudalen Effaith Leol i weld beth sy'n digwydd yng Nghaerdydd.";
        ctaLink = "local-impact.html";
        ctaText = lang === 'en' ? "Visit Local Impact" : "Ymweld ag Effaith Leol";
      } else {
        message = lang === 'en'
          ? "Excellent! You're ready to take action. Head to our Take Action Page for ideas."
          : "Ardderchog! Rydych chi'n barod i weithredu. Ewch i'n Tudalen Gweithredu am syniadau.";
        ctaLink = "take-action.html";
        ctaText = lang === 'en' ? "Take Action" : "Gweithredu";
      }

      quizContainer.innerHTML = `
        <div class="quiz__question-card quiz-results">
          <div class="quiz-results__score">
            <svg class="quiz-results__score-circle" width="150" height="150" viewBox="0 0 150 150">
              <circle class="quiz-results__score-bg" cx="75" cy="75" r="60"/>
              <circle class="quiz-results__score-fill" cx="75" cy="75" r="60"
                style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}"/>
            </svg>
            <div class="quiz-results__score-text">${score}/${questions.length}</div>
          </div>
          <h2 class="section__title">${lang === 'en' ? 'Quiz Complete!' : 'Cwis Wedi\'i Gwblhau!'}</h2>
          <p class="quiz-results__message">${message}</p>
          <div class="quiz-results__cta">
            <a href="${ctaLink}" class="btn btn--primary">${ctaText}</a>
            <button class="btn btn--outline" id="restart-quiz">
              ${lang === 'en' ? 'Try Again' : 'Rhoi Cynnig Arall'}
            </button>
          </div>
        </div>
      `;

      // Animate the score circle
      setTimeout(() => {
        const fill = quizContainer.querySelector('.quiz-results__score-fill');
        if (fill) {
          fill.style.strokeDashoffset = offset;
        }
      }, 100);

      // Restart button
      document.getElementById('restart-quiz').addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        renderQuestion();
      });
    }

    // Start the quiz
    renderQuestion();

    // Re-render on language change
    langToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!answered) {
          renderQuestion();
        }
      });
    });
  }

})();
