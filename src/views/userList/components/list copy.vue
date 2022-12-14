<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom:10px" border>
      <el-table-column prop="date" label="用户名">
        <template #default="{row}">
          {{row.username}}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="邮箱">
        <template #default="{row}">
          {{row.email}}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="角色">
        <template #default="{row}">
          {{rolesFilters(row.roles)}}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="状态">
        <template #default="{row}">
          <el-switch
              v-model="row.status"
              :active-value="1"
              active-text="正常登录"
              inactive-text="禁止登录"
              :inactive-value="-1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template #default="{row}">
            <!-- <el-row>
              <edit-username-roles :row="row.username" :roles="row.roles" />
            </el-row> -->
            <el-button>{{row.username}}</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      background
      :total="total"
      v-show="total > 0"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script lang='ts' setup>
import {reactive, toRefs, onMounted, computed} from 'vue'
import {userListApi} from './../../../api/userlist'
let state = reactive<{
  tableData:{}[];
  total: number;
  listQuery: {
    page: number;
    limit: number;
  }
}>({
  tableData: [],
  total: 0,
  listQuery: {
    page: 1,
    limit: 10
  }
})
const {tableData, listQuery, total} = toRefs(state)
onMounted(() => {
  getList()
})
const getList = () => {
  // console.log((listQuery.value.page - 1) * listQuery.value.limit);
  userListApi({
    offset: (listQuery.value.page - 1) * listQuery.value.limit,
    limit: listQuery.value.limit
  }).then(res => {
    console.log(res);
    if (res.code === 200) {
      tableData.value = res.data.items
      total.value = res.data.total
    }
  })
}
// 改变页码
const handleCurrentChange = (page?: any) => {
  listQuery.value.page = page
  getList()
}
//改变页数限制
const handleSizeChange = (val: number) => {
  listQuery.value.limit = val
  getList()
}
const rolesFilters = (row:{}[]) => {
  console.log(row);
}
</script>
<style scoped>
:deep(.el-pagination) {
  justify-content: right;
}
</style>
