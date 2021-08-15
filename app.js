// indexedDB: Reforzamiento

// Create space of the DB
const request = window.indexedDB.open('my-database',1);

// BD updates when: create or update of version
request.onupgradeneeded = e => {
    console.log('Update of db');

    const db = e.target.result;

    db.createObjectStore('heroes',{
        keyPath:'id'
    });
}