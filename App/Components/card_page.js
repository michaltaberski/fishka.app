'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  AlertIOS,
} = React;

var Card = require('./card');
var Button = require('./button');
var DemoPage = require('./demo_page');
var engine = require('../Lib/engine');
var fixtures = require('../fixtures');

var CardActions = require('../Actions/CardActions');
var CardStore = require('../Stores/CardStore');


class CardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = CardStore.getState();
  }

  componentDidMount(cardState) {
    CardStore.listen(this.cardChange.bind(this));
  }

  componentWillUnmount() {
    CardStore.unlisten(this.cardChange.bind(this));
  }

  onPressShowResult() {
    CardActions.showCurrentCardResult();
  }

  cardChange(cardStoreState) {
    this.setState(cardStoreState);
  }

  onPressNo() {
    CardActions.regressCurrentCard();
    CardActions.shuffleNextCard();
  }

  onPressYes() {
    CardActions.progressCurrentCard();
    CardActions.shuffleNextCard();
  }

  onPressDemo() {
    this.props.navigator.push(DemoPage);
  }

  getButtonsBar() {

    var barStyles = {
      flexDirection:'row',
      marginLeft: 30,
      marginRight: 30,
    };

    if (this.state.showResult) {
      return (
        <View style={barStyles}>
          <Button label='No' style={{
              marginRight: 30,
              backgroundColor: 'red',
            }}
            onPress={this.onPressNo.bind(this)}
          />
          <Button label='Yes' style={{
              backgroundColor: '#7ED321',
            }}
            onPress={this.onPressYes.bind(this)}
          />
        </View>
      );
    } else {
      return (
        <View style={barStyles}>
          <Button label='Show' style={{
              backgroundColor: '#282C34',
            }}
            onPress={this.onPressShowResult.bind(this)}
          />
        </View>
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={{flex: 1, backgroundColor: '#FFFCA7'}}>
        <Card {...this.state.currentCard} showResult={this.state.showResult} />
        {this.getButtonsBar()}
        <View style={{
          flexDirection:'row',
          marginLeft: 30,
          marginRight: 30,
        }}>
        </View>
        <View style={{
            marginLeft: 30,
            marginRgith: 30,
            marginTop: 20,
          }}>
          {this.state.cards.map((card) => {
            return (
              <View style={{flexDirection: 'row', margin: 1}}>
                <Text style={{color: '#666', flex: 1}}>Q: {card.question} </Text>
                <Text style={{color: '#999', flex: 1}}>Score: {card.score}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

}

module.exports = {
  component: CardPage,
  title: 'Fishka!',
};
