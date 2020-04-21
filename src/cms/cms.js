import CMS from 'netlify-cms-app'

import TagSelectorWidget from "./tag-selector-widget.js"
// import TagSelectorPreview from "./tag-selector-preview.js"
CMS.registerWidget(`tag-selector`, TagSelectorWidget)
