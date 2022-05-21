<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="!isRoot"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="!isRoot">
                删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { DelDepartments } from "@/api/department";
export default {
  name: "TreeTools",
  props: {
    treeNode: {
      type: Object,
      require: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    operateDepts(type) {
      if (type === "add") {
        this.$emit("addDepart", this.treeNode);
      } else if (type === "edit") {
        this.$emit("editDepts", this.treeNode);
      } else {
        //删除
        this.$confirm("确让要删除吗")
          .then(async () => {
            let ret = await DelDepartments(this.treeNode.id);
            this.$emit("delDepts"); // 触发自定义事件
            this.$message.success("删除部门成功");
          })
          .catch((_) => {});
      }
    },
  },
};
</script>

<style></style>
