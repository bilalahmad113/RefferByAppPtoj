import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { API_URL } from '../../config/api-config';
import Fonts from '../../config/Fonts';
export default function Notifications({ navigation }) {
	const [dataList, setdataList] = useState([]);

	const PageInit = async () => {
		fetch(API_URL + '/api/App/Message/List', {
			method: 'GET',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				setdataList(responseJson);
			})
			.catch(error => {
				alert(JSON.stringify(error));
				console.error(error);
			});
	};

	useEffect(() => {
		PageInit();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 5 }}
					showsVerticalScrollIndicator={false}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
						}}
					>
						<TouchableOpacity>
							<Ionicons name="notifications" size={24} color="#C20202" />
						</TouchableOpacity>
						<Text style={styles._tag_line}>NOTIFICATIONS</Text>
					</View>

					{dataList.map((val, i) => {
						return (
							<View
								style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}
							>
								<Text style={styles.inActivedateTxt}> {val.timeStamp}</Text>
								<Text style={styles.trems_and_conditions}>
									{val.notificationText}
								</Text>
							</View>
						);
					})}

					<View style={styles.line}></View>
				</ScrollView>
				<View
					style={{
						justifyContent: 'space-between',
						width: '90%',
						alignSelf: 'center',
						paddingVertical: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<TouchableOpacity>
						<Text style={styles.unreadTxt}>0 unread notification</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.back_btn}
						onPress={() => navigation.goBack()}
					>
						<Text style={styles.back_btn_txt}>BACK</Text>
					</TouchableOpacity>
				</View>
			</View>

			<StatusBar
				translucent={false}
				barStyle="light-content"
				backgroundColor="#0F393B"
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerImage: {
		width: '100%',
		height: 100,
	},
	body: {
		flex: 1,
	},
	_tag_line: {
		fontFamily: Fonts.OpenSansBold,
		color: '#000000',
		textAlign: 'center',
		fontSize: 28,
		marginLeft: 20,
	},
	signup_btn: {
		backgroundColor: '#42B85C',
		width: '40%',
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
	},
	_input_view: {
		flexDirection: 'row',
		backgroundColor: '#E5E5E5',
		width: '90%',
		height: 45,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		paddingHorizontal: 5,
		alignSelf: 'center',
		elevation: 10,
	},
	line: {
		height: 1,
		backgroundColor: 'gray',
		width: '90%',
		alignSelf: 'center',
		marginVertical: 10,
	},
	referral_txt: {
		fontSize: 12,
		textAlign: 'center',
		fontFamily: Fonts.InterBold,
	},
	_input: {
		flex: 1,
		marginLeft: 10,
		fontFamily: Fonts.PoppinsRegular,
	},

	_min_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		textAlign: 'center',
		marginTop: 10,
	},
	_box: {
		backgroundColor: '#E5E5E5',
		width: '90%',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		alignSelf: 'center',
		elevation: 2,
		paddingHorizontal: '5%',
	},
	box_first_line: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5,
	},
	box_first_line_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
	},
	box_first_line_value: {
		fontFamily: Fonts.InterBold,
		fontSize: 12,
		color: '#000',
	},
	_read_sec: {
		width: '90%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	trems_and_cond_sec: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	readTxt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#000',
	},
	trems_and_cond_txt: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
		color: '#1d8bf7',
	},
	trems_and_conditions_sec: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		marginTop: 10,
	},
	trems_and_conditions: {
		fontFamily: Fonts.InterRegular,
		fontSize: 13,
		marginTop: 5,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 26,
		elevation: 10,
		borderRadius: 8,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},
	notificationBox: {
		backgroundColor: '#73F3DC',
		width: '90%',
		alignSelf: 'center',
		elevation: 10,
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	dateTxt: {
		color: '#000',
		fontFamily: Fonts.InterBold,
		borderBottomWidth: 1,
		width: 120,
	},
	inActivedateTxt: {
		color: '#000',
		fontFamily: Fonts.InterBold,
		borderBottomWidth: 1,
		width: 150,
	},
	notificationTxt: {
		color: '#000',
		fontFamily: Fonts.InterSemiBold,
		fontSize: 13,
		marginTop: 10,
	},
	unreadTxt: {
		color: '#000',
		fontFamily: Fonts.InterBold,
		fontSize: 12,
		marginBottom: 10,
	},
});
