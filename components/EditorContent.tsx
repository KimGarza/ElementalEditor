import { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ImageCtx } from './ImageSelection/ImageCtx';

import PhotoSelectTool from './ImageSelection/PhotoSelectTool';
import DrawTool from './Drawing/DrawTool';
import StickerTool from './Stickers/StickerTool';
import StickerMenu from './Stickers/StickerMenu';

import StyledIconContainer from './styledIconContainer';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { DrawCtx } from './Drawing/DrawCtx';
import { StickerCtx } from './Stickers/StickersCtx';


const EditorContent = () => {
    
    const { imagesData } = useContext(ImageCtx);
    const { drawingData } = useContext(DrawCtx);
    const { stickers } = useContext(StickerCtx);

    const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);

    // call back to be handled as prop value upon using the stickerTool comp
    const handleToggleStickerMenu = () => {
      setStickerMenuToggle(!stickerMenuToggle);
      console.log("menu toggle", !stickerMenuToggle);
    }

return (
  <View style={styles.screenContainer}>

    <Image style={styles.headerImg} // later use screenOptions?
      source={require('../assets/images/ElementalEditorBanner.png')}
    />

    <View style={styles.screenContainer}>

      <View style={styles.canvasContainer}>

        {/* PHOTOS */}
        {imagesData.length > 0 &&
          <View style={styles.canvas}>
            {imagesData.map((imageCtx, index) => (
              <View>
                {/* image will need to have set default randomized scattered location data, and if user moves it, that will be updated location data top/left 
                Thinking that I will make an Image object and it will contain an imageInfo and top, left values. if the imageInfo in the particular object matches 
                this index here it will use the corresponding top and left data. Can't jsut add it to image info bc that has known specific data */}
                <Image 
                  key={ index }
                  source={{ uri: imageCtx.imageInfo.uri }}
                  style={{ 
                    width: 100, height: 100, 
                    flexDirection: 'column', // idk why but this helps with the scattering
                    top: `${imageCtx.top}%`,
                    left: `${imageCtx.left}%` }} 
              />  
              </View>
            ))}
          </View>
        }

        {/* STICKERS - where they show up after selection, this is not the sticker toolbar*/}
        {/* <View>
          {stickers.map((stickerCtx, index) => ( // review everything here
            <View>
                <Image
                  key={ index }
                  source={{ uri: stickerCtx.sticker.uri }}
                  style={{
                    width: 50, height: 50, 
                    flexDirection: 'column', // idk why but this helps with the scattering
                    top: `${stickerCtx.top}%`,
                    left: `${stickerCtx.left}%` }} 
                    />
            </View>
          ))}
        </View> */}

          <StickerMenu/>
      </View>

      <View style={styles.editorTools}>
        {/* STICKER SELECTION MENU either this or editor toolbar*/}
        {stickerMenuToggle ? (
          <View>
            <Text>STICKER OPTIONS WILL COME FROM A FILE DIR OF PHOTOS</Text>
          </View>
          ) : (
            <StyledIconContainer>

              <PhotoSelectTool>
                <Fontisto name='photograph' size={35}/> 
              </PhotoSelectTool>
              
              <Ionicons name='image-outline' size={35}/>

              <DrawTool>
                <SimpleLineIcons name='pencil' size={35}/>
              </DrawTool>

              <Feather name='layout' size={35}/>

              <StickerTool menuToggle={handleToggleStickerMenu}>
                <Octicons name='smiley' size={35}/>
              </StickerTool>
                            
            </StyledIconContainer>
            )}

        </View>
      </View>
    </View>
  );
}
      
export default EditorContent;

const styles = StyleSheet.create({
    headerImg: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      top: '10%',
    },
    screenContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    canvasContainer: {
      position: 'absolute',
      top: '11%',
      borderColor: 'blue',
      borderWidth: 2,
      height: '59%',
      width: '100%'
    },
    canvas: { // we must consider canvas container has  weird position so top height and width of each photo in canvas will be randomized to try and keep random but sort of central
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 10,
      position: 'absolute',
      overflow: 'hidden',
      height: '100%', // 100% of parent which is canvas container
      width: '100%', // 100% of parent which is canvas container
    },
    editorTools: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 50,
      rowGap: 15,
      top: '130%',
      borderTopWidth: 1,
      padding: 15,
    },
    stickerMenu: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 50,
      rowGap: 15,
      top: '130%',
      borderTopWidth: 1,
      padding: 15,
    },
  });
  