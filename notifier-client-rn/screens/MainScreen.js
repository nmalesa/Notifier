import React from 'react';
import { View } from 'react-native';
import MessageList from '../components/MessageList';

export default function MainScreen() {
    return (
        <View style={{ flex: 1 }}>
            <MessageList />
        </View>
    );
};