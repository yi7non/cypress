Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const sites = [
    {
        url: 'https://tauweb-test.tau.ac.il',
        mobile: {
            searchvalue: '-test',
            newvalue: '-test.m'
        }
    },
    {
        url: 'https://english-test.tau.ac.il',
        mobile: {
            searchvalue: '-test',
            newvalue: '-test.m'
        }
    },
    {
        url: 'http://socsci-test.tau.ac.il',
        mobile: {
            searchvalue: 'socsci-test.tau.ac.il',
            newvalue: 'social-sciences-test.m.tau.ac.il'
        }
    },
    {
        url: 'https://rishum-test.tau.ac.il',
        mobile: {
            searchvalue: '-test',
            newvalue: '-test.m'
        }
    },
    {
        url: 'https://international-test.tau.ac.il',
        mobile: {
            searchvalue: '-test',
            newvalue: '-test.m'
        }
    },
    {
        url: 'https://socsci-english-test.tau.ac.il',
        mobile: {
            searchvalue: 'socsci-english-test.tau.ac.il',
            newvalue: 'en-social-sciences-test.m.tau.ac.il'
        }
    },
    {
        url: 'http://engineering-test.tau.ac.il',
        mobile: {
            searchvalue: 'engineering-test.tau.ac.il',
            newvalue: 'engineering-english-test.tau.ac.il'
        }
    },
    {
        url: 'http://international-test.tau.ac.il',
        mobile: {
            searchvalue: '-test',
            newvalue: '-test.m'
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

                cy.login(site.url)
                cy.reducer(site, contentType) 
                
            })

        })
        
    })

})