import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SearchBar from '../../../components/SearchBar';
import CourseSlide from '../../../components/CourseSlide';
import CourseCard from '../../../components/CourseCard';
import FilterCustomModal from '../../../components/modal/FilterCustomModal';
import InputRange from '../../../components/InputRange';
import StarChoose from '../../../components/StarChoose';
import { getAllCourse } from '../../../api/course';
import SpinnerLoading from '../../../components/SpinnerLoading';
import { userSelector } from '../../../store/selector';
import { useSelector } from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const courseOptionDefault = [
    {
        name: "Tất cả",
        choose: true
    },
    {
        name: "Toán",
        choose: false
    },
    {
        name: "Vật Lý",
        choose: false
    },
    {
        name: "Ngoại Ngữ",
        choose: false
    },
    {
        name: "Vẽ",
        choose: false
    },
    {
        name: "Nấu Ăn",
        choose: false
    },
    {
        name: "Ba Lê",
        choose: false
    },
    {
        name: "Lập Trình",
        choose: false
    },
]

const priceDefault = {
    min: 0,
    max: 2000
}

const homeContentDetail = {
    carousel: [
        {
            img: require("../../../assets/home/carousel/carouselImg1.png")
        },
        {
            img: require("../../../assets/home/carousel/carouselImg2.png")
        },
        {
            img: require("../../../assets/home/carousel/carouselImg3.png")
        },
    ],
    courseIcon: [
        {
            id: 0,
            type: "math",
            name: "Toán",
            img: require("../../../assets/home/courseImage/courseMath.png")
        },
        {
            id: 1,
            type: "physics",
            name: "Vật Lý",
            img: require("../../../assets/home/courseImage/coursePhysics.png")
        },
        {
            id: 2,
            type: "translation",
            name: "Ngoại Ngữ",
            img: require("../../../assets/home/courseImage/courseTranslation.png")
        },
        {
            id: 3,
            type: "art",
            name: "Vẽ",
            img: require("../../../assets/home/courseImage/courseArt.png")
        },
        {
            id: 4,
            type: "cooking",
            name: "Nấu Ăn",
            img: require("../../../assets/home/courseImage/courseCooking.png")
        },
        {
            id: 5,
            type: "ballet",
            name: "Ba Lê",
            img: require("../../../assets/home/courseImage/courseBallet.png")
        },
        {
            id: 6,
            type: "coding",
            name: "Lập Trình",
            img: require("../../../assets/home/courseImage/courseCoding.png")
        },
    ]
}

export default function CourseScreen({ navigation }) {

    const [courseList, setCourseList] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [courseOption, setCourseOption] = useState([...courseOptionDefault])
    const [filterValue, setFilterValue] = useState({ type: undefined })
    const [filterVisible, setFilterVisible] = useState(false)
    const [dataLoading, setDataLoading] = useState(true)
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [rate, setRate] = useState(0)
    const [priceRange, setPriceRange] = useState(priceDefault)
    const scrollViewRef = useRef(null);
    const user = useSelector(userSelector);

    useEffect(() => {
        loadAllCourseData()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prevIndex) => (prevIndex + 1) % homeContentDetail.carousel.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({
            x: WIDTH * carouselIndex,
            animated: true,
        });
    }, [carouselIndex]);

    const loadAllCourseData = async () => {
        setDataLoading(true)
        const response = await getAllCourse()
        if (response?.status === 200) {
            setCourseList(response?.data)
        } else {
            console.log("load courseList fail");
        }
        setDataLoading(false)
    }

    const handleChangePrice = (value) => {
        setPriceRange({ min: value?.min, max: value?.max })
    }

    const handleSearch = (value) => {
        setSearchValue(value)
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
        setRate(0)
        setPriceRange(priceDefault)
    }

    const hanldeCoursePress = (course) => {
        navigation.navigate("CourseDetailScreen", { course: course })
    }

    const filterModal = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Học Phí</Text>
                <InputRange title={"Học Phí"} min={0} max={2000} minValue={priceRange.min} maxValue={priceRange.max} steps={10} onValueChange={handleChangePrice} />
                <Text style={styles.modalTitle}>Môn Học:</Text>
                <View style={styles.modalOption}>
                    {
                        courseOption.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.optionButton, item.choose && styles.choosed]}
                                    onPress={() => {
                                        setCourseOption((prevAgeOption) => {
                                            const updatedList = [...prevAgeOption];
                                            updatedList.map(item => item.choose = false)
                                            updatedList[index].choose = true;
                                            return updatedList;
                                        });
                                    }}
                                    key={index}
                                >
                                    <Text style={[styles.optionText, item.choose && styles.choosedText]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.modalTitle}>Đánh Giá:</Text>
                <StarChoose size={rate} setSize={setRate} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={{ ...styles.flexBetweenColumn, paddingHorizontal: 20 }}>
                        <View style={styles.headerInforLeft}>
                            <Text style={{ color: "white" }}>Xin chào!</Text>
                            <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>PH: {user.fullName}</Text>
                        </View>
                        <View style={styles.headerInforRight}>
                            <View style={styles.flexBetweenColumn}>
                                <TouchableOpacity style={styles.iconNavigate} onPress={() => navigation.push("CartScreen")}>
                                    <Icon name={"book"} color={"#ffffff"} size={28} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconNavigate}>
                                    <Icon name={"bell"} color={"#ffffff"} size={28} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.searchBar}>
                        <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} placeHolder={"Tìm kiếm khóa học..."} />
                    </View>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / WIDTH);
                            setCarouselIndex(newIndex);
                        }}
                    >
                        {
                            homeContentDetail.carousel.map((item, index) => {
                                return (
                                    <View style={styles.carouselView} key={index}>
                                        <Image source={item.img} style={styles.carouselImage} resizeMode="cover" />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.carouselDotView}>
                        {
                            homeContentDetail.carousel.map((item, index) => {
                                return (
                                    <View style={{ ...styles.carouselDot, backgroundColor: carouselIndex === index ? "#888888" : "#FFFFFF" }} key={index} />
                                )
                            })
                        }
                    </View>
                </View>
                <Text style={styles.title}>Khoá học:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        homeContentDetail.courseIcon.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.courseView}
                                    key={index}
                                    onPress={() => {
                                        if (item.type === filterValue.type) {
                                            setFilterValue({ ...filterValue, type: undefined })
                                        } else {
                                            setFilterValue({ ...filterValue, type: item.type })
                                        }
                                    }}
                                    activeOpacity={0.5}
                                >
                                    <View
                                        style={{
                                            ...styles.courseImageView,
                                            backgroundColor: item.type === filterValue.type ?
                                                "rgba(69, 130, 230, 0.7)"
                                                :
                                                "rgba(58, 166, 185, 0.25)"
                                        }}
                                    >
                                        <Image source={item.img} style={styles.courseImage} resizeMode="cover" />
                                    </View>
                                    <Text style={styles.courseName}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.filterOption}>
                    <TouchableOpacity style={[styles.filterOptionView, styles.newOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Mới nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.saleOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Giảm giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.registerOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Lượt đăng ký cao</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterOptionView, styles.priceOption]}>
                        <Text style={styles.filterOptionText} numberOfLines={1}>Giá</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...styles.courseListScroll,
                        marginBottom: !dataLoading ? 100 : "35%"
                    }}
                >
                    {
                        dataLoading ?
                            <SpinnerLoading />
                            :
                            courseList.map((item, index) => {
                                return (
                                    <CourseCard cardDetail={item} onClick={hanldeCoursePress} navigation={navigation} key={index} />
                                )
                            })
                    }
                </View>
            </ScrollView>
            <FilterCustomModal content={filterModal()} visible={filterVisible} onSubmit={hanldeSubmit} onCancle={hanldeCancle} onClear={hanldeClear} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1
        // paddingBottom: 80,
        // marginBottom: 15,
    },
    title: {
        marginVertical: 10,
        marginHorizontal: WIDTH * 0.05,
        color: "#4582E6",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center"
    },
    searchBar: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginTop: 20,
    },
    courseList: {
        flex: 1
    },
    courseListHead: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
    },
    flexBetweenColumn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    boldText: {
        fontWeight: "600",
    },

    modalContent: {
        width: WIDTH * 0.9,
        marginHorizontal: WIDTH * 0.05,
        marginBottom: 50,
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
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: "#D9D9D9",
    },
    optionText: {
        color: "#4582E6",
        fontWeight: "600"
    },
    choosed: {
        backgroundColor: "rgba(36, 20,  104, 0.6)",
    },
    choosedText: {
        color: "white"
    },

    header: {
        backgroundColor: "#241468",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerInforLeft: {
        marginTop: 10,
    },
    iconNavigate: {
        marginHorizontal: 10
    },
    carouselView: {
        width: WIDTH,
        paddingHorizontal: WIDTH * 0.05,
        marginTop: 25,
    },
    carouselImage: {
        width: WIDTH * 0.9,
        height: WIDTH * 0.55,
        borderRadius: 15,
    },
    carouselDotView: {
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    carouselDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: 4,
        marginVertical: 20,
    },
    courseView: {
        marginHorizontal: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    courseImageView: {
        padding: 10,
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "rgba(58, 166, 185, 0.25)",
    },
    courseImage: {
        width: 55,
        height: 55,
    },
    courseName: {
        marginVertical: 10,
        color: "#4582E6",
        fontWeight: "700",
    },

    filterOption: {
        flexDirection: "row"
    },
    filterOptionView: {
        flexDirection: "row",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#4582E6",
        borderLeftWidth: 0,
        justifyContent: "center"
    },
    filterOptionText: {
        fontSize: 12,
        textAlign: "center"
    },
    newOption: {
        width: "25%"
    },
    saleOption: {
        width: "25%"
    },
    registerOption: {
        width: "35%"
    },
    priceOption: {
        width: "15%"
    },
    courseListScroll: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});