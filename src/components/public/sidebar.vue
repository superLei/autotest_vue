<template>
    <div class="sidebar">
      <el-menu :default-active="$route.path"  class="el-menu-vertical-demo" unique-opened  router>
        <template v-for="bitem in billitem">
          <template v-if="bitem.sublist">
            <el-submenu  :index="bitem.index" :key="bitem.index">
              <template slot="title"><i  :class="bitem.icon"></i>{{bitem.title}}</template>
              <el-menu-item  v-for="(subitem,myindex) in bitem.sublist" :index="subitem.topath" :key="myindex"  >
                {{subitem.title}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item  :index="bitem.index" :key="bitem.index">
              <i  :class="bitem.icon"></i>
              {{bitem.title}}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: '',
  data: function () {
    return {
      billitem: [
        {
          icon: 'el-icon-s-tools',
          index: '/charts',
          title: '会员清除'
        },
        {
          icon: 'el-icon-s-cooperation',
          index: '/chrometojson',
          title: '转换json'
        },
        {
          icon: 'el-icon-star-on',
          index: 'sameday',
          title: '功能管理',
          sublist: [
            {
              topath: '/dday',
              title: '添加功能'
            },
            {
              topath: '/Test1',
              title: '添加用例'
            },
            {
              topath: '/login',
              title: '登录信息'
            },
            {
              topath: '/caseEnv',
              title: '测试环境'
            }
          ]
        },
        {
          icon: 'el-icon-upload',
          index: 'ctyle',
          title: '压力测试',
          sublist: [
            {
              topath: '/tday',
              title: '基本'
            },
            {
              topath: '/clear',
              title: '文件上传'
            }
          ]

        },
        {
          icon: 'el-icon-setting',
          index: 'chartstyle',
          title: '测试报告',
          sublist: [
            {
              topath: '/charts3',
              title: '曲线图'
            },
            {
              topath: '/test',
              title: '柱状图'
            },
            {
              topath: '/test2',
              title: '饼状图'
            },
            {
              topath: '/Cannular',
              title: '环形图'
            },
            {
              topath: '/Cblend',
              title: '地图'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes: function () {
      console.log(this.$route.path)
      return this.$route.path.replace('/', '') // $route.path表示当前路由，:index能直接跳转路由
    }
  }
}
</script>

<style scoped>
  .sidebar{
    position:absolute;
    display: block;
    width:200px;
    top:60px;
    left:0;
    bottom:0;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
