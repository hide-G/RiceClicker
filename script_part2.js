            showNotification(
                gameState.language === 'ja' ? 'お米が足りません' : 'Not Enough Rice',
                gameState.language === 'ja' 
                    ? 'この品種の購入にはお米がもっと必要です' 
                    : 'You need more rice to purchase this variety'
            );
        }
    }
}

// Update UI
function updateUI() {
    // Update rice count
    document.getElementById('rice-count').textContent = Math.floor(gameState.rice);
    
    // Update rice per second
    document.getElementById('rice-per-second').textContent = gameState.ricePerSecond.toFixed(1);
    
    // Update building costs and owned counts
    for (const [buildingId, building] of Object.entries(gameState.buildings)) {
        if (building.unlocked) {
            const costElement = document.getElementById(`${buildingId}-cost`);
            const ownedElement = document.getElementById(`${buildingId}-owned`);
            const productionElement = document.getElementById(`${buildingId}-production`);
            
            if (costElement) costElement.textContent = Math.floor(building.cost);
            if (ownedElement) ownedElement.textContent = building.owned;
            if (productionElement) productionElement.textContent = (building.owned * building.production).toFixed(1);
        }
    }
    
    // Update buy buttons (enable/disable based on rice count)
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        const upgradeId = button.getAttribute('data-upgrade');
        
        // Check if it's a building, click upgrade, or rice type
        if (gameState.buildings[upgradeId]) {
            button.disabled = gameState.rice < gameState.buildings[upgradeId].cost;
        } else if (gameState.clickUpgrades[upgradeId]) {
            button.disabled = gameState.rice < gameState.clickUpgrades[upgradeId].cost || gameState.clickUpgrades[upgradeId].purchased;
        } else if (gameState.riceTypes[upgradeId]) {
            button.disabled = gameState.rice < gameState.riceTypes[upgradeId].cost || gameState.riceTypes[upgradeId].purchased;
        }
    });
}

// Check building unlocks
function checkBuildingUnlocks() {
    // Unlock agricultural cooperative when you have 10 rice fields
    if (gameState.buildings['rice-field'].owned >= 10 && !gameState.buildings['agricultural-cooperative'].unlocked) {
        gameState.buildings['agricultural-cooperative'].unlocked = true;
        addBuildingToUI('agricultural-cooperative');
        showNotification(
            gameState.language === 'ja' ? '新施設解放' : 'New Building Unlocked',
            gameState.language === 'ja' ? '農協が解放されました！' : 'Agricultural Cooperative is now available!'
        );
    }
    
    // Unlock research lab when you have 5 agricultural cooperatives
    if (gameState.buildings['agricultural-cooperative'].owned >= 5 && !gameState.buildings['research-lab'].unlocked) {
        gameState.buildings['research-lab'].unlocked = true;
        addBuildingToUI('research-lab');
        showNotification(
            gameState.language === 'ja' ? '新施設解放' : 'New Building Unlocked',
            gameState.language === 'ja' ? '農業研究所が解放されました！' : 'Agricultural Research Lab is now available!'
        );
    }
    
    // Unlock space farm when you have 3 research labs
    if (gameState.buildings['research-lab'].owned >= 3 && !gameState.buildings['space-farm'].unlocked) {
        gameState.buildings['space-farm'].unlocked = true;
        addBuildingToUI('space-farm');
        showNotification(
            gameState.language === 'ja' ? '新施設解放' : 'New Building Unlocked',
            gameState.language === 'ja' ? '宇宙農場が解放されました！' : 'Space Farm is now available!'
        );
    }
}

// Check upgrade availability
function checkUpgradeAvailability() {
    // Set all upgrades to unlocked
    for (const upgradeId in gameState.clickUpgrades) {
        gameState.clickUpgrades[upgradeId].unlocked = true;
    }
    
    // Set all rice types to unlocked
    for (const riceTypeId in gameState.riceTypes) {
        gameState.riceTypes[riceTypeId].unlocked = true;
    }
    
    // Update UI to reflect availability
    updateUI();
}

// Add building to UI
function addBuildingToUI(buildingId) {
    const building = gameState.buildings[buildingId];
    const buildingsTab = document.getElementById('buildings');
    
    const buildingElement = document.createElement('div');
    buildingElement.className = 'upgrade-item';
    buildingElement.id = buildingId;
    
    buildingElement.innerHTML = `
        <div class="upgrade-info">
            <h3 data-ja="${building.name.ja}" data-en="${building.name.en}">${building.name[gameState.language]}</h3>
            <p data-ja="${building.description.ja}" data-en="${building.description.en}">${building.description[gameState.language]}</p>
            <p class="cost"><span data-ja="コスト" data-en="Cost">コスト</span>: <span id="${buildingId}-cost">${building.baseCost}</span> <span data-ja="お米" data-en="rice">お米</span></p>
            <p class="owned"><span data-ja="所有" data-en="Owned">所有</span>: <span id="${buildingId}-owned">0</span></p>
            <p class="production"><span data-ja="生産" data-en="Production">生産</span>: <span id="${buildingId}-production">0</span> <span data-ja="お米/秒" data-en="rice/sec">お米/秒</span></p>
        </div>
        <button class="buy-button" data-upgrade="${buildingId}" data-ja="購入" data-en="Buy">購入</button>
    `;
    
    buildingsTab.appendChild(buildingElement);
    updateLanguage();
}

// Add click upgrade to UI
function addClickUpgradeToUI(upgradeId) {
    const upgrade = gameState.clickUpgrades[upgradeId];
    const clickUpgradesTab = document.getElementById('click-upgrades');
    
    const upgradeElement = document.createElement('div');
    upgradeElement.className = 'upgrade-item';
    upgradeElement.id = upgradeId;
    
    upgradeElement.innerHTML = `
        <div class="upgrade-info">
            <h3 data-ja="${upgrade.name.ja}" data-en="${upgrade.name.en}">${upgrade.name[gameState.language]}</h3>
            <p data-ja="${upgrade.description.ja}" data-en="${upgrade.description.en}">${upgrade.description[gameState.language]}</p>
            <p class="cost"><span data-ja="コスト" data-en="Cost">コスト</span>: <span id="${upgradeId}-cost">${upgrade.cost}</span> <span data-ja="お米" data-en="rice">お米</span></p>
        </div>
        <button class="buy-button" data-upgrade="${upgradeId}" data-ja="購入" data-en="Buy">購入</button>
    `;
    
    clickUpgradesTab.appendChild(upgradeElement);
    updateLanguage();
}

// Add rice type to UI
function addRiceTypeToUI(riceTypeId) {
    const riceType = gameState.riceTypes[riceTypeId];
    const riceTypesTab = document.getElementById('rice-types');
    
    const riceTypeElement = document.createElement('div');
    riceTypeElement.className = 'upgrade-item';
    riceTypeElement.id = riceTypeId;
    
    riceTypeElement.innerHTML = `
        <div class="upgrade-info">
            <h3 data-ja="${riceType.name.ja}" data-en="${riceType.name.en}">${riceType.name[gameState.language]}</h3>
            <p data-ja="${riceType.description.ja}" data-en="${riceType.description.en}">${riceType.description[gameState.language]}</p>
            <p class="cost"><span data-ja="コスト" data-en="Cost">コスト</span>: <span id="${riceTypeId}-cost">${riceType.cost}</span> <span data-ja="お米" data-en="rice">お米</span></p>
            <p><span data-ja="生産倍率" data-en="Production Multiplier">生産倍率</span>: x${riceType.multiplier}</p>
        </div>
        <button class="buy-button" data-upgrade="${riceTypeId}" data-ja="購入" data-en="Buy">購入</button>
    `;
    
    riceTypesTab.appendChild(riceTypeElement);
    updateLanguage();
}

// Initialize upgrades
function initializeUpgrades() {
    // Add click upgrades tab content
    const clickUpgradesTab = document.getElementById('click-upgrades');
    clickUpgradesTab.innerHTML = '';
    
    // Add initial click upgrades
    addClickUpgradeToUI('farming-tools');
    addClickUpgradeToUI('harvest-festival');
    addClickUpgradeToUI('master-farmer');
    
    // Add rice types tab content
    const riceTypesTab = document.getElementById('rice-types');
    riceTypesTab.innerHTML = '';
    
    // Add initial rice types
    addRiceTypeToUI('koshihikari');
    addRiceTypeToUI('sasanishiki');
    addRiceTypeToUI('akitakomachi');
    
    // Check initial upgrades
    checkUpgradeAvailability();
}

// Initialize achievements
function initializeAchievements() {
    const achievementsListElement = document.querySelector('.achievements-list');
    achievementsListElement.innerHTML = '';
    
    for (const [achievementId, achievement] of Object.entries(gameState.achievements)) {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-item';
        achievementElement.id = `achievement-${achievementId}`;
        
        achievementElement.innerHTML = `
            <h3 data-ja="${achievement.name.ja}" data-en="${achievement.name.en}">${achievement.name[gameState.language]}</h3>
            <p data-ja="${achievement.description.ja}" data-en="${achievement.description.en}">${achievement.description[gameState.language]}</p>
        `;
        
        achievementsListElement.appendChild(achievementElement);
    }
}

// Check achievements
function checkAchievements() {
    for (const [achievementId, achievement] of Object.entries(gameState.achievements)) {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            
            // Update UI
            const achievementElement = document.getElementById(`achievement-${achievementId}`);
            if (achievementElement) {
                achievementElement.classList.add('unlocked');
            }
            
            // Show notification
            showNotification(
                gameState.language === 'ja' ? '実績解除' : 'Achievement Unlocked',
                gameState.language === 'ja' ? `${achievement.name.ja}を達成しました！` : `${achievement.name.en} achieved!`,
                'achievement'
            );
        }
    }
}

// Check for random events
function checkRandomEvents() {
    for (const [eventId, event] of Object.entries(gameState.events)) {
        if (!event.active && Math.random() < event.chance) {
            triggerEvent(eventId);
        }
    }
}

// Trigger an event
function triggerEvent(eventId) {
    const event = gameState.events[eventId];
    
    // Add to active events
    gameState.activeEvents.push({
        type: eventId,
        multiplier: event.multiplier,
        timeLeft: event.duration
    });
    
    // Show event banner
    showEventBanner(event);
    
    // Show notification
    showNotification(
        gameState.language === 'ja' ? 'イベント発生' : 'Event Triggered',
        gameState.language === 'ja' ? `${event.name.ja}が発生しました！` : `${event.name.en} has occurred!`,
        'event'
    );
}

// Show event banner
function showEventBanner(event) {
    const container = document.querySelector('.container');
    const existingBanner = document.querySelector('.event-banner');
    
    if (existingBanner) {
        existingBanner.remove();
    }
    
    const banner = document.createElement('div');
    banner.className = 'event-banner';
    banner.innerHTML = `
        <h3>${event.name[gameState.language]}</h3>
        <p>${event.description[gameState.language]}</p>
    `;
    
    container.insertBefore(banner, container.firstChild);
    
    // Remove banner after event ends
    setTimeout(() => {
        banner.remove();
    }, event.duration * 1000);
}

// Update active events
function updateActiveEvents() {
    for (let i = gameState.activeEvents.length - 1; i >= 0; i--) {
        const event = gameState.activeEvents[i];
        event.timeLeft--;
        
        if (event.timeLeft <= 0) {
            gameState.activeEvents.splice(i, 1);
        }
    }
}

// Show notification
function showNotification(title, message, type = '') {
    const notificationArea = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
    `;
    
    notificationArea.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Switch tab
function switchTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        }
    });
    
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// Set language
function setLanguage(lang) {
    gameState.language = lang;
    
    // Update language buttons
    const langJaButton = document.getElementById('lang-ja');
    const langEnButton = document.getElementById('lang-en');
    
    if (lang === 'ja') {
        langJaButton.classList.add('active');
        langEnButton.classList.remove('active');
    } else {
        langJaButton.classList.remove('active');
        langEnButton.classList.add('active');
    }
    
    updateLanguage();
}

// Update all text based on selected language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-ja][data-en]');
    
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-${gameState.language}`);
    });
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);