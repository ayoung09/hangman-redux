import { createStore } from 'redux';
import reducer from './modules/hangman.module';

const store = createStore(reducer);

export default store;