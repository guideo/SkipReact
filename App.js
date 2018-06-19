import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
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
			
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#dddddd'}}>
				<View style={{marginLeft: 10}}>
					<Icon name='search' color='#888888'/>
				</View>
				<Text style={{color: '#888888'}}>Search</Text>
			</View>
			
			<View style={{flex: 4, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center'}}>
				<Image
					style={{borderRadius: 3}}
					source={require('./assets/dinnerpackage_large.jpg')}/>
			</View>
			
			<View style={{flex: 8, backgroundColor: 'white'}}>
			</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});