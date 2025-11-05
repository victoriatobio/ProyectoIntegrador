import React, {Component} from "react";
import { View, Text, Image, StyleSheet, FlatList, TextInput } from "react-native";
import { Pressable } from "react-native";
import { db, auth } from "../firebase/config"


class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            userName: "",
            password: "",
            registered: false,
            error: "",
        }
    }

    onSubmit (email,userName,password){
        if (this.state.email.includes("@")===false){
            this.setState({ error: 'El email debe ser válido' })
        }else if (this.state.userName.length < 1){
            this.setState({ error: 'El nombre de usuario no puede estar vacío' })
        }else if (this.state.password.length < 6){
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres' })
        }else{
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            this.setState({registered: true});
            console.log(response);
            this.props.navigation.navigate('Login')

            db.collection('users').add({
                userName: this.state.userName,
                email: this.state.email,
                createdAt: Date.now(),
            })
            .then()
            .catch( e => console.log(e))
         })     
        .catch( error => {
            console.log(error);
          this.setState({error: 'Fallo en el registro.'})
        })

      }
     }
    
    


     render (){
        return(
            <View style={styles.container}>
                <Text style={styles.logo} >Register</Text>

                <TextInput style={styles.input} 
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={ text => this.setState({email:text}) }
                    value={this.state.email} />

                <TextInput style={styles.input} 
                    keyboardType='default'
                    placeholder='userName'
                    onChangeText={ text => this.setState({userName:text}) }
                    value={this.state.userName} />

                <TextInput style={styles.input} 
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true} 
                    onChangeText={ text => this.setState({password:text}) }
                    value={this.state.password}/> 

                  { this.state.error !== "" ? ( <Text style={styles.error} > {this.state.error} </Text> ) : console.log("el register funciono bien") }

                <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.userName, this.state.password)} >
                    <Text style={styles.botonTexto}> Register </Text> 
                </Pressable> 

                <Pressable style={styles.register}  onPress={ ()=> this.props.navigation.navigate('Login')} >
                    <Text style={styles.registerText} >Ir al Login</Text>
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
    borderWidth: 0.5,
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



export default Register;












