import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getCartOfParent, removeClassInCart } from "../api/cart"

import FavoriteHeader from '../components/header/FavoriteHeader';

import { formatPrice, getIndexById } from '../util/util';
import CourseCard from '../components/CourseCard';
import ClassCard from '../components/ClassCard';
import SpinnerLoading from "../components/SpinnerLoading"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CartScreen({ navigation }) {

    const [classCardDetail, setClassCardDetail] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [bottomModalVisible, setBottomModalVisible] = useState({ total: false, confirm: false })

    useEffect(() => {
        setDataLoading(true)
        loadClassData()
        setDataLoading(false)
    }, [])

    const loadClassData = async () => {
        const response = await getCartOfParent()
        if (response?.status === 200) {
            setClassCardDetail(response?.data?.cartItems)
        }
    }

    const hanldeChangeStatus = () => {
        if (bottomModalVisible.total) {
            hanldeClearChoosed()
            setBottomModalVisible({ total: false, confirm: false })
        } else {
            setBottomModalVisible({ total: true, confirm: false })
        }
    }

    const hanldeRegis = () => {
        const choosesListCount = classCardDetail?.filter(item => item.class.choose)
        if (choosesListCount.length !== 0) {
            setBottomModalVisible({ total: true, confirm: true })
        }
    }

    const hanldeClearChoosed = () => {
        const updateList = [...classCardDetail]
        updateList.forEach(item => item.class.choose = false)
        setClassCardDetail(updateList)
    }

    const handleRemoveCart = async () => {
        setDataLoading(true)
        const choosedList = classCardDetail?.filter(item => item.class.choose)
        choosedList.map(async (item) => {
            await removeClassInCart(item.id)
        })
        await loadClassData()
        setDataLoading(false)
    }

    const handleCancel = () => {
        hanldeClearChoosed()
        setBottomModalVisible({ total: false, confirm: false })
    }

    const handleSubmit = () => {
        const courseList = classCardDetail?.filter(item => item.class.choose)
        navigation.push("RegisterClassScreen", { courseList: courseList })
        // hanldeChangeStatus()
    }

    const getCountChoosed = () => {
        const choosesListCount = classCardDetail?.filter(item => item.choose)
        return choosesListCount.length
    }

    const selectCourse = (id) => {
        if (bottomModalVisible.total) {
            const index = getIndexById(classCardDetail, id);
            if (index !== -1) {
                const updateArray = [...classCardDetail];
                const classItem = updateArray[index].class;

                const defaultStatus = classItem && classItem.choose ? classItem.choose : false;

                if (classItem) {
                    classItem.choose = !defaultStatus;
                }

                setClassCardDetail(updateArray);
            }
        }
    };

    const getIndexById = (array, id) => {
        return array.findIndex(item => item.class && item.class.id === id);
    };

    return (
        <>
            <FavoriteHeader navigation={navigation} background={"#241468"} title={`Khóa Học Bạn Quan Tâm (${classCardDetail.length})`} type={bottomModalVisible.total} setType={hanldeChangeStatus} />
            {
                dataLoading ?
                    <SpinnerLoading />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        {classCardDetail?.map((item, index) => {
                            return <ClassCard cardDetail={item.class} check={bottomModalVisible.total} index={index} onClick={selectCourse} key={index} />
                        })}
                    </ScrollView>
            }
            {
                bottomModalVisible.total &&
                <View style={styles.screenBottom}>
                    {
                        bottomModalVisible.confirm ?
                            <View style={styles.confirmModal}>
                                <Text style={{ ...styles.modalText, marginBottom: 7 }}>Bạn Đã chọn {getCountChoosed()} khóa học</Text>
                                <Text style={{ ...styles.modalText, marginBottom: 15 }}>Bạn có muốn đăng ký khóa học không?</Text>
                                <View style={styles.modalButtonView}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                                        <Text style={styles.modalButtonText}>Bỏ qua</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                                        <Text style={{ ...styles.modalButtonText, color: "#C71212" }}>Đăng ký</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={styles.choosingModal}>
                                <TouchableOpacity style={styles.modalIconView} onPress={hanldeRegis}>
                                    <Icon name={"book-plus"} color={"#FFFFFF"} size={28} />
                                    <Text style={styles.modalIconText}>Đăng Ký</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalText}>{`Đã chọn ${getCountChoosed()} khóa học`}</Text>
                                <TouchableOpacity style={styles.modalIconView} onPress={handleRemoveCart}>
                                    <Icon name={"trash-can-outline"} color={"#FFFFFF"} size={28} />
                                    <Text style={styles.modalIconText}>Thùng rác</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            }

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: WIDTH * 0.03,
        paddingTop: 20,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
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
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "600",
    },

    cardList: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    screenBottom: {
        position: "absolute",
        paddingBottom: 30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#241468",
        justifyContent: "flex-start",
    },
    choosingModal: {
        flexDirection: "row",
        padding: 20,
        paddingHorizontal: 30,
        paddingBottom: 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalIconView: {
        justifyContent: 'center',
        alignItems: "center",
    },
    modalIconText: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
    },
    modalText: {
        fontWeight: "700",
        color: "#ffffff"
    },
    confirmModal: {
        padding: 20,
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    modalButtonView: {
        width: WIDTH * 0.6,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    modalButton: {
        padding: 15,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "white",
    },
    modalButtonText: {
        fontWeight: "700",
        color: "#3D5CFF"
    },
});