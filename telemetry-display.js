/**
 * Live Telemetry Display Component
 *
 * Shows real-time physics calculations
 * Reusable across all visualization pages
 *
 * @author Jacob Edwards | Elemental Insights
 */

class TelemetryDisplay {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            title: config.title || '📊 Live Telemetry',
            updateInterval: config.updateInterval || 30,
            ...config
        };

        this.createHTML();
    }

    createHTML() {
        this.container.innerHTML = `
            <div style="background: rgba(10,14,39,0.95); border: 2px solid #2ecc71; padding: 20px; overflow-y: auto; max-height: 100%;">
                <h2 style="color: #2ecc71; font-size: 1.2em; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #2ecc71;">
                    ${this.config.title}
                </h2>

                <div class="telemetry-metrics">
                    <!-- Performance -->
                    <div class="metric-row">
                        <span class="metric-label">FPS:</span>
                        <span class="metric-value" id="telemetry-fps">60</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Particles (N):</span>
                        <span class="metric-value" id="telemetry-particles">0</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Connections (E):</span>
                        <span class="metric-value" id="telemetry-connections">0</span>
                    </div>

                    <div style="height: 1px; background: rgba(46,204,113,0.2); margin: 15px 0;"></div>

                    <!-- Thermodynamics -->
                    <div class="metric-row">
                        <span class="metric-label">Temperature (T):</span>
                        <span class="metric-value" id="telemetry-temperature">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Kinetic Energy (K):</span>
                        <span class="metric-value" id="telemetry-kinetic">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Potential Energy (U):</span>
                        <span class="metric-value" id="telemetry-potential">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Total Energy (E):</span>
                        <span class="metric-value" id="telemetry-total-energy">0.000</span>
                    </div>

                    <div style="height: 1px; background: rgba(46,204,113,0.2); margin: 15px 0;"></div>

                    <!-- Information Theory -->
                    <div class="metric-row">
                        <span class="metric-label">Shannon Entropy (H):</span>
                        <span class="metric-value" id="telemetry-entropy">0.000 bits</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Info Deficit (ΔH):</span>
                        <span class="metric-value" id="telemetry-info-deficit">0.000 bits</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Free Energy (F):</span>
                        <span class="metric-value" id="telemetry-free-energy">0.000</span>
                    </div>

                    <div style="height: 1px; background: rgba(46,204,113,0.2); margin: 15px 0;"></div>

                    <!-- Quantum & Network -->
                    <div class="metric-row">
                        <span class="metric-label">Uncertainty (Δx·Δp):</span>
                        <span class="metric-value" id="telemetry-uncertainty">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Network Density (ρ):</span>
                        <span class="metric-value" id="telemetry-density">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Spatial Spread (σᵣ):</span>
                        <span class="metric-value" id="telemetry-spread">0.000</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Avg Velocity (⟨v⟩):</span>
                        <span class="metric-value" id="telemetry-velocity">0.000</span>
                    </div>

                    <div style="height: 1px; background: rgba(46,204,113,0.2); margin: 15px 0;"></div>

                    <!-- Computational -->
                    <div class="metric-row">
                        <span class="metric-label">Complexity (C):</span>
                        <span class="metric-value" id="telemetry-complexity">0 ops</span>
                    </div>
                </div>

                <style>
                    .metric-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 8px 0;
                        padding: 8px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                    }

                    .metric-label {
                        color: #aaa;
                        font-size: 1em;
                    }

                    .metric-value {
                        color: #2ecc71;
                        font-weight: 700;
                        font-size: 1.1em;
                    }
                </style>
            </div>
        `;
    }

    update(telemetry) {
        document.getElementById('telemetry-fps').textContent = telemetry.fps || 0;
        document.getElementById('telemetry-particles').textContent = telemetry.particleCount || 0;
        document.getElementById('telemetry-connections').textContent = telemetry.connectionCount || 0;
        document.getElementById('telemetry-temperature').textContent = (telemetry.temperature || 0).toFixed(3);
        document.getElementById('telemetry-kinetic').textContent = (telemetry.kineticEnergy || 0).toFixed(3);
        document.getElementById('telemetry-potential').textContent = (telemetry.potentialEnergy || 0).toFixed(3);
        document.getElementById('telemetry-total-energy').textContent = (telemetry.totalEnergy || 0).toFixed(3);
        document.getElementById('telemetry-entropy').textContent = `${(telemetry.entropy || 0).toFixed(3)} bits`;
        document.getElementById('telemetry-info-deficit').textContent = `${(telemetry.infoDeficit || 0).toFixed(3)} bits`;
        document.getElementById('telemetry-free-energy').textContent = (telemetry.freeEnergy || 0).toFixed(3);
        document.getElementById('telemetry-uncertainty').textContent = (telemetry.uncertainty || 0).toFixed(3);
        document.getElementById('telemetry-density').textContent = (telemetry.networkDensity || 0).toFixed(3);
        document.getElementById('telemetry-spread').textContent = (telemetry.spatialSpread || 0).toFixed(3);
        document.getElementById('telemetry-velocity').textContent = (telemetry.avgVelocity || 0).toFixed(3);
        document.getElementById('telemetry-complexity').textContent = `${(telemetry.computationalCost || 0).toLocaleString()} ops`;
    }
}

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TelemetryDisplay;
}
