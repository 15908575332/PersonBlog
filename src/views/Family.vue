<template>
  <div id="family">


    <!-- 导航 -->
    <div class="nav-wrapper" :class="[$isNavHidden ? 'navHiddenOut' : 'navHiddenIn']">
      <Navigation></Navigation>
    </div>

    <!-- ===== Section 1: Hero ===== -->
    <section class="hero">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:8%;top:12%;width:32px;--rot:5deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:85%;top:70%;width:28px;--rot:-10deg;--ri:2" viewBox="0 0 28 28"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:55%;top:45%;width:36px;--rot:15deg;--ri:3" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <!-- Floating decorative particles -->
        <div class="hero__particles">
          <span class="particle" v-for="n in 5" :key="n" :style="{ '--i': n }"></span>
        </div>
        <div class="hero__portraits">
          <div class="portrait portrait--left">
            <div class="portrait__tags portrait__tags--left">
              <span class="tag" v-for="tag in authorTags" :key="tag.label"
                :style="{ '--delay': tag.delay, '--tag-color': tag.color }">
                <span class="tag__icon" v-html="getIcon(tag.icon)"></span>
                {{ tag.label }}
              </span>
            </div>
            <div class="portrait__ring">
              <img src="@/assets/img/profile_picture/10025.png" alt="Author" />
            </div>
            <span class="portrait__name">Author</span>
          </div>
          <div class="hero__heart">
            <div class="heart-shape"></div>
          </div>
          <div class="portrait portrait--right">
            <div class="portrait__tags portrait__tags--right">
              <span class="tag" v-for="tag in abbyTags" :key="tag.label"
                :style="{ '--delay': tag.delay, '--tag-color': tag.color }">
                <span class="tag__icon" v-html="getIcon(tag.icon)"></span>
                {{ tag.label }}
              </span>
            </div>
            <div class="portrait__ring">
              <img src="@/assets/img/profile_picture/10024.png" alt="Abby" />
            </div>
            <span class="portrait__name">Abby</span>
          </div>
        </div>
        <div class="hero__ornament">
          <svg viewBox="0 0 100 20" width="80" height="16">
            <path d="M5 10 Q15 2 25 10 Q35 18 45 10 Q55 2 65 10 Q75 18 85 10 Q90 6 95 10" fill="none"
              stroke="currentColor" stroke-width="0.8" opacity="0.4" />
          </svg>
        </div>
        <p class="hero__date">二〇二三年十月一日</p>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
      <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8" />
      </svg>
      <span class="section-divider__line"></span>
    </div>

    <!-- ===== Section 2: Love Timer ===== -->
    <section class="timer">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:5%;top:20%;width:28px;--rot:-8deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="right:10%;top:65%;width:34px;--rot:12deg;--ri:2" viewBox="0 0 28 28"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="timer__container">
        <h2 class="timer__heading">我们一起走过的时光</h2>
        <div class="timer__display">
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.years }}</span>
            <span class="timer__label">年</span>
          </div>
          <span class="timer__sep">·</span>
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.months }}</span>
            <span class="timer__label">月</span>
          </div>
          <span class="timer__sep">·</span>
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.days }}</span>
            <span class="timer__label">日</span>
          </div>
          <span class="timer__sep">·</span>
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.hours }}</span>
            <span class="timer__label">时</span>
          </div>
          <span class="timer__sep">·</span>
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.minutes }}</span>
            <span class="timer__label">分</span>
          </div>
          <span class="timer__sep">·</span>
          <div class="timer__unit">
            <span class="timer__number">{{ formattedDateTime.seconds }}</span>
            <span class="timer__label">秒</span>
          </div>
        </div>
      </div>
    </section>
    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
      <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
        <path d="M12 3l2 7h7l-5.5 4 2 7L12 17l-5.5 4 2-7L3 10h7z" fill="none" stroke="currentColor"
          stroke-width="0.8" />
      </svg>
      <span class="section-divider__line"></span>
    </div>

    <!-- ===== Section 3: Milestones 点点滴滴 ===== -->
    <div class="miles">
      <section class="milestones">
        <div class="section-roses" aria-hidden="true">
          <svg class="section-rose" style="left:8%;top:15%;width:30px;--rot:-12deg;--ri:1" viewBox="0 0 28 28"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
            <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
          </svg>
          <svg class="section-rose" style="right:12%;top:55%;width:26px;--rot:18deg;--ri:2" viewBox="0 0 28 28"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
            <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
          </svg>
          <svg class="section-rose" style="left:45%;top:75%;width:38px;--rot:6deg;--ri:3" viewBox="0 0 28 28"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
            <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
            <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
          </svg>
        </div>
        <div class="section__header">
          <span class="section__tag">Moments</span>
          <h2 class="section__title">点点滴滴</h2>
          <p class="section__subtitle">每一个瞬间都值得被铭记</p>
        </div>
        <div class="milestones__timeline">
          <div class="milestone" v-for="m in milestones" :key="m.date">
            <div class="milestone__dot"></div>
            <div class="milestone__card">
              <time class="milestone__date">{{ m.date }}</time>
              <h3 class="milestone__title">{{ m.title }}</h3>
              <p class="milestone__desc">{{ m.desc }}</p>
            </div>
          </div>
        </div>
      </section>
      <div class="section-divider" aria-hidden="true">
        <span class="section-divider__line"></span>
        <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8" />
        </svg>
        <span class="section-divider__line"></span>
      </div>
    </div>

    <!-- ===== Section 4: Spring Countdown ===== -->
    <section class="spring">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:12%;top:20%;width:26px;--rot:-6deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:82%;top:55%;width:32px;--rot:20deg;--ri:2" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="spring__banner">
        <div class="spring__line spring__line--left"></div>
        <div class="spring__content">
          <span class="spring__icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 8 6 8 10C8 13.3 10.7 16 14 16C17.3 16 20 13.3 20 10C20 6 16 2 12 2Z" stroke="currentColor" stroke-width="1.2" fill="none"/>
              <path d="M12 16V22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M9 19H15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.5"/>
            </svg>
          </span>
          <p class="spring__text">距离下一个春节还有</p>
          <div class="spring__countdown">
            <span class="spring__num">{{ countdown.days }}</span><span class="spring__unit">天</span>
            <span class="spring__num">{{ countdown.hours }}</span><span class="spring__unit">时</span>
            <span class="spring__num">{{ countdown.minutes }}</span><span class="spring__unit">分</span>
            <span class="spring__num">{{ countdown.seconds }}</span><span class="spring__unit">秒</span>
          </div>
        </div>
        <div class="spring__line spring__line--right"></div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
      <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8" />
      </svg>
      <span class="section-divider__line"></span>
    </div>

    <!-- ===== Section 5: Gallery 时光相册 ===== -->
    <section class="gallery">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:6%;top:12%;width:28px;--rot:-10deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:88%;top:40%;width:34px;--rot:14deg;--ri:2" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:50%;top:75%;width:40px;--rot:8deg;--ri:3" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="section__header">
        <span class="section__tag">Gallery</span>
        <h2 class="section__title">时光相册</h2>
        <p class="section__subtitle">定格我们最美的模样</p>
      </div>
      <div class="gallery__grid">
        <div class="gallery__item" v-for="(img, i) in galleryImages" :key="i"
          :style="{ '--rotate': img.rotate, '--delay': img.delay }">
          <img :src="img.src" :alt="'Memory ' + (i + 1)" loading="lazy" />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
      <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
        <path d="M12 3l2 7h7l-5.5 4 2 7L12 17l-5.5 4 2-7L3 10h7z" fill="none" stroke="currentColor"
          stroke-width="0.8" />
      </svg>
      <span class="section-divider__line"></span>
    </div>

    <!-- ===== Section 6: Blessings 祝福板 ===== -->
    <section class="blessings">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:10%;top:18%;width:30px;--rot:-12deg;--ri:1" viewBox="0 0 28 28"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:85%;top:55%;width:26px;--rot:16deg;--ri:2" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:40%;top:70%;width:36px;--rot:5deg;--ri:3" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="section__header">
        <span class="section__tag">Wishes</span>
        <h2 class="section__title">祝福板</h2>
        <p class="section__subtitle">写下最真挚的期许</p>
      </div>
      <div class="blessings__grid">
        <div class="blessing-card" v-for="b in blessings" :key="b.id">
          <div class="blessing-card__inner">
            <p class="blessing-card__text">{{ b.text }}</p>
            <span class="blessing-card__author">— {{ b.author }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="section-divider__line"></span>
      <svg class="section-divider__icon" viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8" />
      </svg>
      <span class="section-divider__line"></span>
    </div>

    <!-- ===== Section 7: Explore 探索未知 ===== -->
    <section class="explore">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:15%;top:25%;width:24px;--rot:-8deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:78%;top:60%;width:30px;--rot:18deg;--ri:2" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>
      <div class="explore__content">
        <h2 class="explore__heading">探索未知</h2>
        <p class="explore__text">
          未来的每一天<br />都是未拆封的礼物
        </p>
        <div class="explore__icon">
          <svg viewBox="0 0 1024 1024" width="48" height="48">
            <path
              d="M399.502 655.103c0 7.902-6.665 14.311-14.88 14.311H72.188c-8.215 0-14.875-6.407-14.875-14.311v-28.634c0-7.913 6.66-14.315 14.875-14.315h312.435c8.217 0 14.88 6.402 14.88 14.315l-0.001 28.634zM968.167 655.103c0 7.902-6.664 14.311-14.882 14.311H640.851c-8.216 0-14.877-6.407-14.877-14.311v-28.634c0-7.913 6.661-14.315 14.877-14.315h312.436c8.218 0 14.882 6.402 14.882 14.315l-0.002 28.634z"
              fill="currentColor"></path>
            <path
              d="M968.097 624.008c0 11.563-17.723 20.937-39.583 20.937H97.263c-21.858 0-39.579-9.372-39.579-20.937v-41.876c0-11.562 17.72-20.935 39.579-20.935h831.25c21.86 0 39.583 9.373 39.583 20.935v41.876zM855.003 526.553h-12c0-161.793-151.025-293.421-336.66-293.421-185.633 0-336.656 131.628-336.656 293.421h-12c0-41.334 9.261-81.425 27.527-119.161 17.612-36.384 42.807-69.046 74.886-97.079 65.813-57.509 153.264-89.181 246.243-89.181 92.981 0 180.434 31.672 246.247 89.181 32.079 28.032 57.274 60.693 74.887 97.079 18.264 37.734 27.526 77.826 27.526 119.161z"
              fill="currentColor"></path>
            <path
              d="M1001.996 588.091c-121.146 13.91-980.875 0-980.875 0s-30.62-203.887 241.944-144.555c171.281-1.178 273.436 0 489.644 0 193.07-59.332 283.186 108.642 249.287 144.555z"
              fill="currentColor"></path>
            <path d="M500.343 214.379h12v330.342h-12z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-roses" aria-hidden="true">
        <svg class="section-rose" style="left:20%;top:30%;width:24px;--rot:-5deg;--ri:1" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
        <svg class="section-rose" style="left:72%;top:45%;width:28px;--rot:10deg;--ri:2" viewBox="0 0 28 28" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="12" r="6" fill="currentColor" opacity="0.4" />
          <circle cx="9.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="18.5" cy="16" r="4.5" fill="currentColor" opacity="0.32" />
          <circle cx="14" cy="8.5" r="4" fill="currentColor" opacity="0.26" />
          <circle cx="11.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <circle cx="16.5" cy="11.5" r="3.5" fill="currentColor" opacity="0.34" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#b8956a" stroke-width="1" opacity="0.4" />
        </svg>
      </div>

      <p>Made with love &hearts;</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import Navigation from "@/components/common/NavigationMenu.vue"
import utils from "@/utils/getAssetsFile"
import dayjs from "dayjs"
dayjs.locale("zh-cn")
import relativeTime from "dayjs/plugin/relativeTime"
import duration from "dayjs/plugin/duration"
dayjs.extend(relativeTime, duration)
import { assistanceColors } from "@/styles/colorTokens"

// === Tag Icons (unified 14x14 stroke-based SVGs) ===
const iconSvgs = {
  code: `<svg viewBox="0 0 16 16" fill="none"><path d="M5 3.5L1.5 8l3.5 4.5M11 3.5L14.5 8 11 12.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  camera: `<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3.5" width="14" height="10" rx="1.8" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8.5" r="2.5" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8.5" r="0.8" fill="currentColor"/></svg>`,
  compass: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5l5 2.5-5 2.5 2.5-5z" fill="currentColor" opacity="0.25"/><path d="M5.5 5.5l5 2.5-5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  coffee: `<svg viewBox="0 0 16 16" fill="none"><rect x="3" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M11 6h2a1.5 1.5 0 010 3h-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  palette: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><circle cx="5.5" cy="6.5" r="1.1" fill="currentColor" opacity="0.6"/><circle cx="10.5" cy="6" r="0.9" fill="currentColor" opacity="0.5"/><circle cx="4.5" cy="10.5" r="0.8" fill="currentColor" opacity="0.5"/><circle cx="9.5" cy="11" r="1" fill="currentColor" opacity="0.55"/></svg>`,
  brush: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 13c1 1 2 1.5 3 1 2-1 4-3.5 5.5-5.5-1-1-1.5-2.5-4-1.5C5 8 3 11 3 13z" stroke="currentColor" stroke-width="1.3"/><path d="M9 6L10.5 2 14 5.5 10.5 7" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  music: `<svg viewBox="0 0 16 16" fill="none"><circle cx="4.5" cy="11.5" r="1.8" stroke="currentColor" stroke-width="1.3"/><circle cx="11.5" cy="9.5" r="1.8" stroke="currentColor" stroke-width="1.3"/><path d="M6 11.5V5l5.5-1.5v6" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  sparkle: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5L9 5l3 1-3 1.5L8 11l-1-3.5L4 6l3-1L8 1.5z" fill="currentColor"/></svg>`,
}

const authorTags = [
  { label: "工程师", icon: "code", color: "#7296de", delay: "0s" },
  { label: "摄影控", icon: "camera", color: "#f0b43e", delay: "0.25s" },
  { label: "旅行家", icon: "compass", color: "#9ed4d4", delay: "0.5s" },
  { label: "咖啡成瘾", icon: "coffee", color: "#af9b9b", delay: "0.75s" },
]

const abbyTags = [
  { label: "设计师", icon: "palette", color: "#c57d76", delay: "0.5s" },
  { label: "绘画师", icon: "brush", color: "#ffc0cb", delay: "0.75s" },
  { label: "音乐迷", icon: "music", color: "#7c95b5", delay: "1s" },
  { label: "生活家", icon: "sparkle", color: "#f1b9b9", delay: "1.25s" },
]

const getIcon = (name) => iconSvgs[name] || ""

// === Love Timer ===
const startTime = "2023-10-01 12:00:00"
const SECONDS_IN_YEAR = 365 * 24 * 60 * 60
const SECONDS_IN_MONTH = 30 * 24 * 60 * 60
const SECONDS_IN_DAY = 24 * 60 * 60
const SECONDS_IN_HOUR = 60 * 60
const SECONDS_IN_MINUTE = 60

const formattedDateTime = ref({})
const getTimeDiffrence = () => {
  const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
  const timeDifference = dayjs(currentTime).diff(dayjs(startTime), "seconds")
  let remainingSeconds = timeDifference
  const years = Math.floor(remainingSeconds / SECONDS_IN_YEAR)
  remainingSeconds %= SECONDS_IN_YEAR
  const months = Math.floor(remainingSeconds / SECONDS_IN_MONTH)
  remainingSeconds %= SECONDS_IN_MONTH
  const days = Math.floor(remainingSeconds / SECONDS_IN_DAY)
  remainingSeconds %= SECONDS_IN_DAY
  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR)
  remainingSeconds %= SECONDS_IN_HOUR
  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE)
  remainingSeconds %= SECONDS_IN_MINUTE
  const seconds = remainingSeconds
  formattedDateTime.value = {
    years,
    months,
    days,
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString(),
  }
}

// === Spring Festival Countdown ===
const springFestivalDate = new Date(2027, 1, 17)
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const updateCountdown = () => {
  const now = new Date()
  const timeDifference = springFestivalDate - now
  if (timeDifference < 0) {
    clearInterval(intervalSpring)
    return
  }
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
  countdown.value = { days, hours, minutes, seconds }
}

let intervalTimer, intervalSpring
onMounted(() => {
  updateCountdown()
  intervalSpring = setInterval(updateCountdown, 1000)
  getTimeDiffrence()
  intervalTimer = setInterval(getTimeDiffrence, 1000)
})
onUnmounted(() => {
  clearInterval(intervalTimer)
  clearInterval(intervalSpring)
})

// === Milestones ===
const milestones = [
  { date: "2023.10.01", title: "我们在一起了", desc: "命运让我们相遇，从此世界多了一抹亮色" },
  { date: "2023.12.25", title: "第一个圣诞节", desc: "雪花飘落的夜晚，掌心传来的温度" },
  { date: "2024.02.14", title: "第一个情人节", desc: "玫瑰与巧克力，都不及你的笑容甜蜜" },
  { date: "2024.06.01", title: "海边之旅", desc: "海浪拍打沙滩，我们踩下一串串脚印" },
  { date: "2024.10.01", title: "一周年纪念", desc: "365天，每一天都庆幸有你" },
]

// === Gallery Images ===
const galleryImages = [
  { src: utils.getAssetsFile("img/family/loveWeiYan.jpg"), rotate: "-3deg", delay: "0s" },
  { src: utils.getAssetsFile("img/family/lovePhoto.jpg"), rotate: "2deg", delay: "0.1s" },
  { src: utils.getAssetsFile("img/family/loveMessage.jpg"), rotate: "-1deg", delay: "0.2s" },
  { src: utils.getAssetsFile("img/profile_picture/10055.png"), rotate: "2.5deg", delay: "0.15s" },
  { src: utils.getAssetsFile("img/profile_picture/10008.png"), rotate: "-2deg", delay: "0.25s" },
  { src: utils.getAssetsFile("img/profile_picture/10009.png"), rotate: "1deg", delay: "0.05s" },
]

// === Blessings ===
const blessings = [
  { id: 1, text: "愿你们如初见时那般，眼里有光，心中有爱。岁岁年年，永不褪色。", author: "挚友" },
  { id: 2, text: "最好的爱情不是完美无瑕，而是在柴米油盐中依然紧握彼此的手。", author: "知己" },
  { id: 3, text: "春风十里不如你，愿你们的每一天都如春天般温暖明媚。", author: "闺蜜" },
  { id: 4, text: "从青丝到白发，愿你们的故事像一本永远翻不完的好书。", author: "兄弟" },
]
</script>

<style scoped lang="scss">
/* ============================================
   Design: "墨间朱砂" — Ink & Vermillion Love Album
   Palette: deep ink-blue + paper white + cinnabar
   Taste-Skill: Forest+Bone / Ink+Paper fusion
   ============================================ */

#family {
  background-color: #1c2433;
  color: #c8d0d8;
  font-family: var(--app-font-family);
  line-height: 1.6;

  /* === 全局动画控制 === */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes numberPulse {
      0%, 100% { transform: scale(1); }
      10%      { transform: scale(1.06); }
      20%      { transform: scale(1); }
    }
    @keyframes roseBloom {
      0%, 100% { opacity: 0;   transform: rotate(var(--rot, 0deg)) scale(0.6); }
      8%, 40%  { opacity: 0.45; transform: rotate(var(--rot, 0deg)) scale(1); }
      52%      { opacity: 0;   transform: rotate(var(--rot, 0deg)) scale(0.6); }
    }

    /* === 新增动画 === */

    /* 里程碑奇数项：从左侧滑入 */
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    /* 里程碑偶数项：从右侧滑入 */
    @keyframes slideInRightAlt {
      from { opacity: 0; transform: translateX(40px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* 计时器数字呼吸感脉冲（每3秒一次，持续2s） */
    @keyframes timerBreathingPulse {
      0%, 91%, 100% { transform: scale(1); }
      94%           { transform: scale(1.03); }
      97%           { transform: scale(1); }
    }

    /* Hero 逐层渐入 + 微缩放 */
    @keyframes heroFadeScale {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* 粒子缓慢上下浮动（不同周期创造深度感） */
    @keyframes particleDrift {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-18px); }
    }
  }

  /* === 各区块内玫瑰装饰 === */
  .section-roses {
    position: absolute; inset: 0; z-index: 1;
    pointer-events: none; overflow: hidden;

    .section-rose {
      position: absolute;
      color: #c44d4d;
      opacity: 0;
      height: auto;
      filter: drop-shadow(0 1px 4px rgba(196, 77, 77, 0.25));

      line { stroke: #c44d4d; }

      @media (prefers-reduced-motion: no-preference) {
        animation: roseBloom 12s ease-in-out infinite;
        animation-delay: calc(var(--ri) * 1.6s);
        animation-fill-mode: both;
      }
    }
  }


  /* === Shared Section Header === */
  .section__header {
    text-align: center;
    padding: clamp(2rem, 5vw, 4rem) 1.5rem 2rem;

    .section__tag {
      display: inline-block;
      font-family: var(--app-font-family);
      font-size: clamp(0.7rem, 1.2vw, 0.85rem);
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #c44d4d;
      margin-bottom: 0.75rem;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
      }
    }

    .section__title {
      font-family: var(--app-font-family);
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 400;
      color: #faf8f5;
      margin: 0 0 0.5rem;
      letter-spacing: 0.08em;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
      }
    }

    .section__subtitle {
      font-size: clamp(0.9rem, 1.3vw, 1.05rem);
      color: #8899aa;
      margin: 0;
      font-weight: 300;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
      }
    }
  }


  /* ============================================
     SECTION 1: HERO
     ============================================ */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .hero__overlay {
      position: absolute; inset: 0; z-index: 1;
      background:
        radial-gradient(ellipse at 30% 40%, rgba(196, 77, 77, 0.18) 0%, transparent 55%),
        radial-gradient(ellipse at 72% 55%, rgba(196, 77, 77, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 80%, rgba(30, 40, 56, 0.6) 0%, transparent 70%),
        linear-gradient(180deg, #1c2433 0%, #1e2838 40%, #1a2230 100%);
    }

    &::before {
      content: "";
      position: absolute; inset: 0; z-index: 0;
      background: url("@/assets/img/family/poster-about.jpg") center / cover no-repeat;
      opacity: 0.05;
      filter: blur(3px) saturate(0.3) brightness(0.5);
    }

    .hero__content {
      position: relative; z-index: 2;
      display: flex; flex-direction: column; align-items: center;
      padding: 2rem;
    }

    .hero__portraits {
      display: flex; align-items: center;
      gap: clamp(1.5rem, 3vw, 3rem);
    }

    @media (prefers-reduced-motion: no-preference) {
      @keyframes tagDrift {
        0%, 100% { opacity: 0.55; transform: translateY(0); }
        25%      { opacity: 0.9;  transform: translateY(-7px); }
        75%      { opacity: 0.7;  transform: translateY(3px); }
      }
      @keyframes portraitFloat {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-8px); }
      }
      @keyframes heartbeat {
        0%   { transform: rotate(135deg) scale(0.85); }
        14%  { transform: rotate(135deg) scale(0.9); }
        28%  { transform: rotate(135deg) scale(0.85); }
        42%  { transform: rotate(135deg) scale(0.95); }
        56%  { transform: rotate(135deg) scale(0.85); }
        70%  { transform: rotate(135deg) scale(0.92); }
        84%  { transform: rotate(135deg) scale(0.85); }
        100% { transform: rotate(135deg) scale(0.85); }
      }
      @keyframes particleFloat {
        0%, 100% { opacity: 0;    transform: translateY(0) scale(0.5); }
        20%      { opacity: 0.25; }
        50%      { opacity: 0.4;   transform: translateY(-30px) scale(1); }
        80%      { opacity: 0.15; }
      }
      @keyframes ringGlow {
        0%, 100% { box-shadow: 0 0 30px rgba(196, 77, 77, 0.25); filter: brightness(1); }
        50%      { box-shadow: 0 0 60px rgba(196, 77, 77, 0.45), 0 0 100px rgba(196, 77, 77, 0.15); filter: brightness(1.08); }
      }
    }

    .portrait {
      position: relative;
      display: flex; flex-direction: column; align-items: center;

      @media (prefers-reduced-motion: no-preference) {
        animation: heroFadeScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) both,
                   portraitFloat 6s ease-in-out infinite;
      }
      &--left  { animation-delay: 0.3s, 0s; }
      &--right { animation-delay: 0.45s, -3s; }

      .portrait__ring {
        width: clamp(7rem, 12vw, 11rem);
        height: clamp(7rem, 12vw, 11rem);
        border-radius: 50%;
        padding: 4px;
        background: linear-gradient(135deg, #c44d4d 0%, #8b5a5a 50%, #3d3535 100%);

        @media (prefers-reduced-motion: no-preference) {
          animation: ringGlow 4s ease-in-out infinite;
        }

        img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover; display: block;
        }
      }

      .portrait__name {
        margin-top: 1rem;
        font-family: var(--app-font-family);
        font-size: clamp(1rem, 1.6vw, 1.3rem);
        color: #faf8f5;
        letter-spacing: 0.1em;
        font-weight: 400;
      }

      .portrait__tags {
        position: absolute; top: 50%; transform: translateY(-50%);
        display: flex; flex-direction: column; gap: 0.55rem;
        z-index: 3; pointer-events: none;

        @media (prefers-reduced-motion: no-preference) {
          animation: heroFadeScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0s both;
        }

        &--left  { right: calc(100% + 1.2rem); align-items: flex-end; }
        &--right { left: calc(100% + 1.2rem);  align-items: flex-start; }
      }

      .tag {
        --delay: 0s;
        --tag-color: #7b3a3a;
        display: inline-flex; align-items: center; gap: 0.35rem;
        padding: 0rem 0.85rem;
        font-family: var(--app-font-family);
        font-size: clamp(0.65rem, 1vw, 0.78rem);
        background-color: var(--tag-color);
        @include text-color('text-color');
        border: 1px solid color-mix(in srgb, var(--tag-color) 35%, transparent);
        border-radius: 2px 6px 6px 2px;
        white-space: nowrap; letter-spacing: 0.04em;
        backdrop-filter: blur(4px);
        transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);

        @media (prefers-reduced-motion: no-preference) {
          animation: tagDrift 5s ease-in-out infinite var(--delay);
        }

        .tag__icon {
          display: flex; width: 14px; height: 14px; flex-shrink: 0;
          :deep(svg) { width: 100%; height: 100%; display: block; }
        }

        &:hover {
          background-color: #c44d4d;
          color: #faf8f5;
          border-color: #c44d4d;
        }
        &:focus-visible {
          outline: 2px solid #c44d4d;
          outline-offset: 2px;
        }
      }

      &--left .tag  { clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 50%, calc(100% - 7px) 100%, 0 100%); }
      &--right .tag { clip-path: polygon(7px 0, 100% 0, 100% 100%, 7px 100%, 0 50%); }
    }

    .hero__heart {
      width: clamp(2.5rem, 4.5vw, 3.5rem);
      height: clamp(2.5rem, 4.5vw, 3.5rem);
      flex-shrink: 0;

      .heart-shape {
        width: 100%; height: 100%;
        background: #c44d4d;
        transform: rotate(135deg) scale(0.85);
        position: relative;

        @media (prefers-reduced-motion: no-preference) {
          animation: heartbeat 2s ease-in-out infinite;
        }

        &::before, &::after {
          content: ""; position: absolute;
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #c44d4d;
        }
        &::after  { left: -57%; }
        &::before { top: 57%; }
      }
    }

    .hero__date {
      margin-top: clamp(1.5rem, 3vw, 2.5rem);
      font-family: var(--app-font-family);
      font-size: clamp(1.1rem, 2vw, 1.5rem);
      color: #8899aa;
      letter-spacing: 0.15em;
      font-style: italic;
      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 1s 0.6s both;
      }
    }

    .hero__ornament {
      margin-top: clamp(1rem, 2.5vw, 2rem);
      color: #c44d4d;
      opacity: 0.3;
      display: flex; justify-content: center;
    }

    .hero__particles {
      position: absolute; inset: 0;
      pointer-events: none; z-index: 1;
    }

    .particle {
      --i: 1;
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #c44d4d;
      opacity: 0.4;

      &:nth-child(1) { left: 15%; top: 20%; }
      &:nth-child(2) { left: 80%; top: 15%; }
      &:nth-child(3) { left: 10%; top: 70%; }
      &:nth-child(4) { left: 85%; top: 75%; }
      &:nth-child(5) { left: 50%; top: 85%; }

      @media (prefers-reduced-motion: no-preference) {
        &:nth-child(1) { animation: particleDrift 6s  ease-in-out infinite alternate; }
        &:nth-child(2) { animation: particleDrift 8s  ease-in-out 1s infinite alternate; }
        &:nth-child(3) { animation: particleDrift 10s ease-in-out 2s infinite alternate; }
        &:nth-child(4) { animation: particleDrift 7s  ease-in-out 0.5s infinite alternate; }
        &:nth-child(5) { animation: particleDrift 9s  ease-in-out 3s infinite alternate; }
      }
    }
  }


  /* ============================================
     SECTION DIVIDER (max 3 visible)
     ============================================ */
  .section-divider {
    display: flex; align-items: center; justify-content: center;
    gap: 1rem; padding: 0 1.5rem;
    max-width: 32rem; margin: 0 auto;
    color: rgba(196, 77, 77, 0.25);
    user-select: none;

    .section-divider__line {
      flex: 1; height: 1px; background: currentColor;
    }
    .section-divider__icon {
      flex-shrink: 0; opacity: 0.6;
    }
  }
  // Hide 3 of 6 dividers (keep: after hero, after milestones, after blessings)
  .timer    + .section-divider,
  .spring   + .section-divider,
  .gallery  + .section-divider { display: none; }


  /* ============================================
     SECTION 2: LOVE TIMER
     ============================================ */
  .timer {
    position: relative;
    padding: clamp(3rem, 8vw, 6rem) 1.5rem;
    background: #1e2838;

    .timer__container { max-width: 54rem; margin: 0 auto; text-align: center; }

    .timer__heading {
      font-family: var(--app-font-family);
      font-size: clamp(1.5rem, 2.8vw, 2.2rem);
      font-weight: 400; color: #faf8f5;
      margin: 0 0 clamp(2rem, 4vw, 3rem);
      letter-spacing: 0.12em;
      @media (prefers-reduced-motion: no-preference) { animation: fadeInUp 0.7s both; }
    }

    .timer__display {
      display: flex; align-items: baseline; justify-content: center;
      flex-wrap: wrap; gap: clamp(0.3rem, 1vw, 0.8rem);
    }

    .timer__unit {
      display: flex; flex-direction: column; align-items: center;
      min-width: clamp(3.5rem, 7vw, 5.5rem);
      @media (prefers-reduced-motion: no-preference) { animation: fadeInUp 0.8s var(--unit-delay, 0s) both; }

      &:nth-child(1)  { --unit-delay: 0.1s; }
      &:nth-child(2)  { --unit-delay: 0.2s; }
      &:nth-child(4)  { --unit-delay: 0.3s; }
      &:nth-child(5)  { --unit-delay: 0.4s; }
      &:nth-child(7)  { --unit-delay: 0.5s; }
      &:nth-child(8)  { --unit-delay: 0.6s; }
      &:nth-child(10) { --unit-delay: 0.7s; }
    }

    .timer__number {
      font-family: var(--app-font-family);
      font-size: clamp(2rem, 4.5vw, 3.8rem);
      font-weight: 400; color: #faf8f5;
      line-height: 1.1; font-variant-numeric: tabular-nums;

      @media (prefers-reduced-motion: no-preference) {
        animation: timerBreathingPulse 6s ease-in-out infinite;
        &:nth-child(1)  { animation-delay: 0s; }
        &:nth-child(2)  { animation-delay: 0.2s; }
        &:nth-child(4)  { animation-delay: 0.4s; }
        &:nth-child(5)  { animation-delay: 0.6s; }
        &:nth-child(7)  { animation-delay: 0.8s; }
        &:nth-child(8)  { animation-delay: 1.0s; }
        &:nth-child(10) { animation-delay: 1.2s; }
      }
    }

    .timer__label {
      font-size: clamp(0.7rem, 1.1vw, 0.9rem);
      color: #8899aa; margin-top: 0.3rem; letter-spacing: 0.05em;
    }

    .timer__sep {
      font-family: var(--app-font-family);
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      color: #c44d4d; opacity: 0.4;
      align-self: center; user-select: none;
    }
  }


  /* ============================================
     SECTION 3: MILESTONES
     ============================================ */
  .miles {
    background: #1c2433;

    .milestones {
      position: relative;
      padding: clamp(2rem, 5vw, 4rem) 1.5rem clamp(4rem, 8vw, 6rem);
      max-width: 48rem; margin: 0 auto;

      .milestones__timeline {
        position: relative; padding-top: 2rem;

        &::before {
          content: ""; position: absolute;
          left: 1.3rem; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(180deg, #c44d4d 0%, rgba(196, 77, 77, 0.6) 50%, transparent 100%);
        }
      }

      .milestone {
        position: relative; padding-left: 3.5rem;
        margin-bottom: clamp(2rem, 4vw, 3rem);

        &:nth-child(odd) {
          @media (prefers-reduced-motion: no-preference) {
            animation: slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0s) both;
          }
        }
        &:nth-child(even) {
          @media (prefers-reduced-motion: no-preference) {
            animation: slideInRightAlt 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0s) both;
          }
        }

        &:nth-child(1) { --card-delay: 0.15s; }
        &:nth-child(2) { --card-delay: 0.3s; }
        &:nth-child(3) { --card-delay: 0.45s; }
        &:nth-child(4) { --card-delay: 0.6s; }
        &:nth-child(5) { --card-delay: 0.75s; }
        &:nth-child(6) { --card-delay: 0.9s; }
        &:nth-child(7) { --card-delay: 1.05s; }
        &:last-child    { margin-bottom: 0; }

        .milestone__dot {
          position: absolute; left: 1.05rem; top: 0.5rem;
          width: 10px; height: 10px; border-radius: 50%;
          background: #c44d4d;
          border: 2px solid #1c2433;
          box-shadow: 0 0 0 3px rgba(196, 77, 77, 0.25);
        }

        .milestone__card {
          background: #222c3d;
          border: 1px solid rgba(196, 77, 77, 0.1);
          border-radius: 2px;
          padding: 1.5rem 1.75rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            border-color: rgba(196, 77, 77, 0.3);
            box-shadow: 0 4px 24px rgba(196, 77, 77, 0.08);
          }
          &:focus-visible {
            outline: 2px solid #c44d4d;
            outline-offset: 2px;
          }

          &::after {
            content: ""; position: absolute;
            right: 1.25rem; top: 50%; transform: translateY(-50%);
            width: 20px; height: 20px;
            border: 1px solid rgba(196, 77, 77, 0.2);
            border-radius: 50%; opacity: 0.12; pointer-events: none;
          }
        }

        .milestone__date {
          font-family: var(--app-font-family);
          font-size: 0.8rem; color: #c44d4d; letter-spacing: 0.12em;
        }
        .milestone__title {
          font-family: var(--app-font-family);
          font-size: 1.25rem; font-weight: 400;
          color: #faf8f5; margin: 0.35rem 0 0.4rem;
        }
        .milestone__desc {
          font-size: 0.9rem; color: #8899aa; margin: 0; line-height: 1.7;
        }
      }
    }
  }


  /* ============================================
     SECTION 4: SPRING COUNTDOWN
     ============================================ */
  .spring {
    position: relative;
    padding: clamp(2rem, 4vw, 3.5rem) 1.5rem;
    background: #222c3d;

    .spring__banner {
      display: flex; align-items: center; justify-content: center;
      gap: 1.5rem; max-width: 44rem; margin: 0 auto;
    }

    .spring__line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(196, 77, 77, 0.3), transparent);
      opacity: 0.5; min-width: 2rem;
    }

    .spring__content { text-align: center; flex-shrink: 0; }

    .spring__icon {
      display: block; margin-bottom: 0.5rem;
      color: #c44d4d; opacity: 0.7;

      svg {
        display: block; margin: 0 auto;
      }
    }

    .spring__text {
      font-family: var(--app-font-family);
      font-size: clamp(0.85rem, 1.3vw, 1rem);
      color: #8899aa; margin: 0 0 0.6rem;
    }

    .spring__countdown {
      display: flex; align-items: baseline; justify-content: center; gap: 0.15rem;
    }

    .spring__num {
      font-family: var(--app-font-family);
      font-size: clamp(1.3rem, 2.5vw, 2rem);
      color: #faf8f5;
      font-variant-numeric: tabular-nums;
      min-width: 2.2rem; text-align: center;

      @media (prefers-reduced-motion: no-preference) {
        animation: numberPulse 4s ease-in-out infinite;
      }
      &:nth-child(1) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
      &:nth-child(5) { animation-delay: 0.6s; }
      &:nth-child(7) { animation-delay: 0.8s; }
    }

    .spring__unit {
      font-size: 0.8rem; color: #8899aa; margin: 0 0.4rem 0 0.1rem;
    }
  }


  /* ============================================
     SECTION 5: GALLERY
     ============================================ */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes galleryFadeIn {
      from { opacity: 0; transform: rotate(var(--rotate, 0deg)) translateY(1rem); }
      to   { opacity: 1; transform: rotate(var(--rotate, 0deg)) translateY(0); }
    }
  }

  .gallery {
    position: relative;
    padding: clamp(2rem, 5vw, 4rem) 1.5rem clamp(4rem, 8vw, 6rem);
    background: #1c2433;

    .gallery__grid {
      max-width: 60rem; margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(10rem, 18vw, 16rem), 1fr));
      gap: clamp(1rem, 2vw, 2rem); padding: 2rem 0 0;
    }

    .gallery__item {
      position: relative; overflow: hidden;
      border-radius: 2px;
      background-color: #222c3d;
      aspect-ratio: 4 / 3;
      transform: rotate(var(--rotate, 0deg));
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 2px 12px rgba(28, 36, 51, 0.4);

      @media (prefers-reduced-motion: no-preference) {
        animation: galleryFadeIn 0.6s ease-out var(--delay) both;
      }

      /* 左上角装饰 */
      &::before {
        content: ""; position: absolute;
        top: 6px; left: 6px; z-index: 2; pointer-events: none;
        width: 10px; height: 10px;
        border-top: 1px solid rgba(250, 248, 245, 0.15);
        border-left: 1px solid rgba(250, 248, 245, 0.15);
        opacity: 0.35;
      }

      /* 覆盖层：hover 时从底部滑入 */
      &::after {
        content: ""; position: absolute;
        inset: 0; z-index: 1; pointer-events: none;
        background: linear-gradient(to top, rgba(28, 36, 51, 0.82) 0%, rgba(28, 36, 51, 0.3) 40%, transparent 70%);
        transform: translateY(100%);
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      &:hover {
        transform: rotate(0deg) scale(1.03);
        box-shadow: 0 8px 30px rgba(196, 77, 77, 0.25);
        z-index: 1;

        &::after {
          transform: translateY(0);
        }
      }
      &:focus-visible {
        outline: 2px solid #c44d4d;
        outline-offset: 2px;
      }

      img {
        width: 100%; height: 100%;
        object-fit: cover; display: block;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      &:hover img { transform: scale(1.05); }
    }
  }


  /* ============================================
     SECTION 6: BLESSINGS
     ============================================ */
  .blessings {
    position: relative;
    padding: clamp(2rem, 5vw, 4rem) 1.5rem clamp(4rem, 8vw, 6rem);
    background: #1e2838;

    .blessings__grid {
      max-width: 56rem; margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(clamp(14rem, 22vw, 18rem), 1fr));
      gap: clamp(1rem, 2vw, 1.75rem); padding: 2rem 0 0;
    }

    .blessing-card {
      position: relative;
      background: #222c3d;
      border: 1px solid rgba(196, 77, 77, 0.08);
      border-radius: 2px;
      padding: 1.75rem;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s var(--bless-delay, 0s) both;
      }
      &:nth-child(1) { --bless-delay: 0.1s; }
      &:nth-child(2) { --bless-delay: 0.2s; }
      &:nth-child(3) { --bless-delay: 0.3s; }
      &:nth-child(4) { --bless-delay: 0.4s; }

      &::before {
        content: ""; position: absolute;
        top: 8px; right: 8px;
        width: 14px; height: 14px;
        border-top: 1px solid #c44d4d;
        border-right: 1px solid #c44d4d;
        opacity: 0.12; pointer-events: none;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      &:hover {
        border-color: rgba(196, 77, 77, 0.25);
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(28, 36, 51, 0.5);

        &::before {
          opacity: 0.35;
        }
      }
      &:focus-visible {
        outline: 2px solid #c44d4d;
        outline-offset: 2px;
      }

      .blessing-card__text {
        font-size: 0.9rem; color: #c8d0d8;
        line-height: 1.8; margin: 0 0 1rem; letter-spacing: 0.02em;
      }
      .blessing-card__author {
        font-family: var(--app-font-family);
        font-size: 0.8rem; color: #c44d4d; font-style: italic;
      }
    }
  }


  /* ============================================
     SECTION 7: EXPLORE
     ============================================ */
  .explore {
    position: relative;
    padding: clamp(3rem, 7vw, 6rem) 1.5rem;
    display: flex; justify-content: center;
    background: #1c2433;

    @media (prefers-reduced-motion: no-preference) {
      @keyframes iconPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50%      { opacity: 0.7; transform: scale(1.05); }
      }
      @keyframes exploreRingSpin {
        from { transform: translateX(-50%) rotate(0deg); }
        to   { transform: translateX(-50%) rotate(360deg); }
      }
    }

    .explore__content {
      position: relative; text-align: center; max-width: 32rem;

      &::before {
        content: ""; position: absolute;
        top: -2rem; left: 50%; transform: translateX(-50%);
        width: clamp(10rem, 30vw, 18rem);
        height: clamp(10rem, 30vw, 18rem);
        border: 1px solid rgba(196, 77, 77, 0.15);
        border-radius: 50%; opacity: 0.08; pointer-events: none;

        @media (prefers-reduced-motion: no-preference) {
          animation: exploreRingSpin 24s linear infinite;
        }
      }
    }

    .explore__heading {
      font-family: var(--app-font-family);
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 400; color: #faf8f5;
      margin: 0 0 1rem; letter-spacing: 0.15em;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
      }
    }
    .explore__text {
      font-size: clamp(1rem, 1.5vw, 1.2rem);
      color: #8899aa; margin: 0 0 2rem;
      line-height: 2; font-weight: 300;

      @media (prefers-reduced-motion: no-preference) {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
      }
    }
    .explore__icon {
      color: #c44d4d; opacity: 0.5;

      @media (prefers-reduced-motion: no-preference) {
        animation: iconPulse 3s ease-in-out infinite;
      }
    }
  }


  /* ============================================
     FOOTER
     ============================================ */
  .footer {
    position: relative; text-align: center;
    padding: 1.5rem;
    border-top: 1px solid rgba(196, 77, 77, 0.1);
    background-color: #18202e;

    @media (prefers-reduced-motion: no-preference) {
      animation: fadeInUp 0.7s both;
    }

    p {
      font-family: var(--app-font-family);
      font-size: 0.8rem; color: #8899aa; margin: 0;
    }
  }
}


/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 640px) {
  #family {
    .timer__display { gap: 0.2rem; }
    .timer__sep     { font-size: 1.2rem; }
    .milestone      { padding-left: 2.8rem; }
    .milestones__timeline::before { left: 1.1rem; }
    .milestone .milestone__dot    { left: 0.65rem; }
    .spring__banner { gap: 0.8rem; }
  }
}
</style>
