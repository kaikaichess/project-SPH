<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input 
              type="checkbox" 
              name="chk_list" 
              :checked="cart.isChecked===1" 
              @change="changeCheck(cart, $event)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(-1, -1, cart)">-</a>
              <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler(0, $event.target.value, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler(1, 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @change="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    computed: {
      ...mapGetters(['cartList']),
      cartInfoList() {
        return this.cartList.cartInfoList || []
      },
      // 计算商品的总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach(item => {
          sum += item.cartPrice * item.skuNum
        })
        return sum
      },
      // 判断全选
      isAllChecked() {
        return this.cartInfoList.every(item => item.isChecked === 1)
      }
    },
    methods: {
      getData() {
        this.$store.dispatch('getCarList')
      },
      // type判断是点击了+还是-还是修改了输入框，disNum是个数修改的量，cart是修改的对象
      // 同时要对函数添加节流效果，因为快速频繁点击"-"会使商品数量小于1
      handler:throttle(async function(type, disNum, cart) {
        switch(type) {
          case 1: 
            disNum = 1
            break
          // 如果type为-1则判断当前数量是否小于1
          case -1: 
            disNum = cart.skuNum > 1 ? -1 : 0
            break
          // 如果type为0，则判断当前input输入的值
          case 0:
            // 判断当前input输入的值是否非法
            if(isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {
              disNum = parseInt(disNum) - cart.skuNum
            }
        }
        try {
          // 向服务器发送请求告诉服务器数量修改，并等待服务器返回新数据
          await this.$store.dispatch('addOrUpdateShopCart', {skuId: cart.skuId, skuNum: disNum})
          this.getData()
        } catch (error) {
          alert('修改失败')
        }
      }, 500),
      async deleteCart(cart) {
        try {
          await this.$store.dispatch('deleteCart', cart.skuId) 
          this.getData()
        } catch (error) {
          console.log(error.message);
          // alert('删除失败')
        }
      },
      // 修改商品的选中状态，注意带给服务器的isCheck值是1(选中)和2(未选中)
      async changeCheck(cart, $event) {
        try {
          let isChecked = $event.target.checked ? "1" : "0"
          this.$store.dispatch('updateCheck', {skuId: cart.skuId, isChecked })
          this.getData()
        } catch (error) {
          alert('修改选中状态失败')
        }
        
      },
      // 删除所有选中的商品
      async deleteAllCheckedCart() {
        try {
          // 派发删除商品的actions
          await this.$store.dispatch('deleteAllCheckedCart')
          // 更新购物车数据
          this.getData()
        } catch (error) {
          alert('删除失败')
        }
      },
      // 全选的回调函数
      async updateAllCartChecked($event) {
        try {
          let isChecked = $event.target.checked ? "1" : "0"
          await this.$store.dispatch('updateAllCartChecked', isChecked)
          this.getData()
        } catch (error) {
          console.log(error);
          alert('修改全选失败')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>