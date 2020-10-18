import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { THEME } from "../theme";
import { MaterialIcons } from '@expo/vector-icons';
import POST_STATUSES from "./PostStatuses";
import { useDispatch } from "react-redux";
import { resolvePost } from "../store/actions/post";

export const Post = ({ post, onOpen, status }) => {
    const [isSelected, setIsSelected] = useState(1)
    const dispatch = useDispatch();
    let dateFormat = require('dateformat');

    const resolveHandler = async() => {
        const response = await fetch(
            'http://worldclockapi.com/api/json/est/now'
        );
        const json = await response.json();
        dispatch(resolvePost({
            date: dateFormat(json.currentDateTime, "UTC:HH:MM:ss"),
            postId: post.id
        }))
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>
                        Time of creation: {post.date_creation}
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>
                        Update time: {post.date_update}
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>
                        Title: {post.text}
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={
                        post.status === POST_STATUSES.EXPIRED ?
                            {color: 'red'} : post.status === POST_STATUSES.IN_PROGRESS ?
                            {color: 'yellow'} : post.status === POST_STATUSES.DONE ?
                                {color: '#62e35f'} : {color: ''}}>
                        Status: {post.status}
                    </Text>
                </View>
                {
                    post.status !== POST_STATUSES.DONE && (
                        <View style={styles.textWrap}>
                            <MaterialIcons.Button style={
                                isSelected === 0 || status === POST_STATUSES.EXPIRED  ?
                                    styles.resolveActive : styles.resolve
                            }
                                                  name='update'
                                                  color='#fff'
                                                  onPress={resolveHandler}>
                                Resolve
                            </MaterialIcons.Button>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        backgroundColor: THEME.MAIN_COLOR
    },
    textWrap: {
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
    },
    status: {
        color: '#ebc634'
    },
    resolve: {
        backgroundColor: THEME.DANGER_COLOR,
    },
    resolveActive: {
        display: 'none'
    },
})
