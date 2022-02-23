import '../styles/main.css';
import {StartApp} from './components/app/start';
import {Statistics} from './components/app/statistics';

const startApp = new StartApp();
startApp.render(true);

const statistics = new Statistics();

const updateStatistics = async () => {
  await statistics.updateStatistics(0, 0, 'audio-challenge', 0, 0, 0);
  statistics.updateStatistics(0, 0, 'sprint', 0, 0, 0);
};

updateStatistics();