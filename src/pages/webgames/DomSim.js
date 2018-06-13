import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {startGame} from '../../state/webgames/domsim';
import {Button} from '@material-ui/core';
import Layout from '../Layout';

const typeColors = {
  action: 'blue',
  treasure: '#BBBB00',
  victory: 'green',
  card: 'brown',
  buys: 'black'
};

class SupplyCard extends Component {

  render(){
    const { card } = this.props;
    const style = {
      backgroundColor: this.props.backgroundColor || 'white',
      borderRadius: '5px'
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

    const qtyColor = card.qty ? 'black' : 'red';

    return(
      <div className="mdl-shadow--4dp domsim-supply-card" style={style} onClick={this.props.onClick}>
        <div className="domsim-name">
         {card.name}
        </div>
        <div style={{textAlign: 'center'}}>
        {map(card.values, (val, t) => {

          if(val) {
            const valDisp = `${val}${t.substring(0,1).toUpperCase()} `;
            return (<span style={{color: typeColors[t]}} key={t}>{valDisp}</span>);
          }
          return '';
        })}
        </div>
        <div>
          <span className="domsim-cost">{card.cost}</span>
          <span className="domsim-qty" style={{color: qtyColor}}>x {card.qty}</span>
        </div>
      </div>
    );
  }
}


class DomSim extends Component {

  placeBid(){
    const {game} = this.props;
    this.props.placeBid(game.selectedBid)
  }

  sellProp(){
    const {game} = this.props;
    this.props.sellProp(game.selectedProp);
  }

  render() {

    const { game } = this.props;
    const { supply } = game;

    let output = (<h2>{game.phase}</h2>);

    if(true){ // game.phase === 'buy'){
      output = (
        <div>

          <div style={{width:'100%', float: 'left'}}>
          {supply.cards.map((card, i) => {
            return <SupplyCard card={card} key={"supplycard" + i} />;
          })}
          </div>

          <br/>
          <div>
          </div>
          <Button color="primary" variant="contained" onClick={this.props.startGame} style={{float:'left', marginLeft: '5px'}} disabled={game.simRunning}>Run Simulation</Button>
        </div>
      );
    }

    return (
      <Layout>
        <div style={{margin: '6px'}}>
          {output}
        </div>
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  const { domsim } = state.webgames;

  return {
    game: domsim
  };
}


export default connect(mapStateToProps, {startGame})(DomSim);
