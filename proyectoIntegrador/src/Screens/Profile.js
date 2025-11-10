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
      .where('owner', '==', auth.currentUser.email) // filtra los posts del usuario logueado
      .onSnapshot((docs) => {
        let userPosts = [];
        docs.forEach(doc => {
          userPosts.push({
            id : doc.id, 
            data : doc.data() // contenido del post
          })
        })
        this.setState({
          posts : userPosts,
          loading : false
        })
      })

      db.collection('users')
      .where('email', '==', auth.currentUser.email) // filtra los datos de usuario del usuario logueado
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
      <View style={styles.scrolleable}>
        <Text style={styles.headerTitle}>Mi perfil</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <View style={styles.scrolleable}>
                <Image source={profileTwitter} style={styles.profileImage} />

            
                <Text style={styles.userInfoBold}>
                  @{this.state.users.length > 0 ? this.state.users[0].data.userName : ''}
                </Text>

                <Text style={styles.userInfo}>
                  {this.state.users.length > 0 ? this.state.users[0].data.email : ''}
                </Text>

                <Text style={styles.followText}>120 Siguiendo</Text>
                <Text style={styles.followText}>300 Seguidores</Text>

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
  scrolleable: { 
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
  headerTitle: { 
    fontSize: 26,
    fontWeight: '700',
    color: '#1DA1F2',
    textAlign: 'center',
  },
  profileImage: { 
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,

    alignSelf: 'center'
  },
  profileDetails: { 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 15, 
  },
  userInfoBold: { fontSize: 18, color: '#14171A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2
  },
  userInfo: { fontSize: 16,
    color: '#14171A',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold', 
  },
  followText: {
    fontSize: 16,
    color: '#14171A',
    textAlign: 'center', 
  },
  sectionTitle: { 
    fontSize: 20,
    fontWeight: '700',
    color: '#1DA1F2',
    marginBottom: 10,
    textAlign: 'center', 
    marginTop: 20
  },
  logoutButton: { 
    backgroundColor: '#1DA1F2',
    paddingVertical: 15, 
    paddingHorizontal: 80, 
    borderRadius: 30, 
    marginVertical: 25, 
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
