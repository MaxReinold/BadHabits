import './App.css';
import { ThemeProvider } from "@/components/theme-provider";

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <section>
        <h1 className='text-4xl font-extrabold'>My Habits</h1>
      </section>
    </ThemeProvider>
  );
}

export default App;
