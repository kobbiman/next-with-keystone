exports = module.exports = {
  rmClass (dom, cn) {
    var reg = new RegExp(`(\\s|^)${cn}$(\\s|$)`)
    dom.className = dom.className.replace(reg, '')
    if (reg.test(dom.className)) {
      this.rmClass (dom, cn)
    }
  },
  addClass (dom, cn) {
    if (dom.className) {
      dom.className = `${dom.className} ${cn}`
    } else {
      dom.className = cn
    }
  }
}
