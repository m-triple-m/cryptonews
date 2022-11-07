import React from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import theme from "./theme";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { Image } from "react-native";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { SvgUri } from "react-native-svg";
import { Button } from "react-native-paper";
import { Linking } from "react-native";

const StyledChart = ({ children, chartTitle, data, type }) => {
  return (
    <View style={styles.styledChart.container}>
      <Text style={styles.styledChart.title}>{chartTitle}</Text>
      <BarChart
        isAnimated={true}
        data={data}
        barWidth={8}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={2}
        yAxisThickness={3}
        yAxisTextStyle={{ color: "#fff" }}
        xAxisTextStyle={{ color: "#fff" }}
        noOfSections={3}
        // maxValue={75}
      />
    </View>
  );
};

const ViewChart = ({ open, setOpen, chartData }) => {
  // console.log(chartData);
  return (
    <Modal visible={open} onRequestClose={() => setOpen(false)}>
      <View style={styles.container}>

        <View style={styles.coinCard}>
          <View style={styles.coinDetails}>
            <View style={{ flex: 1 }}>
              <Text style={styles.coinName}>{chartData.name}</Text>
              <Text style={styles.coinSymbol}>{chartData.symbol}</Text>
            </View>
            {/* <Text style={styles.coinPrice}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(coin.price)}</Text> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.coinPrice}>
                ${Math.round(chartData.price * 100) / 100}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ComIcon
                  name={chartData.change > 0 ? "arrow-up-thin" : "arrow-down-thin"}
                  size={25}
                  color={chartData.change > 0 ? "green" : "red"}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: chartData.change > 0 ? "green" : "red",
                  }}
                >
                  {Math.abs(chartData.change)} %
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
            uri={chartData.iconUrl}
          />
          
        </View>
        <Button
            icon="chevron-double-right"
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{marginVertical: 10}}
            onPress={async () => await Linking.openURL(chartData.coinrankingUrl)}
          >
            View Complete Info
          </Button>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={{fontSize: 30}}>Volume : </Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>$ {Math.round((chartData['24hVolume']/ 1000000000)*100)/100 } billion</Text>
          </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={{fontSize: 30}}>Market Cap : </Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>$ {Math.round((chartData['marketCap']/ 1000000000)*100)/100 } billion</Text>
          </View>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Past Performance
        </Text>
        <LineChart
          data={{
            labels: [...Array(10).keys()],
            datasets: [
              {
                data: chartData.sparkline.map((cap) => cap / 1000).slice(0, 10),
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={300}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  styledChart: {
    container: {
      padding: 30,
      borderRadius: 10,
      backgroundColor: "#222",
    },
    title: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
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
    fontSize: 40,
    fontWeight: "bold",
  },
  coinSymbol: {
    fontSize: 20,
    color: "#666",
  },
  coinPrice: {
    fontSize: 30,
    fontWeight: "bold",
    // marginTop: 20
  },
});

export default ViewChart;
