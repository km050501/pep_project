//npm install jsdom 
//npm install puppeteer
//npm install minimist
//npm install axios
//npm install cheerio
//npm install request

//please run the below command and the 3 scrapped paragraph files will be available in newly created 3 files
// it will automate the wikipidea and scrap the following 3 things

//node automation.js  
const cheerio =  require('cheerio');
const fs = require('fs');
const request = require('request');
let minimist= require("minimist");
let puppeteer= require("puppeteer");
let jsdom=require("jsdom");
let axios=require("axios");
const { title } = require("process");
const { getTextNodeContent } = require("parse5/lib/tree-adapters/default");




async function run(){

    let browser= await puppeteer.launch({
        headless:false,
        args:['--start-maximized'],
        defaultViewport:null
    })

    let pages=await browser.pages();
    let page=pages[0];
//url pr
    await page.goto('https://wikipedia.org/');
    //english pr click
    await page.waitForSelector("a.link-box[title='English — Wikipedia — The Free Encyclopedia']");
    await page.click("a.link-box[title='English — Wikipedia — The Free Encyclopedia']");
// all portols pr click
  
    await page.waitForSelector("a[href='/wiki/Wikipedia:Contents/Portals']");
    await page.click("a[href='/wiki/Wikipedia:Contents/Portals']");
//a-z index select
    await page.waitForSelector("a[href='/wiki/Wikipedia:Contents/A%E2%80%93Z_index']")
    await page.click("a[href='/wiki/Wikipedia:Contents/A%E2%80%93Z_index']")
    // first K pr click
  
    await page.waitForSelector("a[href='/wiki/Special:AllPages/K']")
    await page.click("a[href='/wiki/Special:AllPages/K']")
//last page pr saagye
    await page.waitForSelector("a[href='/wiki/K']")
    
    await page.click("a[href='/wiki/K']")
    await page.waitFor(3000);
    
    let url = await page.url();
    request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        handlehtml(html);
    }
}
function handlehtml(html)
{
    let lb= "\n";
    let seltool= cheerio.load(html);
    let para1 = seltool(".mw-parser-output>p");
    let ul= seltool(".mw-parser-output>ul");
    let h3= seltool(".mw-parser-output>h3");
    let heading1= seltool("#History");
    let h1=seltool(heading1[0]).text();
    fs.writeFileSync('history.txt',h1+ lb,'utf-8')
    
        let data= seltool(para1[2]).text()+seltool(para1[3]).text()+seltool(para1[4]).text()  ;
       fs.appendFileSync("history.txt",data,'utf-8');
    
    
    let heading2= seltool("#Pronunciation_and_use");
    let h2= seltool(heading2[0]).text();
    fs.writeFileSync("pronounciation_and_use.txt",h2+lb,'utf-8');
    let sheading1= seltool("#English");
    let sh1= seltool(sheading1[0]).text();
    fs.appendFileSync("pronounciation_and_use.txt",sh1+lb,'utf-8');
    fs.appendFileSync("pronounciation_and_use.txt",seltool(para1[5]).text()+seltool(para1[6]).text()+seltool(para1[7]).text()+lb,'utf-8');
    fs.appendFileSync("pronounciation_and_use.txt",seltool('#Number').text()+lb,'utf-8');
   fs.appendFileSync("pronounciation_and_use.txt",seltool(para1[8]).text()+lb,'utf-8') 
   fs.appendFileSync("pronounciation_and_use.txt",seltool('#Other_languages').text()+lb,'utf-8');
   fs.appendFileSync("pronounciation_and_use.txt",seltool(para1[9]).text()+lb,'utf-8')
   fs.appendFileSync("pronounciation_and_use.txt",seltool('#Other_systems').text()+lb,'utf-8');
   fs.appendFileSync("pronounciation_and_use.txt",seltool(para1[10]).text()+lb,'utf-8')
   fs.writeFileSync("Related_characters.txt",seltool('#Related_characters').text()+lb,'utf-8');
   
   let ul1=seltool(ul[0]).text();
   let ul2= seltool(ul[1]).text();
   let h3i= seltool(h3[4]).text();
   fs.appendFileSync("Related_characters.txt",h3i+lb,'utf-8');
   fs.appendFileSync("Related_characters.txt",ul1+lb,'utf-8');
   fs.appendFileSync("Related_characters.txt",seltool('#Ligatures_and_abbreviations').text()+lb,'utf-8');
   fs.appendFileSync("Related_characters.txt",ul2+lb,'utf-8');
}
   
    
    //browser bnd krna hai
   await browser.close();
    


}run();
