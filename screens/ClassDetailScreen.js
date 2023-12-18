import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../components/header/Header';
import NotificationModal from '../components/modal/NotificationModal';

import ThuyTienAvt from "../assets/images/ThuyTienAvt.png"
import ProcessBar from '../components/ProcessBar';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const programEducationDefault = [
    {
        name: "Giới thiệu khái quát Toán Tư Duy.",
        expand: false,
        list: [
            {
                name: "Giới thiệu khóa học"
            },
            {
                name: "Làm quen với Toán Tư Duy"
            },
            {
                name: "Những con số xếp hàng"
            },
        ]
    },
    {
        name: "Rèn kỹ năng so sánh, thống kê, cân thăng bằng. ",
        expand: false,
        list: [
            {
                name: "Cân thăng bằng"
            },
            {
                name: "Làm quen với cái cân"
            },
            {
                name: "Bé tập thống kê"
            },
            {
                name: "Các số xếp hàng"
            },
            {
                name: "Trò chơi đếm cách"
            },
            {
                name: "Kiểm tra 1"
            },
        ]
    },
    {
        name: "Làm quen các số từ 0 đến 10, tập đếm đến 20, ... ",
        expand: false,
        list: [
            {
                name: "Số nào ở đâu?"
            },
            {
                name: "Que tính kì diệu"
            },
            {
                name: "Cộng thêm với 10"
            },
            {
                name: "Cộng trừ đến 20"
            },
            {
                name: "Trong “3” có “1” và “2”"
            },
            {
                name: "Làm thế nào để tính nhanh"
            },
            {
                name: "Sudoku"
            },
            {
                name: "Bài kiểm tra 2"
            },
        ]
    },
    {
        name: "Sáng tạo với hình học, xếp vòng.",
        expand: false,
        list: [
            {
                name: "Khối trụ"
            },
            {
                name: "khối cầu"
            },
            {
                name: "Khối lập phương"
            },
            {
                name: "Thử tài đoán vật"
            },
            {
                name: "Tập làm kiến trúc sư"
            },
        ]
    },
    {
        name: "Các bài toán vận dụng thực tiễn.",
        expand: false,
        list: [
            {
                name: "Câu đố hoa quả"
            },
            {
                name: "Chiếc hộp có chứa được quả không?"
            },
            {
                name: "Bảy ngày trong tuần"
            },
            {
                name: "Mười hai tháng trong năm"
            },
            {
                name: "Bông hoa đồng hồ"
            },
            {
                name: "Bài đánh giá năng lực"
            },
        ]
    },
]

export default function ClassDetailScreen({ route, navigation }) {
    let classDetail = route?.params?.classDetail
    const [programEducation, setProgramEducation] = useState(programEducationDefault)
    let count = 0

    useEffect(() => {
        classDetail = route?.params?.classDetail
    }, [route?.params?.classDetail])

    const getLeftWidth = (amount, total) => {
        const percent = amount / total
        return (WIDTH * 0.9) * percent
    }

    return (
        <>
            <Header navigation={navigation} background={"#241468"} goback={navigation.pop} title={"Thông Tin Chi Tiết Của Lớp Học"} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Khóa học:</Text>
                </View>
                <View style={styles.classDetail}>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Khóa học:
                        </Text>
                        <Text style={styles.classValue}>
                            {classDetail?.title}
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Lớp học:
                        </Text>
                        <Text style={styles.classValue}>
                            TTD2
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Ngày khai giảng:
                        </Text>
                        <Text style={styles.classValue}>
                            05/01/2024
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Lịch học
                        </Text>
                        <Text style={styles.classValue}>
                            Thứ 3 - 5 - 7 (17h - 18h:30)
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Hình Thức:
                        </Text>
                        <Text style={styles.classValue}>
                            Offline
                        </Text>
                    </View>
                    <View style={styles.flexColumnBetween}>
                        <Text style={styles.boldText}>
                            Trạng thái:
                        </Text>
                        <Text style={styles.classValue}>
                            Đang học
                        </Text>
                    </View>

                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Tiến độ:</Text>
                </View>

                <ProcessBar
                    leftLable={"7 buổi"}
                    leftWidth={getLeftWidth(7, classDetail.leasonAmount)}
                    rightLabel={"13 buổi"}
                    rightWidth={(WIDTH * 0.9) - getLeftWidth(7, classDetail.leasonAmount)}
                    mainLabel={"20 buổi"}
                />

                <View style={styles.titleView}>
                    <Text style={styles.title}>Chương trình giảng dạy:</Text>
                </View>

                <View style={styles.program}>
                    {
                        programEducation?.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        ...styles.mainTab,
                                        backgroundColor: index % 2 === 1 ? "#C2D9FF" : "white"
                                    }}
                                    key={index}
                                >
                                    <TouchableOpacity
                                        style={{ ...styles.flexColumnBetween, paddingVertical: 8 }}
                                        onPress={() => {
                                            const updatedProgramEducation = [...programEducation];
                                            updatedProgramEducation[index].expand = !updatedProgramEducation[index].expand;
                                            setProgramEducation(updatedProgramEducation);
                                        }}
                                    >
                                        <Text style={styles.mainText} numberOfLines={1}>{"Chủ đề " + (index + 1) + " - " + item.name}</Text>
                                        {
                                            !item.expand ?
                                                <Icon name={"plus"} color={"#241468"} size={25} />
                                                :
                                                <Icon name={"minus"} color={"#241468"} size={25} />
                                        }
                                    </TouchableOpacity>
                                    {
                                        item.expand &&
                                        item.list.map((element, key) => {
                                            count += 1
                                            return (
                                                <Text style={styles.childText} key={key}>{count}. {element.name}</Text>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Yêu cầu:</Text>
                </View>

                <View style={{ ...styles.flexColumn, alignItems: "baseline", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"circle"} color={"#4582E6"} size={15} />
                    <Text style={{ ...styles.boldText, marginLeft: 10 }}>Thực hiện đầy đủ các bài tập</Text>
                </View>
                <View style={{ ...styles.flexColumn, alignItems: "baseline", marginHorizontal: WIDTH * 0.05 }}>
                    <Icon name={"circle"} color={"#4582E6"} size={15} />
                    <Text style={{ ...styles.boldText, marginLeft: 10 }}>Tham gia tích cực</Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Giáo Viên:</Text>
                </View>

                <View style={styles.teacherInfor}>
                    <View style={styles.flexColumn}>
                        <Image
                            source={ThuyTienAvt}
                            style={styles.teachAvt}
                        />
                    </View>
                    <View style={styles.infor}>
                        <Text style={{ ...styles.boldText, textAlign: "center" }}>Cô Thủy Tiên</Text>
                        <View style={{ ...styles.flexColumn, width: "85%" }}>
                            <Icon name={"arrow-right-bold-outline"} color={"#3AAC45"} size={22} />
                            <Text style={{ ...styles.boldText }}>Giáo viên trung tâm anh ngữ</Text>
                        </View>
                        <View style={{ ...styles.flexColumn, width: "85%" }}>
                            <Icon name={"arrow-right-bold-outline"} color={"#3AAC45"} size={22} />
                            <Text style={styles.boldText}>Kinh nghiệm 5 năm giảng dạy</Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton}>
                            <View style={styles.button}>
                                <Text style={{ ...styles.boldText, color: "white" }}>Xem Hồ Sơ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 80,
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
        marginBottom: 5,
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
    classDetail: {
        width: WIDTH * 0.9,
        padding: 20,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        backgroundColor: "rgba(69, 130, 230, 0.28)"
    },
    classValue: {
        color: "#888888"
    },
    program: {
        width: WIDTH * 0.9,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: WIDTH * 0.05,
        overflow: "hidden"
    },
    mainTab: {
        padding: 10,
        borderRadius: 10,
    },
    mainText: {
        width: "90%",
        fontWeight: "600",
        color: "#241468",
        marginBottom: 10,
    },
    childText: {
        paddingLeft: 10,
        marginBottom: 5,
    },
    teacherInfor: {
        flexDirection: "row",
        width: WIDTH * 0.9,
        paddingBottom: 50,
        marginHorizontal: WIDTH * 0.05,
        alignItems: "center",
    },
    teachAvt: {
        width: 150,
        height: 160,
        borderRadius: 150,
    },
    infor: {
        marginLeft: 10,
    },
    viewButton: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#4582E6",
    },

    detail: {
        marginLeft: 10,
    }
});