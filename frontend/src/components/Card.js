const Card = (props) => {
  return (
    <>
      {!props.rotated && (props.cheat || props.queenCheat) && (
        <div className="card-container">
          {props.value == "2" && props.suit == "hearts" && (
            <div className="2-hearts">
              <img alt="" src="/cards/2_of_hearts.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "spades" && (
            <div className="2-spades">
              <img alt="" src="/cards/2_of_spades.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "diamonds" && (
            <div className="2-diamonds">
              <img alt="" src="/cards/2_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "clubs" && (
            <div className="2-clubs">
              <img alt="" src="/cards/2_of_clubs.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "hearts" && (
            <div className="3-hearts">
              <img alt="" src="/cards/3_of_hearts.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "spades" && (
            <div className="3-spades">
              <img alt="" src="/cards/3_of_spades.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "diamonds" && (
            <div className="3-diamonds">
              <img alt="" src="/cards/3_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "clubs" && (
            <div className="3-clubs">
              <img alt="" src="/cards/3_of_clubs.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "hearts" && (
            <div className="4-hearts">
              <img alt="" src="/cards/4_of_hearts.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "spades" && (
            <div className="4-spades">
              <img alt="" src="/cards/4_of_spades.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "diamonds" && (
            <div className="4-diamonds">
              <img alt="" src="/cards/4_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "clubs" && (
            <div className="4-clubs">
              <img alt="" src="/cards/4_of_clubs.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "hearts" && (
            <div className="5-hearts">
              <img alt="" src="/cards/5_of_hearts.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "spades" && (
            <div className="5-spades">
              <img alt="" src="/cards/5_of_spades.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "diamonds" && (
            <div className="5-diamonds">
              <img alt="" src="/cards/5_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "clubs" && (
            <div className="5-clubs">
              <img alt="" src="/cards/5_of_clubs.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "hearts" && (
            <div className="6-hearts">
              <img alt="" src="/cards/6_of_hearts.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "spades" && (
            <div className="6-spades">
              <img alt="" src="/cards/6_of_spades.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "diamonds" && (
            <div className="6-diamonds">
              <img alt="" src="/cards/6_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "clubs" && (
            <div className="6-clubs">
              <img alt="" src="/cards/6_of_clubs.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "hearts" && (
            <div className="7-hearts">
              <img alt="" src="/cards/7_of_hearts.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "spades" && (
            <div className="7-spades">
              <img alt="" src="/cards/7_of_spades.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "diamonds" && (
            <div className="7-diamonds">
              <img alt="" src="/cards/7_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "clubs" && (
            <div className="7-clubs">
              <img alt="" src="/cards/7_of_clubs.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "hearts" && (
            <div className="8-hearts">
              <img alt="" src="/cards/8_of_hearts.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "spades" && (
            <div className="8-spades">
              <img alt="" src="/cards/8_of_spades.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "diamonds" && (
            <div className="8-diamonds">
              <img alt="" src="/cards/8_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "clubs" && (
            <div className="8-clubs">
              <img alt="" src="/cards/8_of_clubs.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "hearts" && (
            <div className="9-hearts">
              <img alt="" src="/cards/9_of_hearts.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "spades" && (
            <div className="9-spades">
              <img alt="" src="/cards/9_of_spades.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "diamonds" && (
            <div className="9-diamonds">
              <img alt="" src="/cards/9_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "clubs" && (
            <div className="9-clubs">
              <img alt="" src="/cards/9_of_clubs.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "hearts" && (
            <div className="10-hearts">
              <img alt="" src="/cards/10_of_hearts.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "spades" && (
            <div className="10-spades">
              <img alt="" src="/cards/10_of_spades.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "diamonds" && (
            <div className="10-diamonds">
              <img alt="" src="/cards/10_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "clubs" && (
            <div className="10-clubs">
              <img alt="" src="/cards/10_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "hearts" && (
            <div className="Jack-hearts">
              <img alt="" src="/cards/Jack_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "spades" && (
            <div className="Jack-spades">
              <img alt="" src="/cards/Jack_of_spades.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "diamonds" && (
            <div className="Jack-diamonds">
              <img alt="" src="/cards/Jack_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "clubs" && (
            <div className="Jack-clubs">
              <img alt="" src="/cards/Jack_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "hearts" && (
            <div className="Queen-hearts">
              <img alt="" src="/cards/Queen_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "spades" && (
            <div className="Queen-spades">
              <img alt="" src="/cards/Queen_of_spades.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "diamonds" && (
            <div className="Queen-diamonds">
              <img alt="" src="/cards/Queen_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "clubs" && (
            <div className="Queen-clubs">
              <img alt="" src="/cards/Queen_of_clubs.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "hearts" && (
            <div className="King-hearts">
              <img alt="" src="/cards/King_of_hearts.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "spades" && (
            <div className="King-spades">
              <img alt="" src="/cards/King_of_spades.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "diamonds" && (
            <div className="King-diamonds">
              <img alt="" src="/cards/King_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "clubs" && (
            <div className="King-clubs">
              <img alt="" src="/cards/King_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "hearts" && (
            <div className="Ace-hearts">
              <img alt="" src="/cards/Ace_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "spades" && (
            <div className="Ace-spades">
              <img alt="" src="/cards/Ace_of_spades.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "diamonds" && (
            <div className="Ace-diamonds">
              <img alt="" src="/cards/Ace_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "clubs" && (
            <div className="Ace-clubs">
              <img alt="" src="/cards/Ace_of_clubs.png"></img>
            </div>
          )}
        </div>
      )}
      {props.rotated && (props.cheat || props.queenCheat) && (
        <div className="card-container">
          {props.value == "2" && props.suit == "hearts" && (
            <div className="2-hearts">
              <img alt="" src="/cards_rotated/2_of_hearts.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "spades" && (
            <div className="2-spades">
              <img alt="" src="/cards_rotated/2_of_spades.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "diamonds" && (
            <div className="2-diamonds">
              <img alt="" src="/cards_rotated/2_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "2" && props.suit == "clubs" && (
            <div className="2-clubs">
              <img alt="" src="/cards_rotated/2_of_clubs.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "hearts" && (
            <div className="3-hearts">
              <img alt="" src="/cards_rotated/3_of_hearts.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "spades" && (
            <div className="3-spades">
              <img alt="" src="/cards_rotated/3_of_spades.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "diamonds" && (
            <div className="3-diamonds">
              <img alt="" src="/cards_rotated/3_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "3" && props.suit == "clubs" && (
            <div className="3-clubs">
              <img alt="" src="/cards_rotated/3_of_clubs.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "hearts" && (
            <div className="4-hearts">
              <img alt="" src="/cards_rotated/4_of_hearts.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "spades" && (
            <div className="4-spades">
              <img alt="" src="/cards_rotated/4_of_spades.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "diamonds" && (
            <div className="4-diamonds">
              <img alt="" src="/cards_rotated/4_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "4" && props.suit == "clubs" && (
            <div className="4-clubs">
              <img alt="" src="/cards_rotated/4_of_clubs.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "hearts" && (
            <div className="5-hearts">
              <img alt="" src="/cards_rotated/5_of_hearts.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "spades" && (
            <div className="5-spades">
              <img alt="" src="/cards_rotated/5_of_spades.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "diamonds" && (
            <div className="5-diamonds">
              <img alt="" src="/cards_rotated/5_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "5" && props.suit == "clubs" && (
            <div className="5-clubs">
              <img alt="" src="/cards_rotated/5_of_clubs.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "hearts" && (
            <div className="6-hearts">
              <img alt="" src="/cards_rotated/6_of_hearts.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "spades" && (
            <div className="6-spades">
              <img alt="" src="/cards_rotated/6_of_spades.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "diamonds" && (
            <div className="6-diamonds">
              <img alt="" src="/cards_rotated/6_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "6" && props.suit == "clubs" && (
            <div className="6-clubs">
              <img alt="" src="/cards_rotated/6_of_clubs.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "hearts" && (
            <div className="7-hearts">
              <img alt="" src="/cards_rotated/7_of_hearts.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "spades" && (
            <div className="7-spades">
              <img alt="" src="/cards_rotated/7_of_spades.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "diamonds" && (
            <div className="7-diamonds">
              <img alt="" src="/cards_rotated/7_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "7" && props.suit == "clubs" && (
            <div className="7-clubs">
              <img alt="" src="/cards_rotated/7_of_clubs.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "hearts" && (
            <div className="8-hearts">
              <img alt="" src="/cards_rotated/8_of_hearts.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "spades" && (
            <div className="8-spades">
              <img alt="" src="/cards_rotated/8_of_spades.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "diamonds" && (
            <div className="8-diamonds">
              <img alt="" src="/cards_rotated/8_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "8" && props.suit == "clubs" && (
            <div className="8-clubs">
              <img alt="" src="/cards_rotated/8_of_clubs.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "hearts" && (
            <div className="9-hearts">
              <img alt="" src="/cards_rotated/9_of_hearts.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "spades" && (
            <div className="9-spades">
              <img alt="" src="/cards_rotated/9_of_spades.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "diamonds" && (
            <div className="9-diamonds">
              <img alt="" src="/cards_rotated/9_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "9" && props.suit == "clubs" && (
            <div className="9-clubs">
              <img alt="" src="/cards_rotated/9_of_clubs.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "hearts" && (
            <div className="10-hearts">
              <img alt="" src="/cards_rotated/10_of_hearts.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "spades" && (
            <div className="10-spades">
              <img alt="" src="/cards_rotated/10_of_spades.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "diamonds" && (
            <div className="10-diamonds">
              <img alt="" src="/cards_rotated/10_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "10" && props.suit == "clubs" && (
            <div className="10-clubs">
              <img alt="" src="/cards_rotated/10_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "hearts" && (
            <div className="Jack-hearts">
              <img alt="" src="/cards_rotated/Jack_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "spades" && (
            <div className="Jack-spades">
              <img alt="" src="/cards_rotated/Jack_of_spades.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "diamonds" && (
            <div className="Jack-diamonds">
              <img alt="" src="/cards_rotated/Jack_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Jack" && props.suit == "clubs" && (
            <div className="Jack-clubs">
              <img alt="" src="/cards_rotated/Jack_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "hearts" && (
            <div className="Queen-hearts">
              <img alt="" src="/cards_rotated/Queen_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "spades" && (
            <div className="Queen-spades">
              <img alt="" src="/cards_rotated/Queen_of_spades.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "diamonds" && (
            <div className="Queen-diamonds">
              <img alt="" src="/cards_rotated/Queen_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Queen" && props.suit == "clubs" && (
            <div className="Queen-clubs">
              <img alt="" src="/cards_rotated/Queen_of_clubs.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "hearts" && (
            <div className="King-hearts">
              <img alt="" src="/cards_rotated/King_of_hearts.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "spades" && (
            <div className="King-spades">
              <img alt="" src="/cards_rotated/King_of_spades.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "diamonds" && (
            <div className="King-diamonds">
              <img alt="" src="/cards_rotated/King_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "King" && props.suit == "clubs" && (
            <div className="King-clubs">
              <img alt="" src="/cards_rotated/King_of_clubs.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "hearts" && (
            <div className="Ace-hearts">
              <img alt="" src="/cards_rotated/Ace_of_hearts.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "spades" && (
            <div className="Ace-spades">
              <img alt="" src="/cards_rotated/Ace_of_spades.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "diamonds" && (
            <div className="Ace-diamonds">
              <img alt="" src="/cards_rotated/Ace_of_diamonds.png"></img>
            </div>
          )}
          {props.value == "Ace" && props.suit == "clubs" && (
            <div className="Ace-clubs">
              <img alt="" src="/cards_rotated/Ace_of_clubs.png"></img>
            </div>
          )}
        </div>
      )}
      {!props.rotated && !props.cheat && !props.queenCheat && (
        <div className="card-container">
          <div className="card-reverse">
            <img alt="" src="/cards_reverses/reverse2.png"></img>
          </div>
        </div>
      )}
      {props.rotated && !props.cheat && !props.queenCheat && (
        <div className="card-container">
          <div className="card-reverse">
            <img alt="" src="/cards_reverses/reverse2_rotated.png"></img>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
