import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase/app";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comentarios: [],
      loading: false,
      error: "",
      cargando: true,
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;

    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data();
        let comentarios = [];
        if (data.comentarios) {
          comentarios = data.comentarios;
        }
        this.setState({
          comentarios: comentarios,
          cargando: false,
        });
      });
  }

  addComment() {
     const postId = this.props.route.params.postId;

    if (this.state.comment === "") {
      this.setState({ error: "El comentario no puede estar vacío." });
    } 
    else {
      this.setState({ loading: true, error: "" });

      const nuevoComentario = {
        user: auth.currentUser.email,
        text: this.state.comment,
        createdAt: Date.now(),
      };

       db.collection("posts")
        .doc(postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
        })
        .then(() => {
          this.setState({
            comment: "",
            loading: false,
            error: "",
          });
          console.log("Comentario agregado!");
        })
         .catch(() => {
          this.setState({
            error: "Hubo un problema al publicar el comentario.",
            loading: false,
          });
        });
    }
  }

  render() {
    return (
      <View>
        {this.state.cargando ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <View>
            <Text>Comentarios</Text>

            {this.state.comentarios.length === 0 ? (
              <Text>No hay comentarios aún.</Text>
            ) : (
              <FlatList
                data={this.state.comentarios}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text> {item.user}</Text>
                    <Text>{item.text}</Text>
                  </View>
                )}
              />
            )}

            <Text>Agregar comentario</Text>

            <TextInput
              placeholder="Escribí tu comentario..."
              value={this.state.comment}
              onChangeText={(text) => this.setState({ comment: text })}
            />

            <Text>{this.state.error}</Text>

            {this.state.loading ? (
              <ActivityIndicator color="#1DA1F2" />
            ) : (
              <Pressable onPress={() => this.addComment()}>
                <Text>Publicar comentario</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Comments;
