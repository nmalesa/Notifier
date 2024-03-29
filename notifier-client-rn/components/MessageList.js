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
    // const messages = await axios.get(`${httpUrl}/list`);
    // setMessages(messages.data);
    // console.log('Messages: ', messages.data);
    const messages = [
        {
            _id: 1,
            text: "Elephant",
        },
        {
            _id: 2,
            text: "Cat",
        }
    ];
    setMessages(messages);
    console.log(messages);
};

// TODO:  App is receiving the data--it's just not displaying the data
export default function MessageList() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadInitialData(setMessages);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ListItem
                        title={"Hello, world!"}
                        bottomDivider
                    />
                )}
            />
        </View>
    );
};