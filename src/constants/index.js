import nightKay from 'night-kay'

const constants = nightKay.require('constants') || {}
const API_SERVER = constants.API_SERVER || API_SERVER_PLACEHOLDER // eslint-disable-line

export { API_SERVER }
