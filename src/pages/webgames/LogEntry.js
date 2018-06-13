import React from ‘react’;

const LogEntry = ({entry}) => (
  <div className="mdl-shadow--4dp" key={i}>
    <div>
      turn <strong>{entry.turn}</strong>
    </div>
    <div>
      <strong>{entry.name}</strong> player
    </div>
    <div>
    starting hand : <strong>{entry.startingHand.map(c => c.name).join(', ')}</strong>
    </div>
    <div>
    played : <strong>${entry.finalInPlay.map(c => c.name).join(', ')}</strong>
    </div>
    <div>
    after actions : <strong>{entry.highTreasure}</strong> treasure, <strong>{entry.highBuys}</strong> buys
    </div>
    <div>
    purchased : <strong>{entry.boughtThisRound.map(c => c.name).join(', ')}</strong>
    </div>
  </div>
);

export default LogEntry;
