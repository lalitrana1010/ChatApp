import React from 'react';
import './style.css';
import { timeFunction} from '../../helperfunctions';

export default function message(props) {
    const { message, starText, deleteText, index } = props;
	return (
		<div style={{ textAlign: 'right' }} key={index}>
			<p className="messageStyle">
				{message.starMark && <i className="starMain fa fa-star" aria-hidden="true" />}
				<span className="timemsg">{timeFunction(message.time)}</span> {message.text}
				<div className="onHover">
					<button
						onClick={() => {
							starText(message, index);
						}}
					>
						<i className={message.starMark ? 'fa fa-star' : 'fa fa-star-o'} aria-hidden="true" />
					</button>
					<button
						onClick={() => {
							deleteText(index);
						}}
					>
						<i className="fa fa-trash-o" aria-hidden="true" />
					</button>
					<button>
						<i className="fa fa-share" aria-hidden="true" />
					</button>
				</div>
				<i class="fa fa-check" aria-hidden="true" />
			</p>
		</div>
	);
}
