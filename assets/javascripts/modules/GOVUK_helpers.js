module.exports = {
  expires: '',
  cookieDomain: '',

  setCookie: function (name, value, duration, domain) {
    var secure = window.location.protocol.indexOf('https') ? '' : '; secure'

    if (domain) {
      this.cookieDomain = '; domain=' + domain
    }

    if (duration) {
      var date = new Date()
      date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000))
      this.expires = '; expires=' + date.toGMTString()
    }

    document.cookie = name + '=' + value + this.expires + this.cookieDomain + '; path=/' + secure
  },

  getCookie: function (name) {
    var i, c
    var nameEQ = name + '='
    var ca = document.cookie.split(';')

    for (i = 0; i < ca.length; i += 1) {
      c = ca[i]

      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }

    return null
  },

  // TODO: remove this if it isn't being used
  eraseCookie: function (name) {
    this.setCookie(name, '', -1)
  }
}
