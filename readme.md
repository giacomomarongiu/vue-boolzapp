
# Milestone 1
● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

# Milestone 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato

# Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

# Milestone 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)

# Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

# Consigli utili:
● Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella lista dei contatti
● I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
● Per gestire le date, può essere utile la libreria Luxon
● La struttura dell’array dei contatti potrebbe avere questa forma: (vedi js)

## Steps
- Verifico sia tutto ben collegato ok
- Importo il layout statico del vecchio file ok
- Momentaneamente lascio perdere alcune imperfezioni di stile ok

- Milestone 1
-- Pulisco l'html e decido di lavorare con una sola card ok
-- Studio la mia struttura dati su js ok
-- Visualizzo nella finestra principale i messaggi dell'utente in verde quello dell'interlocutore in bianco ok
--- Visualizzo prima un messaggio in modo statico ok
--- SE lo status è sent lo pubblico nella colonna di destra SE NO nella colonna di sinistra ok
-- Modifico la card in modo da vedere dinamicamente il primo utente della mia struttura dati ok
--- Faccio un ciclo in modo da vedere non solo il primo utente ma tutti in fila ok

- Milestione 2
-- Visualizzo tutti messaggi del contatto nel pannello della conversazione ok
-- Al click sul contatto devo attivare il pannello relativo all'utente
--- Seguo lo stesso principio dello slider:
--- Creo una variabile activeUser con valore 0 che mi servirà come indice
--- Al @click su un utente assegno ad activeUser il valore dell'indice di quell'utente

- Milestone 3
-- La barra di sotto (input) devo far si che sia collegata a un oggetto/variabile
-- Verifico che la struttura dati di appoggio sia la stessa dei messaggi già esistenti
-- Quando clicko il tasto Enter chiamo una funzione
-- La funzione sendMessage mi permette di prendere il valore digitato in input e pusharlo/aggiungerlo ai messaggi già esistenti dell'utente
-- Per le risposte automatiche creo una struttura dati di appoggio con un testo fisso
-- Creo una funzione che aggiunge un oggetto il cui testo è "ok" all'array dei messaggi nell'utente selezionato
-- Attraverso setTimeout (in sendMessage) metto un timer di un secondo per la funzione di replyMessage

- Milestone 4
-- Verifico che la barra di ricerca sia ben predisposta
-- Creo una variabile con stringa vuota
-- Assegno con v-on il valore in input alla stringa vuota appena creata
-- Creo un array userBar che utilizzerò per stampare gli oggetti frutto della ricerca
-- Confronto la mia stringa con i nomi dei miei contacts
-- Faccio sì che vengano stampati solo quelli la cui stringa coincide con il nome
-- Miglioro il confronto: non stampo solo se la stringa è uguale ma anche se c'è riscontro con le posizioni delle lettere
--- Utilizzo slice e toLowerCase
-- Hooko la funzione userBar nel Created per gestire il caso iniziale 

- Milestone 5 - opzionale
- Aggiungo al menù a tendina un icona
- Al click sull'icona partirà una funzione removeMessage() a cui passerò l'indice
- La funzione removeMessage() dovrà cancellare il messaggio in questione con splice (grazie all'indice)
- Collego anche data e ora dell'ultimo messaggio nella userBar