import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Keyboard, Alert } from 'react-native';
import { TextInput } from "react-native";
import { THEME } from "../theme";
import { useDispatch } from 'react-redux';
import { addPost } from "../store/actions/post";

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const saveHandler = () => {
        if (text.trim()) {
            dispatch(addPost(text))
            navigation.navigate('Todo App')
            Keyboard.dismiss()
        } else {
            Alert.alert('The title cant be empty')
        }
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Create a new task</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter the title of task'
                value={text}
                onChangeText={setText}
            />
            <Button title='Create' color={THEME.MAIN_COLOR} onPress={saveHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    input: {
        padding: 10,
        marginBottom: 20,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        width: '50%',
    }
})
