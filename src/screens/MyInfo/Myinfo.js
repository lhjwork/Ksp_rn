import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  BoldLabel14,
} from '../../components/Labels';
import {MyInfoInput} from '../../components/TxInput';
import RowView from '../../components/Views/RowView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Touchable from '../../components/Touchable';

const Data = [
  {id: 1, title: '이름', info: '김가명'},
  {id: 2, title: '휴대폰 번호', info: '01012341234'},
  {id: 3, title: '성별', info: '남'},
  {id: 4, title: '이메일', info: 'ksp123@gmail.com'},
  {id: 4, title: '아이디', info: 'ksp123'},
];

const Myinfo = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <View style={{marginHorizontal: 24.5}}>
        <BoldLabelTitle text={'내정보'} style={{marginTop: 27.5}} />
        {Data.map((menu, index) => (
          <View key={index}>
            <BoldLabel14
              text={menu?.title}
              style={{marginTop: 23, marginBottom: 9}}
            />
            <MyInfoInput text={menu?.info} />
          </View>
        ))}
        <Touchable onPress={() => navigation.navigate('passwordChange')}>
          <RowView style={styles.passwordText}>
            <BoldLabel14
              text={'비밀번호 변경하기'}
              style={{color: '#46A0BD', fonttWeight: '700'}}
            />
            <AntDesign
              name={'right'}
              size={9}
              style={{color: '#46A0BD', fontWeight: 'bold', padding: 9}}
            />
          </RowView>
        </Touchable>
      </View>
    </LinearGradient>
  );
};

export default Myinfo;

const styles = StyleSheet.create({
  passwordText: {justifyContent: 'flex-end'},
});
