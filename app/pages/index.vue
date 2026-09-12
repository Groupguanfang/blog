<template>
  <main class="flex flex-col justify-center items-center">
    <section class="flex flex-col justify-center h-screen items-center max-w-180 w-full">
      <div class="w-full min-w-6 text-center text-5xl font-serif font-medium">Zero</div>
      <div class="hero-phrases font-light opacity-50 mt-3 text-sm flex flex-col md:flex-row text-center">
        <span style="--stagger: 0" data-animate="top">寻找归宿中</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_180ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 1" data-animate="bottom">喜欢发现和组合各种积木</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_360ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 2" data-animate="top">研究各种系统性架构</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_540ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 3" data-animate="bottom">然后创造点什么新东西</span>
      </div>
      <Navigation class="mt-5" />
    </section>
  </main>
</template>

<style scoped>
.hero-phrases [data-animate] {
  --stagger: 0;
  --delay: 55ms;
  --start: 40ms;
  display: inline-block;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-phrases [data-animate] {
    animation: enter-from-bottom 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--stagger) * var(--delay) + var(--start));
  }

  .hero-phrases [data-animate="top"] {
    animation-name: enter-from-top;
  }

  .hero-phrases [data-animate="bottom"] {
    animation-name: enter-from-bottom;
  }
}

@media (prefers-reduced-motion: no-preference) and (width < 48rem) {
  .hero-phrases [data-animate] {
    animation-name: enter-from-bottom;
  }
}

@keyframes enter-from-top {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes enter-from-bottom {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>

<style>
html, body {
  overflow: hidden;
}
</style>
