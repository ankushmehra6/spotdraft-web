import { config } from "./config";
import "./style.scss";

const SideBar = () => {
  return (
    <div className="sidebarContainer"> 
      <div className="sd-logo">
        <img src="https://app.spotdraft.com/assets/images/spotdraft-fe-nav/header-logo-minimal-light.svg" alt="sdlogo"/>
      </div>
      <div className="sidebarItemsContainer">
        {config.map(({ label, icon: Icon, onClick }) => {
          return (
            <div className="sidebarItemWrapper" onClick={onClick}>
              <div className="icon">
                <Icon />
              </div>
              <div className="label">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
