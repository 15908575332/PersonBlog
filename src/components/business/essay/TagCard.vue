<template>
  <div class="tag-card">
    <div class="tag-card__title">
      <svg class="tag-card__title-icon" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 5.5A2.5 2.5 0 015.5 3h3.08a2 2 0 011.41.59l5.42 5.42a2 2 0 010 2.82l-3.58 3.58a2 2 0 01-2.82 0l-5.42-5.42A2 2 0 013 8.58V5.5z"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        <circle cx="6.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
      <span>标签云</span>
    </div>

    <div class="tag-card__cloud">
      <span v-for="(tag, index) in tags" :key="tag.id || tag.name" class="tag-card__pill"
        :class="{ 'tag-card__pill--active': activeId === (tag.id || tag.name) }" :style="pillStyle(index)"
        @click="$emit('select', tag)">
        <span class="tag-card__pill-hash">#</span>
        {{ tag.name }}
      </span>
    </div>

    <div v-if="!tags || tags.length === 0" class="tag-card__empty">
      <p>还没有标签</p>
      <p>发布文章时添加标签吧</p>
    </div>
  </div>
</template>

<script setup>
import { assistanceColors } from '@/styles/colorTokens'

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  activeId: {
    type: [String, Number],
    default: null,
  },
})

defineEmits(['select'])

function contrastFg(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  // W3C relative luminance
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.5 ? '#111' : '#fff'
}

function pillStyle(index) {
  const bg = assistanceColors[index % assistanceColors.length]
  return {
    '--pill-bg': bg,
    '--pill-fg': contrastFg(bg),
  }
}
</script>

<style scoped lang="scss">
.tag-card {
  box-shadow: $shadow-card;
  border-radius: 0.6rem;
  padding: 0.5rem;
}

.tag-card__title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem;
  // margin-bottom: 1rem;
  // padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  // background-color: rebeccapurple;
  span {
    font-size: 0.95rem;
    font-weight: 650;
    color: themed(--text-color);
    letter-spacing: 0.02em;
  }
}

.tag-card__title-icon {
  width: 1rem;
  height: 1rem;
  color: themed(--text-sec-color);
  flex-shrink: 0;
}

.tag-card__cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 1rem 0;
}

.tag-card__pill {
  --pill-bg: themed(--text-muted);
  --pill-fg: #fff;

  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.75rem;
  border-radius: 0.7rem;
  font-size: 0.8rem;
  font-weight: 550;
  line-height: 1.4;
  color: var(--pill-fg);
  background: var(--pill-bg);
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  &:active {
    transform: scale(0.96);
    filter: brightness(0.92);
    transition-duration: 0.06s;
  }

  &:focus-visible {
    outline: 2px solid var(--pill-fg);
    outline-offset: 2px;
  }

  &--active {
    filter: brightness(0.88) saturate(1.15);
    font-weight: 700;
  }
}

.tag-card__pill-hash {
  opacity: 0.45;
  margin-right: 0.15rem;
  font-weight: 400;
}

.tag-card__empty {
  text-align: center;
  padding: 1rem 0;
  color: themed(--text-muted);

  p:first-child {
    font-size: 0.85rem;
    margin-bottom: 0.2rem;
  }

  p:last-child {
    font-size: 0.7rem;
    opacity: 0.7;
  }
}
</style>
