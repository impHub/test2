<template>
    <div class="star">
        <span class="star-item" v-for="(item,index) in itemClass" :class="item" :key="index">
            
        </span>
    </div>
</template>
<script>
// 星星长度
const LENGTH = 5
//星星的状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
    data(){
        return {}
    },
    props:{
        score:{
            type:Number
        }
    },
    // computed:{
    //   itemClass(){
    //     let result = []

    //     // 4.7 
    //     let score = Math.floor(this.score * 2) / 2

    //     // 半星
    //     let hasDecimal = score % 1 !== 0

    //     // 全星
    //     let integer = Math.floor(score)

    //     // 遍历全星
    //     for(let i = 0; i < integer; i++){
    //       result.push(CLS_ON)
    //     }

    //     // 处理半星
    //     if(hasDecimal){
    //       result.push(CLS_HALF)
    //     }

    //     // 补齐
    //     while(result.length < LENGTH){
    //       result.push(CLS_OFF)
    //     }

    //     return result
    //   }
    // }
    computed:{
        itemClass(){
           let result = [];
           //向下取整小算法,当是4.7*2取整9,再除以2就是4.5
           let score = Math.floor(this.score * 2) / 2;
           //半星  整数%1就等于0
           let hasDecimal = score % 1 !== 0;
           //全星 当4.5向下取整就是4
           let integer = Math.floor(score)
           //遍历全星
           for(let i = 0;i< integer;i++){
               result.push(CLS_ON)
           }
           //除了半星
           if(hasDecimal){
               result.push(CLS_HALF)
           }
           //补齐
           while(result.length < LENGTH){
               result.push(CLS_OFF)
           }
           return result
        }
    }
}
</script>
<style>
.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}
	.star .star-item:last-child{
		margin-right: 0;
	}
	
	/* 三种图片类型*/
	.star .on{
		background-image: url(img/star24_on@2x.png);
	}
	.star .half{
		background-image: url(img/star24_half@2x.png);
	}
	.star .off{
		background-image: url(img/star24_off@2x.png);
	}
</style>
