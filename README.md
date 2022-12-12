# Chat-App

![Simulator Screen Shot - iPhone 14 Pro - 2022-12-12 at 17 01 40](https://user-images.githubusercontent.com/79291013/207107598-5f65e263-eac4-475d-8bcb-3c7c29330378.png)

# App overview

This app provides users with a chat interface for both IOS and Android. Users are able to upload images, location and take photos.

# Built with
- React Native
- Google Firebase

- Expo

# Key Features
- Users can enter their name and choose a background color for the chat screen before joining the chat.
- Chat can also send location and images
- Chat data is stored online and offline.

# Set up

- Install Expo: npm install expo-cli -g
- Install [Android Studio](https://developer.android.com/studio)
- (Mac OS only) Install Xcode
- Install the Expo app on your phone - Avaiable on the App store or Google Play Store

# Database configuration

This project uses [Google Firebase](https://firebase.google.com)

1. Sign in and click "Go to console"

2. Click create project and fill in the basic information. Choose to start in test mode.

3. Start a collection, in this case the collection is 'messages'

4. Next for Document ID Firestore will generate a random string for your document ID

5.Install Firestore via Firebase in your project: npm install firebase

6. Import Firestore into your App.js File: 

const firebase = require('firebase');
require('firebase/firestore');

7. Back in the Firestore project in your browser, open up your “Project Settings” (by clicking on the gear icon). Under the General tab, you’ll find a section called Your apps, which is where you can generate configurations for different platforms. Click the Firestore for Web button (it may be shown as the </> icon). 

8. Copy the contents of the config object (from { apiKey:… to messagingSenderId:…}) in this modal, which will look similar to the code below:

```
const firebaseConfig = {

    apiKey: "AIzaSyCYhM7ZWoVZLLUD5xzpcepyID3B5w1sfuE",
    
    authDomain: "test-8b82a.firebaseapp.com",
    
    databaseURL: "https://test-8b82a.firebaseio.com",
    
    projectId: "test-8b82a",
    
    storageBucket: "test-8b82a.appspot.com",
    
    messagingSenderId: "202131758796"
    
  }
  
  if (!firebase.apps.length){
  
  firebase.initializeApp(firebaseConfig);
  
  }
  
  ```
  
  NOTE: You need to copy the configuration info from your own Firestore database—otherwise, your app won’t be able to connect!

 9. Create a reference to the Firestore collection:
```
this.referenceMessages = firebase.firestore().collection('*Change to your collection name*');
```


# Dependencies
    "@expo/react-native-action-sheet": "^4.0.1",
    "@react-native-async-storage/async-storage": "~1.17.3",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "9.3.5",
    "@react-navigation/native": "^6.0.16",
    "@react-navigation/stack": "^6.3.7",
    "expo": "~47.0.8",
    "expo-image-picker": "~14.0.2",
    "expo-location": "~15.0.1",
    "expo-permissions": "~14.0.0",
    "expo-status-bar": "~1.4.2",
    "firebase": "^7.9.0",
    "react": "18.1.0",
    "react-native": "0.70.5",
    "react-native-actions-sheet": "^0.8.10",
    "react-native-gesture-handler": "~2.8.0",
    "react-native-gifted-chat": "^1.0.4",
    "react-native-reanimated": "~2.12.0",
    "react-native-safe-area-context": "4.4.1",
    "react-native-screens": "~3.18.0",
    "react-navigation": "^4.4.4",
    "react-native-maps": "1.3.2"
