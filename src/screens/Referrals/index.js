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

export default function Referrals(props) {
	const [referralsStatus, setReferralsStatus] = useState([
		{ status: 'Paid Up', color: '#FF10D9' },
		{ status: 'Due', color: '#C20202' },
		{ status: 'Oustanding N$', color: '#2F8E44' },
		{ status: 'Blocked', color: '#000000' },
		{ status: 'No Record', color: '#FFFF00' },
	]);

	const [dataList, setdataList] = useState([]);

	const PageInit = async () => {
		fetch(API_URL + '/api/App/Referral/List', {
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
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles._tag_line}>REFERRALS</Text>

					<View style={styles._box}>
						<View style={styles.levelsHeader}>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								LEVEL
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '50%' }]}>
								MAXIMUM
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								REFERRALS
							</Text>
						</View>
						<View style={styles.line}></View>
						<View style={styles.levelsHeader}>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								Level 1
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '50%' }]}>
								NAD 300.00
							</Text>
							<Text
								style={[
									styles.levelsHeaderTxt,
									{ width: '25%', textAlign: 'center' },
								]}
							>
								1
							</Text>
						</View>
						<View style={styles.levelsHeader}>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								Level 2
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '50%' }]}>
								NAD 500.00
							</Text>
							<Text
								style={[
									styles.levelsHeaderTxt,
									{ width: '25%', textAlign: 'center' },
								]}
							>
								3
							</Text>
						</View>
						<View style={styles.levelsHeader}>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								Level 3
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '50%' }]}>
								NAD 1000.00
							</Text>
							<Text
								style={[
									styles.levelsHeaderTxt,
									{ width: '25%', textAlign: 'center' },
								]}
							>
								6
							</Text>
						</View>
						<View style={styles.levelsHeader}>
							<Text style={[styles.levelsHeaderTxt, { width: '25%' }]}>
								Level 4
							</Text>
							<Text style={[styles.levelsHeaderTxt, { width: '50%' }]}>
								NAD 2000.00
							</Text>
							<Text
								style={[
									styles.levelsHeaderTxt,
									{ width: '25%', textAlign: 'center' },
								]}
							>
								0
							</Text>
						</View>

						<View style={styles.line}></View>
						<View style={styles.referralsStatusSec}>
							{referralsStatus.map((val, i) => {
								return (
									<View style={styles.referralsStatus} key={i}>
										<Text style={styles.statusTxt}>{val.status}</Text>
										<View
											style={[
												{ width: 10, height: 10 },
												val.status === 'Paid Up' && {
													backgroundColor: '#2F8E44',
												},
												val.status === 'Oustanding N$' && {
													backgroundColor: '#C20202',
												},
												val.status === 'Due' && { backgroundColor: '#FF10D9' },
												val.status === 'Blocked' && {
													backgroundColor: '#000000',
												},
												val.status === 'No Record' && {
													backgroundColor: '#FFFF00',
												},
											]}
										></View>
									</View>
								);
							})}
						</View>
					</View>
					<View style={styles.referralsHeader}>
						<Text style={styles.hash}>#</Text>
						<Text style={styles.name}>NAME</Text>
						<Text style={styles.surname}>SURNAME</Text>
						<Text style={styles.status}>STATUS</Text>
					</View>
					{dataList.map((val, i) => {
						return (
							<View style={styles.referralsDetails} key={i}>
								<Text style={styles.nameNumber}>{i + 1}</Text>
								<Text style={styles.nameTxt}>{val.fullName}</Text>
								<Text style={styles.nameTxt}>{val.surName}</Text>
								<View
									style={{
										width: '30%',
										justifyContent: 'flex-end',
										alignItems: 'flex-end',
									}}
								>
									<View
										style={[
											{ width: 10, height: 10, marginRight: 15 },
											val.status === 'PU' && { backgroundColor: '#2F8E44' },
											val.status === 'OT' && { backgroundColor: '#C20202' },
											val.status === 'DU' && { backgroundColor: '#FF10D9' },
											val.status === 'BL' && { backgroundColor: '#000000' },
											val.status === 'NR' && { backgroundColor: '#FFFF00' },
										]}
									></View>
								</View>
							</View>
						);
					})}

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignSelf: 'center',
							alignItems: 'flex-end',
							marginTop: 20,
						}}
					>
						<TouchableOpacity
							style={styles.signup_btn}
							onPress={() =>
								props.navigation.navigate('ReferralsRules', {
									ReferralCode: props.route.params.ReferralCode,
								})
							}
						>
							<Text style={styles.signup_btn_txt}>RULES</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.back_btn}
							onPress={() => props.navigation.goBack()}
						>
							<Text style={styles.back_btn_txt}>BACK</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
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
		marginTop: 6,
	},
	signup_btn: {
		backgroundColor: '#110339',
		width: '30%',
		height: 30,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
	},
	signup_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},

	line: {
		height: 1,
		backgroundColor: 'gray',
		width: '100%',
		alignSelf: 'center',
		marginVertical: 3,
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
		backgroundColor: '#f5f5f5',
		width: '90%',
		borderWidth: 1,
		borderColor: '#000',
		marginTop: 10,
		alignSelf: 'center',
		elevation: 2,
		paddingHorizontal: '2%',
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
		fontSize: 11,
		width: '90%',
		marginTop: 10,
		alignSelf: 'center',
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '30%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		elevation: 10,
		borderRadius: 8,
		marginLeft: 20,
	},
	back_btn_txt: {
		color: '#fff',
		fontFamily: Fonts.InterBold,
		fontSize: 10,
	},
	ClientName: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '70%',
		alignSelf: 'center',
	},
	ClientNameTxt: {
		fontSize: 13,
		fontFamily: Fonts.InterRegular,
		color: '#000',
	},

	sendScreenShotBtn: {
		backgroundColor: '#42B85C',
		width: '85%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 31,
		elevation: 10,
		marginTop: 10,
	},
	sendScreenShotBtnTxt: {
		fontFamily: Fonts.InterBold,
		fontSize: 13,
		color: '#000',
	},
	numberTxt: {
		color: '#000',
		textAlign: 'center',
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		marginTop: 10,
	},
	accountDetailsSec: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	accountNameSec: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	accountNameLabel: {
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
	},
	accountName: {
		fontFamily: Fonts.InterBold,
		fontSize: 12,
		color: '#000',
		marginLeft: 5,
	},
	referralsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
	referralsDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
		paddingVertical: 6,
	},
	hash: {
		textAlign: 'center',
		fontSize: 12,
		fontFamily: Fonts.InterBold,
		width: '10%',
	},
	name: {
		fontSize: 12,
		fontFamily: Fonts.InterBold,
		color: '#000',
		width: '30%',
	},
	surname: {
		fontSize: 12,
		fontFamily: Fonts.InterBold,
		color: '#000',
		width: '30%',
	},
	status: {
		fontSize: 12,
		fontFamily: Fonts.InterBold,
		color: '#000',
		width: '30%',
		textAlign: 'right',
	},
	statusTxt: {
		fontSize: 10,
		fontFamily: Fonts.InterRegular,
		color: '#000',
		textAlign: 'center',
	},
	nameNumber: {
		textAlign: 'center',
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		width: '10%',
	},
	nameTxt: {
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		color: '#000',
		width: '30%',
	},
	referralsStatusSec: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	referralsStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '33%',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
	levelsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 4,
	},
	levelsHeaderTxt: {
		fontSize: 12,
		fontFamily: Fonts.InterRegular,
		color: '#000',
	},
});
