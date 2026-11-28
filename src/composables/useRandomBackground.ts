import { computed, ref } from 'vue';
import utils from '@/utils/getAssetsFile';

interface RandomBackgroundOptions {
  /** 参与随机的背景图数量，默认 6（img/home/back1 ~ back6.webp） */
  count?: number;
  /** 资源目录前缀，默认 img/home */
  dir?: string;
  /** 是否在初始化时立即随机取一张，默认 true */
  immediate?: boolean;
}

export function useRandomBackground(options: RandomBackgroundOptions = {}) {
  const { count = 6, dir = 'img/home', immediate = true } = options;

  const images = ref<string[]>(
    Array.from({ length: count }, (_, i) => utils.getAssetsFile(`${dir}/back${i + 1}.webp`))
  );

  const randomIndex = ref(0);

  const randomize = () => {
    if (!images.value.length) return;
    randomIndex.value = Math.floor(Math.random() * images.value.length);
  };

  if (immediate) randomize();

  const backgroundUrl = computed(() => images.value[randomIndex.value] ?? '');

  const backgroundStyle = computed(() => ({
    backgroundImage: backgroundUrl.value ? `url('${backgroundUrl.value}')` : 'none',
  }));

  return { images, randomIndex, randomize, backgroundUrl, backgroundStyle };
}

export default useRandomBackground;
