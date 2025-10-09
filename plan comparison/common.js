// Common JavaScript functions for all dashboards

// Download chart as image
function downloadChart(chartId) {
    const chart = echarts.getInstanceByDom(document.getElementById(chartId));
    const url = chart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
    });
    
    const link = document.createElement('a');
    link.download = chartId + '.png';
    link.href = url;
    link.click();
}

// Download table data as CSV
function downloadTableData(tableId = 'dataTable') {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = Array.from(table.querySelectorAll('tr'));
    
    // Get headers
    const headers = Array.from(rows[0].querySelectorAll('th'))
        .map(header => header.textContent.trim());
    
    // Get data rows
    const data = rows.slice(1).map(row => {
        return Array.from(row.querySelectorAll('td'))
            .map(cell => cell.textContent.trim());
    });
    
    // Combine headers and data
    const csvContent = [
        headers.join(','),
        ...data.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Format number with K, M, B suffixes
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Format percentage
function formatPercentage(value) {
    return value.toFixed(1) + '%';
}

// Format change with arrow
function formatChange(value) {
    if (value > 0) {
        return `<span class="metric-change positive">▲${value.toFixed(1)}%</span>`;
    } else if (value < 0) {
        return `<span class="metric-change negative">▼${Math.abs(value).toFixed(1)}%</span>`;
    } else {
        return `<span class="metric-change">0.0%</span>`;
    }
}

// Toggle chart type (bar/line)
function setupChartToggle(chartId, chartInstance, chartOptions) {
    const toggleContainer = document.getElementById(chartId + 'Toggle');
    if (!toggleContainer) return;
    
    const buttons = toggleContainer.querySelectorAll('.toggle-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update chart type
            if (chartOptions.series) {
                chartOptions.series.forEach(series => {
                    series.type = type;
                });
                chartInstance.setOption(chartOptions);
            }
        });
    });
}

// Common chart colors
const CHART_COLORS = {
    planA: '#4e79a7',
    planB: '#f28e2c',
    positive: '#28a745',
    neutral: '#6c757d',
    negative: '#dc3545'
};

// Resize charts when window is resized
window.addEventListener('resize', function() {
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        const instance = echarts.getInstanceByDom(chart);
        if (instance) {
            instance.resize();
        }
    });
});