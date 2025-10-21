
// scripts/postbuild.js
import { writeFileSync } from 'fs'
try {
  writeFileSync('docs/.nojekyll', '')
  console.log('✓ .nojekyll creado en docs/')
} catch (e) {
  console.error('No se pudo crear .nojekyll:', e)
  process.exit(1)
}
