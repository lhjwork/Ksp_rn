import React from 'react';
import { Modal, View } from 'react-native';

import { LabelNone } from '../Labels';

const ModaFrame = ({ isModalVisble, children }) => {
  return (
    <Modal visible={isModalVisble}>
      <View>{children}</View>
    </Modal>
  );
};

export default ModaFrame;
