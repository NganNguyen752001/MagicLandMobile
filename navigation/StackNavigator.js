import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator'
import CourseScreen from '../screens/CourseScreen';

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
        </Stack.Navigator>
    )
}
export default StackNavigator;