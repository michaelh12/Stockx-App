import React from 'react';
const formatter = require('numeral');
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import { PricingCard } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { MonoText } from '../../components/StyledText';

export default class PortfolioScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = (item, _) => item.id.toString();
  _numberFormater = item => {
    const number = item;
    return number.toLocaleString();
  };

  render() {
    const { data } = this.props;
    let sumCost = 0;
    data.forEach(item => {
      sumCost += item.startPrice * item.qty;
    });
    return (
      <View style={styles.container}>
        {/* header for list */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.listHeader}>Symbol</Text>
          <Text style={styles.listHeader}>Quantity</Text>
          <Text style={styles.listHeader}>Price</Text>
          <Text style={styles.listHeader}>Cost</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            // container row-view
            <View style={styles.rowViewContainer}>
              {/* symbol column view */}
              <View style={styles.columnView}>
                <Text style={styles.alphaText}>
                  {item.symbol.toUpperCase()}
                </Text>
              </View>
              {/* {qty column view} */}
              <View style={styles.columnView}>
                <Text style={styles.numericText}>
                  {formatter(item.qty).format('0,0')}
                </Text>
              </View>
              {/* price column view */}
              <View style={styles.columnView}>
                <Text style={styles.numericText}>
                  {formatter(item.startPrice).format('$0,0.00')}
                </Text>
              </View>
              {/* cost column view */}
              <View style={styles.columnView}>
                <Text style={styles.numericText}>
                  {formatter(item.qty * item.startPrice).format('$0,0.00')}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total: </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {formatter(sumCost).format('$0,0.00')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatView: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  columnView: {
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  rowViewContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 2,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
  },
  numericText: {
    textAlign: 'right',
    fontSize: 14,
  },
  listHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  alphaText: {
    fontWeight: 'bold',
    // color: '',
  },
  container: {
    backgroundColor: 'azure',
    marginTop: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
