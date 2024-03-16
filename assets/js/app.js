console.log("Hello world");

import { contacts } from './contacts.js';
import { answers } from './answers.js';

const { DateTime } = luxon;

const { createApp } = Vue;

createApp({
    data() {
        return {
            // Array di risposte random (importato)
            answers,
            // Variabile di appoggio per la data dei messaggi
            nowDate: "",
            // Creo una variabile con stringa vuota
            // La collego alla barra "Cerca o inizia una nuova chat" con v-model
            searchedValue: "",
            // Variabile numerica che mi servirà come indice di appoggio
            userActive: 0,
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
            // array di oggetti che contengono due stringhe (nome e percorso immagine), un booleano e un array di oggetti (importato)
            contacts,
            // Lista dei contatti da stampare della barra di sinistra 
            printedContacts: [],
        }
    },
    methods: {

        // Crea l'array dei contatti da stampare nella barra
        userBar() {
            // Verifico la mia stringa 
            // console.log(this.searchedValue);
            // Verifico il mio array
            // console.log(this.contacts);
            // Devo "filtrare" il mio array di oggetti quindi uso un filter
            // Utilizzo il mio array vuoto ptintedContacts per filtrare contacts
            // SE non cerco nulla stampo tutti i contatti

            if (this.searchedValue === "") {
                this.printedContacts = this.contacts;
                //console.log(this.printedContacts.length > 0);
            } else {
                // Se NO li filtro
                this.printedContacts = this.contacts.filter((searchString, index) => {
                    // Verifico se sto prendendo bene il name
                    // console.log(this.contacts[index].name);
                    // Assegno il valore in input al paramentro della funzione
                    searchString = this.searchedValue;
                    // Verifico assegnazione
                    // console.log(searchString);
                    // Confronto la mia stringa con i nomi dei miei contacts
                    // Miglioro il confronto: non stampo solo se la stringa è uguale ma anche se c'è riscontro con le posizioni delle lettere
                    // Utilizzo anche toLowerCase nel caso in cui venga inserito un valore minuscolo
                    if ((this.contacts[index].name).slice(0, (searchString.length)).toLowerCase() === searchString.toLowerCase()) {
                        return true;
                    } /* else {
                        return console.log("NON E' TRUE"); //Verifica
                    } */

                })
            }
        },

        // Assegna la classe received/sent al messaggio
        sendOrReceived(string) {
            //faccio un leggo e vedo se prende giusto
            //console.log(string);
            if (string == 'sent') {
                return 'sent'
            }
            return 'received'
        },

        // Permette di prendere il valore digitato in input e pusharlo/aggiungerlo ai messaggi già esistenti dell'utente attivo
        sendMessage() {
            //Verifico se è ben collegata
            //console.log("QUI IL MESSAGGIO UTENTE");
            //Verifico cosa ho con This
            //console.log(this.contacts);
            //Conosco quale utente riceverà il messaggio perché ho userActive
            //console.log(this.contacts[this.userActive]);
            // Verifico se è l'array giusto
            //console.log(this.contacts[this.userActive].messages);
            // Verifico se newMessage ha il messaggio in lettura corretto
            //console.log(this.newMessage);
            // Assegno a nowDate la data e l'ora di oggi
            this.dateMsg();
            // Assegno la data corretta al mio oggetto
            this.newMessage.date = this.nowDate;


            const myName = this.printedContacts[this.userActive].name;
            console.log(myName);
            console.log(this.contacts);
            (this.contacts).forEach((element, index) => {
                console.log(element.name);
                if (myName == element.name) {
                    return this.userActive = index;
                } else return console.log(false)
            });

            // Aggiungo la todo all'array con l'operatore spred (push mi crea problemi per via del passaggio tramite reference)
            console.log(this.userActive);
            (this.contacts[this.userActive].messages).push({ ...this.newMessage })
            // Pulisco l'input

            this.newMessage.message = "";

            console.log("Qui");

            //Verifico se è stato aggiunto correttamente
            //console.log(this.contacts[this.userActive].messages);
            this.userBar()
            setTimeout(() => { this.userBar(); this.replyMessage() }, 1000) // Vedi sotto
            // Se ho mando un messaggio a un utente questo diventa il primo della lista nella userBar
            //Utilizzo un var locale di appoggio
            setTimeout(() => {
                let myLastUser = this.contacts[this.userActive];
                // Cancello l'oggetto appena creato
                this.contacts.splice(this.userActive, 1);
                console.log("Qui");
                // Lo ri-inserisco, ma in cima
                this.contacts.unshift(myLastUser)
                console.log("Qui");
                // L'oggetto in cima avrà sempre indice 0
                this.userActive = 0;
                console.log("Qui");
                
                this.printedContacts.splice(this.userActive, 1);
                console.log("Qui");
                // Lo ri-inserisco, ma in cima
                this.printedContacts.unshift(myLastUser)
                console.log("Qui");
                // L'oggetto in cima avrà sempre indice 0
                this.userActive = 0;
                console.log("Qui");
                this.userBar()

            }, 1000)
        },

        // Aggiunge un oggetto il cui testo è una stringa random di "answers" all'array dei messaggi nell'utente attivo
        replyMessage() {
            console.log("Qui");

            // Mi evito i log perché sono uguali a quelli di sendMessage
            // Unica differenza: il mio oggetto è statitico (userReply)
            // Assegno a nowDate la data e l'ora di oggi
            this.dateMsg();
            // Assegno la data corretta al mio oggetto
            this.userReply.date = this.nowDate;
            console.log("Qui");

            // Genero una risposta random dal mio array di risposte 
            let randomIndex = Math.floor(Math.random() * (this.answers.length - 1));
            //console.log(this.answers[randomIndex]);
            // Assegno la risposta al mio oggetto
            this.userReply.message = this.answers[randomIndex];
            console.log("Qui");

            // Lo aggiungo
            (this.contacts[this.userActive].messages).push({ ...this.userReply })
            console.log("Qui");

        },

        // Rimuove il messaggio relativo all'index passato
        removeMessage(userIndex) {
            //Verifico se si triggera bene
            //console.log("Cancella!");
            //Verifico l'index passato
            //console.log(userIndex);
            //Verifico se è corretto l'elemento
            //console.log(this.contacts[this.userActive].messages);
            //console.log(this.contacts[this.userActive].messages[userIndex]);
            //Cancello il testo selezionato grazie all'indice che ho ricevuto
            (this.contacts[this.userActive].messages).splice(userIndex, 1)
        },

        // Assegna la data/ora di oggi alla mia variabile nowDate 
        dateMsg() {
            this.nowDate = DateTime.now()
                .setLocale('it')
                .toFormat('dd/LL/yyyy hh:mm:ss');
        },

    },
    // Chiamo la funzione searchUser qui
    // All'inizio la searchBar sarà vuota quindi devo stampare tutti i contatti
    created() {
        this.userBar()
    }
}).mount('#app')