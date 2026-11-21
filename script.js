/* ============================================================
   Kuldeep · @xypherOG — animation engine
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Scroll progress bar ---------- */
  var progress = document.getElementById("progress");
  var nav = document.getElementById("nav");

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    if (nav) nav.classList.toggle("scrolled", h.scrollTop > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 3. Typewriter ---------- */
  var typedEl = document.getElementById("typed");
  var phrases = [
    "bots that answer 24/7.",
    "AI that reads photos.",
    "voice notes into text.",
    "automation that never sleeps.",
    "code you can actually read."
  ];
  if (typedEl && !reduce) {
    var pi = 0, ci = 0, deleting = false;
    var tick = function () {
      var word = phrases[pi];
      if (!deleting) {
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length) {
          deleting = true;
          return setTimeout(tick, 1700);
        }
        return setTimeout(tick, 42 + Math.random() * 40);
      }
      ci--;
      typedEl.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        return setTimeout(tick, 320);
      }
      setTimeout(tick, 24);
    };
    setTimeout(tick, 900);
  } else if (typedEl) {
    typedEl.textContent = phrases[0];
  }

  /* ---------- 4. Counter animation ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1500;
    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          runCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 5. Marquee: duplicate for seamless loop ---------- */
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- 6. 3D tilt + card glow ---------- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduce) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width;
        var py = (ev.clientY - r.top) / r.height;
        var rx = (py - 0.5) * -9;
        var ry = (px - 0.5) * 9;
        card.style.transform =
          "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });

    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (ev) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (ev.clientX - r.left) + "px");
        card.style.setProperty("--my", (ev.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- 7. Magnetic buttons ---------- */
  if (fine && !reduce) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (ev) {
        var r = btn.getBoundingClientRect();
        var dx = ev.clientX - (r.left + r.width / 2);
        var dy = ev.clientY - (r.top + r.height / 2);
        btn.style.transform =
          "translate(" + dx * 0.22 + "px," + dy * 0.32 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- 8. Cursor spotlight ---------- */
  var spot = document.querySelector(".spotlight");
  if (fine && spot && !reduce) {
    var sx = window.innerWidth / 2, sy = window.innerHeight / 2;
    var tx = sx, ty = sy, raf = null;
    document.body.classList.add("has-pointer");

    document.addEventListener("mousemove", function (ev) {
      tx = ev.clientX;
      ty = ev.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    function loop() {
      sx += (tx - sx) * 0.14;
      sy += (ty - sy) * 0.14;
      spot.style.left = sx + "px";
      spot.style.top = sy + "px";
      raf = Math.abs(tx - sx) > 0.4 || Math.abs(ty - sy) > 0.4
        ? requestAnimationFrame(loop)
        : null;
    }
  }

  /* ---------- 9. Particle constellation ---------- */
  var canvas = document.getElementById("particles");
  if (canvas && !reduce) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var parts = [];
    var mouse = { x: -9999, y: -9999 };

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(90, Math.round((W * H) / 22000));
      parts = [];
      for (var i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.5 + 0.6
        });
      }
    }

    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", function () {
      mouse.x = -9999; mouse.y = -9999;
    });
    window.addEventListener("resize", resize);

    var LINK = 132;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140, 190, 235, 0.55)";
        ctx.fill();
      }

      for (var a = 0; a < parts.length; a++) {
        for (var b = a + 1; b < parts.length; b++) {
          var dx = parts[a].x - parts[b].x;
          var dy = parts[a].y - parts[b].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            var alpha = (1 - Math.sqrt(d2) / LINK) * 0.22;
            ctx.beginPath();
            ctx.moveTo(parts[a].x, parts[a].y);
            ctx.lineTo(parts[b].x, parts[b].y);
            ctx.strokeStyle = "rgba(90, 170, 230, " + alpha + ")";
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        var mdx = parts[a].x - mouse.x;
        var mdy = parts[a].y - mouse.y;
        var md2 = mdx * mdx + mdy * mdy;
        if (md2 < 170 * 170) {
          var ma = (1 - Math.sqrt(md2) / 170) * 0.4;
          ctx.beginPath();
          ctx.moveTo(parts[a].x, parts[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(56, 189, 248, " + ma + ")";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    requestAnimationFrame(draw);
  }

  /* ---------- 10. Smooth anchor offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (ev) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
