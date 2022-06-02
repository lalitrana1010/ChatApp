import React from 'react';
import './style.css';
import {timeHumanizeFunction ,trimLength} from '../../helperfunctions';



const User = (props) => {
	const { user, onClick, lastMessage, part } = props;

	const message = lastMessage && lastMessage.find(item => item.uid === user.uid)

	return (
		<div onClick={() => onClick(user)} className="displayName">
			<div className="displayPic">
				<img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
				<span className={user.isOnline ? `onlineStatus` : `onlineStatus off`} />
			</div>

			<div className='Userclient'>
				<span className='userName'>{user.userName}</span>
				{part && <><span>{message ? trimLength(message.text) : "Start a new chat..."}</span>
					<span className='timeingMsg'>{message ? timeHumanizeFunction(message.time) : null}</span></>}
			</div>
		</div>
	);
};

export default User;


