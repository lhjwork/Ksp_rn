import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import RowView from './Views/RowView';
import Touchable from '../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderCompnent = ({
  navigation,
  onPerssDrawer,
  rightView,
  onPressLeftBtn,
}) => {
  return (
    <RowView style={styles.headerRow}>
      <Touchable onPress={onPressLeftBtn}>
        <AntDesign
          name={'left'}
          size={20}
          style={{marginLeft: 27.5, color: '#fff'}}
        />
      </Touchable>
      {rightView === false ? (
        <></>
      ) : (
        <Touchable onPress={onPerssDrawer}>
          <Image
            source={require('../asssets/icons/headerRight_more.png')}
            style={{marginRight: 27, height: 25, width: 25}}
          />
        </Touchable>
      )}
    </RowView>
  );
};

export default HeaderCompnent;

const styles = StyleSheet.create({
  headerRow: {
    justifyContent: 'space-between',
    marginTop: 26,
  },
});
