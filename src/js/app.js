import '../sass/style.sass'
import { onDocumentReady, importAll } from './functions.js'
import { masking, containersdDisplacement } from './projects'

// import all html files from pages
importAll(require.context('../pages', true, /\.html/))

// import all media from public
importAll(
  require.context(
    '../../public',
    true,
    /\.(png|svg|jpg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/
  )
)

onDocumentReady(function () {
  // masking()
  containersdDisplacement()
})
