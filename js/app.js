/* Entry Point */

import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { apiUrl } from "./model/data/apiUrl.js";

import { NavModel } from "./Model/navModel.js";
import { slideMenuData } from './Model/data/slideMenuData.js';

import Nav from "./View/Nav.js";
import BestMenu from "./View/BestMenu.js";
import Promotion from './View/Promotion.js'
import Slider from './View/Slider.js';

import { bestMenuItemTpl } from "./templates/bestMenuTpl.js";
import { slideTpl } from './templates/slideMenuTpl.js'

import { RequestAnimations } from './Util/raf.js'

const navModel = new NavModel(navItemList);

const nav = new Nav();
const bestMenu = new BestMenu(apiUrl.bestMenu, bestMenuItemTpl);
const promotion = new Promotion(RequestAnimations);

const sideMenuSlide = new Slider({
  category: 'side', apiUrl: apiUrl.sideMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

const mainMenuSlide = new Slider({
  category: 'main', apiUrl: apiUrl.mainMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

const courseMenuSlide = new Slider({
  category: 'course', apiUrl: apiUrl.courseMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

const engine = new Engine(
  nav, navModel, bestMenu, promotion, sideMenuSlide, mainMenuSlide, courseMenuSlide);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));