import React, {Component} from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : '', 
      password : '', 
      error : '',
      loggedIn : false 
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user){
        this.props.navigation.navigate('HomeMenu');
      }
    })
  }

  login(){
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
          this.setState({loggedIn : true})
          this.props.navigation.navigate('HomeMenu'); 
      })
      .catch(error => {
        this.setState({error: 'Error en el inicio de sesión' });
      })
  }

  render(){
    return (
      <View style={styles.container} > 
        <Text style={styles.logo} > Login </Text>
        
        <TextInput
          keyboardType = 'email-address'
          placeholder = 'email'
          style={styles.input}
          onChangeText = {text => this.setState({email:text})}
          value = {this.state.email}
        />
        <TextInput
          keyboardType='default'
          placeholder = 'password'
          secureTextEntry={true} 
          style={styles.input}
          onChangeText = {text => this.setState({password:text})}
          value = {this.state.password}
        />

        {this.state.error !== '' ? ( <Text style={styles.error} > {this.state.error} </Text> ) : null} {/* En caso de error entonces se muestra el mensaje al usuario */}

        <Pressable style={styles.boton} onPress ={() => this.login()} >
          <Text style={styles.botonTexto} > Iniciar sesión </Text>
        </Pressable>
        <Pressable style={styles.register} onPress ={() => this.props.navigation.navigate('Register')} >
          <Text style={styles.registerText} > Registrarse </Text>
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
  logo: {
    fontSize: 40,
    color: '#1DA1F2',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '45%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f5f8fa',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  boton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  register: {
    marginTop: 20,
  },
  registerText: {
    color: '#1DA1F2',
    fontSize: 16,
  },
});

export default Login;