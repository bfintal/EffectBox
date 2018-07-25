import { formSettings } from '../util'
import scrollReveal from '../scroll-reveal'

const start = ( el, options = {} ) => {

    const defaults = {
        lang: '',
        duration: 1000,
        delay: 16,
    }

    const settings = formSettings( el, defaults, options )
    
    stop( el );

    // If no number, don't do anything.
    if ( ! /[0-9]/.test( el.innerHTML ) ) {
        return;
    }

    // Remember the element.
    el._countUpOrigInnerHTML = el.innerHTML;
    const hasLang = !! el.getAttribute( 'data-lang' ) || !! options.lang;

    // Number of times the number will change.
    const divisions = settings.duration / settings.delay;

    // Split numbers and html tags.
    const splitValues = splitNumbers( el.innerHTML );

    // Contains all numbers to be displayed.
    const nums = [];

    // Set blank strings to ready the split values.
    for ( let k = 0; k < divisions; k++ ) {
        nums.push( '' );
    }

    // Loop through all numbers and html tags.
    for ( let i = 0; i < splitValues.length; i++ ) {

        let num = splitValues[ i ];

        if ( isCountable( num ) ) {

            const format = detectNumFormat( num )
            num = num.replace( /,/g, '' );

            generateNumbersTo( num, divisions ).forEach( ( num, i ) => {
                nums[ i ] += applyNumFormat( num, format, settings.lang )
            } )

        } else {

            // Insert all non-numbers in the same place.
            for ( let k = 0; k < divisions; k++ ) {
                nums[ k ] += num;
            }
        }
    }

    el.innerHTML = nums[0];
    el.style.visibility = 'visible';

    const callback = () => {

        // Function for displaying output with the set time and delay.
        const output = function() {
            el.innerHTML = nums.shift();
            if ( nums.length ) {
                clearTimeout( el.countUpTimeout );
                el.countUpTimeout = setTimeout( output, settings.delay );
            } else {
                el._countUpOrigInnerHTML = undefined;
            }
        };
        el.countUpTimeout = setTimeout( output, settings.delay );
    }

    scrollReveal.start( el, {
        callback
    } )
}

const stop = ( el ) => {
    clearTimeout( el.countUpTimeout );
	if ( el._countUpOrigInnerHTML ) {
		el.innerHTML = el._countUpOrigInnerHTML;
		el._countUpOrigInnerHTML = undefined;
	}
	el.style.visibility = '';
}

export default {
    start,
    stop,
} 

// Given a string that can have HTML, split it to separate the numbers.
export const splitNumbers = ( text ) => text.split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/)

// Countable string
export const isCountable = ( num ) => /([0-9.][,.0-9]*[0-9]*)/.test( num ) && ! /<[^>]+>/.test( num )

// Creates an array of numbers from zero to num
export const generateNumbersTo = ( finalNumber, len ) => {
    if ( len < 1 ) {
        return [ finalNumber ]
    }
    const increment = finalNumber / len;
    const numbers = Array( len - 1 ).fill( 0 ).map( ( v, i ) => ( i + 1 ) * increment )
    numbers.push( finalNumber ) // Ensure that the last number is the original one.
    return numbers
}

export const detectNumFormat = ( strNum ) => {

    let decimalPlaces = 0
    if ( /^[0-9]+\.[0-9]+$/.test( strNum ) ) {
        decimalPlaces = ( strNum.split( '.' )[1] || [] ).length
    }
            
    return {
        hasComma: /[0-9]+,[0-9]+/.test( strNum ),
        decimalPlaces,
    }
}

export const applyNumFormat = ( num, format, lang = '' ) => {

    const { hasComma, decimalPlaces } = format

    if ( decimalPlaces || lang || hasComma ) {
        return Intl.NumberFormat( lang ? lang : undefined, { 
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        } ).format( num );
    }

    return parseInt( num, 10 )
}