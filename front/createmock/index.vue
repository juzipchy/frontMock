<template>
  <div class="mock" id="mock">
		<h1 class="title">
			创建mock数据
		</h1>

		<div class='item'>
			URL: <el-input type="text" id="url" v-model.trim="url" v-on:change="check"/>
		</div>
		
		<div  class='item'>
			type: 
			<el-select v-model="type"  placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value" 
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		 </div>

		<div  class='item'>
			data: <el-input type="textarea" id="url" v-model.trim="data" v-on:change="check"></el-input>
 		</div>
		<el-button type="primary" id="createBtn" v-on:click='createMock'>创建</el-button>
	</div>
</template>

<script>
import request from 'superagent'

export default {
		name: 'create-mock',
		data(){
			return {
				type:'GET',
				value: '',
				options: [{value:'GET', label: 'GET'}, {value:'POST', label: 'POST'}],
				url:'',
				data:''
			}
		},
		methods: {
			createMock: function(){
				console.log(this.type)
				console.log(this.url)
				console.log(this.data)
			},
			check: function(){
				
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
	.item{
		margin: 10px 0;
	}
</style>