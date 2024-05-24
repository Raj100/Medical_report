const WebSocket = require('ws');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat_app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// WebSocket connection handler
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages
  ws.on('message', async (message) => {
    // Handle messages here
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = wss;
