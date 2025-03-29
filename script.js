// Global variables
let lastScanTime = new Date();
let scanInProgress = false;

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Update the last scan time display
    updateLastScanTime();
    
    // Add event listener to scan button
    const scanButton = document.getElementById('scan-button');
    if (scanButton) {
        scanButton.addEventListener('click', performScan);
    }
    
    // Add event listeners to chart links
    const chartLinks = document.querySelectorAll('.chart-link');
    chartLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tokenName = this.closest('.signal-card').querySelector('.token-name').textContent;
            const tokenChain = this.closest('.signal-card').querySelector('.token-chain').textContent;
            openChartForToken(tokenName, tokenChain);
        });
    });
});

// Function to update the last scan time display
function updateLastScanTime() {
    const lastScanElement = document.getElementById('last-scan-time');
    if (lastScanElement) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        lastScanElement.textContent = lastScanTime.toLocaleDateString('en-US', options);
    }
}

// Function to perform a scan for new meme coins
function performScan() {
    if (scanInProgress) {
        alert('A scan is already in progress. Please wait.');
        return;
    }
    
    scanInProgress = true;
    const scanButton = document.getElementById('scan-button');
    if (scanButton) {
        scanButton.textContent = 'Scanning...';
        scanButton.disabled = true;
    }
    
    // Simulate scanning process with a timeout
    setTimeout(() => {
        // Update scan stats
        updateScanStats();
        
        // Update last scan time
        lastScanTime = new Date();
        updateLastScanTime();
        
        // Check for new signals
        checkForNewSignals();
        
        // Reset scan button
        if (scanButton) {
            scanButton.textContent = 'Scan Now';
            scanButton.disabled = false;
        }
        
        scanInProgress = false;
    }, 3000);
}

// Function to update scan statistics
function updateScanStats() {
    // Get current values
    const totalScannedElement = document.querySelector('.stats-card .stat-row:nth-child(1) .stat-value');
    const passedFiltersElement = document.querySelector('.stats-card .stat-row:nth-child(2) .stat-value');
    const qualifiedElement = document.querySelector('.stats-card .stat-row:nth-child(3) .stat-value');
    const newAlertsElement = document.querySelector('.stats-card .stat-row:nth-child(4) .stat-value');
    
    // Update with new random values (for demonstration)
    if (totalScannedElement) {
        const currentTotal = parseInt(totalScannedElement.textContent);
        totalScannedElement.textContent = currentTotal + Math.floor(Math.random() * 20) + 10;
    }
    
    if (passedFiltersElement) {
        const currentPassed = parseInt(passedFiltersElement.textContent);
        passedFiltersElement.textContent = currentPassed + Math.floor(Math.random() * 5) + 1;
    }
    
    if (qualifiedElement) {
        const currentQualified = parseInt(qualifiedElement.textContent);
        qualifiedElement.textContent = currentQualified + Math.floor(Math.random() * 2);
    }
    
    if (newAlertsElement) {
        const currentAlerts = parseInt(newAlertsElement.textContent);
        const newAlerts = Math.floor(Math.random() * 2);
        newAlertsElement.textContent = currentAlerts + newAlerts;
        
        // If new alerts were found, show notification
        if (newAlerts > 0) {
            showNotification(`${newAlerts} new meme coin signal${newAlerts > 1 ? 's' : ''} detected!`);
        }
    }
}

// Function to check for new signals
function checkForNewSignals() {
    // Simulate a 30% chance of finding a new signal
    if (Math.random() < 0.3) {
        // Create a new signal with random data
        createNewSignal();
    }
}

// Function to create a new signal card
function createNewSignal() {
    // Sample data for new signal
    const chains = ['Solana', 'Ethereum', 'BSC'];
    const chainClasses = ['solana', 'ethereum', 'bsc'];
    const randomChainIndex = Math.floor(Math.random() * chains.length);
    
    const tokenPrefixes = ['$MOON', '$PEPE', '$DOGE', '$SHIB', '$CAT', '$FROG'];
    const tokenSuffixes = ['INU', 'MOON', 'ROCKET', 'ELON', 'KING', 'MASTER'];
    const randomPrefix = tokenPrefixes[Math.floor(Math.random() * tokenPrefixes.length)];
    const randomSuffix = tokenSuffixes[Math.floor(Math.random() * tokenSuffixes.length)];
    
    const tokenName = randomPrefix + randomSuffix;
    const tokenDescription = tokenName.replace('$', '') + ' Token';
    
    const dyorScore = Math.floor(Math.random() * 30) + 60; // 60-90
    const sentimentScore = Math.floor(Math.random() * 30) + 60; // 60-90
    
    const liquidity = '$' + (Math.floor(Math.random() * 50) + 50) + 'K'; // $50K-$100K
    const volume = '$' + (Math.floor(Math.random() * 25) + 25) + 'K'; // $25K-$50K
    
    const age = (Math.floor(Math.random() * 100) / 10) + 1; // 1.0-11.0 hours
    
    const influencers = ['CryptoWhale', 'MoonHunter', 'TokenMaster', 'CryptoGems', 'BSCWhale', 'SolWhaleAlpha'];
    const randomInfluencer = influencers[Math.floor(Math.random() * influencers.length)];
    
    // Create the HTML for the new signal card
    const signalHTML = `
        <div class="signal-card">
            <div class="signal-header">
                <div class="token-info">
                    <span class="token-name">${tokenName}</span>
                    <span class="token-chain ${chainClasses[randomChainIndex]}">${chains[randomChainIndex]}</span>
                </div>
                <div class="token-scores">
                    <span class="dyor-score">DYOR: ${dyorScore}</span>
                    <span class="sentiment-score">Sentiment: ${sentimentScore}</span>
                </div>
            </div>
            <div class="token-description">${tokenDescription}</div>
            <div class="signal-details">
                <div class="detail-column">
                    <div class="detail-row">
                        <div class="detail-label">Liquidity:</div>
                        <div class="detail-value">${liquidity}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Volume (1h):</div>
                        <div class="detail-value">${volume}</div>
                    </div>
                </div>
                <div class="detail-column">
                    <div class="detail-row">
                        <div class="detail-label">Age:</div>
                        <div class="detail-value">${age.toFixed(1)} hours</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Top Influencer:</div>
                        <div class="detail-value">${randomInfluencer}</div>
                    </div>
                </div>
            </div>
            <div class="signal-actions">
                <a href="#" class="chart-link">View Chart</a>
            </div>
        </div>
    `;
    
    // Add the new signal to the top of the signals container
    const signalsContainer = document.querySelector('.signals-container');
    if (signalsContainer) {
        const signalsHeader = signalsContainer.querySelector('.signals-header');
        if (signalsHeader) {
            signalsHeader.insertAdjacentHTML('afterend', signalHTML);
            
            // Add event listener to the new chart link
            const newChartLink = signalsContainer.querySelector('.signal-card:nth-child(2) .chart-link');
            if (newChartLink) {
                newChartLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    openChartForToken(tokenName, chains[randomChainIndex]);
                });
            }
        }
    }
}

// Function to open chart for a specific token
function openChartForToken(tokenName, chain) {
    let chartUrl = '#';
    
    // Determine the appropriate chart URL based on the blockchain
    if (chain.includes('Solana')) {
        chartUrl = `https://birdeye.so/token/${tokenName.replace('$', '')}?chain=solana`;
    } else if (chain.includes('Ethereum')) {
        chartUrl = `https://dexscreener.com/ethereum/${tokenName.replace('$', '')}`;
    } else if (chain.includes('BSC')) {
        chartUrl = `https://poocoin.app/tokens/${tokenName.replace('$', '')}`;
    }
    
    // Open the chart URL in a new tab
    window.open(chartUrl, '_blank');
}

// Function to show a notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Function to fetch Ethereum blockchain data using the API key
function fetchEthereumData() {
    // This would use the Ethereum API key: DE3J7IZAIN7FS327J5RR9TMBBEGBHQN6CD
    // For demonstration purposes, this function is a placeholder
    console.log('Fetching Ethereum blockchain data...');
    
    // In a real implementation, this would make API calls to fetch real-time data
    // For example:
    // const apiKey = 'DE3J7IZAIN7FS327J5RR9TMBBEGBHQN6CD';
    // const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=0x...&apikey=${apiKey}`;
    // fetch(url).then(response => response.json()).then(data => {
    //     // Process the data
    // });
}

// Initialize the page
fetchEthereumData();
