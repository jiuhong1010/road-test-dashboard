// 报告详情页面JavaScript

// 模拟报告数据
const reportData = {
    id: 'RPT001',
    project: '自动驾驶测试',
    taskName: '城市道路测试',
    dataRange: '2024-01-01 至 2024-01-07',
    version: 'v2.0',
    vehicle: '京A12345',
    route: '路线A',
    mileage: '1250.5km',
    status: '成功',
    createTime: '2024-01-08 09:30:00',
    generateTime: '2024-01-08 10:15:00',
    creator: '张三'
};

// 泊车异常数据
const parkingAnomalyData = [
    { name: '泊入、泊出急刹顿挫', value: 2.1 },
    { name: '泊入、泊出异常点刹', value: 1.8 },
    { name: '泊入、泊出二次起步', value: 3.5 },
    { name: '泊入、泊出路线规划不合理', value: 2.7 },
    { name: '泊入、泊出方向盘异常', value: 1.2 },
    { name: '泊入、泊出揉库次数超限', value: 4.3 },
    { name: '泊入、泊出泊车时长超限', value: 3.9 },
    { name: '泊入、泊出碰撞限位块', value: 0.5 }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initReportDetail();
    initProblemAnalysisCharts();
    initTakeoverChart();
    initParkingSuccessChart();
    initParkingAnomalyChart();
});

// 初始化问题分析统计图表
function initProblemAnalysisCharts() {
    // 问题大类分布
    const categoryCtx = document.getElementById('problemCategoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: ['功能异常', '性能问题', '安全隐患', '用户体验', '系统错误'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 8,
                        font: { size: 10 }
                    }
                }
            }
        }
    });

    // 顶级功能分布
    const functionCtx = document.getElementById('topFunctionChart').getContext('2d');
    new Chart(functionCtx, {
        type: 'pie',
        data: {
            labels: ['自动驾驶', '泊车辅助', '导航系统', '安全监控', '其他'],
            datasets: [{
                data: [40, 30, 15, 10, 5],
                backgroundColor: ['#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 8,
                        font: { size: 10 }
                    }
                }
            }
        }
    });

    // 优先级分布
    const priorityCtx = document.getElementById('priorityChart').getContext('2d');
    new Chart(priorityCtx, {
        type: 'pie',
        data: {
            labels: ['P0', 'P1', 'P2', 'P3'],
            datasets: [{
                data: [15, 25, 35, 25],
                backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 8,
                        font: { size: 10 }
                    }
                }
            }
        }
    });

    // 影响程度分布
    const impactCtx = document.getElementById('impactChart').getContext('2d');
    new Chart(impactCtx, {
        type: 'pie',
        data: {
            labels: ['严重', '一般', '轻微'],
            datasets: [{
                data: [20, 45, 35],
                backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 8,
                        font: { size: 10 }
                    }
                }
            }
        }
    });
}

// 初始化自动泊车成功率图表
function initParkingSuccessChart() {
    const ctx = document.getElementById('parkingSuccessChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['垂直泊入', '垂直泊出', '水平泊入', '水平泊出', '斜列泊入', '斜列泊出'],
            datasets: [{
                label: '成功率 (%)',
                data: [96.8, 97.2, 94.5, 95.8, 88.3, 92.1],
                backgroundColor: function(context) {
                    const value = context.parsed.y;
                    if (value >= 95) return 'rgba(40, 167, 69, 0.8)';
                    if (value >= 90) return 'rgba(255, 193, 7, 0.8)';
                    return 'rgba(220, 53, 69, 0.8)';
                },
                borderColor: function(context) {
                    const value = context.parsed.y;
                    if (value >= 95) return 'rgba(40, 167, 69, 1)';
                    if (value >= 90) return 'rgba(255, 193, 7, 1)';
                    return 'rgba(220, 53, 69, 1)';
                },
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '成功率 (%)'
                    }
                }
            }
        }
    });
}

// 初始化接管与异常升降级图表
function initTakeoverChart() {
    const ctx = document.getElementById('takeoverChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['NOA接管', 'LCC接管', 'NOA异常升降级', 'LCC异常升降级'],
            datasets: [{
                label: '次/百公里',
                data: [2.3, 1.8, 0.8, 0.5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.y}次/百公里`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '次/百公里'
                    }
                }
            }
        }
    });
}

// 初始化报告详情
function initReportDetail() {
    // 获取URL参数中的报告ID
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id') || 'RPT001';
    
    // 更新页面标题和报告ID
    document.getElementById('reportId').textContent = reportId;
    document.title = `${reportId} - 报告详情`;
    
    // 填充基本信息
    const basicInfoGrid = document.getElementById('basicInfoGrid');
    basicInfoGrid.innerHTML = `
        <div class="info-item">
            <div class="info-label">报告ID</div>
            <div class="info-value">${reportData.id}</div>
        </div>
        <div class="info-item">
            <div class="info-label">项目</div>
            <div class="info-value">${reportData.project}</div>
        </div>
        <div class="info-item">
            <div class="info-label">任务名称</div>
            <div class="info-value">${reportData.taskName}</div>
        </div>
        <div class="info-item">
            <div class="info-label">数据范围</div>
            <div class="info-value">${reportData.dataRange}</div>
        </div>
        <div class="info-item">
            <div class="info-label">测试版本</div>
            <div class="info-value">${reportData.version}</div>
        </div>
        <div class="info-item">
            <div class="info-label">测试车辆</div>
            <div class="info-value">${reportData.vehicle}</div>
        </div>
        <div class="info-item">
            <div class="info-label">路线</div>
            <div class="info-value">${reportData.route}</div>
        </div>
        <div class="info-item">
            <div class="info-label">里程数据</div>
            <div class="info-value">${reportData.mileage}</div>
        </div>
        <div class="info-item">
            <div class="info-label">状态</div>
            <div class="info-value">${reportData.status}</div>
        </div>
        <div class="info-item">
            <div class="info-label">创建时间</div>
            <div class="info-value">${reportData.createTime}</div>
        </div>
        <div class="info-item">
            <div class="info-label">生成时间</div>
            <div class="info-value">${reportData.generateTime}</div>
        </div>
        <div class="info-item">
            <div class="info-label">创建人</div>
            <div class="info-value">${reportData.creator}</div>
        </div>
    `;
}

// 初始化泊车异常分布图
function initParkingAnomalyChart() {
    const ctx = document.getElementById('parkingAnomalyChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: parkingAnomalyData.map(item => item.name),
            datasets: [{
                data: parkingAnomalyData.map(item => item.value),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#C9CBCF'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    return {
                                        text: `${label}: ${value}%`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].borderColor,
                                        lineWidth: data.datasets[0].borderWidth,
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

// 返回列表页面
function goBack() {
    window.history.back();
}

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}