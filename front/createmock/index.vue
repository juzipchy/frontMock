<template>
  <div class="mock" id="mock">
		<h1 class="title">
			创建mock数据
		</h1>
    <div>
      <el-button type="primary" id="createBtn" v-on:click='createMock'>创建</el-button>
    </div>
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
			data: <el-input type="textarea" id="url" v-bind:autosize='true' v-model.trim="data" v-on:change="checkdata"></el-input>
 		</div>
    <div>
      <tree-view :data="jsonSource" :options="{maxDepth: 3}"></tree-view>
    </div>

	</div>
</template>

<script>
import Vue from 'vue'
import request from 'superagent'
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)
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
    computed: {
        jsonSource(){
          try {
              return JSON.parse(this.data);
          } catch (e) {
              return JSON.parse('{}');
          }
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
        const {url, type} = this;

        request(type, url)
          .query({
            url,
            type
          })
          .end((err, res)=>{
            if(err) return false;
            if(res.body) {
              this.$notify({
                message: '该url已存在',
                type: 'warning'
              })
              this.data = JSON.stringify(res.body);
            }
          })
			},
      checkdata: function() {

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
