import React from 'react';

import {Text, View, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import IMP from 'iamport-react-native';
import Loading from '../../components/Loading';

const IamPortPaymentScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.auth);
  const {price, payMethod = 'card'} = route.params;

  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */

  function callback(res) {
    console.log('payment res', res);
    route.params.onComplete(res);
    // navigation.goBack();
  }

  const data = {
    // pg: `html5_inicis.MOIpetpo20`,
    pg: `html5_inicis`,
    pay_method: payMethod, // card: 신용카드, vbank: 가상계좌, trans: 실시간계좌이체
    name: `KSP 결제`,
    merchant_uid: `merchant_${user.id}_${new Date().getTime()}`,
    // amount: price,
    amount: 100,

    buyer_name: `${user?.koreanName}`,
    buyer_tel: `${user?.phoneNumber}`,
    buyer_email: `${user?.email}`,
    app_scheme: 'KSP',
    // app_scheme: 'FightMaster',
    // buyer_addr: "서울시 강남구 신사동 661-16",
    // buyer_postcode: "06018",
    // paid_amount: 0 // 실제 결제승인된 금액이나 가상계좌 입금예정 금액
  };

  return (
    <IMP.Payment
      userCode={IMP}
      // tierCode={'AAA'} // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 웹뷰 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  );
};

export default IamPortPaymentScreen;
