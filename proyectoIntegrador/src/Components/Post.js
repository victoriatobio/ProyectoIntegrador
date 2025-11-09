import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import firebase from 'firebase';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
      listaDeYaLikearon: [],
      texto:""
    };
  }

  
  componentDidMount() {
    

    if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
      this.setState({fav:true})

    }

  }
  agregarEmailFavoritos() {
    let lista = []

    if (this.state.listaDeYaLikearon.includes(auth.currentUser.email)){
      this.setState({texto:"Ya le diste like a este post"})
    } else {
      if (this.props.postData.data.likes.includes(auth.currentUser.email)){
        db.collection('posts')
              .doc(this.props.postData.id)
              .update({
                 likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
  
              })
              .then(()=>{
                  this.setState({
                      fav:false
                  })
              })
  
      } else{
          db.collection('posts')
          .doc(this.props.postData.id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
          })
          .then(()=>{
            lista.push(auth.currentUser.email);
            this.setState({
              fav:true,
              listaDeYaLikearon: lista
              
              })
          })
    
      }
      }
  
  }



  render() {
    return (
      <View style={styles.card} >
        <Text style={styles.owner} >{this.props.postData.data.owner}</Text>
        <Text style={styles.description} >{this.props.postData.data.description}</Text>
        <Text>Likes: {this.props.postData.data.likes.length}</Text>

          <Pressable
            onPress={() => this.props.navigation.navigate('Comments', { postId: this.props.postData.id })}
            style={styles.boton2}>
            <Text style={styles.coment}>Comentar</Text>
          </Pressable> 

          <Pressable onPress={()=> this.agregarEmailFavoritos()}>
              <Text>{this.state.fav ? "Sacar de Favoritos" : "Agregar a Favoritos"}</Text>
          </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E6ECF0',
    marginLeft: 40,
    marginRight: 40,
  },
  owner: {
    color: '#1DA1F2',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#14171A',
    marginBottom: 5,
  },
  boton2: {
    marginTop: 10,
    backgroundColor: '#E1E8ED',
    paddingVertical: 8,
    paddingHorizontal: 1,
    borderRadius: 20,
    alignItems: 'center',
    width: 80,
  },
  minitexto: {
    color: 'red',
    marginVertical: 10,
    fontSize: 12,
  },
  coment:{
    color: '#1DA1F2',
    fontSize: 14,
  }
});


export default Post;
