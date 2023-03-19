import React from 'react';
import { 
    StyleSheet, 
    ImageBackground
  } from 'react-native';

export default class Background extends React.Component {
  render() {
    return (
        <ImageBackground style={ styles.imgBackground } 
                resizeMode='cover' 
                // source={require('../../assets/images/background.png')}>
                //source={require('../../assets/images/bg2.png')}
                  >
                {this.props.children}
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 ,
    backgroundColor:"white"
  },  
});
