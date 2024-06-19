import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const Home = () => {
  return (
    <>
      <nav>
        <ul className="icon-list">
            <div className='list'>
            <div className='list1'>
            <li ><HomeOutlinedIcon/></li>
            <li><HelpOutlineRoundedIcon/></li>
            <li><HistoryRoundedIcon/></li>
            <li><GroupsOutlinedIcon /></li>
            </div>
            <div className='list2'>
            <li><AnnouncementOutlinedIcon/></li>
            <li><AccountCircleOutlinedIcon/></li>
            </div>
            </div>
        </ul>
      </nav>
    </>
  )
}

export default Home
