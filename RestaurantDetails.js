import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Alert, TouchableOpacity, ImageBackground } from 'react-native';

// Loading Restaurant Logos Statically
const RESTAURANT_LOGOS = {
	logo1: require('./assets/resLogo1.jpg'),
	logo2: require('./assets/resLogo2.jpg'),
	logo3: require('./assets/resLogo3.jpg'),
}

// Restaurant Class
export default class SelectedRestaurant extends React.Component {
	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'Undefined');
        const score = navigation.getParam('score', '0.0');
		const otherParam = navigation.getParam('otherParam', 'default');
		
		return (
		<View style={{flex: 1}}>
			<ImageBackground source={require('./assets/dinnerpackage_large.jpg')} style={{flex: 3.5}}>
                <View style={{flex: 0.5, backgroundColor: '#00000040'}}>
                </View>
                
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#00000040'}}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='menu' color='white'/>
                    </View>
                    <View style={{flex: 9, alignItems: 'center'}}>
                        <Text style={{fontSize: 12, color: 'white'}}>Delivery</Text>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>350 Street Saint Mary Avenue</Text>
                    </View>
                </View>
                
                <View style={{flex: 2, flexDirection: 'row', backgroundColor: '#00000040'}}>
                    <View style={{flex: 6.2, marginLeft: 15}}>
                        <Text style={[styles.textWithShadow, styles.bigFont]}>{name}</Text>
                        <Text style={[styles.textWithShadow]}>Portage Ave.</Text>
                        <Text style={[styles.textWithShadow, styles.topPadding]}>35 - 55 Mins · $3.45 · More</Text>
                    </View>
                    <View style={{flex: 1.3, alignItems: 'center'}}>
                        <View style={styles.score}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{score}</Text>
                        </View>
                    </View>
                </View>
			</ImageBackground>
			
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#dddddd', elevation: 5}}>
                <View style={{marginLeft: 10}}>
					<Icon name='search' color='#888888'/>
				</View>
			</View>
			
			<View style={{flex: 10, backgroundColor: 'white'}}>
			</View>
		</View>
    );
	}
}

// Stylesheet
const styles = StyleSheet.create({
  score: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'red',
    width: 40,
    height: 30,
    borderColor: 'white',
    borderWidth: 2,
  },
  textWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  topPadding: {
    paddingTop: 10,
  },
  bigFont: {
    fontSize: 22,
  },
});