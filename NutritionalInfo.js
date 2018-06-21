import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native';

//N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB

export default class FoodInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state ={ isLoading: true }
	}

	getNDBNO(url: string){
		fetch(url)
		  .then((response) => response.json())
		  .then((responseJson) => {

			this.setState({
				isLoading: false,
				dataSource: responseJson.list.item,
			}, function(){
				
			});

		})
		  .catch((error) =>{
			console.error(error);
		});
	}
	
	render() {
		
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'Undefined');
		const ingredients = navigation.getParam('ingredients', 'empty');
		
		this.getNDBNO('https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=r&ds=Standard%20Reference&max=1&offset=0&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB')
		
		if(this.state.isLoading){
			return(
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator/>
				</View>
			)
		}

		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>{ingredients.length.toString()}</Text>
				<FlatList
					data={this.state.dataSource}
					renderItem={({item}) => <Text>{item.name}, {item.ndbno}</Text>}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
		
		/*return (
			<View style={{flex: 1, backgroundColor: 'red'}}>
				<Text>{name}</Text>
				<Text>{ingredients}</Text>
				
			</View>
		);*/
	}
}

// Stylesheet
const styles = StyleSheet.create({
    topPadding: {
        paddingTop: 10,
    },
});