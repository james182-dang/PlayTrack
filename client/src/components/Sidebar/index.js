import './style.css';
import SidebarOption from '../SidebarOption';
import VideogameAssetSharpIcon from '@mui/icons-material/VideogameAssetSharp';
import MapSharpIcon from '@mui/icons-material/MapSharp';
import NewspaperSharpIcon from '@mui/icons-material/NewspaperSharp';
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';

function Sidebar(props) {
    return (
        <div className='sidebar'>
            <SidebarOption Icon={VideogameAssetSharpIcon} text='Home' onClick={() => props.setCurrentDisplay('Home')} />
            <SidebarOption Icon={MapSharpIcon} text='Explore' onClick={() => props.setCurrentDisplay('Explore')} />
            <SidebarOption Icon={NewspaperSharpIcon} text='Reviews' onClick={() => props.setCurrentDisplay('Reviews')} />
            <SidebarOption Icon={MilitaryTechSharpIcon} text='Profile' onClick={() => props.setCurrentDisplay('Profile')} />
        </div>
    );
}

export default Sidebar;