import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import StudentView from '../components/StudentView';
import PersonalClassCard from '../components/PersonalClassCard';
import ClassCard from '../components/ClassCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const studentListDefault = [
  {
    id: 0,
    name: "Lê Bảo Ngọc",
    age: "10",
    dob: "2-2-2002",
    check: true,
    classList: [
      {
        id: 0,
        status: true,
        type: "start",
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
        id: 3,
        status: true,
        type: "start",
        title: "Lớp Toán Tư Duy 2",
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
        type: "going",
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
        id: 4,
        status: false,
        type: "going",
        title: "Lớp Toán Tư Duy 52",
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
        type: "complete",
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
        id: 5,
        status: false,
        type: "complete",
        title: "Lớp Toán Tư Duy 32",
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
  },
  {
    id: 1,
    name: "Trần Hữu Nghĩa",
    age: "11",
    dob: "2-2-2003",
    check: false,
    classList: [
      {
        id: 0,
        status: true,
        type: "start",
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
        id: 3,
        status: true,
        type: "start",
        title: "Lớp Toán Tư Duy 1123",
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
        type: "complete",
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
        id: 4,
        status: false,
        type: "complete",
        title: "Lớp Toán Tư Duy 33",
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
        type: "going",
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
        id: 5,
        status: false,
        type: "going",
        title: "Lớp Toán Tư Duy 232",
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
  },
]

export default function DocumentScreen({ navigation }) {

  const [studentList, setStudentList] = useState(studentListDefault)
  const [type, setType] = useState("start")

  const selectStudent = (id) => {
    const index = studentList.findIndex(obj => obj.id === id);
    const updateArray = [...studentListDefault]
    const defaultStatus = updateArray[index].check
    updateArray.forEach(item => item.check = false)
    updateArray[index].check = !defaultStatus;
    // console.log(updateArray);
    setStudentList(updateArray)
  }

  const handleClassNavigate = (classDetail) => {
    navigation.push("ClassDetailScreen", { classDetail: classDetail })
  }

  const getClassList = () => {
    const updateArray = studentList.filter(item => item.check === true)
    return updateArray[0].classList
  }

  const filterClassList = (array) => {
    const updateArray = array.filter(item => item.type === type)
    return updateArray
  }

  const renderClassCard = (type, item, index) => {
    switch (type) {
      case "start":
        return (
          <ClassCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#C8A9F1"} key={index} />
        )
      case "going":
        return (
          <ClassCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#FACE9B"} key={index} />
        )

      case "complete":
        return (
          <ClassCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} background={"#BFE3C6"} key={index} />
        )

      default:
        return (
          <ClassCard cardDetail={item} check={false} index={index} onClick={() => handleClassNavigate(item)} key={index} />
        )
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Danh sách các cháu:</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.studentList}>
        {
          studentList?.map((item, index) => {
            return (
              <StudentView student={item} index={index} key={index} onClick={selectStudent} />
            )
          })
        }
        <View style={styles.studentView}>
          <View style={styles.studentImage}>
            <Icon name={"account-plus"} color={"#5A5A5A"} size={50} />
          </View>
          <View style={styles.studentNameView}>
            <Text style={styles.studentName}>
              Thêm Bé
            </Text>
          </View>
        </View >
      </ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>Các khóa học đã đăng ký:</Text>
      </View>
      <View style={styles.classList}>
        <View style={{ ...styles.flexColumnAround, position: "relative" }}>
          {/* <View style={{ ...styles.buttonBorder }}>

          </View> */}
          <TouchableOpacity
            onPress={() => setType("start")}
            style={{ ...styles.typeButton, backgroundColor: "#C8A9F1" }}
          >
            <Text style={{ ...styles.typeText, color: "#250056" }}>
              Sắp bắt đầu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType("going")}
            style={{ ...styles.typeButton, backgroundColor: "#FACE9B" }}
          >
            <Text style={{ ...styles.typeText, color: "#9A5E03" }}>
              Đang Học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType("complete")}
            style={{ ...styles.typeButton, backgroundColor: "#BFE3C6" }}
          >
            <Text style={{ ...styles.typeText, color: "#286A2F" }}>
              Hoàn Thành
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.classItemList,
            borderColor: type === "start" ?
              "#C8A9F1"
              :
              type === "going" ?
                "#FACE9B"
                :
                "#BFE3C6"
          }}
        >
          {
            filterClassList(getClassList()).map((item, index) => {
              return (
                renderClassCard(type, item, index)
              )
            })
          }
        </View>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Các sự kiện đã tham gia:</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  studentList: {
    padding: 20,
    paddingLeft: 20
  },
  studentView: {
    // width: WIDTH * 0.7,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  studentImage: {
    position: "relative",
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#888888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  studentCheck: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 2,
    borderRadius: 50,
    backgroundColor: "",
  },
  studentNameView: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: "#C4C4C4"
  },
  studentName: {
    fontWeight: "600",
    fontSize: 12,
    color: "#888888"
  },
  classList: {
    paddingHorizontal: WIDTH * 0.03,
  },
  typeButton: {
    width: "30%",
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  buttonBorder: {
    position: "absolute",
    width: "32%",
    height: "150%",
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: "white",
    transform: [{ translateX: -10 }]
  },
  typeText: {
    textAlign: "center",
  },
  classItemList: {
    padding: 10,
    // paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderTopWidth: 0,
  },

  flexColumnAround: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
  },
  flexColumnBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  }
});