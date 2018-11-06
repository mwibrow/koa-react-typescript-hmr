// Break webpack static analysis in order to stop
// webpack injecting enviroment variables during build.
const proc = process
const processEnv = proc.env

export default processEnv
