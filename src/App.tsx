// App.tsx
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import HabitEditor from './components/HabitEditor';
import { useState } from 'react'; // Import useEffect
import HabitCard from './components/HabitCard';
import Habit from './lib/habit';

function App() {
  const [habitList, setHabitList] = useState<Habit[]>([])

  // Function to update an existing habit in the list
  const handleEditHabit = (editedHabit: Habit) => {
    setHabitList((prevHabits) => {
        const updatedHabitList = prevHabits.map((habit) => {
            if (habit.key === editedHabit.key) {
                return editedHabit; // Replace the edited habit
            } else {
                return habit; // Keep other habits as they are
            }
        });
        return updatedHabitList;
    });
  }; 

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>

        <section className='p-10 flex flex-wrap gap-10'>
            {habitList.map((habit) => (
                <HabitCard
                    key={habit.key}
                    habit={habit}
                    onEdit={handleEditHabit} // Pass the editing function to HabitCard
                />
            ))}
        </section>

        <HabitEditor
            buttonLabel='New Habit'
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
