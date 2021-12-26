import '../css/style.scss';
import app from './app';
import globalState from './GlobalState';


export default () => {
  app(globalState);
};

