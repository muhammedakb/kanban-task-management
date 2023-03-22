import BoardBar from './components/BoardBar';
import Header from './components/Header';

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
    <Header
      menuItems={[
        {
          text: 'Edit Board',
          variant: 'primary',
          onClick: () => {
            console.log('clicked');
          },
        },
        {
          text: 'Delete Board',
          variant: 'danger',
          onClick: () => {
            console.log('clicked');
          },
        },
      ]}
      onAddNewTaskClick={() => console.log('askldfjkasdlf')}
      title="Platform Launch"
    />
  </div>
);

export default App;
