import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";

const Home = ({ app, navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            color: "#18162c",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Crypto News
        </Text>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "contain" }}
          source={{
            uri: "https://www.paymentsjournal.com/wp-content/uploads/2022/04/1661-scaled-e1649434277532.jpg",
          }}
        />
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: "https://img.freepik.com/free-vector/bitcoin-blockchain-digital-coin-crypto-currency-concept-background_1017-30307.jpg?w=2000",
              }}
            />
          </Card>

          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: "https://img.freepik.com/free-vector/bitcoin-blockchain-digital-coin-crypto-currency-concept-background_1017-30307.jpg?w=2000",
              }}
            />
          </Card>
        </View>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: "https://img.freepik.com/free-vector/bitcoin-blockchain-digital-coin-crypto-currency-concept-background_1017-30307.jpg?w=2000",
              }}
            />
          </Card>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: "https://img.freepik.com/free-vector/bitcoin-blockchain-digital-coin-crypto-currency-concept-background_1017-30307.jpg?w=2000",
              }}
            />
          </Card>
        </View>

        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={(e) => navigation.navigate("Prices")}
        >
          Prices
        </Button>
        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={(e) => navigation.navigate("News")}
        >
          News
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    // alignItems: "center",
    // width: "100%",
    // height: '50%',
  },
  card: {
    width: "40%",
    height: 200,
  },
});

export default Home;
