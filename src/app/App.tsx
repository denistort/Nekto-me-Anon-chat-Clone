import {FC, lazy, Suspense} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import LoadingScreen from "@app/components/Loading-Screen";

const Main = lazy(() => import('./components/Main-menu'));
const store = setupStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<LoadingScreen text={'Загрузка приложения...'}/>}>
          <Main />
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
