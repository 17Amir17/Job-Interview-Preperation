import { listen } from './scripts/listeners/listeners';
import './styles/styles.scss';
import 'regenerator-runtime/runtime.js';
import { loadLeaderboard } from './scripts/dom/loadLeaderboard';

switch (window.location.pathname) {
  case '/leaderboard.html':
    loadLeaderboard();
    break;
  default:
    listen();
}
