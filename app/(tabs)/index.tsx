import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';
import domtoimage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';


const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {

  const imageRef = useRef(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


  const [selectedImage, setSelectedImage] = useState <string | undefined>
  (undefined);

const [shpwAppOptions, setShowAppOptions] = useState<boolean>(false);
const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
const [pickedEmoji, setPickedEmoji] = useState <string | undefined>
(undefined);

useEffect(() => {
  if (!permissionResponse?.granted) 
  requestPermission();
  }, [])
   

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
    console.log(result);
  } else {
    alert('You did not select any image.');
  }

};

  const onReset = () => {
    setShowAppOptions(false);
  };

const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

const ponSaveImageAsync = async () => {
  if (Platform.OS === 'web') {
    try {
      if (imageRef.current) {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        const link = document.createElement('a');
        link.download = 'image';
        link.href = dataUrl;
        link.click();
      } else {
        console.log('imageRef.current is null');
      }
    } catch (e) {
      console.log('Error saving image in web:', e);
    }
  } else {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved Successfully!');
      }
    } catch (e) {
      console.log('Error saving image in mobile:', e);
    }
  }
};
 

  return (
    <View style={styles.container}>
      <View collapsable ={false} ref= {imageRef} style={{}}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>
        )}
      </View>
      {shpwAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={ponSaveImageAsync} />
          </View>  
        </View>
         ) : (
      <View style={styles.footerContainer}>
        <Button 
        onPress ={pickImageAsync}
        label="Choose a photo" theme='primary' />
        <Button label="Use this photo" onPress = {() => setShowAppOptions (true)} />
      </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',          
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    marginTop: 35,
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 40, 
    borderColor: '#7D2A9B', 

  },
  optionsRow: {
     alignItems: 'center',
     flexDirection: 'row',
   
  },

});
