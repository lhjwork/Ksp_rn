import React, {useEffect, useState} from 'react';
import {View, StyleSheet, BackHandler, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import RowView from '../../components/Views/RowView';
import {BoldLabel14, LabelNone} from '../../components/Labels';
import {useNavigation} from '@react-navigation/native';

const NotificationDetail = ({navigation, route}) => {
  // function handleBackButtonClick() {
  //   if (stage === 1) {
  //     console.log('Going back to previous screen!');
  //     // setStage(stage - 1);
  //     navigation.navigate('Notification');
  //     setStage(stage - 1);
  //     return true;
  //   } else if (stage < 1) {
  //     // navigation.goBack();
  //     return false;
  //   }
  //   // } else if (stage < 1) {
  //   //   return false;
  //   // }
  // }

  // useEffect(() => {
  //   // const backAction = () => {
  //   //   Alert.alert('Hold on!', '앱을 종료하시겠습니까?', [
  //   //     {
  //   //       text: '취소',
  //   //       onPress: () => null,
  //   //     },
  //   //     {text: '확인', onPress: () => BackHandler.exitApp()},
  //   //   ]);
  //   //   return true;
  //   // };
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };

  //   // return () => backHandler.remove();
  // }, [stage]);

  const {Date, Subject, Title} = route?.params?.item;
  let test = 123;
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled style={styles.whiteContainer}>
        <View style={styles.titleBox}>
          {/* <RowView
            style={{
              flex: 1,
              alignItems: null,
              paddingTop: 15,
            }}> */}
          <LabelNone
            text={Title}
            style={{
              color: '#555',
              fontSize: 18,
              lineHeight: 25,
              fontWeight: '500',
              paddingTop: 15,
            }}
          />
          {/* </RowView> */}
          <LabelNone text={Date} style={styles.date} />
        </View>
        <LabelNone text={Subject} style={styles.content} />
      </ContainerStyled>
    </LinearGradient>
  );
};

export default NotificationDetail;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 24,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#555',
  },
  titleBox: {
    marginHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  whiteContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
    elevation: 3,
  },
  date: {textAlign: 'right', marginTop: 9, color: '#46A0BD', marginBottom: 15},
});
