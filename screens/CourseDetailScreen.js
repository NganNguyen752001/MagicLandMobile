import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';
import ClassCard from '../components/ClassCard';
import { truncateString, formatPrice } from '../util/util';

import courseDetailBackground from "../assets/images/courseDetailBackground.png"
import FilterCustomModal from '../components/modal/FilterCustomModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const classCardDetailDefault = [
    {
        id: 0,
        status: true,
        title: "Lớp Toán Tư Duy 1",
        age: 8,
        place: "Cơ sở 1",
        timeFrom: "18:30",
        timeTo: "20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 1,
        status: false,
        title: "Lớp Toán Tư Duy 2",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 2,
        status: false,
        title: "Lớp Toán Tư Duy 3",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
    {
        id: 3,
        status: true,
        title: "Lớp Toán Tư Duy 4",
        age: 8,
        place: "Cơ sở 1",
        time: "18:30 20:00",
        rate: 4.6,
        registerAmount: 8,
        price: 200000,
        leasonAmount: 20,
        choose: false,
    },
]

const filterDetailDefault = {
    amountRegister: [
        {
            name: "Dưới 10 học viên",
            check: false,
        },
        {
            name: "Từ 10 - 20 học viên",
            check: false,
        },
        {
            name: "Trên 20 học viên",
            check: false,
        },
    ],
    amountLesson: [
        {
            name: "Dưới 10 buổi",
            check: false,
        },
        {
            name: "Từ 10 - 20 buổi",
            check: false,
        },
        {
            name: "Trên 20 buổi",
            check: false,
        },
    ],
    type: [
        {
            name: "Online",
            check: false,
        },
        {
            name: "Offline",
            check: false,
        },
    ],
    time: [
        {
            name: "Thứ 2 - Thứ 4 - Thứ 6",
            check: false,
        },
        {
            name: "Thứ 3 - Thứ 5 - Thứ 7",
            check: false,
        },
        {
            name: "Thứ 7 - Chủ Nhật",
            check: false,
        },
    ]
}

export default function CourseDetailScreen({ route, navigation }) {

    const [viewDetail, setViewDetail] = useState({ detail: false, course: false })
    const [classCardDetail, setClassCardDetail] = useState(classCardDetailDefault)
    const [filterVisible, setFilterVisible] = useState(false)
    const [filterValue, setFilterValue] = useState(filterDetailDefault)
    let course = route?.params?.course

    useEffect(() => {
        setViewDetail({ detail: false, course: false })
        setClassCardDetail(classCardDetailDefault)
        course = route?.params?.course
    }, [])

    const goback = () => {
        if (route?.params?.goback) {
            route?.params?.goback()
        } else {
            navigation.navigate("CourseScreen")
        }
    }

    const selectCourse = (id) => {
        const index = classCardDetail.findIndex(obj => obj.id === id);
        const updateArray = [...classCardDetailDefault]
        const defaultStatus = updateArray[index].choose
        updateArray.forEach(item => item.choose = false)
        updateArray[index].choose = !defaultStatus;
        setClassCardDetail(updateArray)
    }

    const handleRegister = () => {
        navigation.push("ClassRegisterScreen", { course: course, classList: classCardDetail })
    }

    const hanldeSubmit = () => {
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeCancle = () => {
        hanldeClear()
        setFilterVisible(false)
    }

    const hanldeClear = () => {
        const clearedFilterValue = { ...filterValue };

        clearedFilterValue.amountRegister.forEach(item => (item.check = false));
        clearedFilterValue.amountLesson.forEach(item => (item.check = false));
        clearedFilterValue.type.forEach(item => (item.check = false));
        clearedFilterValue.time.forEach(item => (item.check = false));

        setFilterValue(clearedFilterValue);
    };

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Số lượng đăng ký:</Text>
                {
                    filterValue.amountRegister.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.amountRegister[index].check
                                    updatedFilterValue.amountRegister.forEach(item => item.check = false)
                                    updatedFilterValue.amountRegister[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Số buổi học</Text>
                {
                    filterValue.amountLesson.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.amountLesson[index].check
                                    updatedFilterValue.amountLesson.forEach(item => item.check = false)
                                    updatedFilterValue.amountLesson[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Hình thức</Text>
                {
                    filterValue.type.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.flexColumn}
                                onPress={() => {
                                    const updatedFilterValue = { ...filterValue };
                                    const defaultValue = updatedFilterValue.type[index].check
                                    updatedFilterValue.type.forEach(item => item.check = false)
                                    updatedFilterValue.type[index].check = !defaultValue;
                                    setFilterValue(updatedFilterValue);
                                }}
                                key={index}
                            >
                                <View style={[styles.checkboxButton, item.check && styles.checkboxChoosed]}>
                                    <Icon name={"check"} color={"white"} size={20} />
                                </View>
                                <Text style={[styles.checkboxText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <Text style={styles.modalTitle}>Thời gian</Text>
                <View style={styles.modalOption}>
                    {
                        filterValue.time.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.check && styles.choosed]}
                                    onPress={() => {
                                        const updatedFilterValue = { ...filterValue };
                                        const defaultValue = updatedFilterValue.time[index].check
                                        updatedFilterValue.time.forEach(item => item.check = false)
                                        updatedFilterValue.time[index].check = !defaultValue;
                                        setFilterValue(updatedFilterValue);
                                    }}
                                    key={index}
                                >
                                    <Text style={[styles.optionText, item.check && styles.choosedText]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.banner}>
                <Image source={course?.img} style={styles.bannerBackground} resizeMode="cover" />
                <View style={styles.bannerHeader}>
                    <TouchableOpacity onPress={goback}>
                        <Icon name={"chevron-left"} color={"#FFFFFF"} size={32} />
                    </TouchableOpacity>
                    <View style={styles.flexColumn}>
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.push("CartScreen")}>
                            <Icon name={"book"} color={"#FFFFFF"} size={28} />
                        </TouchableOpacity>
                        <View style={styles.headerIcon}><Icon name={"bell"} color={"#FFFFFF"} size={28} /></View>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.flexColumn}>
                    <Text style={{ ...styles.title, width: WIDTH * 0.55 }}>
                        Khóa Học: {course?.name}
                    </Text>
                    <View style={styles.priceView}>
                        <Text style={{ ...styles.priceText }}>
                            {formatPrice(course?.coursePrice)} đ
                        </Text>
                    </View>
                </View>
                <View style={{
                    ...styles.flexBetweenColumn, width: WIDTH * 0.75, marginHorizontal: WIDTH * 0.025,
                    marginVertical: 20
                }}>
                    <View style={styles.flexColumn}>
                        <Icon name={"account"} color={"#3AAC45"} size={32} />
                        <Text style={styles.cardText}>{course.rateCount} người đăng ký</Text>
                    </View>
                    {
                        course.rateCount !== 0 ?
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#FFC90C"} size={28} />
                                <Text style={styles.cardText}><Text style={{ ...styles.cardText, fontSize: 15 }}>{course.rateValue}</Text> ({course.registerAmount} lượt đánh giá)</Text>
                            </View>
                            :
                            <View style={styles.flexColumn}>
                                <Icon name={"star"} color={"#C4C4C4"} size={28} />
                                <Text style={styles.cardText}> Chưa có đánh giá</Text>
                            </View>
                    }
                </View>
                <Text style={styles.descrip}>
                    {
                        !viewDetail.detail ?
                            truncateString(course?.introduce, 109)
                            :
                            course?.introduce
                    }
                </Text>
                <Text style={{ ...styles.descrip }}>
                    {
                        !viewDetail.detail ?
                            ""
                            :
                            `(${course?.regexDescrip})`
                    }
                </Text>
                <Text style={styles.title}>
                    Vì Sao Nên Cho Bé Học Toán Tư Duy Từ Sớm?
                </Text>
                {
                    !viewDetail.detail ?
                        <View style={styles.courseFeature}>
                            <View style={styles.featureIcon}>
                                <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                            </View>
                            <View style={styles.featureText}>
                                <Text style={{ ...styles.descrip, fontWeight: "600" }}>
                                    {course?.courseFeture[0]?.name}:
                                    <Text style={styles.descrip}>
                                        {truncateString(" " + course?.courseFeture[0]?.detail, 60)}
                                        <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, detail: true, course: false }) }}>
                                            <Text style={styles.viewDetail}>
                                                Xem Chi Tiết
                                            </Text>
                                        </TouchableOpacity>
                                    </Text>
                                </Text>

                            </View>
                        </View>
                        :
                        course?.courseFeture?.map((item, key) => {
                            return (
                                <View style={styles.courseFeature} key={key}>
                                    <View style={styles.featureIcon}>
                                        <Icon name={"check-circle-outline"} color={"#1BAE3B"} size={28} />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={{ ...styles.descrip, fontWeight: "600" }}>
                                            {item?.name}:
                                            <Text style={styles.descrip}>
                                                {" " + item?.detail}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                }
                <Text style={{ ...styles.title, marginTop: 20 }}>
                    {`Chi Tiết Khóa Học   `}
                    <TouchableOpacity onPress={() => { setViewDetail({ ...viewDetail, course: true, detail: false }) }}>
                        <Text style={styles.viewDetail}>
                            Xem Chi Tiết
                        </Text>
                    </TouchableOpacity>
                </Text>
                {
                    viewDetail?.course &&
                    <View style={styles.courseDetail}>
                        <View>
                            {course?.courseDetail?.map((item, key) => {
                                return (
                                    <View style={styles.flexColumn} key={key}>
                                        <View style={styles.detailColumn} >
                                            <View style={styles.detailColumnIcon}>
                                                <Icon name={"arrow-right-bold-outline"} color={"#1BAE3B"} size={22} />
                                            </View>
                                            <Text style={{ ...styles.descrip, fontWeight: "600", fontSize: 13 }}>
                                                {item?.name + ": "}
                                            </Text>
                                        </View>
                                        <View style={styles.detailColumn}>
                                            <Text style={{ ...styles.descrip, width: WIDTH * 0.5 }}>
                                                {item?.detail}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                }
                <View style={{ ...styles.flexBetweenColumn, alignItems: "baseline", marginBottom: 15 }}>
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        {`Lịch Học Các Lớp Học: `}
                    </Text>
                    <TouchableOpacity
                        style={{ transform: [{ translateY: 5 }] }}
                        onPress={() => {
                            setFilterVisible(true)
                        }}
                    >
                        <Icon name={"filter-variant"} color={"#33363F"} size={28} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardList}>
                    {classCardDetail?.map((item, key) => {
                        return <ClassCard cardDetail={item} check={true} index={key} onClick={selectCourse} key={key} />
                    })}
                </View>
                <View style={{ ...styles.flexBetweenColumn, marginVertical: 15 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Quan Tâm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: "#4582E6" }} onPress={handleRegister}>
                        <Text style={{ ...styles.buttonText, color: "white" }}>Đăng Ký Ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    banner: {
        position: "relative",
        width: WIDTH,
        height: 150,
        marginBottom: 20,
    },
    bannerBackground: {
        width: WIDTH,
        height: 300,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
    },
    bannerHeader: {
        width: "90%",
        position: "absolute",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        top: "10%",
        left: "5%",
        backgroundColor: "rgba(136, 136, 136, 0.5)",
        zIndex: 10,
    },
    headerIcon: {
        marginLeft: 10,
    },
    content: {
        width: WIDTH * 0.95,
        padding: 20,
        // paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "white",
        marginHorizontal: WIDTH * 0.025
        // transform: [{ translateY: -(HEIGHT * 0.05) }]
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#42AEF4"
    },
    priceView: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "#42AEF4",
    },
    priceText: {
        color: "white",
        fontWeight: "600"
    },
    cardText: {
        fontSize: 12,
        color: "#3AAC45"
    },
    descrip: {
        marginTop: 10,
        opacity: 0.7,
        lineHeight: 18,
    },
    courseFeature: {
        flexDirection: "row",
    },
    featureIcon: {
        paddingHorizontal: 15,
        transform: [{ translateY: 10 }],
    },
    featureText: {
        width: WIDTH * 0.7,
        flexDirection: "row",
    },
    viewDetail: {
        color: "#3A0CA3",
        transform: [{ translateY: 3 }],
    },
    courseDetail: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    detailColumn: {
        minHeight: 30,
        width: WIDTH * 0.43,
        flexDirection: 'row',
        alignItems: "center",
    },
    detailColumnIcon: {
        transform: [{ translateY: 5 }],
        marginRight: 10,
    },
    cardList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
    },

    flexBetweenColumn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#4582E6",
        marginHorizontal: 15,
    },
    buttonText: {
        color: "#4582E6",
        fontWeight: "600"
    },

    modalContent: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 20,
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 18,
        color: "#888888"
    },
    modalOption: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    optionButton: {
        padding: 10,
        paddingHorizontal: 15,
        borderColor: "#3D5CFF",
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
        // backgroundColor: "#D9D9D9",
    },
    optionText: {
        color: "#4582E6",
        fontWeight: "600"
    },
    choosed: {
        backgroundColor: "#4582E6",
    },
    choosedText: {
        color: "white"
    },
    checkboxButton: {
        width: 25,
        height: 25,
        borderWidth: 3,
        borderColor: "#888888",
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 8,
    },
    checkboxChoosed: {
        borderColor: "#4582E6",
        backgroundColor: "#4582E6",
    }
});