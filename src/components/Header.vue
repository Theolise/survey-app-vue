<template>
  <header class="header">
    <span>TeamSurvey</span>

    <RouterLink :to="{ name: 'home' }">
      <div class="home">Home</div>
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .home {
    padding: 8px;
    background-color: #494959;
    border-radius: 5px;
    width: fit-content;
  }
}
</style>
