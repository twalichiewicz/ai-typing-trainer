// AI Typing Trainer Application
let trainer;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    trainer = new AITypingTrainer();
    setupEventListeners();
    trainer.startTraining();
});

// Set up all event listeners
function setupEventListeners() {
    const userPrompt = document.getElementById('userPrompt');
    const submitBtn = document.getElementById('submitBtn');
    
    // Real-time prompt analysis
    userPrompt.addEventListener('input', () => {
        trainer.updateCounts();
        trainer.updateSubmitButton();
        trainer.analyzePromptLive(userPrompt.value);
    });
    
    // Submit on Enter (Ctrl/Cmd + Enter)
    userPrompt.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!submitBtn.disabled) {
                submitPrompt();
            }
        }
    });
    
    // Auto-resize textarea
    userPrompt.addEventListener('input', autoResizeTextarea);
    
    // Focus on prompt input when page loads
    setTimeout(() => userPrompt.focus(), 100);
}

// Toggle examples visibility
function toggleExamples() {
    const container = document.getElementById('examplesContainer');
    const button = document.getElementById('examplesToggle');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        button.textContent = '🙈 Hide Examples';
    } else {
        container.style.display = 'none';
        button.textContent = '👁️ Show Examples';
    }
}

// Handle main action button press
function handleMainAction() {
    const button = document.getElementById('mainActionButton');
    const buttonLabel = document.getElementById('buttonLabel');
    const analyzeIndicator = document.getElementById('analyzeIndicator');
    const nextIndicator = document.getElementById('nextIndicator');
    const retryIndicator = document.getElementById('retryIndicator');
    
    if (analyzeIndicator.classList.contains('active')) {
        submitPrompt();
    } else if (nextIndicator.classList.contains('active')) {
        // In results mode, clicking the main button defaults to NEXT
        nextScenario();
    } else if (retryIndicator.classList.contains('active') && !nextIndicator.classList.contains('active')) {
        // Only retry if next is not available
        tryAgain();
    }
}

// Submit prompt for analysis
function submitPrompt() {
    const prompt = document.getElementById('userPrompt').value.trim();
    if (!prompt) return;
    
    // Add loading state to main button
    const button = document.getElementById('mainActionButton');
    const buttonLabel = document.getElementById('buttonLabel');
    const originalText = buttonLabel.textContent;
    buttonLabel.textContent = 'ANALYZING...';
    button.style.opacity = '0.7';
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
        trainer.submitPrompt();
        buttonLabel.textContent = originalText;
        button.style.opacity = '1';
        
        // Switch to next/retry mode after analysis
        updateButtonState('results');
    }, 500);
}

// Update button state and indicators
function updateButtonState(state) {
    const buttonLabel = document.getElementById('buttonLabel');
    const analyzeIndicator = document.getElementById('analyzeIndicator');
    const nextIndicator = document.getElementById('nextIndicator');
    const retryIndicator = document.getElementById('retryIndicator');
    const button = document.getElementById('mainActionButton');
    
    // Reset all indicators
    analyzeIndicator.classList.remove('active');
    nextIndicator.classList.remove('active');
    retryIndicator.classList.remove('active');
    
    switch(state) {
        case 'analyze':
            analyzeIndicator.classList.add('active');
            buttonLabel.textContent = 'ANALYZE';
            button.disabled = false;
            button.style.opacity = '1';
            break;
        case 'results':
            nextIndicator.classList.add('active');
            retryIndicator.classList.add('active');
            buttonLabel.textContent = 'NEXT';
            button.disabled = false;
            button.style.opacity = '1';
            break;
        case 'disabled':
            buttonLabel.textContent = 'DISABLED';
            button.disabled = true;
            button.style.opacity = '0.5';
            break;
    }
}

// Try current scenario again
function tryAgain() {
    trainer.tryAgain();
    document.getElementById('userPrompt').focus();
}

// Move to next scenario
function nextScenario() {
    trainer.nextScenario();
    document.getElementById('userPrompt').focus();
}

// Restart training from beginning
function restartTraining() {
    trainer.restartTraining();
    document.getElementById('userPrompt').focus();
}

// Auto-resize textarea based on content
function autoResizeTextarea() {
    const textarea = document.getElementById('userPrompt');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Skip if typing in input
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
        return;
    }
    
    switch(e.key) {
        case 'n':
        case 'N':
            const nextIndicator = document.getElementById('nextIndicator');
            if (nextIndicator.classList.contains('active')) {
                nextScenario();
            }
            break;
        case 'r':
        case 'R':
            const retryIndicator = document.getElementById('retryIndicator');
            if (retryIndicator.classList.contains('active')) {
                tryAgain();
            }
            break;
        case 'e':
        case 'E':
            toggleExamples();
            break;
        case '?':
            showHelpModal();
            break;
    }
});

// Show help modal with keyboard shortcuts
function showHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'help-modal-overlay';
    modal.innerHTML = `
        <div class="help-modal">
            <div class="help-modal-header">
                <h3>🚀 AI Typing Trainer Help</h3>
                <button class="close-help" onclick="closeHelpModal()">&times;</button>
            </div>
            <div class="help-modal-content">
                <h4>📝 How to Use</h4>
                <ul>
                    <li>Read the scenario context and goal carefully</li>
                    <li>Write your AI prompt in the text area</li>
                    <li>Watch real-time feedback as you type</li>
                    <li>Submit for detailed analysis and tips</li>
                </ul>
                
                <h4>⌨️ Keyboard Shortcuts</h4>
                <ul>
                    <li><kbd>Ctrl/Cmd + Enter</kbd> - Submit prompt</li>
                    <li><kbd>E</kbd> - Toggle examples</li>
                    <li><kbd>N</kbd> - Next scenario (after submitting)</li>
                    <li><kbd>R</kbd> - Try again (after submitting)</li>
                    <li><kbd>?</kbd> - Show this help</li>
                </ul>
                
                <h4>🎯 Scoring Criteria</h4>
                <ul>
                    <li><strong>Specificity (30%):</strong> Technical terms, exact requirements</li>
                    <li><strong>Context (25%):</strong> Current situation, environment</li>
                    <li><strong>Constraints (25%):</strong> Requirements, limitations</li>
                    <li><strong>Observability (20%):</strong> Expected outcomes, success criteria</li>
                </ul>
                
                <h4>💡 Pro Tips</h4>
                <ul>
                    <li>Include exact versions and technical specifications</li>
                    <li>Describe your current setup and what's not working</li>
                    <li>Set measurable success criteria</li>
                    <li>Mention specific tools and frameworks</li>
                    <li>Use "Expected:" and "Actual:" format for bugs</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeHelpModal();
        }
    });
}

// Close help modal
function closeHelpModal() {
    const modal = document.querySelector('.help-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Add help modal styles
const helpStyles = `
.help-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.help-modal {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
}

.help-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem 1rem;
    border-bottom: 1px solid var(--border-color);
}

.help-modal-header h3 {
    margin: 0;
    color: var(--primary-color);
}

.close-help {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
}

.close-help:hover {
    background: var(--border-color);
}

.help-modal-content {
    padding: 1.5rem 2rem 2rem;
}

.help-modal-content h4 {
    color: var(--primary-color);
    margin: 1.5rem 0 0.5rem;
    font-size: 1rem;
}

.help-modal-content h4:first-child {
    margin-top: 0;
}

.help-modal-content ul {
    margin: 0 0 1rem 1rem;
    padding-left: 1rem;
}

.help-modal-content li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

kbd {
    background: var(--border-color);
    border: 1px solid var(--neutral-color);
    border-radius: 3px;
    padding: 2px 6px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
}
`;

// Inject help styles
const styleSheet = document.createElement('style');
styleSheet.textContent = helpStyles;
document.head.appendChild(styleSheet);

// Analytics and tracking (optional)
function trackEvent(eventName, data = {}) {
    // Add your analytics tracking here
    console.log('Event:', eventName, data);
}