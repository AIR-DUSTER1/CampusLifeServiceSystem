<template>
  <div class="login-container">
    <img src="@/assets/images/bg.png" class="bg-img" />
    <div class="center">
      <div class="left">
        <img src="@/assets/images/bg_left.png" class="left-bg-img" />
      </div>
      <RouterView></RouterView>
    </div>
    <div class="bottom">{{
      "&copy;" +
      projectName
    }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { projectName } from '@/setting/setting'
import { RouterView } from 'vue-router'
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 3%;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  .center {
    position: relative;
    z-index: 9;
    width: 70%;
    height: 60%;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px #ececec;

    .left {
      position: relative;
      width: 50%;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;

      .left-bg-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .login-container {
    .center {
      width: 80%;
    }
  }

}

@media screen and (max-width: 768px) {
  .login-container {
    .center {
      width: 50%;

      .left {
        display: none !important;
      }
    }

  }

}

@media screen and (max-width: 550px) {
  .login-container {
    .center {
      width: 70%;
    }
  }
}
</style>