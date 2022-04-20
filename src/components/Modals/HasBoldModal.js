import React from 'react';

import {Modal, StyleSheet, Text, View} from 'react-native';
import {BoldLabel14, BoldLabel18} from '../Labels';
import {ModalBottomButton} from '../Buttons/Buttons';

const HasBoldModal = ({
  visible,
  onPress,
  oneText,
  twoText,
  threeText,
  color,
  boldColor,
  infoText,
}) => {
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
            height: 155,
          }}>
          <View style={styles.centerArray}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {oneText && (
                <BoldLabel14
                  text={oneText}
                  style={{color: color ? color : '#555'}}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {twoText && (
                  <BoldLabel18
                    text={twoText}
                    style={{color: boldColor ? boldColor : '#555'}}
                  />
                )}
                {threeText && (
                  <BoldLabel14
                    text={threeText}
                    style={{color: color ? color : '#555'}}
                  />
                )}
              </View>
            </View>
            <ModalBottomButton
              text={infoText ? infoText : '닫기'}
              style={{backgroundColor: '#94D2E9', marginBottom: 16}}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HasBoldModal;
const styles = StyleSheet.create({
  centerArray: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
