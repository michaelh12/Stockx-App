import React from 'react';
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
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Divider,
} from 'react-native-elements';
import Axios from 'axios';
import store, { fetchPortfolio } from '../store/index';

export default class AddNewStockScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.navigation);
    this.state = { symbol: '', quantity: 0, price: 0 };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    console.log(this.state);
    await Axios.post('http://10.0.2.2:8080/api/portfolios/add', this.state);
    store.dispatch(fetchPortfolio());
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel>Symbol</FormLabel>
        <FormInput
          placeholder="Please Enter Stock Symbol"
          onChange={e => {
            this.setState({ symbol: e.nativeEvent.text });
            console.log(this.state);
          }}
        />
        <Divider style={{ backgroundColor: 'grey' }} />

        <FormLabel>Quantity</FormLabel>

        <FormInput
          placeholder="Please Enter Quantity"
          onChange={e => {
            this.setState({ quantity: e.nativeEvent.text });
            console.log(this.state);
          }}
        />
        <Divider style={{ backgroundColor: 'grey' }} />
        <FormLabel>Price</FormLabel>
        <FormInput
          placeholder="Please Enter Price"
          onChange={e => {
            this.setState({ price: e.nativeEvent.text });
            console.log(this.state);
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
    backgroundColor: '#fff',
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
