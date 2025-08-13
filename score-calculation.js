// 综合评分计算逻辑

// 计算综合评分
function calculateScores() {
    // 1. 驾驶辅助评分计算 (满分100分)
    const assistMetrics = {
        // 接管指标 (权重30%) - 越少越好
        takeover: {
            noa: 2.3,      // NOA接管次数/百公里
            lcc: 1.8,      // LCC接管次数/百公里
            weight: 0.3
        },
        // 变道指标 (权重25%) - 成功率越高越好
        laneChange: {
            lever: 96.5,    // 拨杆变道成功率
            efficiency: 94.2, // 效率变道成功率
            obstacle: 98.1,   // 避障变道成功率
            cutIn: 89.7,      // 加塞成功率
            overshoot: 3.2,   // 变道超调率 (越低越好)
            weight: 0.25
        },
        // 横向控制 (权重20%)
        lateral: {
            offCenter: 1.5,   // 整体不居中次数/百公里 (越少越好)
            curve: 97.8,      // 弯道通行成功率
            avoidance: 95.6,  // 绕行避障成功率
            weight: 0.2
        },
        // 纵向控制 (权重25%)
        longitudinal: {
            brake: 4.2,       // 点刹次数/百公里 (越少越好)
            cutInFail: 0.8,   // 应对切入失败次数/百公里 (越少越好)
            cruise: 99.2,     // 巡航跟停成功率
            staticBrake: 98.9, // 静止车刹停成功率
            weight: 0.25
        }
    };

    // 计算驾驶辅助评分
    let assistScore = 0;
    
    // 接管评分 (基准值：NOA<3, LCC<2.5为满分)
    const takeoverScore = Math.max(0, 100 - (assistMetrics.takeover.noa / 3 * 50 + assistMetrics.takeover.lcc / 2.5 * 50));
    assistScore += takeoverScore * assistMetrics.takeover.weight;
    
    // 变道评分
    const laneChangeAvg = (assistMetrics.laneChange.lever + assistMetrics.laneChange.efficiency + 
                          assistMetrics.laneChange.obstacle + assistMetrics.laneChange.cutIn) / 4;
    const overshootPenalty = assistMetrics.laneChange.overshoot * 2; // 超调率惩罚
    const laneChangeScore = Math.max(0, laneChangeAvg - overshootPenalty);
    assistScore += laneChangeScore * assistMetrics.laneChange.weight;
    
    // 横向控制评分
    const lateralScore = (assistMetrics.lateral.curve + assistMetrics.lateral.avoidance) / 2 - 
                        assistMetrics.lateral.offCenter * 2; // 不居中惩罚
    assistScore += Math.max(0, lateralScore) * assistMetrics.lateral.weight;
    
    // 纵向控制评分
    const longitudinalAvg = (assistMetrics.longitudinal.cruise + assistMetrics.longitudinal.staticBrake) / 2;
    const brakePenalty = assistMetrics.longitudinal.brake * 1.5 + assistMetrics.longitudinal.cutInFail * 5;
    const longitudinalScore = Math.max(0, longitudinalAvg - brakePenalty);
    assistScore += longitudinalScore * assistMetrics.longitudinal.weight;

    // 2. 自动泊车评分计算 (满分100分)
    const parkingMetrics = {
        // 泊车成功率 (权重70%)
        success: {
            vertical: { in: 96.8, out: 97.2 },    // 垂直车位
            horizontal: { in: 94.5, out: 95.8 },  // 水平车位
            diagonal: { in: 88.3, out: 92.1 },    // 斜列车位
            weight: 0.7
        },
        // 异常率 (权重30%) - 越低越好
        anomaly: {
            totalRate: 2.4, // 总异常率
            weight: 0.3
        }
    };

    // 计算泊车成功率平均值
    const parkingSuccessAvg = (
        (parkingMetrics.success.vertical.in + parkingMetrics.success.vertical.out +
         parkingMetrics.success.horizontal.in + parkingMetrics.success.horizontal.out +
         parkingMetrics.success.diagonal.in + parkingMetrics.success.diagonal.out) / 6
    );

    // 计算自动泊车评分
    const parkingScore = parkingSuccessAvg * parkingMetrics.success.weight + 
                        (100 - parkingMetrics.anomaly.totalRate * 10) * parkingMetrics.anomaly.weight;

    // 3. 异常事件计算 (统计总异常次数)
    const anomalyCount = Math.round(
        assistMetrics.takeover.noa + assistMetrics.takeover.lcc + 
        assistMetrics.lateral.offCenter + assistMetrics.longitudinal.brake + 
        assistMetrics.longitudinal.cutInFail + 
        (100 - parkingSuccessAvg) / 10 // 泊车失败转换为异常次数
    );

    // 更新页面显示
    document.getElementById('assistScore').textContent = assistScore.toFixed(1);
    document.getElementById('parkingScore').textContent = parkingScore.toFixed(1);
    document.getElementById('anomalyCount').textContent = anomalyCount;
    document.getElementById('totalMileage').textContent = '1250.5';

    return {
        assistScore: assistScore.toFixed(1),
        parkingScore: parkingScore.toFixed(1),
        anomalyCount: anomalyCount
    };
}

// 评分等级判断
function getScoreLevel(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'poor';
}

// 评分颜色
function getScoreColor(score) {
    if (score >= 90) return '#28a745'; // 绿色
    if (score >= 80) return '#17a2b8'; // 蓝色
    if (score >= 70) return '#ffc107'; // 黄色
    return '#dc3545'; // 红色
}