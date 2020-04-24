import CMS from 'netlify-cms-app'

import TagSelectorWidget from "./tag-selector-widget.js"
CMS.registerWidget(`tag-selector`, TagSelectorWidget)

CMS.init()
