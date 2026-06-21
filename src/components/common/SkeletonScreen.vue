<template>
  <div class="skeleton-screen" :style="containerStyle">
    <!-- 块级骨架（图片/卡片占位） -->
    <div
      v-for="i in blocks"
      :key="'block-' + i"
      class="skeleton-block"
      :style="blockStyle"
    />
    <!-- 文本行骨架 -->
    <div
      v-for="i in lines"
      :key="'line-' + i"
      class="skeleton-line"
      :style="lineStyle(i)"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /** 块级占位数 */
  blocks: { type: Number, default: 0 },
  /** 块宽 */
  blockWidth: { type: String, default: "100%" },
  /** 块高 */
  blockHeight: { type: String, default: "200px" },
  /** 块圆角 */
  blockRadius: { type: String, default: "8px" },
  /** 文本行数 */
  lines: { type: Number, default: 0 },
  /** 行高 */
  lineHeight: { type: String, default: "16px" },
  /** 行间距 */
  lineGap: { type: String, default: "12px" },
  /** 最后一行宽度比例 (0-1) */
  lastLineWidth: { type: Number, default: 0.6 },
  /** 外部圆角 */
  borderRadius: { type: String, default: "8px" },
  /** 外部宽度 */
  width: { type: String, default: "100%" },
  /** 是否带动画 */
  animated: { type: Boolean, default: true },
});

const containerStyle = computed(() => ({
  width: props.width,
  borderRadius: props.borderRadius,
  display: props.blocks > 0 || props.lines > 0 ? "block" : "none",
}));

const blockStyle = computed(() => ({
  width: props.blockWidth,
  height: props.blockHeight,
  borderRadius: props.blockRadius,
  marginBottom: props.lines > 0 ? props.lineGap : "0",
}));

function lineStyle(index) {
  const isLast = index === props.lines;
  return {
    height: props.lineHeight,
    width: isLast ? `${props.lastLineWidth * 100}%` : "100%",
    marginBottom: isLast ? "0" : props.lineGap,
  };
}
</script>

<style scoped lang="scss">
.skeleton-screen {
  overflow: hidden;
}

.skeleton-block,
.skeleton-line {
  background: linear-gradient(
    90deg,
    rgba(200, 200, 200, 0.12) 25%,
    rgba(220, 220, 220, 0.22) 50%,
    rgba(200, 200, 200, 0.12) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-pulse {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
