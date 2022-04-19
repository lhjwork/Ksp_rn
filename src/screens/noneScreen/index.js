import React from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';
import {BoldLabel14, NormalLabel14} from '../../components/Labels';
import Touchable from '../../components/Touchable';
import {HOMEPAGE_URL} from '../../asssets/Data/Data';
const {width} = Dimensions.get('window');

const NoneScreen = ({text}) => {
  const openURL = () => {
    Linking.openURL(HOMEPAGE_URL);
  };
  return (
    <View style={styles.container}>
      <View />
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.image}
          source={require('../../asssets/images/noneIcon.png')}
          resizeMode={'contain'}
        />
        <NormalLabel14 text={text} style={{color: '#fff'}} />
      </View>
      <Touchable
        style={styles.shoppingButton}
        onPress={() => {
          openURL();
        }}>
        <BoldLabel14
          text={'코나 쇼핑몰 바로가기'}
          style={{color: '#46A0BD', textAlign: 'center'}}
        />
      </Touchable>
    </View>
  );
};

export default NoneScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 24,
  },
  shoppingButton: {
    borderWidth: 1,
    borderColor: '#46A0BD',
    borderRadius: 30,
    backgroundColor: '#fff',
    width: width - 48,
    paddingVertical: 13,
    marginBottom: 70,
  },
});
