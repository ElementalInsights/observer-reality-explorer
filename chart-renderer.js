/**
 * Chart Renderer - Simple canvas-based charting
 *
 * Features:
 * - Line charts for time series data
 * - Heatmaps for 2D grids
 * - Bar charts for distributions
 * - Lightweight, no dependencies
 * - Monochromatic design
 *
 * @author Jacob Edwards | Elemental Insights
 * @license MIT
 */

class ChartRenderer {
    constructor(canvasId, config = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.config = {
            backgroundColor: config.backgroundColor || '#0a0e27',
            lineColor: config.lineColor || '#fff',
            gridColor: config.gridColor || 'rgba(255,255,255,0.1)',
            textColor: config.textColor || '#ccc',
            accentColor: config.accentColor || '#2ecc71',
            padding: config.padding || 40,
            font: config.font || '12px Monaco, monospace',
            showGrid: config.showGrid !== false,
            showAxes: config.showAxes !== false,
            ...config
        };

        this.resizeCanvas();
    }

    resizeCanvas() {
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

    clear() {
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // ===== LINE CHART =====
    renderLineChart(data, config = {}) {
        this.clear();

        if (!data || data.length === 0) {
            this.drawNoData();
            return;
        }

        const padding = this.config.padding;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;

        // Find data bounds
        const times = data.map(d => d.time);
        const values = data.map(d => d.value);
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const valueRange = maxValue - minValue || 1;

        // Draw grid
        if (this.config.showGrid) {
            this.drawGrid(padding, chartWidth, chartHeight, minValue, maxValue);
        }

        // Draw axes
        if (this.config.showAxes) {
            this.drawAxes(padding, chartWidth, chartHeight, minTime, maxTime, minValue, maxValue, config.yLabel || 'Value', config.xLabel || 'Time');
        }

        // Draw line
        this.ctx.strokeStyle = config.lineColor || this.config.accentColor;
        this.ctx.lineWidth = config.lineWidth || 2;
        this.ctx.globalAlpha = 0.9;
        this.ctx.beginPath();

        data.forEach((point, i) => {
            const x = padding + ((point.time - minTime) / (maxTime - minTime || 1)) * chartWidth;
            const y = this.height - padding - ((point.value - minValue) / valueRange) * chartHeight;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();
        this.ctx.globalAlpha = 1;

        // Draw points
        if (config.showPoints) {
            this.ctx.fillStyle = config.lineColor || this.config.accentColor;
            data.forEach(point => {
                const x = padding + ((point.time - minTime) / (maxTime - minTime || 1)) * chartWidth;
                const y = this.height - padding - ((point.value - minValue) / valueRange) * chartHeight;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        // Draw title
        if (config.title) {
            this.ctx.fillStyle = this.config.textColor;
            this.ctx.font = 'bold 14px Monaco, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(config.title, this.width / 2, 20);
        }
    }

    // ===== HEATMAP =====
    renderHeatmap(grid, config = {}) {
        this.clear();

        if (!grid || grid.length === 0) {
            this.drawNoData();
            return;
        }

        const padding = this.config.padding;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;

        const rows = grid.length;
        const cols = grid[0].length;
        const cellWidth = chartWidth / cols;
        const cellHeight = chartHeight / rows;

        // Find min/max values
        let minVal = Infinity;
        let maxVal = -Infinity;
        grid.forEach(row => {
            row.forEach(val => {
                minVal = Math.min(minVal, val);
                maxVal = Math.max(maxVal, val);
            });
        });

        const range = maxVal - minVal || 1;

        // Draw cells
        grid.forEach((row, r) => {
            row.forEach((val, c) => {
                const normalized = (val - minVal) / range;

                // Color: dark to bright (monochrome)
                const intensity = Math.floor(normalized * 200 + 55);
                this.ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;

                const x = padding + c * cellWidth;
                const y = padding + r * cellHeight;

                this.ctx.fillRect(x, y, cellWidth, cellHeight);
            });
        });

        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= cols; i++) {
            const x = padding + i * cellWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, padding + chartHeight);
            this.ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
            const y = padding + i * cellHeight;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(padding + chartWidth, y);
            this.ctx.stroke();
        }

        // Draw title
        if (config.title) {
            this.ctx.fillStyle = this.config.textColor;
            this.ctx.font = 'bold 14px Monaco, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(config.title, this.width / 2, 20);
        }
    }

    // ===== BAR CHART =====
    renderBarChart(data, config = {}) {
        this.clear();

        if (!data || data.length === 0) {
            this.drawNoData();
            return;
        }

        const padding = this.config.padding;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;

        const values = data.map(d => d.value);
        const labels = data.map(d => d.label || '');
        const maxValue = Math.max(...values) || 1;

        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;

        // Draw bars
        data.forEach((item, i) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = padding + i * (barWidth + barSpacing);
            const y = this.height - padding - barHeight;

            this.ctx.fillStyle = config.barColor || this.config.accentColor;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            this.ctx.globalAlpha = 1;

            // Draw label
            if (item.label) {
                this.ctx.fillStyle = this.config.textColor;
                this.ctx.font = '10px Monaco, monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(item.label, x + barWidth / 2, this.height - padding + 15);
            }

            // Draw value
            this.ctx.fillStyle = this.config.textColor;
            this.ctx.font = 'bold 11px Monaco, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item.value.toFixed(1), x + barWidth / 2, y - 5);
        });

        // Draw title
        if (config.title) {
            this.ctx.fillStyle = this.config.textColor;
            this.ctx.font = 'bold 14px Monaco, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(config.title, this.width / 2, 20);
        }
    }

    // ===== HELPERS =====
    drawGrid(padding, chartWidth, chartHeight, minValue, maxValue) {
        this.ctx.strokeStyle = this.config.gridColor;
        this.ctx.lineWidth = 1;

        // Horizontal grid lines (5 lines)
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i / 5) * chartHeight;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(padding + chartWidth, y);
            this.ctx.stroke();
        }

        // Vertical grid lines (5 lines)
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i / 5) * chartWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, padding + chartHeight);
            this.ctx.stroke();
        }
    }

    drawAxes(padding, chartWidth, chartHeight, minTime, maxTime, minValue, maxValue, yLabel, xLabel) {
        this.ctx.strokeStyle = this.config.textColor;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.5;

        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, padding + chartHeight);
        this.ctx.stroke();

        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding + chartHeight);
        this.ctx.lineTo(padding + chartWidth, padding + chartHeight);
        this.ctx.stroke();

        this.ctx.globalAlpha = 1;

        // Labels
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = '11px Monaco, monospace';
        this.ctx.textAlign = 'right';

        // Y-axis values (5 ticks)
        for (let i = 0; i <= 5; i++) {
            const value = minValue + (maxValue - minValue) * (1 - i / 5);
            const y = padding + (i / 5) * chartHeight;
            this.ctx.fillText(value.toFixed(2), padding - 10, y + 4);
        }

        // Y-axis label
        this.ctx.save();
        this.ctx.translate(15, this.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 12px Monaco, monospace';
        this.ctx.fillText(yLabel, 0, 0);
        this.ctx.restore();

        // X-axis label
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 12px Monaco, monospace';
        this.ctx.fillText(xLabel, this.width / 2, this.height - 10);
    }

    drawNoData() {
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = '16px Monaco, monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('No data available', this.width / 2, this.height / 2);
    }
}

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartRenderer;
}
