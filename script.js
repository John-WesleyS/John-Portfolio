/* ===========================================================
   JOHN WESLEY — PORTFOLIO — script.js
   No frameworks. No external runtime deps. Production-safe:
   every feature degrades gracefully if something is missing.
=========================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     1. BOOT SCREEN SEQUENCE
  --------------------------------------------------------- */
  function runBootSequence() {
    var bootScreen = document.getElementById("boot-screen");
    if (!bootScreen) return;

    var line1 = document.getElementById("boot-line-1");
    var line2 = document.getElementById("boot-line-2");
    var line3 = document.getElementById("boot-line-3");

    var lines = [
      { el: line1, text: "whoami" },
      { el: line2, text: "John Wesley — Full Stack Developer" },
      { el: line3, text: "Loading portfolio..." }
    ];

    if (reducedMotion) {
      // Skip typing animation entirely, just show and dismiss quickly.
      lines.forEach(function (l) { if (l.el) l.el.textContent = l.text; });
      setTimeout(function () { bootScreen.classList.add("hidden"); }, 250);
      return;
    }

    var lineIndex = 0;
    var charIndex = 0;

    function typeNext() {
      if (lineIndex >= lines.length) {
        setTimeout(function () { bootScreen.classList.add("hidden"); }, 400);
        return;
      }
      var current = lines[lineIndex];
      if (!current.el) { lineIndex++; typeNext(); return; }

      if (charIndex <= current.text.length) {
        current.el.textContent = current.text.slice(0, charIndex);
        charIndex++;
        setTimeout(typeNext, 22);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNext, 220);
      }
    }
    typeNext();

    // Safety net: never let the boot screen trap the user.
    setTimeout(function () { bootScreen.classList.add("hidden"); }, 4000);
  }

  /* ---------------------------------------------------------
     2. SCROLL PROGRESS BAR + HEADER STATE + STATUS BAR
  --------------------------------------------------------- */
  var scrollProgress = document.getElementById("scroll-progress");
  var header = document.getElementById("site-header");
  var backToTop = document.getElementById("back-to-top");
  var statusScroll = document.getElementById("status-scroll");
  var statusSection = document.getElementById("status-section");

  var sectionEls = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;

    if (scrollProgress) scrollProgress.style.width = pct + "%";
    if (statusScroll) statusScroll.textContent = pct + "%";

    if (header) {
      if (scrollTop > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }

    if (backToTop) {
      if (scrollTop > 600) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }

    // Determine active section for status bar
    if (statusSection && sectionEls.length) {
      var current = sectionEls[0];
      var triggerLine = scrollTop + window.innerHeight * 0.35;
      for (var i = 0; i < sectionEls.length; i++) {
        if (sectionEls[i].offsetTop <= triggerLine) current = sectionEls[i];
      }
      statusSection.textContent = current.id + ".section";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------
     3. MOBILE NAV TOGGLE
  --------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     4. THEME TOGGLE (persisted)
  --------------------------------------------------------- */
  var themeToggle = document.getElementById("theme-toggle");
  var moonIcon = document.getElementById("theme-icon-moon");
  var sunIcon = document.getElementById("theme-icon-sun");
  var STORAGE_KEY = "jw-portfolio-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (moonIcon) moonIcon.hidden = true;
      if (sunIcon) sunIcon.hidden = false;
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (moonIcon) moonIcon.hidden = false;
      if (sunIcon) sunIcon.hidden = true;
    }
  }

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }
  function storeTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); }
    catch (e) { /* storage unavailable — fail silently, theme still works for session */ }
  }

  // Dark mode is the default. Only switch to light if explicitly stored.
  var stored = getStoredTheme();
  applyTheme(stored === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      var next = isLight ? "dark" : "light";
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------------------------------------------------------
     5. TYPING ANIMATION (hero role)
  --------------------------------------------------------- */
  var typedRoleEl = document.getElementById("typed-role");
  var roles = ["Full Stack Developer", "MERN Stack Developer", "Problem Solver"];

  function runTypingLoop() {
    if (!typedRoleEl) return;
    if (reducedMotion) {
      typedRoleEl.textContent = roles[0];
      return;
    }

    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var word = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedRoleEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
        setTimeout(tick, 65);
      } else {
        charIndex--;
        typedRoleEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 35);
      }
    }
    tick();
  }

  /* ---------------------------------------------------------
     6. SCROLL REVEAL (IntersectionObserver, with fallback)
  --------------------------------------------------------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll(".section-fade");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---------------------------------------------------------
     7. ANIMATED COUNTERS (hero stats + DSA counter)
  --------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (isNaN(target)) return;

      if (reducedMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 1300;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min(1, (timestamp - startTime) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = target * eased;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------------------------------------------------------
     8. SKILL BAR FILL ON SCROLL
  --------------------------------------------------------- */
  function initSkillBars() {
    var bars = document.querySelectorAll(".skill-fill");
    if (!bars.length) return;

    if (!("IntersectionObserver" in window)) {
      bars.forEach(function (b) { b.classList.add("filled"); });
      return;
    }

    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("filled");
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (b) { barObserver.observe(b); });
  }

  /* ---------------------------------------------------------
     9. PROJECT FILTERING
  --------------------------------------------------------- */
  function initProjectFilter() {
    var filterButtons = document.querySelectorAll(".filter-btn");
    var projectItems = document.querySelectorAll("[data-tags]");
    if (!filterButtons.length || !projectItems.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        projectItems.forEach(function (item) {
          var tags = (item.getAttribute("data-tags") || "").split(" ");
          var show = filter === "all" || tags.indexOf(filter) !== -1;
          item.classList.toggle("filtered-out", !show);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     10. COPY EMAIL TO CLIPBOARD
  --------------------------------------------------------- */
  function initCopyEmail() {
    var copyBtn = document.getElementById("copy-email");
    var feedback = document.getElementById("copy-feedback");
    if (!copyBtn || !feedback) return;

    var email = "johnwesleybarre588@gmail.com";

    copyBtn.addEventListener("click", function () {
      function showCopied() {
        feedback.textContent = "copied!";
        setTimeout(function () { feedback.textContent = "copy"; }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(function () {
          fallbackCopy(email, showCopied);
        });
      } else {
        fallbackCopy(email, showCopied);
      }
    });
  }

  function fallbackCopy(text, onSuccess) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand("copy"); onSuccess(); }
    catch (e) { /* clipboard unavailable; user can still select the text manually */ }
    document.body.removeChild(textarea);
  }

  /* ---------------------------------------------------------
     11. CONTACT FORM (client-side validation + mailto handoff)
     No backend is assumed. This composes a mailto: link so the
     message reliably reaches the inbox without a server.
  --------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = document.getElementById("name");
      var emailEl = document.getElementById("email");
      var messageEl = document.getElementById("message");

      var name = nameEl.value.trim();
      var email = emailEl.value.trim();
      var message = messageEl.value.trim();

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = "Please fill in every field before sending.";
        status.style.color = "#E8B86D";
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = "That email address doesn't look right — please check it.";
        status.style.color = "#E8B86D";
        return;
      }

      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      var mailto = "mailto:johnwesleybarre588@gmail.com?subject=" + subject + "&body=" + body;

      window.location.href = mailto;

      status.textContent = "Opening your email app to send this...";
      status.style.color = "";
      form.reset();
    });
  }

  /* ---------------------------------------------------------
     12. FOOTER YEAR
  --------------------------------------------------------- */
  function setFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     INIT — run everything once DOM is ready
  --------------------------------------------------------- */
  function init() {
    runBootSequence();
    runTypingLoop();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initProjectFilter();
    initCopyEmail();
    initContactForm();
    setFooterYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
