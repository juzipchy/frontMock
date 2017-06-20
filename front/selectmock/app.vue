<template>
  <div id="nginx">
    <h1 class='title'>{{ msg }}</h1>

    <div class="current">
    	当前选择服务器：{{current}}
    </div>
    <div class="buttons">
		<el-button key='item.name' v-bind:type="item.name === current ? 'primary' : ''"  v-for="item in names" @click.native="createMock(item.value)">{{item.name}}</el-button>
	</div>
	<create-mock> </create-mock>
  </div>
</template>

<script>
	import request from 'superagent'
	import CreateMock from '../createmock/index.vue'

	const names = [
		{value:'mqsas', name: '线上'},
		{value:'localhost', name: '本地'},
		{value:'liuxiwen', name: '刘喜文'},
		{value:'anqi', name: '王安奇'},
		{value:'linlin', name: '王林林'},
		{value:'zhicai', name: '彭志才'},
		{value:'liuyilan', name: '柳依岚'},
		{value:'dawei', name: '蔡大伟'},
		{value:'zhangyang', name: '张阳'},
	]

	export default {
	  data () {
	    return {
	      msg: 'mock 服务器选择',
	      names,
	      current: '还未选择',
        selected: 'test'
	    }
	  },
	  components: {
	  	CreateMock
	  },
	  methods: {
	    createMock (name) {
	    	// let who = e.target.innerHTML;
	    	request.get('/action/rewriteServer')
	    		.query({using: name})
	    		.end((err, res)=>{
	    			if(err) {
	    				this.$notify({
					        message: '请求出错',
					        duration: 1000
					      });
	    				return false;
	    			}
	    			if(res.body.status) {
	    				// $('.buttons button').removeClass('active')
	    				// $(e.target).addClass('active');
	    				this.current = this.names.filter(item=>item.value === name)[0].name;

              this.$notify({
                type:'success',
                message: '修改成功！'
              })
	    			}else {
	    				// this.who = who;
	    				this.current = name;
	    				this.$notify({
					        message: '请求出错',
					        duration: 6000
					      });
	    			}

	    	});
	    }
	  }
	}
</script>

<style>
	.title{
		text-align: center;
	}
	.current{
		margin: 20px;
	}
</style>
