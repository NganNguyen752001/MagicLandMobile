import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeUser } from '../../store/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from '../../components/header/Header';
import { userSelector } from '../../store/selector';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch()
  const user = useSelector(userSelector);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
      .then(dispatch(removeUser()))
  }

  const optionList = [
    {
      name: "Danh sách bé",
      icon: "",
      onClick: () => console.log("comming soon"),
    },
    {
      name: "Khóa học đăng ký",
      icon: "",
      onClick: () => console.log("comming soon"),
    },
    {
      name: "Khóa học quan tâm",
      icon: "",
      onClick: ()=>console.log("comming soon"),
    },
    {
      name: "Ví điện tử",
      icon: "",
      onClick: ()=>console.log("comming soon"),
    },
    {
      name: "Lịch sử giao dịch",
      icon: "",
      onClick: () => navigation.push("TransactionHistoryScreen"),
    },
    {
      name: "Quản lý tài khoản",
      icon: "",
      onClick: ()=>console.log("comming soon"),
    },
    {
      name: "Đăng xuất",
      icon: "",
      onClick: handleLogout,
    },
  ]

  return (
    <>
      <Header navigation={navigation} background={"#241468"} title={"Tài khoản"} goback={navigation.goBack} />
      <View style={styles.container}>
        <View style={styles.userDetail}>
          <View style={{ ...styles.flexColumnBetween, marginBottom: 10 }}>
            <Text style={styles.userName}>PH: {user.fullName}</Text>
          </View>
          <Text >Sđt: {user.phone}</Text>
        </View>
        <View style={styles.userOption}>
          <Text style={styles.boldText}>Tài khoản:</Text>
          {
            optionList.map((item, index) => (
              <TouchableOpacity
                style={{ ...styles.flexColumnBetween, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#D9D9D9" }}
                onPress={item.onClick}
                key={index}
              >
                <View style={styles.flexColumn}>
                  <Text style={styles.boldText}>
                    {item.name}
                  </Text>
                </View>
                <Icon name={"chevron-right"} color={"black"} size={30} />
              </TouchableOpacity>
            ))
          }


        </View>

      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userDetail: {
    width: WIDTH * 0.95,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#241468",
    marginHorizontal: WIDTH * 0.025,
    marginVertical: 20,
  },
  userName: {
    fontWeight: "900",
    color: "#241468",
    fontSize: 18
  },
  userOption: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    // marginVertical: 20,
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
})