// App.tsx
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import HabitEditor from './components/HabitEditor';
import { useState, useEffect } from 'react'; // Import useEffect
import HabitCard from './components/HabitCard';
import Habit from './lib/habit';

function App() {
  const [habitList, setHabitList] = useState<Habit[]>([])

  const tempHabit = new Habit(
    10,
    "temp name",
    "temp desc",
    (new Date()).toLocaleDateString()
  );

  useEffect(() => {
    // Add the tempHabit to the habitList when the component mounts
    setHabitList([...habitList, tempHabit]);
  }, []); // Empty dependency array to run the effect only once when mounted

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>

        <section className='p-10 flex flex-wrap gap-10'>
          {habitList.map((habit) => (
            <HabitCard
              key={habit.key} // You should use a unique key for each habit
              habit={habit}
            />
          ))}
        </section>

        <HabitEditor
          initialProps={Habit.initial()}
          onSubmit={(newProps) => {
            setHabitList([...habitList, newProps])
          }}
        />
      </section>
    </ThemeProvider>
  );
}

export default App;
