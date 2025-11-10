import React, {Component} from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ActivityIndicator, Image } from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';
import profileTwitter from '../../assets/profileTwitter.jpg';

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
            id : doc.id, 
            data : doc.data()
          })
        })
        this.setState({
          posts : userPosts,
          loading : false
        })
      })

      db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let usersName = [];
        docs.forEach(doc => {
          usersName.push({
            id : doc.id, 
            data : doc.data()
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
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <View>
              <Image source={profileTwitter} style={styles.profileImage} />

              <View style={styles.profileDetails}>
                <Text style={styles.followText}>120 Siguiendo     </Text>
                <Text style={styles.followText}>300 Seguidores    </Text>
               
                <Text style={styles.userInfo}>
                  @{this.state.users.length > 0 ? this.state.users[0].data.userName : ''}
                </Text>
                <Text style={styles.userInfo}>
                  {this.state.users.length > 0 ? this.state.users[0].data.email : ''}
                </Text>
              </View>

            <View style={styles.postsSection}>
              <Text style={styles.sectionTitle}>Mis posteos</Text>
              <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Post postData={item} navigation={this.props.navigation} />
                )}
              />
            </View>
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
    paddingHorizontal: 40,
    paddingTop: 50,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1DA1F2',
    textAlign: 'center',
    marginBottom: 25,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    alignSelf: 'center',
  },

  profileDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 15,

    // 👇 esto hace que “Siguiendo” y “Seguidores” queden lado a lado
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 15, // espacio entre ellos
  },

  followText: {
    fontSize: 16,
    color: '#14171A',
  },

  userInfo: {
    width: '100%', // fuerza que los userInfo pasen a la línea siguiente
    textAlign: 'center',
    fontSize: 17,
    color: '#14171A',
    marginTop: 10,
    
  },

  postsSection: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1DA1F2',
    marginBottom: 10,
    textAlign: 'center',
  },

  logoutButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 25,
    alignSelf: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Profile;