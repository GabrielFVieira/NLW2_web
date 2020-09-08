import React, { useState, useEffect } from 'react';

import ScheduleItem from '../ScheduleItem';
import weekDays from '../../assets/utils/weekDays';

import './styles.css';

export interface Schedule {
    id?: number,
    to_formated: string,
    from_formated: string,
    week_day: number,
}

interface ScheduleBarProps {
    schedules: Schedule[];
}

const ScheduleBar:React.FC <ScheduleBarProps> = ({ schedules }) => {
    const days = weekDays.map(day => day.label.split('-')[0]);
    const [schedulesGrouped, setSchedulesGrouped] = useState(new Map());
    
    useEffect(groupSchedules, []);

    function groupSchedules() {
        let schedulesFormated = new Map();

        schedules.forEach((schedule:Schedule) => {
            const fromArray = [];
            const toArray = [];

            fromArray.push(schedule.from_formated);
            toArray.push(schedule.to_formated);

            const item = {
                from_formated: fromArray,
                to_formated: toArray
            }

            if(schedulesFormated.has(schedule.week_day)) {
                item.to_formated = item.to_formated.concat(schedulesFormated.get(schedule.week_day).to_formated);
                item.from_formated = item.from_formated.concat(schedulesFormated.get(schedule.week_day).from_formated);
            }
            
            schedulesFormated.set(schedule.week_day, item);
        })
        
        setSchedulesGrouped(schedulesFormated);
    }

    return (
        <div className="schedule-bar">
            
        {days.length > 0 && 
            days.map((day:string, index:number) => {
                return <ScheduleItem key={index} schedule={schedulesGrouped.get(index)} week_day={day} />;
            })
        }   
            
        </div>
    );
}

export default ScheduleBar;