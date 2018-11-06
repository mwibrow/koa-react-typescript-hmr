
const config = Object.freeze({
  debug: process.env.NODE_ENV !== 'production',
  hmrPort: 8010,
  name: PKG_NAME,
  port: 8000,
  version: PKG_VERSION,
})

export {
  config as default,
  config,
}
