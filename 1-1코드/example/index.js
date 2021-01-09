const axios = require("axios"); // 모듈호출
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
    try {
        return await axios.get("https://example.com/");
        const result = await axios.get("https://example.com/");
        console.log('result ', result)
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        console.log('html : ', html.data)
        const $ = cheerio.load(html.data);
        const title = $("title").text();
        const p = $("p").text();
        console.log(title);
        console.log(p);
    })