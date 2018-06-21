import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SelectedRestaurant from './RestaurantDetails';
import FoodInfo from './NutritionalInfo';

// Loading Restaurant Logos Statically
const RESTAURANT_LOGOS = {
	logo1: require('./assets/img/resLogo1.jpg'),
	logo2: require('./assets/img/resLogo2.jpg'),
	logo3: require('./assets/img/resLogo3.jpg'),
}

// Home Screen class
class HomeScreen extends React.Component {
	
	_onPressButton() {
		Alert.alert('You tapped the button!')
	}
  
  render() {
    return (
		<View style={{flex: 1}}>
			<View style={{flex: 0.5, backgroundColor: 'red'}}>
			</View>
			
			<View style={{flex: 1, backgroundColor: 'red', flexDirection: 'row'}}>
				<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Icon name='menu' color='white'/>
				</View>
				<View style={{flex: 9, alignItems: 'center'}}>
					<Text style={{fontSize: 12, color: 'white'}}>Delivery</Text>
					<Text style={{fontWeight: 'bold', color: 'white'}}>350 Street Saint Mary Avenue</Text>
				</View>
			</View>
			
			<TouchableWithoutFeedback onPress={this._onPressButton}>
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#dddddd'}}>
				<View style={{marginLeft: 10}}>
					<Icon name='search' color='#888888'/>
				</View>
				<Text style={{color: '#888888'}}>Search</Text>
			</View>
			</TouchableWithoutFeedback>
			
			<View style={{flex: 4, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center'}}>
				<Image
					style={{borderRadius: 3}}
					source={require('./assets/img/dinnerpackage_large.jpg')}/>
			</View>
			
			<View style={{flex: 8, backgroundColor: 'white'}}>
				<Restaurant navigation={this.props.navigation} name='Sogbu Restaurant' img='1' score='9.7'/>
				<Restaurant navigation={this.props.navigation} name='Melting Pot Bar & Grill' img='2' score='9.3'/>
				<Restaurant navigation={this.props.navigation} name='Premium Burger' img='3' score='9.6'/>
			</View>
		</View>
    );
  }
}

// Restaurant Component - Displayed on Home Screen
class Restaurant extends React.Component {
	
	getImage(num: number) {
		return RESTAURANT_LOGOS['logo' + num];
	}
	
	SelectRestaurant = () =>
	{
		this.props.navigation.navigate('RestaurantInfo', {
              name: this.props.name,
              score: this.props.score,
			  otherParam: 'anything you want here',
            });
	}
	
	render() {
		return (
			<TouchableOpacity onPress={this.SelectRestaurant} style={styles.restaurant}>
				<View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
					<Image
						style={styles.logo}
						source={this.getImage(this.props.img)}/>
				</View>
				<View style={{flex: 4.2, justifyContent: 'center', alignItems: 'flex-start'}}>
					<Text style={{paddingBottom: 10, fontWeight: 'bold'}}>{this.props.name}</Text>
					<Text style={{paddingBottom: 10}}>30 - 50 mins</Text>
					<Text style={{color: '#bbbbbb'}}>$3.45</Text>
				</View>
				<View style={{flex: 1.3, alignItems: 'center'}}>
					<View style={styles.score}>
						<Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{this.props.score}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

// Navigation Stack
export default createStackNavigator(
  {
    Home: HomeScreen,
	RestaurantInfo: SelectedRestaurant,
	FoodInfo: FoodInfo,
  },
  {
    initialRouteName: 'Home',
	headerMode: 'none',
  }
);

// Stylesheet
const styles = StyleSheet.create({
  restaurant: {
	flex: 1,
	flexDirection: 'row',
	borderBottomColor: '#dddddd',
	borderBottomWidth: 2
  },
  logo: {
	borderRadius: 10,
	borderWidth: 2,
	borderColor: '#000000',
	borderWidth: 2,
	width: 80,
	height: 80,
  },
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
});