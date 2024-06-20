import React,{ useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const agentsData = [
     {
         icon:<MedicalServicesTwoToneIcon/>,
       name: 'Wellness Consultant',
       description: 'Analyze the given symptoms and health data to provide personalized wellness tips and recommendations.',
      
     },
     {
         
          name: 'Investment Advisor',
          description: 'Evaluate the provided financial data to offer insightful investment advice and risk assessments.',
     },
     {
          name: 'Digital Engagement Specialist',
          description: 'Develop and manage content strategies to enhance the online presence and engagement of brand or individual.',
     },
     {
          name: 'Travel Coordinator',
          description: 'Plan and organize travel itineraries, including accommodations and activities,to create optimal travel experiences.',
     },
     {
          name: 'Event Coordinator',
          description: 'Organize and manage events, including logistics, coordination, and execution, to ensure a seamless and memorable experience.',
     },
     {
          name: 'Personal Trainer',
          description: 'Create customized fitness routines and nutrition plans tailored to individual health goals and preferences.',
     },
     {
icon:<LightbulbOutlinedIcon/>,
          name: 'Creative Content Strategists',
          description: 'Generate creative and innovative content ideas and strategies suitable for various media platforms.',
     },
     {
          icon:<FeedOutlinedIcon/>,
          name: 'News Editor',
          description: 'Summarize and present the latest news stories in an engaging and informative manner.',
     },
    
     {
          icon:<AddSharpIcon/>,
     }
     
   ];


const Home = () => {

     const [open, setOpen] = useState(false);
     const [currentAgent, setCurrentAgent] = useState({ name: '', description: '',goal:'' });
     const [isPageBlurred, setIsPageBlurred] = useState(false);

     const handleOpen = () => {
       setCurrentAgent({name: '', description: '', goal: ''} );
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
     const handleChange = (e) => {
          const { name, value } = e.target;
          setCurrentAgent((prev) => ({ ...prev, [name]: value }));
        };
      
        const handleCreate = () => {
          // Handle agent creation logic here
          console.log("Agent Created:", currentAgent);
          setOpen(false);
        };
  return (
    <>
     {/* <div className='container'> */}
     <div className={`container ${isPageBlurred ? 'blurred' : ''}`}>
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

      
      {/* <div className='box2'>
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
      </div> */}


<div className='box2'>
          <h1 style={{ marginBottom: '5px' }}>Discover Your Perfect AI Companion </h1>
          <h3>Tailored Intelligence for every need.</h3>
          <div className='boxes'>
            {agentsData.map((agent, index) => (
              <div key={index} className='agents' onClick={() => handleOpen(agent)}>
               {agent.icon}
                <h3>{agent.name}</h3>
                <p>{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

      <div className='box3'>
        <button className='button'>Signup</button>
      </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-agent-title"
        aria-describedby="modal-agent-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, bgcolor: 'black', border: '2px solid #000', boxShadow: 24, p: 4, borderRadius:'10%'
        }}>
          {/* <Typography id="modal-agent-title" variant="h6" component="h2">
            Create Agent
          </Typography> */}

          <Typography variant="subtitle1" sx={{ mt: 2,color:'white' }}>
            Agent Name
          </Typography>
          <TextField
            fullWidth
          //   label="Agent Name"
          placeholder='Agent Name'
            name="name"
            value={currentAgent.name}
            onChange={handleChange}
            margin="normal"
           
            sx={{
               '& .MuiInputBase-root': {
                 backgroundColor: 'gray',
                 color: 'white',
                 borderRadius: '15px',
               },
               '& .MuiInputBase-input': {
                 color: 'white',
               },
               '& .MuiOutlinedInput-notchedOutline': {
                 borderColor: 'gray',
               },
               '& .MuiInputLabel-root': {
                 color: 'white',
               },
               '& .MuiInputLabel-shrink': {
                 color: 'white',
               },
             }}
          />

<Typography variant="subtitle1" sx={{ mt: 2,color:'white' }}>
           Agent Description
          </Typography>
          <TextField
          placeholder='Agent Description '
            fullWidth
          //   label="Description"
            name="description"
            value={currentAgent.description}
            onChange={handleChange}
            margin="normal"

            sx={{
               '& .MuiInputBase-root': {
                 backgroundColor: 'gray',
                 color: 'white',
                 borderRadius: '15px',
               },
               '& .MuiInputBase-input': {
                 color: 'white',
               },
               '& .MuiOutlinedInput-notchedOutline': {
                 borderColor: 'gray',
               },
               '& .MuiInputLabel-root': {
                 color: 'white',
               },
               '& .MuiInputLabel-shrink': {
                 color: 'white',
               },
             }}
          />

<Typography variant="subtitle1" sx={{ mt: 2,color:'white' }}>
            Your Goal
          </Typography>
          <TextField
          placeholder='Your Goal'
            fullWidth
          //   label="Your Goal"
            name="goal"
            value={currentAgent.goal}
            onChange={handleChange}
            margin="normal"

            sx={{
               '& .MuiInputBase-root': {
                 backgroundColor: 'gray',
                 color: 'white',
                 borderRadius: '15px',
               },
               '& .MuiInputBase-input': {
                 color: 'white',
               },
               '& .MuiOutlinedInput-notchedOutline': {
                 borderColor: 'gray',
               },
               '& .MuiInputLabel-root': {
                 color: 'white',
               },
               '& .MuiInputLabel-shrink': {
                 color: 'white',
               },
             }}
          />
          {/* <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>Create</Button> */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
        Create
      </Button>
    </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Home
