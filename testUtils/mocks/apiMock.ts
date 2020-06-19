import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const apiMock = new MockAdapter(axios);

export default apiMock;
