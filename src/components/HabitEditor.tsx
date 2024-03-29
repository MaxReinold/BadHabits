// HabitEditor.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import Habit from '../lib/habit';

interface HabitEditorProps {
    initialProps: Habit; // Use the Habit class instead of an object type
    onSubmit: (data: Habit) => void;
    buttonLabel: string; // Add a buttonLabel prop for the button text
}

const HabitEditor: React.FC<HabitEditorProps> = ({ initialProps, onSubmit, buttonLabel }) => {
    const [habitProps, setHabitProps] = useState(initialProps);
    
    if (habitProps.date == "") setHabitProps({ ...habitProps, date: (new Date()).toLocaleDateString() });
    if (habitProps.key == 0) setHabitProps({ ...habitProps, key: Math.floor(Math.random() * 10000000)})

    const [date, setDate] = useState<Date | undefined>(new Date(habitProps.date));

    const updateName = (event: { target: { value: any; }; }) => {
        setHabitProps({
            ...habitProps,
            name: event.target.value
        });
    }

    const updateDescription = (event: { target: { value: any; }; }) => {
        setHabitProps({
            ...habitProps,
            description: event.target.value
        });
    }

    const updateDate = (date: Date | undefined) => {
        if (date) {
            if (date < (new Date())) {
                setDate(date);
                setHabitProps({
                    ...habitProps,
                    date: date.toLocaleDateString()
                })
            }
        }
    }

    const isValid = () => {
        return habitProps.name != "";
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='ghost'>{buttonLabel}</Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col items-center gap-5 pt-10">
                    <SheetHeader>{initialProps.name == '' ? "New Habit" : "Edit " + initialProps.name}</SheetHeader>
                    <section className="w-full">
                        <Label className="text-xs text-gray-500" htmlFor="name">Habit Name</Label>
                        <Input id="name" value={habitProps.name} onChange={updateName} />
                    </section>
                    <section className="w-full">
                        <label className="text-xs text-gray-500" htmlFor="description">Description</label>
                        <Textarea id="description" value={habitProps.description} onChange={updateDescription} />
                    </section>
                    <section className="flex flex-col items-center">
                        <label className="text-s text-gray-500" htmlFor="startDate">Start Date</label>
                        <Calendar
                            id="startDate"
                            selected={date}
                            onSelect={updateDate}
                            mode='single'
                        />
                    </section>

                    {isValid() ? (
                        <SheetClose asChild>
                            <Button variant="outline" onClick={() => {
                                onSubmit(habitProps)
                                setHabitProps(initialProps)
                            }}>{buttonLabel}</Button>
                        </SheetClose>
                    ) : (
                        <SheetClose asChild>
                            <Button disabled>{buttonLabel}</Button>
                        </SheetClose>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}

export default HabitEditor;
