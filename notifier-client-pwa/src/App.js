import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const httpUrl = 'https://notifier-rn-pwa.herokuapp.com';
const wsURl = 'wss://notifier-rn-pwa.herokuapp.com';

let socket;

const setUpWebSocket = addMessage => {
    if (!socket) {
        socket = new WebSocket(wsUrl);
        console.log('Attempting connectio to socket...');

        socket.onopen = () => {
            console.log('Successfully connected to socket');
        };

        socket.onclose = event => {
            console.log('Socket closed connection: ', event);
            socket = null;
        };

        socket.onerror = error => {
            console.log('Socket error: ', error);
        };
    }

    socket.onmessage = event => {
        addMessage(JSON.parse(event.data));
    };
};

const loadInitialData = async setMessages => {
    const messages = await axios.get(`${httpUrl}/list`);
    setMessages(messages.data);
    console.log('Messages: ', messages.data);
}

function App() {
  return (
    <div>
      <p>Hello, world!</p>
    </div>
  );
}

export default App;
