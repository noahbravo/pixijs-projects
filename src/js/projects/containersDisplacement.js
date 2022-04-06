import * as PIXI from 'pixi.js'
import { AdjustmentFilter } from 'pixi-filters'
import { DisplacementFilter } from '@pixi/filter-displacement'
import customCursorImg from '../../../public/images/customcursor.png'
import polybgImg from '../../../public/images/polybg.jpg'
import displaceImg from '../../../public/images/displace.png'

export const containersdDisplacement = () => {
  const pixiElement = document.getElementById('pixi_wrapper')

  const app = new PIXI.Application({
    backgroundColor: 0x1d1d1d,
    resizeTo: pixiElement
  })

  pixiElement.appendChild(app.view)

  const customCursor = `url(${customCursorImg}), auto`

  app.renderer.plugins.interaction.cursorStyles.default = customCursor

  const container = new PIXI.Container()
  app.stage.addChild(container)

  const bgimg = PIXI.Sprite.from(polybgImg)
  container.addChild(bgimg)

  const adjustmentFilter = new AdjustmentFilter()

  adjustmentFilter.red = 1
  adjustmentFilter.green = 0.5
  adjustmentFilter.blue = 1

  bgimg.filters = [adjustmentFilter]

  const style01 = new PIXI.TextStyle({
    fontFamily: 'Raleway',
    fontSize: 62,
    fontStyle: 'italic',
    fill: ['#ffffff', '#eeeeee'],
    stroke: '#ffffff',
    strokeThickness: 1,
    dropShadow: true,
    dropShadowAlpha: 1,
    dropShadowColor: '#000000',
    dropShadowBlur: 12,
    dropShadowDistance: 10
  })

  const style02 = new PIXI.TextStyle({
    fontFamily: 'Playfair Display',
    fontSize: 150,
    fontWeight: 'bold',
    fill: '#DC0038',
    stroke: '#4D091C',
    strokeThickness: 3,
    letterSpacing: 4,
    dropShadow: true,
    dropShadowAlpha: 0.75,
    dropShadowColor: '#000000',
    dropShadowBlur: 12,
    dropShadowDistance: 10
  })

  const text01 = new PIXI.Text('Text Styling in', style01)
  text01.x = app.screen.width / 2 - text01.width / 2
  text01.y = app.screen.height / 2 - text01.height / 2 - 58
  container.addChild(text01)

  const text02 = new PIXI.Text('PixiJS', style02)
  text02.x = app.screen.width / 2 - text02.width / 2
  text02.y = app.screen.height / 2 - text02.height / 2 + 58
  container.addChild(text02)

  const displacementSprite = PIXI.Sprite.from(displaceImg)
  displacementSprite.scale.x = 2
  displacementSprite.scale.y = 2
  displacementSprite.anchor.set(0.5)
  app.stage.addChild(displacementSprite)

  const displacementFilter = new DisplacementFilter(displacementSprite)
  displacementFilter.scale.x = 100
  displacementFilter.scale.y = 100

  container.filters = [displacementFilter]

  app.stage.interactive = true
  app.stage.on('mousemove', onMouseMove)

  function onMouseMove(event) {
    displacementSprite.position.set(event.data.global.x, event.data.global.y)
  }
}
