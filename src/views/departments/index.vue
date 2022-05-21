<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree_card">
        <tree-tools :treeNode="company" isRoot></tree-tools>
        <!--        end-->
        <!--      row-->
        <el-tree :data="departs">
          <tree-tools
            slot-scope="{ data }"
            @delDepts="getDepartments"
            @addDepart="addDepart"
            :treeNode="data"
          ></tree-tools>
        </el-tree>
        <!--    /  row-->
      </el-card>

      <!-- dialog -->
      <add-dept :showDialog="showDialog" :treeNode="node" />
      <!-- / dialog -->
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDepartments, DelDepartments } from "@/api/department";
import { tranListToTreeData } from "@/utils/index";
import AddDept from "./components/add-dept.vue";
export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }],
        },
        { name: "行政部", manager: "刘备" },
        { name: "人事部", manager: "孙权" },
      ],
      departs: [],
      company: {
        name: "江苏传智播客教育科技股份有限公司",
        manager: "负责人",
        id: "",
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      showDialog: false,
      node: null, //当前选中节点对象数据
    };
  },
  methods: {
    async loadDepartments() {
      let result = await getDepartments();
      console.log(result);
      this.company = { name: result.companyName };
      this.departs = tranListToTreeData(result.depts, "");
    },
    async DelCurDepartment() {
      await DelDepartments("a");
    },
    // 添加权限人员和diaglog显示
    addDepart(curNode) {
      this.showDialog = true;
      this.node = curNode;
    },
  },
  created() {
    this.loadDepartments();
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
