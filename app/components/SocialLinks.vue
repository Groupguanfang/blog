<script setup lang="ts">
import avatar from '@/assets/images/avatar.jpg'

const clipboard = useClipboard()
const toast = useToast()

const handleCopy = () => {
  clipboard.copy('gcz-zero').then(() => {
    toast.add({
      title: 'Copied to clipboard',
      color: 'success',
      icon: 'ph:check-circle-duotone',
      class: 'rounded-none bg-default shadow-md',
      progress: false,
      close: false,
    })
  }).catch(() => {
    toast.add({
      title: 'Failed to copy',
      color: 'error',
      icon: 'ph:x-circle-duotone',
      class: 'rounded-none bg-default shadow-md',
      progress: false,
      close: false
    })
  })
}
</script>

<template>
  <UFieldGroup>
    <UPopover mode="hover" :ui="{ content: 'rounded-none bg-(--card-wechat) shadow-md ring-(--card-wechat-border)' }">
      <UButton
        variant="outline"
        color="neutral"
        class="rounded-none cursor-pointer"
        :ui="{ leadingIcon: 'opacity-80 text-green-600' }"
        size="sm"
        icon="ph:wechat-logo-duotone"
        @click="handleCopy"
      />
      <template #content>
        <PersonalInfoCard :src="avatar" name="Zero" bio="微信号: gcz-zero">
          <template #bottom>
            <div class="text-[10px] opacity-50">TIP: 点击按钮复制微信号到剪贴板</div>
          </template>
        </PersonalInfoCard>
      </template>
    </UPopover>
    <UPopover mode="hover" :ui="{ content: 'rounded-none bg-(--card-telegram) shadow-md ring-(--card-telegram-border)' }">
      <UButton
        variant="outline"
        color="neutral"
        class="rounded-none cursor-pointer"
        :ui="{ leadingIcon: 'opacity-80 text-blue-400' }"
        size="sm"
        icon="ph:telegram-logo-duotone"
        href="https://t.me/GCZ_Zero"
        target="_blank"
      />

      <template #content>
        <PersonalInfoCard :src="avatar" name="Zero" bio="@GCZ_Zero">
          <template #bottom>
            <div class="text-[10px] opacity-50">github@groupguanfang / 发电中 / 准备上本科 / age21</div>
          </template>
        </PersonalInfoCard>
      </template>
    </UPopover>
    <UPopover mode="hover" :ui="{ content: 'rounded-none bg-(--card-twitter) shadow-md ring-(--card-twitter-border)' }">
      <UButton
        variant="outline"
        color="neutral"
        class="rounded-none cursor-pointer"
        :ui="{ leadingIcon: 'opacity-80 text-indigo-600' }"
        size="sm"
        icon="ph:twitter-logo-duotone"
        href="https://x.com/GCZZero"
        target="_blank"
      />

      <template #content>
        <PersonalInfoCard class="max-w-60" :src="avatar" name="Zero" bio="@GCZZero | 2022年4月加入">
          <template #bottom>
            <div class="text-[10px] opacity-70 text-wrap mb-1">github@groupguanfang / 寻找归宿中 / 升本中 / age21 / 尽量不情绪化讨论正经话题 / 疯狂碎碎念 / record daily emotions / 欧尼酱@gujinchuanqi</div>
            <div class="flex items-center gap-1">
              <div class="flex items-center gap-1">
                <div class="text-[10px]">991</div>
                <div class="text-[10px] opacity-50">正在关注</div>
              </div>
              <div class="flex items-center gap-1">
                <div class="text-[10px]">321</div>
                <div class="text-[10px] opacity-50">关注者</div>
              </div>
            </div>
          </template>
        </PersonalInfoCard>
      </template>
    </UPopover>
    <UPopover mode="hover" :ui="{ content: 'rounded-none bg-(--card-github) shadow-md ring-(--card-github-border)' }">
      <UButton
        variant="outline"
        color="neutral"
        class="rounded-none cursor-pointer"
        :ui="{ leadingIcon: 'text-neutral-800 dark:text-neutral-100' }"
        size="sm"
        icon="ph:github-logo-duotone"
        href="https://github.com/groupguanfang"
        target="_blank"
      />

      <template #content>
        <PersonalInfoCard :src="avatar" name="Zero" bio="@groupguanfang" />
      </template>
    </UPopover>
  </UFieldGroup>
</template>