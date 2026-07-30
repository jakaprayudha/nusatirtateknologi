/* =====================================================
   NUSA TIRTA TEKNOLOGI
   counter.js
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initCounter();

});

/* ==========================================
    COUNTER
========================================== */

function initCounter(){

    const counters = document.querySelectorAll("[data-counter]");

    if(counters.length === 0) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    },{

        threshold:.4

    });

    counters.forEach(counter=>observer.observe(counter));

}

/* ==========================================
    ANIMATE
========================================== */

function animateCounter(element){

    const target = parseFloat(element.dataset.counter);

    const duration = parseInt(element.dataset.duration) || 2000;

    const prefix = element.dataset.prefix || "";

    const suffix = element.dataset.suffix || "";

    const decimals = target % 1 !== 0 ? 1 : 0;

    let start = 0;

    const startTime = performance.now();

    function update(now){

        const progress = Math.min((now-startTime)/duration,1);

        const ease = easeOutCubic(progress);

        const value = start + (target-start)*ease;

        element.textContent =
            prefix +
            value.toFixed(decimals) +
            suffix;

        if(progress < 1){

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

/* ==========================================
    EASING
========================================== */

function easeOutCubic(t){

    return 1-Math.pow(1-t,3);

}