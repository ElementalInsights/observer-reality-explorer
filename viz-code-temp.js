                    .y(d => y1(d.y));

                const line2 = d3.line()
                    .x(d => x2(d.x))
                    .y(d => y2(d.y));

                // Position distribution
                svg.append('path')
                    .datum(posData)
                    .attr('fill', 'rgba(102, 126, 234, 0.3)')
                    .attr('stroke', '#667eea')
                    .attr('stroke-width', 2)
                    .attr('d', line1);

                // Momentum distribution
                svg.append('path')
                    .datum(momData)
                    .attr('fill', 'rgba(231, 76, 60, 0.3)')
                    .attr('stroke', '#e74c3c')
                    .attr('stroke-width', 2)
                    .attr('d', line2);

                // Axes
                svg.append('g')
                    .attr('transform', `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x1))
                    .attr('class', 'axis');

                svg.append('g')
                    .attr('transform', `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x2))
                    .attr('class', 'axis');

                svg.append('g')
                    .attr('transform', `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y1).ticks(5))
                    .attr('class', 'axis');

                // Labels
                svg.append('text')
                    .attr('x', (margin.left + width / 2 - 10) / 2)
                    .attr('y', height - 10)
                    .attr('text-anchor', 'middle')
                    .text('Position (x)')
                    .style('font-size', '14px')
                    .style('fill', '#667eea')
                    .style('font-weight', 'bold');

                svg.append('text')
                    .attr('x', (width / 2 + 10 + width - margin.right) / 2)
                    .attr('y', height - 10)
                    .attr('text-anchor', 'middle')
                    .text('Momentum (p)')
                    .style('font-size', '14px')
                    .style('fill', '#e74c3c')
                    .style('font-weight', 'bold');

                // Uncertainty display
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', margin.top)
                    .attr('text-anchor', 'middle')
                    .text(`Δx = ${deltaX.toFixed(2)}    Δp = ${deltaP.toFixed(2)}    Δx·Δp = ${(deltaX * deltaP).toFixed(2)} ≥ 0.5`)
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .style('fill', '#764ba2');

                // Divider
                svg.append('line')
                    .attr('x1', width / 2)
                    .attr('y1', margin.top)
                    .attr('x2', width / 2)
                    .attr('y2', height - margin.bottom)
                    .attr('stroke', '#ccc')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '5,5');
            }

            document.getElementById('deltaX').addEventListener('input', updateUncertainty);
            updateUncertainty();
        }

        // 7. RULIAD COMPUTATIONAL PATHS VISUALIZATION
        function createRuliadVisualization() {
            const width = 800;
            const height = 500;

            const svg = d3.select('#ruliadViz')
                .html('')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            let selectedPath = null;

            function generateRuliad() {
                const branchingFactor = parseInt(document.getElementById('branchingFactor').value);
                const depth = parseInt(document.getElementById('ruliadDepth').value);
                updateValueDisplay('branchingFactor', 'branchingFactorValue');
                updateValueDisplay('ruliadDepth', 'ruliadDepthValue');

                const nodes = [{id: 0, depth: 0, branch: 0}];
                const links = [];
                let nodeId = 1;

                // Generate tree structure
                for (let d = 0; d < depth; d++) {
                    const nodesAtDepth = nodes.filter(n => n.depth === d);
                    nodesAtDepth.forEach(parent => {
                        for (let b = 0; b < branchingFactor; b++) {
                            const child = {id: nodeId++, depth: d + 1, branch: b};
                            nodes.push(child);
                            links.push({source: parent.id, target: child.id});
                        }
                    });
                }

                return {nodes, links};
            }

            function updateRuliad() {
                const data = generateRuliad();
                svg.selectAll('*').remove();

                // Calculate positions
                const depthSpacing = width / (data.nodes[data.nodes.length - 1].depth + 2);
                const maxAtDepth = {};

                data.nodes.forEach(n => {
                    maxAtDepth[n.depth] = (maxAtDepth[n.depth] || 0) + 1;
                });

                const positions = {};
                const counters = {};

                data.nodes.forEach(n => {
                    if (!counters[n.depth]) counters[n.depth] = 0;
                    const totalAtDepth = maxAtDepth[n.depth];
                    const spacing = height / (totalAtDepth + 1);
                    positions[n.id] = {
                        x: depthSpacing * (n.depth + 1),
                        y: spacing * (counters[n.depth] + 1)
                    };
                    counters[n.depth]++;
                });

                // Draw links
                svg.selectAll('line')
                    .data(data.links.map(l => ({
                        ...l,
                        x1: positions[l.source].x,
                        y1: positions[l.source].y,
                        x2: positions[l.target].x,
                        y2: positions[l.target].y
                    })))
                    .join('line')
                    .attr('x1', d => d.x1)
                    .attr('y1', d => d.y1)
                    .attr('x2', d => d.x2)
                    .attr('y2', d => d.y2)
                    .attr('stroke', d => {
                        if (selectedPath && selectedPath.includes(d.source) && selectedPath.includes(d.target)) {
                            return '#f39c12';
                        }
                        return '#ccc';
                    })
                    .attr('stroke-width', d => {
                        if (selectedPath && selectedPath.includes(d.source) && selectedPath.includes(d.target)) {
                            return 3;
                        }
                        return 1;
                    })
                    .attr('opacity', 0.6);

                // Draw nodes
                svg.selectAll('circle')
                    .data(data.nodes)
                    .join('circle')
                    .attr('cx', d => positions[d.id].x)
                    .attr('cy', d => positions[d.id].y)
                    .attr('r', d => {
                        if (selectedPath && selectedPath.includes(d.id)) return 8;
                        return 5;
                    })
                    .attr('fill', d => {
                        if (selectedPath && selectedPath.includes(d.id)) return '#f39c12';
                        return d3.interpolateCool(d.depth / data.nodes[data.nodes.length - 1].depth);
                    })
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 1.5)
                    .on('mouseover', function(event, d) {
                        d3.select(this).attr('r', 8);
                        d3.select('#tooltip')
                            .style('opacity', 1)
                            .html(`State ${d.id}<br/>Depth: ${d.depth}<br/>Branch: ${d.branch}`)
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 10) + 'px');
                    })
                    .on('mouseout', function(event, d) {
                        const r = (selectedPath && selectedPath.includes(d.id)) ? 8 : 5;
                        d3.select(this).attr('r', r);
                        d3.select('#tooltip').style('opacity', 0);
                    });

                // Add title
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', 20)
                    .attr('text-anchor', 'middle')
                    .text('Multiway Computational Graph')
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .style('fill', '#667eea');

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .text(`Total possible paths: ${Math.pow(parseInt(document.getElementById('branchingFactor').value), parseInt(document.getElementById('ruliadDepth').value))}`)
                    .style('font-size', '14px')
                    .style('fill', '#666');

                if (selectedPath) {
                    svg.append('text')
                        .attr('x', width / 2)
                        .attr('y', height - 10)
                        .attr('text-anchor', 'middle')
                        .text('Observer\'s selected path highlighted in orange')
                        .style('font-size', '14px')
                        .style('fill', '#f39c12')
                        .style('font-weight', 'bold');
                }
            }

            document.getElementById('branchingFactor').addEventListener('input', () => {
                selectedPath = null;
                updateRuliad();
            });
            document.getElementById('ruliadDepth').addEventListener('input', () => {
                selectedPath = null;
                updateRuliad();
            });
            document.getElementById('regenerateRuliad').addEventListener('click', () => {
                selectedPath = null;
                updateRuliad();
            });
            document.getElementById('highlightPath').addEventListener('click', () => {
                const branchingFactor = parseInt(document.getElementById('branchingFactor').value);
                const depth = parseInt(document.getElementById('ruliadDepth').value);

                // Generate a random path
                selectedPath = [0];
                let currentId = 0;
                let nodesBeforeDepth = 0;

                for (let d = 0; d < depth; d++) {
                    const nodesAtDepth = Math.pow(branchingFactor, d);
                    nodesBeforeDepth += (d === 0) ? 0 : Math.pow(branchingFactor, d);
                    const branch = Math.floor(Math.random() * branchingFactor);
                    const childrenStartId = nodesBeforeDepth + 1 + (currentId - (nodesBeforeDepth - nodesAtDepth + 1)) * branchingFactor;
                    currentId = childrenStartId + branch;
                    selectedPath.push(currentId);
                }

                updateRuliad();
            });

            updateRuliad();
        }

        // 8. INTEGRATED INFORMATION (PHI) VISUALIZATION
        function createPhiVisualization() {
            const width = 800;
            const height = 500;

            const svg = d3.select('#phiViz')
                .html('')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            function updatePhi() {
                const density = parseFloat(document.getElementById('connectionDensity').value);
                const size = parseInt(document.getElementById('systemSize').value);
                updateValueDisplay('connectionDensity', 'connectionDensityValue');
                updateValueDisplay('systemSize', 'systemSizeValue');

                svg.selectAll('*').remove();

                // Generate nodes in a circle
                const nodes = [];
                const centerX = width / 2;
                const centerY = height / 2;
                const radius = 150;

                for (let i = 0; i < size; i++) {
                    const angle = (i / size) * 2 * Math.PI - Math.PI / 2;
                    nodes.push({
                        id: i,
                        x: centerX + radius * Math.cos(angle),
                        y: centerY + radius * Math.sin(angle)
                    });
                }

                // Generate connections based on density
                const links = [];
                for (let i = 0; i < size; i++) {
                    for (let j = i + 1; j < size; j++) {
                        if (Math.random() < density) {
                            links.push({source: i, target: j});
                        }
                    }
                }

                // Calculate approximate phi (simplified)
                const avgConnections = (links.length * 2) / size;
                const maxConnections = size - 1;
                const connectivity = avgConnections / maxConnections;

                // Phi is roughly connectivity * (1 - |0.5 - connectivity|) to peak at medium integration
                const phi = connectivity * size * (1 - Math.abs(0.5 - connectivity) * 2);

                // Draw links
                svg.selectAll('line')
                    .data(links)
                    .join('line')
                    .attr('x1', d => nodes[d.source].x)
                    .attr('y1', d => nodes[d.source].y)
                    .attr('x2', d => nodes[d.target].x)
                    .attr('y2', d => nodes[d.target].y)
                    .attr('stroke', '#667eea')
                    .attr('stroke-width', 2)
                    .attr('opacity', 0.4);

                // Draw nodes
                svg.selectAll('circle')
                    .data(nodes)
                    .join('circle')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('r', 15)
                    .attr('fill', '#764ba2')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 3)
                    .on('mouseover', function(event, d) {
                        d3.select(this).attr('r', 20);
                        const connections = links.filter(l => l.source === d.id || l.target === d.id).length;
                        d3.select('#tooltip')
                            .style('opacity', 1)
                            .html(`Element ${d.id}<br/>Connections: ${connections}`)
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 10) + 'px');
                    })
                    .on('mouseout', function() {
                        d3.select(this).attr('r', 15);
                        d3.select('#tooltip').style('opacity', 0);
                    });

                // Add labels to nodes
                svg.selectAll('text.node-label')
                    .data(nodes)
                    .join('text')
                    .attr('class', 'node-label')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y + 5)
                    .attr('text-anchor', 'middle')
                    .text(d => d.id)
                    .style('fill', 'white')
                    .style('font-weight', 'bold')
                    .style('font-size', '14px')
                    .style('pointer-events', 'none');

                // Display Phi value
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .text(`Φ ≈ ${phi.toFixed(2)} bits`)
                    .style('font-size', '24px')
                    .style('font-weight', 'bold')
                    .style('fill', '#667eea');

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', 65)
                    .attr('text-anchor', 'middle')
                    .text(`Connections: ${links.length} / ${(size * (size - 1)) / 2} possible`)
                    .style('font-size', '14px')
                    .style('fill', '#666');

                // Interpretation
                let interpretation = '';
                if (phi < size * 0.3) {
                    interpretation = 'Low integration - system parts are relatively independent';
                } else if (phi < size * 0.7) {
                    interpretation = 'Moderate integration - balanced information flow';
                } else {
                    interpretation = 'High integration - system highly interdependent';
                }

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height - 20)
                    .attr('text-anchor', 'middle')
                    .text(interpretation)
                    .style('font-size', '14px')
                    .style('fill', '#764ba2')
                    .style('font-style', 'italic');
            }

            document.getElementById('connectionDensity').addEventListener('input', updatePhi);
            document.getElementById('systemSize').addEventListener('input', updatePhi);
            document.getElementById('randomizeConnections').addEventListener('click', updatePhi);

            updatePhi();
        }

        // 9. QUANTUM STATE COLLAPSE VISUALIZATION
        function createQuantumVisualization() {
            const width = 800;
            const height = 400;
            const margin = {top: 60, right: 20, bottom: 60, left: 60};

            const svg = d3.select('#quantumViz')
                .html('')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            let collapsed = false;
            let collapsedState = null;
            let animating = false;

            function updateQuantum() {
                const alpha = parseFloat(document.getElementById('alphaAmplitude').value);
                const beta = Math.sqrt(1 - alpha * alpha);
                updateValueDisplay('alphaAmplitude', 'alphaAmplitudeValue');

                svg.selectAll('*').remove();

                const barWidth = 150;
                const barSpacing = 100;
                const centerX = width / 2;
                const baseY = height - margin.bottom;

                const y = d3.scaleLinear()
                    .domain([0, 1])
                    .range([baseY, margin.top]);

                if (!collapsed) {
                    // Superposition state - show both amplitudes
                    // State |0⟩
                    svg.append('rect')
                        .attr('x', centerX - barSpacing - barWidth)
                        .attr('y', y(alpha * alpha))
                        .attr('width', barWidth)
                        .attr('height', baseY - y(alpha * alpha))
                        .attr('fill', '#667eea')
                        .attr('opacity', 0.7)
                        .attr('stroke', '#667eea')
                        .attr('stroke-width', 2);

                    // State |1⟩
                    svg.append('rect')
                        .attr('x', centerX + barSpacing)
                        .attr('y', y(beta * beta))
                        .attr('width', barWidth)
                        .attr('height', baseY - y(beta * beta))
                        .attr('fill', '#e74c3c')
                        .attr('opacity', 0.7)
                        .attr('stroke', '#e74c3c')
                        .attr('stroke-width', 2);

                    // Probability labels
                    svg.append('text')
                        .attr('x', centerX - barSpacing - barWidth / 2)
                        .attr('y', y(alpha * alpha) - 10)
                        .attr('text-anchor', 'middle')
                        .text(`P(|0⟩) = ${(alpha * alpha).toFixed(3)}`)
                        .style('font-size', '14px')
                        .style('font-weight', 'bold')
                        .style('fill', '#667eea');

                    svg.append('text')
                        .attr('x', centerX + barSpacing + barWidth / 2)
                        .attr('y', y(beta * beta) - 10)
                        .attr('text-anchor', 'middle')
                        .text(`P(|1⟩) = ${(beta * beta).toFixed(3)}`)
                        .style('font-size', '14px')
                        .style('font-weight', 'bold')
                        .style('fill', '#e74c3c');

                    // Superposition waves
                    const wavePoints = d3.range(0, 2 * Math.PI, 0.1);
                    const wave0 = d3.line()
                        .x(d => centerX - barSpacing - barWidth / 2 + Math.cos(d) * 30)
                        .y(d => margin.top - 20 + Math.sin(d) * alpha * 20);

                    const wave1 = d3.line()
                        .x(d => centerX + barSpacing + barWidth / 2 + Math.cos(d) * 30)
                        .y(d => margin.top - 20 + Math.sin(d) * beta * 20);

                    svg.append('path')
                        .datum(wavePoints)
                        .attr('d', wave0)
                        .attr('stroke', '#667eea')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none')
                        .attr('opacity', 0.7);

                    svg.append('path')
                        .datum(wavePoints)
                        .attr('d', wave1)
                        .attr('stroke', '#e74c3c')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none')
                        .attr('opacity', 0.7);

                    // State label
                    svg.append('text')
                        .attr('x', centerX)
                        .attr('y', 30)
                        .attr('text-anchor', 'middle')
                        .text(`|ψ⟩ = ${alpha.toFixed(2)}|0⟩ + ${beta.toFixed(2)}|1⟩`)
                        .style('font-size', '20px')
                        .style('font-weight', 'bold')
                        .style('fill', '#764ba2');

                    svg.append('text')
                        .attr('x', centerX)
                        .attr('y', 50)
                        .attr('text-anchor', 'middle')
                        .text('SUPERPOSITION STATE')
                        .style('font-size', '14px')
                        .style('fill', '#666');

                } else {
                    // Collapsed state
                    const xPos = collapsedState === 0 ?
                        centerX - barSpacing - barWidth :
                        centerX + barSpacing;
                    const color = collapsedState === 0 ? '#667eea' : '#e74c3c';
                    const label = collapsedState === 0 ? '|0⟩' : '|1⟩';

                    svg.append('rect')
                        .attr('x', xPos)
                        .attr('y', y(1))
                        .attr('width', barWidth)
                        .attr('height', baseY - y(1))
                        .attr('fill', color)
                        .attr('opacity', 0.9)
                        .attr('stroke', color)
                        .attr('stroke-width', 3);

                    svg.append('text')
                        .attr('x', xPos + barWidth / 2)
                        .attr('y', y(1) - 10)
                        .attr('text-anchor', 'middle')
                        .text('P = 1.000')
                        .style('font-size', '16px')
                        .style('font-weight', 'bold')
                        .style('fill', color);

                    svg.append('text')
                        .attr('x', centerX)
                        .attr('y', 30)
                        .attr('text-anchor', 'middle')
                        .text(`COLLAPSED to ${label}`)
                        .style('font-size', '20px')
                        .style('font-weight', 'bold')
                        .style('fill', color);

                    svg.append('text')
                        .attr('x', centerX)
                        .attr('y', 50)
                        .attr('text-anchor', 'middle')
                        .text('Observer-dependent outcome')
                        .style('font-size', '14px')
                        .style('fill', '#666')
                        .style('font-style', 'italic');
                }

                // Axes labels
                svg.append('text')
                    .attr('x', centerX - barSpacing - barWidth / 2)
                    .attr('y', baseY + 30)
                    .attr('text-anchor', 'middle')
                    .text('State |0⟩')
                    .style('font-size', '16px')
                    .style('fill', '#667eea')
                    .style('font-weight', 'bold');

                svg.append('text')
                    .attr('x', centerX + barSpacing + barWidth / 2)
                    .attr('y', baseY + 30)
                    .attr('text-anchor', 'middle')
                    .text('State |1⟩')
                    .style('font-size', '16px')
                    .style('fill', '#e74c3c')
                    .style('font-weight', 'bold');

                // Y axis
                svg.append('g')
                    .attr('transform', `translate(${margin.left}, 0)`)
                    .call(d3.axisLeft(y).ticks(5))
                    .attr('class', 'axis');

                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', -height / 2)
                    .attr('y', 15)
                    .attr('text-anchor', 'middle')
                    .text('Probability')
                    .style('font-size', '14px');
            }

            document.getElementById('alphaAmplitude').addEventListener('input', () => {
                if (!collapsed) updateQuantum();
            });

            document.getElementById('measureQuantum').addEventListener('click', () => {
                if (!animating && !collapsed) {
                    animating = true;
                    const alpha = parseFloat(document.getElementById('alphaAmplitude').value);
                    const prob0 = alpha * alpha;

                    // Simulate quantum measurement
                    collapsedState = Math.random() < prob0 ? 0 : 1;
                    collapsed = true;

                    // Animate collapse
                    setTimeout(() => {
                        updateQuantum();
                        animating = false;
                    }, 100);
                }
            });

            document.getElementById('resetQuantum').addEventListener('click', () => {
                collapsed = false;
                collapsedState = null;
                updateQuantum();
            });

            updateQuantum();
        }

        // 10. WORLDVIEW EMBEDDINGS VISUALIZATION
        function createWorldviewVisualization() {
            const width = 800;
            const height = 500;
            const margin = {top: 20, right: 20, bottom: 60, left: 60};

            const svg = d3.select('#worldviewViz')
                .html('')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            // Define concept clusters from the document
            const concepts = {
                physics: [
                    {name: 'Quantum Mechanics', x: -0.6, y: 0.5},
                    {name: 'Relativity', x: -0.5, y: 0.6},
                    {name: 'Entropy', x: -0.7, y: 0.4},
                    {name: 'Free Energy', x: -0.55, y: 0.45},
                    {name: 'Markov Blankets', x: -0.65, y: 0.55},
                    {name: 'QBism', x: -0.6, y: 0.35}
                ],
                consciousness: [
                    {name: 'IIT (Φ)', x: 0.3, y: 0.6},
                    {name: 'Global Workspace', x: 0.4, y: 0.5},
                    {name: 'Multiple Drafts', x: 0.35, y: 0.65},
                    {name: 'Phenomenology', x: 0.5, y: 0.55},
                    {name: 'Qualia', x: 0.25, y: 0.5},
                    {name: 'Integration', x: 0.45, y: 0.6}
                ],
                social: [
                    {name: 'Echo Chambers', x: 0.1, y: -0.5},
                    {name: 'Homophily', x: 0.2, y: -0.6},
                    {name: 'Worldviews', x: 0.0, y: -0.55},
                    {name: 'Clustering', x: 0.15, y: -0.45},
                    {name: 'Modularity', x: -0.05, y: -0.6},
                    {name: 'Information Cascades', x: 0.25, y: -0.5}
                ]
            };

            let activeFilter = 'all';

            function updateWorldview() {
                svg.selectAll('*').remove();

                const x = d3.scaleLinear()
                    .domain([-1, 1])
                    .range([margin.left, width - margin.right]);

                const y = d3.scaleLinear()
                    .domain([-1, 1])
                    .range([height - margin.bottom, margin.top]);

                // Axes
                svg.append('g')
                    .attr('transform', `translate(0,${height / 2})`)
                    .call(d3.axisBottom(x).ticks(0))
                    .attr('class', 'axis');

                svg.append('g')
                    .attr('transform', `translate(${width / 2},0)`)
                    .call(d3.axisLeft(y).ticks(0))
                    .attr('class', 'axis');

                // Grid
                svg.append('g')
                    .attr('class', 'grid')
                    .attr('transform', `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x).tickSize(-(height - margin.top - margin.bottom)).tickFormat(''));

                svg.append('g')
                    .attr('class', 'grid')
                    .attr('transform', `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y).tickSize(-(width - margin.left - margin.right)).tickFormat(''));

                // Determine which concepts to show
                let visibleConcepts = [];
                const colors = {physics: '#667eea', consciousness: '#e74c3c', social: '#2ecc71'};

                if (activeFilter === 'all') {
                    Object.keys(concepts).forEach(domain => {
                        concepts[domain].forEach(c => {
                            visibleConcepts.push({...c, domain, color: colors[domain]});
                        });
                    });
                } else {
                    concepts[activeFilter].forEach(c => {
                        visibleConcepts.push({...c, domain: activeFilter, color: colors[activeFilter]});
                    });
                }

                // Draw domain clusters (hulls)
                if (activeFilter === 'all') {
                    Object.keys(concepts).forEach(domain => {
                        const domainConcepts = concepts[domain];
                        const center = {
                            x: d3.mean(domainConcepts, d => d.x),
                            y: d3.mean(domainConcepts, d => d.y)
                        };

                        svg.append('circle')
                            .attr('cx', x(center.x))
                            .attr('cy', y(center.y))
                            .attr('r', 80)
                            .attr('fill', colors[domain])
                            .attr('opacity', 0.1)
                            .attr('stroke', colors[domain])
                            .attr('stroke-width', 2)
                            .attr('stroke-dasharray', '5,5');

                        svg.append('text')
                            .attr('x', x(center.x))
                            .attr('y', y(center.y) - 90)
                            .attr('text-anchor', 'middle')
                            .text(domain.toUpperCase())
                            .style('font-size', '14px')
                            .style('font-weight', 'bold')
                            .style('fill', colors[domain]);
                    });
                }

                // Draw connections between nearby concepts
                visibleConcepts.forEach((c1, i) => {
                    visibleConcepts.slice(i + 1).forEach(c2 => {
                        const dist = Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
                        if (dist < 0.3) {
                            const similarity = 1 - (dist / 0.3);
                            svg.append('line')
                                .attr('x1', x(c1.x))
                                .attr('y1', y(c1.y))
                                .attr('x2', x(c2.x))
                                .attr('y2', y(c2.y))
                                .attr('stroke', '#999')
                                .attr('stroke-width', similarity * 2)
                                .attr('opacity', 0.3);
                        }
                    });
                });

                // Draw concepts
                svg.selectAll('circle.concept')
                    .data(visibleConcepts)
                    .join('circle')
                    .attr('class', 'concept')
                    .attr('cx', d => x(d.x))
                    .attr('cy', d => y(d.y))
                    .attr('r', 8)
                    .attr('fill', d => d.color)
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .attr('opacity', 0.9)
                    .on('mouseover', function(event, d) {
                        d3.select(this).attr('r', 12);
