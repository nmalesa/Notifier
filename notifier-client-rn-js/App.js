import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import axios from 'axios';

const httpUrl = Platform.select({
    android: 'http://10.0.2.2:3000',
    ios: 'http://localhost:3000',
});

// Makes a web service request and stores the data in the response
const loadInitialData = async setMessages => {
    const messages = await axios.get(`${httpUrl}/list`);
    setMessages(messages.data);
    console.log('Messages: ', messages.data);
};

// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
// ];

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

    const renderItem = ({ item }) => (
        <Item title={item.text} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item._id}
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
