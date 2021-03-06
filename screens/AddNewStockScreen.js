import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Divider,
  Text,
} from 'react-native-elements';
import Axios from 'axios';
import store, { fetchPortfolio } from '../store/index';

export default class AddNewStockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { symbol: null, quantity: null, price: null };
    this.onSubmit = this.onSubmit.bind(this);
  }
  static navigationOptions = {
    title: 'Welcome To $toX',
    // header: null,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
  };

  async onSubmit(e) {
    await Axios.post('http://10.0.2.2:8080/api/portfolios/add', this.state);
    this.setState({ symbol: null, quantity: null, price: null });
    store.dispatch(fetchPortfolio());
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }} h4>
          Add New Stock
        </Text>
        <Image
          style={{ width: 450, height: 200 }}
          source={{
            uri:
              'https://yw553ftvhw1iqegz29fycoyw-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/GettyImages-488153381-min.jpg',
          }}
        />
        <FormLabel>Symbol</FormLabel>
        <FormInput
          placeholder="Please Enter Stock Symbol"
          value={this.state.symbol}
          onChange={e => {
            this.setState({ symbol: e.nativeEvent.text });
          }}
        />
        <Divider style={{ backgroundColor: 'grey' }} />

        <FormLabel>Quantity</FormLabel>

        <FormInput
          placeholder="Please Enter Quantity"
          value={this.state.quantity}
          onChange={e => {
            this.setState({ quantity: e.nativeEvent.text });
          }}
        />
        <Divider style={{ backgroundColor: 'grey' }} />
        <FormLabel>Price</FormLabel>
        <FormInput
          placeholder="Please Enter Price"
          value={this.state.price}
          onChange={e => {
            this.setState({ price: e.nativeEvent.text });
          }}
        />
        <Divider style={{ backgroundColor: 'grey' }} />
        <View style={{ marginTop: 40 }}>
          <Button
            title="Add New Symbol"
            icon={{ name: 'add' }}
            raised={true}
            large={true}
            color={'white'}
            backgroundColor={'lightcoral'}
            onPress={this.onSubmit}
          />
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
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: 'cyan',
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'stretch',
  },
  rowViewContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 2,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'floralwhite',
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
