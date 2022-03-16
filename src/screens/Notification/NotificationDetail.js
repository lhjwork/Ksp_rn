import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import RowView from '../../components/Views/RowView';
import {BoldLabel14, LabelNone} from '../../components/Labels';

const NotificationDetail = () => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled style={styles.whiteContainer}>
        <View style={styles.titleBox}>
          <RowView
            style={{
              flex: 1,

              alignItems: null,
              paddingTop: 15,
            }}>
            <LabelNone
              text={'코나 쇼핑몰 신규 제휴 브랜드 안내를 '}
              style={{
                color: '#555',
                fontSize: 18,
                lineHeight: 25,
                fontWeight: '500',
              }}
            />
          </RowView>
          <LabelNone text={'2022.01.01'} style={styles.date} />
        </View>
        <LabelNone text={'안녕하십니까.'} style={styles.content} />
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
  },
  titleBox: {
    height: 99,
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
