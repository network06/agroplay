// ==================== MISSING FUNCTIONS FOR Cuan Farming ====================

function showShop() {
    console.log('Opening shop...');
    const shopHTML = `
        <div class="shop-container">
            <div class="shop-filters">
                <button class="shop-filter-btn active" onclick="window.filterShop('seeds')">
                    ?? Bibit
                </button>
                <button class="shop-filter-btn" onclick="window.filterShop('fertilizers')">
                    ?? Pupuk
                </button>
                <button class="shop-filter-btn" onclick="window.filterShop('tools')">
                    ?? Alat
                </button>
                <button class="shop-filter-btn" onclick="window.filterShop('upgrades')">
                    ?? Upgrade
                </button>
            </div>
            
            <div id="shop-items-grid" class="shop-grid">
                <!-- Items will be rendered here -->
            </div>
        </div>
    `;
    
    window.showModal('Toko Pertanian', shopHTML);
    window.renderShopItems('seeds');
}

function showDailyChallenges() {
    console.log('Opening daily challenges...');
    const challengesHTML = `
        <div class="challenges-container">
            <h3 class="text-xl font-bold mb-4">Tantangan Harian</h3>
            
            <div class="challenge-list">
                <div class="challenge-item">
                    <div class="challenge-icon">??</div>
                    <div class="challenge-content">
                        <h4>Tanam 3 Tanaman</h4>
                        <p>Progress: 0/3</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="challenge-reward">+500 coins</div>
                </div>
                
                <div class="challenge-item">
                    <div class="challenge-icon">??</div>
                    <div class="challenge-content">
                        <h4>Panen 2 Tanaman</h4>
                        <p>Progress: 0/2</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="challenge-reward">+300 coins</div>
                </div>
                
                <div class="challenge-item">
                    <div class="challenge-icon">??</div>
                    <div class="challenge-content">
                        <h4>Gunakan Pupuk Organik</h4>
                        <p>Progress: 0/1</p>
                        <div class="challenge-progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="challenge-reward">+200 coins</div>
                </div>
            </div>
        </div>
    `;
    
    window.showModal('Tantangan Harian', challengesHTML);
}

function showAchievements() {
    console.log('Opening achievements...');
    const achievements = [
        { id: 'first_plant', name: 'Tanaman Pertama', icon: '??', description: 'Tanam tanaman pertama Anda', reward: '100 coins + 10 XP', unlocked: false },
        { id: 'first_harvest', name: 'Panen Pertama', icon: '??', description: 'Panen tanaman pertama Anda', reward: '200 coins + 20 XP', unlocked: false },
        { id: 'level_5', name: 'Level 5', icon: '??', description: 'Capai level 5', reward: '1000 coins + 100 XP', unlocked: false },
        { id: 'level_10', name: 'Level 10', icon: '??', description: 'Capai level 10', reward: '2000 coins + 200 XP', unlocked: false },
        { id: 'rich_farmer', name: 'Petani Kaya', icon: '??', description: 'Kumpulkan 50,000 coins', reward: '5000 coins + 500 XP', unlocked: false },
        { id: 'master_farmer', name: 'Master Petani', icon: '??', description: 'Capai level 20', reward: '10000 coins + 1000 XP', unlocked: false }
    ];
    
    const achievementsHTML = `
        <div class="achievements-container">
            <h3 class="text-xl font-bold mb-4">Pencapaian</h3>
            
            <div class="achievement-list">
                ${achievements.map(achievement => `
                    <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-content">
                            <h4>${achievement.name}</h4>
                            <p>${achievement.description}</p>
                            <p class="achievement-reward">Reward: ${achievement.reward}</p>
                        </div>
                        <div class="achievement-status">
                            ${achievement.unlocked ? '??' : '??'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    window.showModal('Pencapaian', achievementsHTML);
}

function harvestAllReady() {
    console.log('Harvesting all ready crops...');
    let harvestCount = 0;
    let totalRevenue = 0;
    
    window.sessionState.plots.forEach((plot, index) => {
        if (plot && plot.progress >= 100) {
            const plant = window.PLANTS[plot.plantId];
            const fertilizer = window.FERTILIZERS[plot.fertilizer];
            const method = window.METHODS[plot.method];
            
            let yield = plant.baseYield * fertilizer.yieldMult * method.yieldMult;
            yield *= window.gameState.weatherBonus;
            yield *= (0.8 + (plot.waterLevel * 0.1));
            yield = Math.round(yield * 10) / 10;
            
            const revenue = Math.round(yield * plant.sellPrice * window.gameState.marketTrend);
            totalRevenue += revenue;
            
            window.gameState.coins += revenue;
            window.gameState.totalHarvested++;
            window.gameState.totalProfit += revenue - plant.seedPrice;
            window.gameState.xp += Math.max(10, Math.floor(revenue / 1000));
            
            window.sessionState.plots[index] = null;
            harvestCount++;
        }
    });
    
    if (harvestCount > 0) {
        window.saveGameState();
        window.updateUI();
        window.renderPlots();
        
        window.showToast('success', `?? Mass panen ${harvestCount} tanaman! +${window.formatNumber(totalRevenue)} coins`);
    } else {
        window.showToast('info', 'Tidak ada tanaman siap dipanen');
    }
}

function filterShop(category) {
    console.log('Filtering shop by category:', category);
    // Update active button
    document.querySelectorAll('.shop-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    window.renderShopItems(category);
}

function renderShopItems(category = 'seeds') {
    console.log('Rendering shop items for category:', category);
    const items = window.SHOP_ITEMS[category] || [];
    const grid = document.getElementById('shop-items-grid');
    
    if (!grid) return;
    
    grid.innerHTML = items.map(item => {
        const canAfford = window.gameState.coins >= item.price;
        
        return `
            <div class="shop-item" onclick="window.buyItem('${item.id}', '${category}')">
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">${window.formatNumber(item.price)} coins</div>
                <div class="shop-item-description">${item.description || 'Item berkualitas tinggi'}</div>
                <button class="shop-item-btn" ${!canAfford ? 'disabled' : ''}>
                    ${canAfford ? '?? Beli' : '?? Kurang'}
                </button>
            </div>
        `;
    }).join('');
}

function buyItem(itemId, category) {
    console.log('Buying item:', itemId, 'from category:', category);
    const items = window.SHOP_ITEMS[category] || [];
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
        window.showToast('error', 'Item tidak ditemukan!');
        return;
    }
    
    if (window.gameState.coins < item.price) {
        window.showToast('error', 'Coins tidak cukup!');
        return;
    }
    
    // Process purchase
    window.gameState.coins -= item.price;
    window.saveGameState();
    window.updateUI();
    
    window.showToast('success', `?? ${item.name} berhasil dibeli!`);
}

// Make functions available globally
window.showShop = showShop;
window.showDailyChallenges = showDailyChallenges;
window.showAchievements = showAchievements;
window.harvestAllReady = harvestAllReady;
window.filterShop = filterShop;
window.renderShopItems = renderShopItems;
window.buyItem = buyItem;
