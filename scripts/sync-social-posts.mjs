import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Injects the post-scaler block into every social post HTML file (idempotent),
 * then copies the .html files into public/social-posts/ so they are served
 * statically at /social-posts/<file>.html.
 *
 * The scaler fits the fixed-size .canvas to any viewport (iframe previews and
 * full-size viewing from one file). The ?v=45 / ?v=916 query params activate
 * the 4:5 and 9:16 ratio variants already present in each file's CSS.
 *
 * Run after editing any post: node scripts/sync-social-posts.mjs
 */

const SRC_DIR = 'social-posts'
const DEST_DIR = path.join('public', 'social-posts')

const SCALER_MARKER = 'post-scaler'

const SCALER_BLOCK = `<!-- post-scaler: fit canvas to viewport; ?v=45 / ?v=916 activate ratio variants -->
<style>
  html,body{height:100%;overflow:hidden}
  .canvas{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(var(--s,1))}
</style>
<script>
(function(){
  var c=document.querySelector('.canvas')
  var v=new URLSearchParams(location.search).get('v')
  if(v==='45'||v==='916')c.classList.add('r'+v)
  var fit=function(){c.style.setProperty('--s',Math.min(innerWidth/c.offsetWidth,innerHeight/c.offsetHeight,1))}
  addEventListener('resize',fit)
  fit()
})()
</script>
`

mkdirSync(DEST_DIR, { recursive: true })

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith('.html'))

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file)
  let html = readFileSync(srcPath, 'utf8')

  if (!html.includes(SCALER_MARKER)) {
    if (!html.includes('</body>')) {
      throw new Error(`${file}: no </body> tag found, cannot inject scaler`)
    }
    html = html.replace('</body>', `${SCALER_BLOCK}</body>`)
    writeFileSync(srcPath, html)
  }

  copyFileSync(srcPath, path.join(DEST_DIR, file))
}

console.log(`Synced ${files.length} posts to ${DEST_DIR}`)
