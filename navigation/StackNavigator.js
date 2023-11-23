import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
import CourseScreen from '../screens/CourseScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ClassScreen from '../screens/ClassScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassRegisterScreen from '../screens/ClassRegisterScreen';
import ClassConfirmScreen from '../screens/ClassConfirmScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        //Screen màn hình chính
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="CourseScreen" component={CourseScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ClassScreen" component={ClassScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ClassRegisterScreen" component={ClassRegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ClassConfirmScreen" component={ClassConfirmScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default StackNavigator;