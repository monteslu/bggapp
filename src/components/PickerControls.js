import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Switch, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import Slider from 'rc-slider';

import { updatePickerFilter,
         UPDATE_MIN_RATING,
         UPDATE_MIN_BGG_RATING,
         UPDATE_NUM_PLAYERS,
         UPDATE_MIN_MINUTES,
         UPDATE_MAX_MINUTES,
         UPDATE_WANT_TO_PLAY,
         UPDATE_EXCLUDE_EXPANSIONS,
         UPDATE_ONLY_OWNED,
         UPDATE_SORT_BY
      } from '../state/picker';


class PickerSlider extends Component {

  render(){
    const{onChange} = this.props;
    let valDisplay = this.props.value + '/' + this.props.max;
    if(!this.props.value){
      valDisplay = 'Any';
    }

    const sliderStyle = {
      marginTop: '8px',
      marginBottom: '20px'
    };

    return (<div><span>{this.props.name}: </span><span className="pickerValue">{valDisplay}</span>
      <Slider style={sliderStyle} defaultValue={5.0} step={this.props.step || 0.10} onChange={(e, val) => onChange(val)} min={this.props.min || 0} max={this.props.max} value={this.props.value}/>
    </div>);
  }

};

class PickerControls extends Component {

  change(type, val){
    this.props.updatePickerFilter(type, val);
  }

  componentDidUpdate(){
    //TODO need a better place to do this
    const {picker} = this.props;
    try{
      localStorage.picker = JSON.stringify(picker);
    }catch(exp){
    }

    console.log('updated', picker.sortBy);
  }

  render() {
    const {picker} = this.props;

    return (
      <section className="pickerControls">
        <div>
          <div className="pickerRow"><PickerSlider value={picker.minRating} onChange={val => this.change(UPDATE_MIN_RATING, val)} name="my minimum rating" step={0.25} max={10}/></div>
          <div className="pickerRow"><PickerSlider value={picker.minBggRating} onChange={val => this.change(UPDATE_MIN_BGG_RATING, val)} name="bgg minimum rating" step={0.25} max={10}/></div>
          <div className="pickerRow"><PickerSlider value={picker.numPlayers} onChange={val => this.change(UPDATE_NUM_PLAYERS, val)} name="number of players" step={1} max={15}/></div>
          <div className="pickerRow"><PickerSlider value={picker.minMinutes} onChange={val => this.change(UPDATE_MIN_MINUTES, val)} name="minimum playtime minutes" step={15} max={300}/></div>
          <div className="pickerRow"><PickerSlider value={picker.maxMinutes} onChange={val => this.change(UPDATE_MAX_MINUTES, val)} name="maximum playtime minutes" step={15} max={600}/></div>
          <div className="pickerRow">
            <div style={{width:'100%', margin: '5px'}}>
              <div className="mdl-shadow--4dp filterToggle">
                <span>Want to play</span><Switch onChange={(evt,val) => this.change(UPDATE_WANT_TO_PLAY, val)} checked={picker.wantToPlay} name="wantToPlay"/>
              </div>
              <div className="mdl-shadow--4dp filterToggle">
                <span>Only owned games</span><Switch onChange={(evt,val) => this.change(UPDATE_ONLY_OWNED, val)} checked={picker.onlyOwned} name="onlyOwned"/>
              </div>
              <div className="mdl-shadow--4dp filterToggle">
                <span>Exclude expansions</span><Switch onChange={(evt,val) => this.change(UPDATE_EXCLUDE_EXPANSIONS, val)} checked={picker.excludeExpansions} name="excludeExpansions"/>
              </div>
            </div>
          </div>
        </div>
        <div style={{width:'100%', float: 'left'}}/>
        <div className="pickerRow"  style={{width:'100%', float: 'left'}}>
          Sort By:
          <RadioGroup name="sortBy" onChange={(evt, val) => this.change(UPDATE_SORT_BY, val)} ref="sortButtonGroup" value={picker.sortBy}>
            <FormControlLabel value="rating" control={<Radio color="primary" />} label="my rating" />
            <FormControlLabel value="bggrating" control={<Radio color="primary" />} label="bgg rating" />
            <FormControlLabel value="playingtime" control={<Radio color="primary" />} label="playing time" />
            <FormControlLabel value="numplays" control={<Radio color="primary" />} label="num plays" />
          </RadioGroup>

        </div>
        <br/>
      </section>
    );

  }
}


function mapStateToProps(state) {
  const { mygames, picker } = state;

  return {
    mygames,
    picker
  };
}


export default connect(mapStateToProps, {updatePickerFilter})(PickerControls);
