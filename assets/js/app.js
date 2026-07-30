/* =====================================================
   NUSA TIRTA TEKNOLOGI
   app.js
===================================================== */

"use strict";

/* ==========================================
    DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initStickyHeader();
    initSmoothScroll();
    initReveal();
    initBackToTop();
    initLazyImage();
    initRippleButton();
    initActiveMenu();
    initCurrentYear();

});

/* ==========================================
    WINDOW LOAD
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(()=>{

            loader.classList.add("hidden");

        },600);

    }

});
/* ==========================================
    LOADER
========================================== */

function initLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    loader.classList.remove("hidden");

}
/* ==========================================
    STICKY HEADER
========================================== */


function initStickyHeader(){

    const header = document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}/* ==========================================
    SMOOTH SCROLL
========================================== */

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]')

    .forEach(anchor=>{

        anchor.addEventListener("click",(e)=>{

            e.preventDefault();

            const target=document.querySelector(anchor.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });

}/* ==========================================
    REVEAL
========================================== */
/* ==========================================
    REVEAL
========================================== */

function initReveal(){

    const items = document.querySelectorAll(".reveal");

    if(items.length === 0) return;

    // Mobile & Tablet
    if(window.innerWidth <= 768){

        items.forEach(item=>{

            item.classList.add("active");

            item.style.opacity = "1";

            item.style.transform = "none";

            item.style.transition = "none";

        });

        return;

    }

    // Desktop
    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    items.forEach(item=>observer.observe(item));

}
/* ==========================================
    BACK TO TOP
========================================== */

function initBackToTop(){

    const button=document.querySelector(".back-top");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 400){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}/* ==========================================
    ACTIVE MENU
========================================== */

function initActiveMenu(){

    const current=location.pathname.split("/").pop();

    document.querySelectorAll(".nav-menu a")

    .forEach(link=>{

        const href=link.getAttribute("href");

        if(href===current){

            link.classList.add("active");

        }

    });

}/* ==========================================
    LAZY IMAGE
========================================== */

function initLazyImage(){

    const images=document.querySelectorAll("img[data-src]");

    if(images.length===0) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            }

        });

    });

    images.forEach(img=>observer.observe(img));

}/* ==========================================
    RIPPLE
========================================== */

function initRippleButton(){

    document.querySelectorAll(".btn")

    .forEach(button=>{

        button.addEventListener("click",(e)=>{

            const circle=document.createElement("span");

            const size=Math.max(button.clientWidth,button.clientHeight);

            circle.style.width=size+"px";

            circle.style.height=size+"px";

            circle.classList.add("ripple");

            const rect=button.getBoundingClientRect();

            circle.style.left=e.clientX-rect.left-size/2+"px";

            circle.style.top=e.clientY-rect.top-size/2+"px";

            button.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });

}/* ==========================================
    YEAR
========================================== */

function initCurrentYear(){

    const year=document.getElementById("year");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}/* ==========================================
    HELPER
========================================== */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);
/*=========================================
FAQ
=========================================*/

document.querySelectorAll(".faq-question")

.forEach(button=>{

    button.addEventListener("click",()=>{

        const item=button.parentElement;

        document.querySelectorAll(".faq-item")

        .forEach(faq=>{

            if(faq!==item){

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(()=>{

            loader.classList.add("hidden");

        },600);

    }

});