import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { THEME } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../store/actions/post";

export const PostScreen = ({route, navigation }) => {
    const dispatch = useDispatch()
    const postId = route.params.id;
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))

    const removeHandler = () => {
        Alert.alert(
            'Delete post',
            'Are you sure to delete this post?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        navigation.navigate('Todo App')
                        dispatch(removePost(postId))
                    }
                }
            ],
            { cancelable: false }
        );
    }

    if (!post) {
        return null
    }

    return (
        <View style={styles.wrap}>
            <View style={styles.textWrap}>
                <Text style={styles.title}>Title: {post.text}</Text>
                <Text style={styles.status}>Status: {post.status}</Text>
                <Text style={styles.title}>Time of creation: {post.date_creation}</Text>
            </View>
            <View style={styles.btn}>
                <Button title='Delete' color={THEME.DANGER_COLOR} onPress={removeHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textWrap: {
        padding: 20,
        margin: 20,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
    },
    title: {
        color: '#000',
        fontFamily: 'open-regular'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        color: '#000',
        fontFamily: 'open-regular'
    },
    wrap: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
