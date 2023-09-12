import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import * as firebase from "firebase";
import FormData from 'form-data';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

const PlaceholderImage = require('./assets/images/background-image.png');

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databseURL: "https://mobile-first-project-306ff-default-rtdb.firebaseio.com/",
  projectId: "mobile-first-project-306ff",
  storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

function componentDidMount() {
  var that = this;
  this.state.mUserRef.on("value", function(snapshot) {
    let data_1 = snapshot.val().images;
    that.setState({images: data_1});
  });
  
};

saveReadings = () => {
  var bodyData = new FormData();
  bodyData.append("images", this.state.images);

  fetch(
    "https://script.google.com/macros/s/AKfycbygrxiixwti0xCiwj-c070rZM9SFm8mHvm0lLTZhDA3hoieQfDEzbXkzz7wmuc1-fS1yA/exec",
    {
      method: "POST", body: bodyData,
    })
    .then((response) => response.text())
    .then((res) => {
      if (res == "Success") {
        Alert.alert("Great!", "readings saved", [{text: "done"}]);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export default function App() {
const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme = "primary" label ="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
});
