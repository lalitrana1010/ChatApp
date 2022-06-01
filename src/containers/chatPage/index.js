import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, addMessage, deleteMessage, updateMessage, } from '../../actions';
import Layout from '../../components/Layout';
import { timeFunction, timeHumanizeFunction, firstLetterCapital ,trimLength} from '../../helperfunctions';

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
								chatStarted ? starTab ? user.conversations.map((con, index) => {
									if ((con.uid === userUid) && con.starMark) {
										return <div style={{ textAlign: 'right' }} key={index}>

											<p className="messageStyle" >{con.starMark && <i className="starMain fa fa-star" aria-hidden="true"></i>}<span className='timemsg'>{timeFunction(con.time)}</span> {con.text}
												<div className='onHover'>
													<button onClick={() => { starText(con, index) }}>
														<i className="fa fa-star" aria-hidden="true"></i>
													</button>
													<button onClick={() => { deleteText(index) }}>
														<i className="fa fa-trash" aria-hidden="true"></i>
													</button>
													<button><i className="fa fa-share" aria-hidden="true"></i></button>
												</div>

											</p>

										</div>

									}
								}) :
									user.conversations.map((con, index) => {
										if (con.uid === userUid) {
											return <div style={{ textAlign: 'right' }} key={index}>
												<p className="messageStyle" >{con.starMark && <i className="starMain fa fa-star" aria-hidden="true"></i>}<span className='timemsg'>{timeFunction(con.time)}</span> {con.text}
													<div className='onHover'>
														<button onClick={() => { starText(con, index) }}>
															<i className={con.starMark ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true"></i>
														</button>
														<button onClick={() => { deleteText(index) }}>
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</button>
														<button><i className="fa fa-share" aria-hidden="true"></i></button>
													</div>
													<i class="fa fa-check" aria-hidden="true"></i>
												</p>
											</div>
										}
									})
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
