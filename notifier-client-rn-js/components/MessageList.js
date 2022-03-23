import React, { useState, useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

const httpUrl = Platform.select({
    android: 'http://10.0.2.2:3000',
    ios: 'http://localhost:3000',
});

// Makes a web service request and stores the data in the response
const loadInitialData = async setMessages => {
    const messages = await axios.get(`${httpUrl}/list`);
    setMessages(messages.data);
};

export default function MessageList() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadInitialData(setMessages);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.text}
                        bottomDivider
                    />
                )}
            />
        </View>
    );
};