import React, {Component} from 'react';
import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  } 

  componentDidMount(){
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let userPosts = [];
        docs.forEach(doc => {
          userPosts.push({
            id: doc.id, 
            data: doc.data()
          })
        })
        this.setState({
          posts: userPosts
        })
      })
  }

  logout(){
    auth.signOut()
      .then(()=> {
        this.props.navigation.navigate('Login')
      })
      .catch(error => console.log(error)) 

  }

  render(){
    return (
      <View style={styles.container} >
        <Text style={styles.titulo}>Mis posteos</Text>
          <FlatList
              data={this.state.posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Post postData={item} navigation={this.props.navigation} />
              )}
          />
        <Pressable style={styles.logoutButton}  onPress={() => this.logout()}>
          <Text style={styles.logoutText} > Cerrar sesión </Text>
        </Pressable>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  logoutButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default Profile;