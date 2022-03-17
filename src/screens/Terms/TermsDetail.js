import React from 'react';
import {View, ScrollView} from 'react-native';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, BoldLabelTitle} from '../../components/Labels';

const TermsDetail = ({navigation, route}) => {
  console.log('route', route);
  const {title, content} = route?.params;
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <HeaderCompnent
        onPressLeftBtn={() => navigation.goBack()}
        antStyle={{color: '#000'}}
        rightView={false}
      />
      <View style={{marginHorizontal: 24}}>
        <BoldLabelTitle
          text={title}
          style={{marginTop: 27.5, marginBottom: 23}}
        />
        <BoldLabel14 text={content} style={{color: '#555'}} />
      </View>
    </ScrollView>
  );
};

export default TermsDetail;
