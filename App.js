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

    this.loadWallpapers = this.loadWallpapers.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  loadWallpapers() {
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

  renderItem(image){
    return(
      <View style={{height, width}}>
        <Image 
          style={{flex:1, height:null, width:null}}
          source={{ uri: image.urls.regular }} 
          resizeMode="cover"
        />
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
          renderItem={(({item}) => this.renderItem(item))}
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
