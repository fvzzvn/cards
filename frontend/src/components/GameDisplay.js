const GameDisplay = (props) => {
  console.log(props);
  const bottom = props.bottom;
  const left = props.left;
  const top = props.top;
  const right = props.right;

  return (
    <div className="game-display-wrapper">
      <div className="game-display-box">
        <div className="game-display-grid">
          <div className="game-display-top">
            <div className="game-display-name">
              <div className="game-display-name-box">
                <div className="gdnb-name">{}</div>
              </div>
            </div>
            <div className="game-display-image-box">
              <div className="gdnb-image">{}</div>
            </div>
            <div className="game-display-ranking-box">
              <div className="gdnb-ranking">{}</div>
            </div>
          </div>
          <div className="game-display-left">
            <div className="game-display-name">
              <div className="game-display-name-box">
                <div className="gdnb-name">{}</div>
              </div>
            </div>
            <div className="game-display-image-box">
              <div className="gdnb-image">{}</div>
            </div>

            <div className="game-display-ranking-box">
              <div className="gdnb-ranking">{}</div>
            </div>
          </div>
          <div className="game-display-center">
            <div className="game-display-center-grid">
              <div className="gdc-top">
                <div className="gdc-top-points-box">
                  <div className="gdc-top-points">{}</div>
                </div>
              </div>
              <div className="gdc-left">
                <div className="gdc-left-points-box">
                  <div className="gdc-left-points">{}</div>
                </div>
              </div>
              <div className="gdc-right">
                <div className="gdc-right-points-box">
                  <div className="gdc-right-points">{}</div>
                </div>
              </div>
              <div className="gdc-bottom">
                <div className="gdc-bottom-points-box">
                  <div className="gdc-bottom-points">{}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="game-display-right">
            <div className="game-display-name">
              <div className="game-display-name-box">
                <div className="gdnb-name">{}</div>
              </div>
              <div className="game-display-image-box">
                <div className="gdnb-image">{}</div>
              </div>
              <div className="game-display-ranking-box">
                <div className="gdnb-ranking">{}</div>
              </div>
            </div>
          </div>
          <div className="game-display-bottom">
            <div className="game-display-name">
              <div className="game-display-name-box">
                <div className="gdnb-name">{}</div>
              </div>
            </div>
            <div className="game-display-image-box">
              <div className="gdnb-image">{}</div>
            </div>
            <div className="game-display-ranking-box">
              <div className="gdnb-ranking">{}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDisplay;
