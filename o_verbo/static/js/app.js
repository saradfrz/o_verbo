let verses = [];
let currentVerse = {};

const REFERENCE_INPUT = document.getElementById("reference");
const BOOK_SELECT = document.getElementById("book-select");
const CHAPTER_SELECT = document.getElementById("chapter-select");
const VERSE_SELECT = document.getElementById("verse-select");
const BIBLE_VERSION_SELECT = document.getElementById("bible-version-select");
const TEXT_PARAGRAPH = document.getElementById("text-paragraph");
const MEMORIZE_SECTION = document.getElementById("memorize-section");
const MEMORIZE_TEXTAREA = document.getElementById("memorize-textarea");

fetch("verses.json")
    .then(response => response.json())
    .then(data => {
        verses = data;
        populateSelects();
    });

function populateSelects() {
    // Populate book select
    let books = new Set(verses.map(v => v.book));
    for (let book of books) {
        let option = document.createElement("option");
        option.value = book;
        option.text = book;
        BOOK_SELECT.add(option);
    }

    // Populate chapter select
    let chapters = new Set(verses.filter(v => v.book === BOOK_SELECT.value).map(v => v.chapter));
    for (let chapter of chapters) {
        let option = document.createElement("option");
        option.value = chapter;
        option.text = chapter;
        CHAPTER_SELECT.add(option);
    }

    // Populate verse select
    let verses = new Set(verses.filter(v => v.book === BOOK_SELECT.value && v.chapter === CHAPTER_SELECT.value).map(v => v.verse));
    for (let verse of verses) {
        let option = document.createElement("option");
        option.value = verse;
        option.text = verse;
        VERSE_SELECT.add(option);
    }

    // Populate bible version select
    let bibleVersions = new Set(verses.map(v => v.bible_version));
    for (let bibleVersion of bibleVersions) {
        let option = document.createElement("option");
        option.value = bibleVersion;
        option.text = bibleVersion.toUpperCase();
        BIBLE_VERSION_SELECT.add(option);
    }

    // Set initial verse
    currentVerse = verses[0];
    displayVerse();
}

function search() {
    let reference = REFERENCE_INPUT.value.toLowerCase().replace(/\s/g, "");
    let [book, chapter, verse] = reference.split(":");
    if (!book || !chapter || !verse) {
        alert("Invalid reference format");
        return;
    }
    let result = verses.find(v => v.book.toLowerCase() === book && v.chapter === chapter && v.verse === verse);
    if (!result) {
        alert("Verse not found");
        return;
    }
    currentVerse = result;
    displayVerse();
}

function filterBooks() {
    // Clear chapter and verse selects
    CHAPTER_SELECT.innerHTML = "";
    VERSE_SELECT.innerHTML = "";

    // Populate chapter select
    let chapters = new Set(verses.filter(v => v.book === BOOK_SELECT.value).map(v => v.chapter));
    for (let chapter of chapters) {
        let option = document.createElement("option");
        option.value = chapter;
        option.text = chapter;
        CHAPTER_SELECT.add(option);
    }

    // Update verse select
    filterChapters();
}

function filterChapters() {
    // Clear verse select
    VERSE_SELECT.innerHTML = "";

    // Populate verse select
    let verses = new Set(verses.filter(v => v.book === BOOK_SELECT.value && v.chapter === CHAPTER_SELECT.value).map(v => v.verse));
    for (let verse of verses) {
        let option = document.createElement("option");
        option.value = verse;
        option.text = verse;
        VERSE_SELECT.add(option);
    }
}