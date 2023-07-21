import React, { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/elements";
import ChatActionsMenu from "../../../components/ActionsMenu/ChatActionsMenu";
import { colors } from "../../../assets/Colors/colors";
import MessageLists from "../../../components/ListsViews/MessageLists/MessageLists";

const Conversations = ({
    route
}) => {

    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const { user_name } = route?.params;

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleMessageSend = () => {
        if (inputText.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: inputText, isSent: true }]);
            setInputText('');
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Container onPress={() => navigation.goBack()} containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.back_img}
                            mpImage={{ mt: 45, mh: 15 }}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                        <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>{user_name}</Label>
                    </Container>

                    <ChatActionsMenu headerHeight={headerHeight} />
                </Container>
            </Container>
        )
    }

    const _renderMessageLists = ({ item }) => {
        return <MessageLists {...item} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                inverted
            />

            <Label mpLabel={{ mb: 30 }} labelSize={16} style={{ color: colors.Input_Gray_text, fontFamily: fonts.regular, alignSelf: 'center' }}>6:50 AM, 30 August 2023</Label>

            <Container height={35} containerStyle={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#f2f2f2', borderColor: '#f2f2f2', width: 50 }} mpContainer={{ pv: 5, ph: 5 }}>
                <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Hello</Label>
            </Container>


            <Container height={35} containerStyle={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: colors.light_yellow, borderColor: colors.light_yellow, width: 50 }} mpContainer={{ pv: 5, ph: 5, mt: 15 }}>
                <Label labelSize={16} style={{ fontFamily: fonts.regular, color: 'white', }}>Hello</Label>
            </Container>

            <Container containerStyle={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your message..."
                    placeholderTextColor={'#b2b2b2'}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <Img
                    imgSrc={images.attach_img}
                    imgStyle={{
                        width: 22,
                        height: 22,
                        resizeMode: 'contain'
                    }}
                    mpImage={{ mr: 20 }}
                />
                <Img
                    imgSrc={images.send_img}
                    imgStyle={{
                        width: 45,
                        height: 45,
                        resizeMode: 'contain'
                    }}
                // onPress={handleMessageSend}
                />
            </Container>
        </View>
    )
}

// const styles = StyleSheet.create({
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         borderTopWidth: 1,
//         borderColor: '#ccc',
//         paddingVertical: 10,
//         paddingHorizontal: 16,
//     },
//     input: {
//         flex: 1,
//         height: 40,
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         paddingHorizontal: 10,
//     },
//     sendButton: {
//         marginLeft: 10,
//         backgroundColor: '#4286f4',
//         borderRadius: 5,
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//     },
//     sendButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    messageList: {
        paddingTop: 16,
    },
    messageBubble: {
        maxWidth: '70%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginVertical: 4,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'orange',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f2f2f2',
    },
    messageText: {
        fontSize: 16,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        borderRadius: 40,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginTop: 16,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 8,
    },
    sendButton: {
        marginLeft: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#2B8EFF',
    },
    sendButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default Conversations;
