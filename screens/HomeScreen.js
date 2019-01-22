import React from 'react';
import { Text } from 'react-native-elements';
const numeral = require('numeral');
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPortfolio, updatePortfolio } from '../store/index';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import PortfolioScreen from './TableComponents/PortfolioScreen';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { userPortfolio: [] };
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

  componentDidMount() {
    this.props.fetchPortfolio();
    // this.props.updatePortfolio();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'stretch', flexDirection: 'column' }}>
          <Text h4 style={styles.screenHeader}>
            My Portfolio
          </Text>
          <Image
            style={{ width: 450, height: 250 }}
            source={{
              uri:
                'https://ei.marketwatch.com/Multimedia/2017/06/13/Photos/ZH/MW-FO337_smartb_20170613122301_ZH.jpg?uuid=9207900c-5054-11e7-a342-9c8e992d421e',
            }}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <PortfolioScreen data={this.props.portfolio} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'floralwhite',
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
  screenHeader: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 5,
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

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio.portfolio,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio() {
      dispatch(fetchPortfolio());
    },
    updatePortfolio() {
      dispatch(updatePortfolio());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
