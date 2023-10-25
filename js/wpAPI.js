async function forgeLegendWP() {
    const urlFL = "http://www.bjednanigans.no/wp-json/wc/store/products";
    //const corsEnabledUrl = "https://noroffcors.onrender.com/" + urlFL;

    const response = await fetch(urlFL);
    const results = await response.json();
    return results;
}

forgeLegendWP()
