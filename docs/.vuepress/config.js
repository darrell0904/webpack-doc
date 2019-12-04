module.exports = {
  dest: 'dist',
  title: 'Hello Webpack',
  themeConfig: {
    editLinks: false,
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 定制文章标题颜色
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: '初识 Webpack',
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