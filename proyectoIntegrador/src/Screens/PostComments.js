import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
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
 
  if (!auth.currentUser) {
    this.setState({ error: "Debes estar logueado para publicar." });
  } 
  else if (this.state.description === "") {
    this.setState({ error: "El post no puede estar vacío." });
  } 
  else {
    this.setState({ loading: true, error: "" });

    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: []
      })
      .then(() => {
        this.setState({ description: "", loading: false });
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        this.setState({ error: "Error al crear el post", loading: false });
      });
  }
}


render() {
    return (
      <View >
        <Text style={styles.titulo}>Crea un nuevo Post</Text>

        <TextInput
          placeholder="Agrega un nuevo post"
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
        />

        <Text>{this.state.error}</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#0df055ff" />
        ) : (
          <Pressable  onPress={() => this.onSubmit()}>
            <Text>Publicar</Text>
          </Pressable>
        )}
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
  }
});

export default PostComments;
