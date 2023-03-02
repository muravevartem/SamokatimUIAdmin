import Keycloak from 'keycloak-js'

export const keycloak = new Keycloak({
    url: 'http://sso.1218407-cu57808.tw1.ru/',
    realm: 'open-id',
    clientId: 'smkt'
})