import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../HeaderCompnent';
export const Container = ({childern, style}) => {
  return <View style={{...styles.container, ...style}}>{childern}</View>;
};

// export const ContainerGradient = ({childern, style}) => {
//   return (
//     <LinearGradient
//       colors={['#91C7D6', '#CBE2DC']}
//       style={{...styles.containerGradient, ...style}}>
//       <HeaderCompnent />
//       {childern}
//     </LinearGradient>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerGradient: {flex: 1},
});
