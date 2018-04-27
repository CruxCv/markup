/**
 * 无依赖图片预览
 * 
 * Usage
 * 需要在componentWillReceiveProps中触发
 * 需要确保目标内容被渲染
 * 
 * 例：
 * import classAddModal from 'Utils/classAddModal'
 * 
 * componentWillReceiveProps(nextProps) {
 *   if (nextProps.result) {
 *     setTimeout(() => {
 *       const modalClass = new classAddModal()
 *
 *       modalClass.findNode('modal-class-pop')
 *     }, 0);
 *   }
 * } 
 */

export class classAddModal {
  constructor() {
    this.elms = {}
  }

  findNode(className) {
    this.className = className

    const selectors = document.querySelectorAll(`img.${className}`)
    
    selectors.forEach((elm, index) => {
      // 存下elm
      // 便于减少后续重复生成modal
      elm.style.cursor = 'pointer'
      this.elms[index] = {
        elm
      }

      elm.addEventListener('click', this.createModal.bind(this, index))
    })
  }

  createModal(index) {
    if (this.elms[index] && this.elms[index]['className']) {
      const target = document.querySelector(`.${this.elms[index]['className']}`)
      this.showElement(target)

      return
    }

    const src = this.elms[index]['elm'].getAttribute('src')
    let wrap = document.createElement('div')
    let modal = document.createElement('div')
    let img = document.createElement('img')
    let cancel = document.createElement('span')

    const self = this
    // 兼容webkit
    wrap.setAttribute('class', `img-modal-${index}`)
    wrap.setAttribute('style', `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0,0,0,.4);
      z-index: 999;
      text-align: center;
      transition: all .5s ease-in;
    `)
    wrap.addEventListener('click', self.hideElement.bind(self, wrap))

    modal.setAttribute('style', `
      position: relative;
      display: inline-block;
      max-width: 800px;
      margin-top: 100px;
    `)

    img.setAttribute('src', src)

    img.setAttribute('style', `
      width: 100%;
      border-radius: 5px;
    `)

    cancel.innerHTML = '+'

    cancel.setAttribute('style', `
      position: absolute;
      top: -20px;
      right: -30px;
      color: #fff;
      font-size: 36px;
      transform: rotate(45deg);
      cursor: pointer;
    `)
    cancel.addEventListener('click', self.hideElement.bind(self, wrap))

    modal.appendChild(img)
    modal.appendChild(cancel)
    wrap.appendChild(modal)

    document.body.appendChild(wrap)

    this.elms[index]['className'] = `img-modal-${index}`
  }

  hideElement(elm) {
    elm.style.display = 'none'
  }

  showElement(elm) {
    elm.style.display = 'block'
  }
}

export default classAddModal
