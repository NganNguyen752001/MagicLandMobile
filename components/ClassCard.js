import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from '../util/util';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorList = [
    "#FCA7D2",
    "#9DD6A3",
    "#5CBDF4",
    "#DE9E71"
]

export default function ClassCard({ cardDetail, check, index, onClick, background }) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => { onClick(cardDetail.id) }}>
            {
                check &&
                <>
                    <View style={styles.checkBoxLine} />
                    <View style={styles.checkBox}>
                        {
                            cardDetail.choose &&
                            <Icon name={"check"} color={"#42AEF4"} size={16} />
                        }
                    </View>
                </>
            }
            <View
                style={{
                    ...styles.card,
                    backgroundColor: index % 2 === 1 ?
                        "white"
                        :
                        background ?
                            background
                            :
                            "#C2D9FF",
                    borderColor: background ?
                        background
                        :
                        "#C2D9FF",
                    borderWidth: index % 2 === 1 ? 1 : 0
                }}>
                <View style={styles.flexColumnBetween}>
                    <Text style={styles.cardName}>{cardDetail.name ? cardDetail.name : "Toán cấp 1"}</Text>

                </View>

                <View style={{ ...styles.flexColumn, marginTop: 5 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <View style={{ ...styles.flexColumn, marginLeft: 0 }}>
                            <View style={{ ...styles.statusCircle, backgroundColor: cardDetail?.method === "ONLINE" ? "#3AAC45" : "#888888" }} />
                            {
                                cardDetail?.method === "ONLINE" ?
                                    <Text style={styles.cardDetailText}>Online</Text>
                                    :
                                    <Text style={styles.cardDetailText}>Offline</Text>
                            }
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"notebook-multiple"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail?.schedules ? cardDetail?.schedules?.length : 0} buổi</Text>
                    </View>
                </View>

                <View style={{ ...styles.flexColumn, marginTop: 5 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <Icon name={"account-multiple"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail.limitNumberStudent ? cardDetail.limitNumberStudent : 0} Học Viên</Text>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"account"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail?.lecture?.fullName ? cardDetail?.lecture?.fullName : "Chưa có GV"}</Text>
                    </View>
                </View>

                <View style={{ ...styles.flexColumn, marginTop: 10 }}>
                    <View style={{ ...styles.flexColumn, width: "50%", marginRight: "5%" }}>
                        <Icon name={"calendar-check"} color={"#241468"} size={18} />
                        <View>
                            <Text style={styles.cardDetailText}>Khai giảng ngày: {cardDetail?.startDate ? formatDate(cardDetail?.startDate) : 0}</Text>
                            <Text style={styles.cardDetailText}>Lịch học: 3 - 5 - 7 (17:00 - 18:30)</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.flexColumn, width: "35%" }}>
                        <Icon name={"map-marker-radius"} color={"#241468"} size={18} />
                        <Text style={styles.cardDetailText}>{cardDetail?.lecture?.address ? cardDetail?.lecture?.address : "Chưa có địa chỉ"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 80,
        position: "relative",
        flexDirection: "row",
        marginBottom: 10,
    },
    checkBoxLine: {
        position: "absolute",
        height: "100%",
        width: 1,
        backgroundColor: "#42AEF4",
        left: 10,
        top: 10,
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#42AEF4",
        borderRadius: 3,
        backgroundColor: "white"
    },
    card: {
        minWidth: WIDTH * 0.8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    cardName: {
        color: "#241468",
        fontWeight: "700",
        fontSize: 18,
    },
    statusCircle: {
        width: 12,
        height: 12,
        borderRadius: 50,
        marginRight: 2,
    },
    cardDetailText: {
        color: "#241468",
        fontSize: 12,
        marginLeft: 3
    },
    flexColumn: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
    },
    flexColumnBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});