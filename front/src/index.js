import { listen } from './scripts/listeners/listeners';
import './styles/styles.scss';
import 'regenerator-runtime/runtime.js';
import { loadLeaderboard } from './scripts/dom/loadLeaderboard';
import { loadAdmin } from './scripts/dom/admin';

switch (window.location.pathname) {
  case '/leaderboard.html':
    loadLeaderboard();
    break;
  case '/admin.html':
    loadAdmin();
    break;
  default:
    listen();
}
