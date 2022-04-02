import * as PIXI from 'pixi.js'
import { AdjustmentFilter } from 'pixi-filters'
import { BlurFilter } from '@pixi/filter-blur'
import nebulaImg from '../../../public/images/nebula.jpg'

export const masking = () => {
  const pixiElement = document.getElementById('pixi_wrapper')

  const app = new PIXI.Application({
    backgroundColor: 0xffffff,
    resizeTo: pixiElement
  })

  pixiElement.appendChild(app.view)

  const imageBW = PIXI.Sprite.from(nebulaImg)

  app.stage.addChild(imageBW)

  const imageColor = PIXI.Sprite.from(nebulaImg)

  app.stage.addChild(imageColor)

  const bwFilter = new AdjustmentFilter()
  bwFilter.saturation = 0
  bwFilter.gamma = 0.8
  imageBW.filters = [bwFilter]

  const colorFilter = new AdjustmentFilter()
  colorFilter.gamma = 1.5
  imageColor.filters = [colorFilter]

  const maskRadius = 250
  const maskBlur = 64
  const maskShape = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawCircle(maskBlur + maskRadius, maskBlur + maskRadius, maskRadius)
    .endFill()
  maskShape.filters = [new BlurFilter(maskBlur)]

  const maskBounds = new PIXI.Rectangle(
    0,
    0,
    (maskBlur + maskRadius) * 2,
    (maskBlur + maskRadius) * 2
  )

  const texture = app.renderer.generateTexture(
    maskShape,
    PIXI.SCALE_MODES.NEAREST,
    1,
    maskBounds
  )

  const masker = new PIXI.Sprite(texture)

  app.stage.addChild(masker)

  imageColor.mask = masker

  app.stage.interactive = true

  function moveMask(event) {
    masker.position.x = event.data.global.x - masker.width / 2
    masker.position.y = event.data.global.y - masker.height / 2
  }

  app.stage.on('mousemove', moveMask)
}
