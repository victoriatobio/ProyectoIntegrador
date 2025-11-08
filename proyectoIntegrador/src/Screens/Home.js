import React, {Component} from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import Post from '../components/Post';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount(){
    db.collection("posts").orderBy('createdAt', 'desc').onSnapshot(
      (docs) => {
        let posts = [];
        docs.forEach((doc) =>
          posts.push({
            id: doc.id,
            data: doc.data(),
          })
        );
        this.setState({ posts: posts });
      },
    );
  }

render(){
  return (
    <View style={styles.scroleable}>
      <Text style={styles.titulo} >Home</Text>



      <FlatList  
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} 
          
          />}
        />
    </View>
  );
}

}

const styles = StyleSheet.create({
      titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    scroleable: {
      width: '100%',
      flex: 1
    }
});

export default Home;