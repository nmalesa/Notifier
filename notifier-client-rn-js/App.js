import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Platform, Linking} from 'react-native';
import axios from 'axios';

const httpUrl = Platform.select({
    android: 'http://10.0.2.2:3000',
    ios: 'http://localhost:3000',
});

const wsUrl = Platform.select({
    android: 'ws://10.0.2.2:3000',
    ios: 'ws://localhost:3000',
});

let socket;

const setUpWebSocket = addMessage => {
    if (!socket) {
        socket = new WebSocket(wsUrl);
        console.log('Attempting connection to socket...');

        socket.onopen = () => {
            console.log('Successfully connected to socket');
        };

        socket.onclose = event => {
            console.log('Socket closed connection: ', event);
            socket = null;
        };

        socket.onerror = error => {
            console.log('Socket error: ', error);
        }
    }

    socket.onmessage = event => {
        addMessage(JSON.parse(event.data));
    };
};

// Makes a web service request and stores the data in the response
const loadInitialData = async setMessages => {
    const messages = await axios.get(`${httpUrl}/list`);
    setMessages(messages.data);
    console.log('Messages: ', messages.data);
};

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadInitialData(setMessages);
    }, []);

    useEffect(() => {
        setUpWebSocket(newMessage => {
            setMessages([newMessage, ...messages]);
        });
    }, [messages])

    const renderItem = ({ item }) => (
        <Item title={item.text} />
    );

    // TODO: REFACTOR APP INTO COMPONENTS AND ADD LIST ITEM
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                onPress={() => item.url && Linking.openURL(item.url)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default App;


// import React, { Fragment } from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import { ThemeProvider } from 'react-native-elements';
// import MainScreen from './screens/MainScreen';
//
// export default function App() {
//   return (
//       <ThemeProvider>
//         <Fragment>
//           <StatusBar barStyle="dark-content" />
//           <SafeAreaView style={{ flex: 1 }}>
//             <MainScreen />
//           </SafeAreaView>
//         </Fragment>
//       </ThemeProvider>
//   );
// };
