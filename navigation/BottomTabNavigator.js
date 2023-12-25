import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';

import HomeScreen from '../screens/HomeScreen';
import DocumentScreen from '../screens/DocumentScreen';
import ScanScreen from '../screens/ScanScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

import CourseScreen from '../screens/CourseScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ClassScreen from '../screens/ClassScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassRegisterScreen from '../screens/ClassRegisterScreen';
import ClassConfirmScreen from '../screens/ClassConfirmScreen';
import RegisterConfirmScreen from '../screens/RegisterConfirmScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import ChooseVoucherScreen from '../screens/ChooseVoucherScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import RegisterClassScreen from '../screens/RegisterClassScreen';
import MultiplePaymentScreen from '../screens/MultiplePaymentScreen';
import ClassStudyDetailScreen from '../screens/ClassStudyDetailScreen';
import ClassContentScreen from '../screens/ClassContentScreen';
import MutilpleChoiceScreen from '../screens/MutilpleChoiceScreen';

import WorkScheduleScreen from '../screens/teacher/WorkScheduleScreen';
import RateStudentScreen from '../screens/teacher/RateStudentScreen';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const activeColor = "#FFC90C"
    const inactiveColor = "#FFFFFF"
    const user = useSelector(userSelector);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabNavigator,
                tabBarInactiveTintColor: inactiveColor,
                tabBarActiveTintColor: activeColor,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={user?.role.name === 'LECTURER' ? HomeScreen : CourseScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Icon name={"home-minus"} color={focused ? activeColor : inactiveColor} size={28} />
                    },
                    tabBarLabel: 'Trang Chủ',
                }} />
            <Tab.Screen name="Document" component={user?.role.name === 'LECTURER' ? WorkScheduleScreen : DocumentScreen} options={{
                tabBarIcon: ({ focused }) => {
                    return <Icon name={"school"} color={focused ? activeColor : inactiveColor} size={28} />
                },
                tabBarLabel: user?.role.name === 'LECTURER' ? 'Lịch Làm Việc' : 'Học Viên',
            }} />
            <Tab.Screen name="Scan" component={ScanScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('./../assets/images/scan_active_icon.png') : require('./../assets/images/scan_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarLabel: 'Quét QR',
            }} />
            <Tab.Screen name="Schedule" component={user?.role.name === 'LECTURER' ? RateStudentScreen : ScheduleScreen} options={{
                tabBarIcon: ({ focused }) => {
                    return <Icon name={"calendar-month"} color={focused ? activeColor : inactiveColor} size={28} />
                },
                tabBarLabel: user?.role.name === 'LECTURER' ? 'Đánh Giá' : 'Lịch học',
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    return <Icon name={"account"} color={focused ? activeColor : inactiveColor} size={28} />
                },
                tabBarLabel: 'Tài Khoản',
            }} />
            {/* <Tab.Screen name="CourseScreen" component={CourseScreen} options={{ tabBarButton: () => null }} /> */}
            <Tab.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassScreen" component={ClassScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassDetailScreen" component={ClassDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassRegisterScreen" component={ClassRegisterScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassConfirmScreen" component={ClassConfirmScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="RegisterConfirmScreen" component={RegisterConfirmScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="PaymentScreen" component={PaymentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="CartScreen" component={CartScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ChooseVoucherScreen" component={ChooseVoucherScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="RegisterClassScreen" component={RegisterClassScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="MultiplePaymentScreen" component={MultiplePaymentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassStudyDetailScreen" component={ClassStudyDetailScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ClassContentScreen" component={ClassContentScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="MutilpleChoiceScreen" component={MutilpleChoiceScreen} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ tabBarButton: () => null }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
    tabNavigator: {
        paddingTop: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#241468'
    }
});

