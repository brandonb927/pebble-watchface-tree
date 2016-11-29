var rocky = require('rocky')

var colors = [
  '#AAFFAA',
  '#55FFFF',
  '#FFFF55',
  '#FFAA00',
  '#FF0055',
  '#FF55FF',
  '#AA55FF',
  '#FFAAAA',
  '#AAAAFF',
  '#0055FF',
]

var generateColor = function (prevColor) {
  var color = colors[Math.floor(Math.random() * colors.length)]

  if (color == prevColor) {
    color = generateColor(color)
  }

  return color
}

var config = {
  // Branding
  brand: {
    // Branding - Colours
    colorPrimary: '#55aa55',
    colorSecondary: '#fff',

    // Branding - Colours
    fontPrimary: '18px bold Gothic',
    fontSecondary: '32px bold numbers Leco-numbers',
  },
}

var canvasBox = function (ctx) {
  var w = ctx.canvas.unobstructedWidth // 144
  var h = ctx.canvas.unobstructedHeight // 168

  return {
    w: w,
    h: h,
    centerY: (h / 2),
    centerX: (w / 2),
  }
}

var uoHeight = function (ctx, posX) {
  var w = canvasBox(ctx).w
  var h = canvasBox(ctx).h
  var obstruction_h = (h - w - 3)
  return (posX - obstruction_h)
}

var drawTree = function (ctx, colorPrimary) {
  var w = canvasBox(ctx).w
  var h = canvasBox(ctx).h
  var centerY = canvasBox(ctx).centerY
  var centerX = canvasBox(ctx).centerX

  // Tree
  var branchThickness = 10
  var branchLength = 26
  var branchXPos = (centerX + branchLength)
  var branchXNeg = (centerX - branchLength)

  ctx.strokeStyle = colorPrimary
  ctx.lineWidth = branchThickness
  ctx.beginPath()

  ctx.moveTo(centerX, (centerY - 70))
  ctx.lineTo(centerX, (centerY + 30))

  ctx.moveTo(centerX, (centerY - 70))
  ctx.lineTo(branchXPos, (centerY - 55))
  ctx.moveTo(centerX, (centerY - 70))
  ctx.lineTo(branchXNeg, (centerY - 55))

  ctx.moveTo(centerX, (centerY - 50))
  ctx.lineTo(branchXPos, (centerY - 35))
  ctx.moveTo(centerX, (centerY - 50))
  ctx.lineTo(branchXNeg, (centerY - 35))

  ctx.moveTo(centerX, (centerY - 30))
  ctx.lineTo(branchXPos, (centerY - 15))
  ctx.moveTo(centerX, (centerY - 30))
  ctx.lineTo(branchXNeg, (centerY - 15))

  ctx.moveTo(centerX, (centerY - 10))
  ctx.lineTo(branchXPos, (centerY + 5))
  ctx.moveTo(centerX, (centerY - 10))
  ctx.lineTo(branchXNeg, (centerY + 5))

  ctx.stroke()
  ctx.closePath()

  // Lights
  var light1 = generateColor(null)
  var light2 = generateColor(light1)
  var light3 = generateColor(light2)
  var light4 = generateColor(light3)
  var light5 = generateColor(light4)
  var light6 = generateColor(light5)
  var light7 = generateColor(light5)
  var light8 = generateColor(light5)

  var lightSize = 12

  ctx.strokeStyle = light1
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX - 18), (centerY - 54))
  ctx.lineTo((centerX - 18), (centerY - 54))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light2
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX + 18), (centerY - 54))
  ctx.lineTo((centerX + 18), (centerY - 54))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light3
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX - 18), (centerY - 34))
  ctx.lineTo((centerX - 18), (centerY - 34))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light4
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX + 18), (centerY - 34))
  ctx.lineTo((centerX + 18), (centerY - 34))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light5
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX - 18), (centerY - 14))
  ctx.lineTo((centerX - 18), (centerY - 14))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light6
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX + 18), (centerY - 14))
  ctx.lineTo((centerX + 18), (centerY - 14))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light7
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX - 18), (centerY + 6))
  ctx.lineTo((centerX - 18), (centerY + 6))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = light8
  ctx.lineWidth = lightSize
  ctx.beginPath()
  ctx.moveTo((centerX + 18), (centerY + 6))
  ctx.lineTo((centerX + 18), (centerY + 6))
  ctx.stroke()
  ctx.closePath()

  // ctx.strokeStyle = colorPrimary
  // ctx.lineWidth = 8
  // ctx.beginPath()
  // ctx.arc(centerX, (centerY - 22), 50, 0, (2 * Math.PI), false)
  // ctx.stroke()
  // ctx.closePath()
}

var drawTime = function (ctx, date) {
  var w = canvasBox(ctx).w
  var h = canvasBox(ctx).h
  var centerY = canvasBox(ctx).centerY
  var centerX = canvasBox(ctx).centerX

  var localeTime = date.toLocaleTimeString().split(' ') // ['12:31:21', 'AM'] or ['00:31:21']
  var clockTime = localeTime[0].split(':').slice(0, 2).join(':') // '12:31' or '00:31'

  ctx.textAlign = 'center'
  ctx.fillStyle = config.brand.colorSecondary
  ctx.font = config.brand.fontSecondary
  ctx.fillText(clockTime, centerX, (uoHeight(ctx, h) - 16))
}

var drawDate = function (ctx, date) {
  var w = canvasBox(ctx).w
  var h = canvasBox(ctx).h
  var centerY = canvasBox(ctx).centerY
  var centerX = canvasBox(ctx).centerX

  var clockDate = date.toLocaleDateString(undefined, { month: 'short' }) + ' ' + date.getDate()

  ctx.textAlign = 'center'
  ctx.font = config.brand.fontPrimary
  ctx.fillStyle = config.brand.colorSecondary
  ctx.fillText(clockDate, centerX, (uoHeight(ctx, h) - 30))
}

rocky.on('draw', function (event) {
  var ctx = event.context
  var date = new Date()

  // Reset the view
  ctx.clearRect(0, 0, canvasBox(ctx).w, canvasBox(ctx).h)

  drawTree(ctx, config.brand.colorPrimary)
  drawDate(ctx, date)
  drawTime(ctx, date)
})

rocky.on('minutechange', function (event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw()
})
