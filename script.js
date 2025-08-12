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
    // 不同测试版本任务分布饼图
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

    // 不同功能模式任务分布饼图
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
    // 设置默认日期（只有日期，不包含时间）
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById('startDate').value = oneWeekAgo.toISOString().slice(0, 10);
    document.getElementById('endDate').value = now.toISOString().slice(0, 10);
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
        vehicles: getMultiSelectValues('modalVehicleDropdown'),
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        testers: getMultiSelectValues('modalTesterDropdown')
    };

    // 验证表单
    if (!formData.project) {
        alert('请选择项目');
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
    if (!formData.startDate || !formData.endDate) {
        alert('请选择日期范围');
        return;
    }
    if (formData.testers.length === 0) {
        alert('请选择至少一个测试人员');
        return;
    }

    // 模拟创建报告
    const newReport = {
        id: 'RPT' + String(mockReports.length + 1).padStart(3, '0'),
        project: formData.project,
        taskName: '新建测试任务',
        dataRange: `${formData.startDate} 至 ${formData.endDate}`,
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
    const report = mockReports.find(r => r.id === reportId);
    if (!report) return;

    // 填充基本信息
    const basicInfo = document.getElementById('reportBasicInfo');
    basicInfo.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">报告ID</div>
            <div class="detail-value">${report.id}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">项目</div>
            <div class="detail-value">${report.project}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">任务名称</div>
            <div class="detail-value">${report.taskName}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">数据范围</div>
            <div class="detail-value">${report.dataRange}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">测试版本</div>
            <div class="detail-value">${report.version}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">测试车辆</div>
            <div class="detail-value">${report.vehicle}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">路线</div>
            <div class="detail-value">${report.route}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">里程数据</div>
            <div class="detail-value">${report.mileage}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">状态</div>
            <div class="detail-value"><span class="status-badge status-${getStatusClass(report.status)}">${report.status}</span></div>
        </div>
        <div class="detail-item">
            <div class="detail-label">创建时间</div>
            <div class="detail-value">${report.createTime}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">生成时间</div>
            <div class="detail-value">${report.generateTime || '-'}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">创建人</div>
            <div class="detail-value">${report.creator}</div>
        </div>
    `;

    // 填充指标详情（使用您提供的具体指标）
    const metrics = document.getElementById('reportMetrics');
    metrics.innerHTML = `
        <div class="metric-card">
            <div class="metric-title">NOA</div>
            <div class="metric-value">2.3 次/百公里</div>
            <div class="metric-description">导航辅助驾驶功能表现</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">LCC</div>
            <div class="metric-value">1.8 次/百公里</div>
            <div class="metric-description">车道居中控制功能表现</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">拨杆变道成功率</div>
            <div class="metric-value">96.5%</div>
            <div class="metric-description">拨杆触发变道的成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">效率变道成功率</div>
            <div class="metric-value">94.2%</div>
            <div class="metric-description">效率变道功能成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">避障变道成功率</div>
            <div class="metric-value">98.1%</div>
            <div class="metric-description">避障变道功能成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">加塞成功率</div>
            <div class="metric-value">89.7%</div>
            <div class="metric-description">加塞场景处理成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">变道超调率</div>
            <div class="metric-value">3.2%</div>
            <div class="metric-description">变道过程中的超调比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">整体不居中</div>
            <div class="metric-value">1.5 次/百公里</div>
            <div class="metric-description">车辆不居中行驶的频率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">弯道通行</div>
            <div class="metric-value">97.8%</div>
            <div class="metric-description">弯道通行成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">绕行避障</div>
            <div class="metric-value">95.6%</div>
            <div class="metric-description">绕行避障成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">点刹</div>
            <div class="metric-value">4.2 次/百公里</div>
            <div class="metric-description">点刹操作频率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">应对切入失败</div>
            <div class="metric-value">0.8 次/百公里</div>
            <div class="metric-description">应对车辆切入失败的频率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">巡航跟停</div>
            <div class="metric-value">99.2%</div>
            <div class="metric-description">巡航跟停成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">静止车刹停</div>
            <div class="metric-value">98.9%</div>
            <div class="metric-description">对静止车辆刹停成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">汇入主路</div>
            <div class="metric-value">96.3%</div>
            <div class="metric-description">汇入主路成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">匝道内行驶</div>
            <div class="metric-value">97.5%</div>
            <div class="metric-description">匝道内行驶成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">驶入匝道</div>
            <div class="metric-value">95.8%</div>
            <div class="metric-description">驶入匝道成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">路口直行</div>
            <div class="metric-value">98.4%</div>
            <div class="metric-description">路口直行成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">红绿灯识别（GLC）</div>
            <div class="metric-value">99.1%</div>
            <div class="metric-description">红绿灯识别成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">M2N</div>
            <div class="metric-value">94.7%</div>
            <div class="metric-description">M2N功能成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">施工场景识别率</div>
            <div class="metric-value">92.3%</div>
            <div class="metric-description">施工场景识别成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">施工场景绕行成功率</div>
            <div class="metric-value">88.9%</div>
            <div class="metric-description">施工场景绕行成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">违反交规</div>
            <div class="metric-value">0.3 次/百公里</div>
            <div class="metric-description">违反交通规则的频率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入成功率</div>
            <div class="metric-value">96.8%</div>
            <div class="metric-description">自动泊车入位成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊出成功率</div>
            <div class="metric-value">97.2%</div>
            <div class="metric-description">自动泊车出位成功率</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出急刹顿挫</div>
            <div class="metric-value">2.1%</div>
            <div class="metric-description">泊车过程中急刹顿挫异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出异常点刹</div>
            <div class="metric-value">1.8%</div>
            <div class="metric-description">泊车过程中异常点刹比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出二次起步</div>
            <div class="metric-value">3.5%</div>
            <div class="metric-description">泊车过程中二次起步异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出路线规划不合理</div>
            <div class="metric-value">2.7%</div>
            <div class="metric-description">泊车路线规划不合理异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出方向盘异常</div>
            <div class="metric-value">1.2%</div>
            <div class="metric-description">泊车过程中方向盘异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出揉库次数超限</div>
            <div class="metric-value">4.3%</div>
            <div class="metric-description">泊车揉库次数超限异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出泊车时长超限</div>
            <div class="metric-value">3.9%</div>
            <div class="metric-description">泊车时长超限异常比例</div>
        </div>
        <div class="metric-card">
            <div class="metric-title">泊入、泊出碰撞限位块</div>
            <div class="metric-value">0.5%</div>
            <div class="metric-description">泊车过程中碰撞限位块异常比例</div>
        </div>
    `;

    document.getElementById('reportDetailModal').style.display = 'block';
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    renderReportTable();
});
