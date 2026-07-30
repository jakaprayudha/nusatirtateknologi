/* ==========================================
    CREATE
========================================== */

function createSlider(slider){

    const track = slider.querySelector(".slider-track");

    const slides = [...track.children];

    const prev = slider.querySelector(".slider-prev");

    const next = slider.querySelector(".slider-next");

    const dots = slider.querySelector(".slider-dots");

    if(slides.length === 0) return;

    let index = 0;

    let auto;

    let startX = 0;

    let currentX = 0;

    const visible = parseInt(slider.dataset.visible) || 4;

    const autoplay = slider.dataset.autoplay !== "false";

    const interval = parseInt(slider.dataset.interval) || 4500;

    updateWidth();

    window.addEventListener("resize", updateWidth);

    function updateWidth(){

        const width = slider.clientWidth;

        const item = width / visible;

        slides.forEach(slide=>{

            slide.style.minWidth = item+"px";

        });

        move();

    }

    function move(){

        track.style.transform =
        `translateX(-${slides[0].offsetWidth*index}px)`;

    }

    function nextSlide(){

        index++;

        if(index >= slides.length-visible+1){

            index = 0;

        }

        move();

        activeDot();

    }

    function prevSlide(){

        index--;

        if(index < 0){

            index = slides.length-visible;

        }

        move();

        activeDot();

    }

    next?.addEventListener("click",nextSlide);

    prev?.addEventListener("click",prevSlide);

    createDots();

    function createDots(){

        if(!dots) return;

        dots.innerHTML="";

        for(let i=0;i<slides.length-visible+1;i++){

            const dot=document.createElement("button");

            dot.className="dot";

            dot.addEventListener("click",()=>{

                index=i;

                move();

                activeDot();

            });

            dots.appendChild(dot);

        }

        activeDot();

    }

    function activeDot(){

        if(!dots) return;

        dots.querySelectorAll(".dot")

        .forEach((dot,i)=>{

            dot.classList.toggle("active",i===index);

        });

    }

    if(autoplay){

        auto=setInterval(nextSlide,interval);

    }

    slider.addEventListener("mouseenter",()=>{

        clearInterval(auto);

    });

    slider.addEventListener("mouseleave",()=>{

        if(autoplay){

            auto=setInterval(nextSlide,interval);

        }

    });

    enableTouch();
    function enableTouch(){

        track.addEventListener("touchstart",(e)=>{

            startX=e.touches[0].clientX;

        });

        track.addEventListener("touchmove",(e)=>{

            currentX=e.touches[0].clientX;

        });

        track.addEventListener("touchend",()=>{

            const diff=startX-currentX;

            if(diff>50){

                nextSlide();

            }

            if(diff<-50){

                prevSlide();

            }

        });

    }    let dragging=false;

    let dragStart=0;

    track.addEventListener("mousedown",(e)=>{

        dragging=true;

        dragStart=e.pageX;

    });

    window.addEventListener("mouseup",()=>{

        dragging=false;

    });

    window.addEventListener("mousemove",(e)=>{

        if(!dragging) return;

        const diff=dragStart-e.pageX;

        if(diff>70){

            dragging=false;

            nextSlide();

        }

        if(diff<-70){

            dragging=false;

            prevSlide();

        }

    });

}