import moment from "moment";

const functions = {
    getDateString: date => {
        const newDate = new Date(date)
        const now = new Date();
        if (newDate.getFullYear() === now.getFullYear()) {
            if (newDate.getMonth() === now.getMonth()) {
                if (newDate.getDate() === now.getDate()) {
                    return 'Today';
                }
                if (newDate.getDate() === now.getDate() - 1) {
                    return 'Yesterday';
                }
            }
            return newDate.toDateString().replace(/(^\w+\s)|(\s\d+$)/g, '');
        } else {
            return newDate.toDateString().replace(/(^\w+\s)/, '');
        }
    },
    getLastMessageDateString: ( date ) => {
        if ( !date ) {
            return '';
        }
        const now = new Date();
        const lastMessageDate = new Date( date );
        if ( lastMessageDate.getFullYear() === now.getFullYear() &&
            lastMessageDate.getMonth() === now.getMonth() ) {
            if ( lastMessageDate.getDate() === now.getDate() ) {
                const hours = lastMessageDate.getHours().toString();
                let minutes = lastMessageDate.getMinutes().toString();
                if ( minutes.length < 2 ) {
                    minutes = `0${ minutes }`;
                }
                // return `${ hours }:${ minutes }`;
                return moment( lastMessageDate ).format( 'HH:mm' );
            }
            if ( lastMessageDate.getDate() === now.getDate() - 1 ) {
                return 'Yesterday';
            }
        }
        return lastMessageDate.toDateString().replace( /(^\w+\s)|(\s\d+$)/g, '' );
    },
    mapMessagesToSections: ( messages = [] ) => {
        return messages.sort( ( a, b ) => +b.created_at - +a.created_at )
            .reduce( ( acc, message ) => {
                const date = new Date( message.created_at );
                const section = acc.find( ( { title } ) => (
                    title.getDate() === date.getDate() &&
                    title.getMonth() === date.getMonth() &&
                    title.getFullYear() === date.getFullYear()
                ) );
                if ( section ) {
                    section.data.push( message );
                } else {
                    acc.push( {
                        title: date, data: [ message ]
                    } );
                }
                return acc;
            }, [] );
    },
    generateUUID: ( digits ) => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
        let uuid = [];
        for ( let i = 0; i < digits; i++ ) {
            uuid.push( str[ Math.floor( Math.random() * str.length ) ] );
        }
        return uuid.join( '' );
    },
    generateTransactionRef: ( length ) => {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
        }
        return `flw_tx_ref_${ result }`;
    },

    getSelectedList: ( array = [], element ) => {

        let availableIndex = array.findIndex( ( item ) => item == element );
        if ( availableIndex > -1 ) {
            let elements = [ ...array ];
            elements.splice( availableIndex, 1 );
            return elements;
        } else {
            let elements = [ ...array ];
            elements.push( element );
            return elements;
        }
    },

    groupedDays: (messages = []) => {
        return messages.reduce((acc, el, i) => {
            const messageDay = moment(el.created_at).format('YYYY-MM-DD');
            if (acc[messageDay]) {
                return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
            }
            return { ...acc, [messageDay]: [el] };
        }, {});
    },
    generateItems: (messages = []) => {
        const days = functions.groupedDays(messages);
        const sortedDays = Object.keys(days).sort(
            (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
        );
        const items = sortedDays.reduce((acc, date) => {
            const sortedMessages = days[date].sort(
                (x, y) => new Date(y.created_at) - new Date(x.created_at)
            );
            return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
        }, []);
        console.log(items)
        return items;
    },


};
export default functions;