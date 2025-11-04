import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Post extends Component {
  render() {
    return (
      <View >
        <Text >{this.props.postData.owner}</Text>
        <Text>{this.props.postData.description}</Text>
      </View>
    );
  }
}



export default Post;
