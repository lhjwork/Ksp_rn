import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabelTitle} from '../../components/Labels';

const ScannHistory = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />
      <View style={{marginHorizontal: 24, flex: 1}}>
        <BoldLabelTitle text={'스캔 히스토리'} style={{marginTop: 27.5}} />
      </View>
    </LinearGradient>
  );
};

export default ScannHistory;
