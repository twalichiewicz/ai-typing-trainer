// AI Typing Trainer Core Engine
class AITypingTrainer {
    constructor() {
        this.currentScenarioIndex = 0;
        this.scores = [];
        this.userPrompts = [];
        this.startTime = null;
        this.scenarioStartTime = null;
    }

    // Initialize training session
    startTraining() {
        this.currentScenarioIndex = 0;
        this.scores = [];
        this.userPrompts = [];
        this.startTime = Date.now();
        this.loadScenario(0);
    }

    // Load a specific scenario
    loadScenario(index) {
        if (index >= SCENARIOS.length) {
            this.showFinalResults();
            return;
        }

        this.currentScenarioIndex = index;
        this.scenarioStartTime = Date.now();
        
        const scenario = SCENARIOS[index];
        
        // Update progress
        this.updateProgress();
        
        // Load scenario content
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('contextText').textContent = scenario.context;
        document.getElementById('goalText').textContent = scenario.goal;
        document.getElementById('badExample').textContent = scenario.badExample;
        document.getElementById('goodExample').textContent = scenario.goodExample;
        
        // Update difficulty badge
        const difficultyBadge = document.getElementById('difficultyBadge');
        difficultyBadge.textContent = scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1);
        difficultyBadge.className = `difficulty-badge ${scenario.difficulty}`;
        
        // Reset input and feedback
        document.getElementById('userPrompt').value = '';
        document.getElementById('liveFeedback').style.display = 'none';
        document.getElementById('resultsPanel').style.display = 'none';
        document.getElementById('examplesContainer').style.display = 'none';
        
        // Update button state to analyze mode
        updateButtonState('analyze');
        
        // Reset examples toggle
        document.getElementById('examplesToggle').textContent = '👁️ Show Examples';
    }

    // Update progress bar
    updateProgress() {
        const progress = ((this.currentScenarioIndex) / SCENARIOS.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = 
            `Scenario ${this.currentScenarioIndex + 1} of ${SCENARIOS.length}`;
    }

    // Analyze user prompt in real-time
    analyzePromptLive(prompt) {
        if (!prompt.trim()) {
            document.getElementById('liveFeedback').style.display = 'none';
            return;
        }

        document.getElementById('liveFeedback').style.display = 'block';
        
        const scenario = SCENARIOS[this.currentScenarioIndex];
        const scores = this.scorePrompt(prompt, scenario);
        
        // Update live metrics
        this.updateMetricBar('specificity', scores.specificity);
        this.updateMetricBar('context', scores.context);
        this.updateMetricBar('constraints', scores.constraints);
        this.updateMetricBar('observability', scores.observability);
    }

    // Update individual metric bar
    updateMetricBar(metric, score) {
        const percentage = Math.round(score * 100);
        document.getElementById(`${metric}Bar`).style.width = `${percentage}%`;
        document.getElementById(`${metric}Score`).textContent = `${percentage}%`;
    }

    // Score a prompt against a scenario
    scorePrompt(prompt, scenario) {
        const scores = {
            specificity: this.measureSpecificity(prompt, scenario),
            context: this.measureContext(prompt, scenario),
            constraints: this.measureConstraints(prompt, scenario),
            observability: this.measureObservability(prompt, scenario)
        };

        // Calculate weighted overall score
        const overall = Object.keys(scores).reduce((sum, key) => {
            return sum + (scores[key] * SCORING_WEIGHTS[key]);
        }, 0);

        return { ...scores, overall };
    }

    // Measure specificity based on technical keywords
    measureSpecificity(prompt, scenario) {
        const promptLower = prompt.toLowerCase();
        const keywords = scenario.keywords.specificity || [];
        
        if (keywords.length === 0) return 0.5; // Default if no keywords defined
        
        const foundKeywords = keywords.filter(keyword => 
            promptLower.includes(keyword.toLowerCase())
        );
        
        const baseScore = foundKeywords.length / keywords.length;
        
        // Bonus for technical depth
        const technicalTerms = ['API', 'TypeScript', 'React', 'CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'authentication', 'responsive', 'performance'];
        const technicalMatches = technicalTerms.filter(term => 
            promptLower.includes(term.toLowerCase())
        ).length;
        
        const bonus = Math.min(technicalMatches * 0.1, 0.3);
        
        return Math.min(baseScore + bonus, 1);
    }

    // Measure context provision
    measureContext(prompt, scenario) {
        const promptLower = prompt.toLowerCase();
        const contextKeywords = scenario.keywords.context || [];
        
        // Look for context-providing words
        const contextWords = ['currently', 'existing', 'using', 'building', 'working with', 'have', 'need to', 'trying to'];
        const hasContextWords = contextWords.some(word => promptLower.includes(word));
        
        // Look for scenario-specific context
        const contextScore = contextKeywords.length > 0 ? 
            contextKeywords.filter(keyword => promptLower.includes(keyword.toLowerCase())).length / contextKeywords.length : 0;
        
        // Environment/tech stack mentions
        const environmentWords = ['production', 'development', 'staging', 'version', 'framework', 'library'];
        const hasEnvironment = environmentWords.some(word => promptLower.includes(word));
        
        let score = 0.3; // Base score
        if (hasContextWords) score += 0.3;
        if (hasEnvironment) score += 0.2;
        score += contextScore * 0.2;
        
        return Math.min(score, 1);
    }

    // Measure constraints and requirements
    measureConstraints(prompt, scenario) {
        const promptLower = prompt.toLowerCase();
        const constraintKeywords = scenario.keywords.constraints || [];
        
        // Look for requirement words
        const requirementWords = ['must', 'should', 'need', 'require', 'ensure', 'guarantee', 'comply', 'accessible', 'secure', 'performance'];
        const hasRequirements = requirementWords.filter(word => promptLower.includes(word)).length;
        
        // Look for specific constraints
        const constraintScore = constraintKeywords.length > 0 ? 
            constraintKeywords.filter(keyword => promptLower.includes(keyword.toLowerCase())).length / constraintKeywords.length : 0;
        
        // Look for measurable criteria
        const measureWords = ['seconds', 'ms', 'px', '%', 'MB', 'GB', 'minimum', 'maximum', 'at least', 'no more than'];
        const hasMeasures = measureWords.some(word => promptLower.includes(word));
        
        let score = 0.2; // Base score
        score += Math.min(hasRequirements * 0.15, 0.45);
        score += constraintScore * 0.25;
        if (hasMeasures) score += 0.1;
        
        return Math.min(score, 1);
    }

    // Measure observability and expected outcomes
    measureObservability(prompt, scenario) {
        const promptLower = prompt.toLowerCase();
        const observabilityKeywords = scenario.keywords.observability || [];
        
        // Look for outcome words
        const outcomeWords = ['expect', 'should see', 'result', 'output', 'display', 'show', 'render', 'behavior', 'response'];
        const hasOutcomes = outcomeWords.filter(word => promptLower.includes(word)).length;
        
        // Look for before/after descriptions
        const hasBeforeAfter = promptLower.includes('currently') && (promptLower.includes('need') || promptLower.includes('want'));
        
        // Look for specific observability keywords
        const observabilityScore = observabilityKeywords.length > 0 ? 
            observabilityKeywords.filter(keyword => promptLower.includes(keyword.toLowerCase())).length / observabilityKeywords.length : 0;
        
        // Look for success criteria
        const successWords = ['success', 'complete', 'finished', 'working', 'functional'];
        const hasSuccess = successWords.some(word => promptLower.includes(word));
        
        let score = 0.2; // Base score
        score += Math.min(hasOutcomes * 0.15, 0.3);
        score += observabilityScore * 0.3;
        if (hasBeforeAfter) score += 0.15;
        if (hasSuccess) score += 0.05;
        
        return Math.min(score, 1);
    }

    // Submit prompt for full analysis
    submitPrompt() {
        const prompt = document.getElementById('userPrompt').value.trim();
        if (!prompt) return;

        const scenario = SCENARIOS[this.currentScenarioIndex];
        const scores = this.scorePrompt(prompt, scenario);
        
        // Store results
        this.scores.push(scores);
        this.userPrompts.push(prompt);
        
        // Show results
        this.showResults(scores, scenario);
    }

    // Show detailed results
    showResults(scores, scenario) {
        document.getElementById('resultsPanel').style.display = 'block';
        
        // Update overall score circle
        const overallPercentage = Math.round(scores.overall * 100);
        this.updateScoreCircle(overallPercentage);
        
        // Update grade
        const grade = this.calculateGrade(overallPercentage);
        const gradeElement = document.getElementById('scoreGrade');
        gradeElement.textContent = grade;
        gradeElement.className = `score-grade ${grade}`;
        
        // Generate detailed feedback
        this.generateDetailedFeedback(scores, scenario);
        
        // Update button state to show next/retry options
        updateButtonState('results');
        
        // Scroll to results
        document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth' });
    }

    // Update score circle visualization
    updateScoreCircle(percentage) {
        document.getElementById('overallScore').textContent = `${percentage}%`;
        
        const circle = document.querySelector('.score-circle');
        const degrees = (percentage / 100) * 360;
        circle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, var(--border-color) ${degrees}deg)`;
    }

    // Calculate letter grade
    calculateGrade(percentage) {
        for (const [grade, threshold] of Object.entries(GRADE_THRESHOLDS)) {
            if (percentage >= threshold) return grade;
        }
        return 'F';
    }

    // Generate detailed feedback
    generateDetailedFeedback(scores, scenario) {
        const feedbackContainer = document.getElementById('detailedFeedback');
        feedbackContainer.innerHTML = '';
        
        const metrics = [
            { key: 'specificity', label: 'Specificity', icon: '🎯' },
            { key: 'context', label: 'Context', icon: '📍' },
            { key: 'constraints', label: 'Constraints', icon: '🚧' },
            { key: 'observability', label: 'Observability', icon: '👁️' }
        ];
        
        metrics.forEach(metric => {
            const score = scores[metric.key];
            const percentage = Math.round(score * 100);
            const feedback = this.getFeedbackForMetric(metric.key, score, scenario);
            
            const feedbackItem = document.createElement('div');
            feedbackItem.className = `feedback-item ${this.getFeedbackClass(score)}`;
            feedbackItem.innerHTML = `
                <h4>${metric.icon} ${metric.label}: ${percentage}%</h4>
                <p>${feedback}</p>
            `;
            
            feedbackContainer.appendChild(feedbackItem);
        });
    }

    // Get feedback class based on score
    getFeedbackClass(score) {
        if (score >= 0.8) return 'success';
        if (score >= 0.6) return 'warning';
        return 'danger';
    }

    // Get specific feedback for each metric
    getFeedbackForMetric(metric, score, scenario) {
        const tips = scenario.tips || [];
        
        if (score >= 0.8) {
            return `Excellent! Your prompt demonstrates strong ${metric} with specific details and clear requirements.`;
        } else if (score >= 0.6) {
            return `Good ${metric}, but could be more specific. ${tips[0] || 'Consider adding more technical details.'}`;
        } else {
            const feedback = {
                specificity: "Add more technical terms, exact versions, and specific requirements.",
                context: "Provide more background about your current setup and environment.",
                constraints: "Include specific requirements, limitations, and measurable criteria.",
                observability: "Describe exactly what you expect to see and how you'll measure success."
            };
            return feedback[metric] || "This area needs improvement.";
        }
    }

    // Move to next scenario
    nextScenario() {
        this.loadScenario(this.currentScenarioIndex + 1);
    }

    // Try current scenario again
    tryAgain() {
        document.getElementById('userPrompt').value = '';
        document.getElementById('resultsPanel').style.display = 'none';
        document.getElementById('liveFeedback').style.display = 'none';
        updateButtonState('analyze');
    }

    // Show final training results
    showFinalResults() {
        document.querySelector('.trainer-interface').style.display = 'none';
        document.getElementById('finalResults').style.display = 'block';
        
        // Calculate final statistics
        const avgScore = this.scores.reduce((sum, score) => sum + score.overall, 0) / this.scores.length;
        const firstScore = this.scores[0]?.overall || 0;
        const lastScore = this.scores[this.scores.length - 1]?.overall || 0;
        const improvement = ((lastScore - firstScore) / firstScore) * 100;
        
        document.getElementById('finalScore').textContent = `${Math.round(avgScore * 100)}%`;
        document.getElementById('improvementRate').textContent = `${Math.round(improvement)}%`;
        document.getElementById('scenariosCompleted').textContent = this.scores.length;
        
        // Generate mastery chart
        this.generateMasteryChart();
    }

    // Generate skill mastery breakdown
    generateMasteryChart() {
        const chart = document.getElementById('masteryChart');
        chart.innerHTML = '';
        
        const skills = ['specificity', 'context', 'constraints', 'observability'];
        const skillLabels = ['Specificity', 'Context', 'Constraints', 'Observability'];
        
        skills.forEach((skill, index) => {
            const avgScore = this.scores.reduce((sum, score) => sum + score[skill], 0) / this.scores.length;
            const percentage = Math.round(avgScore * 100);
            
            const skillElement = document.createElement('div');
            skillElement.className = 'mastery-skill';
            skillElement.innerHTML = `
                <div class="mastery-skill-name">${skillLabels[index]}</div>
                <div class="mastery-skill-score" style="color: var(--primary-color)">${percentage}%</div>
            `;
            
            chart.appendChild(skillElement);
        });
    }

    // Restart training
    restartTraining() {
        document.getElementById('finalResults').style.display = 'none';
        document.querySelector('.trainer-interface').style.display = 'block';
        this.startTraining();
    }

    // Update submit button state
    updateSubmitButton() {
        const prompt = document.getElementById('userPrompt').value.trim();
        const button = document.getElementById('mainActionButton');
        
        if (prompt.length < 10) {
            updateButtonState('disabled');
        } else {
            // Check if we're in results mode or analyze mode
            const resultsPanel = document.getElementById('resultsPanel');
            if (resultsPanel.style.display === 'block') {
                updateButtonState('results');
            } else {
                updateButtonState('analyze');
            }
        }
    }

    // Update word and character counts
    updateCounts() {
        const prompt = document.getElementById('userPrompt').value;
        const words = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
        const chars = prompt.length;
        
        document.getElementById('wordCount').textContent = `${words} words`;
        document.getElementById('charCount').textContent = `${chars} characters`;
    }
}