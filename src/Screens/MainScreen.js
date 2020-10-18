import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Post } from "../Components/Post";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../theme";
import { AntDesign } from '@expo/vector-icons';
import { loadPosts, searchPostByStatus, sortPosts, updatePosts } from "../store/actions/post";
import { searchPost } from "../store/actions/post";

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.post.allPosts)

    const openPostHandler = (post) => {
        navigation.navigate('Task', post)
    }

    const openCreateHandler = () => {
        navigation.navigate('Create')
    }

    const openSearchHandler = () => {
        navigation.navigate('Search')
        dispatch(searchPost(''))
        dispatch(searchPostByStatus(''))
    }

    useEffect(() => {
        dispatch(loadPosts());
        const interval = setInterval(() => {
            dispatch(updatePosts());
            dispatch(sortPosts());
        }, 180000);
        return () => clearInterval(interval);
    }, [dispatch])

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrap}>
                <AntDesign.Button style={styles.btn} name="pluscircle" onPress={openCreateHandler}>Create</AntDesign.Button>
            </View>
            <View style={styles.wrap}>
                <AntDesign.Button style={styles.btn} name="search1" onPress={openSearchHandler}>Search</AntDesign.Button>
            </View>
            <FlatList
                data={allPosts}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={openPostHandler} status={item.status}/>
                }/>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        marginBottom: 150,
    },
    btn: {
        backgroundColor: THEME.MAIN_COLOR,
        color: THEME.MAIN_COLOR,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 5
    },
    wrap: {
        padding: 20,
    }
})

