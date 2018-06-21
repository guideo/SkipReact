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
                scrollView.push(<Food key={keyHolder} navi={navigation} name={data.restaurantInfo.foodSection[i].foods[j].name} ingredients={data.restaurantInfo.foodSection[i].foods[j].ingredients}/>)
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
			<View style={styles.foodHeader}>
				<Text>{this.props.name}</Text>
			</View>
		);
	}
}

// Food Component - Displayed on SelectedRestaurant Class
class Food extends React.Component {
    
    showNutritionalInfo() {
		Alert.alert('You tapped the button!')
	}
	
	ShowNutriInfo = () =>
	{
		this.props.navi.navigate('FoodInfo', {
              name: this.props.name,
			  ingredients: this.props.ingredients,
            });
	}
    
	render() {
		return (
			<View style={styles.food}>
				<Text>{this.props.name}</Text>
                <Button
                    onPress={this.ShowNutriInfo}
                    title="i"/>
			</View>
		);
	}
}

// Stylesheet
const styles = StyleSheet.create({
    foodHeader: {
        height: 70,
        backgroundColor: '#dddddd',
        borderBottomColor: '#bbbbbb',
        borderBottomWidth: 2,
        
    },
    food: {
        height: 100,
        backgroundColor: 'red',
        borderBottomColor: '#bbbbbb',
        borderBottomWidth: 2,
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