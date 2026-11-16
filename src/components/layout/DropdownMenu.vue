<template>
  <div class="dropdown">
    <div class="dropdown-content" ref="dropdownRef" @click.self="closeDropdownIfNeeded">
      <div class="dropdown-item" v-for="option in options" :key="option.value" data-value="option.value"
        @click="selectOption($event, option)">
        <button @click="RouterJump('/' + option.router)" class="btn-magnet">
          <span>{{ option.text }}</span>
          <span class="particles"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();
const selectedOption = ref(null);
const dropdownRef = ref(null);

const closeDropdownIfNeeded = () => { };

const selectOption = (event, option) => {
  event.stopPropagation();
  selectedOption.value = option;
};

const RouterJump = (path) => {
  router.push(path);
};

const setupMagnetButtons = () => {
  if (!dropdownRef.value) return;
  const buttons = dropdownRef.value.querySelectorAll('.btn-magnet');
  buttons.forEach(btn => {
    const particlesEl = btn.querySelector('.particles');
    if (!particlesEl || particlesEl.children.length > 0) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      particlesEl.appendChild(p);
    }
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const particles = particlesEl.querySelectorAll('.particle');
      particles.forEach(p => {
        const px = parseFloat(p.style.left) / 100 * rect.width;
        const py = parseFloat(p.style.top) / 100 * rect.height;
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - dist / 80);
        p.style.transform = `translate(${dx * force}px, ${dy * force}px)`;
        p.style.width = (2 + force * 4) + 'px';
        p.style.height = (2 + force * 4) + 'px';
      });
    });
    btn.addEventListener('mouseleave', () => {
      const particles = particlesEl.querySelectorAll('.particle');
      particles.forEach(p => {
        p.style.transform = 'translate(0, 0)';
        p.style.width = '3px';
        p.style.height = '3px';
      });
    });
  });
};

onMounted(() => {
  nextTick(() => setupMagnetButtons());
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  .dropdown-content {
    position: absolute;
    top: 3.1rem;
    transform: translateX(0.3rem); // 根据需要调整位置
    @include background('bg-card-glass');

    border-radius: 0.4rem;
    padding: 0 0.5rem;
    z-index: 99;
    @include flexCenter(column, space-around);

    .dropdown-item {
      margin-top: 0.2rem;
      @include flexCenter(row, space-between);
      position: relative;
      width: 120px;

      &:first-child {
        margin-top: 0.5rem;
      }

      &:last-child {
        margin-bottom: 0.5rem;
      }

      .btn-magnet {
        @include flexCenter(row, center);
        box-sizing: border-box;
        font-family: var(--app-font-family);
        font-size: 0.9rem;
        width: inherit;
        height: 30px;
        position: relative;
        cursor: pointer;
        transition: border-color .3s, box-shadow .3s;
        border-radius: 5px;
        gap: 0.5rem;
        font-weight: 700;
        border: 1px solid themed("border-default");
        background: transparent;
        overflow: hidden;
        @include text-color("text-color");

        img {
          position: relative;
          z-index: 1;
          width: 1rem;
        }

        &>span {
          position: relative;
          z-index: 1;

        }

        // 按钮悬浮效果
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        :deep(.particle) {
          position: absolute;
          width: 3px;
          height: 3px;
          // @include background("primary-color");
          background-color: $color-5;
          border-radius: 50%;
          opacity: 0;
          transition: transform .35s cubic-bezier(.25, .8, .25, 1.2), width .35s, height .35s, opacity .3s;
        }

        &:hover {
          border-color: $color-5;
          box-shadow: 0 0 18px rgba(167, 139, 250, .2);
        }

        &:hover :deep(.particle) {
          opacity: 1;
        }
      }
    }

    // 三角形
    &::before {
      content: "";
      position: absolute;
      top: -0.3rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 0.3rem solid transparent;
      border-right: 0.3rem solid transparent;
      border-bottom: 0.3rem solid #a9a7a7;
    }
  }
}
</style>
