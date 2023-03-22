import BoardBar from './components/BoardBar';

const App = () => (
  <div>
    <BoardBar
      boardItems={[
        { text: 'Platform Launch', onClick: () => {} },
        { text: 'Marketing Plan', onClick: () => {} },
        { text: 'Roadmap', onClick: () => {} },
      ]}
      onCreate={() => {}}
    />
  </div>
);

export default App;
