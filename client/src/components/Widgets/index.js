import { Search } from '@mui/icons-material';
import './style.css';

function Widgets() {
    return (
        <div className='widgets'>
            <div className='widgets__input'>
                <Search className='widgets__searchIcon' />
                <input placeholder='Search PlayTrack' type='text' />
            </div>

            <div className='widgets__widgetContainer'>
                <h2>What They're Playin'</h2>
            </div>
        </div>
    );
}

export default Widgets;