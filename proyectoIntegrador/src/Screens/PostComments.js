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
    this.setState({
      loading: true,
      error: "",
    });

    db.collection("posts").add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({
          description: "",
          loading: false,
        });
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        this.setState({
          error: "Error al crear el post",
          loading: false,
        });
      });
  }

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Crea un nuevo Post</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Agrega un nuevo post"
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
        />

        <Text style={styles.error}>{this.state.error}</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#0df055ff" />
        ) : (
          <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
            <Text style={styles.textoBoton}>Publicar</Text>
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
