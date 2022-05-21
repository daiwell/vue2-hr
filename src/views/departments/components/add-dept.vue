<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    :title="showTitle ? '编辑部门' : '新增部门'"
    :visible="showDialog"
    @close="btnCancel"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="refForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :label="item.username"
            :value="item.username"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="handleSubmit"
          >确定</el-button
        >
        <el-button size="small" @click="handleConfirm">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/department";
import { getEmployeeSimple } from "@/api/employees.js";
import { Dialog } from "element-ui";
export default {
  props: {
    showDialog: {
      type: Boolean,
      require: true,
    },
    treeNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    let checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      const isRepeat = null;
      if (this.formData.id) {
        //编辑模式，校验编辑模式的规则
        depts
          .filter(
            (item) =>
              //先找到除了自己的所有部门，在筛选出和自己同pid的子部门
              item.id !== this.formData.id && item.pid === this.treeNode.pid
          )
          .some((item) => item.name === value);
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
        isRepeat
          ? callback(new Error(`同部门下已经有重复的部门${value}`))
          : callback();
      }
    };

    // 检查编码重复
    let checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments();
      const isRepeat = null;
      if (this.formData.id) {
        //编辑模式，校验编辑模式的规则
        isRepeat = depts.filter(
          (item) => item.id !== this.formData.id && item.code !== value && value
        );
      } else {
        isRepeat = depts.some((item) => item.code === value && value); // 这里加一个 value不为空 因为我们的部门有可能没有code
        isRepeat
          ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
          : callback();
      }
    };

    return {
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          {
            validator: checkNameRepeat,
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          {
            validator: checkNameRepeat,
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 1,
            max: 300,
            message: "部门介绍要求1-50个字符",
          },
        ],
      },
      peoples: [],
    };
  },
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增子部门";
    },
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    //点击确认时，区分是编辑资料还是新增资料
    handleSubmit() {
      this.$refs["refForm"].validate(async (valid) => {
        if (valid) {
          if (this.formData.id) {
            //处于编辑模式
            await updateDepartments(this.formData);
          } else {
            //处于新增模式
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
          }
          this.$emit("addDepts");
          // update:props名称
          this.$emit("update:showDialog", false);
        }
      });
    },
    handleConfirm() {
      this.$emit("update:showDialog", false);
    },
    btnCancel() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs["refForm"].resetFields(); // 重置校验字段
      // update:props名称
      this.$emit("update:showDialog", false); // 关闭
    },
    // 获取部门详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id);
    },
  },
};
</script>

<style></style>
