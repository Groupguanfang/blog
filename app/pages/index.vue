<template>
  <main class="flex flex-col justify-center items-center">
    <section class="flex flex-col justify-center h-screen items-center max-w-180 w-full">
      <div class="w-full min-w-6 text-center text-5xl font-serif font-medium">Zero</div>
      <Navigation class="mt-5" />
      <div class="hero-phrases font-light opacity-50 mt-3 text-sm flex flex-col md:flex-row text-center items-center">
        <span style="--stagger: 0" data-animate="top">{{ $t('hero.phrases.0') }}</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_180ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 1" data-animate="bottom">{{ $t('hero.phrases.1') }}</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_360ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 2" data-animate="top">{{ $t('hero.phrases.2') }}</span>
        <span class="select-none motion-safe:animate-[fade-in_0.6s_ease_540ms_both] hidden md:inline">&nbsp;/&nbsp;</span>
        <span style="--stagger: 3" data-animate="bottom">{{ $t('hero.phrases.3') }}</span> 
      </div>
      <div class="flex items-center gap-2 mt-3">
        <SocialLinks />
        <Operation />
      </div>
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

