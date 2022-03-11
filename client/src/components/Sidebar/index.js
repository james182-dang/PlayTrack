import './style.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import SidebarOption from '../SidebarOption';
import VideogameAssetSharpIcon from '@mui/icons-material/VideogameAssetSharp';
import MapSharpIcon from '@mui/icons-material/MapSharp';
import NewspaperSharpIcon from '@mui/icons-material/NewspaperSharp';
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';
import PowerIcon from '@mui/icons-material/Power';
import BoltIcon from '@mui/icons-material/Bolt';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';


function Sidebar(props) {
    return (
        <div className='sidebar'>
            {Auth.loggedIn() ? (
                <>
                    <Link to='/feed'>
                        <SidebarOption Icon={VideogameAssetSharpIcon} text='Feed' />
                    </Link>
                    <Link to='/explore'>
                        <SidebarOption Icon={MapSharpIcon} text='Explore' />
                    </Link>
                    <Link to='/connect'>
                        <SidebarOption Icon={EmojiPeopleIcon} text='Connect' />
                    </Link>
                    <Link to='/reviews'>
                        <SidebarOption Icon={NewspaperSharpIcon} text='Reviews' />
                    </Link>
                    <Link to='/profile'>
                        <SidebarOption Icon={MilitaryTechSharpIcon} text='Profile' />
                    </Link>
                    <a href='/' onClick={Auth.logout}>
                        <SidebarOption Icon={PowerOffIcon} text='Logout' />
                    </a>

                </>
            ) : (
                <>
                    <Link to='/login'>
                        <SidebarOption Icon={PowerIcon} text='Login' />
                    </Link>
                    <Link to='/signup'>
                        <SidebarOption Icon={BoltIcon} text='Sign Up' />
                    </Link>
                </>
            )}
            
        </div>
    );
}

export default Sidebar;