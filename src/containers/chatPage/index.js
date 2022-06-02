import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, addMessage, deleteMessage, updateMessage, } from '../../actions';
import Layout from '../../components/Layout';
import User from './user';
import Message from './message';
import { timeFunction, firstLetterCapital} from '../../helperfunctions';

const ChatPage = (props) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user)
	const lastMessage = user.lastMessage;
	const [chatStarted, setChatStarted] = useState(false);
	const [chatUser, setChatUser] = useState(null);
	const [message, setMessage] = useState('');
	const [userUid, setUserUid] = useState(null);
	const [smShow, setSmShow] = useState(false);
	const [starTab, setStarTab] = useState(false);


	const initChat = (user) => {
		setChatStarted(true);
		setChatUser(user);
		setUserUid(user.uid);
		console.log(user);
	};

	const addUser = (e) => {
		if (e.key === 'Enter') {
			const Obj = {
				userName: firstLetterCapital(e.target.value),
				uid: user.users.length + 1,
			};
			setSmShow(false)
			dispatch(addUsers(Obj));
		}
	};

	useEffect(() => {
		setStarTab(false)
		setMessage('')
	}, [chatUser]);



	const submitMessage = (val) => {
		const msgObj = {
			text: val ? val :message,
			uid: userUid,
			time: new Date().toString(),
			starMark: false
		}
		dispatch(addMessage(msgObj))
		setMessage('')
		setStarTab(false)
	}

	const deleteText = (index) => {
		dispatch(deleteMessage(index))
	}

	const starText = (msgObj, index) => {
		dispatch(updateMessage(!msgObj.starMark, index))
	}

	console.log(lastMessage, "data", userUid)

	return (
		<Layout>
			<section className="container">
				<div className="listOfUsers">
					<div className='SrchHedSec'>
						<h3>All Chats <i className='fa fa-angle-down'></i></h3>
						<button onClick={() => setSmShow(true)}><i className="fa fa-comment-o" aria-hidden="true"></i>New Chat</button>
						{smShow && <div className='srchInpt'><input name="username" type="text" onKeyDown={(e) => addUser(e)} /><i onClick={()=> setSmShow(false)} className="fa fa-times" aria-hidden="true"></i>
						</div>}
					</div>
					{user.users.length > 0 ? (
						user.users.map((user) => {
							return <User onClick={() => initChat(user)} key={user.uid} user={user} lastMessage={lastMessage} part={true} />;
						})
					) : null}
				</div>
				<div className="chatArea">
					{chatUser && <ul className='toTabs'>
						<li>
							<User key={chatUser.uid} user={chatUser} />

						</li>
						<li onClick={() => setStarTab(false)} className={starTab === false ? "active" : ""}>Chat</li>
						<li onClick={() => setStarTab(true)} className={starTab === true ? "active" : ""}>Star Messages</li>
					</ul>}
					<div className='chatSection'>

						<div className="messageSections">
							{
								chatStarted ? starTab ? user.conversations.map((currentMsg, index) => {
									if ((currentMsg.uid === userUid) && currentMsg.starMark) {
										return <Message message={currentMsg} starText ={starText} deleteText={deleteText} index={index} key={index}/>
									}
								}).reverse() :
									user.conversations.map((currentMsg, index) => {
										if (currentMsg.uid === userUid) {
											return <Message message={currentMsg} starText ={starText} deleteText={deleteText} index={index} key={index}/>
										}
									}).reverse()
									: null
							}

						</div>
						{
							chatStarted ?
								<div className="chatControls">
									<input
										onKeyDown={(e) => { if (e.key === 'Enter' && message.length > 0){submitMessage();
										setMessage('')}}}
										value={message}
										onChange={(e) => {setMessage(e.target.value)}}
										placeholder="Write Message..."
									/>
									<div>
										<div className='footIcon'>
											<span><i className="fa fa-edit"></i></span>
											<span><i className="fa fa-star-o"></i></span>
											<span><i className="fa fa-paperclip"></i></span>
											<span><i className="fa fa-smile-o" aria-hidden="true"></i></span>
										</div>
										<button onClick={() => { if (message.length > 0) { submitMessage() } }}>

											<i className="fa fa-send-o"></i>
										</button>
									</div>

								</div> : null
						}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ChatPage;
