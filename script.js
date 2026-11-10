document.addEventListener("DOMContentLoaded", function () {
  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* Dropdowns on mobile / touch */
  document.querySelectorAll(".sub-toggle").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  /* Animated counters */
  var counters = document.querySelectorAll(".count");
  var runCounter = function (el) {
    var target = parseInt(el.dataset.to, 10) || 0;
    var current = 0;
    var step = Math.max(1, Math.ceil(target / 30));
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 60);
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* Reviews slider */
  var slides = document.querySelector("#slider .slides");
  var total = document.querySelectorAll("#slider .slide").length;
  var index = 0, auto;
  function show(i) {
    index = (i + total) % total;
    slides.style.transform = "translateX(-" + index * 100 + "%)";
  }
  function start() { auto = setInterval(function () { show(index + 1); }, 6000); }
  function reset() { clearInterval(auto); start(); }
  document.getElementById("next").addEventListener("click", function () { show(index + 1); reset(); });
  document.getElementById("prev").addEventListener("click", function () { show(index - 1); reset(); });
  start();

  /* FAQ: keep one item open at a time */
  var items = document.querySelectorAll("#faq details");
  items.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* Back to top */
  var topBtn = document.querySelector(".to-top");
  window.addEventListener("scroll", function () {
    topBtn.classList.toggle("show", window.scrollY > 500);
  });
});