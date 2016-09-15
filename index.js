(function(){

  'use strict';

  var container = document.getElementById('js-container'),
      image = document.getElementById('js-image');

  function calculateByAspectRatio(params) {
    var element = params.element,
        elementWidth = parseFloat(params.elementWidth),
        elementHeight = parseFloat(params.elementHeight),
        containerWidth = parseFloat(params.containerWidth),
        containerHeight = parseFloat(params.containerHeight),
        elementRatio, containerRatio, t, l, w, h, mt, ml;

    if (!element || element.nodeType !== 1) {
      throw new TypeError('element must be an Element node');
    }
    if (isNaN(elementWidth) || isNaN(elementHeight)) {
      throw new Error('elementWidth or elementHeight are NaN');
    }
    if (isNaN(containerWidth) || isNaN(containerHeight)) {
      throw new Error('containerWidth or containerHeight are NaN');
    }

    elementRatio = elementWidth / elementHeight;
    containerRatio = containerWidth / containerHeight;

    if (elementRatio > containerRatio) {
      w = 'auto';
      h = '100%';

      t = 0;
      l = '50%';

      mt = 0;
      ml = (- (containerHeight * elementRatio) / 2) + 'px';
    } else {
      w = '100%';
      h = 'auto';

      t = '50%';
      l = 0;

      mt = (- (containerWidth / elementRatio) / 2) + 'px';
      ml = 0;
    }

    return {
      top: t,
      left: l,
      width: w,
      height: h,
      marginTop: mt,
      marginLeft: ml
    };
  }

  function resizeImage() {
    var sizes = calculateByAspectRatio({
      element: image,
      elementWidth: image.naturalWidth,
      elementHeight: image.naturalHeight,
      containerWidth: container.scrollWidth,
      containerHeight: container.scrollHeight
    });

    image.style.top = sizes.top;
    image.style.left = sizes.left;

    image.style.width = sizes.width;
    image.style.height = sizes.height;

    image.style.marginTop = sizes.marginTop;
    image.style.marginLeft = sizes.marginLeft;
  }

  window.addEventListener('load', resizeImage, false);
  window.addEventListener('resize', resizeImage, false);

}());
