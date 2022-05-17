import React from 'react';

import {Text, View, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import IMP from 'iamport-react-native';
import Loading from '../../components/Loading';
import {IMPCode} from '../../key';

const IamPortPaymentScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.auth);
  const {body, payMethod = 'card'} = route.params;

  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  function callback(res) {
    console.log('payment res', res);
    route.params.onComplete(res);
    if (res?.imp_success === true) {
      navigation.navigate('DrawerStack');
    }
    navigation.goBack();
  }

  const data = {
    pg: `html5_inicis`,
    pay_method: payMethod,
    name: `KSP`,
    merchant_uid: `merchant_${user?.sessionToken}_${new Date().getTime()}`,
    amount: `${body?.totalPrice}`,
    // amount: 100,
    buyer_name: `${body?.receiver}`,
    buyer_tel: `${body?.phone}`,
    buyer_email: `${user?.email}`,
    app_scheme: 'KSP',
    buyer_addr: `${body?.address}`,
  };

  return (
    <IMP.Payment
      userCode={IMPCode}
      loading={<Loading />}
      data={data}
      callback={callback}
    />
  );
};

export default IamPortPaymentScreen;
