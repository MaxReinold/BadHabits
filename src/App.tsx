import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Label } from './components/ui/label';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './components/ui/drawer';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';

const testData = {
  "milestones":[
    7,14,30,60,90,120,150
  ],
  "habits":[
    {"key":1,"name":"Waking up late", "duration": 1, "nextMilestone": 7, "description":"No description provided."},
    {"key":2,"name":"Skipping class", "duration": 5, "nextMilestone": 7, "description":"No description provided."},
    {"key":3,"name":"Wasting Time", "duration": 3, "nextMilestone": 7, "description":null},
  ]
}

function App() {
  testData.habits = testData.habits.map(habit => ({...habit, "key":Math.round(Math.random()*1000000)}))
  const [data, setData] = useState(testData);
  
  const [newHabit, setNewHabit] = useState({
    "name":"",
    "description":""
  })

  const handleNameChange = (e:any) => {
    setNewHabit({...newHabit, "name":e.target.value})
  }
  
  const handleDescChange = (e:any) => {
    setNewHabit({...newHabit, "description":e.target.value})
  }

  const createNewHabit = () => {
    let tempNewHabit = {
      "key":Math.round(Math.random()*1000000),
      "name":newHabit.name,
      "description":newHabit.description,
      "duration":0,
      "nextMilestone":7
    }
    data.habits.push(tempNewHabit);
    setData(data);
    setNewHabit({
      "name":"",
      "description":""
    })
  }

  const [newHabitError, setNewHabitError] = useState(false);

  const removeHabit = (habitId:number) => {
    setData(prevData => {
      return {
        ...prevData,
        habits: prevData.habits.filter(habit => habit.key !== habitId)
      };
    });
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>
        <section className='flex flex-wrap gap-16 p-16 justify-center'>
          {data.habits.map((habit) => (
            <Card className='flex-initial rounded-sm p-4 w-[20rem] flex flex-col gap-4 h-fit'>
              <CardTitle className="border-b-2 pb-4">{habit.name}</CardTitle>
              <CardContent className="flex flex-col gap-4">
                <Label htmlFor={"habit-" + habit.key + "-progress"}>{habit.duration} / {habit.nextMilestone} days till goal</Label>
                <Progress value={habit.duration * (100/habit.nextMilestone)} id={"habit-" + habit.key + "-progress"}/>
                {(habit.description != null) ? <p>{habit.description}</p> : ""}
                <Button variant="destructive" onClick={() => removeHabit(habit.key)}>Remove Habit</Button>
              </CardContent>
            </Card>
          ))}
        </section>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">New Habit</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className='text-center pt-4'>
              New Habit
            </DrawerTitle>
            <div className='mx-auto w-full max-w-md p-4 flex flex-col gap-5 h-[50vh]'>
              <Input 
                value={newHabit.name} 
                id='newHabitName'
                onChange={handleNameChange}
                placeholder='Name'
              />
              <Textarea 
                value={newHabit.description} 
                id='newHabitDescription'
                onChange={handleDescChange}
                placeholder='Description'
              />
              <Button onClick={() => {
                console.log(data.habits)
                if(newHabit.name !== "" && data.habits.filter(el => (el.name === newHabit.name)).length == 0) {
                  setNewHabitError(false);
                  createNewHabit();
                } else {
                  setNewHabitError(true);
                }
              }}>Create</Button>
              <Badge className={(newHabitError?"":"hidden")} variant="destructive">Name must not be empty or taken.</Badge>
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </ThemeProvider>
  );
}

export default App;
