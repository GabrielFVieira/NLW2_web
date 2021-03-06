import React from 'react';

import './styles.css';

export interface ScheduleItemInterface {
	to: string[];
	from: string[];
}

interface ScheduleProps {
	schedule?: ScheduleItemInterface;
	week_day: string;
}

const ScheduleItem: React.FC<ScheduleProps> = ({ schedule, week_day }) => {
	return (
		<div className="schedule-item-box" style={schedule ? {} : { opacity: 0.5 }}>
			<div className="schedule-item-container">
				<p className="schedule-item-label">Dia</p>
				<p className="schedule-item-value">{week_day}</p>
			</div>

			<div className="schedule-item-container">
				<p className="schedule-item-label">Horário</p>
				{schedule &&
					schedule.from.length > 0 &&
					schedule.from.map((from: string, index: number) => {
						return <p key={index} className="schedule-item-value">{`${from} - ${schedule.to[index]}`}</p>;
					})}
			</div>
		</div>
	);
};

export default ScheduleItem;
