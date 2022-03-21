import React, {Children, useState} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {BoldLabel14, LabelNone} from '../Labels';
import Touchable from '../Touchable';
import {ModalBottomButton} from '../Buttons/Buttons';

const TrueModalFrame = ({visible, onPress, infoText}) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: 9.5,
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 1,
            height: 155,
          }}>
          <View style={styles.centerArray}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <BoldLabel14
                text={infoText}
                style={{color: '#555', textAlign: 'center', fontWeight: '500'}}
              />
            </View>
            <ModalBottomButton
              text={'닫기'}
              style={{backgroundColor: '#94D2E9', marginBottom: 16}}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TrueModalFrame;

const styles = StyleSheet.create({
  centerArray: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
