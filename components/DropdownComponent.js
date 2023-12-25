import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const DropdownComponent = ({ dropdownStyle, studentList, rightIcon, onChoose, placeHolder, labelField, valueField }) => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.fullName}</Text>
                {/* {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )} */}
            </View>
        );
    };

    const hanldeChoose = (item) => {
        onChoose(item)
        setValue(item.value);
    }

    return (
        <Dropdown
            style={dropdownStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={studentList}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeHolder}
            value={value}
            onChange={item => {
                hanldeChoose(item)
            }}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderRightIcon={rightIcon}

            renderItem={renderItem}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    textItem: {
        flex: 1,
        color: "black",
        fontSize: 10,
    },
    placeholderStyle: {
        fontSize: 10,
    },
    selectedTextStyle: {
        fontSize: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 10,
    },
});