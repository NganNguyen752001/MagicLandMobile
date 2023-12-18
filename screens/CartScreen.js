import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FavoriteHeader from '../components/header/FavoriteHeader';

import { formatPrice, getIndexById } from '../util/util';
import CourseCard from '../components/CourseCard';
import ClassCard from '../components/ClassCard';

const courseDetail = [
    {
        id: 0,
        name: "Toán Tư Duy Cho Bé (Cơ Bản)",
        regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
        introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
        vietType: "toán",
        type: "math",
        img: require("../assets/home/cardImage/homeCardMathImg.png"),
        registerAmount: 8,
        rateValue: 4.5,
        rateCount: 8,
        coursePrice: 200000,
        favorite: true,
        choose: false,
        courseFeture: [
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
        ],
        courseDetail: [
            {
                name: "Tên KH",
                detail: "Toán Tư Duy Cho Bé"
            },
            {
                name: "Điều kiện tham gia",
                detail: "Đã hoàn thành khóa học Math001"
            },
            {
                name: "Độ tuổi",
                detail: "Từ 7 tuổi"
            },
            {
                name: "Loại Hình",
                detail: "Tiếng Anh"
            },
            {
                name: "Hình Thức",
                detail: "Lớp học"
            },
            {
                name: "Số buổi",
                detail: "4 buổi / khóa"
            },
        ],
    },
    {
        id: 1,
        name: "Vẽ Cùng Bé",
        regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
        introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
        vietType: "toán",
        type: "art",
        img: require("../assets/home/cardImage/homeCardDrawImg.png"),
        registerAmount: 8,
        rateValue: 4.5,
        rateCount: 8,
        coursePrice: 200000,
        favorite: true,
        choose: false,
        courseFeture: [
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
        ],
        courseDetail: [
            {
                name: "Tên KH",
                detail: "Toán Tư Duy Cho Bé"
            },
            {
                name: "Điều kiện tham gia",
                detail: "Đã hoàn thành khóa học Math001"
            },
            {
                name: "Độ tuổi",
                detail: "Từ 7 tuổi"
            },
            {
                name: "Loại Hình",
                detail: "Tiếng Anh"
            },
            {
                name: "Hình Thức",
                detail: "Lớp học"
            },
            {
                name: "Số buổi",
                detail: "4 buổi / khóa"
            },
        ],
    },
    {
        id: 2,
        name: "Vẽ Cùng Bé 2",
        regexDescrip: "Dành cho bé từ 7 đến 15 tuổi",
        introduce: "Khóa học Toán Tư Duy Cho Bé được thiết kế dành cho các  bé từ 3 tuổi đến 15 tuổi nhằm giúp phát triển trí não, nâng cao độ hiểu biết của trẻ về môn toán. Từ đó, giúp các bé mở rộng thêm tiềm năng phát triển trong tương lai",
        vietType: "toán",
        type: "art",
        img: require("../assets/home/cardImage/homeCardDrawImg.png"),
        registerAmount: 8,
        rateValue: 0,
        rateCount: 0,
        coursePrice: 200000,
        favorite: true,
        choose: false,
        courseFeture: [
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
            {
                name: "Phát trển tư duy và kỹ năng",
                detail: "phát triển trí não và nâng cao các kỹ năng nhận biết với các phép tính toán…"
            },
        ],
        courseDetail: [
            {
                name: "Tên KH",
                detail: "Toán Tư Duy Cho Bé"
            },
            {
                name: "Điều kiện tham gia",
                detail: "Đã hoàn thành khóa học Math001"
            },
            {
                name: "Độ tuổi",
                detail: "Từ 7 tuổi"
            },
            {
                name: "Loại Hình",
                detail: "Tiếng Anh"
            },
            {
                name: "Hình Thức",
                detail: "Lớp học"
            },
            {
                name: "Số buổi",
                detail: "4 buổi / khóa"
            },
        ],
    },
]

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
        price: 100000,
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
        price: 150000,
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
        price: 250000,
        leasonAmount: 20,
        choose: false,
    },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CartScreen({ navigation }) {

    const [choosedList, setChoosedList] = useState([...courseDetail])
    const [classCardDetail, setClassCardDetail] = useState(classCardDetailDefault)
    const [bottomModalVisible, setBottomModalVisible] = useState({ total: false, confirm: false })

    const hanldeChangeStatus = () => {
        if (bottomModalVisible.total) {
            hanldeClearChoosed()
            setBottomModalVisible({ total: false, confirm: false })
        } else {
            setBottomModalVisible({ total: true, confirm: false })
        }
    }

    const hanldeRegis = () => {
        const choosesListCount = classCardDetail.filter(item => item.choose)
        if (choosesListCount.length !== 0) {
            setBottomModalVisible({ total: true, confirm: true })
        }
    }

    const hanldeClearChoosed = () => {
        const updateList = [...classCardDetail]
        updateList.forEach(item => item.choose = false)
        setClassCardDetail(updateList)
    }

    const handleCancel = () => {
        hanldeClearChoosed()
        setBottomModalVisible({ total: false, confirm: false })
    }

    const handleSubmit = () => {
        const courseList = classCardDetail.filter(item => item.choose)
        navigation.push("RegisterClassScreen", { courseList: courseList })
        // hanldeChangeStatus()
    }

    const getCountChoosed = () => {
        const choosesListCount = classCardDetail.filter(item => item.choose)
        return choosesListCount.length
    }

    const selectCourse = (id) => {
        if (bottomModalVisible.total) {
            const index = classCardDetail.findIndex(obj => obj.id === id);
            const updateArray = [...classCardDetailDefault]
            const defaultStatus = updateArray[index].choose
            // updateArray.forEach(item => item.choose = false)
            updateArray[index].choose = !defaultStatus;
            setClassCardDetail(updateArray)
        }
    }

    return (
        <>
            <FavoriteHeader navigation={navigation} background={"#241468"} title={`Khóa Học Bạn Quan Tâm (${classCardDetail.length})`} type={bottomModalVisible.total} setType={hanldeChangeStatus} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {classCardDetail?.map((item, index) => {
                    return <ClassCard cardDetail={item} check={bottomModalVisible.total} index={index} onClick={selectCourse} key={index} />
                })}
                {/* <View style={styles.cardList}>
                    {
                        courseDetail.map((item, index) => {
                            return (
                                <CourseCard cardDetail={item} onClick={hanldeCoursePress} choose={choosedList[index].choose} key={index} />
                            )
                        })
                    }
                </View> */}
            </ScrollView>
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
                                <TouchableOpacity style={styles.modalIconView} onPress={hanldeClearChoosed}>
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