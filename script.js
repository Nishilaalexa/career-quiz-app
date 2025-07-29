class ChatInterface {
    constructor() {
        this.chatHistory = document.getElementById('chatHistory');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.isTyping = false;
        this.mockResponse = "I'm currently running in a local mode without an active AI connection. I can't provide real-time career advice right now, but feel free to explore other features!";
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => {
            this.handleSendMessage();
        });
        
        // Enter key press
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
        
        // Input field focus/blur for better UX
        this.messageInput.addEventListener('focus', () => {
            this.messageInput.parentElement.style.borderColor = '#007bff';
        });
        
        this.messageInput.addEventListener('blur', () => {
            this.messageInput.parentElement.style.borderColor = '#e1e5e9';
        });
    }
    
    handleSendMessage() {
        const message = this.messageInput.value.trim();
        
        if (message === '' || this.isTyping) {
            return;
        }
        
        // Add user message to chat
        this.addUserMessage(message);
        
        // Clear input
        this.messageInput.value = '';
        
        // Show typing indicator and generate AI response
        this.generateAIResponse();
    }
    
    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-bubble">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        
        this.chatHistory.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    addAIMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message';
        messageElement.innerHTML = `
            <div class="message-bubble">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        
        this.chatHistory.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    generateAIResponse() {
        this.isTyping = true;
        this.sendButton.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI thinking time (1 second)
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addAIMessage(this.mockResponse);
            this.isTyping = false;
            this.sendButton.disabled = false;
            this.messageInput.focus();
        }, 1000);
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
        }, 10);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the chat interface when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatInterface();
    
    // Focus on input field when page loads
    document.getElementById('messageInput').focus();
});

// Add some sample interactions for demonstration (optional)
document.addEventListener('DOMContentLoaded', () => {
    const addSampleMessage = (message, isUser = false, delay = 0) => {
        setTimeout(() => {
            const chatHistory = document.getElementById('chatHistory');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
            messageElement.innerHTML = `
                <div class="message-bubble">
                    <p>${message}</p>
                </div>
            `;
            chatHistory.appendChild(messageElement);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, delay);
    };
    
    // Uncomment the lines below if you want to show sample conversation on load
    // addSampleMessage("What career advice can you give me?", true, 2000);
    // addSampleMessage("I'm currently running in a local mode without an active AI connection. I can't provide real-time career advice right now, but feel free to explore other features!", false, 4000);
});
