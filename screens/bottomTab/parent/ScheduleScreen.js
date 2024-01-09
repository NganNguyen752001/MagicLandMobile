import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StudentView from '../../../components/StudentView';
import { CalendarProvider, Calendar, WeekCalendar, Agenda } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selector';
import Header from '../../../components/header/Header';

const studentListDefault = [
  {
    id: 0,
    fullName: "Lê Bảo Ngọc",
    age: "10",
    dob: "2-2-2002",
    check: true,
    dateList: [
      {
        date: "2024-01-13T00:00:00",
        classList: [
          {
            title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
            time: "10:00-13:00",
            room: "110",
          },
        ]
      },
      {
        date: "2024-01-14T00:00:00",
        classList: [
          {
            title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
            time: "10:00-13:00",
            room: "110",
          },
          {
            title: "Hát cùng cô giáo nhỏ",
            time: "10:00-13:00",
            room: "110",
          },
          {
            title: "Toán Tư Duy",
            time: "10:00-13:00",
            room: "110",
          },
        ]
      },

    ]
  },
  {
    id: 1,
    fullName: "Trần Hữu Nghĩa",
    age: "11",
    dob: "2-2-2003",
    check: false,
    dateList: [
      {
        date: "2024-01-14T00:00:00",
        classList: [
          {
            title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
            time: "10:00-13:00",
            room: "110",
          },
        ]
      },
      {
        date: "2024-01-15T00:00:00",
        classList: [
          {
            title: "Khóa Học Vẽ Cho Trẻ Mới Bắt Đầu",
            time: "10:00-13:00",
            room: "110",
          },
          {
            title: "Hát cùng cô giáo nhỏ",
            time: "10:00-13:00",
            room: "110",
          },
          {
            title: "Toán Tư Duy",
            time: "10:00-13:00",
            room: "110",
          },
        ]
      },

    ]
  },
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ScheduleScreen({ navigation }) {

  const [studentList, setStudentList] = useState(studentListDefault)
  const [dateSelected, setDateSelected] = useState(new Date);
  const [calendarType, setCalendarType] = useState("month")

  const user = useSelector(userSelector);

  // useEffect(() => {
  //   loadStudentData()
  // }, [])

  // const loadStudentData = async () => {
  //   setStudentList(user?.students)
  // }

  const handleClassNavigate = (classDetail) => {
    navigation.push("ClassStudyDetailScreen", { classDetail: classDetail })
  }

  const hanldeAddStudent = () => {
    navigation.push("AddStudent")
  }

  const selectStudent = (id) => {
    const index = studentList.findIndex(obj => obj.id === id);
    const updateArray = [...studentListDefault]
    const defaultStatus = updateArray[index].check
    updateArray.forEach(item => item.check = false)
    updateArray[index].check = !defaultStatus;
    // console.log(updateArray);
    setStudentList(updateArray)
  }

  const getCurrentDate = (date) => {
    const selectedStudent = studentList.find((student) =>
      student.check === true
    );
    const currentDate = selectedStudent?.dateList.filter(item => item.date.substring(0, 10) === date?.dateString)
    return currentDate
  }

  const selectedDate = (date) => {
    setDateSelected(date)
    setCalendarType("day")
  }

  const renderCustomDay = ({ date }) => {

    const currentDate = getCurrentDate(date)

    return (
      <TouchableOpacity style={[styles.customDate, dateSelected === date.dateString && styles.selectedDate]} onPress={() => { selectedDate(date.dateString) }}>
        <Text style={{ ...styles.boldText }}>{date.day}</Text>
        {
          currentDate && currentDate[0]?.classList?.map((item, index) => {
            return (
              <View
                style={{
                  ...styles.scheduleItem,
                  backgroundColor: index === 0 ?
                    "#FF95CE80" :
                    index === 1 ?
                      "#52ACFF80"
                      :
                      "#92C88D80"
                }}
                key={index}
              >
                <Text
                  style={{
                    ...styles.scheduleText,
                    fontSize: 10,
                    color: index === 0 ?
                      "#F52798" :
                      index === 1 ?
                        "#4582E6"
                        :
                        "#15CA00"
                  }}
                  numberOfLines={1}>{item.title}</Text>
              </View>
            )
          })
        }
      </TouchableOpacity>
    );
  };

  function formatScheduleDate(inputDate) {
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const months = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];

    const date = new Date(inputDate);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ngày ${dayOfMonth} ${month} năm ${year}`;
  }

  return (
    <>
      <Header navigation={navigation} background={"#241468"} title={"Lịch Học"} goback={navigation.goBack} />
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
            <TouchableOpacity style={styles.studentImage} onPress={hanldeAddStudent}>
              <Icon name={"account-plus"} color={"#5A5A5A"} size={50} />
            </TouchableOpacity>
            <View style={styles.studentNameView}>
              <Text style={styles.studentName}>
                Thêm Bé
              </Text>
            </View>
          </View >
        </ScrollView>
        <View style={styles.titleView}>
          <Text style={styles.title}>Lịch học:</Text>
        </View>
        <View style={styles.calendarView}>
          <View style={{ ...styles.flexColumnBetween, marginVertical: 20 }}>
            <Text style={{ ...styles.boldText, fontSize: 10 }}>{formatScheduleDate(dateSelected)}</Text>
            <View style={{ ...styles.flexColumn, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
              <TouchableOpacity style={{ ...styles.changeTypeButton, backgroundColor: calendarType === "month" ? "#241468" : "white" }} onPress={() => { setCalendarType("month") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "month" ? "white" : "#888888" }}>Tháng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.changeTypeButton, backgroundColor: calendarType === "week" ? "#241468" : "white" }} onPress={() => { setCalendarType("week") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "week" ? "white" : "#888888" }}>Tuần</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.changeTypeButton, borderRightWidth: 0, backgroundColor: calendarType === "day" ? "#241468" : "white" }} onPress={() => { setCalendarType("day") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "day" ? "white" : "#888888" }}>Ngày</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            calendarType === "month" ?
              <>
                <Calendar
                  onDayPress={(day) => {
                    setDateSelected(day.dateString);
                  }}
                  dayComponent={renderCustomDay}
                />
                <View style={styles.noteView}>
                  <View style={{ ...styles.noteHaft, backgroundColor: "#F6F2E5" }}>
                    <Text style={styles.noteTitle}>Ngày nghỉ</Text>
                    <View style={styles.flexColumn}>
                      <Text style={{ ...styles.boldText, color: "#EAB756", marginRight: 10 }}>1/1</Text>
                      <Text >Tết Tây</Text>
                    </View>
                  </View>
                  <View style={{ ...styles.noteHaft, backgroundColor: "#F4F4F4" }}>
                    <Text style={styles.noteTitle}>Chú thích</Text>
                    <View style={styles.flexColumn}>
                      <View style={{ ...styles.exampleView, backgroundColor: "#52ACFF80" }} />
                      <Text >Sáng</Text>
                    </View>
                    <View style={styles.flexColumn}>
                      <View style={{ ...styles.exampleView, backgroundColor: "#FF95CE80" }} />
                      <Text >Chiều</Text>
                    </View>
                    <View style={styles.flexColumn}>
                      <View style={{ ...styles.exampleView, backgroundColor: "#92C88D80" }} />
                      <Text >Tối</Text>
                    </View>
                  </View>
                </View>
              </>

              : calendarType === "week" ?

                <CalendarProvider date={dateSelected ? dateSelected : new Date}>
                  <WeekCalendar
                    onDayPress={(day) => {
                      setDateSelected(day.dateString);
                    }}
                    current={dateSelected}
                    scrollEnabled={false}
                    dayComponent={renderCustomDay}

                    // markingType="period"
                    markedDates={{
                      [dateSelected]: {
                        startingDay: true,
                        endingDay: true,
                        color: "#3AA6B9",
                      },
                    }}
                    calendarHeight={150}
                  />
                </CalendarProvider>

                :
                ""
          }

          {
            calendarType === "day" &&
            getCurrentDate({ dateString: dateSelected })[0]?.classList?.map((item, key) => {
              return (
                <TouchableOpacity
                  onPress={() => handleClassNavigate(item)}
                  style={{ ...styles.classWeekCard, ...styles.flexColumnBetween, alignItems: "flex-start" }}
                  key={key}
                >

                  <Text style={{ ...styles.boldText, width: "30%", color: "#241468" }}>{item.time}</Text>
                  <View style={{ width: "50%" }}>
                    <Text style={{ ...styles.boldText, color: "#241468" }}>{item.title}</Text>
                    <Text style={{ ...styles.boldText, color: "#3C87FF" }}>Phòng {item.room}</Text>
                  </View>
                  <View style={{ ...styles.flexColumn, width: "20%" }}>
                    <View style={{ ...styles.statusCircle, backgroundColor: item?.method === "ONLINE" ? "#3AAC45" : "#888888" }} />
                    {
                      item?.method === "ONLINE" ?
                        <Text style={styles.cardDetailText}>Online</Text>
                        :
                        <Text style={styles.cardDetailText}>Offline</Text>
                    }
                  </View>
                </TouchableOpacity>
              )
            })
          }

        </View>

      </ScrollView>
    </>

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
    borderRadius: 150,
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
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginRight: 2,
  },
  classColumn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  classTitle: {
    color: "#DA5742",
    fontWeight: "700",
    fontSize: 16,
  },
  classRoom: {
    color: "#8F9BB3"
  },
  circle: {
    padding: 3,
    borderWidth: 4,
    borderColor: "#0095FF",
    borderRadius: 50,
    marginRight: 10,
  },

  flexColumnBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexColumn: {
    flexDirection: "row",
    alignItems: "center"
  },
  boldText: {
    fontWeight: "600"
  },

  calendarView: {
    width: WIDTH * 0.95,
    padding: 5,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 15,
    marginHorizontal: WIDTH * 0.025
  },
  changeTypeButton: {
    padding: 10,
    borderRightWidth: 1
  },
  customDate: {
    width: "95%",
    height: HEIGHT * 0.09,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C2C2C2"
  },
  selectedDate: {
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  scheduleItem: {
    backgroundColor: "#FF95CE80",
    paddingHorizontal: 1,
    borderRadius: 5,
    marginBottom: 3,
  },
  scheduleText: {
    color: "#F52798",
    fontWeight: "600"
  },
  classWeekCard: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFCAE7",
    marginVertical: 5,
  },
  noteView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  noteHaft: {
    width: "49%",
    height: "100%",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  exampleView: {
    width: "8%",
    height: 10,
    borderRadius: 15,
    marginRight: 10
  }

});
