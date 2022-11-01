import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const colors = [
  "#DC5F00",
  "#CF0A0A",
  "#E14D2A",
  "#001253",
  "#3E6D9C",
  "#B270A2",
  "#1A4D2E",
  "#4B5D67",
  "#151D3B",
  "#533535",
];
const randomColor = Math.floor(Math.random() * colors.length);

const HomeScreen = ({ navigation }) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [nom, setNom] = useState("");
  const data = [
    { nom: "Pause 5", duration: 5 },
    { nom: "Pause 10", duration: 600 },
    { nom: "Pause 15", duration: 900 },
  ];
  const convertSecToMin = (value) => value / 60;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.helloText}>
        <Text style={styles.helloText1}>Bon Retour {nom}!</Text>
        <Text style={styles.helloText2}>Dis-moi quelle pause tu prends</Text>
      </View>
      <View style={styles.pauseBtnContainer}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.pauseBtn}
              onPress={() => {
                setTime(item.duration);
                navigation.navigate("Chrono", {
                  duration: item.duration,
                });
              }}
            >
              <Text style={styles.textInTimerBtn1}>
                {convertSecToMin(item.duration)} min
              </Text>
              <Text style={styles.textInTimerBtn2}>{item.nom}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            paddingVertical: 50,
            opacity: 0.3,
          }}
        >
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Quel est ton nom?</Text>
              <TextInput
                onChangeText={(val) => setNom(val)}
                value={nom}
                placeholder="Entrer un nom"
                style={styles.modalInput}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setNom(nom);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.floatBtnContainer}>
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.floatBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: windowWidth,
    height: windowHeight,
    backgroundColor: "#fff",
    paddingVertical: windowHeight * 0.05,
  },
  helloText: {
    paddingTop: 30,
    paddingHorizontal: 10,
    // backgroundColor: "red",
  },
  helloText1: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 3,
  },
  helloText2: {
    fontSize: 16,
    fontWeight: "light",
  },
  pauseBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  textInTimerBtn1: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  textInTimerBtn2: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  pauseBtn: {
    backgroundColor: colors[randomColor],
    padding: 20,
    width: windowWidth * 0.45,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  floatBtnContainer: {
    position: "absolute",
    bottom: 0,
    padding: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  floatBtn: {
    width: 85,
    backgroundColor: colors[randomColor],
    padding: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  floatBtnText: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
  modalInnerContainer: {
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 300,
    height: 200,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  modalText: {
    color: "black",
    fontSize: 20,
    // fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
    marginLeft: 3,
  },
  modalInput: {
    width: 250,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "black",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    marginLeft: 3,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    width: 120,
    backgroundColor: colors[randomColor],
    padding: 15,
    marginHorizontal: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
