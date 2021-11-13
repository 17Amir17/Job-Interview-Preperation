import { listen } from './scripts/listeners/listeners';
import './styles/styles.scss';
import 'regenerator-runtime/runtime.js';
import { loadLeaderboard } from './scripts/dom/loadLeaderboard';
import { login } from './scripts/dom/admin';

switch (window.location.pathname) {
  case '/leaderboard.html':
    loadLeaderboard();
    break;
  case '/admin.html':
    login();
    break;
  default:
    listen();
}
