import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

const GalaxyCanvas = () => {
    const canvasRef = useRef(null);
    const { analyzer, isPlaying } = usePlayer();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimization
        let animationFrameId;

        // Configuration
        const STAR_COUNT = 2500;
        const ARM_COUNT = 3;
        const GALAXY_THICKNESS = 0.3;

        // Audio Data Smoothing
        const freqData = new Uint8Array(analyzer?.frequencyBinCount || 128);
        let audioLevel = 0;
        let bassLevel = 0;
        let midLevel = 0;

        // Mouse State
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        // Colors
        const colors = [
            { r: 100, g: 100, b: 255 }, // Electric Blue
            { r: 200, g: 100, b: 255 }, // Deep Violet
            { r: 255, g: 255, b: 255 }, // White
            { r: 255, g: 200, b: 150 }, // Soft Gold
            { r: 50, g: 20, b: 100 }    // Dark Nebula
        ];

        // State
        const stars = [];
        const shootingStars = [];
        let width = 0;
        let height = 0;
        let rotation = 0;

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                const distance = Math.pow(Math.random(), 1.5);
                const angle = Math.random() * Math.PI * 2;

                const armOffset = (Math.random() * 2 * Math.PI) / ARM_COUNT;
                const spiralAngle = distance * 6 + armOffset + (Math.random() - 0.5) * 0.5;

                this.x = Math.cos(spiralAngle) * distance;
                this.y = Math.sin(spiralAngle) * distance;
                this.z = (Math.random() - 0.5) * GALAXY_THICKNESS * (1 - distance) + (Math.random() - 0.5) * 0.1;

                this.distance = distance;
                this.baseSize = 0.5 + Math.random() * 2;
                this.size = this.baseSize;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 0.1 + Math.random() * 0.8;

                this.twinkleSpeed = 0.02 + Math.random() * 0.04;
                this.twinklePhase = Math.random() * Math.PI * 2;
            }

            draw(ctx, centerX, centerY, scale, rot, tiltX, tiltY, reactivity) {
                const cosR = Math.cos(rot);
                const sinR = Math.sin(rot);

                let x = this.x * cosR - this.y * sinR;
                let y = this.x * sinR + this.y * cosR;
                let z = this.z;

                const cosTx = Math.cos(tiltY * 0.2);
                const sinTx = Math.sin(tiltY * 0.2);
                let y1 = y * cosTx - z * sinTx;
                let z1 = y * sinTx + z * cosTx;
                y = y1;
                z = z1;

                const cosTy = Math.cos(tiltX * 0.2);
                const sinTy = Math.sin(tiltX * 0.2);
                let x1 = x * cosTy - z * sinTy;
                let z2 = x * sinTy + z * cosTy;
                x = x1;
                z = z2;

                const fov = 600;
                const scaleProj = fov / (fov + z * 400 + 400);

                const screenX = centerX + x * width * 0.5 * scaleProj;
                const screenY = centerY + y * width * 0.5 * scaleProj;

                if (scaleProj < 0) return;

                this.twinklePhase += this.twinkleSpeed * (1 + reactivity * 2);
                const twinkle = Math.sin(this.twinklePhase);
                const currentAlpha = this.alpha * (0.6 + 0.4 * twinkle) * (1 + reactivity * 0.5);
                const currentSize = this.baseSize * scaleProj * (1 + reactivity * 0.8);

                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha})`;
                ctx.beginPath();
                ctx.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
                ctx.fill();

                if (this.baseSize > 1.5) {
                    ctx.shadowBlur = 10 * scaleProj * (1 + reactivity);
                    ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha * 0.5})`;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = (Math.random() - 0.5) * width * 1.5;
                this.y = (Math.random() - 0.5) * height * 1.5;
                this.z = Math.random() * 200;
                this.vx = 4 + Math.random() * 4;
                this.vy = 2 + Math.random() * 2;
                this.length = 0;
                this.maxLength = 50 + Math.random() * 50;
                this.life = 1;
                this.active = false;
            }

            update() {
                if (!this.active) {
                    if (Math.random() < 0.005) {
                        this.reset();
                        this.active = true;
                        this.x = (Math.random() * width) - width * 0.5;
                        this.y = -height * 0.6;
                    }
                    return;
                }

                this.x += this.vx;
                this.y += this.vy;
                this.length = Math.min(this.length + 2, this.maxLength);
                this.life -= 0.01;

                if (this.life <= 0 || this.x > width || this.y > height) {
                    this.active = false;
                }
            }

            draw(ctx, centerX, centerY) {
                if (!this.active) return;

                const sx = centerX + this.x;
                const sy = centerY + this.y;

                const grad = ctx.createLinearGradient(sx, sy, sx - this.vx * 3, sy - this.vy * 3);
                grad.addColorStop(0, 'rgba(255,255,255,1)');
                grad.addColorStop(1, 'rgba(255,255,255,0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx - this.vx * 3 * (this.length / 10), sy - this.vy * 3 * (this.length / 10));
                ctx.stroke();
            }
        }

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        };

        const init = () => {
            handleResize();
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
            for (let i = 0; i < 3; i++) {
                shootingStars.push(new ShootingStar());
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.05 });
        observer.observe(canvas);

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // --- AUDIO ANALYSIS ---
            if (analyzer && isPlaying) {
                analyzer.getByteFrequencyData(freqData);

                // Get average of bass, mid, and overall
                let bassTotal = 0;
                for (let i = 0; i < 10; i++) bassTotal += freqData[i];
                bassLevel = (bassTotal / 10) / 255;

                let midTotal = 0;
                for (let i = 20; i < 40; i++) midTotal += freqData[i];
                midLevel = (midTotal / 20) / 255;

                let total = 0;
                for (let i = 0; i < freqData.length; i++) total += freqData[i];
                audioLevel = (total / freqData.length) / 255;
            } else {
                // Decay levels if not playing
                audioLevel *= 0.95;
                bassLevel *= 0.95;
                midLevel *= 0.95;
            }

            targetRotationX += (mouseY - targetRotationX) * 0.05;
            targetRotationY += (mouseX - targetRotationY) * 0.05;

            ctx.fillStyle = '#030305';
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Dynamic Nebula Gradient
            const nebula = ctx.createRadialGradient(
                centerX + Math.sin(rotation) * 100,
                centerY + Math.cos(rotation) * 50,
                0,
                centerX,
                centerY,
                width * (0.8 + audioLevel * 0.2)
            );
            nebula.addColorStop(0, `rgba(45, 20, 80, ${0.2 + audioLevel * 0.1})`);
            nebula.addColorStop(0.4, `rgba(10, 20, 60, ${0.1 + audioLevel * 0.05})`);
            nebula.addColorStop(1, 'transparent');
            ctx.fillStyle = nebula;
            ctx.fillRect(0, 0, width, height);

            rotation += 0.0003 + (bassLevel * 0.002);

            stars.sort((a, b) => a.z - b.z);
            stars.forEach(star => {
                star.draw(ctx, centerX, centerY, 1, rotation, targetRotationY, targetRotationX, audioLevel);
            });

            shootingStars.forEach(ss => {
                ss.update();
                ss.draw(ctx, centerX, centerY);
            });

            const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100 + audioLevel * 50);
            core.addColorStop(0, `rgba(200, 220, 255, ${0.05 + midLevel * 0.1})`);
            core.addColorStop(1, 'transparent');
            ctx.fillStyle = core;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        init();
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default GalaxyCanvas;
