import Button from './components/ui/button';

function App() {
  return (
    <Button variant='link' onClick={() => console.log('hi')} type='submit'>
      Start
    </Button>
  );
}

export default App;
