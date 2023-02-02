import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View , TouchableWithoutFeedback, Image} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, withSequence, Easing, withDelay} from 'react-native-reanimated';
import { useEffect, useReducer, useRef } from 'react';
import PrevButton from './PrevButtton';
import PauseButton from './PauseButton';
import NextButton from './NextButton';

const AnimatedBar = () => {
  const height = useSharedValue(10);
  const opacity = useSharedValue(0.5);

  const randomOffset = useRef(Math.random() * 1000).current;
  
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5),
        withTiming(1, {
          duration: 500,
          easing: Easing.linear,
        }),
        withTiming(0.5)
      ),
      -1,
      false
    );

    height.value = withDelay(randomOffset,withRepeat(
      withSequence(
        withTiming(10),
        withTiming(20, {
          duration: 500,
          easing: Easing.linear,
        }),
        withTiming(10)
      ),
      -1,
      false
    ))
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: height.value,
    }
  })

  return (
    <Animated.View style={[{width: 2, marginHorizontal:1, backgroundColor: "#1DB954"}, animatedStyle]}>
      </Animated.View>
  )
}

const arr = new Array(8).fill(0);

const AnimatedSound = () => {
  return (
<>
     {arr.map((_ : any, index:number) => {
       return (
         <AnimatedBar key={index} />
       )
     })}
</>
  )
}


export default function App() {
  const [isOpen, toggleOpen] = useReducer((state) => !state, false);

  const width = useSharedValue(200);
  const height = useSharedValue(40);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(width.value, {stiffness: 200, damping: 13, mass: 0.7}),
      height: withSpring(height.value, {stiffness: 200, damping: 16, mass: 0.5}),
    };
  });

  const imageWidth = useSharedValue(30);
  const imageHeight = useSharedValue(30);

  const animatedImageStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(imageWidth.value, {stiffness: 200, damping: 13, mass: 0.7}),
      height: withSpring(imageHeight.value, {stiffness: 200, damping: 16, mass: 0.5}),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        toggleOpen();
        width.value = width.value === 200 ? 320 : 200;
        height.value = height.value === 40 ? 180 : 40;
        imageWidth.value = imageWidth.value === 30 ? 60 : 30;
        imageHeight.value = imageHeight.value === 30 ? 60 : 30;
      }}>
        <Animated.View style={[styles.island, animatedStyle]}>
          <View style={{
            height: isOpen ? "auto" :"100%", 
            marginHorizontal: 5,
            paddingHorizontal: isOpen ? 10 : 0,
            paddingVertical: isOpen ? 20 : 0,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}>
            <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 5}}>
              <Animated.Image 
                source={{uri: "https://i.scdn.co/image/ab67616d00004851af52c228c9619ff6298b08cd"}} 
                style={[styles.image, animatedImageStyles]}
              />
              {isOpen ?
              <View>
                <Text style={{color: "white", fontWeight: "bold"}}>Feel It Still</Text>
                <Text style={{color: "white", fontWeight: "200", fontSize: 12}}>Portugal, The Man</Text>
              </View>
              :
              null
            }
            </View>
            <View style={{width: 40, height: 28, marginVertical: 5, flexDirection: "row", alignItems: "center"}}>
              <AnimatedSound />
            </View>
          </View>
          {isOpen ?
          <View style={{paddingHorizontal: 12}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{color: "gray", fontSize: 12}}>1:22</Text>
              <View style={{height: 5, flex: 1, backgroundColor: "gray", borderRadius: 10, overflow : "hidden", marginHorizontal: 10}}>
                <View style={{width: "50%", height: "100%", backgroundColor: "white"}}></View>
              </View>
              <Text style={{color: "gray", fontSize: 12}}>-1:20</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "center", marginVertical: 20}}>
              <PrevButton color="white" />
              <PauseButton color="white" style={{marginHorizontal: 10}}/>
              <NextButton color="white" />
            </View>
          </View>
          :
          null
          }
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  island: {
    backgroundColor: "#141414",
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
    marginRight: 10,
  }
});
