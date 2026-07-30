/* =====================================================
   NUSA TIRTA TEKNOLOGI
   navbar.js
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initDropdown();
    initActiveSection();
    initStickyNavbar();

});

/* ==========================================
    MOBILE MENU
========================================== */

function initMobileMenu(){

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if(!toggle || !menu) return;

    toggle.addEventListener("click",()=>{

        menu.classList.toggle("active");
        toggle.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    document.querySelectorAll(".nav-menu a").forEach(link=>{

        link.addEventListener("click",()=>{

            menu.classList.remove("active");
            toggle.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

}

/* ==========================================
    CLICK OUTSIDE
========================================== */

document.addEventListener("click",(e)=>{

    const menu=document.querySelector(".nav-menu");
    const toggle=document.querySelector(".menu-toggle");

    if(!menu || !toggle) return;

    if(
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
    ){

        menu.classList.remove("active");
        toggle.classList.remove("active");
        document.body.classList.remove("menu-open");

    }

});

/* ==========================================
    DROPDOWN
========================================== */

function initDropdown(){

    document.querySelectorAll(".has-dropdown").forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            if(window.innerWidth > 991){

                item.classList.add("open");

            }

        });

        item.addEventListener("mouseleave",()=>{

            item.classList.remove("open");

        });

    });

}

/* ==========================================
    ACTIVE SECTION
========================================== */

function initActiveSection(){

    const sections=document.querySelectorAll("section[id]");

    if(!sections.length) return;

    window.addEventListener("scroll",()=>{

        const scroll=window.scrollY+130;

        sections.forEach(section=>{

            const top=section.offsetTop;
            const height=section.offsetHeight;
            const id=section.getAttribute("id");

            if(scroll>=top && scroll<top+height){

                document.querySelectorAll(".nav-menu a").forEach(link=>{

                    link.classList.remove("active");

                    if(link.getAttribute("href")==="#"+id){

                        link.classList.add("active");

                    }

                });

            }

        });

    });

}

/* ==========================================
    STICKY NAVBAR
========================================== */

function initStickyNavbar(){

    const header=document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/* ==========================================
    MOBILE DROPDOWN
========================================== */

document.querySelectorAll(".dropdown-toggle").forEach(button=>{

    button.addEventListener("click",(e)=>{

        if(window.innerWidth>991) return;

        e.preventDefault();

        button.parentElement.classList.toggle("open");

    });

});

/* ==========================================
    RESIZE
========================================== */

window.addEventListener("resize",()=>{

    if(window.innerWidth>991){

        document.body.classList.remove("menu-open");

        document.querySelector(".nav-menu")?.classList.remove("active");

    }

});