'use strict';

window.bmcPage || (window.bmcPage = {});

bmcPage.index = (function(lumiUtil, TemplateRenderer, Tab, VisualSlider, ListSlider) {

  /* data */

  const urlInfo = {
    domain: 'https://github.com/lumiloves/javascript-food/blob/master/src/data',
    bestDish: '/best.json',
    sideDish: '/side.json',
    mainDish: '/main.json',
    soup: '/soup.json'
  };


  /* UI instance */

  const oVisualSlider_promotion = new VisualSlider({
    wrapperElem: document.querySelector('#main-visual'),
    dom: lumiUtil.dom,
    animation: lumiUtil.animation,
    OPACITY_INTERVAL_VALUE: [ 0.11, 0.08 ],
    useJsAnimation: true
  });

  const oTab_bestDish = new Tab({
    wrapperElem: document.querySelector('#best-seller .tab-box'),
    dom: lumiUtil.dom,
    reqUrlItemAll: urlInfo.domain + urlInfo.bestDish
  });
  const oTabRenderer_bestDish = new TemplateRenderer({
    templateHTML: document.querySelector('[data-template-html="best-seller__tab-content-item"]').innerHTML
  });

  const oListSliderArr_dish = [
    urlInfo.domain + urlInfo.sideDish,
    urlInfo.domain + urlInfo.mainDish,
    urlInfo.domain + urlInfo.soup
  ].map((url, i) => {
    return new ListSlider({
      wrapperElem: document.querySelectorAll('.sliding-list-box')[i],
      dom: lumiUtil.dom,
      itemCountPerGroup: 4 - i,
      reqUrlItemAll: url
    });
  });
  const oListSliderRenderer_dish = new TemplateRenderer({
    templateHTML: document.querySelector('[data-template-html="side-dish__content-box"]').innerHTML
  });

  
  /* initIndexPage */

  function initIndexPage() {
    oVisualSlider_promotion.init();

    oTab_bestDish.addModule('renderer', oTabRenderer_bestDish);
    oTab_bestDish.init();

    oListSliderArr_dish.forEach((oListSlider_dish) => {
      oListSlider_dish.addModule('renderer', oListSliderRenderer_dish);
      oListSlider_dish.init();
    });
  }

  return {
    init: initIndexPage
  }
})(lumiUtil, TemplateRenderer, Tab, VisualSlider, ListSlider);
