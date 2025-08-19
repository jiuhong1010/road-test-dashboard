// 模拟数据
const mockReports = [
    {
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
    },
    {
        id: 'RPT002',
        project: '路径规划测试',
        taskName: '高速公路测试',
        dataRange: '2024-01-02 至 2024-01-08',
        version: 'v1.1',
        vehicle: '京B67890',
        route: '路线B',
        mileage: '2100.8km',
        status: '处理中',
        createTime: '2024-01-09 14:20:00',
        generateTime: '',
        creator: '李四'
    },
    {
        id: 'RPT003',
        project: '安全系统测试',
        taskName: '紧急制动测试',
        dataRange: '2024-01-03 至 2024-01-09',
        version: 'v2.0',
        vehicle: '沪C11111',
        route: '路线C',
        mileage: '850.2km',
        status: '失败',
        createTime: '2024-01-10 11:45:00',
        generateTime: '2024-01-10 12:30:00',
        creator: '王五'
    },
    {
        id: 'RPT004',
        project: '自动驾驶测试',
        taskName: '夜间道路测试',
        dataRange: '2024-01-04 至 2024-01-10',
        version: 'v1.0',
        vehicle: '京A12345',
        route: '路线A',
        mileage: '1680.3km',
        status: '成功',
        createTime: '2024-01-11 08:15:00',
        generateTime: '2024-01-11 09:00:00',
        creator: '张三'
    },
    {
        id: 'RPT005',
        project: '路径规划测试',
        taskName: '复杂路况测试',
        dataRange: '2024-01-05 至 2024-01-11',
        version: 'v2.0',
        vehicle: '京B67890',
        route: '路线B',
        mileage: '1920.7km',
        status: '处理中',
        createTime: '2024-01-12 16:30:00',
        generateTime: '',
        creator: '李四'
    }
];

// 获取最近一周的日期
function getLastWeekDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
    }
    
    return dates;
}

// 初始化图表
function initCharts() {
    // 版本-里程饼图
    const versionCtx = document.getElementById('versionChart').getContext('2d');
    new Chart(versionCtx, {
        type: 'doughnut',
        data: {
            labels: ['v1.0', 'v1.1', 'v2.0'],
            datasets: [{
                data: [25, 35, 40],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            onClick: function(event, elements) {
                // 禁用点击事件，防止标签被删除
                return false;
            }
        }
    });

    // 功能-里程饼图
    const modeCtx = document.getElementById('modeChart').getContext('2d');
    new Chart(modeCtx, {
        type: 'doughnut',
        data: {
            labels: ['自动驾驶', '路径规划', '安全系统'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            onClick: function(event, elements) {
                // 禁用点击事件，防止标签被删除
                return false;
            }
        }
    });

    // 每日测试里程柱状图
    const dailyCtx = document.getElementById('dailyMileageChart').getContext('2d');
    const weekDates = getLastWeekDates();
    
    new Chart(dailyCtx, {
        type: 'bar',
        data: {
            labels: weekDates,
            datasets: [{
                label: '测试里程 (km)',
                data: [1200, 1500, 1800, 1300, 1600, 900, 1100],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
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
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// 获取状态样式类
function getStatusClass(status) {
    switch (status) {
        case '成功': return 'success';
        case '失败': return 'failed';
        case '处理中': return 'processing';
        default: return 'processing';
    }
}

// 渲染报告列表
function renderReportTable(reports = mockReports) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.project}</td>
            <td>${report.taskName}</td>
            <td>${report.dataRange}</td>
            <td>${report.version}</td>
            <td>${report.vehicle}</td>
            <td>${report.route}</td>
            <td>${report.mileage}</td>
            <td><span class="status-badge status-${getStatusClass(report.status)}">${report.status}</span></td>
            <td>${report.createTime}</td>
            <td>${report.generateTime || '-'}</td>
            <td>${report.creator}</td>
            <td>
                <div class="action-buttons">
                    ${report.status === '成功' ? `<button class="action-btn btn-view" onclick="viewReportDetail('${report.id}')">查看详情</button>` : ''}
                    ${report.status === '失败' ? `<button class="action-btn btn-retry" onclick="retryReport('${report.id}')">重试</button>` : ''}
                    <button class="action-btn btn-delete" onclick="deleteReport('${report.id}')">删除</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 切换多选下拉框
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const button = dropdown.querySelector('.multi-select-button');
    
    // 关闭其他下拉框
    document.querySelectorAll('.multi-select-dropdown').forEach(dd => {
        if (dd.id !== dropdownId) {
            dd.classList.remove('open');
            dd.querySelector('.multi-select-button').classList.remove('active');
        }
    });
    
    // 切换当前下拉框
    dropdown.classList.toggle('open');
    button.classList.toggle('active');
}

// 更新多选下拉框显示
function updateMultiSelect(dropdownId, selectedSpanId) {
    const dropdown = document.getElementById(dropdownId);
    const selectedSpan = document.getElementById(selectedSpanId);
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    
    const selectedValues = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    
    let placeholderText = '';
    switch (dropdownId) {
        case 'routeDropdown':
            placeholderText = '请选择路线';
            break;
        case 'statusDropdown':
            placeholderText = '请选择状态';
            break;
        case 'modalVersionDropdown':
            placeholderText = '请选择测试版本';
            break;
        case 'modalVehicleDropdown':
            placeholderText = '请选择车牌号';
            break;
        case 'modalTesterDropdown':
            placeholderText = '请选择测试人员';
            break;
        default:
            placeholderText = '请选择';
    }
    
    if (selectedValues.length === 0) {
        selectedSpan.textContent = placeholderText;
    } else if (selectedValues.length === 1) {
        selectedSpan.textContent = selectedValues[0];
    } else {
        selectedSpan.textContent = `已选择 ${selectedValues.length} 项`;
    }
}

// 获取多选框选中的值
function getMultiSelectValues(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// 筛选报告（手动触发）
function filterReports() {
    const creator = document.getElementById('creatorFilter').value;
    const version = document.getElementById('versionFilter').value;
    const vehicle = document.getElementById('vehicleFilter').value;
    const route = getMultiSelectValues('routeDropdown');
    const status = getMultiSelectValues('statusDropdown');

    let filteredReports = mockReports.filter(report => {
        return (!creator || report.creator === creator) &&
               (!version || report.version === version) &&
               (!vehicle || report.vehicle === vehicle) &&
               (route.length === 0 || route.includes(report.route)) &&
               (status.length === 0 || status.includes(report.status));
    });

    renderReportTable(filteredReports);
}

// 重置筛选器
function resetFilters() {
    document.getElementById('creatorFilter').value = '';
    document.getElementById('versionFilter').value = '';
    document.getElementById('vehicleFilter').value = '';
    
    // 清空多选框
    const routeCheckboxes = document.querySelectorAll('#routeDropdown input[type="checkbox"]');
    const statusCheckboxes = document.querySelectorAll('#statusDropdown input[type="checkbox"]');
    
    routeCheckboxes.forEach(checkbox => checkbox.checked = false);
    statusCheckboxes.forEach(checkbox => checkbox.checked = false);
    
    // 更新显示文本
    document.getElementById('routeSelected').textContent = '请选择路线';
    document.getElementById('statusSelected').textContent = '请选择状态';
    
    // 关闭下拉框
    document.querySelectorAll('.multi-select-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.multi-select-button').classList.remove('active');
    });
    
    renderReportTable(mockReports);
}

// 点击外部关闭下拉框
document.addEventListener('click', function(event) {
    if (!event.target.closest('.multi-select-dropdown')) {
        document.querySelectorAll('.multi-select-dropdown').forEach(dropdown => {
            dropdown.classList.remove('open');
            dropdown.querySelector('.multi-select-button').classList.remove('active');
        });
    }
});

// 打开新增报告弹窗
function openNewReportModal() {
    document.getElementById('newReportModal').style.display = 'block';
    // 设置默认日期时间
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // 格式化为 datetime-local 格式 (YYYY-MM-DDTHH:MM)
    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    document.getElementById('startDateTime').value = formatDateTime(oneWeekAgo);
    document.getElementById('endDateTime').value = formatDateTime(now);
}

// 关闭新增报告弹窗
function closeNewReportModal() {
    document.getElementById('newReportModal').style.display = 'none';
    document.getElementById('newReportForm').reset();
    
    // 重置多选下拉框
    const modalDropdowns = ['modalVersionDropdown', 'modalVehicleDropdown', 'modalTesterDropdown'];
    modalDropdowns.forEach(dropdownId => {
        const checkboxes = document.querySelectorAll(`#${dropdownId} input[type="checkbox"]`);
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        const selectedSpanId = dropdownId.replace('Dropdown', 'Selected');
        updateMultiSelect(dropdownId, selectedSpanId);
        
        document.getElementById(dropdownId).classList.remove('open');
        document.getElementById(dropdownId).querySelector('.multi-select-button').classList.remove('active');
    });
}

// 确认新增报告
function confirmNewReport() {
    const formData = {
        versions: getMultiSelectValues('modalVersionDropdown'),
        project: document.getElementById('modalProjectFilter').value,
        taskName: document.getElementById('modalTaskFilter').value,
        vehicles: getMultiSelectValues('modalVehicleDropdown'),
        startDateTime: document.getElementById('startDateTime').value,
        endDateTime: document.getElementById('endDateTime').value,
        testers: getMultiSelectValues('modalTesterDropdown')
    };

    // 验证表单
    if (!formData.project) {
        alert('请选择项目');
        return;
    }
    if (!formData.taskName) {
        alert('请选择测试任务');
        return;
    }
    if (formData.versions.length === 0) {
        alert('请选择至少一个测试版本');
        return;
    }
    if (formData.vehicles.length === 0) {
        alert('请选择至少一个车牌号');
        return;
    }
    if (!formData.startDateTime || !formData.endDateTime) {
        alert('请选择日期时间范围');
        return;
    }
    if (formData.testers.length === 0) {
        alert('请选择至少一个测试人员');
        return;
    }

    // 格式化日期时间显示
    const formatDisplayDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('zh-CN');
    };

    // 模拟创建报告
    const newReport = {
        id: 'RPT' + String(mockReports.length + 1).padStart(3, '0'),
        project: formData.project,
        taskName: formData.taskName,
        dataRange: `${formatDisplayDateTime(formData.startDateTime)} 至 ${formatDisplayDateTime(formData.endDateTime)}`,
        version: formData.versions.join(', '),
        vehicle: formData.vehicles.join(', '),
        route: '待分配',
        mileage: '计算中...',
        status: '处理中',
        createTime: new Date().toLocaleString('zh-CN'),
        generateTime: '',
        creator: '当前用户'
    };

    mockReports.unshift(newReport);
    renderReportTable();
    closeNewReportModal();
    
    alert('报告创建成功！');
}

// 查看报告详情
function viewReportDetail(reportId) {
    // 跳转到详情页面
    window.open(`report-detail.html?id=${reportId}`, '_blank');
}

// 关闭报告详情弹窗
function closeReportDetailModal() {
    document.getElementById('reportDetailModal').style.display = 'none';
}

// 重试报告
function retryReport(reportId) {
    if (confirm('确定要重试生成此报告吗？')) {
        const reportIndex = mockReports.findIndex(r => r.id === reportId);
        if (reportIndex !== -1) {
            mockReports[reportIndex].status = '处理中';
            mockReports[reportIndex].generateTime = '';
            renderReportTable();
            
            // 模拟处理过程
            setTimeout(() => {
                mockReports[reportIndex].status = '成功';
                mockReports[reportIndex].generateTime = new Date().toLocaleString('zh-CN');
                renderReportTable();
                alert('报告重试成功！');
            }, 2000);
        }
    }
}

// 删除报告
function deleteReport(reportId) {
    if (confirm('确定要删除此报告吗？此操作不可恢复。')) {
        const reportIndex = mockReports.findIndex(r => r.id === reportId);
        if (reportIndex !== -1) {
            mockReports.splice(reportIndex, 1);
            renderReportTable();
            alert('报告已删除');
        }
    }
}

// 点击弹窗外部关闭弹窗
window.onclick = function(event) {
    const newReportModal = document.getElementById('newReportModal');
    const reportDetailModal = document.getElementById('reportDetailModal');
    
    if (event.target === newReportModal) {
        closeNewReportModal();
    }
    if (event.target === reportDetailModal) {
        closeReportDetailModal();
    }
}

// 初始化时间筛选器
function initTimeFilter() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // 格式化为 YYYY-MM-DD 格式
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    document.getElementById('statsStartDate').value = formatDate(sevenDaysAgo);
    document.getElementById('statsEndDate').value = formatDate(today);
    document.getElementById('quickTimeSelect').value = '7';
}

// 应用快速时间筛选
function applyQuickTimeFilter() {
    const quickSelect = document.getElementById('quickTimeSelect');
    const days = parseInt(quickSelect.value);
    
    const today = new Date();
    const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    document.getElementById('statsStartDate').value = formatDate(startDate);
    document.getElementById('statsEndDate').value = formatDate(today);
    
    updateStatsData();
}

// 重置时间筛选器
function resetTimeFilter() {
    document.getElementById('quickTimeSelect').value = '7';
    applyQuickTimeFilter();
}

// 更新统计数据
function updateStatsData() {
    const startDate = document.getElementById('statsStartDate').value;
    const endDate = document.getElementById('statsEndDate').value;
    
    if (!startDate || !endDate) {
        alert('请选择完整的时间范围');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        alert('开始时间不能晚于结束时间');
        return;
    }
    
    // 根据时间范围计算天数差
    const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    
    // 更新测试任务数
    const taskCount = Math.floor(daysDiff * 30 + Math.random() * 200); // 模拟数据
    document.querySelector('.stat-number').textContent = taskCount;
    
    // 重新初始化图表（使用新的时间范围数据）
    initChartsWithTimeRange(startDate, endDate);
    
    // 显示更新提示
    showUpdateNotification(`已更新 ${startDate} 至 ${endDate} 的统计数据`);
}

// 根据时间范围初始化图表
function initChartsWithTimeRange(startDate, endDate) {
    // 计算时间范围内的数据
    const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    
    // 版本-里程饼图（根据时间范围调整数据）
    const versionCtx = document.getElementById('versionChart').getContext('2d');
    
    // 清除现有图表
    if (window.versionChart) {
        window.versionChart.destroy();
    }
    
    window.versionChart = new Chart(versionCtx, {
        type: 'doughnut',
        data: {
            labels: ['v1.0', 'v1.1', 'v2.0'],
            datasets: [{
                data: [
                    Math.floor(daysDiff * 0.8 + Math.random() * 20),
                    Math.floor(daysDiff * 1.2 + Math.random() * 30),
                    Math.floor(daysDiff * 1.5 + Math.random() * 40)
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: { size: 12 }
                    }
                }
            },
            onClick: function() { return false; }
        }
    });

    // 功能-里程饼图
    const modeCtx = document.getElementById('modeChart').getContext('2d');
    
    if (window.modeChart) {
        window.modeChart.destroy();
    }
    
    window.modeChart = new Chart(modeCtx, {
        type: 'doughnut',
        data: {
            labels: ['自动驾驶', '路径规划', '安全系统'],
            datasets: [{
                data: [
                    Math.floor(daysDiff * 1.8 + Math.random() * 50),
                    Math.floor(daysDiff * 1.2 + Math.random() * 30),
                    Math.floor(daysDiff * 1.0 + Math.random() * 25)
                ],
                backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: { size: 12 }
                    }
                }
            },
            onClick: function() { return false; }
        }
    });

    // 每日测试里程柱状图
    const dailyCtx = document.getElementById('dailyMileageChart').getContext('2d');
    
    if (window.dailyChart) {
        window.dailyChart.destroy();
    }
    
    // 生成时间范围内的日期标签和数据
    const dates = [];
    const mileageData = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 如果时间范围超过30天，只显示最近30天
    const displayDays = Math.min(daysDiff, 30);
    const displayStart = daysDiff > 30 ? new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000) : start;
    
    for (let d = new Date(displayStart); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
        mileageData.push(Math.floor(800 + Math.random() * 1000)); // 模拟数据
    }
    
    window.dailyChart = new Chart(dailyCtx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: '测试里程 (km)',
                data: mileageData,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    ticks: { font: { size: 12 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                }
            }
        }
    });
}

// 显示更新通知
function showUpdateNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后自动消失
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTimeFilter();
    initCharts();
    renderReportTable();
});
