import React, {Component} from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  WebView,
  Linking,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';


export default class Stories extends Component {
  state = {
    stories: [],
    error: '',
    isLoading: false,
    openWebView: false,
    webViewUrl: ''
  };

  componentDidMount () {
    const _self = this;
    this.setState({ isLoading: true });
    const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=366f8f5bee1745a18954fca26e333010'

    axios.get(url)
      .then(function (response) {
        if (response.data) {
          _self.setState({ stories: response.data.results, isLoading: false });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleOpenWebView (url) {
    console.log(url)
    if (url) {
      this.setState({ openWebView: true, webViewUrl: url });
    }
  };

  render() {
    const { state } = this;
    if (state.openWebView) {
      return (
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{ uri: state.webViewUrl }}
          onNavigationStateChange={(event) => {
            if (event.url !== state.webViewUrl) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      );
    }
    return (
      <View>
        <FlatList
          data={state.stories}
          renderItem={({item, index}) => (
            <TouchableHighlight
              onPress={this.handleOpenWebView.bind(this, item.url)}
              key={index}>
              <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, overflow: 'hidden'}}>
                {item.multimedia[0] ? (
                  <Image
                    style={{width: 50, height: 50, marginRight: 5, marginLeft: 5}}
                    source={{uri: item.multimedia[0] && item.multimedia[0].url}}
                  />
                ) : (
                  <View style={{width: 50, height: 50, backgroundColor: 'black', marginRight: 5, marginLeft: 5}} />
                )}
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
