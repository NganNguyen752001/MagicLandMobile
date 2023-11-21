import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import Header from '../components/header/Header';
import SearchBar from '../components/SearchBar';
import CourseSlide from '../components/CourseSlide';
import CourseList from '../components/CourseList';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CourseScreen({ navigation }) {

    const [searchValue, setSearchValue] = useState("")
    const [filterVisible, setFilterVisible] = useState(false)

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Text style={styles.title}>
                Khóa Học
            </Text>
            <View style={styles.searchBar}>
                <SearchBar placeHolder={"Tìm Khóa Học"} input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} />
            </View>
            <View style={styles.courseSlide}>
                <CourseSlide />
            </View>
            <View style={styles.courseList}>
                <Text style={{ ...styles.title, fontWeight: "500", fontSize: 18, marginBottom: 5, }}>
                    Các Khoá Học
                </Text>
                <CourseList />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        fontSize: 30,
        fontWeight: "700"
    },
    searchBar: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 20,
    },
    courseList: {
        height: HEIGHT * 0.53,
        marginTop: 20,
    }
});