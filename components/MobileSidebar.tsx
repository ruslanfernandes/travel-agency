// @ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  let sidebar: Sidebar;
  const toggleSidebar = () => sidebar.toggle();
  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img src="/assets/icons/logo.svg" alt="" className="size-[25px]" />
          <h1>Travell</h1>
        </Link>

        {/* //MENU ICON */}
        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" className="size-7" alt="menu" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(Sidebar) => {
          sidebar = Sidebar;
        }}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
