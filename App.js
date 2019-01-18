import React from 'react';
import { ImageBackground,ActivityIndicator,Alert,TextInput,StyleSheet,ListView, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Pets from './app/components/Pets';

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
}
constructor(props){
  super(props);
  this.state = {
    isLoading: true,
    Input_propietario:''
  }
  this.consulta = [];//Arreglo Global
}

Action_Click(id_propietario,nombre_propietario){
  this.props.navigation.navigate('PetsScreen',{
      id_propietario:id_propietario,nombre_propietario:nombre_propietario
  })
  Alert.alert(id_propietario);
}

SearchProfile(Input_propietario){
     const nuevaLista = this.consulta.filter(function(item){
         const itemData = item.nombre_propietario.toUpperCase()
         const textData = Input_propietario.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(nuevaLista),
         Input_propietario: Input_propietario
     })
 }
 ListViewItemSeparator=()=>{
  return(
    <View
    style = {{
      height:.5,
      width:'100%',
      backgroundColor:'#2196F3'
    }}
    />
  )
}
render(){
  if(this.state.isLoading){
    return(
    
      <View style={{flex:1,paddingTop:1}}>
        <ActivityIndicator/>
      </View>
      
    )
  }
  return(
    <ImageBackground source={require('./img/pet1.jpg')} style={styles.imageContainer}>
    <View style={styles.ContainerDataUsers}>
      <Text style={styles.tittle}>Busqueda de Propietario</Text>
      <TextInput style={styles.textInput} 
          placeholder='Ingrese el Nombre del Propietario' 
          onChangeText={(Input_propietario) => this.SearchProfile(Input_propietario)} 
          value={this.state.Input_propietario}
          underlineColorAndroid='transparent'/>
      <ListView
        dataSource={this.state.dataSource}
        renderSeparator={this.ListViewItemSeparator}
        renderRow={(rowData)=>
          <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
              rowData.id_propietario,
              rowData.nombre_propietario
            )}>
            {rowData.nombre_propietario}
          </Text>
        }
      />
    </View>
    </ImageBackground>
  )
}

componentDidMount(){

return fetch('http://weaweawea.atwebpages.com/BuscarPropietario.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          //Asignamos datos al arreglo
          this.consulta = responseJson ;
        });
      })
      .catch((error) => {
        console.error(error);
      });

}
}

const RootStack = createStackNavigator(
  {
    
    SearchScreen:SearchScreen,
    PetsScreen:{
      screen: Pets,
      navigationOptions: () => ({
        title: 'Mascotas',
        //header: null,
        //headerBackTitle: null
      }),
    }
    
    
  }
);
const App = createAppContainer(RootStack);
  
export default App;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    width: '100%', height: '100%'
    //justifyContent: 'center',
  },
  ContainerDataUsers:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5,
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%'
    },
  tittle:{
      fontSize:30,
      marginTop:80,
      color:'black',
      //backgroundColor:'rgba{0,0,0,0}'
    },
  textInput:{
      marginTop:20,
      alignSelf:'center',
      padding: 16,
      backgroundColor:'#fff',
      textAlign:'center',
      marginBottom:7,
      height:50,
      width:300,
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
  },
  rowViewContainer:{
    fontSize:20,
    padding:10
    
  }
 
});