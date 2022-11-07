import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import prices from "./priceData";
import ViewChart from "./ViewChart";
import { SvgUri } from "react-native-svg";
import { Pressable } from "react-native";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Prices = ({ theme }) => {
  const [priceData, setPriceData] = useState(prices);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [selCoin, setSelCoin] = useState(null);

  const apiUrl =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d30c9b20a1mshf7b0cf45d9eb8c4p1b1d51jsn7724536d9cb5",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const fetchPrices = async () => {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log(data);
    setPriceData(JSON.parse(data));
  };

  const fetchCryptoData = async () => {
    const response = await fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "0f800a5f-c8bf-4203-af43-2be688efeea2",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchPrices();
    // console.log(priceData);
    // fetchCryptoData();
  }, []);

  const showCoin = (coin) => {
    return (
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.coinCard}
        onPress={() => {
          setSelCoin(coin);
          setShowChart(true);
        }}
      >
        <View style={styles.coinDetails}>
          <View style={{ flex: 1 }}>
            <Text style={styles.coinName}>{coin.name}</Text>
            <Text style={styles.coinSymbol}>{coin.symbol}</Text>
          </View>
          {/* <Text style={styles.coinPrice}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(coin.price)}</Text> */}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.coinPrice}>
              ${Math.round(coin.price * 100) / 100}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ComIcon
                name={coin.change > 0 ? "arrow-up-thin" : "arrow-down-thin"}
                size={25}
                color={coin.change > 0 ? "green" : "red"}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: coin.change > 0 ? "green" : "red",
                }}
              >
                {Math.abs(coin.change)}
              </Text>
            </View>
          </View>

          {/* <Button
            icon="chevron-double-right"
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{ width: 140 }}
            onPress={() => console.log("Pressed")}
          >
            View More
          </Button> */}
        </View>
        <SvgUri
          width={styles.coinImage.width}
          height={styles.coinImage.height}
          uri={coin.iconUrl}
        />
        {/* <Text>{coin.iconUrl}</Text> */}
      </Pressable>
    );
  };

  const showPrices = () => {
    if (loading) return <ActivityIndicator animating={true} color="#000" />;
    return (
      <FlatList
        data={priceData.coins}
        renderItem={({ item }) => showCoin(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {Boolean(selCoin) && (
        <ViewChart
          open={showChart}
          setOpen={setShowChart}
          theme={theme}
          chartData={selCoin}
        />
      )}
      {showPrices()}
    </View>
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
  coinCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
  },
  coinDetails: {
    flex: 2,
  },
  coinImage: {
    // flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  coinName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  coinSymbol: {
    fontSize: 15,
    color: "#666",
  },
  coinPrice: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Prices;
