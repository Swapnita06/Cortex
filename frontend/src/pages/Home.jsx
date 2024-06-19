import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
const Home = () => {
  return (
    <>
    <div className='container'>
        <div className='box1'>
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
      </div>

      
      <div className='box2'>
      <h1 style={{marginBottom:'5px'}}>Discover Your Perfect AI Companion </h1>
      <h3>Tailored Intelligence for every need.</h3>
    <div className='boxes'> 

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

     <div className='agents'>
     <FeedOutlinedIcon/>
     <h3>News Editor</h3>
     <p>
Summarize and present the latest news stories in an engaging and informative manner.
     </p>
     </div>

    </div>
      </div>

      <div className='box3'>
        <button className='button'>Signup</button>
      </div>
      </div>
    </>
  )
}

export default Home
