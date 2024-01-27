// HabitCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import Habit from '../lib/habit';

interface HabitCardProps {
    habit: Habit; // Use the Habit class instead of an object type
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
    const [updatedHabit, setUpdatedHabit] = useState(habit);

    return (
        <>
            <Card>
                {/* Render the habit properties as needed */}
                <CardHeader className='text-xl text'>{habit.name}</CardHeader>
                <CardContent>Test</CardContent>
                {habit.description ? <CardDescription>{habit.description}</CardDescription> : ""}
            </Card>
        </>
    );
}

export default HabitCard;
