import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import RowView from './Views/RowView';
import Touchable from '../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderCompnent = ({navigation, onPerssDrawer}) => {
  return (
    <RowView style={styles.headerRow}>
      <Touchable>
        <AntDesign name={'left'} size={17} style={{marginLeft: 27.5}} />
      </Touchable>
      <Touchable onPress={onPerssDrawer}>
        <Image
          source={require('../asssets/icons/headerRight_more.png')}
          style={{marginRight: 27}}
        />
      </Touchable>
    </RowView>
  );
};

export default HeaderCompnent;

const styles = StyleSheet.create({
  headerRow: {justifyContent: 'space-between'},
});
