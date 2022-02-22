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

const {height, width} = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

// class view extends Component {
const Scann = ({navigation}) => {
  const [QRurl, setQRurl] = useState('');
  const [isReactivate, setReactivate] = useState(false);
  const auth = useSelector(state => state.auth);
  const [iscameraTypeback, setIsCameraTypeback] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // 일단 주석 처리...............====================
    // 일단 주석 처리...............====================
    // 일단 주석 처리...............====================
    // 일단 주석 처리...............====================
    // if (Platform.OS === 'android') {
    //   // console.log(' 111 ');
    //   PermissionsAndroid.requestMultiple([
    //     PermissionsAndroid.PERMISSIONS.CAMERA,
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    //   ]).then(result => {});
    // 일단 주석 처리...............====================
    // 일단 주석 처리...............====================
    // 일단 주석 처리...............====================
    // }
  }, []);

  // render({navigation}) {
  //   const onSuccess = e => {
  //     Linking.openURL(e.data).catch(err =>
  //       console.error('An error occured', err),
  //     );
  //   };
  const onSuccess = e => {
    try {
      fetchQRCode(e.data, '외부');
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
        console.log(res);

        // console.log(res.assets[0].base64.slice(4, res.assets[0].base64.length));
        // // ImagePick(res.assets[0].base64.slice(4, res.assets[0].base64.length));
        // ImagePick(res.assets[0].base64);
        fetchQRCode(res?.assets[0]?.base64, '내부');
      })
      .catch(err => {
        console.log('ㅇㅇㅇㅇㅇ:', err);
      });
  };

  // const ImagePick = async url => {
  //   // console.log('이미지 url', url);
  //   await RNQRGenerator.detect({
  //     base64: url,
  //   })
  //     .then(response => {
  //       console.log(response);
  //       if (response.type !== 'QRCode') {
  //         Alert.alert('QR코드가 아닙니다');
  //         return;
  //       }
  //       console.log('return 값', response);
  //       console.log(response.values[0]);
  //       fetchQRCode(response.values[0], '내부');
  //     })
  //     .catch(error => {
  //       Alert.alert('이미지에서 QR 코드를 감지에 실패하였습니다.');
  //       console.log('Cannot detect QR code in image', error);
  //     });
  // };

  const fetchQRCode = async (Qr, name) => {
    let touchPoint;
    let endPoint = name === '내부' ? 'internalscan' : 'scan';
    let body = {sessionToken: auth.sessionToken, Qr: Qr};
    console.log(body);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await api.post(endPoint, JSON.stringify(body), config);
      if (res.data.Result === '터치콘 포인트가 부족합니다.') {
        Alert.alert(res?.data?.Result);
        // navigation.goBack();
        return;
      }
      if (res.data.Result === '이미 스캔된 쿠폰입니다.') {
        Alert.alert(res?.data?.Result);
        return;
      }
      if (res.data.Result !== 'success') {
        // navigation.navigate('ScanResult', {touchPoint: 10});
        Alert.alert(`${name}스캔 실패했습니다`);
        // navigation.goBack();
        return;
      }
      Alert.alert(`${name}스캔 성공하였습니다`);
      navigation.navigate('ScanResult', {touchPoint: res?.data?.Amount});
      console.log('Amount확인', res.data.Amount);
      //  navigation.navigate('ScanResult', {touchPoint: touchPoint});
      // navigation.goBack();
      // navigation.navigate(touchPoint, 'ScanResult');

      // console.log(res);
      // navigation.navigate('Wallet');
      // console.log('test', res.data.Result);
    } catch (err) {
      // Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
    }
  };

  return (
    <View>
      {/* -------- 1회 스캔한 큐알코드는~~~ start ------- */}
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
              <LabelNone text={'+1,200'} style={styles.ksPoint} />
              <LabelNone text={'KSP'} style={styles.kspUnit} />
            </RowView>
            <BottomButton
              text={'적립완료'}
              style={{width: 280, marginTop: 79}}
              onPress={() => setModalVisible(false)}
            />
          </ImageBackground>
        </View>
      </Modal>
      <QRCodeScanner
        cameraType={iscameraTypeback ? 'back' : 'front'}
        reactivate={true}
        showMarker={true}
        onRead={onSuccess}
        reactivateTimeout={3500}
        cameraStyle={{height: height - 50}}
        markerStyle={{
          marginTop: (width * 0.7) / -2,
          width: width * 0.7,
          height: width * 0.7,
        }}
      />

      <RowView
        style={{
          width: '100%',
          justifyContent: 'space-between',
          zIndex: 1,
          position: 'absolute',
          top: height * 0.8,
          paddingHorizontal: 24,
        }}>
        {/* 실제 내부스켄시 주석 풀기 ------------------------------------------------ */}
        {/* <TouchableOpacity onPress={() => internalScan()}> */}
        <TouchableOpacity
          onPress={() => {
            internalScan();
            setModalVisible(true);
          }}>
          <BoldLabel14 text={'내부스캔'} style={styles.textStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScannHistory');
          }}>
          <BoldLabel14 text={'히스토리'} style={styles.textStyle} />
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
