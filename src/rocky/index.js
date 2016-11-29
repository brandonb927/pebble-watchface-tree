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

var monthIsDecember = function () {
  return new Date().getMonth() === 12 /* December */
}

var config = {
  // Branding
  brand: {
    // Branding - Colours
    colorPrimary: '#55aa55',
    colorSecondary: '#fff',

    // Branding - Colours
    fontPrimary: '28px Gothic',
    fontSecondary: '28px light numbers Leco-numbers',
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

var drawTree = function (ctx, date, colorPrimary) {
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
  ctx.lineTo(branchXPos, (centerY - 50))
  ctx.moveTo(centerX, (centerY - 70))
  ctx.lineTo(branchXNeg, (centerY - 50))

  ctx.moveTo(centerX, (centerY - 45))
  ctx.lineTo(branchXPos, (centerY - 25))
  ctx.moveTo(centerX, (centerY - 45))
  ctx.lineTo(branchXNeg, (centerY - 25))

  ctx.moveTo(centerX, (centerY - 20))
  ctx.lineTo(branchXPos, (centerY))
  ctx.moveTo(centerX, (centerY - 20))
  ctx.lineTo(branchXNeg, (centerY))

  ctx.stroke()
  ctx.closePath()

  if (monthIsDecember()) {
    // Engage Xmas mode 🎅 ⛄ ❄

    // Snow!
    var snowLength = 24
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(centerX, (centerY - 76))
    ctx.lineTo((centerX + snowLength), (centerY - 58))
    ctx.moveTo(centerX, (centerY - 76))
    ctx.lineTo((centerX - snowLength), (centerY - 58))
    ctx.stroke()
    ctx.closePath()

    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo((centerX + 30), (centerY - 28))
    ctx.lineTo((centerX + 20), (centerY - 36))
    ctx.moveTo((centerX - 30), (centerY - 28))
    ctx.lineTo((centerX - 20), (centerY - 36))
    ctx.stroke()
    ctx.closePath()

    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo((centerX + 30), (centerY - 2))
    ctx.lineTo((centerX + 20), (centerY - 10))
    ctx.moveTo((centerX - 30), (centerY - 2))
    ctx.lineTo((centerX - 20), (centerY - 10))
    ctx.stroke()
    ctx.closePath()

    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo((centerX - 50), (centerY + 32))
    ctx.lineTo((centerX + 50), (centerY + 32))
    ctx.stroke()
    ctx.closePath()

    // Lights!
    var light1 = generateColor(null)
    var light2 = generateColor(light1)
    var light3 = generateColor(light2)
    var light4 = generateColor(light3)
    var light5 = generateColor(light4)
    var light6 = generateColor(light5)

    var lightSize = 14

    ctx.strokeStyle = light1
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX - 18), (centerY - 50))
    ctx.lineTo((centerX - 18), (centerY - 50))
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = light2
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX + 18), (centerY - 50))
    ctx.lineTo((centerX + 18), (centerY - 50))
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = light3
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX - 18), (centerY - 25))
    ctx.lineTo((centerX - 18), (centerY - 25))
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = light4
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX + 18), (centerY - 25))
    ctx.lineTo((centerX + 18), (centerY - 25))
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = light5
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX - 18), (centerY))
    ctx.lineTo((centerX - 18), (centerY))
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = light6
    ctx.lineWidth = lightSize
    ctx.beginPath()
    ctx.moveTo((centerX + 18), (centerY))
    ctx.lineTo((centerX + 18), (centerY))
    ctx.stroke()
    ctx.closePath()
  }
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
  ctx.fillText(clockDate, centerX, (uoHeight(ctx, h) - 32))
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
  ctx.fillText(clockTime, centerX, (uoHeight(ctx, h) - 8))
}

rocky.on('draw', function (event) {
  var ctx = event.context
  var date = new Date()

  // Reset the view
  ctx.clearRect(0, 0, canvasBox(ctx).w, canvasBox(ctx).h)

  drawTree(ctx, date, config.brand.colorPrimary)
  drawDate(ctx, date)
  drawTime(ctx, date)
})

rocky.on('minutechange', function (event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw()
})

rocky.on('secondchange', function (event) {
  // Request the screen to be redrawn on next pass
  if (monthIsDecember()) {
    // Every 5 seconds, redraw, only in the month of December
    if (new Date().getSeconds() % 5 === 0) {
      rocky.requestDraw()
    }
  }
})
