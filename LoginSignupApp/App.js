import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, LogBox, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
//import Toast from 'react-native-simple-toast';
import Signup from './Signup';

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;
function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const postCredential = async () => {
    try{
    if(!email){
      Alert.alert("Please enter email..", "It should of type exmaple@domain.com")
    }
    // else if(email){
    //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //   if (reg.test(email) === false){
    //     Alert.alert("Enter Valid Email...")
    //   }
    // }
    else if(!password){
      Alert.alert("Please enter password...")
    }
    else{
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(email) === false){
        Alert.alert("Enter Valid Email...", "It should of type exmaple@domain.com")
      }
      else{
        let res = await fetch("http://192.168.1.47:8000/user/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    })
    let d = await res.json()
    Alert.alert('Welcome '+ d.data.name) 
      }
  }
}
  catch(e) {
    console.log(e.message, "eeeeeeeeeeeee")
    Alert.alert("Unable to find any user with these credentials!")
  }
    // .then(res=>res.json())
    // .then(async (js) => {
    //   Alert.alert('Welcome '+ js.data.name)
    // })
    // .catch((err)=>{
    //   Alert.alert(error);
    // })
    //}
  }

  return (
    <ScrollView style={styles.container}>
      {/*<View style={styles.container}>*/}
      <View style={{marginTop:height*0.3, marginBottom:60, alignItems:'center', flexDirection:'row'}}>
        <Image source={require('./Chatify.png')} style={{padding:20,marginTop:20, marginLeft:0.17*width, alignSelf:'center', marginTop:20, height:15,width:100, resizeMode:'contain', alignItems:'center'}} />
        <Image source={require('./iconChatify2.png')} style={{padding:20, marginTop:25, height:15,width:20, resizeMode:'contain', alignItems:'center'}} />
      </View>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} placeholder="Your Email" placeholderTextColor='#5c5c5c'
        onChangeText={(text) => setEmail(text)}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput} placeholder="Your Password" placeholderTextColor='#5c5c5c'
        secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
        <View style={{alignItems:'flex-end', marginTop:-12.5, marginRight:15}}>
        <Text style={styles.text}>Forgot Password?</Text>
        </View>
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

      <TouchableOpacity style={styles.buttonLogin} onPress={() =>{
        //Alert.alert("Loggin in.. wait...")
        postCredential();
      }}>
        <Text style={{color:'white', fontSize:18, textAlign:'center', fontWeight:'bold', justifyContent:'center'}}>
          LOGIN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignup} onPress={() =>{
        navigation.navigate('Signup');
      }}>
        <Text style={{color:'white', fontSize:16.5, textAlign:'center', fontWeight:'bold', justifyContent:'center'}}>
          NO ACCOUNT YET? SIGNUP NOW
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    {/*</View>*/}
    </ScrollView>
    
  );
}

const stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={Login} options={{headerShown: false, headerBackAccessibilityLabel:true}}/>
        {/*<stack.Screen name="Signup" component={Signup} options={{headerShown: true, headerTitle:false, headerStatusBarHeight:0, headerStyle:{backgroundColor:'#413e45'}}}/> */}
        <stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

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
    marginTop : height*0.25,
    textAlign: 'center',
    paddingBottom:60,
    fontFamily:'serif',
  },
  loginView: {
    flexDirection:'row',
    //borderColor:'black'
  },
  textView: {
    flex : 1,
  },
  inputView: {
    flex : 2,
  },
  textInput: {
    color: 'white',
    fontSize: 16,
    //borderBottomColor: 'red',
    //borderBottomWidth: 2,
    borderColor: 'grey',
    //borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth:1.5,
    padding: 2,
    margin:2,
    marginLeft:15,
    marginRight:15,
  },
  text: {
    color: '#99989c',
    fontSize: 18,
    textAlign:'left',
    marginLeft: 15,
    //paddingBottom:10,
    margin: 1,
    padding: 2,
    marginTop:15,
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
    padding:10,
    margin:10,
    borderRadius:60,
    backgroundColor:'#609fe6',
    color:'white',
    fontWeight: 'bold',
    alignSelf:'center',
    margin: 20,
    padding:15,
    height:52.5,
    width:290,
    marginTop:30,
  },
  buttonSignup: {
    fontSize: 22,
    padding:10,
    margin:10,
    borderRadius:50,
    backgroundColor:'#e4af3f',
    color:'white',
    fontWeight: 'bold',
    margin: 20,
    marginTop:20,
    alignSelf:'center',
    padding:15,
    height:52.5,
    width:290,
    alignItems:'center',
  }
});
