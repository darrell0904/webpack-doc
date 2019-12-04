module.exports = {
  dest: 'dist',
  title: 'Hello Webpack',
  description: 'Just playing webpack',
  themeConfig: {
    editLinks: false,
    // logo: '/webpack.png',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 定制文章标题颜色
    nav: [
      { text: 'Home', link: '/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      {
        title: '初识 TypeScript',
        collapsable: false,
        children: [
          ['chapter1/', 'Introduction'],
          'chapter1/install',
          'chapter1/start'
        ]
      },
    ],
  }
}