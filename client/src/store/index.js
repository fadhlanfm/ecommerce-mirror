import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router/index';
const baseUrl = 'https://afternoon-plateau-24785.herokuapp.com';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    products: [],
    editData: null,
    slide: true,
    cart: null,
    userCart: {},
    total: 0,
    editCart: null,
    editStock: null,
    editCartId: null
  },
  mutations: {
    GET_PRODUCTS(state, data) {
      state.products = data;
    },
    ADD_PRODUCT(state, data) {
      state.products.unshift(data);
    },
    DELETE_DATA(state, data) {
      state.products = data;
    },
    EDIT_DATA_FORM(state, data) {
      state.editData = data;
    },
    ADD_TO_CART_FORM(state, data) {
      state.cart = data;
    },
    GET_CART(state, data) {
      state.userCart = data.data;
      state.total = data.total;
    },
    EDIT_CART_FORM(state, data) {
      state.editCart = data.editCartData;
      state.editStock = data.newStock;
      state.editCartId = data.cartId;
    }
  },
  actions: {
    resetPassword({ dispatch, state }, data) {
      // buar server
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/users/resetpassword',
        data
      })
        .then(() => {
          state.loading = false;
          dispatch('swalMixin', 'Your password has been reset');
          router.push('/login');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    checkout({ state, dispatch }) {
      state.loading = true;
      axios({
        method: 'GET',
        url: baseUrl + '/carts/checkout',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            html: 'Thank\'s for purchasing',
          });
          dispatch('getCart');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    checkoutConfirmation({ dispatch }) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I wanna buy all of this!'
      }).then((result) => {
        if (result.value) {
          dispatch('checkout');
        }
      })
    },
    editCart({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'PUT',
        url: baseUrl + '/carts/' + data.cartId,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          stock: data.newStock
        }
      })
        .then(() => {
          router.push('/cart');
          dispatch('swalMixin', 'Your cart has been updated!');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    editCartForm({ state, dispatch, commit }, data) {
      let editCartData = state.products.filter(x => {
        return x.id === data.productId;
      })[0];
      if (!editCartData) {
        dispatch('showError', { message: 'Error not Found' });
      } else {
        let cartStock = state.userCart.filter(x => {
          return x.Cart.id === data.cartId;
        })[0];
        if (!cartStock) {
          dispatch('showError', { message: 'Error not Found' });
        } else {
          commit('EDIT_CART_FORM', { editCartData, newStock: cartStock.Cart.stock, cartId: cartStock.Cart.id });
          router.push('/editcart');
        }
      }
    },
    deleteCart({ state, dispatch }, id) {
      state.loading = true;
      axios({
        method: 'DELETE',
        url: baseUrl + '/carts/' + id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          state.loading = false;
          dispatch('getCart');
          dispatch('swalMixin', 'Your Cart has been deleted');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    deleteCartConfirmation({ dispatch }, id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          dispatch('deleteCart', id);
        }
      })
    },
    getCart({ state, dispatch, commit }) {
      state.loading = true;
      axios({
        method: 'GET',
        url: baseUrl + '/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          state.loading = false;
          let total = 0;
          data.Products.forEach(x => {
            total += (x.price * x.Cart.stock);
          });
          commit('GET_CART', { data: data.Products, total });
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    addToCart({ state, dispatch, commit }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/carts',
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then(() => {
          state.loading = false;
          router.push('/');
          dispatch('swalMixin', 'Product Added to your cart');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    addToCartForm({ state, dispatch, commit }, id){
      let cartData = state.products.filter(x => {
        return x.id === id;
      })[0];
      if (!cartData) {
        dispatch('showError', { message: 'Error not Found' });
      } else {
        commit('ADD_TO_CART_FORM', cartData);
        router.push('/addcart');
      }
    },
    editProduct({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'PUT',
        url: baseUrl + '/products/' + data.id,
        headers: {
          token: localStorage.getItem('token')
        },
        data: data.obj
      })
        .then(() => {
          router.push('/admin');
          dispatch('swalMixin', 'Product Edited');
          dispatch('getProducts');
          state.loading = false;
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    editDataForm({ state, dispatch, commit }, id) {
      let editData = state.products.filter(x => {
        return x.id === id;
      })[0];
      if (!editData) {
        dispatch('showError', { message: 'Error not Found' });
      } else {
        router.push('/edit');
        commit('EDIT_DATA_FORM', editData);
      }
    },
    deleteDataConfirmation({ dispatch }, id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          dispatch('deleteData', id);
        }
      })
    },
    deleteData({ state, commit, dispatch }, id) {
      axios({
        method: 'DELETE',
        url: baseUrl + '/products/' + id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          let newData = state.products.filter(x => {
            return x.id !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          commit('DELETE_DATA', newData);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    addProduct({ commit, state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then(({ data }) => {
          state.loading = false;
          router.push('/admin');
          dispatch('swalMixin', 'Product Added');
          commit('ADD_PRODUCT', data);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    getProducts({ commit, state, dispatch }) {
      state.loading = true;
      axios({
        method: 'GET',
        url: baseUrl + '/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          state.loading = false;
          let sorted = data.sort((a, b) => b.id - a.id);
          commit('GET_PRODUCTS', sorted);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    logoutUser({ dispatch }) {
      localStorage.removeItem('token');
      dispatch('swalMixin', 'Signed Out Successfully');
      router.push('/login');
    },
    registerUser({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/users/register',
        data
      })
        .then(() => {
          state.loading = false;
          dispatch('swalMixin', 'Registered Successfully');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    loginUser({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/users/login',
        data
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          state.loading = false;
          if (data.role === 'Admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
          dispatch('swalMixin', 'Signed In Successfully');
        }).catch(err => {
          dispatch('showError', err);
        })
    },
    showError({ state }, err) {
      let msg = '';
      if (err.response) {
        if (Array.isArray(err.response.data.msg)) {
          msg = err.response.data.msg.join('<br>');
        } else {
          msg = err.response.data.msg;
        }
      } else if (err.request) {
        msg = err.request;
      } else {
        msg = err.message;
      }
      state.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `${msg}`,
      })
    },
    swalMixin({ commit }, message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: `${message}`
      })
    }
  },
  modules: {
  }
})
