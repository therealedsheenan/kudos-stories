import React, {Component} from "react";
import {
  Text,
  View
} from 'react-native';
import axios from 'axios';


export default class Stories extends Component {
  state = {
    stories: [],
    error: '',
    isLoading: false
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

  render() {
    const { state } = this;
    return (
      <View>
          {
            state.stories.map((l, i) => (
              <Text>{l.section}</Text>
            ))
          }
      </View>
    );
  }
}
