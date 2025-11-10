import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase/app";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentarionuevo: "",
      comentarios: [],
      error: "",
      cargandocomentarios: true,
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId.id

    db.collection("posts").onSnapshot((docs) => {
      let comentariosPost = []; 

      docs.forEach((doc) => {
        if (doc.id === postId) {
          const data = doc.data(); 
          comentariosPost = data.comentarios 
        }
      });

      this.setState({
        comentarios: comentariosPost,
        cargandocomentarios: false,
      });
    });
  }

  addComment() {
    const postId = this.props.route.params.postId.id

    if (this.state.commentarionuevo === "") {
      this.setState({ error: "El comentario no puede estar vacío." });
    } else {
      this.setState({ error: "" });

      const nuevoComentario = {
        user: auth.currentUser.email,
        text: this.state.commentarionuevo,
        createdAt: Date.now(),
      };

      db.collection("posts")
        .doc(postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
        })
        .then(() => {
          this.setState({ commentarionuevo: "", error: "" });
        })
        .catch(() => {
          this.setState({ error: "Hubo un problema al publicar el comentario." });
        });
    }
  }

  render() {
    console.log(this.props.route.params.postId.id)
    return (
      <View style={styles.container}>
        {this.state.cargandocomentarios ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <View style={styles.innerContainer}>

          <View style={styles.card}>
            <Text style={styles.description} >{this.props.route.params.postId.data.description}</Text>
            <Text>Likes: {this.props.route.params.postId.data.likes.length}</Text>
            <Text  style={styles.owner} >de: {this.props.route.params.postId.data.owner}</Text>
          </View>

            <Text style={styles.titulo}>Comentarios</Text>

            {this.state.comentarios.length === 0 ? (
              <Text style={styles.noComments}>No hay comentarios aún.</Text>
            ) : (
              <FlatList
                data={this.state.comentarios}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.commentBox}>
                    <Text style={styles.user}>{item.user}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                )}
              />
            )}

            <Text style={styles.subtitulo}>Agregar comentario</Text>

            <TextInput
              style={styles.input}
              placeholder="Escribí tu comentario..."
              value={this.state.commentarionuevo}
              onChangeText={(text) => this.setState({ commentarionuevo: text })}
            />

            {this.state.error !== "" ? <Text style={styles.error}>{this.state.error}</Text> : null}

            <Pressable style={styles.boton} onPress={() => this.addComment()}>
              <Text style={styles.botonTexto}>Publicar comentario</Text>
            </Pressable>

            <Pressable style={styles.volver} onPress={() => this.props.navigation.navigate("HomeMenu")}>
              <Text style={styles.volverText}>Volver a Home</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1DA1F2",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  noComments: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  commentBox: {
    backgroundColor: "#f5f8fa",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  user: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#f5f8fa",
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#1DA1F2",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 5,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  volver: {
    marginBottom: 10,
  },
  volverText: {
    color: "#1DA1F2",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
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
  }

});

export default Comments;

