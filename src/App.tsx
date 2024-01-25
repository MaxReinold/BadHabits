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
import { Calendar } from './components/ui/calendar';
import { IoMdAdd } from "react-icons/io";

const testData = {
  "milestones": [
    {"name": "1 Week", "duration": 7},
    {"name": "2 Weeks", "duration": 14},
    {"name": "1 Month", "duration": 30},
    {"name": "2 Months", "duration": 60},
    {"name": "3 Months", "duration": 90},
    {"name": "4 Months", "duration": 120},
    {"name": "5 Months", "duration": 150},
    {"name": "6 Months", "duration": 180},
    {"name": "9 Months", "duration": 270},
    {"name": "1 Year", "duration": 365}
  ],
  "habits":[
    {"key":1,"name":"Waking up late", "description":"", "date":"2024-01-01"},
    {"key":2,"name":"Skipping class", "description":"", "date":"2024-01-05"},
    {"key":3,"name":"Wasting Time", "description":"", "date":"2024-01-03"},
  ]
}

function formatDate(date:Date) {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function App() {
  testData.habits = testData.habits.map(habit => ({...habit, "key":Math.round(Math.random()*1000000)}))
  const [data, setData] = useState(testData);
  
  const [newHabit, setNewHabit] = useState({
    "name":"",
    "description":"",
    "date":new Date()
  })

  const handleNameChange = (e:any) => {
    setNewHabit({...newHabit, "name":e.target.value})
  }
  
  const handleDescChange = (e:any) => {
    setNewHabit({...newHabit, "description":e.target.value})
  }

  const handleDateChange = (date:any) => {
    setNewHabit({...newHabit, "date":date});
  }

  const createNewHabit = () => {
    let tempNewHabit = {
      "key":Math.round(Math.random()*1000000),
      "name":newHabit.name,
      "description":newHabit.description,
      "duration":0,
      "nextMilestone":7,
      "date":formatDate(newHabit.date)
    }
    data.habits.push(tempNewHabit);
    setData(data);
    setNewHabit({
      "name":"",
      "description":"",
      "date":new Date()
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

  const calculateDuration = (startDate:any) => {
    const start:any = new Date(startDate);
    const now:any = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }

  const findNextMilestoneIndex = (duration:any) => {
    return data.milestones.findIndex(milestone => milestone.duration > duration);
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>
        <section className='flex flex-wrap gap-16 p-16 justify-center'>
          {data.habits.map((habit) => {
            const duration = calculateDuration(habit.date);
            const nextMilestoneIndex = findNextMilestoneIndex(duration);
            const nextMilestone = data.milestones[nextMilestoneIndex] || data.milestones[data.milestones.length - 1];

            return (
              <Card className='flex-initial rounded-sm p-4 w-80 flex flex-col gap-4 h-fit'>
                <CardTitle className="border-b-2 pb-4 relative">
                  {habit.name}
                </CardTitle>
                <CardContent className="flex flex-col gap-4">
                  <Label htmlFor={"habit-" + habit.key + "-progress"}>{nextMilestone.duration - duration} days till {nextMilestone.name}</Label>
                  <Progress value={duration * (100 / nextMilestone.duration)} id={"habit-" + habit.key + "-progress"}/>
                  {(habit.description != null && habit.description != "") ? <p>{habit.description}</p> : ""}
                  <Button variant="destructive" onClick={() => removeHabit(habit.key)}>Remove Habit</Button>
                </CardContent>
              </Card>
            )
          })}
        </section>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size='icon'><IoMdAdd /></Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className='text-center pt-4'>
              New Habit
            </DrawerTitle>
            <div className='mx-auto w-full max-w-md p-4 flex flex-col items-center gap-5'>
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
              
              <Calendar 
                mode='single'
                selected={newHabit.date}
                onSelect={handleDateChange}
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
              {(newHabitError?<Badge variant="destructive">Name must not be empty or taken.</Badge>:"")}
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </ThemeProvider>
  );
}

export default App;
