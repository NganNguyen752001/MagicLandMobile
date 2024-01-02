import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import ChooseVourcherModal from '../../components/modal/ChooseVourcherModal';
import InputOtpModal from '../../components/modal/InputOtpModal';
import PaymentSuccessModal from '../../components/modal/PaymentSuccessModal';

import { formatPrice } from '../../util/util';
import { modifyCart } from '../../api/cart';


const vourcherListDefault = [
    {
        name: "GIAMGIA15%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 15,
        max: 40000,
        minUse: 100000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA40%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 40,
        max: 50000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA50%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 50,
        max: 50000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
    {
        name: "GIAMGIA70%",
        content: "Siêu ưu đãi mừng khai giảng khóa mới bắt đầu từ ngày 10/9 - 20/9",
        value: 70,
        max: 75000,
        minUse: 150000,
        expire: "20.12.2023",
        choose: false
    },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PaymentScreen({ route, navigation }) {

    let classDetail = route?.params?.classDetail
    const [studentList, setStudentList] = useState(route?.params?.studentList)
    const [vourcherList, setVourcherList] = useState(vourcherListDefault)
    const [modalVisible, setModalVisible] = useState({ vourcher: false, otp: false, notifi: false })

    useEffect(() => {
        classDetail = route?.params?.classDetail
        setStudentList(route?.params?.studentList)
        setVourcherList(vourcherListDefault)
    }, [route?.params?.classDetail, route?.params?.studentList])

    const hanldeCloseOtpModal = () => {
        setModalVisible({ ...modalVisible, otp: false })
    }

    const handlePayment = () => {
        setModalVisible({ ...modalVisible, otp: true })
    }

    const handleSubmitOtp = async (otp) => {
        // console.log(studentList.map(item => item.id), classDetail.id);

        // console.log(classDetail);
        classDetail?.map(async (classItem) => {
            const response = await modifyCart(studentList.map(item => item.id), classItem.id)
            if (response?.status === 200) {
                console.log(`Đã đăng ký ${studentList.map(item => item.fullName)} vào lớp ${classItem.name}`);
                setModalVisible({ ...modalVisible, otp: false, notifi: true })
            } else {
                console.log(`Đăng ký ${studentList.map(item => item.fullName)} vào lớp ${classItem.name} thất bại`);
            }
        })

    }

    const handleChooseVourcherModal = () => {
        setModalVisible({ ...modalVisible, vourcher: true })
    }

    const handleCancleVourcherModal = () => {
        setModalVisible({ ...modalVisible, vourcher: false })
    }

    const handleCloseNotifiModal = () => {
        setModalVisible({ ...modalVisible, notifi: false })
        navigation.push("TransactionDetailScreen", { total: totalPayment() })
    }

    const handleChooseVourcher = (index) => {
        const updateList = [...vourcherList]
        const defaultChoose = updateList[index].choose
        updateList.forEach(item => item.choose = false)
        updateList[index].choose = !defaultChoose
        setVourcherList(updateList)
        handleCancleVourcherModal()
    }

    const vourcherValue = () => {
        const vourcher = vourcherList?.filter(vourcher => vourcher.choose === true);
        if (vourcher.length === 0) {
            return undefined
        } else {
            return vourcher[0]
        }
    }

    const totalPrice = () => {
        let totalPrice = 0
        classDetail?.map(item => {
            totalPrice += item.coursePrice
        })
        return (studentList.length * (totalPrice !== 0 ? totalPrice : 200000))
    }

    const vourcherDiscount = () => {
        const discount = vourcherValue().value
        const discountValue = totalPrice() / discount * 100
        if (discountValue > vourcherValue().max) {
            return vourcherValue().max
        } else {
            return discountValue
        }
    }

    const totalPayment = () => {
        const discountValue = vourcherValue() ? vourcherDiscount() : 0
        const totalPayment = totalPrice() - discountValue
        return totalPayment
    }

    return (
        <>
            <Header navigation={navigation} background={"#241468"} title={"Thông tin thanh toán"} goback={navigation.popToTop} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.checkPayment}>
                    <Icon name={"alert-circle"} color={"#241468"} size={28} />
                    <Text style={{ color: "#241468" }}>Vui lòng kiểm tra lại thông tin thanh toán:</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Thông Tin Đăng Ký</Text>
                </View>
                {
                    studentList?.map((item, index) => {
                        return (
                            <View style={styles.studentDetail} key={index}>
                                {
                                    index !== 0 &&
                                    <View style={styles.dashline} />
                                }
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Tên học viên:</Text>
                                    <Text style={styles.boldText}>{item.fullName}</Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Khóa Học:</Text>
                                    <Text style={styles.boldText}>
                                        {
                                            classDetail.map(item => (item.name))
                                        }
                                    </Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Khai giảng ngày:</Text>
                                    <Text style={{ ...styles.boldText, color: "#2ECFFB" }}>05/01/2024</Text>
                                </View>
                                <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                                    <Text style={styles.detailViewTitle}>Lịch Học:</Text>
                                    <Text style={{ ...styles.boldText, color: "#2ECFFB" }}>Thứ 2-4-6 / tuần (7h30 - 9h)</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={styles.titleView}>
                    <Text style={styles.title}>Chọn phương thức thanh toán</Text>
                </View>
                <View style={styles.studentDetail} >
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }}>
                        <Text style={styles.detailViewTitle}>Học Phí:</Text>
                        <Text style={styles.boldText}>{formatPrice(classDetail[0].coursePrice)}đ</Text>
                    </View>
                    <TouchableOpacity style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, height: 45, marginVertical: 5, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#F9ACC0" }} onPress={handleChooseVourcherModal}>
                        <Text style={{ ...styles.detailViewTitle, color: "#3AAC45" }}>Vourcher Giảm Giá</Text>
                        {
                            vourcherValue() ?
                                <View style={styles.flexColumn}>
                                    <Text style={{ color: "#3AAC45" }}>Giảm {formatPrice(vourcherDiscount())}đ</Text>
                                    <Icon name={"chevron-right"} color={"#3AAC45"} size={18} />
                                </View>
                                :
                                <Icon name={"chevron-right"} color={"#3AAC45"} size={28} />
                        }

                    </TouchableOpacity>
                    <View style={{ ...styles.flexColumnBetween, width: WIDTH * 0.75, marginVertical: 5 }}>
                        <Text style={styles.detailViewTitle}>Tổng tiền:</Text>
                        <Text style={{ ...styles.boldText }}>{formatPrice(totalPayment())}đ</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={handlePayment}>
                        <Text style={{ ...styles.boldText, padding: 15, color: "white" }}>Thanh Toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ChooseVourcherModal visible={modalVisible.vourcher} vourcherList={vourcherList} navigation={navigation} onChoose={handleChooseVourcher} onCancle={handleCancleVourcherModal} discount={vourcherValue() ? vourcherDiscount() : 0} />
            <InputOtpModal visible={modalVisible.otp} phone={"12345689"} onCancle={hanldeCloseOtpModal} onSubmit={handleSubmitOtp} />
            <PaymentSuccessModal visible={modalVisible.notifi} onSubmit={handleCloseNotifiModal} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    flexColumnAround: {
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    flexColumnCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumnBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },

    checkPayment: {
        flexDirection: "row",
        width: WIDTH,
        paddingVertical: 10,
        backgroundColor: "rgba(36, 20, 104, 0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    titleView: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderLeftWidth: 5,
        borderLeftColor: "#4582E6",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 5,
        color: "#4582E6",
        fontWeight: "600",
        fontSize: 18,
    },
    studentDetail: {
        marginHorizontal: WIDTH * 0.1,
    },
    detailViewTitle: {
        color: "#C4C4C4",
        fontSize: 15,
        fontWeight: "600"
    },
    dashline: {
        width: "95%",
        height: 2,
        backgroundColor: "#FF8D9D",
        marginVertical: 10
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 15,
        backgroundColor: "white"
    },
    button: {
        width: WIDTH * 0.7,
        borderColor: "#C71212",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});