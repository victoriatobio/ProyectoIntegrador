import React, {Component} from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : [],
      users : [],
      loading : true, 
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
          posts: userPosts,
          loading : false
        })
      })

      db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let usersName = [];
        docs.forEach(doc => {
          usersName.push({
            id: doc.id, 
            data: doc.data()
          })
        })
        this.setState({
          users : usersName
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
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Mi perfil</Text>

        {this.state.loading ? (
          <ActivityIndicator size='large' color='#1DA1F2' />
        ) : (
          <View style={styles.profileInfo}>
            <Text style={styles.userInfo}>
              usuario: {this.state.users.length > 0 ? this.state.users[0].data.userName : ''}
            </Text>

            <Text style={styles.userInfo}>
              email: {this.state.users.length > 0 ? this.state.users[0].data.email : ''}
            </Text>

            <Text style={styles.sectionTitle}>Mis posteos</Text>

            <FlatList
              data={this.state.posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Post postData={item} navigation={this.props.navigation} />
              )}
            />
          </View>
        )}

        <Pressable style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1DA1F2',
    textAlign: 'center',
    marginBottom: 35,
  },
  userInfo: {
    fontSize: 18,
    color: '#14171A',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#14171A',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  postList: {
    width: '100%',
    paddingBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#1DA1F2',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Profile;