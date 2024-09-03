<template>
    <div class="btn" :style="{backgroundColor:bgColor,borderRadius:round?'20px':'5px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        //props:['type','round'], //讓父組件決定這個子組件的值。父傳到子
        /*
            prop:
                1傳數組[屬性1,屬性2...]
                2傳對象
                    {
                        屬性名1：[屬性類型1,屬性類型2...]
                    }

                    {
                        屬性名:{
                            type:屬性類型
                            required:true
                            default:不傳時的默認數據
                        }
                    }
            屬性類型可選 String Number Bollean Array Object Function
        */
        props:{
            type:{
                type:String,
                required:true
            },
            round:Boolean  //上方的進階寫法，指定可以傳入的屬性與預設類型
        },
        computed:{
            bgColor(){
                if(this.type=='primary'){
                    return "#409eff"
                }else if(this.type=='success'){
                    return "#85ce61"
                }else if(this.type=='danger'){
                    return "red"
                }else{
                    return 'gray'
                }
            }
        }
        
    }
</script>

<style scoped>
.btn{display: inline-block;padding: 10px 20px;border-radius:5px;color: #fff;margin-right: 5px;}
</style>