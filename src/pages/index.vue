<script setup lang="ts">
import HomeBackground from '~/assets/HomeBackground.vue'

useHead({
  title: '文博知浅',
})
const router = useRouter()
const { changeLanguage } = useNextLanguage()
const { postsInfos } = await usePostList()

const open = (href: string) => window.open(href)
const goPost = (filename: string) => router.push(`/posts/${filename.replace(/\.md$/, '')}`)

const data = computed(() => [
  { text: 'Github', icon: 'i-simple-icons-github', href: 'https://github.com/groupguanfang' },
  { text: 'Bilibili', icon: 'i-simple-icons-bilibili', href: 'https://space.bilibili.com/269291212' },
  { text: 'gcz-zero', icon: 'i-simple-icons-wechat' },
])
const operation = computed(() => [
  { icon: isDark.value ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone', onClick: () => toggleDark() },
  { icon: 'i-ph-translate-duotone', onClick: () => changeLanguage() },
])
</script>

<template>
  <div class="bg-white dark:bg-#121212">
    <main>
      <div class="relative isolate">
        <HomeBackground />
        <!-- 占位 -->
        <div class="fixed left-0 right-0 top-0 transform-gpu overflow-hidden blur-3xl sm:left-1/2 -z-10 -ml-24 lg:ml-24 xl:ml-48" aria-hidden="true">
          <div class="aspect-[801/1036] w-[50.0625rem] from-yellow to-blue bg-gradient-to-tr opacity-30" style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)" />
        </div>
        <div m="x4 sm:t36 md:x15 lg:x60 xl:x80 2xl:x120 t24" class="overflow-hidden">
          <!-- eslint-disable-next-line -->
          <h1 class="text-4xl text-gray-900 font-bold tracking-tight sm:text-6xl dark:text-white/80 mb6">你好，文博知浅</h1>
          <div flex items-center justify-between>
            <div mb5 flex gap2 overflow-x-auto op-70>
              <InfoItem icon="i-carbon-education" content="大学, 大二" :hr="true" />
              <InfoItem icon="i-carbon-location" content="广东, 梅州" :hr="true" />
              <InfoItem icon="i-carbon-time" content="2019年开始学习编程" />
            </div>
            <div flex items-center gap3>
              <div
                v-for="(item, index) in operation" :key="index"
                flex cursor-pointer items-center gap1.5 text-size-4.5 transition-all :class="item.icon"
                @click="item.onClick"
              />
            </div>
          </div>
          <article mb8 flex flex-col gap5>
            <p>
              <!-- eslint-disable-next-line -->
            一个前端, 但是是<PopoverText title="闪电工作室" w-50 top-6>Apple watch版腕上B站、腕上浏览器、腕上音乐制作团队。</PopoverText>的后端开发。
            </p>
            <p>
              喜欢折腾, 喜欢<b class="underline underline-amber">尝试新事物</b>, 喜欢<b class="underline underline-blue">线上分享</b>, 喜欢<b class="underline underline-blueGray">赛博创造</b>, 就是喜欢用<b class="underline underline-cyan">编程造世界</b>的感觉。
            </p>
            <p>
              但是是个i人2333
            </p>
            <p>
              很少玩游戏，小时候父母不给玩游戏，所以到现在我对游戏仍然没感觉。这导致我对游戏开发也没什么兴趣，而且数学和物理都不大行。
            </p>
            <p>
              对<b class="underline underline-cyan">UI设计</b>情有独钟, 感觉自己的taste还行, 但是脑子里不像真正的UI设计师那样, 拥有那么多的设计方面的idea。
            </p>
          </article>
          <div flex flex-wrap gap3>
            <div
              v-for="(item, index) in data" :key="index"
              gap1.5 text-nowrap transition-all :class="item.href ? `hover:op-70 cursor-pointer` : `cursor-text`"
              @click="item.href ? open(item.href) : void 0"
            >
              <div flex items-center gap1.5>
                <div text-size-4.5 :class="item.icon" />
                <div>{{ item.text }}</div>
              </div>
            </div>
          </div>

          <!-- 文章 -->
          <!-- eslint-disable-next-line -->
          <h1 class="stroke_title absolute text-size-7xl text-size-7xl font-extrabold md:text-size-9xl sm:text-size-8xl op-30 dark:op-50">文章</h1>
          <div mt10 sm:mt15>
            <ul v-if="postsInfos.length">
              <li
                v-for="(post, index) in postsInfos" :key="index"
                p="x4 y3" transition-all hover="dark:bg-blueGray-800/80 bg-op-70 rounded-md backdrop-blur-sm"
                @click="goPost(post.filename)"
              >
                <div mb2 cursor-pointer text-xl font-bold>
                  {{ post.title }}
                </div>
                <div flex flex-wrap gap="x3 y1">
                  <div v-if="post.date" flex cursor-pointer items-center gap1 text-sm op-70>
                    <div i-carbon-calendar text-sm />
                    {{ post.date }}
                  </div>
                  <div v-if="post.lang" flex cursor-pointer items-center gap1 text-sm op-70>
                    <div i-carbon-language text-sm />
                    {{ post.lang }}
                  </div>
                  <div v-if="post.desc" flex cursor-pointer items-center gap1 text-sm op-70>
                    <div i-carbon-text-align-left text-sm />
                    {{ post.desc }}
                  </div>
                </div>
              </li>
            </ul>

            <div v-else>
              <div p="x4 y2" text="center teal-700 xl" font="bold">
                {{ $t("post.noPost") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="less">
.text-decoration-none {
  text-decoration: none !important;
}
</style>
