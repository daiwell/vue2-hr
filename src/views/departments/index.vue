<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree_card">
        <tree-tools :treeNode="company" isRoot></tree-tools>
        <!--        end-->
        <!--      row-->
        <el-tree :data="departs">
          <tree-tools slot-scope="{ data }" :treeNode="data"></tree-tools>
        </el-tree>
        <!--    /  row-->
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDepartments, DelDepartments } from "@/api/department";
import { tranListToTreeData } from "@/utils/index";
export default {
  components: {
    TreeTools,
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
      company: { name: "江苏传智播客教育科技股份有限公司", manager: "负责人" },
      defaultProps: {
        children: "children",
        label: "label",
      },
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
