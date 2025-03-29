// Enhanced script.js with Ethereum API integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ethereum API
    const ethereumAPI = new EthereumAPI();
    
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

    // Global variables
    let lastScanTime = new Date();
    let scanInProgress = false;
    let totalScanned = 120;
    let passedFilters = 15;
    let qualified = 3;
    let newAlerts = 2;

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
            lastScanElement.textContent = ethereumAPI.lastScanTime.toLocaleDateString('en-US', options);
        }
    }

    // Function to perform a scan for new meme coins
    async function performScan() {
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
        
        try {
            // Show scanning notification
            showNotification('Scanning for new meme coins...');
            
            // Perform the scan using Ethereum API
            const newTokens = await ethereumAPI.scanForNewTokens();
            
            // Update scan stats
            updateScanStats(newTokens.length);
            
            // Update last scan time
            lastScanTime = new Date();
            updateLastScanTime();
            
            // Add new tokens to the UI
            if (newTokens.length > 0) {
                addNewTokensToUI(newTokens);
                showNotification(`${newTokens.length} new meme coin signal${newTokens.length > 1 ? 's' : ''} detected!`);
            } else {
                showNotification('No new meme coins detected that meet criteria.');
            }
        } catch (error) {
            console.error('Error during scan:', error);
            showNotification('Error during scan. Please try again.');
        } finally {
            // Reset scan button
            if (scanButton) {
                scanButton.textContent = 'Scan Now';
                scanButton.disabled = false;
            }
            
            scanInProgress = false;
        }
    }

    // Function to update scan statistics
    function updateScanStats(newTokensCount) {
        // Get current values
        const totalScannedElement = document.querySelector('.stats-card .stat-row:nth-child(1) .stat-value');
        const passedFiltersElement = document.querySelector('.stats-card .stat-row:nth-child(2) .stat-value');
        const qualifiedElement = document.querySelector('.stats-card .stat-row:nth-child(3) .stat-value');
        const newAlertsElement = document.querySelector('.stats-card .stat-row:nth-child(4) .stat-value');
        
        // Generate new random values for demonstration
        const newScanned = Math.floor(Math.random() * 20) + 10;
        const newPassed = Math.floor(Math.random() * 5) + 1;
        
        // Update stats
        totalScanned += newScanned;
        passedFilters += newPassed;
        qualified += newTokensCount;
        newAlerts += newTokensCount;
        
        // Update UI
        if (totalScannedElement) totalScannedElement.textContent = totalScanned;
        if (passedFiltersElement) passedFiltersElement.textContent = passedFilters;
        if (qualifiedElement) qualifiedElement.textContent = qualified;
        if (newAlertsElement) newAlertsElement.textContent = newAlerts;
    }

    // Function to add new tokens to the UI
    function addNewTokensToUI(tokens) {
        const signalsContainer = document.querySelector('.signals-container');
        if (!signalsContainer) return;
        
        const signalsHeader = signalsContainer.querySelector('.signals-header');
        if (!signalsHeader) return;
        
        tokens.forEach(token => {
            // Determine chain class
            let chainClass = 'ethereum';
            if (token.chain === 'Solana') chainClass = 'solana';
            if (token.chain === 'BSC') chainClass = 'bsc';
            
            // Format values
            const liquidity = '$' + Math.round(token.liquidityUSD / 1000) + 'K';
            const volume = '$' + Math.round(token.volume1h / 1000) + 'K';
            const age = token.ageHours.toFixed(1) + ' hours';
            
            // Create the HTML for the new signal card
            const signalHTML = `
                <div class="signal-card">
                    <div class="signal-header">
                        <div class="token-info">
                            <span class="token-name">${token.symbol}</span>
                            <span class="token-chain ${chainClass}">${token.chain}</span>
                        </div>
                        <div class="token-scores">
                            <span class="dyor-score">DYOR: ${token.dyorScore}</span>
                            <span class="sentiment-score">Sentiment: ${token.influencerScore}</span>
                        </div>
                    </div>
                    <div class="token-description">${token.name}</div>
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
                                <div class="detail-value">${age}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Top Influencer:</div>
                                <div class="detail-value">${token.topInfluencer}</div>
                            </div>
                        </div>
                    </div>
                    <div class="signal-actions">
                        <a href="#" class="chart-link" data-address="${token.contractAddress}">View Chart</a>
                    </div>
                </div>
            `;
            
            // Add the new signal to the top of the signals container
            signalsHeader.insertAdjacentHTML('afterend', signalHTML);
            
            // Add event listener to the new chart link
            const newChartLink = signalsContainer.querySelector('.signal-card:nth-child(2) .chart-link');
            if (newChartLink) {
                newChartLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const tokenName = this.closest('.signal-card').querySelector('.token-name').textContent;
                    const tokenChain = this.closest('.signal-card').querySelector('.token-chain').textContent;
                    openChartForToken(tokenName, tokenChain);
                });
            }
        });
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
});
