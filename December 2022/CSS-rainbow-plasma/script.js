$(window).bind('load', function () {

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    const raf = function (entry) {
        window.requestAnimFrame(entry);
    };
    const caf = function (entry) {
        window.cancelAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
    const min = function (arr) {
        return Math.min.apply(Math, arr);
    }
    const max = function (arr) {
        return Math.max.apply(Math, arr);
    }
    const cl = function (entry) {
        console.log(entry);
    }
    var container = $('#container'),

        legend = $('#legend'),
        legendClose = $('#legend-close'),

        colorOverlay,
        c = document.getElementById('c'),
        cx = c.getContext('2d'),

        fps = 60,
        now,
        then = Date.now(),
        interval = 1000 / fps,
        delta,

        request,
        Particle,
        particles = {},
        particleNum = 5,
        particleIndex = 0,
        mouseX = null,
        mouseY = null,
        lastMouseX = null,
        lastMouseY = null,
        hue = 0,
        cbg = {
            rgb: '0,0,0',
            h: hue,
            s: 100,
            l: 50,
            a: 0.6
        },
        gravity = 0.5,
        gravityInc = 0.01,
        yVelocity = 5,
        yVelocityInc = 3,
        yVelocityMax = 20,
        yVelocityMin = yVelocityMax * -1,
        beingPressed = false,
        beingTouched = false,
        particlesRendered = false,
        legendBeingHovered = false

    TweenMax.set(container, {
        opacity: 1
    });

    container.prepend(`
        <div id="color-overlay"></div>
    `);

    colorOverlay = $('#color-overlay');

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height;

    cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
    cx.fillRect(0, 0, w, h);

    lastMouseX = w * 0.5;
    lastMouseY = h * 0.25;

    TweenMax.set(legend, {
        userSelect: 'none'
    })


    function drawCanvas() {

        Particle = function () {
            this.w = random(20, 150);
            this.h = this.w;
            this.r = this.w / 2;
            this.shrinkRate = 0.75;
            this.rMax = 50;
            this.xPosition = random(1, 4);
            this.x = beingPressed ? mouseX : lastMouseX;
            this.y = beingPressed ? mouseY : lastMouseY;
            this.xVelocityIsNegative = random(1, 2);
            this.xAug = random(-20, 20) * 0.05;
            this.xAugMult = random(1, 10);
            this.yAug = random(10, 20) * 0.05;
            this.interval = random(1, 10)
            this.hue = hue;
            this.saturation = 100;
            this.light = 52;
            this.opacity = 1;
            this.speed = 0;
            this.opacitySpeed = 5;
            this.lightSpeed = 0.25;
            this.counter = 0;
            this.counterInc = 0.1;
            this.xVelocityInit = random(1, 35) * 0.1;
            this.xVelocity = this.xVelocityIsNegative === 1 ? this.xVelocityInit *= -1 : this.xVelocityInit;
            this.xVelocityMult = random(10, 40) * 0.1;
            this.yVelocityInit = yVelocity;
            this.yVelocity = random(-10, -5) + this.yVelocityInit;
            this.yVelocityMult = random(2, 6) * 0.1;
            this.yVelocityChanged = false;
            this.gravity = 1;
            this.xVelocityChanged = false;
            this.bouncedOnce = false;

            particles[particleIndex] = this;
            this.id = particleIndex;
            particleIndex++;
        }

        Particle.prototype.draw = function () {

            this.counter += this.counterInc;
            if (this.bouncedOnce) {
                this.light += this.lightSpeed;
                this.lightSpeed *= 1.025;
            }
            this.r -= this.shrinkRate;

            this.x += this.xVelocity;
            this.y += this.yVelocity;

            this.speed *= 0.99;
            this.opacitySpeed *= 0.975;
            if (this.opacity < 0.01 || this.r < 1 || (this.x < 0 - this.r || this.x > w + this.r)) {
                delete particles[this.id];
            }

            if (this.y > window.innerHeight * 0.9 - this.r) {
                if (!this.bouncedOnce) {
                    this.xVelocity *= this.xVelocityMult
                } else {
                    this.xVelocity *= 0.9
                }
                this.yVelocity *= -this.yVelocityMult;
                this.y = window.innerHeight * 0.9 - this.r;
                this.bouncedOnce = true;
                this.yVelocityChanged = true;
                this.xVelocityChanged = true;
            }

            this.yVelocity += this.gravity;

            cx.beginPath();
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            cx.fill();

        }

        function render() {

            request = requestAnimFrame(render);

            now = Date.now();
            delta = now - then;

            if (delta > interval) {

                then = now - (delta % interval);

                $(window).resize(function () {
                    c.width = $('#c').outerWidth();
                    c.height = $('#c').outerHeight();
                    w = c.width;
                    h = c.height;
                });
                cx.globalCompositeOperation = 'source-over';
                cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
                cx.fillRect(0, 0, w, h);
                if (!particlesRendered) {
                    //                particlesRendered = true;
                    for (var i = 0; i < particleNum; i++) {
                        new Particle();
                    }
                }

                cx.globalCompositeOperation = 'lighter';

                for (var i in particles) {
                    particles[i].draw();
                }
                if (hue > 360) {
                    hue = 0;
                }

                hue++;


            }
        }

        render();

    }

    drawCanvas();

    window.addEventListener('mousemove', mouseCoord, false);

    function mouseCoord(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function checkMouseDown() {
        container.on('mousedown', function () {
            if (!legendBeingHovered) {
                beingPressed = true;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        });
        container.on('mouseup', function () {
            if (!legendBeingHovered) {
                beingPressed = false;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        });
    }

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        lastMouseX = touch.pageX;
        lastMouseY = touch.pageY;
    }, false);

    checkMouseDown();

    legendClose.on('mouseover', function () {
        var current = $(this)
        beingPressed = false;
        legendBeingHovered = true;

        TweenMax.to(current, 0.5, {
            backgroundColor: 'rgba(255,255,255,0.3)',
            ease: Expo.easeOut
        }, 0);
    });

    legendClose.on('mouseout', function () {
        var current = $(this)
        legendBeingHovered = false;

        TweenMax.to(current, 0.5, {
            backgroundColor: 'rgba(255,255,255,0.1)',
            ease: Expo.easeOut
        }, 0);
    });

    legendClose.on('click', function () {

        TweenMax.to(legend, 0.5, {
            height: 0,
            ease: Quad.easeInOut,
            onComplete: function () {
                legend.hide();
                legendBeingHovered = false;
            }
        });
    });

    function scrollUpActions() {
        if (yVelocity > yVelocityMin) {
            yVelocity -= yVelocityInc;
        }
    }

    function scrollDownActions() {
        if (yVelocity < yVelocityMax) {
            yVelocity += yVelocityInc;
        }
    }

    container.bind('DOMMouseScroll', function (e) {
        if (e.originalEvent.detail > 0) {
            //scroll down
            scrollDownActions();
        } else {
            //scroll up
            scrollUpActions();
        }

        //prevent page fom scrolling
        return false;
    });

    //IE, Opera, Safari
    container.bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta < 0) {
            //scroll down
            scrollDownActions();
        } else {
            //scroll up
            scrollUpActions();
        }

        //prevent page fom scrolling
        return false;
    });

    if (((/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) && (!(/iPad/i.test(navigator.userAgent)))) || ((!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) && (/iPad/i.test(navigator.userAgent)))) {
        legend.hide();
    } else {
        legend.show();
    }
});
