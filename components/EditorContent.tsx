// react & expo
import { useContext, useState, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native';
// context
import { ImageCtx } from './ImageSelection/ImageCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
// editing tools and menus
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import DrawUtil from './Drawing/DrawUtil';
import ViewImageTools from './views/viewImageTools';
import FilterMenu from './Filters/FilterMenu';
import SaveWorkButton from './save/saveWorkButton';
import HomeButton from './utils/homeButton';
// misc
import ViewEditorTools from './views/viewEditorTools';
import ViewStickers from './views/viewStickers';
import { StickerCtx } from './Stickers/StickersCtx';
import ViewImages from './views/viewImages';
import { Dimensions } from 'react-native';
import SaveMenu from './save/saveMenu';


// PUT ALL THIS IN A CONTEXT PROVIDER FOR EDITOR CONTENT
  // obtaining screen width and height dimensions dynamically using a specified aspect ratio to contrain canvas size.
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const aspectRatio = 9/14.5; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
  const canvasHeight = width / aspectRatio;
  var headerHeight = 0;
  var toolbarHeight = 0;
  if (headerHeight) { toolbarHeight = height - canvasHeight - headerHeight;}

const EditorContent = () => {

  // contexts provided to EditorContent
  const { stickers } = useContext(StickerCtx);
  const { imagesData } = useContext(ImageCtx);
  const { background } = useContext(BackgroundCtx);
  // menus
  const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
  const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);
  const [ drawMenuToggle, setDrawMenuToggle ] = useState<boolean>(false);
  const [ filterMenuToggle, setFilterMenuToggle ] = useState<boolean>(false);
  // const [toggleSaveMenu, setToggleSaveMenu] = useState<boolean>(false);

  // misc
  const [ activeImageToEdit, setActiveImageToEdit ] = useState<ImageData | null>(null);
  const viewRef = useRef(null); // this ref will be used to capture the canvasContainer elemenet

  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
  }
  interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }

  // Menu Callbacks
  const handleToggleStickerMenuCallback = () => {
    setStickerMenuToggle(!stickerMenuToggle);
  }

  const handleToggleBackgroundMenuCallback = () => {
    setBackgroundMenuToggle(!backgroundMenuToggle);
  }

  const handleToggleDrawMenuCallback = () => {
    setDrawMenuToggle(!drawMenuToggle);
  }

  const handleToggleFilterMenuCallback = () => {
    setFilterMenuToggle(!filterMenuToggle);
    console.log("menu toggle for filter actiavated");
  }

  const handleImageTapToEdit = (image: ImageData | null) => {
    setActiveImageToEdit(image);
  }

  // gets the height of the header image
  const handleLayout = (event: LayoutChangeEvent) => {
    headerHeight = event.nativeEvent.layout.height;
    console.log("header image height: ", headerHeight)
    console.log("header height: ", headerHeight)

  }

  console.log("height: ", width)
  console.log("height: ", canvasHeight)
return (
  <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav} onLayout={handleLayout}>
      <Image
        style={styles.headerImg}
        source={require('../assets/images/ElementalEditorBanner.png')}
      />
        <HomeButton/>
        {/* pass the capture ref which captures the view canvas container to be passed, for saving this particular element */}
        <SaveWorkButton viewRef={viewRef.current}/> 
    </View>

    {/* main canvas */}
    <View style={styles.canvasContainer} ref={viewRef}>
      
    <ImageBackground 
          source={background}
          style={styles.imageBackground}>

        <View style={styles.canvas} >
         
            {/* Stickers */}
            <ViewStickers stickers={stickers}/>

            {/* Drawing */}
            {drawMenuToggle && <DrawUtil isDrawing={drawMenuToggle}/>}

            {/* Pictures */}
            <ViewImages images={imagesData} activeImage={handleImageTapToEdit}/>

        </View>
        </ImageBackground>

    </View>
       
    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
    {/* specific tool menus */}
    {/* {!toggleSaveMenu && ( */}
    { 1 + 1 == 2 && (
      activeImageToEdit == null ? (
        stickerMenuToggle ? (
          <StickerMenu menuToggle={handleToggleStickerMenuCallback}/>
        ) : backgroundMenuToggle ? (
          <BackgroundMenu menuToggle={handleToggleBackgroundMenuCallback}/>
        ) : (
          // primary tools
      <View style={styles.primaryTools}>
        <ViewEditorTools
          backgroundMenuToggle={handleToggleBackgroundMenuCallback} 
          drawMenuToggle={handleToggleDrawMenuCallback}
          stickerMenuToggle={handleToggleStickerMenuCallback}
        />
      </View>
    )
  ) : filterMenuToggle ? (
    <FilterMenu menuToggle={handleToggleFilterMenuCallback} activeImage={activeImageToEdit}/>
  ) : (
    <ViewImageTools filterMenuToggle={handleToggleFilterMenuCallback} />
  )
)}
    </View>
  );
}
      
export default EditorContent;

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    width: width,
    height: '100%', // this is the only way to actually get 100% accuracy so far
    // height: screenHeight - 50, // see top where screenHeight is created for more details
  },
  headerNav: {
    width: width,
    zIndex: 9999,
    position: 'relative',
    height: 50 // so headerImageHeight is logging as 100 but when using that for here it makes everthing go way up
  },
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  canvasContainer: {
    height: canvasHeight,
    width: width,
    position: 'relative',
    zIndex: 1
  },
  canvas: { // we must consider canvas container has  weird position so top height and width of each photo in canvas will be randomized to try and keep random but sort of central
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderTopWidth: 3, borderColor: 'green',
    gap: 10,
    position: 'absolute',
    overflow: 'hidden',
    height: '100%', // 100% of parent which is canvas container
    width: '100%', // 100% of parent which is canvas container
    zIndex: 1
  },
  imageBackground: {
    width: '100%', height: '100%', 
    flexDirection: 'column',
    position: 'relative',
    zIndex: -1
  },
  primaryTools: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: width,
    height: height - canvasHeight - headerHeight - 100, // WHY THE 100 OMG
    gap: 30,
    zIndex: 99999,
    padding: 15,
    borderTopWidth: .5, borderColor: 'black',
  },
});
  