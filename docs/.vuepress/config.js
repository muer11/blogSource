/*
 * @Descripttion:
 * @version:
 * @Author: shenjia
 * @Date: 2021-08-02 18:38:47
 * @LastEditors: shenjia
 * @LastEditTime: 2021-10-08 16:06:53
 */
module.exports = {
  title: '佳佳同学の分享',
  description: '积跬步以至千里~',
  base: '/blog/',
  themeConfig: {
    logo: '/images/3.jpeg',
    nav: [
      { text: '首页', link: '/home/' },
      { text: '计算机综合', link: '/base/' },
      {
        text: 'github',
        link: 'https://github.com/muer11'
        // , target:'_self', rel:''
      }
    ],
    sidebar: [
      {
        title: 'JavaScript', // 必要的
        // collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [
          {
            title: '基础知识',
            path: '/home/',
            children: [
              { title: '数组', collapsable: true, path: '/home/javascript/array' },
              { title: '函数', collapsable: true, path: '/home/javascript/function' },
              { title: '对象', collapsable: true, path: '/home/javascript/object' }
            ]
          },
          { title: '进阶', path: '/home/test', children: [{ title: 'ES6', path: '/home/test' }] }
        ]
      },
      {
        title: 'TypeScript',
        children: [
          {
            title: '基础知识',
            path: '/home/name'
          },
          {
            title: '实践',
            path: '/home/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: 'CSS',
        children: [
          {
            title: '渲染',
            path: '/home/css/render'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: '框架',
        children: [
          {
            title: 'React',
            path: '/home/name'
          },
          {
            title: 'Vue',
            path: '/home/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: 'Node',
        children: [
          {
            title: '开发',
            path: '/home/name'
          },
          {
            title: 'google插件',
            path: '/home/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },

      {
        title: '设计模式',
        children: [
          {
            title: '开发',
            path: '/home/name'
          },
          {
            title: 'google插件',
            path: '/home/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: '工程化',
        children: [
          {
            title: '事件委托',
            path: '/home/Performance/delegate'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: '安全',
        children: [
          {
            title: 'GIT',
            path: '/extend/git/remote'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: '计算机网络',
        children: [
          {
            title: '1. 从输入一个 URL 地址到浏览器完成渲染的整个过程',
            path: '/extend/network/url'
          },
          {
            title: '2. HTTP 详解',
            path: '/extend/network/http'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      // {
      //   title: '计算机操作系统',
      //   children: [
      //     {
      //       title: '开发',
      //       path: '/base/name'
      //     },
      //     {
      //       title: 'google插件',
      //       path: '/base/test'
      //     }
      //   ],
      //   sidebarDepth: 1,
      //   initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      // },
      // {
      //   title: '计算机组成原理',
      //   children: [
      //     {
      //       title: '开发',
      //       path: '/base/name'
      //     },
      //     {
      //       title: 'google插件',
      //       path: '/base/test'
      //     }
      //   ],
      //   sidebarDepth: 1,
      //   initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      // },

      {
        title: '数据结构',
        children: [
          {
            title: '开发',
            path: '/base/name'
          },
          {
            title: 'google插件',
            path: '/base/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      },
      {
        title: '算法',
        path: '/base/',
        children: [
          {
            title: '开发',
            path: '/base/name'
          },
          {
            title: 'google插件',
            path: '/base/test'
          }
        ],
        sidebarDepth: 1,
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ],
    lastUpdated: 'Last Updated'
  }
};
