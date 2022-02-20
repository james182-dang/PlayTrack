import './style.css';

function SidebarOption({ text, Icon, active }) {
  return (
    <div className={`sidebarOption  ${active && "sidebarOption--active"}`}>
        <Icon>{text}</Icon>
        <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;