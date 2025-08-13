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
    initParkingAnomalyChart();
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