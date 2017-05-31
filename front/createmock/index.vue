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
			createMock: function() {
				if(!this.url || !this.data) {
					this.$message({
			          message: '请填写完整',
			          type: 'warning'
			        });
					return false;
				}
				let data;
				try{
					data = JSON.parse(this.data)
				}catch(e) {
					this.$message({
						message: '请填写正确格式的数据',
						type: 'warning'
					})
					return;
				}

				request.post('/action/createmock')
					.type('json')
					.send({
						type: this.type,
						url: this.url,
						data})
					.end((err, res)=>{
						if(err) {
							this.$message({
								message: '创建失败！',
								type: 'error'
							})
							return false;
						}

						if(res.body.status) {
							this.$message({
								message: '创建成功！',
								type: 'success'
							})
						}else {
							this.$message({
								message: '创建失败！',
								type: 'error'
							})
						}
						
					})

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