import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as forSolitaireActions from '../../actions/webgames/forsolitaire';
import {selectBid, placeBid, selectProp, sellProp, nextSell, startGame} from '../../actions/webgames/forsolitaire';
import {LinearProgress, RadioButtonGroup, RadioButton, RaisedButton} from 'material-ui';


class PropCard extends Component {

  render(){
    const style = {
      backgroundColor: this.props.backgroundColor || '#EFEBD6'
    };
    if(this.props.canClick){
      style.cursor = 'pointer';
    }
    if(this.props.check){
      style.boxShadow = '0 4px 5px 0 rgba(0,255,0,.14),0 1px 10px 0 rgba(0,255,0,.72),0 2px 4px -1px rgba(0,0,0,.2)';
    }
    if(this.props.selected){
      style.boxShadow = '0 4px 5px 0 rgba(255,0,0,.14),0 1px 10px 0 rgba(255,0,0,.72),0 2px 4px -1px rgba(0,0,0,.2)';
    }
    return(
      <div className="mdl-shadow--4dp forsolitaire-card" style={style} onClick={this.props.onClick}>
        <div className="forsolitaire-number">
          {this.props.value}
        </div>
        <div className="forsolitaire-name">
         {this.props.name}
        </div>
      </div>
    );
  }
}


class ForSolitaire extends Component {


  bidChange(val){
    const {dispatch} = this.props;
    dispatch(selectBid(parseInt(val,10)));
  }

  placeBid(){
    const {dispatch, game} = this.props;
    dispatch(placeBid(game.selectedBid));
  }

  selectProp(prop){
    const {dispatch} = this.props;
    console.log('selectProp', prop);
    dispatch(selectProp(prop));
  }

  sellProp(){
    const {dispatch, game} = this.props;
    dispatch(sellProp(game.selectedProp));
  }

  nextSell(){
    const {dispatch} = this.props;
    dispatch(nextSell());
  }

  startGame(){
    const {dispatch} = this.props;
    dispatch(startGame());
  }

  componentDidUpdate(prevProps, prevState){
    const {game} = this.props;

    //HACK for broken RadioButtonGroup
    if(this.refs.bidsButtonGroup){
      this.refs.bidsButtonGroup.clearValue();
      if(game.selectedBid || game.selectedBid === 0){
        this.refs.bidsButtonGroup.clearValue();
        this.refs.bidsButtonGroup.setSelectedValue('' + game.selectedBid);
      }
    }
  }

  render() {

    const { game, dispatch } = this.props;

    //debugging
    window.fsa = forSolitaireActions;
    window.dis = dispatch;
    window.game = game;

    console.log('rendering ForSolitaire', game);


    let output = (<h2>{game.phase}</h2>);

    if(game.phase === 'buy'){
      output = (
        <div>
          <div>
            Round: {game.round}
          </div>
          <div>
            My Coins: {game.myCoins}
          </div>
          <div>
            Jessica Coins: {game.jessCoins}
          </div>
          <div>
          {game.marketProps.map((prop, i) => {
            return <PropCard value={prop.value} name={prop.name}/>;
          })}
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            <RadioButtonGroup name="bids" onChange={(evt, val) => this.bidChange(val)} ref="bidsButtonGroup" >
            {game.availableBids.map((bid, i) => {
              return <RadioButton value={'' + bid} key={i} label={'' + bid} style={{float:'left', margin: '5px', width:'auto'}}/>;
            })}
            </RadioButtonGroup>
            <RaisedButton label="Place Bid" primary={true} onClick={evt => this.placeBid()}style={{float:'left', marginLeft: '5px'}} disabled={!game.selectedBid && game.selectedBid !== 0}/>
          </div>
        </div>
      );
    }
    else if(game.phase === 'sell'){
      output = (
        <div>
          <div>
            Round: {game.round}
          </div>
          <div>
          {game.marketChecks.map((check, i) => {
            return <PropCard value={check.value} name="check $" check={true}/>;
          })}
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            {game.myProps.map((prop, i) => {
              return <PropCard selected={game.selectedProp === prop.value} value={prop.value} name={prop.name} onClick={evt => this.selectProp(prop.value)} canClick={true}/>;
            })}
            <RaisedButton label="Sell Property" primary={true} onClick={evt => this.sellProp()} style={{float:'left'}} disabled={!game.selectedProp}/>
          </div>
        </div>
      );
    }
    else if(game.phase === 'sellResult'){
      output = (
        <div>
          <div>
            Round: {game.round}
          </div>
          <div>
            <span style={{float:'left'}}>Me:</span>
            <PropCard value={game.myCheckReward.value} name="check $" check={true}/>
            <PropCard value={game.mySoldProp.value} name={game.mySoldProp.name}/>
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            <span style={{float:'left'}}>Jessica:</span>
            <PropCard value={game.jessCheckReward.value} name="check $" check={true}/>
            <PropCard value={game.jessSoldProp.value} name={game.jessSoldProp.name}/>
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            <RaisedButton label="Next Round" primary={true} onClick={evt => this.nextSell()} style={{float:'left'}}/>
          </div>
        </div>
      );
    }
    else if(game.phase === 'gameover'){
      output = (
        <div>
          <div>
            <h3>{(game.winner ? 'Winner !' : 'You lose !')}</h3>
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            <PropCard value={game.myScore} name="My $" check={game.winner} selected={!game.winner}/>
            <PropCard value={game.jessScore} name="Jessica $" check={!game.winner} selected={game.winner}/>
          </div>
          <div style={{width:'100%', float: 'left'}}/>
          <div>
            <RaisedButton label="New Game" primary={true} onClick={evt => this.startGame()} style={{float:'left'}}/>
          </div>
        </div>
      );
    }

    return (
      <div style={{margin: '5px'}}>
        {output}
      </div>
    );
  }
}

ForSolitaire.propTypes = {
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { forsolitaire } = state.webgames;

  return {
    game: forsolitaire
  };
}

export default connect(mapStateToProps)(ForSolitaire);
