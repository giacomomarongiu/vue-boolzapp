console.log("Hello world");

const { createApp } = Vue

createApp({
    data() {
        return {
            // Creo una variabile con stringa vuota
            // La collego alla barra "Cerca o inizia una nuova chat" con v-model
            searchedValue: "",
            // Variabile numerica che mi servirà come indice di appoggio
            userActive: 0,
            // Per le risposte automatiche creo una struttura dati di appoggio che sia la stessa dei messaggi già esistenti
            userReply: {
                date: "now", //cambio dopo
                message: "Ok",
                status: 'received', //sarà sempre received
            },
            // Creo una struttura dati di appoggio che sia la stessa dei messaggi già esistenti
            // La collego alla barra "Scrivi messaggio" con v-model
            newMessage: {
                date: "now", //cambio dopo
                message: "", //qui il messaggio dell'input
                status: 'sent', //sarà sempre sent
            },
            // array di oggetti che contengono due stringhe (nome e percorso immagine), un booleano e un array di oggetti
            contacts: [
                {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            printedContacts: [],
        }
    },
    methods: {

        //If condition for class received/sent
        sendOrReceived(string) {
            //faccio un leggo e vedo se prende giusto
            //console.log(string);
            if (string == 'sent') {
                return 'sent'
            }
            return 'received'
        },

        //La funzione sendMessage mi permette di prendere il valore digitato in input e pusharlo/aggiungerlo ai messaggi già esistenti dell'utente attivo
        sendMessage() {
            //Verifico se è ben collegata
            console.log("QUI IL MESSAGGIO UTENTE");
            //Verifico cosa ho con This
            console.log(this.contacts);
            //Conosco quale utente riceverà il messaggio perché ho userActive
            console.log(this.contacts[this.userActive]);
            // Verifico se è l'array giusto
            console.log(this.contacts[this.userActive].messages);
            // Verifico se newMessage ha il messaggio in lettura corretto
            console.log(this.newMessage);
            // Aggiungo la todo all'array con l'operatore spred (push mi crea problemi per via del passaggio tramite reference)
            (this.contacts[this.userActive].messages).push({ ...this.newMessage })
            // Pulisco l'input
            this.newMessage.message = "";
            //Verifico se è stato aggiunto correttamente
            console.log(this.contacts[this.userActive].messages);

            setTimeout(() => { this.replyMessage() }, 1000) // Vedi sotto
        },

        //Creo una funzione che aggiunge un oggetto il cui testo è "ok" all'array dei messaggi nell'utente selezionato
        replyMessage() {
            // Mi evito i log perché sono uguali a quelli di sendMessage
            // Unica differenza: il mio oggetto è statitico (userReply)
            (this.contacts[this.userActive].messages).push({ ...this.userReply })
        },

        // Crea l'array dei contatti da stampare nella barra
        userBar() {
            // Verifico la mia stringa 
            // console.log(this.searchedValue);
            // Verifico il mio array
            // console.log(this.contacts);
            // Devo "filtrare" il mio array di oggetti quindi uso un filter
            // Utilizzo il mio array vuoto ptintedContacts per filtrare contacts
            // SE non cerco nulla stampo tutti i contatti
            if (this.searchedValue == "") {
                this.printedContacts = this.contacts;
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
                    return console.log("NON E' TRUE"); Verifica
                } */
                })
            }
        },

        // Rimuove il messaggio relativo all'index passato
        removeMessage(userIndex) {
            //Verifico se si triggera bene
            console.log("Cancella!");
            //Verifico l'index passato
            console.log(userIndex);
            //Verifico se è corretto l'elemento
            console.log(this.contacts[this.userActive].messages);
            console.log(this.contacts[this.userActive].messages[userIndex]);
            //Cancello il testo selezionato grazie all'indice che ho ricevuto
            console.log(((this.contacts[this.userActive].messages.length === 1)));

            (this.contacts[this.userActive].messages).splice(userIndex, 1)



        },

    },
    // Chiamo la funzione searchUser qui
    // All'inizio la searchBar sarà vuota quindi devo stampare tutti i contatti
    created() {
        this.userBar()
    }
}).mount('#app')