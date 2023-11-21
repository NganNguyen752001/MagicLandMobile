import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import courseImageDefault from "../assets/courses/courseImageDefault.png"

import { truncateString } from '../util/util';

const WIDTH = Dimensions.get('window').width;

const courseList = [
    {
        name: "Khóa học Toán Tư Duy",
        regex: "Từ 3 tuổi",
        img: courseImageDefault,
        navigate: "",
    },
    {
        name: "Khóa học Kỹ Năng Sống ",
        regex: "Từ 11 tuổi",
        img: courseImageDefault,
        navigate: "",
    },
    {
        name: "Khóa học Toán Tư Duy",
        regex: "Từ 18 tuổi",
        img: courseImageDefault,
        navigate: "",
    },
    {
        name: "Khóa học Toán Tư Duy(Nâng Cao)",
        regex: "Từ 3 tuổi",
        img: courseImageDefault,
        navigate: "",
    },
]

export default function CourseList() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {courseList.map((item, key) => {
                return (
                    <View key={key}>
                        <TouchableOpacity style={styles.cardView}>
                            <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                            <View style={styles.cardDetail} >
                                <Text style={styles.cardName}>{truncateString(item.name, 25)}</Text>
                                <View style={styles.regex}>
                                    <Icon name={"person"} color={"#B8B8D2"} size={20} />
                                    <Text style={styles.regexValue}>{item.regex}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: WIDTH * 0.05,
        marginBottom: 10,
    },
    cardView: {
        width: WIDTH * 0.9,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    courseImage: {
        width: WIDTH * 0.28,
        height: WIDTH * 0.28,
        borderRadius: 10,
    },
    cardDetail: {
        marginLeft: WIDTH * 0.05,
    },
    cardName:{
        fontWeight: "600",
        fontSize: 15
    },
    regex: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    regexValue:{
        color: "#B8B8D2"
    }
});