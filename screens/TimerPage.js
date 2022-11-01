import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CountDown from "react-native-countdown-component";

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

const TimerPage = ({ route, navigation }) => {
  const ONE_SECOND_IN_MS = 500;
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];
  const { duration } = route.params;
  const [time, setTime] = useState(duration);
  const TIME_TO_STOP = time + 10000;
  const onReset = () => {
    setTime(0);
    navigation.navigate("Home");
  };

  const warningVibrate = () => {
    Alert.alert("Avertissement", "Vous avez moins de 2 minutes", [
      {
        text: "OK, je vois",
        onPress: () => {
          Vibration.cancel();
        },
        style: "cancel",
      },
    ]);
    Vibration.vibrate(PATTERN, true);
  };
  const endVibrate = () => {
    Vibration.vibrate(PATTERN, true);
    Alert.alert(
      "Houhhh! C'est la fin",
      "Votre pause a terminé, j'espère que vous êtes pas en retard.",
      [
        {
          text: "Finir Pause",
          onPress: () => {
            Vibration.cancel();
            // onReset();
          },
          style: "cancel",
        },
      ]
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingVertical: 20,
      }}
    >
      <Text style={styles.text1}>L'horloge tourne!!!</Text>
      <Text style={styles.text2}>Veillez à ne pas dépasser le temps😉😉😉</Text>
      <CountDown
        until={time === 0 ? 0 : time}
        onFinish={() => {
          endVibrate();
          setTimeout(() => {
            Vibration.vibrate();
          }, TIME_TO_STOP);
        }}
        // onPress={() => alert("hello")}
        size={30}
        timeToShow={["H", "M", "S"]}
        showSeparator
        running={time === 0 ? false : true}
        digitStyle={{ backgroundColor: colors[randomColor] }}
        digitTxtStyle={{ color: "#FFF" }}
        style={styles.countDown}
        onChange={(e) => {
          e === 121 ? warningVibrate() : console.log(e);
        }}
      />
      <View>
        <TouchableOpacity style={styles.pauseBtn} onPress={onReset}>
          <Text style={styles.textStyle}>Finir Pause</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerPage;

const styles = StyleSheet.create({
  text1: {
    paddingTop: 30,
    paddingHorizontal: 10,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 30,
    textAlign: "center",
    width: "100%",
  },
  text2: {
    paddingHorizontal: 10,
    fontSize: 22,
    // letterSpacing: ,
    lineHeight: 30,
    textAlign: "center",
    width: "100%",
  },
  countDown: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 30,
  },
  pauseBtn: {
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
