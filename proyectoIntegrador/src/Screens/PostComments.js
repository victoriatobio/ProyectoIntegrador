import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { db, auth } from "../firebase/config";

class PostComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      loading: false,
      error: "",
    };
  }

  onSubmit() {
    if (this.state.description === "") {
      this.setState({ error: "El post no puede estar vacío." });
    } 
    else {
      this.setState({ loading: true, error: "" });

      db.collection("posts")
        .add({
          owner: auth.currentUser.email,
          description: this.state.description,
          createdAt: Date.now(),
          likes: [],
          comentarios: []
        })
        .then(() => {
          this.setState({ description: "", loading: false });
          this.props.navigation.navigate('Profile');
       
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.titulo}>Crea un nuevo Post</Text>

        <TextInput
          placeholder="Publica un post..."
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
          style={styles.input}
        />

        <Text style={styles.error}>{this.state.error}</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
            <Text style={styles.botonTexto}>Publicar</Text>
          </Pressable>
        )}
      </View>
    );
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
  titulo: { 
    fontSize: 34,
    color: '#1DA1F2',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#f5f8fa',
    marginBottom: 10,
    textAlignVertical: 'top'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
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
});

export default PostComments;

