import React from 'react';
import {View, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BoldLabel14, BoldLabel18} from '../Labels';
import {ModalBottomButton} from '../Buttons/Buttons';

const IDModal = ({visible, onPress, infoText, userName}) => {
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
            marginHorizontal: 24,
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 1,
            height: 202,
          }}>
          <View style={styles.centerArray}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <BoldLabel18
                text={userName}
                style={{color: '#000', fontWeight: 'bold'}}
              />
              <BoldLabel14
                style={{color: '#555', textAlign: 'center', fontWeight: '500'}}
              />
            </View>
            <View>
              <BoldLabel18 text={infoText} style={{color: '#46A0BD'}} />
            </View>
            <ModalBottomButton
              style={{
                background: '#94D2E9',
                marginBottom: 16,
                height: 35,
                color: '#fff',
                borderRadius: 10,
              }}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default IDModal;

const styles = StyleSheet.create({
  centerArray: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '38px 40px 16px 40px',
    paddingTop: 38,
    paddingBottom: 16,
    paddingHorizontal: 40,
    // marginBottom: width * 0.01,
  },
});
