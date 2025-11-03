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
      <View> 
        <TextInput
          keyboardTyp = 'email-address'
          placeholder = 'email'
          onChangeText = {text => this.setState({email:text})}
          value = {this.state.email}
        />
        <TextInput
          keyboardType='default'
          placeholder = 'password'
          onChangeText = {text => this.setState({password:text})}
          value = {this.state.password}
        />

        {this.state.error !== '' ? ( <Text> {this.state.error} </Text> ) : null} {/* En caso de error entonces se muestra el mensaje al usuario */}

        <Pressable onPress ={() => this.login()} >
          <Text> Login </Text>
        </Pressable>
        <Pressable onPress ={() => this.props.navigation.navigate('Register')} >
          <Text> Registrarse </Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
      titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default Login;