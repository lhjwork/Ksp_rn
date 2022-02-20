import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabelTitle} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {AmountInput, NoneInput} from '../../components/TxInput';
import {SmallButton} from '../../components/Buttons/Buttons';

const StackingApply = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPressLeftBtn={() => navigation.goBack()}
        onPerssDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{marginHorizontal: 24}}>
          <BoldLabelTitle
            text={'KSP - 스테이킹 신청'}
            style={{marginTop: 27.5, marginBottom: 33}}
          />
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{flex: 1}}
              rightText={'KSP'}
              placeholder="수량을 입력해주세요."
              textStyle={{marginLeft: 19}}
            />
            <SmallButton style={styles.button} text={'계산'} />
          </RowView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default StackingApply;

const styles = StyleSheet.create({
  button: {marginLeft: 5},
});
