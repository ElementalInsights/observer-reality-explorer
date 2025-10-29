# Observer-Dependent Reality Explorer

A cutting-edge physics visualization framework demonstrating how reality fundamentally depends on the observer's lens. Built on a custom particle physics engine with 8 scientifically-accurate observer types, relativistic causality, and complete mathematical documentation.

![8 Observers](https://img.shields.io/badge/observers-8%20types-2ecc71)
![Physics Verified](https://img.shields.io/badge/physics-verified-27ae60)
![Framework Based](https://img.shields.io/badge/architecture-framework-3498db)
![Relativistic](https://img.shields.io/badge/causality-relativistic-f39c12)

## ✨ Features

### 🔬 Framework Benchmark (Main Experience)
**The flagship visualization** - A complete physics sandbox featuring:
- **8 Observer Types** - Quantum, Classical, Social, Conscious, AI, Thermodynamic, Relativistic, Probabilistic
- **Relativistic Causality** - Color-coded light cones showing timelike/lightlike/spacelike connections
- **Complete Physics Documentation** - Theory, mathematics, and visualization notes for each observer
- **Live Telemetry** - 15+ real-time metrics (entropy, energy, uncertainty, β, γ, causal connections)
- **Performance Metrics** - FPS, update/render times, memory usage
- **Settings Modal** - Full physics documentation and parameters
- **Interactive Controls** - Switch observers, adjust particle count (10-500), evolution speed (1-10x)

### 📈 Entropy Evolution
Watch the **Second Law of Thermodynamics** in action:
- Particles start clustered (LOW entropy)
- Spread out over time (entropy INCREASES)
- Live graph showing H(t) → ∞
- Split view: spatial distribution + entropy chart
- **Demonstrates:** dS/dt ≥ 0, irreversibility of time

### ⚡ Quantum Measurement
Interactive **wave function collapse**:
- Before: Quantum superposition (ghost particles)
- Click **MEASURE** → dramatic collapse animation
- After: Single position, randomized velocity (Heisenberg uncertainty)
- Measurement history log
- **Demonstrates:** Observer effect, ΔxΔp ≥ ℏ/2

### 🌐 Echo Chamber Formation
Watch **social polarization** emerge from simple rules:
- 3 interactive sliders: Homophily, Clustering, Rewiring
- 5 colored clusters (social groups)
- Real-time separation as homophily increases
- **Demonstrates:** How echo chambers form naturally from "birds of a feather flock together"

### 🎨 Design System
- **Monochromatic aesthetic** - Black/white/gray professional design
- **Color only in physics** - Particles/connections use physics-based colors
- **Monaco monospace** - Professional developer aesthetic
- **Consistent UI** - All pages share same design language
- **Responsive** - Adapts to screen size

## 🔬 The 8 Observer Types

Each observer represents a fundamentally different way of perceiving reality:

1. **🌀 Quantum** - Superposition, wave-particle duality, Schrödinger equation
2. **🎯 Classical** - Newtonian mechanics, deterministic trajectories, F=ma
3. **🌐 Social** - Network theory, tribal clusters, echo chambers
4. **🧠 Conscious** - Free energy principle, predictive processing, surprise minimization
5. **🤖 AI** - Semantic embeddings, transformer attention, cosine similarity
6. **🔥 Thermodynamic** - Heat flow, temperature gradients, Boltzmann distribution
7. **⚡ Relativistic** - **Einstein's special relativity**, causality structure, light cones
8. **🎲 Probabilistic** - Bayesian inference, uncertainty, likelihood distributions

### 📐 Complete Mathematical Documentation

Every observer includes:
- **Description** - What it perceives
- **Theory** - Scientific foundation
- **Mathematics** - Complete equations (4-7 formulas each)
- **Visualization** - How it's rendered

**Total: 40+ physics equations** across all observers!

## 🚀 Quick Start

### Local Usage
```bash
git clone https://github.com/ElementalInsights/observer-reality-explorer.git
cd observer-reality-explorer
# Open index.html in your browser - that's it!
```

No build process, no dependencies, no npm install. Pure HTML/JS/Canvas.

### GitHub Pages
Already deployed! Visit: **[Live Demo](https://elementalinsights.github.io/observer-reality-explorer/)**

### Navigation
1. **index.html** - Landing page with 2×2 grid
2. Click any card to explore:
   - 🔬 Framework Benchmark
   - 📈 Entropy Evolution
   - ⚡ Quantum Measurement
   - 🌐 Echo Chamber Formation

## ⚙️ Framework Architecture

### ObserverPhysicsEngine (`physics-engine.js`)
The core of everything - a unified particle physics simulation:
- **8 observer configurations** with complete scientific documentation
- **Real thermodynamics** - Entropy, temperature, free energy calculations
- **Spatial grid optimization** - O(N) connection updates instead of O(N²)
- **Relativistic physics** - Speed of light limit, time dilation, causality structure
- **Time series tracking** - Track any metric over time for graphing
- **Animation states** - Smooth transitions for quantum collapse
- **Network evolution** - Homophily, clustering, rewiring rules

### Additional Components
- **TimeSeriesTracker** - Stores 1000 data points per metric, enables graphing
- **ChartRenderer** - Line charts, heatmaps, bar charts (no dependencies!)
- **TelemetryDisplay** - Live physics metrics component

### Key Innovations
🌟 **Physically Accurate Relativistic Causality** - Connections represent actual causal structure:
- 🔵 Blue = Past light cone (could have influenced)
- 🟡 Yellow = Future light cone (can influence)
- 🔷 Cyan = Lightlike (simultaneous)
- ⚪ Gray dashed = Spacelike (no causal connection!)

Calculates: `Δs² = c²Δt² - Δx² - Δy²` to determine timelike/lightlike/spacelike separation

## 📁 File Structure

```
observer-reality-explorer/
├── index.html                      # Landing page (2×2 navigation grid)
├── benchmark.html                  # Framework Benchmark (main experience)
├── entropy-evolution.html          # 2nd Law visualization
├── measurement-collapse.html       # Quantum measurement demo
├── echo-chamber-formation.html     # Social network polarization
├── physics-engine.js               # Core framework (~1400 lines)
├── chart-renderer.js               # Graphing system (~350 lines)
├── telemetry-display.js            # Metrics display (~200 lines)
├── archive/                        # Legacy pages (preserved)
│   ├── simulator.html
│   ├── observer-comparison.html
│   └── wave-function-collapse.html
└── README.md                       # This file
```

## 🔬 Mathematical Implementations

All visualizations use correct mathematical formulas:

- **Shannon Entropy**: `H(X) = -Σ pᵢ log₂ pᵢ`
- **KL Divergence**: `D_KL(P||Q) = Σ P(i) log[P(i)/Q(i)]`
- **Cosine Similarity**: `cos(θ) = (A·B)/(||A|| × ||B||)`
- **Clustering Coefficient**: `Cᵢ = (2Tᵢ)/(kᵢ(kᵢ-1))`
- **Heisenberg Uncertainty**: `ΔxΔp ≥ ℏ/2`
- **Born Rule**: `P = |α|²` with proper normalization

See `VERIFICATION.md` for line-by-line code verification.

## 🛠️ Technologies

- **D3.js v7.8.5** - Data visualizations
- **MathJax v3** - LaTeX formula rendering
- **Pure JavaScript** - No build process required
- **Responsive SVG** - Scales to container width

## 📖 Usage

### Interactive Features
- **Paper → Viz**: Click any ⚡ lightning bolt link in the paper
- **Viz → Paper**: Click 📄 "See in Paper" buttons
- **Adjust Parameters**: Use sliders to explore mathematical relationships
- **Verify Math**: Click "Verify & Recreate Yourself" badge

### Examples
- Adjust entropy states slider to see how information changes
- Click "Perform Measurement" on quantum visualization for stochastic collapse
- Select "Highlight Path" on Ruliad to see observer sampling
- Click concepts in embeddings to measure semantic distances

## 🤝 Contributing

This is an educational resource. Contributions welcome:
- Report bugs or suggest improvements via GitHub Issues
- Submit pull requests with enhancements
- Share feedback on mathematical accuracy
- Suggest additional visualizations

## 📄 License

MIT License - Free for educational and research use

## 🌟 Star This Repository

If you find this educational tool useful:
1. Click the ⭐ "Star" button at the top of the page
2. Share with researchers, students, and educators
3. Use in your courses or presentations (attribution appreciated)

## 👤 Author

**Jacob Edwards**
Elemental Insights
📧 jacob.edwards@elementalinsights.com
🔗 [GitHub](https://github.com/ElementalInsights)

## 🙏 Acknowledgments

Built with Claude Code - Anthropic's official CLI for Claude

Co-Authored-By: Claude <noreply@anthropic.com>

---

**Educational Resource** | **17 Peer-Reviewed Sources** | **10 Interactive Visualizations** | **Publication-Quality**

© 2025 Jacob Edwards / Elemental Insights. Released under MIT License.
