import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
	Linking,
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

export default function LoanHistory({ navigation }) {
	const [dataList, setdataList] = useState([]);
	const [LoanDetails, onLoanDetails] = React.useState({});
	const PageInit = async () => {
		fetch(API_URL + '/api/App/LoanRequest/List', {
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
	

	const GetLastLoan = async () => {
		fetch(API_URL + '/api/App/LoanRequest/Last', {
			method: 'GET',
			headers: {
				Authorization: await SecureStore.getItemAsync('token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log("Last loan:", responseJson)
				onLoanDetails(responseJson);
			})
			.catch(error => {
				//alert(JSON.stringify(error));
				console.error(error);
			});
	};

	useEffect(() => {
		GetLastLoan();
		PageInit();
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<Text style={styles._tag_line}>LOAN HISTORY</Text>
				<View style={styles.line}></View>
				<View style={styles.loanHistoryTitleSec}>
					<Text style={styles.date}>DATE</Text>
					<Text style={styles.date}>LOAN ID</Text>
					<Text style={styles.date}>STATUS</Text>
					<Text style={styles.contract}>CONTRACT</Text>
				</View>
				<View style={styles.line}></View>
				<ScrollView>
					<View>
						{dataList.map((val, i) => {
							return (
								<View key={val.loanId} style={styles.loanHistoryTitleSec}>
									<Text style={styles.dateValueTxt}>{val.timeStamp}</Text>
									<Text style={styles.dateValueTxt}>{val.loanId}</Text>
									<Text style={styles.dateValueTxt}>{val.status}</Text>
									<TouchableOpacity
										style={styles.contract}
										onPress={() => {
											Linking.openURL(val.loanHref);
										}}
									>
										<Text style={styles.downloadTxt}>DOWNLOAD HERE</Text>
									</TouchableOpacity>
								</View>
							);
						})}
					</View>
				</ScrollView>
				<View style={styles.line}></View>
				<Text style={styles.trems_and_conditions}>
					Make a payment via the methods listed below then upload the proof of
					payment to our online agents by clicking here:
				</Text>

				<TouchableOpacity
					onPress={() => {
						Linking.openURL('https://wa.me//264857384666');
					}}
					style={styles.sendScreenShotBtn}
				>
					<Text style={styles.sendScreenShotBtnTxt}>
						SEND SCREENSHOT / PROOF OF PAYMENT
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate('PayViaPayPulseApp', { LoanData: LoanDetails });
						// props.navigation.navigate('PayViaPayPulseApp');
					}}
					style={styles.sendScreenShotBtn}
				>
					<Text style={styles.sendScreenShotBtnTxt}>PAY VIA PAYPULSE APP</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						Linking.openURL('https://www.referredby.com.na/repayments');
					}}
					style={styles.sendScreenShotBtn}
				>
					<Text style={styles.sendScreenShotBtnTxt}>
						SEE OTHER PAYMENT METHODS
					</Text>
				</TouchableOpacity>

				<View style={styles.accountDetailsSec}>
					<View style={styles.accountNameSec}>
						<Text style={styles.accountNameLabel}>Acc Name:</Text>
						<Text style={styles.accountName}>
							ReferredBy Financial Solutions cc
						</Text>
					</View>
					<Text style={styles.accountNameLabel}>
						Bank: Standard Bank of Namibia
					</Text>
					<Text style={styles.accountNameLabel}>Acc no: 6000 617 7688</Text>
					<Text style={styles.accountNameLabel}>Account type: Savings</Text>
					<Text style={styles.accountNameLabel}>Branch: Katutura Branch</Text>
					<Text style={styles.accountNameLabel}>Branch Code: 082 972</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						width: '70%',
						alignSelf: 'center',
						marginTop: 20,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
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
		paddingBottom: 10,
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
		width: '40%',
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
		marginVertical: 5,
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
		fontSize: 11,
		width: '90%',
		marginTop: 10,
		alignSelf: 'center',
		textAlign: 'center',
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '40%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		elevation: 10,
		borderRadius: 8,
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
	name: {
		fontSize: 14,
		fontFamily: Fonts.InterBold,
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
	loanHistoryTitleSec: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
	},
	date: {
		fontSize: 12,
		width: '23%',
		fontFamily: Fonts.InterRegular,
	},
	contract: {
		width: '30%',
		fontFamily: Fonts.InterRegular,
		fontSize: 12,
	},
	dateValueTxt: {
		fontSize: 10,
		width: '23%',
		fontFamily: Fonts.InterRegular,
		paddingVertical: 4,
	},
	downloadTxt: {
		color: '#1EA3CD',
		fontSize: 10,
		paddingVertical: 4,
		fontFamily: Fonts.InterRegular,
	},
});
