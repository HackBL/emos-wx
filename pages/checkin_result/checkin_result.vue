<template>
	<!-- 整体view标签 -->
	<view class="page">
		<!-- 第一行 -->
		<view class="summary_container">
			<!-- 图片 & 文字 -->
			<view class="user-info">
				<image :src="photo" mode="widthFix" class="photo"></image>
				<!-- 名字 & 部门 -->
				<view class="info">
					<text class="username">{{name}}</text>
					<text class="dept"> 隶属部门：{{deptName == null ? "" : deptName}}</text>
				</view>
			</view>
			<!-- 日期 -->
			<view class="date">{{date}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"牛逼哄哄",
				photo:"https://thirdwx.qlogo.cn/mmopen/vi_32/PlUB6amWAQh9F4rF2bqHYlLKvlkRMjHd7lnhaNwmUYibic2gEmCJTJfCQ9Q4d4H0fr1mdicuMIibzNEa7ASobib5DFQ/132",
				deptName:"管理部",
				address: "辽宁省大连市",
				status: "正常",
				risk: "中风险",
				checkinTime: "08:25",
				date: "2020年12月1日",
				attendanceTime: "08:30",
				closingTime: "09:30",
				checkinDays: 201,
				weekCheckin:[
					{type:"工作日",day:"周一",status:"缺勤"},
					{type:"工作日",day:"周二",status:"迟到"},
					{type:"工作日",day:"周三",status:"正常"},
					{type:"工作日",day:"周四",status:"正常"},
					{type:"工作日",day:"周五",status:"正常"},
					{type:"休息日",day:"周六",status:""},
					{type:"休息日",day:"周日",status:""}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import url("checkin_result.less");
</style>
