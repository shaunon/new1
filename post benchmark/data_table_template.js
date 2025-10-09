// Data table CSS styles template
const dataTableCSS = `
        .data-table-section {
            margin-top: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 20px;
        }

        .data-table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }

        .data-table-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }

        .data-table-controls {
            display: flex;
            gap: 10px;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .data-table th,
        .data-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        .data-table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #555;
            position: sticky;
            top: 0;
        }

        .data-table tr:hover {
            background-color: #f5f5f5;
        }

        .data-table td.number {
            text-align: right;
            font-family: 'Monaco', 'Menlo', monospace;
        }

        .data-table td.percentage {
            text-align: right;
        }

        .percentage-bar {
            display: inline-block;
            width: 60px;
            height: 8px;
            background-color: #e9ecef;
            border-radius: 4px;
            margin-left: 8px;
            position: relative;
        }

        .percentage-fill {
            height: 100%;
            background-color: #007bff;
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        @media (max-width: 768px) {
            .data-table-header {
                flex-direction: column;
                gap: 10px;
                align-items: flex-start;
            }
            
            .data-table {
                font-size: 14px;
            }
            
            .data-table th,
            .data-table td {
                padding: 8px;
            }
        }
`;

// Data table HTML template
const dataTableHTML = (title, filename) => `
        <!-- Data Summary Table -->
        <div class="chart-section data-table-section">
            <div class="data-table-header">
                <div class="data-table-title">${title}</div>
                <div class="data-table-controls">
                    <button class="btn" onclick="exportTableData()">Export CSV</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="summaryTable">
                    <thead>
                        <tr id="tableHeaders">
                            <!-- Headers will be populated by JavaScript -->
                        </tr>
                    </thead>
                    <tbody id="summaryTableBody">
                        <!-- Data will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
`;

// Export function template
const exportFunction = (filename) => `
        function exportTableData() {
            const summaryData = generateSummaryData();
            const headers = getTableHeaders();
            const csvContent = [
                headers,
                ...summaryData.map(row => Object.values(row))
            ].map(row => row.join(',')).join('\\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '${filename}';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
`;