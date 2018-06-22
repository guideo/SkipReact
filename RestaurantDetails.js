import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FoodInfo from './NutritionalInfo';

// Loading Restaurant Logos Statically
const RESTAURANT_DATA = {
	'Sogbu Restaurant': require('./assets/json/Sogbu Restaurant.json'),
	'Melting Pot Bar & Grill': require('./assets/json/Melting Pot.json'),
	'Premium Burger': require('./assets/json/Premium Burger.json'),
}

// Restaurant Class
class SelectedRestaurant extends React.Component {
    
    getData(name: string) {
		return RESTAURANT_DATA[name];
	}
    
	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'Undefined');
        const score = navigation.getParam('score', '0.0');
		const otherParam = navigation.getParam('otherParam', 'default');
        const data = this.getData(name);
        
        var scrollView = [];
        var keyHolder;
        for(let i = 0; i < data.restaurantInfo.foodSection.length; i++){
            keyHolder = i.toString();
            scrollView.push(<FoodHeader key={keyHolder} name={data.restaurantInfo.foodSection[i].sectionName}/>)
            for(let j=0; j<data.restaurantInfo.foodSection[i].foods.length; j++){
                keyHolder = i.toString() + '-' + j.toString();
                //scrollView.push(<Food key={keyHolder} navi={navigation} name={data.restaurantInfo.foodSection[i].foods[j].name} ingredients={data.restaurantInfo.foodSection[i].foods[j].ingredients}/>)
				scrollView.push(<Food key={keyHolder} navi={navigation} food={data.restaurantInfo.foodSection[i].foods[j]}/>)
            }
        }
		
		return (
		<View style={{flex: 1}}>
			<ImageBackground source={require('./assets/img/dinnerpackage_large.jpg')} style={{flex: 3.5}}>
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
			
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#f0f0f0', elevation: 5}}>
                <View style={{marginLeft: 10}}>
					<Icon name='search' color='#888888'/>
				</View>
			</View>
			
			<View style={{flex: 10, backgroundColor: 'white'}}>
                <ScrollView>
                    {scrollView}
                </ScrollView>
			</View>
		</View>
    );
	}
}

// Navigation Stack
export default createStackNavigator(
  {
	RestaurantInfo: SelectedRestaurant,
	FoodInfo: FoodInfo,
  },
  {
    initialRouteName: 'RestaurantInfo',
	headerMode: 'none',
  }
);

// Header Component - Displayed on SelectedRestaurant Class before Food itens
class FoodHeader extends React.Component {
	render() {
		return (
			<View style={[styles.foodHeader, styles.center]}>
				<Text style={styles.foodHeaderText}>{this.props.name}</Text>
			</View>
		);
	}
}

// Food Component - Displayed on SelectedRestaurant Class
class Food extends React.Component {
	
	ShowNutriInfo = () =>
	{
		this.props.navi.navigate('FoodInfo', {
              food: this.props.food
            });
	}
    
	render() {
		return (
			<View style={styles.food}>
				<View style={{flex: 0, flexDirection: 'row', paddingTop: 10}}>
					<Text style={{flex: 0.75, marginLeft: 15}}>{this.props.food.name}</Text>
					<TouchableOpacity onPress={this.ShowNutriInfo}>
						<Icon style={{flex: 0.1}} name='info' color='#cccccc'/>
					</TouchableOpacity>
					<Text style={{flex: 0.15, textAlign: 'center'}}>${this.props.food.price}</Text>
				</View>
				<View style={{flex: 0, flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
					<Text style={{marginLeft: 15, fontSize: 12, color: '#909090'}}>{this.props.food.description}</Text>
				</View>
			</View>
		);
	}
}

// Stylesheet
const styles = StyleSheet.create({
    foodHeader: {
        height: 70,
        backgroundColor: '#eeeeee',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
		justifyContent: 'center'
    },
	foodHeaderText: {
		fontSize: 16,
		color: '#404040',
		fontWeight: '100',
		marginLeft: 15,
	},
    food: {
        //height: 100,
		flex: 0,
        backgroundColor: 'white',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
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
        borderWidth: 2
    },
    textWithShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    topPadding: {
        paddingTop: 10
    },
    bigFont: {
        fontSize: 22
    },
});