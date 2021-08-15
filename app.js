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

// Handle errors
request.onerror = e => {
    console.error('DB Error:',e.target.error);
}

// Insert data
request.onsuccess = e => {
    const db = e.target.result;

    const heroesData = [
        {
            id:'111',
            heroe:'spider-man',
            message:'Mary Jane!!'
        },
        {
            id:'222',
            heroe:'iron-man',
            message:'Pepper ?'
        }
    ];

    const heroesTransaction = db.transaction('heroes','readwrite');

    heroesTransaction.onerror = e => {
        console.error('Error saving',e.target.error);
    }

    // Alert of success insertion
    heroesTransaction.oncomplete = e => {
        console.log('Transaction success',e);
    }

    const heroesStore = heroesTransaction.objectStore('heroes');

    for(let heroe of heroesData){
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = e => {
        console.log('Item added');
    }
}