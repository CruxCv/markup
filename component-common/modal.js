/**
 * 无依赖图片预览
 * 
 * Usage
 * 可以在componentWillReceiveProps中触发
 * 确保目标内容被渲染
 * 
 * 例：
 * import EasyPicturePreview from './EasyPicturePreview'
 * 
 * componentWillReceiveProps(nextProps) {
 *   if (nextProps.result) {
 *     setTimeout(() => {
 *       const epp = new EasyPicturePreview()
 *
 *       epp.findNode('modal-class-pop')
 *     }, 0);
 *   }
 * } 
 * 
 * @findNode params
 * className: string
 */

export class EasyPicturePreview {
  constructor() {
    this.elms = {}
  }

  findNode(className) {
    this.className = className
    const selectors = document.querySelectorAll(`img.${className}`)
    
    selectors.forEach((elm, index) => {
      // 
      elm.style.cursor = 'pointer'
      this.elms[index] = { elm }

      elm.addEventListener('click', this.createModal.bind(this, index))
    })
  }

  createModal(index) {
    const src = this.elms[index]['elm'].getAttribute('src')
    let wrap = document.createElement('div')
    let modal = document.createElement('div')
    let img = document.createElement('img')
    let cancel = document.createElement('span')

    const self = this
    // 兼容webkit
    // 此处做一下兼容
    // 可能不会经过预处理
    wrap.setAttribute('style', `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0,0,0,.5);
      z-index: 999;
      text-align: center;
      cursor: pointer;
    `)
    wrap.addEventListener('click', self.hideElement.bind(self, wrap))

    modal.setAttribute('style', `
      position: relative;
      display: inline-block;
      max-width: 800px;
      margin-top: 100px;
      min-width: 600px;
      width: 45%;
    `)
    modal.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
    })

    img.setAttribute('src', src)

    img.setAttribute('style', `
      width: 100%;
      border-radius: 5px;
      cursor: auto;
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
  }

  hideElement(elm) {
    elm.remove()
  }
}

export default classAddModal
