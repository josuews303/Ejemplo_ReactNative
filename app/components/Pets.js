import React from 'react';
import {ImageBackground,ActivityIndicator,ListView,Alert,StyleSheet, Text, View } from 'react-native';
export default class PetsScreen extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        isLoading:true,
        id_propietario:this.props.navigation.state.params.id_propietario,
        nombre_propietario: this.props.navigation.state.params.nombre_propietario
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
        console.log(this.state.nombre_propietario)
      if(this.state.isLoading){
        return(
        
          <View style={{flex:1,paddingTop:1}}>
            <ActivityIndicator/>
          </View>
          
        )
      }
      return(
        <ImageBackground source={require('../../img/pet2.jpg')} style={styles.imageContainer}>
        <View style={styles.ContainerDataUsers}>
        <Text style={styles.tittle}>Mascotas de {this.state.nombre_propietario}</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={(rowData)=>
              <Text style={styles.rowViewContainer} >
                {rowData.nombre_mascota}
              </Text>
            }
          />
        </View>
        </ImageBackground>
      )
    }
  }

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
        marginLeft:20,
        color:'black',
        //backgroundColor:'rgba{0,0,0,0}'
      },
    });