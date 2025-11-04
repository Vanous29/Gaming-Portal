// Centrální coin systém pro herní portál
const CoinSystem = {
    // Klíč pro localStorage
    STORAGE_KEY: 'gamezz_portal_coins',
    
    // Získat aktuální počet coinů
    getCoins: function() {
        const coins = localStorage.getItem(this.STORAGE_KEY);
        return coins ? parseInt(coins) : 0;
    },
    
    // Nastavit počet coinů
    setCoins: function(amount) {
        localStorage.setItem(this.STORAGE_KEY, amount.toString());
        this.updateDisplay();
    },
    
    // Přidat coiny
    addCoins: function(amount) {
        const current = this.getCoins();
        const newTotal = current + amount;
        this.setCoins(newTotal);
        this.showCoinNotification(amount);
        return newTotal;
    },
    
    // Odebrat coiny (pro budoucí nákupy)
    spendCoins: function(amount) {
        const current = this.getCoins();
        if (current >= amount) {
            this.setCoins(current - amount);
            return true;
        }
        return false;
    },
    
    // Zkontrolovat, jestli má hráč dostatek coinů
    hasEnoughCoins: function(amount) {
        return this.getCoins() >= amount;
    },
    
    // Aktualizovat zobrazení coinů na stránce
    updateDisplay: function() {
        const coinDisplay = document.getElementById('coin-display');
        if (coinDisplay) {
            coinDisplay.textContent = this.getCoins().toLocaleString();
        }
    },
    
    // Zobrazit notifikaci o získaných coinech
    showCoinNotification: function(amount) {
        // Vytvoříme animovanou notifikaci
        const notification = document.createElement('div');
        notification.className = 'coin-notification';
        notification.innerHTML = `+${amount} 🪙`;
        document.body.appendChild(notification);
        
        // Animace
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(-50px)';
        }, 10);
        
        // Odstranění po animaci
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-100px)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },
    
    // Inicializace coin displayu na stránce
    init: function() {
        this.updateDisplay();
    }
};

// CSS styly pro coin systém (automaticky se přidají)
const coinStyles = `
    .coin-display-container {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        padding: 12px 20px;
        border-radius: 30px;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;
        font-size: 1.2rem;
        color: #222;
        z-index: 10000;
        border: 2px solid #ffaa00;
    }
    
    .coin-display-container .coin-icon {
        font-size: 1.5rem;
    }
    
    .coin-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #00cc66);
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        box-shadow: 0 6px 20px rgba(0, 255, 136, 0.5);
        z-index: 10001;
        opacity: 0;
        transform: translateY(0);
        transition: all 0.3s ease;
        border: 2px solid #00ff88;
    }
`;

// Přidat styly do stránky
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = coinStyles;
    document.head.appendChild(styleSheet);
}

// Export pro použití v modulech (pokud je potřeba)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoinSystem;
}
