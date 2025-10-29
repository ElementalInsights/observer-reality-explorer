# Changelog

All notable changes to the Observer-Dependent Reality Explorer project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] - 2025-10-29

### 🎉 Major Rewrite - Framework Architecture

Complete rebuild of the project using a custom physics engine framework instead of D3.js visualizations.

### Added

#### Framework Components
- **ObserverPhysicsEngine** - Unified particle physics simulation (~1400 lines)
  - 8 observer types with complete scientific documentation
  - Real thermodynamics (entropy, temperature, free energy)
  - Spatial grid optimization (O(N) instead of O(N²))
  - Relativistic physics with causality structure
- **TimeSeriesTracker** - Time series data tracking for graphing
- **ChartRenderer** - Canvas-based charting (line charts, heatmaps, bar charts)
- **TelemetryDisplay** - Live physics metrics component

#### New Observer Types (3 additions)
- **🔥 Thermodynamic Observer**
  - Heat flow visualization
  - Temperature-based coloring (blue=cold, red=hot)
  - Heat diffusion dynamics
- **⚡ Relativistic Observer**
  - Einstein's special relativity
  - Physically accurate causality connections
  - Light cones and worldlines
  - Time dilation (Lorentz factor γ)
  - Color-coded connections: Blue (past), Yellow (future), Cyan (lightlike), Gray (spacelike)
- **🎲 Probabilistic Observer**
  - Bayesian inference
  - Opacity based on probability
  - Uncertainty circles (variance visualization)

#### New Visualization Pages
- **benchmark.html** - Framework showcase with all 8 observers
  - Performance metrics (FPS, update/render time, memory)
  - Observer details card (description, theory, mathematics, visualization)
  - Settings modal with complete physics documentation
  - Navigation: Back button, Settings cog
- **entropy-evolution.html** - 2nd Law of Thermodynamics
  - Starts with low-entropy state (particles clustered)
  - Live graph showing entropy increasing over time
  - Split view: spatial + chart
- **measurement-collapse.html** - Quantum measurement
  - Wave function collapse animation
  - MEASURE button with dramatic transition
  - Heisenberg uncertainty demonstration
  - Measurement history log
- **echo-chamber-formation.html** - Social network polarization
  - 3 sliders: Homophily, Clustering, Rewiring
  - Watch clusters separate in real-time
  - Demonstrates echo chamber formation

### Enhanced

#### Relativistic Physics
- **Causal connections** instead of spatial connections
  - Timelike connections (inside light cone): Blue/Yellow solid lines
  - Lightlike connections (on light cone): Cyan solid lines
  - Spacelike connections (outside light cone): Gray dashed lines
- **Causal horizon**: c × timeWindow = 60 pixels
- **New telemetry metrics**: β (v/c), γ (Lorentz factor), particles near lightspeed, causal connection counts
- **Visual effects**: Worldline trails, light cones, Doppler shift auras

#### All Observer Types
- Complete mathematical documentation (40+ equations total)
- Theory explanations (scientific foundation)
- Visualization notes (what you're seeing)
- 4-7 formulas per observer type

### Changed

- **Default observer**: Quantum → Classical (more intuitive starting point)
- **Design system**: Academic green → Monochromatic black/white/gray
- **Navigation**: index.html now shows 2×2 grid instead of split-screen paper
- **Main experience**: benchmark.html (framework) instead of simulator.html
- **Architecture**: Framework-based modular design instead of monolithic pages

### Removed

- D3.js dependency (now pure Canvas)
- MathJax dependency
- Split-screen paper interface
- Old observer-reality-explorer.html

### Archived

Moved to `archive/` folder (preserved in git history):
- `simulator.html` - Original 2300-line simulator (5 observers)
- `observer-comparison.html` - Dual-view comparison
- `wave-function-collapse.html` - Quantum measurements

### Technical Improvements

- **Performance**: Spatial grid optimization, 60 FPS at 100 particles
- **Modularity**: Reusable components (engine, charts, telemetry)
- **Extensibility**: Easy to add new observer types
- **Time Series**: Built-in tracking for any metric
- **Animation System**: Smooth state transitions
- **Network Evolution**: Homophily, clustering, rewiring rules

---

## [1.0.0] - 2025-10-28

### Initial Release

- Split-screen interface (paper + visualizations)
- 10 D3.js visualizations
- 17 peer-reviewed references
- Academic graph paper design
- Full mathematical verification

---

## Version Numbering

- **Major** (X.0.0): Breaking changes, architecture rewrites
- **Minor** (1.X.0): New features, new observers, new pages
- **Patch** (1.0.X): Bug fixes, performance improvements, documentation

---

## Future Roadmap

### Planned Features
- [ ] Comparison mode (side-by-side dual observers)
- [ ] Graph visualizations (real-time FPS/entropy charts in benchmark)
- [ ] Recording/playback system
- [ ] Export functionality (JSON data, PNG screenshots, WebM video)
- [ ] Plugin system for custom observers
- [ ] WebGL renderer option for 1000+ particles
- [ ] More observer types (Bayesian, Information-theoretic, etc.)

### Under Consideration
- [ ] 3D visualizations (phase space, state manifolds)
- [ ] VR/AR support
- [ ] Multi-user synchronized simulations
- [ ] Educational curriculum integration
- [ ] Research paper export

---

**Built with ❤️ using pure physics and zero dependencies**
