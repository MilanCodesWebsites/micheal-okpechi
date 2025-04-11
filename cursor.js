
        // Get cursor elements
        const cursorOuter = document.querySelector('.cursor-outer');
        const cursorInner = document.querySelector('.cursor-inner');
        const trailElements = [];
        const maxTrails = 5;
        
        // Track mouse position
        let mouseX = 0;
        let mouseY = 0;
        let innerX = 0;
        let innerY = 0;
        let outerX = 0;
        let outerY = 0;
        
        // Update mouse position on mouse move
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trail element
            createTrailElement(mouseX, mouseY);
        });
        
        // Create trail element
        function createTrailElement(x, y) {
            // Only create trails if we're on desktop
            if (window.innerWidth <= 768) return;
            
            // Limit the number of trails
            if (trailElements.length >= maxTrails) {
                const oldestTrail = trailElements.shift();
                if (oldestTrail && oldestTrail.parentNode) {
                    oldestTrail.parentNode.removeChild(oldestTrail);
                }
            }
            
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            document.body.appendChild(trail);
            
            // Add to array
            trailElements.push(trail);
            
            // Fade out and remove
            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                        const index = trailElements.indexOf(trail);
                        if (index > -1) {
                            trailElements.splice(index, 1);
                        }
                    }
                }, 500);
            }, 100);
        }
        
        // Create ripple effect on click
        function createRippleEffect(x, y) {
            // Only create ripple if we're on desktop
            if (window.innerWidth <= 768) return;
            
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            document.body.appendChild(ripple);
            
            // Remove after animation completes
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 800);
        }
        
        // Create particles on click
        function createClickParticles(x, y) {
            // Only create particles if we're on desktop
            if (window.innerWidth <= 768) return;
            
            const particleCount = 8;
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'click-particle';
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // Random size between 3px and 6px
                const size = Math.random() * 3 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random color variations of green
                const hue = 120 + Math.random() * 20 - 10; // Green hue with slight variation
                const saturation = 60 + Math.random() * 20;
                const lightness = 40 + Math.random() * 20;
                particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                
                // Random direction and speed
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                // Store velocity and other properties
                particle.vx = vx;
                particle.vy = vy;
                particle.gravity = 9.8;
                particle.life = 100;
                
                document.body.appendChild(particle);
                particles.push(particle);
            }
            
            // Animate particles
            function animateParticles() {
                let hasActiveParticles = false;
                
                particles.forEach(particle => {
                    if (particle.life > 0) {
                        hasActiveParticles = true;
                        
                        // Update position
                        const currentX = parseFloat(particle.style.left);
                        const currentY = parseFloat(particle.style.top);
                        
                        // Apply gravity
                        particle.vy += particle.gravity * 0.016; // 0.016 is roughly 60fps
                        
                        // Update position
                        particle.style.left = `${currentX + particle.vx * 0.016}px`;
                        particle.style.top = `${currentY + particle.vy * 0.016}px`;
                        
                        // Reduce life and opacity
                        particle.life -= 1;
                        particle.style.opacity = particle.life / 100;
                    } else if (particle.parentNode) {
                        // Remove dead particles
                        particle.parentNode.removeChild(particle);
                    }
                });
                
                // Continue animation if particles are still active
                if (hasActiveParticles) {
                    requestAnimationFrame(animateParticles);
                }
            }
            
            // Start animation
            animateParticles();
        }
        
        // Animate cursor with smooth following effect
        function animateCursor() {
            // Calculate smooth movement
            const easingFactor = 0.15;
            
            innerX += (mouseX - innerX) * easingFactor * 1.5;
            innerY += (mouseY - innerY) * easingFactor * 1.5;
            
            outerX += (mouseX - outerX) * easingFactor;
            outerY += (mouseY - outerY) * easingFactor;
            
            // Apply position
            cursorInner.style.transform = `translate(${innerX}px, ${innerY}px) translate(-50%, -50%)`;
            cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
            
            // Continue animation
            requestAnimationFrame(animateCursor);
        }
        
        // Start animation
        animateCursor();
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorInner.classList.add('cursor-hover');
                cursorOuter.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorInner.classList.remove('cursor-hover');
                cursorOuter.classList.remove('cursor-hover');
            });
        });
        
        // Add click effect
        document.addEventListener('mousedown', (e) => {
            cursorInner.classList.add('cursor-click');
            cursorOuter.classList.add('cursor-click');
            
            // Create ripple and particles at click position
            createRippleEffect(e.clientX, e.clientY);
            createClickParticles(e.clientX, e.clientY);
        });
        
        document.addEventListener('mouseup', () => {
            cursorInner.classList.remove('cursor-click');
            cursorOuter.classList.remove('cursor-click');
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            cursorInner.style.opacity = '0';
            cursorOuter.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorInner.style.opacity = '1';
            cursorOuter.style.opacity = '1';
        });
