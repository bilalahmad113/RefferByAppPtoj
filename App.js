// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainStack from './src/navigation';
import { ContextProvider } from './src/Components/contaxtt';

export default function App() {
	let [fontsLoaded] = useFonts({
		'Poppins-Bold': require('./assets/Poppins/Poppins-Bold.ttf'),
		'Poppins-Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
		'Poppins-ExtraLight': require('./assets/Poppins/Poppins-ExtraLight.ttf'),
		'Poppins-Medium': require('./assets/Poppins/Poppins-Medium.ttf'),
		'Poppins-SemiBold': require('./assets/Poppins/Poppins-SemiBold.ttf'),
		'Inter-Bold': require('./assets/Inter/Inter-Bold.ttf'),
		'Inter-Regular': require('./assets/Inter/Inter-Regular.ttf'),
		'Inter-ExtraLight': require('./assets/Inter/Inter-ExtraLight.ttf'),
		'Inter-Medium': require('./assets/Inter/Inter-Medium.ttf'),
		'Inter-SemiBold': require('./assets/Inter/Inter-SemiBold.ttf'),
		'OpenSans-Bold': require('./assets/Open_Sans/OpenSans-Bold.ttf'),
		'OpenSans-Regular': require('./assets/Open_Sans/OpenSans-Regular.ttf'),
		'OpenSans-Medium': require('./assets/Open_Sans/OpenSans-Medium.ttf'),
	});

	if (!fontsLoaded) {
		// return <AppLoading />;
		console.log("notfontsLoaded")
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar
					translucent={false}
					barStyle="light-content"
					backgroundColor="#0F393B"
				/>
				<ContextProvider>
				<MainStack />
				</ContextProvider>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

