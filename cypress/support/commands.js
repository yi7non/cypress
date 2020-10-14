// helper function
const mobileURL = ({url, mobile}) => url.replace(mobile.searchvalue, mobile.newvalue)
const getSiteNameFromUrl = url => url.replace(/https?:\/\//, "")


// login function"
Cypress.Commands.add('login', (domain ,time = 0) => {

    cy.visit(`${ domain }/user/login`)
    cy.get('#edit-name').type('admin', {delay: time})
    cy.get('#edit-pass').type('L4Ar9?Ja=rjwYaM&{enter}', {delay: time})

})



// logout function
Cypress.Commands.add('logout', () => {
    
    cy.get('#admin-menu-account > li:nth-child(1) > a').click()

})



// reducer function
Cypress.Commands.add('reducer', (site, contentType) => {

    switch(contentType) {
        
        case 'front-page':
            cy.frontPageScreenshot(site)
            break
        case 'academic-units-view':
            cy.academicUnitsViewScreenshot(site)
            break
        default:
            cy.login(site.url)
            cy.visit(`${ site.url }/admin/content`)
            cy.filterContentType(contentType)
            cy.contentTypeScreenshot(site, contentType)
    }

})



// filterContentType function
Cypress.Commands.add('filterContentType', (contentType) => {

    cy.get('#edit-status').then(editStatus => {

        if (editStatus.find('#edit-reset').length) {
            cy.get('#edit-reset').click()
        }

    })
    cy.get('#edit-type').select(contentType)
    cy.get('#edit-submit').click()

})



// frontPageScreenshot function
Cypress.Commands.add('frontPageScreenshot', site => {
    
    const siteName = getSiteNameFromUrl(site.url)
    cy.visit(site.url).screenshot(`${ siteName }-front-page`)
    cy.mobileScreenshot(site, 'front-page')

})



// academicUnitsViewScreenshot function
Cypress.Commands.add('academicUnitsViewScreenshot', site => {

    const siteName = getSiteNameFromUrl(site.url)
    cy.visit(`${ site.url }/academic-units-view`).screenshot(`${ siteName }-academic-units-view`)
    cy.mobileScreenshot(site, 'academic-units-view')

})



// contentTypeScreenshot function
Cypress.Commands.add('contentTypeScreenshot', (site, contentType) => {

    const siteName = getSiteNameFromUrl(site.url)

    let path
    cy.get('.sticky-enabled').find('tr').eq(1).within(() => {

        cy.get('td').eq(1).find('a').as('link')
            .should('have.attr', 'href')
            .then(href => {
                path = href
            })

    }).then(() => {
        cy.logout()
        cy.visit(site.url + path).screenshot(`${ siteName }-${ contentType }_01`)
        cy.mobileScreenshot(site, `${ path }_01`, contentType)
    })

    cy.login(site.url)
    cy.visit(`${ site.url }/admin/content`) 
    cy.filterContentType(contentType)

    cy.get('.sticky-enabled').find('tr').eq(2).within(() => {

        cy.get('td').eq(1).find('a').as('link')
            .should('have.attr', 'href')
            .then(href => {
                path = href
            })

    }).then(() => {
        cy.logout()
        cy.visit(site.url + path).screenshot(`${ siteName }-${ contentType }_02`)
        cy.mobileScreenshot(site, `${ path }_02`, contentType)
    })

})



// mobileScreenshot
Cypress.Commands.add('mobileScreenshot', (site, path, contentType) => {

    let visitPath
    if (path === 'front-page') {
        visitPath = ''
    } else {
        visitPath = path
    }
    visitPath = visitPath.replace(/_0\d/, "")
    const siteName = getSiteNameFromUrl(mobileURL(site))
    cy.visit(`${ mobileURL(site) }/${ visitPath }`)
    cy.viewport('iphone-x')
    cy.screenshot(`${ siteName }-${ path.replace(visitPath, contentType) }`)
    cy.viewport(1585, 660)
})