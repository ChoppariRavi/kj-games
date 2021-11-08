import TicTocToe from "./Games/TicTocToe";

function App() {
  return (
    <div className="App bg-gradient-to-b from-blue-100 to-blue-400 w-screen h-screen">
      <header className="bg-gray-100 p-2 flex justify-center align-center shadow-lg">
        <h1 className="text-2xl font-black">KJ Games - Tic Toc Toe</h1>
      </header>
      <TicTocToe />
    </div>     
  );
}

export default App;
