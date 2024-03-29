const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#FF3A7D',
      '@body-background': '#151544',
      '@component-background': '#101037',
      '@input-bg': '#1A1C4B',
      '@input-color': '#B7C8F5',
      '@input-placeholder-color': 'hsv(0, 0, 75%)',
      '@border-color-base': '#101037',
      '@border-color-split': '#101037',
      '@checkbox-check-color': '#101037',
      '@text-color': '#B7C8F5',
      '@heading-color': '#B7C8F5',
      '@table-row-hover-bg': '#2B2F7B',
      '@table-header-bg-sm': '#0D0D2B',
      '@btn-link-ghost-color': '#B7C8F5',
      '@select-dropdown-bg': '#212163',
      '@select-background': '#1A1C4B',
      '@select-item-selected-bg': '#1A1C4B',
      '@select-item-active-bg': '#1A1C4B',
      '@table-body-sort-bg': 'rgba(0, 0, 0, 0)'
    }
  })
)
