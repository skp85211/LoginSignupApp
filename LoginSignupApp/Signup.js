import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, LogBox, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
//import Toast from 'react-native-simple-toast';
import Login from './App';

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;
const Signup = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const postSignupCredential = async () => {
    if (!firstName || !email || !password || !password2) {
      Alert.alert("Fill all credentials to proceed..")
    }
    else if (password != password2) {
      Alert.alert("Retype same password to proceed")
    }
    else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(email) === false) {
        Alert.alert("Enter Valid Email...", "It should of type exmaple@domain.com")
      }
      else {
        let res = await fetch("http://192.168.1.47:8000/user/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": firstName,
            "email": email,
            "password": password
          })
        })
        await res.json();
        //.then(res=>res.json())
        Alert.alert(firstName + ' signed up successfully')
        //.then(async (js) => {
        //    Alert.alert(firstName+' signed up successfully')
        //})
      }
    }
  }

  let textObj = [
    {
      styleText: styles.text,
      styleInput: styles.textInput,
      placeholder: "First Name",
      placeholderTextColor: '#5c5c5c',
      labelText: 'First Name',
      label: 'firstname',
      secureTextEntry: false
    },
    {
      styleText: styles.text,
      styleInput: styles.textInput,
      placeholder: "Last Name",
      placeholderTextColor: '#5c5c5c',
      labelText: 'Last Name',
      label: 'lastname',
      secureTextEntry: false
    },
    {
      styleText: styles.text,
      styleInput: styles.textInput,
      placeholder: "Your Email",
      placeholderTextColor: '#5c5c5c',
      labelText: 'Email',
      label: 'email',
      secureTextEntry: false
    },
    {
      styleText: styles.text,
      styleInput: styles.textInput,
      placeholder: "Your Password",
      placeholderTextColor: '#5c5c5c',
      secureTextEntry: true,
      labelText: 'Password',
      label: 'password'
    },
    {
      styleText: styles.text,
      styleInput: styles.textInput,
      placeholder: "Reype Password",
      placeholderTextColor: '#5c5c5c',
      secureTextEntry: true,
      labelText: 'Retype Password',
      label: 'retypepassword'
    }
  ]

  const stateHandler = (text, label) => {
    if (label == 'firstname') {
      console.log(firstName)
      setFirstName(text);
    }
    else if (label == 'email') {
      setEmail(text);
    }
    else if (label == 'password') {
      setPassword(text);
    }
    else if (label == 'retypepassword') {
      setPassword2(text);
    }
  }

  const TextInputHandler = (props) => {
    return (
      <View>
        <Text style={props.styleText}>{props.labelText}</Text>
        <TextInput style={props.styleInput} placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor} secureTextEntry={props.secureTextEntry}
          onChangeText={(text) => stateHandler(text, props.label)}></TextInput>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: height * 0.1, marginBottom: 40, alignItems: 'center', flexDirection: 'row' }}>
        <Image source={require('./Chatify.png')} style={{ padding: 20, marginTop: 20, marginLeft: 0.17 * width, alignSelf: 'center', marginTop: 20, height: 15, width: 100, resizeMode: 'contain', alignItems: 'center' }} />
        <Image source={require('./iconChatify2.png')} style={{ padding: 20, marginTop: 25, height: 15, width: 20, resizeMode: 'contain', alignItems: 'center' }} />
      </View>
      <View>
        {
          textObj.map((obj) => {
            return (
              <TextInputHandler {...obj} />
            )
          })
        }
        {/*<Text style={styles.text}>First Name</Text>
        <TextInput style={styles.textInput} placeholder="First Name" placeholderTextColor='#5c5c5c'
        onChangeText={(text)=>setfirstName(text)}></TextInput>
        <Text style={styles.text}>Last Name</Text>
        <TextInput style={styles.textInput} placeholder="Last Name" placeholderTextColor='#5c5c5c'></TextInput>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} placeholder="Your Email" placeholderTextColor='#5c5c5c'
        onChangeText={(text)=>setEmail(text)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput} placeholder="Your Password" placeholderTextColor='#5c5c5c'
        secureTextEntry={true} onChangeText={(text)=>setPassword(text)}></TextInput>
        <Text style={styles.text}>Retype Password</Text>
        <TextInput style={styles.textInput} placeholder="Reype Password" placeholderTextColor='#5c5c5c'
        secureTextEntry={true} onChangeText={(text)=>setPassword2(text)}></TextInput>
       */}
      </View>


      {/*<View style={styles.loginView}>
        <View style={styles.textView}>
          <Text style={styles.emailText}>Email : </Text>
          <Text style={styles.emailText}>Password : </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.emailTextInput} placeholder="example123@gmail.com"/>
          <TextInput style={styles.passwordTextInput} placeholder="password" secureTextEntry={true}/>
        </View>
  </View>*/}

      <TouchableOpacity style={styles.buttonLogin} onPress={() => {
        // Alert.alert("Loggin in.. wait...")
        postSignupCredential();
      }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold', justifyContent: 'center' }}>
          SIGNUP
        </Text>
      </TouchableOpacity>
      <View style={{ alignSelf: 'center', marginTop: -12.5, marginRight: 15, flexDirection: 'row' }}>
        <Text style={styles.text}>Already have an Account?</Text>
        <TouchableOpacity style={{ marginLeft: -15 }} onPress={() => {
          //navigation.navigate('Login');
          navigation.pop();
        }}>
          <Text style={{ color: '#609fe6', fontSize: 16, textAlign: 'left', marginLeft: 15, margin: 1, padding: 1, marginTop: 15 }}>Login Now</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>

  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#413e45',
    //alignItems: 'center',
    //justifyContent: 'center',
    //#413e45
  },
  welcomeText: {
    color: '#fffeff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: height * 0.25,
    textAlign: 'center',
    paddingBottom: 60,
    fontFamily: 'serif',
  },
  loginView: {
    flexDirection: 'row',
    //borderColor:'black'
  },
  /*textView: {
    flex : 1,
  },
  inputView: {
    flex : 2,
  },*/
  textInput: {
    color: 'white',
    fontSize: 15,
    //borderBottomColor: 'red',
    //borderBottomWidth: 2,
    borderColor: 'grey',
    //borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: 1.5,
    padding: 1,
    margin: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    color: '#99989c',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 15,
    //paddingBottom:10,
    margin: 1,
    padding: 1,
    marginTop: 15,
    //marginTop:22.5,
    //borderColor: "red",
    //borderWidth: 1,
  },
  /*passwordTextInput: {
    color: '#2f4f4f',
    fontSize: 18,
    //borderBottomColor: 'red',
    //borderBottomWidth: 2,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginRight:10,
    marginLeft:10,
    backgroundColor:'white',
  },*/
  // passwordText: {
  //   color: 'red',
  //   fontSize: 15,
  //   textAlign:'left',
  //   borderColor: "red",
  //   borderWidth: 1,
  // },
  buttonLogin: {
    fontSize: 22,
    padding: 10,
    margin: 10,
    borderRadius: 60,
    backgroundColor: '#609fe6',
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
    padding: 15,
    height: 52.5,
    width: 290,
    marginTop: 30,
  },
  buttonSignup: {
    fontSize: 22,
    padding: 10,
    margin: 10,
    borderRadius: 50,
    backgroundColor: '#e4af3f',
    color: 'white',
    fontWeight: 'bold',
    margin: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 15,
    height: 52.5,
    width: 290,
    alignItems: 'center',
  }
});
