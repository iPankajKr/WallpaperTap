import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Dimensions,
Image } from 'react-native';
import axios from 'axios';

const {height, width} = Dimensions.get('window')
export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      isLoading: true,
      images:[]
    };
  }

  loadWallpapers = () => {
    axios.get('https://api.unsplash.com/photos/random?count=30&client_id=47616d50de6696a8d40273322652c344085fe9d03512a66900b014d8a4344c6e'
    )
    .then(function(response){
      console.log(response.data);
      this.setState({ images:response.data, isLoading:false });
    }.bind(this)
    )
    .catch(function(error){
      console.log(error);
    })
    .finally(function() {
      console.log('request completed');
    });
  }

  componentDidMount() {
    this.loadWallpapers()
  }

  renderItem = ({item}) => {
    return(
      <View style={{flex:1}}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color="gray" />

        </View>
      <View style={{height, width}}>
        <Image 
          style={{flex:1, height:null, width:null}}
          source={{ uri: item.urls.regular }}
        />
      </View>
      </View>
    );
  }


  render() {
  return this.state.isLoading? (
    <View style={{
      flex: 1, 
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
      }}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  ):(
      <View style={{ flex:1, backgroundColor: 'black'}}>
        <FlatList 
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
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
