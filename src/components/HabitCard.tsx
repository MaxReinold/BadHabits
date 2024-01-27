// HabitCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import Habit from '../lib/habit';
import HabitEditor from './HabitEditor';

interface HabitCardProps {
    habit: Habit;
    onEdit: (habit: Habit) => void; // Add an onEdit prop to handle editing
}

function getCalendarDaysSinceDate(dateString: string): number {
    const habitDate = new Date(dateString); // Convert the habit date to a Date object
    const currentDate = new Date(); // Get the current date
  
    // Set the time of both dates to midnight (00:00:00)
    habitDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    const timeDifference = currentDate.getTime() - habitDate.getTime(); // Calculate time difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
  
    return daysDifference;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit }) => {
    const [updatedHabit, setUpdatedHabit] = useState(habit);

    return (
        <>
            <Card className='p-5 flex flex-col'>
                <CardHeader className='text-xl text p-0'>{habit.name}</CardHeader>
                {habit.description ? <CardDescription>{habit.description}</CardDescription> : ""}
                <CardContent className=''>
                    <p>Going strong for {getCalendarDaysSinceDate(habit.date)} days!</p>
                    <p>{habit.key}</p>
                </CardContent>
                <HabitEditor
                    buttonLabel='Edit'
                    initialProps={habit}
                    onSubmit={(editedHabit) => {
                        setUpdatedHabit(editedHabit);
                        onEdit(editedHabit); // Pass the edited habit to the parent component
                    }}
                />
            </Card>
        </>
    );
}

export default HabitCard;
