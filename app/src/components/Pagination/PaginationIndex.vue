<template>
    <div class="pagination">
        <!-- 上半部分 -->
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1 " @click="$emit('getPageNo', 1)"  :class="{active: pageNo == 1}">1</button>
        <button v-if="startNumAndEndNum.start > 2 ">...</button>

        <!-- 中间部分 -->
        <template v-for="(page, index) in startNumAndEndNum.end">
            <button  v-if="page >=startNumAndEndNum.start" :key="index" @click="$emit('getPageNo', page)" :class="{active: pageNo == page}">{{page}}</button>
        </template>
        
        <!-- 下半部分 -->
        <button v-if="startNumAndEndNum.end < totalPage-1 ">···</button>
        <button v-if="startNumAndEndNum.end < totalPage " @click="$emit('getPageNo', totalPage)"  :class="{active: pageNo == totalPage}">{{totalPage}}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo+1)">下一页</button>
        
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>

</template>

<script>
    export default {
        name: 'PaginationIndex',
        props: ['pageNo', 'pageSize', 'total', 'continues'],
        computed: {
            // 总页数
            totalPage() {
                return Math.ceil(this.total/this.pageSize)
            },
            // 连续页码的起始页码和结束页码
            startNumAndEndNum() {
                // 定义两个变量用来存储起始页码和结束页码
                let start = 0
                let end = 0
                // 特殊情况：总页码数小于连续页码数
                if(this.continues > this.totalPage) {
                    start = 1
                    end = this.totalPage
                } else {
                    // 正常情况,总页码数大于连续页码数
                    start = this.pageNo - Math.floor(this.continues/2)
                    end = this.pageNo + Math.floor(this.continues/2)
                    if(start < 1) {
                        // 处理start为0或负值的情况
                        start = 1
                        end = this.continues
                    } else if(end > this.totalPage) {
                        // 处理end大于总页数的情况
                        end = this.totalPage
                        start = this.totalPage - this.continues + 1
                    }
                }
                return {start, end}
            }
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>
