// Game state
const gameState = {
    rice: 0,
    ricePerClick: 1,
    ricePerSecond: 0,
    language: 'ja',
    buildings: {
        'rice-field': {
            name: {
                ja: '田んぼ',
                en: 'Rice Field'
            },
            description: {
                ja: '自動で米を生産します',
                en: 'Automatically produces rice'
            },
            baseCost: 10,
            cost: 10,
            owned: 0,
            production: 0.1,
            unlocked: true
        },
        'farmer': {
            name: {
                ja: '農家',
                en: 'Farmer'
            },
            description: {
                ja: '生産効率をアップします',
                en: 'Increases production efficiency'
            },
            baseCost: 50,
            cost: 50,
            owned: 0,
            production: 0.5,
            unlocked: true
        },
        'rice-mill': {
            name: {
                ja: '精米所',
                en: 'Rice Mill'
            },
            description: {
                ja: '米の品質向上で価値増加',
                en: 'Increases value through quality improvement'
            },
            baseCost: 200,
            cost: 200,
            owned: 0,
            production: 2,
            unlocked: true
        },
        'agricultural-cooperative': {
            name: {
                ja: '農協',
                en: 'Agricultural Cooperative'
            },
            description: {
                ja: '大量生産システム',
                en: 'Mass production system'
            },
            baseCost: 1000,
            cost: 1000,
            owned: 0,
            production: 10,
            unlocked: false
        },
        'research-lab': {
            name: {
                ja: '農業研究所',
                en: 'Agricultural Research Lab'
            },
            description: {
                ja: '新品種開発',
                en: 'Development of new varieties'
            },
            baseCost: 5000,
            cost: 5000,
            owned: 0,
            production: 50,
            unlocked: false
        },
        'space-farm': {
            name: {
                ja: '宇宙農場',
                en: 'Space Farm'
            },
            description: {
                ja: '最終段階の超大規模生産',
                en: 'Final stage of ultra-large-scale production'
            },
            baseCost: 20000,
            cost: 20000,
            owned: 0,
            production: 200,
            unlocked: false
        }
    },
    clickUpgrades: {
        'farming-tools': {
            name: {
                ja: '農具セット',
                en: 'Farming Tools'
            },
            description: {
                ja: '1クリックあたりの収穫量増加',
                en: 'Increases harvest per click'
            },
            cost: 100,
            multiplier: 2,
            unlocked: false,
            purchased: false
        },
        'harvest-festival': {
            name: {
                ja: '収穫祭',
                en: 'Harvest Festival'
            },
            description: {
                ja: '一定時間クリック効果倍増',
                en: 'Doubles click effect for a certain time'
            },
            cost: 500,
            multiplier: 3,
            unlocked: false,
            purchased: false
        },
        'master-farmer': {
            name: {
                ja: '熟練農夫',
                en: 'Master Farmer'
            },
            description: {
                ja: 'クリティカル収穫の確率アップ',
                en: 'Increases critical harvest probability'
            },
            cost: 1000,
            multiplier: 5,
            unlocked: false,
            purchased: false
        }
    },
    riceTypes: {
        'koshihikari': {
            name: {
                ja: 'コシヒカリ',
                en: 'Koshihikari'
            },
            description: {
                ja: '日本を代表する高級品種',
                en: 'Premium variety representing Japan'
            },
            cost: 1000,
            multiplier: 1.5,
            unlocked: false,
            purchased: false
        },
        'sasanishiki': {
            name: {
                ja: 'ササニシキ',
                en: 'Sasanishiki'
            },
            description: {
                ja: '冷めても美味しい寿司向き品種',
                en: 'Variety suitable for sushi, tasty even when cold'
            },
            cost: 3000,
            multiplier: 2,
            unlocked: false,
            purchased: false
        },
        'akitakomachi': {
            name: {
                ja: 'あきたこまち',
                en: 'Akitakomachi'
            },
            description: {
                ja: '粘りと甘みのバランスが絶妙',
                en: 'Perfect balance of stickiness and sweetness'
            },
            cost: 5000,
            multiplier: 3,
            unlocked: false,
            purchased: false
        }
    },
    achievements: {
        'first-harvest': {
            name: {
                ja: '初回収穫',
                en: 'First Harvest'
            },
            description: {
                ja: '初めてお米をクリックした',
                en: 'Clicked rice for the first time'
            },
            unlocked: false,
            condition: function() {
                return gameState.rice >= 1;
            }
        },
        'rice-collector': {
            name: {
                ja: 'お米コレクター',
                en: 'Rice Collector'
            },
            description: {
                ja: '100粒のお米を集めた',
                en: 'Collected 100 grains of rice'
            },
            unlocked: false,
            condition: function() {
                return gameState.rice >= 100;
            }
        },
        'rice-enthusiast': {
            name: {
                ja: 'お米愛好家',
                en: 'Rice Enthusiast'
            },
            description: {
                ja: '1,000粒のお米を集めた',
                en: 'Collected 1,000 grains of rice'
            },
            unlocked: false,
            condition: function() {
                return gameState.rice >= 1000;
            }
        },
        'rice-baron': {
            name: {
                ja: 'お米男爵',
                en: 'Rice Baron'
            },
            description: {
                ja: '10,000粒のお米を集めた',
                en: 'Collected 10,000 grains of rice'
            },
            unlocked: false,
            condition: function() {
                return gameState.rice >= 10000;
            }
        },
        'first-field': {
            name: {
                ja: '最初の田んぼ',
                en: 'First Field'
            },
            description: {
                ja: '最初の田んぼを購入した',
                en: 'Purchased your first rice field'
            },
            unlocked: false,
            condition: function() {
                return gameState.buildings['rice-field'].owned >= 1;
            }
        }
    },
    events: {
        'harvest-festival': {
            name: {
                ja: '豊作祭',
                en: 'Harvest Festival'
            },
            description: {
                ja: '期間限定で全生産量2倍！',
                en: 'All production doubled for a limited time!'
            },
            chance: 0.001,
            duration: 60,
            multiplier: 2,
            active: false
        },
        'typhoon-warning': {
            name: {
                ja: '台風警報',
                en: 'Typhoon Warning'
            },
            description: {
                ja: '一時的に生産停止のピンチ！',
                en: 'Production temporarily stopped!'
            },
            chance: 0.0005,
            duration: 30,
            multiplier: 0,
            active: false
        },
        'new-rice-fair': {
            name: {
                ja: '新米フェア',
                en: 'New Rice Fair'
            },
            description: {
                ja: 'クリック効果が3倍に！',
                en: 'Click effect tripled!'
            },
            chance: 0.001,
            duration: 45,
            multiplier: 3,
            active: false
        }
    },
    activeEvents: []
};

// Initialize the game
function initGame() {
    // Set up event listeners
    document.getElementById('rice-image').addEventListener('click', clickRice);
    document.getElementById('lang-ja').addEventListener('click', () => setLanguage('ja'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    
    // Set up tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.getAttribute('data-tab'));
        });
    });
    
    // Set up buy buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('buy-button')) {
            const upgradeId = event.target.getAttribute('data-upgrade');
            buyUpgrade(upgradeId);
        }
    });
    
    // Update rice image to use the requested URL
    document.getElementById('rice-image').src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiogyYnQCIIlya1aXIjIV8xb-cW7UQ6rr8bfFuPiBoauDeRQiQNza2nOFriux5z3rAROWGFkfkRtZ4DR9D4rsT8oG3s3J1roylPhs1GUr5x6qyfE8RjEqm8rgiEPwyL0bChxNVyP3JV9I1/s800/kome_hakumai.png';
    
    // Initialize upgrades and achievements
    initializeUpgrades();
    initializeAchievements();
    
    // Start game loop
    setInterval(gameLoop, 1000);
}

// Game loop - runs every second
function gameLoop() {
    produceRice();
    updateUI();
    checkBuildingUnlocks();
    checkUpgradeAvailability();
    checkAchievements();
    checkRandomEvents();
    updateActiveEvents();
}

// Click rice
function clickRice() {
    // Calculate click value with upgrades and events
    let clickValue = gameState.ricePerClick;
    
    // Apply click upgrades
    if (gameState.clickUpgrades['farming-tools'].purchased) {
        clickValue *= gameState.clickUpgrades['farming-tools'].multiplier;
    }
    
    // Check for active events that affect clicking
    gameState.activeEvents.forEach(event => {
        if (gameState.events[event.type].name.en === 'New Rice Fair') {
            clickValue *= event.multiplier;
        }
    });
    
    // Add rice
    gameState.rice += clickValue;
    
    // Create floating text
    createFloatingText(clickValue);
    
    // Update UI
    updateUI();
}

// Create floating text animation
function createFloatingText(value) {
    const riceImage = document.getElementById('rice-image');
    const rect = riceImage.getBoundingClientRect();
    
    const particle = document.createElement('div');
    particle.className = 'rice-particle';
    particle.textContent = '+' + value;
    
    // Random position around the rice image
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * (rect.height / 2);
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Produce rice from buildings
function produceRice() {
    let production = 0;
    
    // Calculate base production from buildings
    for (const [buildingId, building] of Object.entries(gameState.buildings)) {
        production += building.owned * building.production;
    }
    
    // Apply rice type multipliers
    for (const [riceTypeId, riceType] of Object.entries(gameState.riceTypes)) {
        if (riceType.purchased) {
            production *= riceType.multiplier;
            break; // Only one rice type can be active at a time
        }
    }
    
    // Apply event multipliers
    gameState.activeEvents.forEach(event => {
        if (gameState.events[event.type].name.en === 'Harvest Festival') {
            production *= event.multiplier;
        } else if (gameState.events[event.type].name.en === 'Typhoon Warning') {
            production = 0; // No production during typhoon
        }
    });
    
    // Update rice per second
    gameState.ricePerSecond = production;
    
    // Add to total
    gameState.rice += production;
}

// Buy upgrade
function buyUpgrade(upgradeId) {
    // Check if it's a building
    if (gameState.buildings[upgradeId]) {
        buyBuilding(upgradeId);
    }
    // Check if it's a click upgrade
    else if (gameState.clickUpgrades[upgradeId]) {
        buyClickUpgrade(upgradeId);
    }
    // Check if it's a rice type
    else if (gameState.riceTypes[upgradeId]) {
        buyRiceType(upgradeId);
    }
}

// Buy building
function buyBuilding(buildingId) {
    const building = gameState.buildings[buildingId];
    
    if (gameState.rice >= building.cost) {
        gameState.rice -= building.cost;
        building.owned++;
        
        // Increase cost for next purchase (10% increase)
        building.cost = Math.ceil(building.baseCost * Math.pow(1.1, building.owned));
        
        // Update UI
        updateUI();
        
        // Check for achievements
        checkAchievements();
    } else {
        showNotification(
            gameState.language === 'ja' ? 'お米が足りません' : 'Not Enough Rice',
            gameState.language === 'ja' 
                ? 'この建物の購入にはお米がもっと必要です' 
                : 'You need more rice to purchase this building'
        );
    }
}

// Buy click upgrade
function buyClickUpgrade(upgradeId) {
    const upgrade = gameState.clickUpgrades[upgradeId];
    
    if (gameState.rice >= upgrade.cost && !upgrade.purchased) {
        gameState.rice -= upgrade.cost;
        upgrade.purchased = true;
        
        // Apply upgrade effect
        if (upgradeId === 'farming-tools') {
            gameState.ricePerClick *= upgrade.multiplier;
        }
        
        // Update UI
        updateUI();
        
        // Show notification
        showNotification(
            gameState.language === 'ja' ? 'アップグレード購入' : 'Upgrade Purchased',
            gameState.language === 'ja' 
                ? `${upgrade.name.ja}を購入しました！` 
                : `You purchased ${upgrade.name.en}!`
        );
    } else if (upgrade.purchased) {
        showNotification(
            gameState.language === 'ja' ? '既に購入済み' : 'Already Purchased',
            gameState.language === 'ja' 
                ? 'このアップグレードは既に購入済みです' 
                : 'You have already purchased this upgrade'
        );
    } else {
        showNotification(
            gameState.language === 'ja' ? 'お米が足りません' : 'Not Enough Rice',
            gameState.language === 'ja' 
                ? 'このアップグレードの購入にはお米がもっと必要です' 
                : 'You need more rice to purchase this upgrade'
        );
    }
}

// Buy rice type
function buyRiceType(riceTypeId) {
    const riceType = gameState.riceTypes[riceTypeId];
    
    if (gameState.rice >= riceType.cost && !riceType.purchased) {
        // Reset all rice types to unpurchased
        for (const type of Object.values(gameState.riceTypes)) {
            type.purchased = false;
        }
        
        // Purchase the new rice type
        gameState.rice -= riceType.cost;
        riceType.purchased = true;
        
        // Update UI
        updateUI();
        
        // Show notification
        showNotification(
            gameState.language === 'ja' ? '新品種導入' : 'New Rice Variety',
            gameState.language === 'ja' 
                ? `${riceType.name.ja}を導入しました！` 
                : `You introduced ${riceType.name.en}!`
        );
    } else if (riceType.purchased) {
        showNotification(
            gameState.language === 'ja' ? '既に導入済み' : 'Already Introduced',
            gameState.language === 'ja' 
                ? 'この品種は既に導入済みです' 
                : 'You have already introduced this variety'
        );
    } else {