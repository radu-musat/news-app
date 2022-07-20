<template>
  <header>
    <div class="container">
      <nav>

        <ul class="header-news">
						<li>
								<router-link :to="{ name: 'world' }">world news</router-link>
						</li>
						<li  v-if="userLoggedIn">
							<router-link :to="{ name: 'my-feed' }">my feed</router-link>
						</li>
						<li>
								<router-link :to="{ name: 'climate' }">climate</router-link>
						</li>
        </ul>

        <router-link class="branding" to="/">
          <img alt="webpilgrim logo" src="../../public/assets/image.png">
        </router-link>

        <ul class="header-authentication">
						<li v-if="!userLoggedIn">
								<a href="#" @click.prevent="toggleAuthModal">login / register</a>
						</li>
						<template v-else>
							<li>
								<a href="#" @click.prevent="logout">logout</a>
							</li>
							<li>
								<router-link :to="{ name: 'manage' }">manage</router-link>
							</li>
						</template>
						<li>
								<router-link :to="{ name: 'about' }">about</router-link>
						</li>
        </ul>

      </nav>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			title: 'Web Pilgrim',
		};
	},
	methods: {
		...mapMutations(['toggleAuthModal']),
		logout() {
			this.$store.dispatch('logout');

			if (this.$route.meta.requiresAuth) {
				this.$router.push({ name: 'world' });
			}
		},
	},
	computed: {
		...mapState(['userLoggedIn']),
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
		flex-wrap: wrap;
		justify-content: center;

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

      &::before,
			a.active::before {
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

			a.active::before {
				z-index: -1;
			}

      &:hover a,
			a.active {
        color: $theme-primary;
      }

      &:hover::before,
			a.active::before {
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

  @media only screen and (min-width: $laptop-l) {
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
			flex-basis: 30%;
      &.header-news,
      &.header-authentication {
        order: unset;
        margin: 0;
      }

			&.header-news {
				margin-left: -15px;
			}

			&.header-authentication {
				justify-content: flex-end;
				margin-right: -15px;
			}
    }
  }
</style>
