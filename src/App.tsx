import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardFooter, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Label } from './components/ui/label';
import { useState } from 'react';
import { Button } from './components/ui/button';

const testData = {
  "milestones":[
    7,14,30,60,90,120,150
  ],
  "habits":[
    {"name":"Waking up late", "duration": 1, "nextMilestone": 7, "description":"No description provided."},
    {"name":"Skipping class", "duration": 5, "nextMilestone": 7, "description":"No description provided."},
    {"name":"Wasting Time", "duration": 3, "nextMilestone": 7, "description":null},
  ]
}

function App() {

  const [data, setData] = useState(testData);

  const removeHabit = (habitIndex:number) => {
    setData(prevData => {
      return {
        ...prevData,
        habits: prevData.habits.filter((_, index) => index !== habitIndex)
      };
    });
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>
        <section className='flex gap-16 p-16 justify-center'>
          {data.habits.map((habit, i) => (
            <Card className='flex-initial rounded-sm p-4 w-[20rem] flex flex-col gap-4 h-fit'>
              <CardTitle className="border-b-2 pb-4">{habit.name}</CardTitle>
              <CardContent className="flex flex-col gap-4">
                <Label htmlFor={"habit-" + i + "-progress"}>{habit.duration} / {habit.nextMilestone} days till goal</Label>
                <Progress value={habit.duration * (100/habit.nextMilestone)} id={"habit-" + i + "-progress"}/>
                {(habit.description != null) ? <p>{habit.description}</p> : ""}
                <Button variant="destructive" onClick={() => removeHabit(i)}>Remove Habit</Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </section>
    </ThemeProvider>
  );
}

export default App;
