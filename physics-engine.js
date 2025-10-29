/**
 * Observer Reality Physics Engine
 *
 * Reusable particle physics simulation with:
 * - Real thermodynamics (entropy, temperature, free energy)
 * - Observer-dependent rendering
 * - Live telemetry and metrics
 * - Canvas rendering with LOD optimization
 *
 * @author Jacob Edwards | Elemental Insights
 * @license MIT
 */

class ObserverPhysicsEngine {
    constructor(canvasId, config = {}) {
        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        // Configuration
        this.config = {
            populationSize: config.populationSize || 100,
            observerType: config.observerType || 'quantum',
            enableTelemetry: config.enableTelemetry !== false,
            ...config
        };

        // State
        this.particles = [];
        this.connections = [];
        this.isPlaying = false;
        this.animationFrameId = null;
        this.frameCount = 0;
        this.evolutionSpeed = 1;
        this.computationalBudget = 100;

        // Telemetry
        this.telemetry = {
            fps: 0,
            particleCount: 0,
            connectionCount: 0,
            entropy: 0,
            temperature: 0,
            kineticEnergy: 0,
            potentialEnergy: 0,
            totalEnergy: 0,
            uncertainty: 0,
            networkDensity: 0,
            freeEnergy: 0,
            spatialSpread: 0,
            avgVelocity: 0,
            infoDeficit: 0,
            computationalCost: 0
        };

        // Observer configurations
        this.observerConfigs = {
            quantum: {
                name: '🌀 Quantum Observer',
                color: '#9b59b6',
                particleSize: 3,
                connectionDistance: 100,
                showGhosts: true
            },
            classical: {
                name: '🎯 Classical Observer',
                color: '#3498db',
                particleSize: 5,
                connectionDistance: 150,
                showTrails: true
            },
            social: {
                name: '🌐 Social Observer',
                color: '#27ae60',
                particleSize: 6,
                connectionDistance: 120,
                clusterCount: 5
            },
            conscious: {
                name: '🧠 Conscious Observer',
                color: '#e67e22',
                particleSize: 4,
                connectionDistance: 110
            },
            ai: {
                name: '🤖 AI Observer',
                color: '#1abc9c',
                particleSize: 3,
                connectionDistance: 90
            },
            thermodynamic: {
                name: '🔥 Thermodynamic Observer',
                color: '#e74c3c',
                particleSize: 5,
                connectionDistance: 100,
                showHeatFlow: true
            },
            relativistic: {
                name: '⚡ Relativistic Observer',
                color: '#f39c12',
                particleSize: 4,
                connectionDistance: 80,
                speedOfLight: 5
            },
            probabilistic: {
                name: '🎲 Probabilistic Observer',
                color: '#16a085',
                particleSize: 4,
                connectionDistance: 100,
                showUncertainty: true
            }
        };

        this.initCanvas();
        this.createParticles();
    }

    // ===== INITIALIZATION =====
    initCanvas() {
        const container = this.canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        this.ctx.scale(dpr, dpr);

        this.width = width;
        this.height = height;
    }

    createParticles() {
        const config = this.observerConfigs[this.config.observerType];

        this.particles = Array.from({length: this.config.populationSize}, (_, i) => {
            const cluster = config.clusterCount ? Math.floor(Math.random() * config.clusterCount) : 0;

            // Social observer: spawn clusters in regions
            let x, y;
            if (this.config.observerType === 'social' && config.clusterCount) {
                const cols = Math.ceil(Math.sqrt(config.clusterCount));
                const regionWidth = this.width / cols;
                const regionHeight = this.height / Math.ceil(config.clusterCount / cols);
                const regionX = (cluster % cols) * regionWidth;
                const regionY = Math.floor(cluster / cols) * regionHeight;
                x = regionX + Math.random() * regionWidth;
                y = regionY + Math.random() * regionHeight;
            } else {
                x = Math.random() * this.width;
                y = Math.random() * this.height;
            }

            const particle = {
                id: i,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                cluster: cluster,
                trail: [],
                predictedX: x,
                predictedY: y,
                predictionError: 0
            };

            // Thermodynamic observer: track temperature
            if (this.config.observerType === 'thermodynamic') {
                particle.temperature = Math.random() * 100 + 50;
                particle.heatCapacity = 1.0;
            }

            // Relativistic observer: track proper time and gamma factor
            if (this.config.observerType === 'relativistic') {
                particle.properTime = 0;
                particle.restMass = 1.0;
            }

            // Probabilistic observer: track probability distribution
            if (this.config.observerType === 'probabilistic') {
                particle.probability = 1.0 / this.config.populationSize;
                particle.variance = 10.0;
            }

            return particle;
        });

        // Assign cluster colors
        if (config.clusterCount) {
            const clusterColors = ['#ff4757', '#3498db', '#2ecc71', '#ffa502', '#9b59b6'];
            this.particles.forEach(p => {
                p.color = clusterColors[p.cluster % clusterColors.length];
            });
        }
    }

    // ===== PHYSICS CALCULATIONS =====
    calculateTelemetry() {
        const particles = this.particles;
        const config = this.observerConfigs[this.config.observerType];

        // 1. SHANNON ENTROPY
        let entropy = 0;
        if (particles.length > 0) {
            const gridResolution = Math.max(5, Math.floor(20 * (this.computationalBudget / 100)));
            const cellWidth = this.width / gridResolution;
            const cellHeight = this.height / gridResolution;
            const grid = new Array(gridResolution * gridResolution).fill(0);

            particles.forEach(p => {
                const cellX = Math.min(Math.floor(p.x / cellWidth), gridResolution - 1);
                const cellY = Math.min(Math.floor(p.y / cellHeight), gridResolution - 1);
                const cellIndex = cellY * gridResolution + cellX;
                grid[cellIndex]++;
            });

            const totalParticles = particles.length;
            grid.forEach(count => {
                if (count > 0) {
                    const probability = count / totalParticles;
                    entropy -= probability * Math.log2(probability);
                }
            });

            const maxEntropy = Math.log2(gridResolution * gridResolution);
            const observerUncertainty = (100 - this.computationalBudget) / 100;
            entropy = entropy + (maxEntropy - entropy) * observerUncertainty;
        }

        // 2. HEISENBERG UNCERTAINTY
        let posVariance = 0;
        let velVariance = 0;

        if (particles.length > 1) {
            const meanX = particles.reduce((sum, p) => sum + p.x, 0) / particles.length;
            const meanY = particles.reduce((sum, p) => sum + p.y, 0) / particles.length;
            const meanVx = particles.reduce((sum, p) => sum + p.vx, 0) / particles.length;
            const meanVy = particles.reduce((sum, p) => sum + p.vy, 0) / particles.length;

            posVariance = particles.reduce((sum, p) => {
                const dx = p.x - meanX;
                const dy = p.y - meanY;
                return sum + (dx * dx + dy * dy);
            }, 0) / particles.length;

            velVariance = particles.reduce((sum, p) => {
                const dvx = p.vx - meanVx;
                const dvy = p.vy - meanVy;
                return sum + (dvx * dvx + dvy * dvy);
            }, 0) / particles.length;

            const measurementError = 1 + (100 - this.computationalBudget) / 50;
            posVariance *= measurementError;
            velVariance *= measurementError;
        }

        const uncertainty = Math.sqrt(posVariance) * Math.sqrt(velVariance);

        // 3. KINETIC ENERGY (with proper ½ factor!)
        const kineticEnergy = particles.reduce((sum, p) => {
            return sum + 0.5 * (p.vx * p.vx + p.vy * p.vy);
        }, 0) / Math.max(1, particles.length);

        // 4. TEMPERATURE
        const temperature = Math.sqrt(kineticEnergy) * 0.1;

        // 5. POTENTIAL ENERGY
        let potentialEnergy = 0;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.connectionDistance) {
                    potentialEnergy -= 1.0 / (dist + 1);
                }
                if (dist < 20) {
                    potentialEnergy += 10.0 / (dist + 1);
                }
            }
        }
        potentialEnergy /= Math.max(1, particles.length);

        // 6. FREE ENERGY
        const freeEnergy = potentialEnergy - temperature * entropy * 0.01;

        // 7. TOTAL ENERGY
        const totalEnergy = kineticEnergy + potentialEnergy;

        // 8. NETWORK DENSITY
        const maxConnections = particles.length * (particles.length - 1) / 2;
        const density = maxConnections > 0 ? this.connections.length / maxConnections : 0;

        // 9. COMPUTATIONAL COST
        const complexity = particles.length * particles.length;

        // 10. SPATIAL SPREAD
        let spatialSpread = 0;
        if (particles.length > 0) {
            const centerX = particles.reduce((sum, p) => sum + p.x, 0) / particles.length;
            const centerY = particles.reduce((sum, p) => sum + p.y, 0) / particles.length;
            const sumSquaredDist = particles.reduce((sum, p) => {
                const dx = p.x - centerX;
                const dy = p.y - centerY;
                return sum + (dx * dx + dy * dy);
            }, 0);
            spatialSpread = Math.sqrt(sumSquaredDist / particles.length);
        }

        // 11. INFO DEFICIT
        const gridResolution = Math.max(5, Math.floor(20 * (this.computationalBudget / 100)));
        const maxEntropy = Math.log2(gridResolution * gridResolution);
        const infoDeficit = maxEntropy - entropy;

        // 12. AVERAGE VELOCITY
        let avgVelocity = 0;
        if (particles.length > 0) {
            const totalSpeed = particles.reduce((sum, p) => {
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                return sum + speed;
            }, 0);
            avgVelocity = totalSpeed / particles.length;
        }

        // Update telemetry
        this.telemetry = {
            fps: this.telemetry.fps, // Updated separately
            particleCount: particles.length,
            connectionCount: this.connections.length,
            entropy: entropy,
            temperature: temperature,
            kineticEnergy: kineticEnergy,
            potentialEnergy: potentialEnergy,
            totalEnergy: totalEnergy,
            uncertainty: uncertainty,
            networkDensity: density,
            freeEnergy: freeEnergy,
            spatialSpread: spatialSpread,
            avgVelocity: avgVelocity,
            infoDeficit: infoDeficit,
            computationalCost: complexity
        };

        return this.telemetry;
    }

    // ===== CONNECTION CALCULATION (Spatial Grid Optimized) =====
    updateConnections() {
        const config = this.observerConfigs[this.config.observerType];
        const links = [];
        const MAX_CONNECTIONS = 2000;

        // Spatial grid optimization - O(N) instead of O(N²)
        const cellSize = config.connectionDistance;
        const grid = {};

        this.particles.forEach(p => {
            const cellX = Math.floor(p.x / cellSize);
            const cellY = Math.floor(p.y / cellSize);
            const cellKey = `${cellX},${cellY}`;
            if (!grid[cellKey]) grid[cellKey] = [];
            grid[cellKey].push(p);
        });

        // Check only nearby cells
        this.particles.forEach(p => {
            const cellX = Math.floor(p.x / cellSize);
            const cellY = Math.floor(p.y / cellSize);

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const neighborKey = `${cellX + dx},${cellY + dy}`;
                    const neighbors = grid[neighborKey] || [];

                    neighbors.forEach(neighbor => {
                        if (p.id < neighbor.id) {
                            const deltaX = p.x - neighbor.x;
                            const deltaY = p.y - neighbor.y;
                            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                            if (distance < config.connectionDistance && distance > 0) {
                                links.push({
                                    source: p,
                                    target: neighbor,
                                    distance: distance
                                });

                                if (links.length >= MAX_CONNECTIONS) return;
                            }
                        }
                    });

                    if (links.length >= MAX_CONNECTIONS) break;
                }
                if (links.length >= MAX_CONNECTIONS) break;
            }
        });

        this.connections = links;
        return links;
    }

    // ===== PHYSICS UPDATE =====
    updatePhysics() {
        const config = this.observerConfigs[this.config.observerType];

        // Thermodynamic evolution
        if (this.isPlaying) {
            // Build spatial grid for forces
            const forceRange = config.connectionDistance * 0.5;
            const forceGrid = {};

            this.particles.forEach(p => {
                const cellX = Math.floor(p.x / forceRange);
                const cellY = Math.floor(p.y / forceRange);
                const cellKey = `${cellX},${cellY}`;
                if (!forceGrid[cellKey]) forceGrid[cellKey] = [];
                forceGrid[cellKey].push(p);
            });

            // Apply repulsive forces (entropy increase!)
            this.particles.forEach(p => {
                let fx = 0, fy = 0;
                const cellX = Math.floor(p.x / forceRange);
                const cellY = Math.floor(p.y / forceRange);

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const neighborKey = `${cellX + dx},${cellY + dy}`;
                        const neighbors = forceGrid[neighborKey] || [];

                        neighbors.forEach(other => {
                            if (p.id !== other.id) {
                                const deltaX = p.x - other.x;
                                const deltaY = p.y - other.y;
                                const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                                if (dist < forceRange && dist > 0) {
                                    const force = 0.01 * this.evolutionSpeed / (dist + 1);
                                    fx += (deltaX / dist) * force;
                                    fy += (deltaY / dist) * force;
                                }
                            }
                        });
                    }
                }

                // Thermal noise
                const thermalNoise = 0.02 * this.evolutionSpeed;
                fx += (Math.random() - 0.5) * thermalNoise;
                fy += (Math.random() - 0.5) * thermalNoise;

                p.vx += fx;
                p.vy += fy;

                // Damping (energy dissipation)
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Cap velocity
                const maxVel = 3;
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (vel > maxVel) {
                    p.vx = (p.vx / vel) * maxVel;
                    p.vy = (p.vy / vel) * maxVel;
                }
            });
        }

        // Update positions
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;

            // Keep in bounds
            p.x = Math.max(0, Math.min(this.width, p.x));
            p.y = Math.max(0, Math.min(this.height, p.y));

            // Update trails for classical observer
            if (this.config.observerType === 'classical') {
                if (!p.trail) p.trail = [];
                p.trail.push({x: p.x, y: p.y});
                if (p.trail.length > 30) p.trail.shift();
            }

            // Update predictions for conscious observer
            if (this.config.observerType === 'conscious') {
                if (!p.predictedX) {
                    p.predictedX = p.x;
                    p.predictedY = p.y;
                    p.predictionError = 0;
                }

                // Calculate error between PREVIOUS prediction and ACTUAL current position
                const error = Math.sqrt((p.predictedX - p.x)**2 + (p.predictedY - p.y)**2);

                // Store error with decay (for smooth color transitions)
                p.predictionError = error * 0.7 + p.predictionError * 0.3;

                // Make NEW prediction for next frame
                p.predictedX = p.x + p.vx;
                p.predictedY = p.y + p.vy;

                // Add occasional environmental surprises (creates prediction errors!)
                if (Math.random() < 0.05) { // 5% chance
                    const shockX = (Math.random() - 0.5) * 5;
                    const shockY = (Math.random() - 0.5) * 5;
                    p.vx += shockX;
                    p.vy += shockY;
                }
            }

            // Thermodynamic observer: heat diffusion
            if (this.config.observerType === 'thermodynamic') {
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                p.temperature = p.temperature * 0.99 + vel * 10; // Kinetic energy → temperature

                // Heat dissipation
                p.temperature = p.temperature * 0.98 + 50 * 0.02; // Cool toward ambient
            }

            // Relativistic observer: time dilation and speed limit
            if (this.config.observerType === 'relativistic') {
                const c = config.speedOfLight;
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

                // Enforce speed of light limit
                if (vel > c) {
                    const factor = c / vel;
                    p.vx *= factor;
                    p.vy *= factor;
                }

                // Calculate Lorentz factor: γ = 1/√(1 - v²/c²)
                const gamma = 1 / Math.sqrt(1 - (vel * vel) / (c * c));
                p.properTime = (p.properTime || 0) + (1 / gamma); // Time dilation!
            }

            // Probabilistic observer: Bayesian update
            if (this.config.observerType === 'probabilistic') {
                // Update probability based on "measurements" (velocity changes)
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const likelihood = Math.exp(-vel * 0.5); // Slower = more likely
                p.probability = p.probability * 0.95 + likelihood * 0.05;

                // Update variance (uncertainty)
                p.variance = p.variance * 0.98 + Math.abs(vel - 1.5) * 0.02;
            }
        });
    }

    // ===== RENDERING =====
    render() {
        const config = this.observerConfigs[this.config.observerType];

        // Clear canvas
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update connections
        const links = this.updateConnections();

        // Draw connections
        this.ctx.strokeStyle = config.color;
        this.ctx.globalAlpha = 0.3;
        this.ctx.lineWidth = 1;

        links.forEach(link => {
            // Social: only same cluster
            if (this.config.observerType === 'social' && link.source.cluster !== link.target.cluster) return;

            // AI: variable thickness
            if (this.config.observerType === 'ai') {
                const strength = 1 - (link.distance / config.connectionDistance);
                this.ctx.lineWidth = 0.5 + strength * 5.5;
            }

            this.ctx.beginPath();
            this.ctx.moveTo(link.source.x, link.source.y);
            this.ctx.lineTo(link.target.x, link.target.y);
            this.ctx.stroke();
        });
        this.ctx.globalAlpha = 1;

        // Draw observer-specific effects
        this.renderObserverEffects(config);

        // Draw particles
        this.renderParticles(config);
    }

    renderObserverEffects(config) {
        // Quantum ghosts
        if (this.config.observerType === 'quantum') {
            this.particles.forEach(p => {
                for (let i = 0; i < 2; i++) {
                    const angle = (i / 2) * Math.PI * 2 + this.frameCount * 0.02;
                    const radius = 20 + Math.sin(this.frameCount * 0.05 + i) * 12;
                    const gx = p.x + Math.cos(angle) * radius;
                    const gy = p.y + Math.sin(angle) * radius;

                    this.ctx.globalAlpha = 0.4;
                    this.ctx.fillStyle = config.color;
                    this.ctx.beginPath();
                    this.ctx.arc(gx, gy, config.particleSize, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            });
            this.ctx.globalAlpha = 1;
        }

        // Classical trails
        if (this.config.observerType === 'classical') {
            this.particles.forEach(p => {
                if (p.trail && p.trail.length > 1) {
                    for (let i = 1; i < p.trail.length; i++) {
                        const opacity = (i / p.trail.length) * 0.8;
                        this.ctx.strokeStyle = config.color;
                        this.ctx.globalAlpha = opacity;
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
                        this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
                        this.ctx.stroke();
                    }
                    this.ctx.globalAlpha = 1;
                }
            });
        }

        // Thermodynamic: heat flow visualization
        if (this.config.observerType === 'thermodynamic') {
            this.particles.forEach(p => {
                const temp = p.temperature || 50;
                const normalized = Math.max(0, Math.min(1, (temp - 20) / 150));

                // Glow effect for hot particles
                if (normalized > 0.5) {
                    const glowRadius = config.particleSize + (normalized * 15);
                    const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
                    gradient.addColorStop(0, `rgba(255, 100, 0, ${normalized * 0.3})`);
                    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            });
        }

        // Probabilistic: uncertainty circles
        if (this.config.observerType === 'probabilistic') {
            this.particles.forEach(p => {
                const variance = p.variance || 1;
                const radius = config.particleSize + variance * 3;

                this.ctx.strokeStyle = config.color;
                this.ctx.globalAlpha = 0.2;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                this.ctx.stroke();
            });
            this.ctx.globalAlpha = 1;
        }

        // Relativistic: light cones (optional, can be performance intensive)
        if (this.config.observerType === 'relativistic' && this.particles.length < 150) {
            this.particles.forEach(p => {
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (vel > 1) {
                    const angle = Math.atan2(p.vy, p.vx);
                    const coneLength = vel * 8;

                    this.ctx.strokeStyle = config.color;
                    this.ctx.globalAlpha = 0.15;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p.x - Math.cos(angle) * coneLength, p.y - Math.sin(angle) * coneLength);
                    this.ctx.stroke();
                }
            });
            this.ctx.globalAlpha = 1;
        }
    }

    renderParticles(config) {
        this.ctx.globalAlpha = 0.8;

        this.particles.forEach(p => {
            let fillColor = config.color;

            // Social: cluster colors
            if (this.config.observerType === 'social') {
                fillColor = p.color;
            }

            // Conscious: error-based coloring
            if (this.config.observerType === 'conscious') {
                const errorIntensity = Math.min(p.predictionError / 3, 1);
                if (errorIntensity > 0.5) {
                    fillColor = '#ff4757';
                } else if (errorIntensity > 0.2) {
                    fillColor = '#ffa502';
                } else {
                    fillColor = '#2ecc71';
                }
            }

            // Thermodynamic: temperature-based coloring (blue=cold, red=hot)
            if (this.config.observerType === 'thermodynamic') {
                const temp = p.temperature || 50;
                const normalized = Math.max(0, Math.min(1, (temp - 20) / 150));

                if (normalized < 0.33) {
                    fillColor = '#3498db'; // Blue (cold)
                } else if (normalized < 0.66) {
                    fillColor = '#f39c12'; // Orange (warm)
                } else {
                    fillColor = '#e74c3c'; // Red (hot)
                }
            }

            // Relativistic: gamma-based sizing (time dilation)
            let particleSize = config.particleSize;
            if (this.config.observerType === 'relativistic') {
                const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const c = config.speedOfLight;
                const beta = vel / c;

                // Color shift toward red as approaching speed of light (redshift!)
                const redshift = Math.min(beta, 0.9);
                const r = Math.floor(200 + redshift * 55);
                const g = Math.floor(150 * (1 - redshift));
                const b = Math.floor(50 * (1 - redshift));
                fillColor = `rgb(${r}, ${g}, ${b})`;

                // Size based on gamma factor (length contraction visualization)
                const gamma = 1 / Math.sqrt(1 - beta * beta);
                particleSize = config.particleSize / Math.min(gamma, 2);
            }

            // Probabilistic: opacity based on probability
            let particleAlpha = 0.8;
            if (this.config.observerType === 'probabilistic') {
                const prob = p.probability || 0.01;
                particleAlpha = Math.max(0.1, Math.min(1, prob * 100));

                // Size based on variance (uncertainty)
                const variance = p.variance || 1;
                particleSize = config.particleSize * (1 + variance * 0.1);
            }

            this.ctx.globalAlpha = particleAlpha;
            this.ctx.fillStyle = fillColor;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
            this.ctx.fill();

            // Social: white stroke
            if (this.config.observerType === 'social') {
                this.ctx.strokeStyle = 'white';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
        });

        this.ctx.globalAlpha = 1;
    }

    // ===== ANIMATION LOOP =====
    start() {
        if (this.animationFrameId) return;

        let lastTime = performance.now();
        let frameTimes = [];

        const animate = () => {
            // FPS calculation
            const now = performance.now();
            const delta = now - lastTime;
            lastTime = now;

            frameTimes.push(delta);
            if (frameTimes.length > 30) frameTimes.shift();

            if (this.frameCount % 10 === 0) {
                const avgDelta = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
                this.telemetry.fps = Math.round(1000 / avgDelta);
            }

            // Update physics
            this.updatePhysics();

            // Render
            this.render();

            // Calculate telemetry every 30 frames
            if (this.frameCount % 30 === 0) {
                this.calculateTelemetry();
            }

            this.frameCount++;
            this.animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    // ===== PUBLIC API =====
    setObserver(observerType) {
        const previousObserver = this.config.observerType;
        this.config.observerType = observerType;

        // Don't recreate particles - just update observer-specific properties!
        const config = this.observerConfigs[observerType];

        // Update cluster colors if switching to social
        if (observerType === 'social' && config.clusterCount) {
            const clusterColors = ['#ff4757', '#3498db', '#2ecc71', '#ffa502', '#9b59b6'];
            this.particles.forEach((p, i) => {
                p.cluster = i % config.clusterCount;
                p.color = clusterColors[p.cluster];
            });
        }

        // Clear trails when switching away from classical
        if (previousObserver === 'classical' && observerType !== 'classical') {
            this.particles.forEach(p => p.trail = []);
        }

        // Initialize trails when switching to classical
        if (observerType === 'classical') {
            this.particles.forEach(p => {
                if (!p.trail) p.trail = [];
            });
        }
    }

    setPopulation(size) {
        this.config.populationSize = size;
        this.createParticles();
    }

    setSpeed(speed) {
        this.evolutionSpeed = speed;
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        return this.isPlaying;
    }

    getTelemetry() {
        return this.telemetry;
    }

    addHeat(factor = 1.3) {
        this.particles.forEach(p => {
            p.vx *= factor;
            p.vy *= factor;
        });
    }

    removeHeat(factor = 0.7) {
        this.particles.forEach(p => {
            p.vx *= factor;
            p.vy *= factor;
        });
    }
}

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ObserverPhysicsEngine;
}
