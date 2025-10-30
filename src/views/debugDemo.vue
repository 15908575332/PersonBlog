<template>
  <div class="container">
    <div class="header">
      <h1>花卉知识卡片</h1>
      <p>悬停查看效果，点击卡片放大查看详细信息</p>
    </div>

    <div class="card-wrapper" ref="cardWrapper">
      <div class="background" :style="backgroundStyle"></div>
      <div v-for="(flower, index) in flowers" :key="index" class="card" :ref="setCardRef" :class="{
        'zoomed': zoomedIndex === index,
        'opacity-0': zoomedIndex !== -1 && zoomedIndex !== index
      }" @click="toggleZoom(index)" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave">
        <div class="card-main">
          <div class="card-inner">
            <div>
              <h3>{{ flower.title }}</h3>
              <p>{{ flower.description }}</p>
              <div class="flower-info">
                <span><strong>花语:</strong> {{ flower.meaning }}</span>
                <span><strong>花期:</strong> {{ flower.bloomingSeason }}</span>
              </div>
            </div>
          </div>
        </div>

        <button v-if="zoomedIndex === index" class="close-btn" @click.stop="toggleZoom(index)">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const flowers = ref([
  {
    title: '玫瑰',
    description: '玫瑰是一种开花灌木，其名称来自拉丁语Rosa。玫瑰一直是爱、美丽、战争和政治的象征。玫瑰植物可以是直立的灌木、攀援或蔓生，茎上常有尖锐的刺。花朵大小和形状各异，通常大而艳丽，颜色从白色到黄色和红色不等。大多数物种原产于亚洲，少数原产于欧洲、北美和西北非。玫瑰常作为观赏植物种植，因其美丽且有时芬芳的花朵而受欢迎。它们是流行的花园植物，但有时也在室内种植，并用作切花。',
    meaning: '爱情、美丽、勇气',
    bloomingSeason: '春夏季'
  },
  {
    title: '郁金香',
    description: '郁金香是春季开花的多年生植物，从球茎中生长。根据物种不同，郁金香植物可以短至4英寸（10厘米）或高达28英寸（71厘米）。郁金香的大花通常在无苞片的花茎上开花。大多数郁金香每茎只开一朵花，但少数物种在其花茎上开多朵花。艳丽、通常杯状或星形的郁金香花有三个花瓣和三个萼片，由于它们几乎相同，通常被称为花被片。郁金香球茎以厘米为单位测量球茎的"腰围"。供应周长至少为12厘米的郁金香球茎，确保您总能获得最大、最亮的花朵。',
    meaning: '完美、深情的爱、重生',
    bloomingSeason: '春季'
  },
  {
    title: '向日葵',
    description: '向日葵以其"快乐"的花朵而闻名，是带来欢乐的完美礼物。普通向日葵有一个覆盖粗糙毛发的绿色直立茎，平均高度约2米。叶子宽阔，有锯齿状边缘，交替排列在茎上。普通向日葵的"花"实际上是一个假头状花序，由许多小花组成。外层的黄色"花瓣"被称为射线花，由多个花瓣融合而成。射线花瓣通常是黄色的，但有时也可以是红色或橙色的。中心的黑褐色花朵称为盘花，呈螺旋状生长，随着时间的推移成熟为向日葵种子。',
    meaning: '崇拜、忠诚、长寿',
    bloomingSeason: '夏季'
  },
  {
    title: '雏菊',
    description: '雏菊简单而精致，是花卉世界中最美丽的花朵之一。雏菊植物通常高约2到3英尺（61到91厘米）。花朵长在长花梗上。两种类型的花组成每个头状花序。射线花是人们所说的花瓣。射线花可能长或短。微小的盘花组成中心。中心可能是平的或圆的。根据雏菊的类型，头状花序的宽度从1到4英寸（2.5到10厘米）不等。随着其柔软、珍珠白色的花瓣从金色中心辐射出来，沙斯塔雏菊是永恒的经典。它不仅是最大的雏菊之一，而且也是最容易种植和照顾的之一。此外，您可以季节性地欣赏其丰盛的花朵。',
    meaning: '纯真、忠诚的爱、纯洁',
    bloomingSeason: '春夏季'
  },
  {
    title: '兰花',
    description: '兰花精致、异国情调且优雅。它们代表爱、奢华、美丽和力量。兰花是因其美丽独特的花朵而备受珍视的植物。兰花构成了世界上最大的植物家族之一，有15,000到35,000个物种或类型。许多人在业余时间种植兰花。兰花生长在世界大部分地区，除了靠近北极和南极的地区。大多数兰花喜欢温暖的热带地区。兰花可以在土壤中生长，完全在地下，或在其他植物或岩石上生长。在其他植物或岩石上生长的物种其根部不在土壤中。相反，它们的根悬在空中或依附在植物或岩石上。',
    meaning: '奢华、美丽、力量',
    bloomingSeason: '依品种而异'
  },
  {
    title: '菊花',
    description: '菊花有各种尺寸，直径从5到8厘米不等。菊花是复合花，以不同的花瓣排列生长，有些类型具有雏菊状结构，其他具有更圆、绒球状的外观，甚至有些花朵具有羽毛状花瓣。花朵也有不同的色调，从白色和浅黄色到深酒红色和紫色。菊花具有甜美花香，带有薄荷醇的味道，可以清洁鼻腔。菊花的风味特征可能因品种而异，但通常花朵具有苦味和花香，带有甜味和胡椒味。',
    meaning: '忠诚、快乐、长寿',
    bloomingSeason: '秋季'
  }
])

const backgroundStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translate(0px, 0px)',
  opacity: '0'
})

const zoomedIndex = ref(-1)
const lastHoveredCardIndex = ref(0)
const cardRefs = ref([])
const cardWrapper = ref(null)

const setCardRef = (el) => {
  if (el) {
    cardRefs.value.push(el)
  }
}

const updateBackgroundPosition = (cardElement) => {
  if (!cardElement || !cardWrapper.value) return

  const cardRect = cardElement.getBoundingClientRect()
  const wrapperRect = cardWrapper.value.getBoundingClientRect()

  // 计算卡片相对于容器的位置
  const x = cardRect.left - wrapperRect.left
  const y = cardRect.top - wrapperRect.top

  backgroundStyle.value = {
    width: `${cardRect.width}px`,
    height: `${cardRect.height}px`,
    transform: `translate(${x}px, ${y}px)`,
    opacity: '1'
  }
}

const handleMouseEnter = (index) => {
  if (zoomedIndex.value !== -1) return

  const card = cardRefs.value[index]
  if (!card) return

  updateBackgroundPosition(card)
  lastHoveredCardIndex.value = index
  localStorage.setItem('lastHoveredCardIndex', index)
}

const handleMouseLeave = () => {
  if (zoomedIndex.value !== -1) return

  backgroundStyle.value = {
    ...backgroundStyle.value,
    opacity: '0'
  }
}

const toggleZoom = (index) => {
  if (zoomedIndex.value === index) {
    // 取消放大
    zoomedIndex.value = -1
    document.body.classList.remove("overflow")
  } else {
    // 放大卡片
    zoomedIndex.value = index
    document.body.classList.add("overflow")
  }
}

onMounted(() => {
  // 从本地存储获取上次悬停的卡片索引
  const storedIndex = localStorage.getItem('lastHoveredCardIndex')
  if (storedIndex !== null) {
    lastHoveredCardIndex.value = parseInt(storedIndex)
  }

  // 设置初始背景位置
  setTimeout(() => {
    if (cardRefs.value.length > 0 && lastHoveredCardIndex.value < cardRefs.value.length) {
      const initialCard = cardRefs.value[lastHoveredCardIndex.value]
      if (initialCard) {
        updateBackgroundPosition(initialCard)
        // 设置初始透明度为0.7，使其可见但不完全突出
        backgroundStyle.value.opacity = '0.7'
      }
    }
  }, 100)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  position: relative;
  padding: 20px;
}

.background {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 20px;
  position: absolute;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.3);
  left: 0;
  top: 0;
}

.card {
  text-decoration: none;
  display: block;
  position: relative;
  padding: 10px;
  z-index: 2;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.01);
}

.card-main {
  border: 1px solid #e0e6ed;
  padding: 30px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s ease;
}

.card:hover .card-main {
  border-color: #6a11cb;
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.15);
}

.card-inner {
  position: relative;
  z-index: 50;
  height: 100%;
}

.card-inner div {
  height: 100%;
}

h3 {
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #2c3e50;
  position: relative;
  display: inline-block;
}

h3:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  border-radius: 2px;
}

p {
  font-size: 16px;
  font-weight: 400;
  color: #555;
  line-height: 1.7;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.zoomed {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 90vw !important;
  height: 90vh !important;
  z-index: 1000 !important;
  padding: 20px !important;
  max-width: 900px;
}

.zoomed .card-main {
  height: 100%;
  overflow-y: auto;
  padding: 40px;
}

.zoomed p {
  -webkit-line-clamp: unset !important;
  overflow-y: auto;
}

.overflow {
  overflow: hidden;
}

.opacity-0 {
  opacity: 0.3;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.flower-info {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e6ed;
  font-size: 14px;
  color: #7e8c9a;
  display: flex;
  justify-content: space-between;
}

.flower-info strong {
  color: #6a11cb;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f0f2f5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  color: #7e8c9a;
  transition: all 0.3s ease;
  z-index: 1001;
}

.close-btn:hover {
  background: #e4e7ec;
  color: #6a11cb;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header h1 {
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 15px;
}

.header p {
  font-size: 18px;
  color: #7e8c9a;
  max-width: 600px;
  margin: 0 auto;
  -webkit-line-clamp: unset;
}

@media (max-width: 768px) {
  .card-wrapper {
    grid-template-columns: 1fr;
  }

  .card-main {
    padding: 20px;
  }

  .header h1 {
    font-size: 32px;
  }

  .zoomed {
    width: 95vw !important;
    height: 95vh !important;
    padding: 10px !important;
  }

  .zoomed .card-main {
    padding: 25px;
  }
}
</style>
