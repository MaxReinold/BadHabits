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
    {"name":"Wasting Time", "duration": 3, "nextMilestone": 7, "description":"No description provided."},
  ]
}

function App() {

  const [data, setData] = useState(testData);

  const removeHabit = (event) => {
    let {target} = event;
    let newData = {...data};
    newData.habits.splice(parseInt(target.parentElement.parentElement.id.substr(7)), 1);
    setData(newData);
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>
        <section className='flex gap-16 p-16 justify-center'>
          {data.habits.map((habit, i) => (
            <Card id={"habbit-" + i} className='flex-initial rounded-sm pt-4 w-[20rem]'>
              <CardTitle>{habit.name}</CardTitle>
              <CardContent className="p-4">
                <Progress value={habit.duration * (100/habit.nextMilestone)} id={"habbit-" + i + "-progress"}/>
                <Label htmlFor={"habbit-" + i + "-progress"}>{habit.duration} / {habit.nextMilestone} days till goal</Label>
                <p className='pt-4'>{habit.description}</p>
              </CardContent>
              <CardFooter className='flex justify-end'><Button variant="destructive" onClick={removeHabit}>Remove Habit</Button></CardFooter>
            </Card>
          ))}
        </section>
      </section>
    </ThemeProvider>
  );
}

export default App;
