import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  COLOR_BEIGE,
  COLOR_BLUE,
  COLOR_BACKGROUND
} from '../components/styles/common'
import { GlobalState } from '../global.js'

export default class RequestAdvisor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id: '',
      arrayOfUsers: [],
      arrayOfAdvisors: [],
    };
    fetch(`http://localhost:3000/users/1/requests/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GlobalState.cache.auth_token,
      }
    })
    .then((response) => {console.log(response);return response.json()})
    .then((responseJson) => {
      this.setState({
        description: responseJson.request.description,
        image: responseJson.request.request_photos[0].image,
        arrayOfUsers: responseJson.users
      })
    })
    .done()
  }

   render() {
     return (
       <View style={styles.container}>

        <View style={{alignItems: 'center'}}>
          <Image
          style={{width: 200, height: 200, alignItems: 'center', justifyContent: 'center'}}
            source={{uri: "https://exponent-file-upload-example.s3.amazonaws.com/1497402666049.png"}}
          />
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.description}>
            {this.state.description}
          </Text>
        </View>

        <View style={styles.viewContainer}>
          <Text style={styles.title}>
            Pick Advisors
          </Text>
        </View>

        <View>
          <ScrollView>
            {this.state.arrayOfUsers.map(userInfo => {
              return (
                <TouchableHighlight
                  onPress={this._advisorPress}
                  key={userInfo.id}
                  style={[styles.loginLink, styles.link]}>
                    <Text key={userInfo.id}>{userInfo.username}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this._submitButton.bind(this)}
            title="Submit"
            color="#000"
          />
        </View>

      </View>
    );
  }
  _advisorPress = () => {

  };
  _submitButton = () => {

  };
}

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
  },
  title: {
    padding: 10,
    fontSize: 22,
    marginBottom: 15,
    backgroundColor: COLOR_BEIGE,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  link: {
    padding: 10,
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'center',
    width: '100%',
  },
})
