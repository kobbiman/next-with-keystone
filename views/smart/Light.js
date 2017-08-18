import { dom } from '../common'

exports = module.exports = {
  isLigint: 1,
  turnOn () {
    dom.rmClass(document.body, 'dark')
    this.isLigint = 0
  },
  turnOff () {
    dom.addClass(document.body, 'dark')
    this.isLigint = 1
  }
}
