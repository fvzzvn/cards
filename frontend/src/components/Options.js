import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const settings = [
  "Profil",
  "Dane konta",
  "Zabezpieczenia",
  "Prywatność",
  "Ustawienia gry",
];

const Options = ({ username, userId }) => {
  const [currentSetting, setCurrentSetting] = useState("Profil");

  return (
    <div className="options__board">
      <div className="options__board__panel options__board__panel--left">
        <h2>Ustawienia</h2>
        <ul className="optionos__board__panel--left__settings">
          {settings.map((setting) => (
            <li onClick={() => setCurrentSetting(setting)} key={setting}>
              {setting}
            </li>
          ))}
        </ul>
      </div>
      <div className="options__board__panel options__board__panel--right">
        <div className="options__board__panel--right__header">
          <h2>{currentSetting}</h2>
        </div>
        <div className="options__board__panel--right__body">
          {settingComponents[currentSetting]}
        </div>
      </div>
    </div>
  );
};

export default Options;

const Profile = () => {
  return (
    <>
      <div class="profil-blok">
        <div>Profil</div>
      </div>
    </>
  );
};

const Account = () => {
  const [password, setPassword] = useState("");
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalRatTag, setShowModalRatTag] = useState(false);

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <>
      <div class="opcje-blok">
        <div>Account</div>
        <div class="blok-prawy blok 1">
          <h1>Hasło</h1>
          <div class="options-button-block">
            <button
              type="button"
              class="button-options"
              onClick={() => setShowModalPassword(true)}
            >
              Aktualizuj
            </button>
            <div>
              <p>Your password is: {password}</p>
              {showModalPassword && (
                <div
                  style={{
                    backgroundColor: "#fa392d",
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    padding: "5rem",
                    borderRadius: "20px",
                  }}
                >
                  <input type="password" placeholder="old password" />
                  <input
                    type="password"
                    placeholder="new password"
                    onChange={(event) =>
                      handleChangePassword(event.target.value)
                    }
                  />
                  <button onClick={() => setShowModalPassword(false)}>
                    Save
                  </button>
                  <button onClick={() => setShowModalPassword(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div class="blok-prawy blok 2">
          <h1>E-mail</h1>
          <button
            type="button"
            class="button-options"
            onClick={() => setShowModalEmail(true)}
          >
            Aktualizuj
          </button>
          <div>
            {/* <p>Your email is: {password}</p> */}
            {showModalEmail && (
              <div
                style={{
                  backgroundColor: "#fa392d",
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  padding: "5rem",
                  borderRadius: "20px",
                }}
              >
                <input type="email" placeholder="email" />
                <button onClick={() => setShowModalEmail(false)}>Save</button>
                <button onClick={() => setShowModalEmail(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
        <div class="blok-prawy blok 3">
          <h1>RatTag</h1>
          <button
            type="button"
            class="button-options"
            onClick={() => setShowModalRatTag(true)}
          >
            Aktualizuj
          </button>
          <div>
            {/* <p>Your rattag is: {password}</p> */}
            {showModalRatTag && (
              <div
                style={{
                  backgroundColor: "#fa392d",
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  padding: "5rem",
                  borderRadius: "20px",
                }}
              >
                <input placeholder="ratTag" />
                <button onClick={() => setShowModalRatTag(false)}>Save</button>
                <button onClick={() => setShowModalRatTag(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Security = () => {
  return (
    <>
      <div class="security-blok">
        <div>Security</div>
        <div class="blok-prawy blok 1"></div>
        <div class="blok-prawy blok 2"></div>
        <div class="blok-prawy blok 3"></div>
        <div class="blok-prawy blok 4"></div>
      </div>
    </>
  );
};

const Privacy = () => {
  return (
    <>
      <div class="opcje-blok">
        <div>Privacy</div>
        <div class="blok-prawy blok 1"></div>
        <div class="blok-prawy blok 2"></div>
        <div class="blok-prawy blok 3"></div>
        <div class="blok-prawy blok 4"></div>
      </div>
    </>
  );
};

const Settings = () => {
  return (
    <>
      <div class="opcje-blok">
        <div>Settings</div>
        <div class="blok-prawy blok 1"></div>
        <div class="blok-prawy blok 2"></div>
        <div class="blok-prawy blok 3"></div>
        <div class="blok-prawy blok 4"></div>
      </div>
    </>
  );
};

const settingComponents = {
  Profil: <Profile />,
  "Dane konta": <Account />,
  Zabezpieczenia: <Security />,
  Prywatność: <Privacy />,
  "Ustawienia gry": <Settings />,
};
