<template>
  <header>
    <div class="container">
      <nav>

        <ul class="header-news">
          <li>
            <a href="#">latest</a>
          </li>
          <li>
            <a href="#">world</a>
          </li>
          <li>
            <a href="#">climate</a>
          </li>
        </ul>

        <a class="branding" href="#">
          <img alt="webpilgrim logo" src="../../public/assets/image.png">
        </a>

        <ul class="header-authentication">
          <li>
						<a href="#" @click.prevent="toggleAuthModal">login / register</a>
					</li>
        </ul>

      </nav>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			title: 'Web Pilgrim',
		};
	},
	methods: {
		...mapMutations(['toggleAuthModal']),
	},
};
</script>

<style lang="scss" scoped>
  header {
    background-color: $theme-primary;
  }

  .container {
    padding: 1rem 1.9rem;
  }

  nav {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .branding {
    display: block;
    margin-bottom: 20px;
    max-width: 9rem;
    order: 1;
    img {
      width: 100%;
    }
  }

  ul {
    align-items: center;
    display: flex;

    &.header-news {
      order: 3;
    }

    &.header-authentication {
      order: 2;
      margin-bottom: 20px;
    }

    li {
      display: flex;
      margin-right: 10px;
      position: relative;

      &:last-child {
        margin-right: 0;
      }

      &::before {
        background-color: $theme-secondary;
        content: '';
        display: block;
        height: 100%;
        width: 0;
        left: 0;
        position: absolute;
        top: 0;
        transition: width .25s ease-out;
        z-index: 1;
      }

      &:hover a {
        color: $theme-primary;
      }

      &:hover::before {
        width: 100%
      }
    }

    a {
      color: aliceblue;
      font-size: .8rem;
      left: 0;
      padding: .5rem .75rem;
      position: relative;
      top: 0;
      z-index: 3;
    }

  }

  @media only screen and (min-width: $tablet) {
    .container {
      padding: 1.25rem 1.9rem;
    }

    nav {
      flex-direction: row;
    }

    .branding {
      margin: 0;
      order: unset;
    }

    ul {
      &.header-news,
      &.header-authentication {
        order: unset;
        margin: 0;
      }
    }
  }
</style>
