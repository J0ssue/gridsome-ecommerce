// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Store from "./store/index";
// import products from './products/index.js';

import Repositories from '~/repositories/RepositoryFactory';
const { RepositoryFactory } = Repositories;

// css
import '~/assets/scss/index.scss';

import DefaultLayout from '~/layouts/Default.vue'
import Pagination from '~/components/Pagination.vue'

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


export default function(Vue, { router, head, isClient, appOptions }) {
  appOptions.store = Store;
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('Pagination', Pagination);
  Vue.prototype.$RepositoryFactory = RepositoryFactory;

  Vue.use(VueSweetalert2);

  head.script.push({
    src: "https://js.stripe.com/v3/",
  });
  // Add a meta tag
  head.meta.push({
    name: 'csrf-token',
    content: '{{ csrf_token() }}'
  })
}