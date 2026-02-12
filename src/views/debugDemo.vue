<template>
    <div class="image-flow">
        <!-- 图片数据区域 -->
        <div class="image-bank" ref="imageBank">
            <a v-for="(image, index) in images" :key="index" :data-rel="image.rel" :title="image.title"
                :href="image.href" :target="image.target" class="image-link">
                {{ image.text }}
            </a>
        </div>

        <!-- 文本显示区域 -->
        <div class="text-display">
            <div class="title">{{ currentImage.title || 'Loading' }}</div>
            <div class="legend">{{ currentImage.text || 'Please wait...' }}</div>
        </div>

        <!-- 滚动条区域 -->
        <div class="scrollbar" ref="scrollbar">
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageFlow',

    props: {
        // 配置参数
        size: {
            type: Number,
            default: 0.15
        },
        zoom: {
            type: Number,
            default: 1.5
        },
        border: {
            type: Number,
            default: 10
        },
        // 图片数据
        images: {
            type: Array,
            default: () => [
                { rel: 'ct37.jpg', title: 'ԽԽļֽֽ', text: 'ԽԽļֽֽ', href: '#', target: '_blank' },
                { rel: 'ct60.jpg', title: 'ɱɱŮŮдֽֽ', text: 'ɱɱŮŮдֽֽ', href: '#', target: '_blank' },
                // ... 其他图片数据
            ]
        },
        // 滚动条图片资源
        scrollbarImages: {
            type: Object,
            default: () => ({
                track: '@/assets/img/testDemo/sb.gif',
                arrowLeft: '@/assets/img/testDemo/sl.gif',
                arrowRight: '@/assets/img/testDemo/sr.gif',
                bar: '@/assets/img/testDemo/sc.gif'
            })
        }
    },

    data() {
        return {
            currentIndex: -1,
            isDragging: false,
            dragStartX: 0,
            scrollBarStartX: 0,
            containerWidth: 0,
            containerHeight: 0,
            scrollbarWidth: 0,
            imageInstances: [],
            animationFrameId: null
        }
    },

    computed: {
        currentImage() {
            return this.images[this.currentIndex] || { title: '', text: '' }
        },

        visibleImages() {
            return this.imageInstances.filter(img => img.loaded)
        }
    },

    mounted() {
        this.initialize()
        this.setupEventListeners()
        this.startAnimationLoop()
    },

    beforeUnmount() {
        this.cleanup()
    },

    methods: {
        initialize() {
            this.calculateContainerSize()
            this.createImageInstances()
            this.setupScrollbar()
        },

        calculateContainerSize() {
            const container = this.$el
            this.containerWidth = container.clientWidth
            this.containerHeight = container.clientHeight
            this.scrollbarWidth = this.$refs.scrollbar.offsetWidth
        },

        createImageInstances() {
            this.imageInstances = this.images.map((image, index) => ({
                id: index,
                ...image,
                loaded: false,
                element: null,
                reflection: null,
                width: 0,
                height: 0,
                ratio: 0,
                currentX: this.containerWidth,
                targetX: this.containerWidth,
                currentWidth: 0,
                targetWidth: 0,
                zoomLevel: 1,
                visible: false
            }))
        },

        setupScrollbar() {
            const barWidth = this.$refs.scrollBar.width
            const arrowLeftWidth = this.$refs.scrollbar.querySelector('.arrow-left').width - 5
            const arrowRightWidth = this.$refs.scrollbar.querySelector('.arrow-right').width - 5

            this.barWidth = barWidth
            this.arrowLeftWidth = arrowLeftWidth
            this.arrowRightWidth = arrowRightWidth
        },

        setupEventListeners() {
            // 鼠标滚轮事件
            this.$el.addEventListener('wheel', this.handleWheel, { passive: false })

            // 窗口大小改变事件
            window.addEventListener('resize', this.handleResize)

            // 鼠标事件用于拖拽
            document.addEventListener('mousemove', this.handleDrag)
            document.addEventListener('mouseup', this.stopDrag)
        },

        handleResize() {
            this.calculateContainerSize()
            this.recalculatePositions()
        },

        handleWheel(event) {
            event.preventDefault()
            const delta = Math.sign(event.deltaY || event.detail)
            this.scroll(delta > 0 ? 1 : -1)
        },

        scroll(direction) {
            const newIndex = this.currentIndex + direction
            if (newIndex >= 0 && newIndex < this.images.length) {
                this.currentIndex = newIndex
                this.recalculatePositions()
            }
        },

        scrollLeft() {
            this.scroll(-1)
        },

        scrollRight() {
            this.scroll(1)
        },

        startDrag(event) {
            this.isDragging = true
            this.dragStartX = event.screenX
            this.scrollBarStartX = this.$refs.scrollBar.offsetLeft
        },

        handleDrag(event) {
            if (!this.isDragging) return

            const deltaX = event.screenX - this.dragStartX
            const newLeft = Math.max(
                this.arrowLeftWidth,
                Math.min(
                    this.scrollbarWidth - this.arrowRightWidth - this.barWidth,
                    this.scrollBarStartX + deltaX
                )
            )

            this.$refs.scrollBar.style.left = `${newLeft}px`

            const scrollArea = this.scrollbarWidth - this.arrowLeftWidth - this.arrowRightWidth - this.barWidth
            const scrollRatio = (newLeft - this.arrowLeftWidth) / scrollArea
            this.currentIndex = Math.round(scrollRatio * (this.images.length - 1))

            this.recalculatePositions()
        },

        stopDrag() {
            this.isDragging = false
        },

        recalculatePositions() {
            if (this.currentIndex < 0 || this.currentIndex >= this.images.length) return

            const currentImage = this.imageInstances[this.currentIndex]
            if (!currentImage.loaded) return

            // 重置之前选中的图片
            const previousImage = this.imageInstances.find(img => img.zoomLevel > 1)
            if (previousImage && previousImage !== currentImage) {
                previousImage.zoomLevel = 1
            }

            // 计算所有图片的位置和大小
            this.calculateImageLayout()
        },

        calculateImageLayout() {
            // 实现图片布局计算逻辑
            // 这里简化实现，实际需要根据原逻辑重写
            this.imageInstances.forEach((image, index) => {
                if (image.loaded) {
                    const isCurrent = index === this.currentIndex
                    image.targetWidth = isCurrent ?
                        Math.min(image.width, this.containerHeight * 0.5) * image.zoomLevel :
                        (this.containerHeight / image.ratio) * this.size

                    // 计算目标位置
                    image.targetX = this.calculateTargetX(index, isCurrent)
                }
            })
        },

        calculateTargetX(index, isCurrent) {
            // 简化实现，实际需要根据原逻辑重写
            if (isCurrent) {
                return (this.containerHeight * 0.5) - (this.imageInstances[index].targetWidth * 0.5)
            }
            // 计算左右图片的位置
            return index * 100 // 简化计算
        },

        createReflection(imgElement) {
            if (!this.supportsCanvas()) {
                return this.createLegacyReflection(imgElement)
            }

            const canvas = document.createElement('canvas')
            canvas.width = imgElement.width
            canvas.height = imgElement.height

            const ctx = canvas.getContext('2d')
            ctx.translate(0, imgElement.height)
            ctx.scale(1, -1)
            ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height)

            ctx.globalCompositeOperation = 'destination-out'
            const gradient = ctx.createLinearGradient(0, 0, 0, imgElement.height * 2)
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, imgElement.width, imgElement.height * 2)

            return canvas
        },

        createLegacyReflection(imgElement) {
            const reflection = document.createElement('img')
            reflection.src = imgElement.src
            reflection.style.filter = `flipv progid:DXImageTransform.Microsoft.Alpha(opacity=50, style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=${imgElement.height * 0.25})`
            return reflection
        },

        supportsCanvas() {
            return !!document.createElement('canvas').getContext
        },

        animate() {
            this.imageInstances.forEach(image => {
                if (image.loaded) {
                    this.animateImage(image)
                }
            })
        },

        animateImage(image) {
            const dx = image.targetX - image.currentX
            const dw = image.targetWidth - image.currentWidth

            if (Math.abs(dx) > 2 || Math.abs(dw) > 2) {
                image.currentX += dx * 0.1
                image.currentWidth += dw * 0.1

                if (image.element) {
                    this.updateImageStyle(image)
                }
            }
        },

        updateImageStyle(image) {
            const isVisible = image.currentX < this.containerWidth &&
                image.currentX + image.currentWidth > 0

            if (isVisible) {
                image.element.style.display = 'block'
                image.element.style.left = `${Math.round(image.currentX)}px`
                image.element.style.width = `${Math.round(image.currentWidth)}px`
                image.element.style.height = `${Math.round(image.currentWidth * image.ratio)}px`

                if (image.reflection) {
                    image.reflection.style.left = `${Math.round(image.currentX)}px`
                    image.reflection.style.width = `${Math.round(image.currentWidth)}px`
                    image.reflection.style.height = `${Math.round(image.currentWidth * image.ratio)}px`
                }
            } else {
                image.element.style.display = 'none'
            }
        },

        startAnimationLoop() {
            const animate = () => {
                this.animate()
                this.animationFrameId = requestAnimationFrame(animate)
            }
            animate()
        },

        cleanup() {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId)
            }

            this.$el.removeEventListener('wheel', this.handleWheel)
            window.removeEventListener('resize', this.handleResize)
            document.removeEventListener('mousemove', this.handleDrag)
            document.removeEventListener('mouseup', this.stopDrag)
        }
    }
}
</script>

<style scoped>
.image-flow {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.image-bank {
    display: none;
    /* 图片通过JavaScript动态创建和定位 */
}

.text-display {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    z-index: 10;
}

.scrollbar {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 20px;
    z-index: 10;
}

.scrollbar img {
    position: absolute;
    cursor: pointer;
}

.bar {
    cursor: grab;
}

.bar:active {
    cursor: grabbing;
}
</style>