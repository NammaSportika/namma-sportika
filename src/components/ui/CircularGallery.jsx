import { useRef, useEffect, useState } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl'

function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  
  // Fallback for canvas context failure
  if (!context) {
    canvas.width = 1
    canvas.height = 1
    const texture = new Texture(gl, { generateMipmaps: false })
    texture.image = canvas
    return { texture, width: 1, height: 1 }
  }

  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)

  canvas.width = textWidth + 20
  canvas.height = textHeight + 20

  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  texture.update()

  return { texture, width: canvas.width, height: canvas.height }
}

class Media {
  constructor({ geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.createShader()
    this.createMesh()
    if (this.text) {
      this.createTitle()
    }
  }

  createShader() {
    const texture = new Texture(this.gl, { 
      generateMipmaps: false,
      premultiplyAlpha: true
    })
    
    // Create default 1x1 pixel texture
    const defaultCanvas = document.createElement('canvas')
    defaultCanvas.width = 1
    defaultCanvas.height = 1
    const ctx = defaultCanvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#FFF'
      ctx.fillRect(0, 0, 1, 1)
      texture.image = defaultCanvas
      texture.update()
    }

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    
    img.onload = () => {
      texture.image = img
      texture.update()
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
    
    img.onerror = () => {
      console.error('Image load failed:', this.image)
      // Create error placeholder
      const errorCanvas = document.createElement('canvas')
      errorCanvas.width = 200
      errorCanvas.height = 200
      const ctx = errorCanvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#333'
        ctx.fillRect(0, 0, 200, 200)
        ctx.fillStyle = '#fff'
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Image not found', 100, 100)
        texture.image = errorCanvas
        texture.update()
      }
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.plane.setParent(this.scene)
  }

  createTitle() {
    if (this.text) {
      this.title = new Title({
        gl: this.gl,
        plane: this.plane,
        renderer: this.renderer,
        text: this.text,
        textColor: this.textColor,
        font: this.font
      })
    }
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class App {
  constructor(container, options = {}) {
    this.container = container
    this.options = options
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    
    if (!this.checkWebGLSupport()) {
      this.createFallbackCanvas()
      return
    }
    
    this.createRenderer()
    if (!this.isWebGLSupported) return
    
    this.createCamera()
    this.createScene()
    this.createGeometry()
    this.createMedias(options.items, options.bend, options.textColor, options.borderRadius, options.font)
    this.onResize()
    this.update()
    this.addEventListeners()
  }

  checkWebGLSupport() {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  }

  createRenderer() {
    try {
      this.renderer = new Renderer({ 
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      this.gl = this.renderer.gl
      this.gl.clearColor(0, 0, 0, 0)
      this.container.appendChild(this.gl.canvas)
      this.isWebGLSupported = true
    } catch (error) {
      console.warn('WebGL initialization failed:', error)
      this.isWebGLSupported = false
      this.createFallbackCanvas()
    }
  }

  createFallbackCanvas() {
    this.container.innerHTML = `
      <div class="fallback-gallery">
        <div class="fallback-message text-center p-4">
          <p class="text-lg mb-2">⚠️ WebGL is not supported in your browser</p>
          <p class="mb-4">For the best experience, try:</p>
          <ul class="list-disc list-inside">
            <li>Updating your graphics drivers</li>
            <li>Using Chrome/Firefox</li>
            <li>Enabling hardware acceleration</li>
          </ul>
        </div>
        <div class="fallback-images flex overflow-x-auto snap-x snap-mandatory">
          ${this.options.items?.map(item => `
            <div class="snap-center flex-none w-80 p-4">
              <img src="${item.image}" alt="${item.text}" class="w-full h-auto rounded-lg shadow-lg">
              <p class="text-center mt-2 font-bold">${item.text}</p>
            </div>
          `).join('') || ''}
        </div>
      </div>
    `
  }

  createCamera() {
    if (!this.isWebGLSupported) return
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    if (!this.isWebGLSupported) return
    this.scene = new Transform()
  }

  createGeometry() {
    if (!this.isWebGLSupported) return
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }

  createMedias(items, bend = 1, textColor, borderRadius, font) {
    if (!this.isWebGLSupported) {
      this.renderFallbackGallery(items)
      return
    }
    
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: "Palm Trees" }
    ]
    
    // Ensure we have items and preload images for better performance
    const galleryItems = items && items.length ? items : defaultItems
    
    // Preload images to avoid texture issues
    galleryItems.forEach(item => {
      const img = new Image()
      img.src = item.image
    })
    
    // Double the items for seamless looping
    this.mediasImages = galleryItems.concat(galleryItems)
    
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      })
    })
  }

  renderFallbackGallery(items) {
    // Simple carousel-style fallback for browsers without WebGL
    if (!this.fallbackContext) return
    
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' }
    ]
    
    const galleryItems = items && items.length ? items : defaultItems
    
    // Create simple HTML fallback carousel
    this.container.innerHTML = ''
    const carousel = document.createElement('div')
    carousel.style.display = 'flex'
    carousel.style.overflow = 'auto'
    carousel.style.scrollSnapType = 'x mandatory'
    carousel.style.width = '100%'
    carousel.style.height = '100%'
    
    galleryItems.forEach(item => {
      const slide = document.createElement('div')
      slide.style.flex = '0 0 auto'
      slide.style.width = '80%'
      slide.style.height = '100%'
      slide.style.scrollSnapAlign = 'center'
      slide.style.display = 'flex'
      slide.style.flexDirection = 'column'
      slide.style.alignItems = 'center'
      slide.style.justifyContent = 'center'
      slide.style.padding = '20px'
      
      const img = document.createElement('img')
      img.src = item.image
      img.alt = item.text
      img.style.maxWidth = '100%'
      img.style.maxHeight = '80%'
      img.style.objectFit = 'contain'
      img.style.borderRadius = '10px'
      
      const text = document.createElement('div')
      text.textContent = item.text
      text.style.marginTop = '10px'
      text.style.fontWeight = 'bold'
      text.style.textAlign = 'center'
      
      slide.appendChild(img)
      slide.appendChild(text)
      carousel.appendChild(slide)
    })
    
    this.container.appendChild(carousel)
  }

  onTouchDown(e) {
    if (!this.isWebGLSupported) return
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }

  onTouchMove(e) {
    if (!this.isWebGLSupported || !this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * 0.05
    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp() {
    if (!this.isWebGLSupported) return
    this.isDown = false
    this.onCheck()
  }

  onWheel(e) {
    if (!this.isWebGLSupported) return
    // Use the deltaY value for more natural scrolling
    const delta = e.deltaY || e.wheelDelta
    this.scroll.target += delta * 0.003
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.isWebGLSupported || !this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    
    if (!this.isWebGLSupported) {
      if (this.fallbackContext) {
        const canvas = this.fallbackContext.canvas
        canvas.width = this.screen.width
        canvas.height = this.screen.height
      }
      return
    }
    
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }

  update() {
    if (!this.isWebGLSupported) return
    
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    if (!this.isWebGLSupported) return
    
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel, { passive: true })
    window.addEventListener('wheel', this.boundOnWheel, { passive: true })
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown, { passive: true })
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true })
    window.addEventListener('touchend', this.boundOnTouchUp)
  }

  destroy() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf)
    }
    
    if (this.isWebGLSupported) {
      window.removeEventListener('resize', this.boundOnResize)
      window.removeEventListener('mousewheel', this.boundOnWheel)
      window.removeEventListener('wheel', this.boundOnWheel)
      window.removeEventListener('mousedown', this.boundOnTouchDown)
      window.removeEventListener('mousemove', this.boundOnTouchMove)
      window.removeEventListener('mouseup', this.boundOnTouchUp)
      window.removeEventListener('touchstart', this.boundOnTouchDown)
      window.removeEventListener('touchmove', this.boundOnTouchMove)
      window.removeEventListener('touchend', this.boundOnTouchUp)
    }
    
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans"
}) {
  const containerRef = useRef(null)
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Synchronous WebGL check
    let webglSupported = true
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      webglSupported = !!gl
    } catch (e) {
      webglSupported = false
    }
    
    setWebGLSupported(webglSupported)

    let app
    if (webglSupported && containerRef.current) {
      const options = {
        items: items?.map(item => ({
          image: item.image,
          text: item.title || item.text || ''
        })),
        bend,
        textColor,
        borderRadius,
        font
      }
      
      app = new App(containerRef.current, options)
    }

    setIsLoading(false)

    return () => {
      if (app?.destroy) {
        app.destroy()
      }
    }
  }, [items, bend, textColor, borderRadius, font])

  return (
    <div className='w-full h-full overflow-hidden cursor-grab active:cursor-grabbing' ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}