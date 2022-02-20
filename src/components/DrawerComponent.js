import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BoldLabelTitle, LabelNone, BoldLabel14} from './Labels';
import {ContainerStyled} from './StyledComponents/StyledComponents';
import Feather from 'react-native-vector-icons/Feather';

import RowView from './Views/RowView';

const DrawerComponent = () => {
  return (
    <ContainerStyled>
      <View style={styles.titleBox}>
        <Feather name={'x'} size={13.18} style={styles.xBtn} />
        <RowView style={styles.titleRow}>
          <Image
            source={require('../asssets/images/null_image.png')}
            resizeMode={'contain'}
            style={{width: 30, height: 30, marginBottom: 7}}
          />
          <BoldLabelTitle
            text={'김코나'}
            style={{color: '#46A0BD', marginLeft: 9}}
          />
          <BoldLabel14 text={'님,안녕하세요.'} style={{color: '#000'}} />
        </RowView>
        <LabelNone
          text={'kona123@gmail.com'}
          style={{
            color: '#000',
            fontWeight: '400',
            fontSize: 18,
            lineHeight: 22,
          }}
        />
      </View>
      <RowView style={styles.solidLine} />
    </ContainerStyled>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  solidLine: {
    height: 3,
    backgroundColor: '#E5E5E5',
    marginTop: 15,
  },
  titleRow: {marginTop: 30.4, marginBottom: 14},
  xBtn: {textAlign: 'right', padding: 5, color: '#46A0BD'},
  titleBox: {marginHorizontal: 24, height: 130.6},
  itemBox: {marginHorizontal: 24},
});
