import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const Explore = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Text>Explore</Text>
      
      <Button title="Hiển thị thông báo" onPress={toggleModal} />

      {/* Modal thông báo */}
      <Modal
        animationType="fade" // Thay đổi từ "slide" thành "fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Đây là thông báo!</Text>
            <Button title="Đóng" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đảm bảo có background mờ
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Explore;
