import Menu from './components/Menu';

const App = () => {
  return (
    <div>
      <h1 className='fw-500-md'>Kanban task management</h1>
      <Menu
        menuItems={[
          {
            text: 'Edit Task',
            variant: 'primary',
            onClick() {
              console.log('clicked');
            },
          },
          {
            text: 'Delete Task',
            variant: 'danger',
            onClick() {
              console.log('clicked');
            },
          },
          {
            text: 'Edit Task',
            variant: 'primary',
            onClick() {
              console.log('clicked');
            },
          },
          {
            text: 'Delete Task',
            variant: 'danger',
            onClick() {
              console.log('clicked');
            },
          },
          {
            text: 'Edit Task',
            variant: 'primary',
            onClick() {
              console.log('clicked');
            },
          },
          {
            text: 'Delete Task',
            variant: 'danger',
            onClick() {
              console.log('clicked');
            },
          },
        ]}
      />
    </div>
  );
};

export default App;
