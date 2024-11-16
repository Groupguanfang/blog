<script setup lang="ts">
import * as IntroductionEn from '../../locales/introduction-en.md'
import * as IntroductionZhCN from '../../locales/introduction-zh-CN.md'
import * as HomeBackground from '~/assets/HomeBackground.vue'

useHead({ title: '文博知浅' })
const { locale } = useI18n()
const router = useRouter()
const { configuration } = useConfiguration()
const { changeLanguage } = useNextLanguage()
const { postsInfos } = await usePostList()
const { range: range1 } = useNumberRange(3, 300, { interval: 100, immediate: true })
const { range: range2 } = useNumberRange(-180, 200, { interval: 100, immediate: true })
const { range: range3 } = useNumberRange(-150, 150, { interval: 200, immediate: true })
const { range: range4 } = useNumberRange(0, 1, { step: 0.01, interval: 100, immediate: true })

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
const section = computed(() => locale.value === 'en' ? IntroductionEn.section : IntroductionZhCN.section)
</script>

<template>
  <div class="bg-white dark:bg-#121212">
    <main pb60>
      <div class="relative isolate">
        <HomeBackground />
        <!-- 占位 -->
        <div class="fixed left-0 right-0 top-0 transform-gpu overflow-hidden sm:left-1/2 -z-10 -ml-24 lg:ml-24 xl:ml-48" aria-hidden="true" :style="{ filter: `blur(64px) invert(${range4})` }">
          <div
            class="animate-gradient-flow aspect-[801/1036] w-[50.0625rem] from-yellow to-blue bg-gradient-to-tr opacity-60 transition-all transition-all-1000"
            :style="`clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% ${range1}%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, ${range2}% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% ${range3}%, 97.2% 52.8%, 63.1% 29.5%)`"
          />
        </div>
        <div m="x4 sm:t36 md:x15 lg:x20 xl:x40 2xl:x60 t24" class="overflow-hidden">
          <!-- eslint-disable-next-line -->
          <h1 class="text-4xl text-gray-900 font-bold tracking-tight sm:text-6xl dark:text-white/80 mb6">
            {{ locale === 'en' ? IntroductionEn.title : IntroductionZhCN.title }}
          </h1>
          <div flex items-center justify-between>
            <div mb5 flex flex-wrap gap2 overflow-x-auto op-70>
              <InfoItem v-for="(item, index) in section" :key="index" icon="i-carbon-education" content="大学, 大二" :hr="true" v-bind="item" />
            </div>
            <div flex items-center gap3>
              <div
                v-for="(item, index) in operation" :key="index"
                flex cursor-pointer items-center gap1.5 text-size-4.5 transition-all active:scale-80 sm:hover:scale-90 :class="item.icon"
                @click="item.onClick"
              />
            </div>
          </div>
          <article mb8 flex flex-col gap5>
            <IntroductionEn.default v-if="locale === 'en'" max-w-full />
            <IntroductionZhCN.default v-else max-w-full />
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

          <!-- 关注 -->
          <!-- eslint-disable-next-line -->
          <h1 class="stroke_title absolute text-size-7xl text-size-7xl font-extrabold md:text-size-9xl sm:text-size-8xl op-30 dark:op-50">{{ $t('pages.index.current-focus') }}</h1>
          <ol mt15 flex flex-col gap5 sm:mt20>
            <li
              v-for="(item, index) in configuration.todo" :key="index"
              hover:underline hover:underline-amber
            >
              <span op-70>{{ index + 1 }}.</span>
              {{ item }}
            </li>
          </ol>

          <!-- 项目 -->
          <!-- eslint-disable-next-line -->
          <h1 class="stroke_title absolute text-size-7xl text-size-7xl font-extrabold md:text-size-9xl sm:text-size-8xl op-30 dark:op-50">{{ $t('pages.index.project') }}</h1>

          <div mt5 flex items-center gap-4 md:mt15>
            <div>{{ $t('pages.index.project-categories.naily') }}</div>
            <hr my10 w-full op-10>
          </div>

          <ProjectCardGrid>
            <ProjectCard
              title="naily"
              :description="$t('pages.index.projects.naily')"
              icon="i-ph-paint-bucket"
              href="https://github.com/nailyjs/core"
            />
            <ProjectCard
              title="unproject"
              :description="$t('pages.index.projects.unproject')"
              icon="i-carbon-mac-command"
              href="https://github.com/nailyjs/vitesse-naily"
            />
            <ProjectCard
              title="vitesse naily"
              :description="$t('pages.index.projects.vitesse-naily')"
              icon="i-carbon-campsite"
              href="https://github.com/nailyjs/vitesse-naily"
            />
          </ProjectCardGrid>

          <div flex items-center gap-4 text-nowrap>
            <div>{{ $t('pages.index.project-categories.nest') }}</div>
            <hr my10 w-full op-10>
          </div>

          <ProjectCardGrid>
            <ProjectCard
              title="Lightning Nai Six"
              :description="$t('pages.index.projects.lightning-nai-six')"
              icon="i-ic-outline-design-services"
              href="https://github.com/nailyjs/Nai-Six"
            />
            <ProjectCard
              title="Lightning Nai Element"
              :description="$t('pages.index.projects.lightning-nai-element')"
              icon="i-ic-outline-design-services"
              href="https://github.com/nailyjs/Nai-Element"
            />
            <ProjectCard
              title="Nest.js @Value"
              :description="$t('pages.index.projects.nest-config-value')"
              icon="i-carbon-settings"
              href="https://github.com/nailyjs/nest-config-value"
            />
            <ProjectCard
              title="Nest.js Ali OSS"
              :description="$t('pages.index.projects.nest-ali-oss')"
              icon="i-carbon-cloud-upload"
              href="https://github.com/nailyjs/nest-ali-oss"
            />
            <ProjectCard
              title="Nest.js Upyun"
              :description="$t('pages.index.projects.nest-upyun')"
              icon="i-carbon-fetch-upload-cloud"
              href="https://github.com/nailyjs/nest-upyun"
            />
            <ProjectCard
              title="Nest.js Redlock"
              :description="$t('pages.index.projects.nest-redlock')"
              icon="i-carbon-rule-locked"
              href="https://github.com/nailyjs/nest-redlock"
            />
            <ProjectCard
              title="Nest.js Prisma"
              :description="$t('pages.index.projects.nest-prisma')"
              icon="i-carbon-data-base"
              href="https://github.com/nailyjs/nest-prisma"
            />
            <ProjectCard
              title="Nest.js Apple App Store"
              icon="i-carbon-apple"
              :description="$t('pages.index.projects.nest-apple-app-store')"
              href="https://github.com/nailyjs/nest-apple-app-store"
            />
            <ProjectCard
              title="Nest.js Tencent Cloud"
              icon="i-carbon-cloud"
              :description="$t('pages.index.projects.nest-tencentcloud')"
              href="https://github.com/nailyjs/nest-tencentcloud"
            />
          </ProjectCardGrid>

          <div flex items-center gap-4 text-nowrap>
            <div>{{ $t('pages.index.project-categories.vite') }}</div>
            <hr my10 w-full op-10>
          </div>

          <ProjectCardGrid>
            <ProjectCard
              title="unplugin-rpc"
              :description="$t('pages.index.projects.unplugin-rpc')"
              icon="i-carbon-connection-signal"
              href="https://github.com/nailyjs/core/tree/v2/packages/unplugin-rpc"
            />
            <ProjectCard
              title="vite-plugin-node-runner"
              :description="$t('pages.index.projects.vite-plugin-node-runner')"
              icon="i-carbon-play"
              href="https://github.com/nailiable/vite-plugin-node-runner"
            />
            <ProjectCard
              title="vite-nest-auto-scan"
              :description="$t('pages.index.projects.vite-nest-auto-scan')"
              icon="i-carbon-search"
              href="https://github.com/nailiable/vite-nest/blob/v1/packages/auto-scan/"
            />
            <ProjectCard
              title="vite-nest-auto-import"
              :description="$t('pages.index.projects.vite-nest-auto-import')"
              icon="i-carbon-import-export"
              href="https://github.com/nailiable/vite-nest/blob/v1/packages/auto-import"
            />
            <ProjectCard
              title="@naiable/rollup-config"
              :description="$t('pages.index.projects.rollup-config')"
              icon="i-carbon-container-registry"
              href="https://github.com/nailiable/rollup-config"
            />
          </ProjectCardGrid>

          <div flex items-center gap-4 text-nowrap>
            <div>{{ $t('pages.index.project-categories.others') }}</div>
            <hr my10 w-full op-10>
          </div>

          <ProjectCardGrid>
            <ProjectCard
              title="Cell.js new docs"
              :description="$t('pages.index.projects.celljs-new-docs')"
              href="https://malagu.naily.cc"
              icon="i-carbon-container-software"
            />
            <ProjectCard
              title="pnpm create es-project"
              :description="$t('pages.index.projects.create-es-project')"
              icon="i-carbon-code"
              href="https://github.com/Groupguanfang/es-project"
            />
            <ProjectCard
              title="Netease Music List Downloader"
              :description="$t('pages.index.projects.netease-music-list-downloader')"
              icon="i-carbon-music"
              href="https://github.com/Groupguanfang/music-list-downloader"
            />
            <ProjectCard
              title="YesCloudMusic"
              :description="$t('pages.index.projects.yes-cloud-music')"
              icon="i-carbon-music"
              href="https://github.com/Groupguanfang/YesCloudMusic"
            />
            <ProjectCard
              title="Bt"
              :description="$t('pages.index.projects.bt')"
              icon="i-carbon-dashboard"
              href="https://github.com/Groupguanfang/bt"
            />
          </ProjectCardGrid>

          <!-- 文章 -->
          <!-- eslint-disable-next-line -->
          <h1 class="stroke_title absolute text-size-7xl text-size-7xl font-extrabold md:text-size-9xl sm:text-size-8xl op-30 dark:op-50">{{ $t('pages.index.post') }}</h1>
          <div mt15 sm:mt15>
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
                {{ $t("pages.index.no-posts") }}
              </div>
            </div>
          </div>

          <footer mt20 flex justify-between op-70>
            <div><a href="https://beian.miit.gov.cn/">粤ICP备2023102563号-1</a></div>
            <div>Zero的栈记</div>
          </footer>
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
