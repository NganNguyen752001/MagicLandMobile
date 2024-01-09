import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Modal } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'

import Header from '../header/Header';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ChoosePaymentMethod({ visible, paymentMethodList, setPaymentMethodList, onCancle, navigation }) {

    const handleChoosePaymentMethod = (id) => {
        setPaymentMethodList((prevStudentList) => {
            const index = prevStudentList.findIndex(obj => obj.id === id);
            return prevStudentList.map((item, i) => ({
                ...item,
                check: i === index ? true : false,
            }));
        });
        // onCancle()
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.safeArea} />
                <Header navigation={navigation} background={"#241468"} goback={onCancle} title={"Phương thức thanh toán"} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.paymentMethodList}>
                    {
                        paymentMethodList.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    style={{ ...styles.paymentMethod, backgroundColor: item.check ? "rgba(36, 20, 104, 0.7)" : "white" }}
                                    onPress={() => handleChoosePaymentMethod(item.id)}
                                    key={key}
                                >
                                    <View style={{ ...styles.flexDirectionBetween, width: "50%" }}>
                                        <View style={{ padding: 5, borderWidth: 1, borderRadius: 15, borderColor: "#241468", backgroundColor: "white" }}>
                                            <Image
                                                source={item.img}
                                                resizeMode='contain'
                                                style={styles.paymentIcon}
                                            />
                                        </View>
                                        <Text style={{ ...styles.boldText, color: "#241468", width: "40%" }}>{item.name}</Text>
                                    </View>
                                    <View style={{ ...styles.flexDirectionBetween, justifyContent: "flex-end", width: "20%" }}>
                                        <Icon name={"chevron-down"} color={"#4582E6"} size={30} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    safeArea: {
        width: WIDTH,
        height: 50,
        backgroundColor: "#241468"
    },
    paymentMethodList: {
        // paddingVertical: 20,
    },
    paymentMethod: {
        flexDirection: "row",
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.05,
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    paymentIcon: {
        height: WIDTH * 0.15,
        width: WIDTH * 0.15,
    },

    flexDirectionBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    boldText: {
        fontWeight: "600"
    },
});