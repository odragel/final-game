
import '../assets/css/main.css';
require.context('../assets/images/', true);
require.context('../assets/audio/', true);

import {MainController} from "./js/controller/MainController";
let mainController = new MainController();