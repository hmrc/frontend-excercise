/* eslint-env jquery */

require('jquery')

function getWindowScroll () {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageXOffset || document.documentElement.scrollLeft
  }
}

function calcRect (el) {
  var rect = el.getBoundingClientRect()
  var windowScroll = getWindowScroll()
  var style = el.currentStyle || window.getComputedStyle(el)

  return {
    top: rect.top + windowScroll.top,
    width: rect.width,
    height: rect.height + parseInt(style.marginTop) + parseInt(style.marginBottom)
  }
}

module.exports = function (settings) {
  'use strict'

  var el = $(settings.el)[0]
  var className = settings.className
  var requiredTop = settings.top || 0
  var originalRect = calcRect(el)
  var placeholder = document.createElement('div')

  placeholder.id = 'placeholder'
  placeholder.style.width = originalRect.width + 'px'
  placeholder.style.height = originalRect.height + 'px'

  $(window).scroll(function (event) {
    if (getWindowScroll().top > originalRect.top - requiredTop) {
      $(el).addClass(className).after(function () {
        if (!document.getElementById('placeholder')) {
          return placeholder
        }
      })
    } else {
      $(el).removeClass(className)
      $(placeholder).remove()
    }
  })
}
