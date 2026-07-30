/* =====================================================
   NUSA TIRTA TEKNOLOGI
   particles.js
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("particles");

    if(!canvas) return;

    new ParticleEngine(canvas);

});

class ParticleEngine{

    constructor(canvas){

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.mouse = {

            x:null,
            y:null,
            radius:140

        };

        this.total = 90;

        this.particles = [];

        this.resize();

        this.create();

        this.bind();

        this.animate();

    }

    resize(){

        this.width = this.canvas.width = window.innerWidth;

        this.height = this.canvas.height = window.innerHeight;

    }

    bind(){

        window.addEventListener("resize",()=>{

            this.resize();

        });

        window.addEventListener("mousemove",(e)=>{

            this.mouse.x = e.clientX;

            this.mouse.y = e.clientY;

        });

        window.addEventListener("mouseleave",()=>{

            this.mouse.x = null;

            this.mouse.y = null;

        });

    }

    create(){

        this.particles=[];

        for(let i=0;i<this.total;i++){

            this.particles.push(

                new Particle(

                    Math.random()*this.width,

                    Math.random()*this.height

                )

            );

        }

    }

    animate(){

        this.ctx.clearRect(

            0,

            0,

            this.width,

            this.height

        );

        this.connect();

        this.particles.forEach(p=>{

            p.update(this);

            p.draw(this.ctx);

        });

        requestAnimationFrame(

            ()=>this.animate()

        );

    }

    connect(){

        for(let a=0;a<this.particles.length;a++){

            for(let b=a;b<this.particles.length;b++){

                const dx=this.particles[a].x-this.particles[b].x;

                const dy=this.particles[a].y-this.particles[b].y;

                const distance=Math.sqrt(dx*dx+dy*dy);

                if(distance<120){

                    this.ctx.beginPath();

                    this.ctx.strokeStyle=

                    `rgba(11,46,109,${
                        1-distance/120
                    })`;

                    this.ctx.lineWidth=.6;

                    this.ctx.moveTo(

                        this.particles[a].x,

                        this.particles[a].y

                    );

                    this.ctx.lineTo(

                        this.particles[b].x,

                        this.particles[b].y

                    );

                    this.ctx.stroke();

                }

            }

        }

    }

}class Particle{

    constructor(x,y){

        this.x=x;

        this.y=y;

        this.size=Math.random()*3+1;

        this.speedX=(Math.random()-.5)*0.6;

        this.speedY=(Math.random()-.5)*0.6;

    }

    update(engine){

        this.x+=this.speedX;

        this.y+=this.speedY;

        if(this.x<0||this.x>engine.width){

            this.speedX*=-1;

        }

        if(this.y<0||this.y>engine.height){

            this.speedY*=-1;

        }

        if(engine.mouse.x){

            const dx=this.x-engine.mouse.x;

            const dy=this.y-engine.mouse.y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<engine.mouse.radius){

                const angle=Math.atan2(dy,dx);

                const force=

                (engine.mouse.radius-dist)/engine.mouse.radius;

                this.x+=Math.cos(angle)*force*5;

                this.y+=Math.sin(angle)*force*5;

            }

        }

    }

    draw(ctx){

        ctx.beginPath();

        ctx.fillStyle="#0B2E6D";

        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI*2

        );

        ctx.fill();

    }

}