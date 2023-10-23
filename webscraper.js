import puppeteer from "puppeteer";
import fs from 'fs';

export default async function getQuotes()  {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

//   await page.waitFor(2000);

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.songkick.com/artists/10303196-echoplay-nl", {
    waitUntil: "networkidle0",
  });

  await page.setViewport({
    width: 1200,
    height: 3000,
  });

  // Get page data
  const events = await page.evaluate(() => {
    let arr = [];
    // Fetch the first element with class "quote"
    const eventsContainer = document.querySelector(".local-upcoming-events-list");
    const events = eventsContainer.querySelectorAll(".event-listing");

    // event-listing
    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    events.forEach((el) => {
      let time = el.querySelector("time").dateTime;
      let place = el.querySelector(".primary-detail").innerText;
      let venue = el.querySelector(".secondary-detail").innerText;
      arr.push({ time, place, venue });
    });

    return arr;
  });

  // Display the quotes
  console.log(events);
  var dictstring = JSON.stringify(events);
  fs.writeFile("events.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });

  // Close the browser
  await browser.close();
};

getQuotes()

