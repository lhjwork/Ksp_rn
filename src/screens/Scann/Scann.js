import React, {Component, useEffect, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Modal,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import RowView from '../../components/Views/RowView';
import {Platform, PermissionsAndroid} from 'react-native';
import Touchable from '../../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../../api';
import {resetAuth} from '../../../redux/authSlice';
import {useSelector} from 'react-redux';
import {BoldLabel14, LabelNone} from '../../components/Labels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {BottomButton} from '../../components/Buttons/Buttons';
import ColumnView from '../../components/Views/Column';
import {config} from '../../constant';
import ModalFrame from '../../components/Modals/ModalFrame';

const {height, width} = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

// class view extends Component {

const Scann = ({navigation}) => {
  const [amount, setAmount] = useState(0);
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const [iscameraTypeback, setIsCameraTypeback] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [isErrShow, setIsErrShow] = useState(false);

  const onSuccess = e => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
  const internalScan = async () => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };
    await launchImageLibrary(options)
      .then(res => {
        fetchQRCode(res?.assets[0]?.base64);
      })
      .catch(err => {});
  };

  const fetchQRCode = async (Qr, name) => {
    let endPoint = name === '' ? 'internalscan' : 'scan';
    let body = {sessionToken, Qr};
    console.log('scan body : ', body);
    try {
      const res = await api.post(endPoint, JSON.stringify(body), config);
      if (res?.data?.result === 'success') {
        await setAmount(res?.data?.amount);
        setModalVisible(true);
      }
    } catch (err) {
      if (err?.response?.data?.errMsg) {
        await setModalText(err.response.data.errMsg);
        setIsErrShow(true);
        return;
      }

      setIsErrShow(true);
    }
  };

  return (
    <View>
      <ModalFrame
        infoText={modalText}
        visible={isErrShow}
        onPress={() => setIsErrShow(false)}
      />

      <Modal
        visible={modalVisible}
        transparent
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
        <View style={styles.modalInsideBox}>
          <ImageBackground
            source={require('../../asssets/images/scann_modal_img.png')}
            style={{resizeMode: 'cover', flex: 1, alignItems: 'center'}}>
            <RowView style={styles.modalPointRowBox}>
              <LabelNone text={`+${amount}`} style={styles.ksPoint} />
              <LabelNone text={'KSP'} style={styles.kspUnit} />
            </RowView>
            <BottomButton
              style={{width: 280, marginTop: 79}}
              onPress={() => setModalVisible(false)}
            />
          </ImageBackground>
        </View>
      </Modal>
      <QRCodeScanner
        cameraType={iscameraTypeback ? 'back' : 'front'}
        reactivate={true}
        // showMarker={true}
        onRead={onSuccess}
        reactivateTimeout={3500}
        cameraStyle={{height: height - 50}}
        markerStyle={{
          marginTop: (width * 0.7) / -2,
          width: width * 0.7,
          height: width * 0.7,
        }}
      />

      <ColumnView
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          justifyContent: 'center',
          top: SCREEN_HEIGHT * 0.13,
        }}>
        <LabelNone
          style={{
            textAlign: 'center',
            marginBottom: 38,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: '400',
          }}
        />
        <ImageBackground
          source={require('../../asssets/images/ksp_scann_pointer.png')}
          resizeMode="contain"
          style={{
            height: SCREEN_WIDTH * 0.66,
            width: SCREEN_WIDTH * 0.66,
            textAlign: 'center',
          }}
        />
      </ColumnView>

      <RowView
        style={{
          width: '100%',
          justifyContent: 'space-between',
          zIndex: 1,
          position: 'absolute',
          top: height * 0.8,
          paddingHorizontal: 24,
        }}>
        <TouchableOpacity
          onPress={() => {
            internalScan();
          }}>
          <BoldLabel14 text={'내부스캔'} style={styles.textStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScannHistory');
          }}>
          <BoldLabel14 style={styles.textStyle} />
        </TouchableOpacity>
      </RowView>
    </View>
  );
};

export default Scann;

const styles = StyleSheet.create({
  kspUnit: {
    fontSize: 18,
    color: '#555',
    lineHeight: 22,
  },
  ksPoint: {fontSize: 36, color: '#46A0BD', lineHeight: 42},
  modalPointRowBox: {
    marginTop: 220,
    width: 300,
    justifyContent: 'space-between',
    paddingLeft: 42,
    paddingRight: 22,
  },
  modalInsideBox: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: 350,
    height: 425,
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.1,
  },
  textStyle: {fontWeight: '700', padding: 10},
});
