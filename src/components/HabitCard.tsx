// HabitCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';
import Habit from '../lib/habit';
import HabitEditor from './HabitEditor';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog';

interface HabitCardProps {
    habit: Habit;
    onEdit: (habit: Habit) => void; // Add an onEdit prop to handle editing
    onDelete: (habit: Habit) => void;
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

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit, onDelete }) => {
    const [updatedHabit, setUpdatedHabit] = useState(habit);

    return (
        <>
            <Card className='p-5 flex flex-col w-80 h-fit group'>
                <CardHeader className='text-xl text p-0'>{updatedHabit.name}</CardHeader>
                {updatedHabit.description ? <CardDescription>{updatedHabit.description}</CardDescription> : ""}
                <CardContent className='p-2'>
                    <p>{(getCalendarDaysSinceDate(updatedHabit.date)>=1)?getCalendarDaysSinceDate(updatedHabit.date) + " days strong!":"First Day"}</p>
                </CardContent>
                <CardFooter className='flex flex-row justify-center p-0 h-0 group-hover:h-9 overflow-hidden transition-all'>
                    <HabitEditor
                        buttonLabel='Edit'
                        initialProps={updatedHabit}
                        onSubmit={(editedHabit) => {
                            setUpdatedHabit(editedHabit);
                            onEdit(editedHabit);
                        }}
                    /> 
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant='ghost'>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-80">
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. <br />This will permanently delete the habit "{updatedHabit.name}"
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button variant='destructive' onClick={() => {
                                onDelete(habit);
                            }}>
                                Delete
                            </Button>
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </>
    );
}

export default HabitCard;
