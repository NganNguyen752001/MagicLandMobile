import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";

import defaultAvt from "../../assets/header/defaultAvt.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Header({ goback, navigation, background, title }) {

    const cartNavigate = () => {
        navigation.navigate("CartScreen")
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    goback ? goback() : navigation?.pop();
                }}
            >
                <Icon name={"close"} color={"white"} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
    backButton: {
        position: "absolute",
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        left: 0,
    },
    headerTitle: {
        paddingVertical: 10,
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
});