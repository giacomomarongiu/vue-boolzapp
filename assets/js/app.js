console.log("Hello world");

import { contacts } from './contacts.js';
import { answers } from './answers.js';

const { DateTime } = luxon;

const { createApp } = Vue;

createApp({
    data() {
        return {

            // Array di oggetti che contengono due stringhe (nome e percorso immagine), un booleano e un array di oggetti (importato)
            contacts,

            // Variabile di appoggio per la data dei messaggi
            nowDate: "",

            // Variabile numerica che mi servirà come indice di appoggio
            userActive: 0,

            // Indice di appoggio
            mySecondIndex: 0,

            // Creo una variabile con stringa vuota
            // La collego alla barra "Cerca o inizia una nuova chat" con v-model
            // Mi servirà per generare la lista di utenti stampati nella userBar
            searchedValue: "",

            // BONUS MIO - Array di risposte random (importato)
            answers,

            // Per le risposte automatiche creo una struttura dati di appoggio che sia la stessa dei messaggi già esistenti
            userReply: {
                date: "now", //cambio dopo
                message: "Ok", //cambio dopo
                status: 'received', //sarà sempre received
            },

            // Creo una struttura dati di appoggio che sia la stessa dei messaggi già esistenti
            // La collego alla barra "Scrivi messaggio" con v-model
            newMessage: {
                date: "", //cambio dopo
                message: "", //qui il messaggio dell'input
                status: 'sent', //sarà sempre sent
            },

            // Lista dei contatti da stampare della barra di sinistra 
            printedContacts: [],
        }
    },
    methods: {

        /**Crea l'array dei contatti da stampare nella barra in base a quello scritto (o non scritto) nella searchBar.
         * 
         * 
         */
        userBar() {
            // Verifico la mia stringa 
            // console.log(this.searchedValue);
            // Verifico il mio array
            // console.log(this.contacts);

            // SE non cerco nulla assegno a ptintedContacts l'intero valore di contacts
            if (this.searchedValue === "") {
                this.printedContacts = this.contacts;
                //console.log(this.printedContacts.length > 0);

                // Se NO
            } else {
                // Devo "filtrare" il mio array di oggetti quindi uso un filter
                // Utilizzo il mio array vuoto ptintedContacts per filtrare contacts
                this.printedContacts = this.contacts.filter((searchString, index) => {
                    // Verifico se sto prendendo bene il name
                    // console.log(this.contacts[index].name);

                    // Assegno il valore in input al paramentro della funzione
                    searchString = this.searchedValue;
                    // Verifico assegnazione
                    // console.log(searchString);

                    // Confronto la mia stringa con i nomi dei miei contacts
                    // Miglioro il confronto: non stampo solo se la stringa è uguale ma anche se c'è riscontro con le posizioni delle lettere
                    // Utilizzo anche toLowerCase nel caso in cui venga inserito un valore maiuscolo
                    if ((this.contacts[index].name).slice(0, (searchString.length)).toLowerCase() === searchString.toLowerCase()) {
                        return true;
                    } /* else {
                        return console.log("NON E' TRUE"); //Verifica
                    } */

                })
            }
        },

        /**Questa funzione crea un collegamento costante tra gli utenti che visualizzo e gli utenti in contacts.
         * Indispendabile perché la funzione lastUserOnTop modifica in continuazione l'ordine dell'array.
          */
        findInContacts() {
            // Io stampo i valori di printedContacts non di contacts
            // Per capire quale contacts sto modificando su printedContacts faccio un ciclio e cerco l'utente per nome
            // Salvo il nome dell'utente attivo
            const myName = this.printedContacts[this.userActive].name;
            // Verifico
            //console.log(myName);

            (this.contacts).forEach((element, index) => {
                //console.log(element.name);
                if (myName == element.name) {
                    // Utilizzo il mio indice di appoggio per capire quale contacts sto modificando
                    return this.mySecondIndex = index;
                }
            });
            //console.log(this.mySecondIndex);
        },

        /** Assegna la classe CSS (nel DOM) received/sent ai messaggi degli utenti
         * 
        */
        sendOrReceived(string) {
            // Verifico se è collegata bene
            //console.log(string);
            if (string == 'sent') {
                return 'sent'
            }
            return 'received'
        },

        /** Permette di prendere il valore digitato in input ("Scrivi messaggio...") e pusharlo/aggiungerlo ai messaggi già esistenti dell'utente attivo
         * 
         */
        sendMessage() {
            // Verifico se è ben collegata
            //console.log("QUI IL MESSAGGIO UTENTE");

            // Verifico cosa ho con This
            //console.log(this.contacts);

            // Conosco quale utente riceverà il messaggio perché ho userActive
            //console.log(this.contacts[this.userActive]);

            // Verifico se è l'array giusto
            //console.log(this.contacts[this.userActive].messages);

            // Assegno a nowDate la data e l'ora di oggi
            this.dateMsg();
            // Assegno la data corretta al mio oggetto
            this.newMessage.date = this.nowDate;
            // Verifico se newMessage ha il messaggio corretto
            console.log(this.newMessage);

            // Capisco quale utente in contacts sto modicando
            this.findInContacts(); // Ottengo l'indice

            // Aggiungo la il messaggio all'array contacts con spred
            (this.contacts[this.mySecondIndex].messages).push({ ...this.newMessage })
            //Verifico se è stato aggiunto correttamente
            //console.log(this.contacts[this.mySecondIndex].messages);

            // Pulisco l'input
            this.newMessage.message = "";

            // BONUS MIO
            // L'ultimo utente a cui ho scritto diventerà il primo stampato nella userBar
            this.lastUserOnTop();

            // Genero una risposta automatica
            setTimeout(() => { this.replyMessage(); }, 1000) // Vedi sotto

        },

        /** Genera un oggetto grazie all'oggetto globale userReply.
         *  La risposta testutale verrà generata a caso tra le stringhe presenti nel file aswers
         * 
         */
        replyMessage() {
            // Capisco quale utente in contacts sto modicando
            this.findInContacts();
            // Mi evito i log perché sono uguali a quelli di sendMessage
            // Unica differenza: il mio oggetto è statitico (userReply)

            // Genero una risposta random dal mio array di risposte 
            let randomIndex = Math.floor(Math.random() * (this.answers.length - 1));
            // Verifico
            //console.log(this.answers[randomIndex]);

            // Assegno la risposta al mio oggetto
            this.userReply.message = this.answers[randomIndex];
            // Assegno a nowReply la data e l'ora di oggi
            this.dateMsg();
            // Assegno la data corretta al mio oggetto
            this.userReply.date = this.nowDate;
            // Verifico se userReply ha il messaggio corretto
            console.log(this.userReply);

            // Lo aggiungo con spred
            (this.contacts[this.mySecondIndex].messages).push({ ...this.userReply })
        },

        // Rimuove il messaggio relativo all'index passato
        removeMessage(userIndex) {
            this.findInContacts();
            console.log(this.userActive);
            console.log(this.contacts[this.userActive].messages);
            //Verifico se si triggera bene
            //console.log("Cancella!");
            //Verifico l'index passato
            //console.log(userIndex);
            //Verifico se è corretto l'elemento
            //console.log(this.contacts[this.userActive].messages);
            //console.log(this.contacts[this.userActive].messages[userIndex]);
            //Cancello il testo selezionato grazie all'indice che ho ricevuto
            (this.contacts[this.mySecondIndex].messages).splice(userIndex, 1)
            this.userBar()
        },

        // Assegna la data/ora di oggi alla mia variabile nowDate 
        dateMsg() {
            this.nowDate = DateTime.now()
                .setLocale('it')
                .toFormat('dd/LL/yyyy hh:mm:ss');
        },

        // Porta l'ultimo utente a cui mando un messaggio in cima alla lista della userBar
        lastUserOnTop() {
            let myLastUser = this.contacts[this.mySecondIndex];
            console.log(myLastUser);
            // Cancello l'oggetto appena creato
            this.contacts.splice(this.mySecondIndex, 1);
            // Lo ri-inserisco, ma in cima
            this.contacts.unshift(myLastUser)

            // Lo ri-inserisco, ma in cima
            this.userBar()

            // L'oggetto in cima avrà sempre indice 0
            this.userActive = 0;
        },

    },
    // Chiamo la funzione searchUser qui
    // All'inizio la searchBar sarà vuota quindi devo stampare tutti i contatti
    mounted() {
        this.userBar()
    }
}).mount('#app')