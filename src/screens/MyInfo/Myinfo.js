import React, {useState, useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import api from '../../api';

const Myinfo = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    getUserInfoList();
  }, []);

  const {sessionToken} = auth?.user;

  const getUserInfoList = async () => {
    try {
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = {sessionToken: sessionToken};
      const res = await api.post('userinfosend', JSON.stringify(body), config);
      console.log('===========res===========', res?.data);
      setUserInfo(res?.data);
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };

  const Data = [
    {id: 1, title: 'name', info: userInfo?.userInfo?.username},
    {id: 2, title: 'phoneumber', info: userInfo?.userInfo?.phone},
    {id: 3, title: 'gender', info: userInfo?.userInfo?.gender},
    {id: 4, title: 'email', info: userInfo?.userInfo?.email},
    {id: 4, title: 'id', info: userInfo?.userInfo?.loginId},
  ];

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <View style={{marginHorizontal: 24.5}}>
        <BoldLabelTitle style={{marginTop: 27.5}} />
        {Data?.map((menu, index) => (
          <View key={index}>
            <BoldLabel14
              text={menu?.title}
              style={{marginTop: 23, marginBottom: 9}}
            />

            <MyInfoInput />
          </View>
        ))}
        <Touchable onPress={() => navigation.navigate('passwordChange')}>
          <RowView style={styles.passwordText}>
            <BoldLabel14 style={{color: '#46A0BD', fontWeight: '700'}} />
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
