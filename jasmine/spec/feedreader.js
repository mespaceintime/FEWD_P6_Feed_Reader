/* feedreader.js - Jasmine will read to tests application.*/
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    /* Jasmine test the allFeeds RSS Feeder functionality and all tests pass. */
    describe("RSS Feeds", function(done) {
        /* Test loops through each feed in the allFeeds
        object and ensures it has a name defined and that the name is not empty. */
        it("name defined and that the name is not empty", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test loops through allFeeds object to ensure it has a URL defined and
        the URL is not empty. */
         it("URL defined and not empty", function() {
            allFeeds.forEach(function(feed){
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length).not.toBe(0);
            });
        });
        /* Loops through each feed in the allFeeds object and ensures it has a name defined
         and that the name is not empty. */
         it("name defined and not empty", function() {
            allFeeds.forEach(function(feed){
                 expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    /* (1)The Menu suite */
    describe("(1)The Menu", function(done) {
        /* hide The Menu */
        it("hide The Menu", function(){
             var body = $("body");
             expect(body.hasClass("menu-hidden")).toBeDefined();
        });
        /* display The Menu */
        it("display The Menu", function() {
            var icon = $(".menu-icon-link");
            var body = $("body");
            icon.click();
                 expect(body.hasClass("menu-hidden")).toBe(false);
            icon.click();
                 expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });
    /* (2)Initial Entries suite */
    describe("(2)Initial Entries", function() {
        /* asynchronous - need beforeEach, done  */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        /* Ensures when the loadFeed function is called and completes its work, 
        there is at least a single .entry element within the .feed container. */
        it('has at least one entry', function() {
            var stories = $(".feed").has(".entry");
            expect(stories.length).toBeGreaterThan(0); 
        });
    });
    /* (3)New Feed Selection suite */
    describe("(3)New Feed Selection", function(done) {
        var Product;
        /* asynch needs beforeEach, done */
        beforeEach(function(done){
            loadFeed(0, function(){
                Product = $(".feed").html();
                loadFeed(1, done);
            });
        });
        /*  When a new feed is loaded by the loadFeed function, the content changes. */
        it("content changes when a new feed is loaded", function(done) {
            expect($(".feed").html()).not.toBe(Product);
            done();
        });
         afterEach(function (done) {
            loadFeed(0,done);
        });
    });
}());