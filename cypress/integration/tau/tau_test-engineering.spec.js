Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const sites = [
    {
        url: 'http://engineering-test.tau.ac.il',
        mobile: {
            searchvalue: 'engineering-test.tau.ac.il',
            newvalue: 'engineering-english-test.tau.ac.il'
        }
    }
]

const contentTypes = [
    'front-page',
    'general_content',
    'event',
    'academic-units-view',
    'event_main',
    'research',
    'research_loby_page',
    'university_entities_view',
    'news',
    'news_carusale',
    'news_main'
]

const siteName = url => url.replace(/https?:\/\//, "")

describe('get screenshots', () => {

    sites.forEach(site => {

        contentTypes.forEach(contentType => {

            it(`${ siteName(site.url) }-${ contentType }`, () => {
                cy.reducer(site, contentType) 
            })

        })
        
    })

})