module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          // Because of the existence of `customStyleName`, `style: true` will not be effective.
          // return `element-plus/lib/theme-chalk/${name}.css`;
          const scssName = name.replace(/el-(.*)/, '$1');
          return `element-plus/packages/theme-chalk/src/${scssName}.scss`;
        },
      },
    ],
  ],
};
