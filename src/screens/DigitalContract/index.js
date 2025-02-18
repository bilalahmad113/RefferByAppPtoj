import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

// import { WithLocalSvg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import Fonts from '../../config/Fonts';

export default function DigitalContract(props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.body}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 5 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles._tag_line}>Loan Terms</Text>
					<View style={styles.logo}>
						<WithLocalSvg asset={require('../../../assets/emtylogo.svg')} />
					</View>
					<View style={styles.ClientName}>
						<Text style={styles.ClientNameTxt}>CLIENT NAME</Text>
						<Text style={styles.name}>: {props.route.params.FullName}</Text>
					</View>
					<View style={styles.ClientName}>
						<Text style={styles.ClientNameTxt}>CLIENT SURNAME</Text>
						<Text style={styles.name}>: {props.route.params.SurName}</Text>
					</View>
					<View style={styles.ClientName}>
						<Text style={styles.ClientNameTxt}>CLIENT ID #</Text>
						<Text style={styles.name}>: {props.route.params.IdNumber}</Text>
					</View>
					<View style={styles.ClientName}>
						<Text style={styles.ClientNameTxt}>LOAN ID</Text>
						<Text style={styles.name}>: {props.route.params.UserUID}/001</Text>
					</View>
					<View style={styles.ClientName}>
						<Text style={styles.ClientNameTxt}>LOAN DATE</Text>
						<Text style={styles.name}>: {props.route.params.LoanDate}</Text>
					</View>
					<View style={styles._box}>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Loan Amount (NAD)</Text>
							<Text style={styles.box_first_line_txt}>
								{props.route.params.Amount}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Interest (%)</Text>
							<Text style={styles.box_first_line_txt}>
								% {props.route.params.InterestPer}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Interest (NAD)</Text>
							<Text style={styles.box_first_line_txt}>
								{(props.route.params.Amount * props.route.params.InterestPer) /
									100}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>
								Total Repayable ( NAD )
							</Text>
							<Text style={styles.box_first_line_value}>
								{(props.route.params.Amount * props.route.params.InterestPer) /
									100 +
									parseFloat(props.route.params.Amount)}
							</Text>
						</View>
						<View style={styles.line}></View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Due Date :</Text>
							<Text style={styles.box_first_line_value}>
								{props.route.params.DueDate}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Outstanding Date :</Text>
							<Text style={styles.box_first_line_txt}>
								{props.route.params.OutstandingDate}
							</Text>
						</View>
						<View style={styles.box_first_line}>
							<Text style={styles.box_first_line_txt}>Block Date :</Text>
							<Text style={styles.box_first_line_txt}>
								{props.route.params.BlockDate}
							</Text>
						</View>
					</View>
					<Text style={styles.trems_and_conditions}>
						I have read and understood the above digital contract and
						acknowledge that i will be indebted to Referredby Financial
						Solutions cc for the said amount and that i am liable to pay it back
						on or before the due date.
					</Text>
					<Text style={styles.trems_and_conditions}>
						All payments shall be made to the accounts and via the methods
						available at the STATEMENT section of the app.
					</Text>
					<View style={styles.line}></View>
				</ScrollView>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '90%',
						alignSelf: 'center',
						alignItems: 'flex-end',
						paddingVertical: 10,
					}}
				>
					<TouchableOpacity
						style={styles.signup_btn}
						onPress={() => props.navigation.goBack()}
					>
						<Text style={styles.signup_btn_txt}>ACCEPT</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.back_btn}
						onPress={() => props.navigation.navigate('VerifiedProfile')}
					>
						<Text style={styles.back_btn_txt}>DECLINE</Text>
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
		marginTop: 6,
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
		textAlign: 'center',
		width: '90%',
		alignSelf: 'center',
		marginTop: 10,
	},
	back_btn: {
		backgroundColor: '#C20202',
		width: '35%',
		alignSelf: 'center',
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
	ClientName: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center',
		marginVertical: 2,
	},
	ClientNameTxt: {
		fontSize: 13,
		fontFamily: Fonts.InterRegular,
		color: '#000',
		width: '40%',
	},
	name: {
		fontSize: 13,
		fontFamily: Fonts.InterMedium,
		color: '#000',
		width: '60%',
		textAlign: 'left',
	},
});
