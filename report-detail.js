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

// 异常数据
const anomalyData = [
    { name: '急刹顿挫', value: 2.1, level: 'medium' },
    { name: '异常点刹', value: 1.8, level: 'low' },
    { name: '二次起步', value: 3.5, level: 'medium' },
    { name: '路线不合理', value: 2.7, level: 'medium' },
    { name: '方向盘异常', value: 1.2, level: 'low' },
    { name: '揉库超限', value: 4.3, level: 'high' },
    { name: '时长超限', value: 3.9, level: 'medium' },
    { name: '碰撞限位块', value: 0.5, level: 'low' }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initReportDetail();
    initCharts();
    generateAnomalyHeatmap();
});

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

// 初始化图表
function initCharts() {
    // 接管频率对比图
    initTakeoverChart();
    
    // 变道成功率分析图
    initLaneChangeChart();
    
    // 横向控制表现图
    initLateralChart();
    
    // 泊车成功率图
    initParkingSuccessChart();
    
    // 泊车异常分布图
    initParkingAnomalyChart();
}

// 接管频率对比图
function initTakeoverChart() {
    const ctx = document.getElementById('takeoverChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['NOA接管', 'LCC接管', '异常升降级NOA', '异常升降级LCC'],
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

// 变道成功率分析图
function initLaneChangeChart() {
    const ctx = document.getElementById('laneChangeChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['拨杆变道', '效率变道', '避障变道', '加塞', '变道超调'],
            datasets: [{
                label: '成功率 (%)',
                data: [96.5, 94.2, 98.1, 89.7, 96.8],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// 横向控制表现图
function initLateralChart() {
    const ctx = document.getElementById('lateralChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['弯道通行成功', '弯道通行失败', '绕行避障成功', '绕行避障失败'],
            datasets: [{
                data: [97.8, 2.2, 95.6, 4.4],
                backgroundColor: [
                    '#28a745',
                    '#dc3545',
                    '#17a2b8',
                    '#ffc107'
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
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// 泊车成功率图
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

// 泊车异常分布图
function initParkingAnomalyChart() {
    const ctx = document.getElementById('parkingAnomalyChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: anomalyData.map(item => item.name),
            datasets: [{
                data: anomalyData.map(item => item.value),
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
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// 生成异常热力图
function generateAnomalyHeatmap() {
    const heatmapContainer = document.getElementById('anomalyHeatmap');
    
    anomalyData.forEach(item => {
        const cell = document.createElement('div');
        cell.className = `heatmap-cell ${item.level}`;
        cell.textContent = `${item.name}\n${item.value}%`;
        cell.title = `${item.name}: ${item.value}%`;
        heatmapContainer.appendChild(cell);
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