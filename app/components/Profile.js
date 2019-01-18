import React from 'react';
import { TouchableOpacity,ActivityIndicator,ListView,Alert,StyleSheet, Text, View } from 'react-native';
import { createStackNavigator} from 'react-navigation';
class ProfileScreen extends React.Component{
  static navigationOptions = {
    title:'Perfil de Propietario'
}

  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      cedula_propietario:this.props.navigation.state.params.Input_propietario,
      userData:null
    }
  }
  componentDidMount(){
    return fetch('http://weaweawea.atwebpages.com/mostrarPerfil.php',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          cedula_propietario:this.state.cedula_propietario,
        })
      })
            .then((response)=>response.json())
            .then((responseJson)=>{
              let ds =  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2})
              console.log(ds)
              this.setState({
                isLoading:false,
                dataSource: ds.cloneWithRows(responseJson),
                userData:ds.cloneWithRows(responseJson)
              },function(){})
            }).catch((error)=>{
              console.error(error);
            })
            
  }
// map

  reload = () => 
{
    //RELOAD COMPONENT
    this.componentDidMount();
    this.state.userData.map((userData) => {
      console.log(userData.nombre_propietario);
    });
};

  Action_Click(id_propietario){
    this.props.navigation.navigate('Second',{
        id_propietario:id_propietario
    })
    Alert.alert(id_propietario);
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
      
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData)=>
            <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                rowData.id_propietario
              )}>
              {rowData.nombre_propietario}
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}
class PetsScreen extends React.Component{
  static navigationOptions={
    title:'Mascotas'
  }
  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      id_propietario:this.props.navigation.state.params.id_propietario
    }
  }
  componentDidMount(){

    return fetch('http://weaweawea.atwebpages.com/MostrarMascotas.php',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id_propietario:this.state.id_propietario,
        })
      })
            .then((response)=>response.json())
            .then((responseJson)=>{
              let ds =  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2})
              this.setState({
                isLoading:false,
                dataSource: ds.cloneWithRows(responseJson)
              },function(){})
            }).catch((error)=>{
              console.error(error);
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
      
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData)=>
            <Text style={styles.rowViewContainer} >
              {rowData.nombre_mascota}
            </Text>
          }
        />
        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
          <Text style={styles.TextStyle}>Reload List</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}
export default App=createStackNavigator({
  First:{screen:ProfileScreen},
  Second:{screen:PetsScreen}
        
});
const styles = StyleSheet.create({
    Container: {
      flex: 1,
      marginTop:5,
      width:'100%',
      height:'100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextStyle:{
      color:'#fff',
      textAlign:'center',
  
    },
    TouchableOpacityStyle:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#00BCD4',
      
    },
    
    TouchableOpacityStyle2:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#FF5722'
    },
    TouchableOpacityStyle3:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'100%',
      backgroundColor:'#00BCD4',
      
    },
    ContainerDataUsers:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5,
      alignItems: 'center',
      width:'100%'
    },
    rowViewContainer:{
      textAlign:'center',
      fontSize:20,
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      
    },
    tittle:{
      fontSize:30,
      marginTop:50,
      color:'white',
      //backgroundColor:'rgba{0,0,0,0}'
    },
  });