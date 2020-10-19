import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Alert, TextInput, Keyboard, Picker } from 'react-native'
import { THEME } from "../theme";
import { useDispatch, useSelector } from 'react-redux'
import { searchPost, searchPostByStatus } from "../store/actions/post";
import { Post } from "../Components/Post";

export const SearchScreen = ({ navigation }) => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('done')
    const [searchType, setSearchType] = useState(0)

    const dispatch = useDispatch()

    const searchHandler = () => {
        if (text.trim()) {
            dispatch(searchPost(text))
            dispatch(searchPostByStatus(''))
            setText('')
            setSearchType(0)
            Keyboard.dismiss()
        } else {
            Alert.alert('The title cant be empty')
        }
    }

    const searchByStatusHandler = () => {
        if (status.trim()) {
            dispatch(searchPostByStatus(status))
            dispatch(searchPost(''))
            setStatus('')
            setSearchType(1)
            Keyboard.dismiss()
        } else {
            Alert.alert('The title cant be empty')
        }
    }

    const openPostHandler = (post) => {
        navigation.navigate('Task', post)
    }

    const searchPosts = useSelector(state => state.post.searchPost)
    const searchPostsByStatus = useSelector(state => state.post.searchPostByStatus)

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Search task</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter the title of task'
                value={text}
                onChangeText={setText}
            />
            <Button title='Search by title' color={THEME.MAIN_COLOR} onPress={searchHandler}/>
            <Picker
                selectedValue={status}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                mode='dropdown'
            >
                <Picker.Item label="Done" value="done" />
                <Picker.Item label="inProgress" value="inProgress" />
                <Picker.Item label="Expired" value="expired" />
            </Picker>
            <Button title='Search by status' color={THEME.MAIN_COLOR} onPress={searchByStatusHandler}/>
                <FlatList
                    style={styles.wrap}
                    data={searchType === 1 ? searchPostsByStatus : searchPosts}
                    keyExtractor={post => post.id.toString()}
                    renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>
                    }/>
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
    },
    wrap: {
        padding: 20,
        width: '100%'
    },
    wrapp: {
        padding: 20,
        width: '100%',
        marginBottom: 20
    },
})
