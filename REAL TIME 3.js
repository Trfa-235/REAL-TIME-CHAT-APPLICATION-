
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');


const messagesContainer = document.querySelector('.messages');


const socket = new WebSocket('ws://localhost:8080');


socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    addMessageToChat(message.username, message.message);
};


socket.onerror = (event) => {
    console.error('Error occurred:', event);
};


chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.send(JSON.stringify({
            username: 'User',
            message: message
        }));
        messageInput.value = '';
    }
});

function addMessageToChat(username, message) {
    const messageHTML = `
        <div class="message">
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        </div>
    `;
    messagesContainer.innerHTML += messageHTML;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}