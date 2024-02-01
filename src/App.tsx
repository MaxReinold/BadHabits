// App.tsx
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import HabitEditor from './components/HabitEditor';
import { useState } from 'react'; // Import useEffect
import HabitCard from './components/HabitCard';
import Habit from './lib/habit';

function App() {

  // Function to save data to local storage
  const saveData = (habits:Habit[]) => {
    const dataToSave = {
      habitList: habits,
    };
    localStorage.setItem('habitData', JSON.stringify(dataToSave));
  };

  // Function to retrieve data from local storage
  const retrieveData = () => {
    const savedData = localStorage.getItem('habitData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.habitList
    } else {
      return [];
    }
  };

  const [habitList, setHabitList] = useState<Habit[]>(retrieveData());

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
      saveData(updatedHabitList);
      return updatedHabitList;
    });
  }; 

  // Function to delete a habit
  const handleDeleteHabit = (toDelete : Habit) => {
    setHabitList((prevHabits) => {
      const updatedHabitList = prevHabits.filter(habit => habit.key != toDelete.key);
      saveData(updatedHabitList);
      return updatedHabitList;
    })
  }

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
                    onDelete={handleDeleteHabit} // Pass deletion function
                />
            ))}
        </section>

        <HabitEditor
            buttonLabel='New Habit'
            initialProps={Habit.initial()}
            onSubmit={(newProps) => {
                saveData([...habitList, newProps])
                setHabitList([...habitList, newProps])
            }}
        />
      </section>
    </ThemeProvider>
  );
}

export default App;
