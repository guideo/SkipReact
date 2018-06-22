import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, FlatList } from 'react-native';

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
    
    // Used to get the NDBNO for each ingredient (based on name)
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
    
    // Fetches the nutrient list for each ingredient (based on NDBNO)
    fetchFoodNutrients(list){
        let infoBkup = [...this.state.info];
        fetch(this.buildURLForNutrients(list[0].ndb))
		  .then((response) => response.json())
		  .then((responseJson) => {
            infoBkup.push({fiber: {val: responseJson.report.foods[0].nutrients[0].gm, unit: responseJson.report.foods[0].nutrients[0].unit},
              calcium: {val: responseJson.report.foods[0].nutrients[1].gm, unit: responseJson.report.foods[0].nutrients[1].unit},
              protein: {val: responseJson.report.foods[0].nutrients[2].gm, unit: responseJson.report.foods[0].nutrients[2].unit},
              sugar: {val: responseJson.report.foods[0].nutrients[3].gm, unit: responseJson.report.foods[0].nutrients[3].unit},
              iron: {val: responseJson.report.foods[0].nutrients[4].gm, unit: responseJson.report.foods[0].nutrients[4].unit},
              totalFat: {val: responseJson.report.foods[0].nutrients[5].gm, unit: responseJson.report.foods[0].nutrients[5].unit},
              monoFat: {val: responseJson.report.foods[0].nutrients[6].gm, unit: responseJson.report.foods[0].nutrients[6].unit},
              cholesterol: {val: responseJson.report.foods[0].nutrients[7].gm, unit: responseJson.report.foods[0].nutrients[7].unit},
              carbs: {val: responseJson.report.foods[0].nutrients[8].gm, unit: responseJson.report.foods[0].nutrients[8].unit},
              polyFat: {val: responseJson.report.foods[0].nutrients[9].gm, unit: responseJson.report.foods[0].nutrients[9].unit},
              sodium: {val: responseJson.report.foods[0].nutrients[10].gm, unit: responseJson.report.foods[0].nutrients[10].unit},
              calories: {val: responseJson.report.foods[0].nutrients[11].gm, unit: responseJson.report.foods[0].nutrients[11].unit},
              transFat: {val: responseJson.report.foods[0].nutrients[12].gm, unit: responseJson.report.foods[0].nutrients[12].unit},
              satuFat: {val: responseJson.report.foods[0].nutrients[13].gm, unit: responseJson.report.foods[0].nutrients[13].unit}
            });
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
    
    // Builds the URL used to get the NDBNO of each ingredient
    buildURLForFood(item){
        const url = 'https://api.nal.usda.gov/ndb/search/?format=json&ds=Standard%20Reference&sort=r&max=1&offset=0&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB&q=';
        let retURL = url + item;
        return retURL;
    }
    
    // Builds the URL used to get nutrients for each ingredient
    buildURLForNutrients(item){
        const url = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=N8yGCm0uUt20Cvdo7rYKM4hxcPi3DLZ04dxE3kpB&nutrients=606&nutrients=645&nutrients=646&nutrients=605&nutrients=601&nutrients=303&nutrients=301&nutrients=307&nutrients=291&nutrients=203&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=';
        let retURL = url + item;
        console.log(retURL);
        return retURL;
    }
    
    // Triggers the first call to the fetch function -> the rest will be triggered recursively
    componentDidMount(){
        const { navigation } = this.props;
        var food = navigation.getParam('food', []);
		var ingredients = food.ingredients;
        this.setState({ nOfIngredients: ingredients.length },  function() {
                this.fetchFoodNdb([...ingredients]);
            });
        
        return;
    }
    
    // Go through the keys of totalInfo and update the values acording to the ingredient quantity
    addToTotal(dict, idx, ingredients){
        for(key in dict){
            dict[key] = dict[key] + ((isNaN(parseFloat(this.state.info[idx][key].val, 10)) ? 0 : parseFloat(this.state.info[idx][key].val, 10))*parseFloat(ingredients[idx].quantity)/100);
        }
        return dict;
    }
	
	render() {
		
		const { navigation } = this.props;
		const food = navigation.getParam('food', []);
		const ingredients = food.ingredients;
        
        var displayData = [];
        var totalInfo = {calories: 0.0, carbs: 0.0, sugar: 0.0, totalFat: 0.0, satuFat: 0.0, monoFat: 0.0, polyFat: 0.0, transFat: 0.0, cholesterol: 0.0, protein: 0.0, fiber: 0.0, sodium: 0.0, calcium: 0.0, iron: 0.0};
        for(let i=0; i<this.state.info.length; i++){
            totalInfo = this.addToTotal(totalInfo, i, ingredients);
        }
		
		if(this.state.isLoading){
			return(
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator/>
				</View>
			)
		}

		return(
			<View style={{flex: 1}}>
				<View style={{flex: 0.5, backgroundColor: 'red'}}>
				</View>
				<View style={{flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
					<Text style={{marginLeft: 70, color: 'white', fontSize: 23, fontWeight: '400'}}>{food.name}</Text>
				</View>
				<View style={{flex: 13}}>
					<View style={{flex: 0, backgroundColor: '#dddddd', borderBottomColor: '#cccccc', borderBottomWidth: 1}}>
						<View style={{flex: 0, justifyContent: 'flex-end'}}>
							<Text style={{marginLeft: 40, fontSize: 20, fontWeight: 'bold', paddingTop: 10}}>Nutritional Info</Text>
						</View>
						<View style={{flex: 0}}>
							<Text style={{marginLeft: 40, fontSize: 12, color: '#909090', paddingTop: 5, paddingBottom: 10}}>{food.description}</Text>
						</View>
					</View>
					<View style={{flex: 1}}>
						<NutritionalInfo name='Calories' value={totalInfo.calories.toFixed(2)} unit={this.state.info[0].calories.unit}/>
                        <NutritionalInfo name='Carbs' value={totalInfo.carbs.toFixed(2)} unit={this.state.info[0].carbs.unit}/>
						<NutritionalInfo name='Sugar' value={totalInfo.sugar.toFixed(2)} unit={this.state.info[0].sugar.unit}/>
                        <NutritionalInfo name='Total Fat' value={totalInfo.totalFat.toFixed(2)} unit={this.state.info[0].totalFat.unit}/>
                        <SubNutrInfo name='Saturated' value={totalInfo.satuFat.toFixed(2)} unit={this.state.info[0].satuFat.unit}/>
                        <SubNutrInfo name='Monounsaturated' value={totalInfo.monoFat.toFixed(2)} unit={this.state.info[0].monoFat.unit}/>
                        <SubNutrInfo name='Polyunsaturated' value={totalInfo.polyFat.toFixed(2)} unit={this.state.info[0].polyFat.unit}/>
                        <SubNutrInfo name='Trans Fat' value={totalInfo.transFat.toFixed(2)} unit={this.state.info[0].transFat.unit}/>
                        <SubNutrInfo name='Cholesterol' value={totalInfo.cholesterol.toFixed(2)} unit={this.state.info[0].cholesterol.unit}/>
                        <NutritionalInfo name='Protein' value={totalInfo.protein.toFixed(2)} unit={this.state.info[0].protein.unit}/>
                        <NutritionalInfo name='Fiber' value={totalInfo.fiber.toFixed(2)} unit={this.state.info[0].fiber.unit}/>
                        <NutritionalInfo name='Sodium' value={totalInfo.sodium.toFixed(2)} unit={this.state.info[0].sodium.unit}/>
                        <NutritionalInfo name='Calcium' value={totalInfo.calcium.toFixed(2)} unit={this.state.info[0].calcium.unit}/>
                        <NutritionalInfo name='Iron' value={totalInfo.iron.toFixed(2)} unit={this.state.info[0].iron.unit}/>
					</View>
				</View>
			</View>
		);
	}
}

// Class responsible for displaying one nutrient
class NutritionalInfo extends React.Component {
	render() {
		return (
			<View style={{height: 40, backgroundColor: 'white', borderBottomColor: '#cccccc', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 0.3, borderRightColor: '#dddddd', borderRightWidth: 1}}>
					<Text style={{fontSize: 17, paddingLeft:40, fontWeight: 'bold'}}>{this.props.name}:</Text>
				</View>
				<View style={{flex: 0.7}}>
					<Text style={{fontSize: 16, paddingLeft:15}}>{this.props.value} {this.props.unit}</Text>
				</View>
			</View>
		);
	}
}

// Class used to display subcomponents of a nutrient
class SubNutrInfo extends React.Component {
	render() {
		return (
			<View style={{height: 30, backgroundColor: '#eeeeee', borderBottomColor: '#cccccc', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center'}}>
				<View style={{flex: 0.4, borderRightColor: '#cccccc', borderRightWidth: 1}}>
					<Text style={{fontSize: 14, paddingLeft:40,}}>{this.props.name}:</Text>
				</View>
				<View style={{flex: 0.6}}>
					<Text style={{fontSize: 14, paddingLeft:15}}>{this.props.value} {this.props.unit}</Text>
				</View>
			</View>
		);
	}
}