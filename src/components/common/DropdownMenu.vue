<template>
  <div class="dropdown">
    <div class="dropdown-content" @click.self="closeDropdownIfNeeded">
      <div
        class="dropdown-item"
        v-for="option in options"
        :key="option.value"
        data-value="option.value"
        @click="selectOption($event, option)"
      >
        <button
          @click="RouterJump('/' + option.router)"
          :class="[option.engTitle ? 'btn-12' : 'btn1']"
        >
          <!-- button icon -->
          <img v-if="option.iconUrl" :src="option.iconUrl" alt="btn_icon" />
          <span v-if="option.engTitle">{{ option.engTitle }}</span>
          <span>{{ option.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 定义 props
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();
const selectedOption = ref(null);

const closeDropdownIfNeeded = () => {};

const selectOption = (event, option) => {
  event.stopPropagation();
  selectedOption.value = option;
};

const RouterJump = (path) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  .dropdown-content {
    position: absolute;
    top: 2.8rem;
    transform: translateX(0.3rem); // 根据需要调整位置
    background-image: linear-gradient(112deg, #e9defa90, #fbfcdb90 100%);
    backdrop-filter: blur(1rem);
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

      button {
        @include flexCenter(row, flex-start);
        font-family: var(--app-font-family);
        font-size: 0.9rem;
        width: inherit;
        height: 30px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        gap: 0.5rem;
        font-weight: 700;
        @include text-color("text-sec-color");

        img {
          width: 1rem;
          z-index: 1;
        }
      }

      .btn-12 {
        perspective: 220px;
        box-shadow:
          inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);

        & span {
          position: absolute;
          background-color: #ffffff;
          // background-image: url('./img/btn_backImage.jpeg');
          top: 0;
          left: 0;
          width: 120px;
          height: 30px;
          line-height: 30px;
          box-shadow:
            inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, 0.1),
            4px 4px 5px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          transition: all 0.3s;
        }

        & span:nth-child(1) {
          box-shadow:
            -7px -7px 20px 0px #fff9,
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;

          transform: rotateX(90deg);
          transform-origin: 50% 50% -14px;
        }

        & span:nth-child(2) {
          transform: rotateX(0deg);
          transform-origin: 50% 50% -14px;
        }

        &:hover span:nth-child(1) {
          box-shadow:
            inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, 0.1),
            4px 4px 5px 0px rgba(0, 0, 0, 0.1);
          transform: rotateX(0deg);
        }

        &:hover span:nth-child(2) {
          box-shadow:
            inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, 0.1),
            4px 4px 5px 0px rgba(0, 0, 0, 0.1);
          transform: rotateX(-90deg);
        }
      }

      .btn1 {
        box-shadow:
          inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        outline: none;

        & {
          border: none;
          transition: all 0.5s ease;
          overflow: hidden;
        }

        &:after {
          position: absolute;
          content: " ";
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          // background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
          transition: all 0.3s ease;
        }

        &:hover {
          background: transparent;
          box-shadow:
            4px 4px 6px 0 rgba(255, 255, 255, 0.5),
            -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
            inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
            inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
          // color: #fff;
        }

        &:hover:after {
          -webkit-transform: scale(2) rotate(180deg);
          transform: scale(2) rotate(180deg);
          box-shadow:
            4px 4px 6px 0 rgba(255, 255, 255, 0.5),
            -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
            inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
            inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
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
