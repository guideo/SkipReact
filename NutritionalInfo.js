import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native';

//N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB

export default class FoodInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state ={ isLoading: true,
                      count: 0,
                      dataSource: '',
                      nOfIngredients: 1,
                      ndbNos: [],
                      info: [],
                      foodFetched: false }
	}
    
    getNDBNO(){
        const { navigation } = this.props;
        var ingredients = navigation.getParam('ingredients', []);
		this.fetchFoodNdb(ingredients);
	}
    
    fetchFoodNdb(list){
        let ndbBkup = [...this.state.ndbNos];
        fetch(this.buildURLForFood(list[0].name))
		  .then((response) => response.json())
		  .then((responseJson) => {
            ndbBkup.push({ndb: responseJson.list.item[0].ndbno, name: responseJson.list.item[0].name});
			this.setState({
                dataSource: responseJson,
                ndbNos: ndbBkup,
                count: this.state.count + 1
			}, function(){
                list.splice(0, 1);
                if(list.length>0){
                    this.fetchFoodNdb(list);
                }
                if(this.state.count >= this.state.nOfIngredients && !this.state.foodFetched){
                    this.setState({ foodFetched: true }, function(){
                        var ndbList = [...this.state.ndbNos];
                        this.fetchFoodNutrients(ndbList);
                    });
                }
			});

		})
		  .catch((error) =>{
			console.error(error);
		});
    }
    
    fetchFoodNutrients(list){
        let infoBkup = [...this.state.info];
        fetch(this.buildURLForNutrients(list[0].ndb))
		  .then((response) => response.json())
		  .then((responseJson) => {
            infoBkup.push({energy: responseJson.report.foods[0].nutrients[0].value,
              sugar: responseJson.report.foods[0].nutrients[1].value,
              fat: responseJson.report.foods[0].nutrients[2].value,
              carbs: responseJson.report.foods[0].nutrients[3].value});
			this.setState({
                dataSource: responseJson,
                info: infoBkup,
                count: this.state.count + 1
			}, function(){
                list.splice(0, 1);
                if(list.length>0){
                    this.fetchFoodNutrients(list);
                }
                if(this.state.count >= this.state.nOfIngredients*2 && this.state.isLoading){
                    this.setState({ isLoading: false });
                }
			});
		})
		  .catch((error) =>{
			console.error(error);
		});
    }
    
    buildURLForFood(item){
        const url = 'https://api.nal.usda.gov/ndb/search/?format=json&ds=Standard%20Reference&sort=r&max=1&offset=0&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB&q=';
        let retURL = url + item;
        console.log(retURL);
        return retURL;
    }
    
    buildURLForNutrients(item){
        const url = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=';
        let retURL = url + item;
        console.log(retURL);
        return retURL;
    }
    
    componentDidMount(){
        const { navigation } = this.props;
        var name = navigation.getParam('name', 'Undefined');
        var ingredients = navigation.getParam('ingredients', []);
        this.setState({ nOfIngredients: ingredients.length },  function() {
                console.log("###############################");
                console.log(ingredients.length.toString());
                console.log("@@@@@@@@@@@@@@@@@@@@@@");
                console.log(this.state.nOfIngredients);
                this.getNDBNO();
            });
        
        return;
    }
	
	render() {
		
		const { navigation } = this.props;
		const name = navigation.getParam('name', 'Undefined');
		const ingredients = navigation.getParam('ingredients', 'empty');
		
		//this.getNDBNO('https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=r&ds=Standard%20Reference&max=1&offset=0&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB')
        //this.getNDBNO('https://jsonplaceholder.typicode.com/posts')
		
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
					data={this.state.ndbNos}
					renderItem={({item}) => <Text>{item.ndb}, {item.name}</Text>}
					keyExtractor={(item, index) => index}
				/>
				<FlatList
					data={this.state.info}
					renderItem={({item}) => <Text>{item.energy}, {item.sugar}, {item.fat}, {item.carbs}</Text>}
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