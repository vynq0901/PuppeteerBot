const puppeteer = require('puppeteer-extra');
const { performance } = require('perf_hooks');

(async function() {
  
    const startTime = performance.now()
    const browser = await puppeteer.launch({headless: false, args: [
        '--start-maximized',
    ], defaultViewport: null})
    const page = await browser.newPage()
   
    // await page.goto('https://maverikstudio.vn/account/login', { waitUntil: 'networkidle2' })
    await page.goto('https://maverikstudio.vn/account/login')
    await page.type('#customer_email', 'vy.nq0901@gmail.com')
    await  page.type('#customer_password', 'fireblood1')
    await page.waitForTimeout(1000)
    await page.click('.btn-signin')
    // await page.waitForNavigation()
    await page.waitForTimeout(500)
    // let loginErr = await page.evaluate(() => {
    //     console.log(document.querySelector('.errors'))
    //     return true
    // })
    while (true) {
        try {
          const loginErr = await page.evaluate(() => {
               let err = document.querySelector('.btn-signin')
                err = {...err}
               return err
            })
 
            console.log('TRYING TO LOGIN...')
            await page.type('#customer_email', 'vy.nq0901@gmail.com')
            await  page.type('#customer_password', 'fireblood1')
            await page.click('.btn-signin')
            // await page.waitForNavigation({
            //     waitUntil: 'networkidle0',
            // })
            await page.waitForNavigation()
        } catch (error) {
            console.log('LOGIN SUCCESSFULLY...')
            break
        }
    }
    try {
        const CHALLENGE = await page.$eval('#challenge-form', ele => {
            return ele
        })
        await page.waitForTimeout(4000)
        
    } catch (error) {
        console.log('NO CHALLENGE FORM...')
    }
    await page.goto('https://maverikstudio.vn/collections/all')
    // await page.waitForTimeout(5000)
    // while (true) {
    //     try {
    //         await page.evaluate(() => {
    //                         document.querySelectorAll('.layered_subtitle.dropdown-filter????')
    //                    })
    //                    await page.waitForTimeout(10000)
    //                    break
    //     } catch (error) {
    //         break
    //         console.log('NO CHALLENGE FORM...')
    //     }
    // }
    // try {
    //     await page.evaluate(() => {
    //                     document.querySelectorAll('.layered_subtitle.dropdown-filter????')
    //                })
    //                await page.waitForTimeout(10000)
    // } catch (error) {
    //     console.log('NO CHALLENGE FORM...')
    // }
   
    try {
        const CHALLENGE = await page.$eval('#challenge-form', ele => {
            return ele
        })
        await page.waitForTimeout(4000)
        
    } catch (error) {
        console.log('NO CHALLENGE FORM...')
    }
    // console.log(CHALLENGE)
   
    let myLink = ''
    while (true) {
        try {
            const productLinks = await page.evaluate(() => {
                let links = document.querySelectorAll('h3 > a')
                links = [...links]
                l = links.map(i => i.getAttribute('href')).find(i => i.toLowerCase().includes('twill') && i.toLowerCase().includes('beige'))
               
                return l
            })
            if (productLinks) {
                console.log('PRODUCT FOUND...')
                
                myLink = productLinks
                await page.goto(`https://maverikstudio.vn${productLinks}`)
                break
            } else {
                console.log('FINDING PRODUCT...')
                await page.reload({ waitUntil: ["domcontentloaded"] })
                // await page.goto('https://maverikstudio.vn/collections/all')
            }
        } catch (error) {
            
        }
    }
  
    try {
        const CHALLENGE = await page.$eval('#challenge-form', ele => {
            return ele
        })
        await page.waitForTimeout(4000)
        
    } catch (error) {
        console.log('NO CHALLENGE FORM...')
    }
 
    await page.click("#variant-swatch-0 > div.select-swap > div.n-sd.swatch-element.m")
    // await page.click("#variant-swatch-0 > div.select-swap > div.n-sd.swatch-element.m.soldou")
    // await page.click("#add-item-form > div.selector-actions > div.quantity-area.clearfix > input:nth-child(3)")

    await page.click('#add-to-cart')
    console.log('ADDED TO CART...')
    await page.waitForTimeout(500)
    await page.goto("https://maverikstudio.vn/checkout")
    try {
        const CHALLENGE = await page.$eval('#challenge-form', ele => {
            return ele
        })
        await page.waitForTimeout(4000)
        
    } catch (error) {
        console.log('NO CHALLENGE FORM...')
    }
    console.log('PROCESSING TO CHECKOUT...')
    await page.waitForTimeout(300)
    await page.select('#customer_shipping_province', '50')
    await page.waitForTimeout(300)
    await page.select('#customer_shipping_district', '480')
    await page.waitForTimeout(300)
    await page.select('#customer_shipping_ward', '26914')
    
    console.log('ITS FINAL STEP...')
    await page.waitForTimeout(500) 
    await page.waitForSelector('#form_next_step > button')
    await page.click('#form_next_step > button')
    const endTime = performance.now()
    console.log(`ITS TOOK: ${endTime - startTime} milliseconds`)
}
)()